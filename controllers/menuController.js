import MenuItem from "../models/MenuItem.js"
import Category from "../models/Category.js"
import { StatusCodes } from "http-status-codes"
import HttpError from '../error/HttpError.js'

const getAllMenuItems = async (req, res) => {
    const menuItems = await MenuItem.find({}).populate('category')
    res.status(StatusCodes.OK).json({ menuItems, count: menuItems.length })
}

const createMenuItem = async (req, res) => {
    const { name, description, price, category, image_url, customization_options } = req.body

    if (!name || !description || !price || !category) {
        throw new HttpError('Please provide all required values', StatusCodes.BAD_REQUEST)
    }

    const categoryExists = await Category.findById(category)
    if (!categoryExists) {
        throw new HttpError('Invalid category', StatusCodes.BAD_REQUEST)
    }

    const menuItem = await MenuItem.create({
        name,
        description,
        price,
        category,
        image_url,
        customization_options
    })

    res.status(StatusCodes.CREATED).json({ menuItem })
}

const getSingleMenuItem = async (req, res) => {
    const { id: menuItemId } = req.params
    const menuItem = await MenuItem.findOne({ _id: menuItemId }).populate('category')

    if (!menuItem) {
        throw new HttpError(`No menu item with id: ${menuItemId}`, StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.OK).json({ menuItem })
}

const updateMenuItem = async (req, res) => {
    const { id: menuItemId } = req.params
    const { name, description, price, category, image_url, customization_options, is_available } = req.body

    if (category) {
        const categoryExists = await Category.findById(category)
        if (!categoryExists) {
            throw new HttpError('Invalid category', StatusCodes.BAD_REQUEST)
        }
    }

    const menuItem = await MenuItem.findOneAndUpdate(
        { _id: menuItemId },
        { name, description, price, category, image_url, customization_options, is_available },
        { new: true, runValidators: true }
    )

    if (!menuItem) {
        throw new HttpError(`No menu item with id: ${menuItemId}`, StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.OK).json({ menuItem })
}

const deleteMenuItem = async (req, res) => {
    const { id: menuItemId } = req.params
    const menuItem = await MenuItem.findOneAndDelete({ _id: menuItemId })

    if (!menuItem) {
        throw new HttpError(`No menu item with id: ${menuItemId}`, StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.OK).json({ msg: 'Menu item removed' })
}

const getItemsByCategory = async (req, res) => {
    const { categoryId } = req.params
    const menuItems = await MenuItem.find({ category: categoryId }).populate('category')

    if (!menuItems.length) {
        throw new HttpError(`No menu items found for category: ${categoryId}`, StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.OK).json({ menuItems, count: menuItems.length })
}

export {
    getAllMenuItems,
    createMenuItem,
    getSingleMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getItemsByCategory
}