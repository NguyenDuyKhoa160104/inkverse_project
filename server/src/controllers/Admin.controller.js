import * as AdminService from "../services/Admin.service.js";

export const profile = async (req, res) => {
    try {
        const { adminId } = req.params;

        const result = await AdminService.getProfileService(adminId);

        if (result.error) {
            return res.status(404).json({
                message: result.error
            });
        }
        res.status(200).json({
            message: "Lấy thông tin Admin thành công",
            ...result
        });
    }
    catch (error) {
        console.log("Error in profile controller:", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}