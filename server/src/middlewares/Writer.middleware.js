import jwt from "jsonwebtoken";
import Writer from "../models/Writer.js";
import { WRITER_ISACTIVE } from "../constants/Writer.constant.js";

export const WriterAuthorize = async (req, res, next) => {
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

        const writer = await Writer.findById(decoded.id).select("-password");
        if (!writer) {
            return res.status(401).json({
                message: "Tài khoản tác giả không tồn tại."
            });
        }

        req.writer = writer;
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

        console.error("Error in WriterAuthorize middleware:", error);
        return res.status(500).json({
            message: "Lỗi hệ thống khi xác thực quyền tác giả."
        });
    }
};

export const isWriterActive = async (req, res, next) => {
    try {
        let writer = req.writer;

        if (!writer) {
            let token = null;
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
                token = req.headers.authorization.split(" ")[1];
            } else if (req.cookies && req.cookies.token) {
                token = req.cookies.token;
            }

            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                writer = await Writer.findById(decoded.id).select("-password");
                if (writer) {
                    req.writer = writer;
                    req.user = decoded;
                }
            } else {
                const writerId = req.params.writerId || req.params.id || req.body.writerId;
                if (writerId) {
                    writer = await Writer.findById(writerId).select("-password");
                    if (writer) {
                        req.writer = writer;
                    }
                }
            }
        }

        if (!writer) {
            return res.status(401).json({
                message: "Không tìm thấy thông tin tài khoản tác giả để kiểm tra trạng thái."
            });
        }

        if (writer.isActive !== WRITER_ISACTIVE.ACTIVE) {
            return res.status(403).json({
                message: "Tài khoản tác giả của bạn đã bị khóa hoặc ngừng hoạt động."
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

        console.error("Error in isWriterActive middleware:", error);
        return res.status(500).json({
            message: "Lỗi hệ thống khi kiểm tra trạng thái tài khoản tác giả."
        });
    }
};

