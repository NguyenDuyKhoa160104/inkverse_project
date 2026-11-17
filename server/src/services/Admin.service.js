import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ADMIN_ISACTIVE } from "../constants/Admin.constant.js";

export const loginAdminService = async (username, password) => {
    try {
        let admin = await Admin.findOne({ username });
        if (!admin) {
            return { error: "Tên đăng nhập chưa tồn tại." };
        }
        if (admin.isActive !== ADMIN_ISACTIVE.ACTIVE) {
            return { error: "Tài khoản của bạn đã bị khóa." };
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

export const getProfileService = async (adminId) => {
    try {
        const admin = await Admin.findById(adminId).select("-password");
        if (!admin) {
            return { error: "Admin không tồn tại." };
        }
        return { admin };
    }
    catch (error) {
        console.log("Error in getProfile service:", error);
        return { error: "Lỗi hệ thống" };
    }
}