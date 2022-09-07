import dotenv from 'dotenv'

dotenv.config()

import { clanType } from './config.js'
import {
  clickMenu,
  clickMenuClan,
  clickImmortalClan,
  scrollImmortalClanMember,
  clickImmortalClanMember,
  clickSortAlphabetical
} from './mouseActions/index.js'

const wait = ms => new Promise(r => setTimeout(r, ms))

const start = async () => {
  try {
    console.log('Scraping Process Starts')
    await wait(3000)

    await clickMenu()
    await clickMenuClan()

    if (clanType === 'immortal') await clickImmortalClan()
    if (clanType === 'immortal') await scrollImmortalClanMember()
    if (clanType === 'immortal') await clickImmortalClanMember()

    await clickSortAlphabetical()
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