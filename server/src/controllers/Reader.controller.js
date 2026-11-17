import * as ReaderService from "../services/Reader.service.js";

export const getProfile = async (req, res) => {
    try {
        const { readerId } = req.params;

        const result = await ReaderService.getProfileService(readerId);

        if (result.error) {
            return res.status(404).json({
                message: result.error
            });
        }

        return res.status(200).json({
            message: "Lấy thông tin độc giả thành công",
            ...result
        });
    }
    catch (error) {
        console.log("Error in getProfile controller:", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}