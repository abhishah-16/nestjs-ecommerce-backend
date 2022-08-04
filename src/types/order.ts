import { Document } from "mongoose";
import { Product } from "./product";
import { User } from "./user";

interface Orders {
    product: Product,
    quantity: number
}

export interface Order extends Document {
    owner: User,
    totalPrice: number,
    products: Orders[],
    createdAt: Date
}