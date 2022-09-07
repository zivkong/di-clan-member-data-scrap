

import { subDays } from 'date-fns'
import copyToClipboard from 'clipboardy'

import { clanId, clanType } from './config.js'

import Clan from './models/Clan.model.js'
import ClanMember from './models/ClanMember.model.js'

import {
  clickMenu,
  clickMenuClan,
  clickImmortalClan,
  scrollImmortalClanMember,
  clickImmortalClanMember,
  clickSearchInput,
  inputMemberName,
  captureElement,
  validateMember,
  clickOnMember,
  clickOnMemberInfo,
  clickOnMemberInfoDetails,
  clickOnMemberMoreAttributes,
  getOCRValue,
  scrollToBottom,
  clickClose,
  clearSearchInput
} from './macros/index.js'

const wait = ms => new Promise(r => setTimeout(r, ms))

const computeMemberData = async (member) => {
  const { displayName } = member

  copyToClipboard.writeSync(displayName)

  if (displayName === process.env.RUNNER_DISPLAY_NAME) {
    console.warn(`Blizzard don't allow click on self ${displayName}`)
    return
  }

  await clickSearchInput()
  await inputMemberName(displayName)
  const validateMemberImagePath = await captureElement('listMemberName')
  const isMember = await validateMember(validateMemberImagePath)

  if (!isMember) {
    console.warn(`Failed to find member with displayName ${displayName}`)
    await clearSearchInput()
    member.lastCheckFailed = true
    await member.save()
    return
  }

  await clickOnMember()
  await clickOnMemberInfo()
  await clickOnMemberInfoDetails()
  await clickOnMemberMoreAttributes()

  const combatRatingImagePath = await captureElement('combatRating')
  const combatRatingString = await getOCRValue(combatRatingImagePath)
  const combatRating = Number(combatRatingString)

  await scrollToBottom()

  const resonanceImagePath = await captureElement('resonance')
  const resonanceString = await getOCRValue(resonanceImagePath)
  const resonance = Number(resonanceString)

  const memberDetails = ({
    displayName,
    combatRating,
    resonance
  })

  console.log(memberDetails)

  await clickClose()
  await clearSearchInput()

  member.resonance = resonance
  member.combatRating = combatRating
  member.updatedAt = new Date()
  member.lastCheckFailed = false
  await member.save()
}

const start = async () => {
  try {
    console.log('Scraping Process Starts')
    await wait(3000)

    const clan = await Clan.findById(clanId)
    console.log(`Processing ${clan.name}`)

    await clickMenu()
    await clickMenuClan()

    if (clanType === 'immortal') {
      await clickImmortalClan()
      await scrollImmortalClanMember()
      await clickImmortalClanMember()
    }

    let today = new Date()
    today = subDays(today, 1)

    const clanMembers = await ClanMember
      .find({
        clan,
        lastCheckFailed: false,
        $or: [
          { updatedAt: { $exists: false } },
          { updatedAt: { $lt: today } }
        ]
      })
      .cursor()

    await clanMembers.eachAsync(computeMemberData)

    await clickClose()
  }

  catch (error) {
    console.error('Error while running', error)
  }

  finally {
    console.log("Scraping Process Ends")
    process.exit(0)
  }
}

start()