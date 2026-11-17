import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { WRITER_ISACTIVE } from "../constants/Writer.constant.js";

const writerSchema = new mongoose.Schema({
    penName: {
        type: String,
        required: [true, "Tên bút danh là bắt buộc"]
    },
    email: {
        type: String,
        required: [true, "Email là bắt buộc"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Mật khẩu là bắt buộc"],
        minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"]
    },
    avatarUrl: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: null
    },
    revenueBalance: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Number,
        enum: [WRITER_ISACTIVE.INACTIVE, WRITER_ISACTIVE.ACTIVE, WRITER_ISACTIVE.BANNED],
        default: WRITER_ISACTIVE.ACTIVE
    }
}, {
    timestamps: true
});

writerSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

writerSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model('Writer', writerSchema);
