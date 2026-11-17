
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tên thể loại là bắt buộc"],
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: [true, "Đường dẫn thể loại là bắt buộc"],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.model("Category", categorySchema);
