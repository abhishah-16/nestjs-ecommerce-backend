import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    seller: {
        type: Boolean,
        default: false
    },
    address: {
        add1: String,
        add2: String,
        city: String,
        state: String,
        countrry: String,
        zip: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})