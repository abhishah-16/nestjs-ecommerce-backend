import { Document } from "mongoose";

interface Address {
    add1: string,
    add2: string,
    city: string,
    state: string,
    countrry: string,
    zip: number,
}
export interface User extends Document {
    username: string,
    readonly password: string,
    seller: boolean,
    address: Address,
    createdAt: Date
}