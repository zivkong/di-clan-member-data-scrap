
import copyToClipboard from 'clipboardy'

import {
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
} from '../macros/index.js'

export const computeMemberData = async (member) => {
  try {
    const { displayName } = member
    console.log(`Scraping ${displayName}`)

    copyToClipboard.writeSync(displayName)

    member.resonance = 0
    member.combatRating = 0
    await member.save()

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
  } catch (error) {
    console.error(error)
  }

}