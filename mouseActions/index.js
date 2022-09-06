import robot from 'robotjs'
import { screenWidth, screenHeight, } from '../config.js'

robot.setMouseDelay(1000)

export const clickMenu = async () => {
  const x = (screenWidth * 0.97)
  const y = (screenHeight * 0.07)
  robot.moveMouse(x, y)
  robot.mouseClick('left')
  return
}

export const clickMenuClan = async () => {
  const x = (screenWidth * 0.80)
  const y = (screenHeight * 0.55)
  robot.moveMouse(x, y)
  robot.mouseClick('left')
  return
}

export const clickImmortalClan = async () => {
  const x = (screenWidth * 0.05)
  const y = (screenHeight * 0.95)
  robot.moveMouse(x, y)
  robot.mouseClick('left')
  return
}

export const clickImmortalClanMember = async () => {
  robot.scrollMouse(0, -150)
  robot.mouseClick('left')
  return
}

export const clickSortAlphabetical = async () => {
  const x = (screenWidth * 0.2)
  const y = (screenHeight * 0.2)
  robot.moveMouse(x, y)
  robot.mouseClick('left')
  robot.mouseClick('left')
  return
}