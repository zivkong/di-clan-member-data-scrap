import mongoose from 'mongoose'

import { dbConn } from './connections.js'

const ClanSchema = new mongoose.Schema({
  name: { type: String }
}, { collection: 'clans' })

const Clan = dbConn.model('Clan', ClanSchema)

export default Clan