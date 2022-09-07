import robot from 'robotjs'
import Jimp from 'jimp'
import tesseract from 'node-tesseract-ocr'

import { screenWidth, screenHeight, } from '../config.js'

robot.setMouseDelay(750)

const tesseractConfig = { lang: "eng", oem: 1, psm: 3 }

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

export const clickSearchInput = async () => {
  const x = (screenWidth * 0.75)
  const y = (screenHeight * 0.15)
  robot.moveMouse(x, y)
  robot.mouseClick('left')
  return
}

export const inputMemberName = async (memberName) => {
  robot.keyTap("v", ["control"])
  return
}

export const clickOnMember = async () => {
  const x = (screenWidth * 0.50)
  const y = (screenHeight * 0.33)
  robot.moveMouse(x, y)
  robot.mouseClick('left')
  return
}

export const clickOnMemberInfo = async () => {
  const x = (screenWidth * 0.58)
  const y = (screenHeight * 0.39)
  robot.moveMouse(x, y)
  robot.mouseClick('left')
  return
}

export const clickOnMemberInfoDetails = async () => {
  const x = (screenWidth * 0.68)
  const y = (screenHeight * 0.37)
  robot.moveMouse(x, y)
  robot.mouseClick('left')
  return
}

export const clickOnMemberMoreAttributes = async () => {
  const x = (screenWidth * 0.78)
  const y = (screenHeight * 0.88)
  robot.moveMouse(x, y)
  robot.mouseClick('left')
  return
}

export const clickClose = async () => {
  const x = (screenWidth * 0.965)
  const y = (screenHeight * 0.05)
  robot.moveMouse(x, y)
  robot.mouseClick('left')
  return
}

export const clearSearchInput = async () => {
  const x = (screenWidth * 0.965)
  const y = (screenHeight * 0.15)
  robot.moveMouse(x, y)
  robot.mouseClick('left')
  return
}

export const captureElement = async (element) => {
  const { image } = robot.screen.capture(0, 0, screenWidth, screenHeight)
  const jimp = new Jimp({ data: image, width: screenWidth, height: screenHeight })

  let cropX = null
  let cropY = null
  let cropWidth = null
  let cropHeight = null

  switch (element) {
    case 'listMemberName':
      cropX = screenWidth * 0.36
      cropY = screenHeight * 0.3
      cropWidth = screenWidth * 0.2
      cropHeight = screenHeight * 0.037
      break
    case 'combatRating':
      cropX = screenWidth * 0.9
      cropY = screenHeight * 0.33
      cropWidth = screenWidth * 0.06
      cropHeight = screenHeight * 0.05
      break
    case 'resonance':
      cropX = screenWidth * 0.9
      cropY = screenHeight * 0.775
      cropWidth = screenWidth * 0.06
      cropHeight = screenHeight * 0.05
      break
    default:
      throw new Error('Unknown capture element')
  }

  jimp.quality(100).crop(cropX, cropY, cropWidth, cropHeight)

  const path = `./screenshots/${element}.png`
  await jimp.writeAsync(path)
  return path
}

export const validateMember = async (path) => {
  const ocr = await tesseract.recognize(path, tesseractConfig)
  const isMember = ocr.length > 0
  return isMember
}

export const getOCRValue = async (path) => {
  const ocr = await tesseract.recognize(path, { ...tesseractConfig, tessedit_char_whitelist: "0123456789" })
  return ocr
}

export const scrollToBottom = async () => {
  const drags = 2
  let currentDrag = 0

  while (currentDrag < drags) {
    const initialX = (screenWidth * 0.78)
    const initialY = (screenHeight * 0.8)
    robot.moveMouse(initialX, initialY)

    const x = (screenWidth * 0.78)
    const y = (screenHeight * 0.1)
    robot.mouseToggle("down")
    robot.dragMouse(x, y)
    robot.mouseToggle("up")
    currentDrag++
  }

  return
}