import * as WriterService from "../services/Writer.service.js";

export const getProfile = async (req, res) => {
    try {
        const { writerId } = req.params;

        const result = await WriterService.getProfileService(writerId);
        if (result.error) {
            return res.status(404).json({
                message: result.error
            });
        }
        return res.status(200).json({
            message: "Lấy thông tin tác giả thành công",
            ...result
        });
    }
    catch (error) {
        console.log("Error in getProfile controller:", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

