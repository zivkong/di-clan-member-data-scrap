import mongoose from 'mongoose'

import { dbConn } from './connections.js'

const ClanMemberSchema = new mongoose.Schema({
  displayName: { type: String },
  resonance: { type: Number },
  combatRating: { type: Number },
  lastCheckFailed: { type: Boolean },
  updatedAt: { type: Date }
}, { collection: 'clanMembers' })

const ClanMember = dbConn.model('ClanMember', ClanMemberSchema)

export default ClanMember