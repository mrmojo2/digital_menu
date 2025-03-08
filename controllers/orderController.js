import Order from "../models/Order.js"
import Table from "../models/Table.js"
import { StatusCodes } from "http-status-codes"
import HttpError from '../error/HttpError.js'

const getAllOrders = async (req, res) => {
    const orders = await Order.find({}).populate('table').populate('items.item')
    res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

const createOrder = async (req, res) => {
    const { table, items, total_amount } = req.body

    if (!table || !items || items.length === 0 || !total_amount) {
        throw new HttpError('Please provide all required values', StatusCodes.BAD_REQUEST)
    }

    // Validate that each item has a price
    for (const item of items) {
        if (!item.price || item.price <= 0) {
            throw new HttpError('Each item must have a valid price', StatusCodes.BAD_REQUEST)
        }
    }

    const tableExists = await Table.findById(table)
    if (!tableExists) {
        throw new HttpError('Invalid table', StatusCodes.BAD_REQUEST)
    }

    const order = await Order.create({
        order_number: `ORD-${Date.now()}`,
        table,
        items,
        total_amount
    })

    await Table.findByIdAndUpdate(table, { status: 'occupied', current_order: order._id })

    res.status(StatusCodes.CREATED).json({ order })
}

const getSingleOrder = async (req, res) => {
    const { id: orderId } = req.params
    const order = await Order.findOne({ _id: orderId }).populate('table').populate('items.item')

    if (!order) {
        throw new HttpError(`No order with id: ${orderId}`, StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.OK).json({ order })
}

const updateOrder = async (req, res) => {
    const { id: orderId } = req.params
    const { items, total_amount } = req.body

    // Validate that each item has a price if items are being updated
    if (items) {
        for (const item of items) {
            if (!item.price || item.price <= 0) {
                throw new HttpError('Each item must have a valid price', StatusCodes.BAD_REQUEST)
            }
        }
    }

    const order = await Order.findOneAndUpdate(
        { _id: orderId },
        { items, total_amount },
        { new: true, runValidators: true }
    ).populate('table').populate('items.item')

    if (!order) {
        throw new HttpError(`No order with id: ${orderId}`, StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.OK).json({ order })
}

const deleteOrder = async (req, res) => {
    const { id: orderId } = req.params
    const order = await Order.findOneAndDelete({ _id: orderId })

    if (!order) {
        throw new HttpError(`No order with id: ${orderId}`, StatusCodes.NOT_FOUND)
    }

    await Table.findByIdAndUpdate(order.table, { status: 'available', current_order: null })

    res.status(StatusCodes.OK).json({ msg: 'Order removed' })
}

const updateOrderStatus = async (req, res) => {
    const { id: orderId } = req.params
    const { status } = req.body

    if (!status) {
        throw new HttpError('Please provide order status', StatusCodes.BAD_REQUEST)
    }

    const order = await Order.findOneAndUpdate(
        { _id: orderId },
        { status },
        { new: true, runValidators: true }
    ).populate('table').populate('items.item')

    if (!order) {
        throw new HttpError(`No order with id: ${orderId}`, StatusCodes.NOT_FOUND)
    }

    if (status === 'complete') {
        await Table.findByIdAndUpdate(order.table, { status: 'available', current_order: null })
    }

    res.status(StatusCodes.OK).json({ order })
}

const getOrdersByTable = async (req, res) => {
    const { tableId } = req.params
    const orders = await Order.find({ table: tableId }).populate('table').populate('items.item')

    res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

const getOrdersByStatus = async (req, res) => {
    const { status } = req.params
    const orders = await Order.find({ status }).populate('table').populate('items.item')

    res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

export {
    getAllOrders,
    createOrder,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    updateOrderStatus,
    getOrdersByTable,
    getOrdersByStatus
}