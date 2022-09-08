

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
  clickClose,
} from './macros/index.js'

import { computeMemberData } from './computes.js'

const wait = ms => new Promise(r => setTimeout(r, ms))

const start = async () => {
  try {
    console.log('Scraping Process Starts')
    await wait(3000)

    const clan = await Clan.findById(clanId).lean()

    if (!clan.faction) throw new Error('Unable to determine action for unknown clan faction.')

    console.log(`Processing [${clan.faction.toUpperCase()}] ${clan.name}`)

    await clickMenu()
    await clickMenuClan()

    if (clan.faction === 'immortal') {
      await clickImmortalClan()
      await scrollImmortalClanMember()
      await clickImmortalClanMember()
    }

    let today = new Date()
    today = subDays(today, 1)

    const clanMembers = await ClanMember
      .find({ clan, updatedAt: { $lt: today } })
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