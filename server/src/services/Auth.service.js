import Admin from "../models/Admin.js";
import Reader from "../models/Reader.js";
import Writer from "../models/Writer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ADMIN_ISACTIVE } from "../constants/Admin.constant.js";
import { READER_ISACTIVE } from "../constants/Reader.constant.js";
import { WRITER_ISACTIVE } from "../constants/Writer.constant.js";

export const loginAdminService = async (username, password) => {
    try {
        let admin = await Admin.findOne({ username });
        if (!admin) {
            return { error: "Tên đăng nhập chưa tồn tại." };
        }
        if (admin.isActive == ADMIN_ISACTIVE.BANNED) {
            return { error: "Tài khoản của bạn đã bị cấm vĩnh viễn." };
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return { error: "Sai mật khẩu." };
        }

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        admin = admin.toObject();
        delete admin.password;

        return { admin, token };
    }
    catch (error) {
        console.log("Error in login service:", error);
        return { error: "Lỗi hệ thống" };
    }
}

export const loginReaderService = async (email, password) => {
    try {
        let reader = await Reader.findOne({ email });
        if (!reader) {
            return { error: "Email chưa tồn tại." };
        }
        if (reader.isActive == READER_ISACTIVE.BANNED) {
            return { error: "Tài khoản của bạn đã bị cấm vĩnh viễn." };
        }
        const isMatch = await bcrypt.compare(password, reader.password);
        if (!isMatch) {
            return { error: "Sai mật khẩu." };
        }

        const token = jwt.sign(
            { id: reader._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        reader = reader.toObject();
        delete reader.password;

        return { reader, token };
    }
    catch (error) {
        console.log("Error in loginReaderService:", error);
        return { error: "Lỗi hệ thống" };
    }
}

export const loginWriterService = async (email, password) => {
    try {
        let writer = await Writer.findOne({ email });
        if (!writer) {
            return { error: "Email chưa tồn tại." };
        }
        if (writer.isActive == WRITER_ISACTIVE.BANNED) {
            return { error: "Tài khoản của bạn đã bị cấm vĩnh viễn." };
        }
        const isMatch = await bcrypt.compare(password, writer.password);
        if (!isMatch) {
            return { error: "Sai mật khẩu." };
        }

        const token = jwt.sign(
            { id: writer._id, role: writer.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        writer = writer.toObject();
        delete writer.password;

        return { writer, token };
    }
    catch (error) {
        console.log("Error in loginWriterService:", error);
        return { error: "Lỗi hệ thống" };
    }
}