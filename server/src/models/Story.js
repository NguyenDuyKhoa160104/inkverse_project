import mongoose from "mongoose";
import { STORY_STATUS } from '../constants/Story.constants.js'

const storySchema = new mongoose.Schema({
    writerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Writer",
        required: [true, "Tác giả là bắt buộc"]
    },
    title: {
        type: String,
        required: [true, "Tên truyện là bắt buộc"],
        trim: true
    },
    slug: {
        type: String,
        required: [true, "Đường dẫn truyện là bắt buộc"],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, "Mô tả truyện là bắt buộc"]
    },
    coverImage: {
        type: String,
        default: null
    },
    categoryIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    status: {
        type: Number,
        enum: [
            STORY_STATUS.DRAFT, 
            STORY_STATUS.PENDING, 
            STORY_STATUS.APPROVED, 
            STORY_STATUS.REJECTED, 
            STORY_STATUS.HIDDEN
        ],
        default: STORY_STATUS.DRAFT
    },
    reviewNote: {
        type: String,
        default: null
    },
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        default: null
    },
    reviewedAt: {
        type: Date,
        default: null
    },
    publishedAt: {
        type: Date,
        default: null
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    accessType: {
        type: String,
        enum: ["FREE", "PAID"],
        default: "FREE"
    },
    price: {
        type: Number,
        default: 0,
        min: [0, "Giá truyện không được âm"]
    },
    viewCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model("Story", storySchema);