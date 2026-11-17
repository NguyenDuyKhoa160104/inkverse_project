
import mongoose from "mongoose";
import { CHAPTER_STATUS } from "../constants/Chapter.constant.js";

const chapterSchema = new mongoose.Schema({
    storyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
        required: [true, "Truyện là bắt buộc"]
    },
    chapterNumber: {
        type: Number,
        required: [true, "Số thứ tự chương là bắt buộc"],
        min: [1, "Số thứ tự chương phải lớn hơn 0"]
    },
    title: {
        type: String,
        required: [true, "Tên chương là bắt buộc"],
        trim: true
    },
    content: {
        type: String,
        required: [true, "Nội dung chương là bắt buộc"]
    },
    wordCount: {
        type: Number,
        default: 0,
        min: [0, "Số lượng từ không được âm"]
    },
    status: {
        type: Number,
        enum: [
            CHAPTER_STATUS.DRAFT,
            CHAPTER_STATUS.PENDING,
            CHAPTER_STATUS.APPROVED,
            CHAPTER_STATUS.REJECTED,
            CHAPTER_STATUS.HIDDEN
        ],
        default: CHAPTER_STATUS.DRAFT
    },
    isFree: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        default: 0,
        min: [0, "Giá chương không được âm"]
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
    }
}, {
    timestamps: true
});

// Tự động tính số lượng từ khi nội dung thay đổi
chapterSchema.pre("save", function () {
    if (this.isModified("content")) {
        const content = this.content.trim();

        this.wordCount = content
            ? content.split(/\s+/).length
            : 0;
    }

    if (this.isFree) {
        this.price = 0;
    }
});

// Không cho phép trùng số thứ tự chương trong cùng một truyện
chapterSchema.index(
    { storyId: 1, chapterNumber: 1 },
    { unique: true }
);

export default mongoose.model("Chapter", chapterSchema);
