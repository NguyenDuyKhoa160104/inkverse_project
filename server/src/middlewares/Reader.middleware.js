import jwt from "jsonwebtoken";
import Reader from "../models/Reader.js";
import { READER_ISACTIVE } from "../constants/Reader.constant.js";

export const ReaderAuthorize = async (req, res, next) => {
    try {
        let token = null;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                message: "Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const reader = await Reader.findById(decoded.id).select("-password");
        if (!reader) {
            return res.status(401).json({
                message: "Tài khoản độc giả không tồn tại."
            });
        }

        req.reader = reader;
        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."
            });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Token xác thực không hợp lệ."
            });
        }

        console.error("Error in ReaderAuthorize middleware:", error);
        return res.status(500).json({
            message: "Lỗi hệ thống khi xác thực quyền độc giả."
        });
    }
};

export const isReaderActive = async (req, res, next) => {
    try {
        let reader = req.reader;

        if (!reader) {
            let token = null;
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
                token = req.headers.authorization.split(" ")[1];
            } else if (req.cookies && req.cookies.token) {
                token = req.cookies.token;
            }

            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                reader = await Reader.findById(decoded.id).select("-password");
                if (reader) {
                    req.reader = reader;
                    req.user = decoded;
                }
            } else {
                const readerId = req.params.readerId || req.params.id || req.body.readerId;
                if (readerId) {
                    reader = await Reader.findById(readerId).select("-password");
                    if (reader) {
                        req.reader = reader;
                    }
                }
            }
        }

        if (!reader) {
            return res.status(401).json({
                message: "Không tìm thấy thông tin tài khoản độc giả để kiểm tra trạng thái."
            });
        }

        if (reader.isActive !== READER_ISACTIVE.ACTIVE) {
            let message = "Tài khoản của bạn đã bị khóa hoặc ngừng hoạt động.";
            if (reader.banReason) {
                message += ` Lý do: ${reader.banReason}`;
            }
            if (reader.banUntil) {
                message += ` đến ngày ${new Date(reader.banUntil).toLocaleDateString("vi-VN")}`;
            }
            return res.status(403).json({
                message
            });
        }

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."
            });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Token xác thực không hợp lệ."
            });
        }

        console.error("Error in isReaderActive middleware:", error);
        return res.status(500).json({
            message: "Lỗi hệ thống khi kiểm tra trạng thái tài khoản độc giả."
        });
    }
};
