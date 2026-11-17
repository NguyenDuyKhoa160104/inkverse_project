import * as AuthService from '../services/Auth.service.js';

export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await AuthService.loginAdminService(username, password);
        if (result.error) {
            return res.status(401).json({
                message: result.error
            });
        }
        res.status(200).json({
            message: "Đăng nhập thành công",
            ...result
        });

    }
    catch (error) {
        console.log("Error in login controller:", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const readerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.loginReaderService(email, password);
        if (result.error) {
            return res.status(401).json({
                message: result.error
            });
        }
        res.status(200).json({
            message: "Đăng nhập thành công",
            ...result
        });
    }
    catch (error) {
        console.log("Error in reader login controller:", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const writerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.loginWriterService(email, password);
        if (result.error) {
            return res.status(401).json({
                message: result.error
            });
        }
        res.status(200).json({
            message: "Đăng nhập thành công",
            ...result
        });
    }
    catch (error) {
        console.log("Error in writer login controller:", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const writerRegister = async (req, res) => {
    try {
        const { penName, email, password } = req.body;
        const result = await AuthService.writerRegisterService(penName, email, password);
        if (result.error) {
            return res.status(401).json({
                message: result.error
            });
        }
        res.status(200).json({
            ...result
        });
    }
    catch (error) {
        console.log("Error in writer register controller:", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const readerRegister = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const result = await AuthService.readerRegisterService(fullName, email, password);
        if (result.error) {
            return res.status(401).json({
                message: result.error
            })
        }
        res.status(200).json({
            ...result
        });
    }
    catch (error) {
        console.log("Error in reader register controller:", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}