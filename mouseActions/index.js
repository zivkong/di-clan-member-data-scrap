import robot from 'robotjs'
import { screenWidth, screenHeight, } from '../config.js'

robot.setMouseDelay(750)

export const clickMenu = async () => {
  const x = (screenWidth * 0.98)
  const y = (screenHeight * 0.05)
  robot.moveMouse(x, y)
  robot.mouseClick('left')
  return
}

export const clickMenuClan = async () => {
  const x = (screenWidth * 0.80)
  const y = (screenHeight * 0.60)
  robot.moveMouse(x, y)
  robot.mouseClick('left')
  return
}

export const clickImmortalClan = async () => {
  const x = (screenWidth * 0.13)
  const y = (screenHeight * 0.90)
  robot.moveMouse(x, y)
  robot.mouseClick('left')
  return
}

export const scrollImmortalClanMember = async () => {
  const x = (screenWidth * 0.13)
  const y = (screenHeight * 0.05)
  robot.mouseToggle("down")
  robot.dragMouse(x, y)
  robot.mouseToggle("up")
  return
}

export const clickImmortalClanMember = async () => {
  const x = (screenWidth * 0.13)
  const y = (screenHeight * 0.90)
  robot.moveMouse(x, y)
  robot.mouseClick('left')
  return
}

export const clickSortAlphabetical = async () => {
  const x = (screenWidth * 0.4)
  const y = (screenHeight * 0.24)
  robot.moveMouse(x, y)
  robot.mouseClick('left')
  robot.mouseClick('left')
  return
}