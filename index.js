import { clanType } from './config.js'
import { clickMenu, clickMenuClan, clickImmortalClan, clickImmortalClanMember, clickSortAlphabetical } from './mouseActions/index.js'

const start = async () => {
  try {
    console.log('Scraping Process Starts')

    await clickMenu()
    await clickMenuClan()

    if (clanType === 'immortal') await clickImmortalClan()
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