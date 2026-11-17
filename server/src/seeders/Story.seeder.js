
import "dotenv/config";
import Story from "../models/Story.js";
import Writer from "../models/Writer.js";
import Category from "../models/Category.js";
import connectDB from "../config/database.config.js";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

const sampleStories = [
    {
        writerEmail: "namcao@inkverse.com",
        title: "Ánh Đèn Cuối Ngõ",
        slug: "anh-den-cuoi-ngo",
        description: "Câu chuyện về những mảnh đời bình dị nơi phố nhỏ, những số phận phải đối mặt với nghịch cảnh và khát vọng tìm kiếm hạnh phúc.",
        coverImage: null,
        categorySlugs: ["van-hoc", "tam-ly-xa-hoi"],
        status: 2,
        reviewNote: null,
        reviewedBy: null,
        reviewedAt: new Date(),
        publishedAt: new Date(),
        isCompleted: true,
        accessType: "FREE",
        price: 0,
        viewCount: 1250
    },
    {
        writerEmail: "xuandieu@inkverse.com",
        title: "Mùa Hạ Không Tên",
        slug: "mua-ha-khong-ten",
        description: "Câu chuyện tình yêu lãng mạn xoay quanh những rung động đầu đời và nỗi nhớ về một mùa hạ đã qua.",
        coverImage: null,
        categorySlugs: ["ngon-tinh", "van-hoc"],
        status: 1,
        reviewNote: null,
        reviewedBy: null,
        reviewedAt: null,
        publishedAt: null,
        isCompleted: false,
        accessType: "PAID",
        price: 25000,
        viewCount: 0
    },
    {
        writerEmail: "thachlam@inkverse.com",
        title: "Chuyến Tàu Qua Phố Nhỏ",
        slug: "chuyen-tau-qua-pho-nho",
        description: "Những câu chuyện nhẹ nhàng về cuộc sống thường nhật, tình người và những cảm xúc bình dị trong một khu phố nhỏ.",
        coverImage: null,
        categorySlugs: ["van-hoc", "tam-ly-xa-hoi"],
        status: 2,
        reviewNote: null,
        reviewedBy: null,
        reviewedAt: new Date(),
        publishedAt: new Date(),
        isCompleted: true,
        accessType: "FREE",
        price: 0,
        viewCount: 830
    },
    {
        writerEmail: "tohoai@inkverse.com",
        title: "Bí Mật Khu Rừng Xanh",
        slug: "bi-mat-khu-rung-xanh",
        description: "Hành trình khám phá khu rừng kỳ thú của những người bạn nhỏ, nơi chứa đựng nhiều bí mật và những cuộc phiêu lưu bất ngờ.",
        coverImage: null,
        categorySlugs: ["thieu-nhi", "phieu-luu"],
        status: 0,
        reviewNote: null,
        reviewedBy: null,
        reviewedAt: null,
        publishedAt: null,
        isCompleted: false,
        accessType: "FREE",
        price: 0,
        viewCount: 0
    }
];

const StorySeeder = async () => {
    try {
        let seededCount = 0;

        for (const storyData of sampleStories) {
            // Kiểm tra truyện đã tồn tại
            const existingStory = await Story.findOne({
                slug: storyData.slug
            });

            if (existingStory) {
                console.log(`Story already exists: ${storyData.title}`);
                continue;
            }

            // Tìm tác giả
            const writer = await Writer.findOne({
                email: storyData.writerEmail
            });

            if (!writer) {
                console.log(`Writer not found: ${storyData.writerEmail}`);
                continue;
            }

            // Tìm các thể loại
            const categories = await Category.find({
                slug: { $in: storyData.categorySlugs }
            });

            if (categories.length !== storyData.categorySlugs.length) {
                console.log(`Some categories not found for story: ${storyData.title}`);
                continue;
            }

            // Lấy ObjectId của các thể loại
            const categoryIds = categories.map(category => category._id);

            // Loại bỏ các trường dùng để tìm kiếm liên kết
            const { writerEmail, categorySlugs, ...storyInfo } = storyData;

            // Khởi tạo Story
            const story = new Story({
                ...storyInfo,
                writerId: writer._id,
                categoryIds: categoryIds
            });

            await story.save();
            seededCount++;
        }

        console.log(`Successfully seeded ${seededCount} stor(ies).`);
    }
    catch (error) {
        console.error("Error seeding stories:", error);
        throw error;
    }
};

// Allow standalone execution: node src/seeders/Story.seeder.js
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
    (async () => {
        let exitCode = 0;

        try {
            await connectDB();
            await StorySeeder();
        }
        catch (error) {
            console.error("Standalone seeding failed:", error);
            exitCode = 1;
        }
        finally {
            await mongoose.connection.close();
            process.exitCode = exitCode;
        }
    })();
}

export default StorySeeder;
