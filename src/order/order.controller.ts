import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/utilities/user.decorator';
import { OrderService } from './order.service';
import { User as UserDocument } from '../types/user';


@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    listOrders(@User() { id }: UserDocument) {
        return this.orderService.listOrdersByUser(id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    createOrder(@Body() order: any, @User() { id }: UserDocument) {
        return this.orderService.createOrder(order, id);
    }
}
