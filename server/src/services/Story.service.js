import Story from "../models/Story.js";
import Writer from "../models/Writer.js";
import Category from "../models/Category.js";
import Chapter from "../models/Chapter.js";
import { STORY_STATUS } from "../constants/Story.constants.js";
import { CHAPTER_STATUS } from "../constants/Chapter.constant.js"

export const getAllApprovedStoriesService = async () => {
    try {
        const approvedStories = await Story.find({
            status: STORY_STATUS.APPROVED
        })
            .select("title slug description coverImage writerId categoryIds isCompleted viewCount publishedAt createdAt")
            .populate({
                path: "writerId",
                select: "penName avatarUrl"
            })
            .populate({
                path: "categoryIds",
                select: "name slug"
            })
            .sort({ publishedAt: -1 })
            .lean();

        const storyIds = approvedStories.map(story => story._id);

        const chapterCounts = await Chapter.aggregate([
            {
                $match: {
                    storyId: { $in: storyIds },
                    status: CHAPTER_STATUS.APPROVED
                }
            },
            {
                $group: {
                    _id: "$storyId",
                    totalChapters: { $sum: 1 }
                }
            }
        ]);

        const chapterCountMap = new Map(
            chapterCounts.map(item => [
                item._id.toString(),
                item.totalChapters
            ])
        );

        const stories = approvedStories.map(story => ({
            _id: story._id,
            title: story.title,
            slug: story.slug,
            description: story.description,
            coverImage: story.coverImage,

            writer: story.writerId ? {
                penName: story.writerId.penName,
                avatarUrl: story.writerId.avatarUrl
            } : null,

            categories: story.categoryIds.map(category => ({
                _id: category._id,
                name: category.name,
                slug: category.slug
            })),

            chapterCount: chapterCountMap.get(
                story._id.toString()
            ) || 0,

            isCompleted: story.isCompleted,
            viewCount: story.viewCount,
            publishedAt: story.publishedAt
        }));

        return {
            total: stories.length,
            stories
        };
    }
    catch (error) {
        console.log("Error in getAllApprovedStoriesService:", error);
        return { error: "Lỗi hệ thống" };
    }
};

export const getAllStoriesService = async () => {
    try {
        const allStories = await Story.find()
            .select("title slug description coverImage writerId categoryIds status reviewNote reviewedBy reviewedAt publishedAt isCompleted viewCount createdAt updatedAt")
            .populate({
                path: "writerId",
                select: "penName avatarUrl"
            })
            .populate({
                path: "categoryIds",
                select: "name slug"
            })
            .sort({ createdAt: -1 })
            .lean();

        const storyIds = allStories.map(story => story._id);

        const chapterCounts = await Chapter.aggregate([
            {
                $match: {
                    storyId: { $in: storyIds }
                }
            },
            {
                $group: {
                    _id: "$storyId",
                    totalChapters: { $sum: 1 }
                }
            }
        ]);

        const chapterCountMap = new Map(
            chapterCounts.map(item => [
                item._id.toString(),
                item.totalChapters
            ])
        );

        const stories = allStories.map(story => ({
            _id: story._id,
            title: story.title,
            slug: story.slug,
            description: story.description,
            coverImage: story.coverImage,

            writer: story.writerId ? {
                _id: story.writerId._id,
                penName: story.writerId.penName,
                avatarUrl: story.writerId.avatarUrl
            } : null,

            categories: story.categoryIds
                .filter(category => category !== null)
                .map(category => ({
                    _id: category._id,
                    name: category.name,
                    slug: category.slug
                })),

            chapterCount: chapterCountMap.get(
                story._id.toString()
            ) || 0,

            status: story.status,
            reviewNote: story.reviewNote,
            reviewedBy: story.reviewedBy,
            reviewedAt: story.reviewedAt,

            isCompleted: story.isCompleted,
            viewCount: story.viewCount,
            publishedAt: story.publishedAt,
            createdAt: story.createdAt,
            updatedAt: story.updatedAt
        }));

        return {
            total: stories.length,
            stories
        };
    }
    catch (error) {
        console.log("Error in getAllStoriesService:", error);
        return { error: "Lỗi hệ thống" };
    }
};

