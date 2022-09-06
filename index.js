import { screenHeight, screenWidth } from './config.js'
import { moveMouse } from './mouseActions/index.js'

const start = async () => {
  try {
    console.log('Scraping Process Starts')

    await moveMouse(screenWidth, screenHeight)
  } catch (error) {
    console.error('Error while running', error)
  } finally {
    console.log("Scraping Process Ends")
    process.exit(0)
  }
}

start()