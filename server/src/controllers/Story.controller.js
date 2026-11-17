import * as StoryService from "../services/Story.service.js"

export const getAllAprrovedStories = async (req, res) => {
    try {
        const result = await StoryService.getAllApprovedStoriesService();
        if (result.error) {
            return res.status(404).json({
                message: result.error
            });
        }
        return res.status(200).json({
            ...result
        });
    }
    catch (error) {
        console.log("Error in getAprrovedAllStories controller:", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const getAllStories = async (req, res) => {
    try {
        const result = await StoryService.getAllStoriesService();
        if (result.error) {
            return res.status(404).json({
                message: result.error
            });
        }
        return res.status(200).json({
            ...result
        });
    }
    catch (error) {
        console.log("Error in getAllStories controller:", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}