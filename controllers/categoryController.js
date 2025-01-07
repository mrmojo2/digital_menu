import Category from "../models/Category.js"
import { StatusCodes } from "http-status-codes"
import HttpError from '../error/HttpError.js'

const getAllCategories = async (req, res) => {
    const categories = await Category.find({})
    res.status(StatusCodes.OK).json({ categories, count: categories.length })
}

const createCategory = async (req, res) => {
    const { name, description, display_order } = req.body

    if (!name) {
        throw new HttpError('Please provide category name', StatusCodes.BAD_REQUEST)
    }

    const categoryExists = await Category.findOne({ name })
    if (categoryExists) {
        throw new HttpError('Category with this name already exists', StatusCodes.BAD_REQUEST)
    }

    const category = await Category.create({
        name,
        description,
        display_order
    })

    res.status(StatusCodes.CREATED).json({ category })
}

const getSingleCategory = async (req, res) => {
    const { id: categoryId } = req.params
    const category = await Category.findOne({ _id: categoryId })

    if (!category) {
        throw new HttpError(`No category with id: ${categoryId}`, StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.OK).json({ category })
}

const updateCategory = async (req, res) => {
    const { id: categoryId } = req.params
    const { name, description, display_order } = req.body

    if (name) {
        const categoryExists = await Category.findOne({ name, _id: { $ne: categoryId } })
        if (categoryExists) {
            throw new HttpError('Category with this name already exists', StatusCodes.BAD_REQUEST)
        }
    }

    const category = await Category.findOneAndUpdate(
        { _id: categoryId },
        { name, description, display_order },
        { new: true, runValidators: true }
    )

    if (!category) {
        throw new HttpError(`No category with id: ${categoryId}`, StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.OK).json({ category })
}

const deleteCategory = async (req, res) => {
    const { id: categoryId } = req.params
    const category = await Category.findOneAndDelete({ _id: categoryId })

    if (!category) {
        throw new HttpError(`No category with id: ${categoryId}`, StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.OK).json({ msg: 'Category removed' })
}

export {
    getAllCategories,
    createCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory
}