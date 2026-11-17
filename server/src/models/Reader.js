import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { READER_ISACTIVE } from "../constants/Reader.constant.js";

const readerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Tên đầy đủ là bắt buộc"]
    },
    email: {
        type: String,
        required: [true, "Email là bắt buộc"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Mật khẩu là bắt buộc"],
        minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"]  
    },
    avatar_url: {
        type: String,
        default: null
    },
    wallet_balance: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Number,
        enum: [READER_ISACTIVE.INACTIVE, READER_ISACTIVE.ACTIVE, READER_ISACTIVE.BANNED],
        default: READER_ISACTIVE.ACTIVE
    },
    ban_reason: {
        type: String,
        default: null
    },
    ban_until: {
        type: Date,
        default: null
    }
}, { timestamps: true });

readerSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

readerSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

export default mongoose.model('Reader', readerSchema);
    