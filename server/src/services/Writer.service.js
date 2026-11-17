import Writer from "../models/Writer.js";
import { WRITER_ISACTIVE } from "../constants/Writer.constant.js";

export const getProfileService = async (writerId) => {
    try {
        const writer = await Writer.findOne({_id: writerId}).select("-password");
        if (!writer) {
            return { error: "Tác giả không tồn tại." };
        }
        if(writer.isActive == WRITER_ISACTIVE.BANNED) {
            return { error: "Tài khoản của bạn đã bị cấm vĩnh viễn." };
        }
        return { writer };
    }
    catch (error) {
        console.log("Error in getProfile controller:", error);
        return { error: "Lỗi hệ thống" };
    }
}