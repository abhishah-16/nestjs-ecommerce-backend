import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

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

UserSchema.pre('save', async function (next) {
    var user = this
    try {
        if (!user.isModified('password')) {
            return next()
        }
        const hash = await bcrypt.hash(this['password'], 12)
        this['password'] = hash
        return next()
    } catch (error) {
        return next(error)
    }
})