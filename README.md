## Introduction

Blizzard doesn't provide API for player data. This is a work around to scrap all information of clan members.

Find me in Diablo Immortal:
MisterZiv (Ghirn, Asia Pacific)

## DB Preparation

1. MongoDB Local / Atlas / Cloud
2. Create a clan in db.clan
3. Preload members with { clan: <Clan ObjectId from step 2>, displayName: <Member Name> }
4. Create .env in project root, copy from .env-sample and fill in the env file with your mongodb connection string, your IGN and clan mongo id from step 2.

## Installation

1. Clone this repo
2. Install Tesseract on Desktop (Windows)
3. Run yarn install
4. Run yarn run:bot

## Troubleshoot

1. If you encounter tesseract error, run this in powershell: $env:Path += ";C:\Program Files\Tesseract-OCR"
