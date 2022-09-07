import mongoose from 'mongoose'

export const dbConn = mongoose.createConnection(process.env.MONGODB_URI)