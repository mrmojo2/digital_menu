import mongoose from "mongoose"


// Category Model
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide category name'],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
    },
    display_order: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export default mongoose.model('Category', CategorySchema)