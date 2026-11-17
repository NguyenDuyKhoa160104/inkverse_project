import Reader from "../models/Reader.js";

export const getProfileService= async (readerId) => {
    try {
        const reader = await Reader.findById(readerId).select("-password");
        if(!reader) {
            return { error: "Độc giả không tồn tại." };
        }
        return { reader };
    }
    catch (error) {
        console.log("Error in reader login middleware:", error);
        return { error: "Lỗi hệ thống" };
    }
}