import dotenv from 'dotenv'
import robot from 'robotjs'

dotenv.config()

export const screenSize = robot.getScreenSize()
export const screenHeight = screenSize.height
export const screenWidth = screenSize.width
export const clanId = process.env.CLAN_ID
export const clanType = 'immortal'