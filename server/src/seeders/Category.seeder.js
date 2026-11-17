
import "dotenv/config";
import Category from "../models/Category.js";
import connectDB from "../config/database.config.js";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

const sampleCategories = [
    {
        name: "Văn học",
        slug: "van-hoc",
        description: "Những tác phẩm văn học phản ánh cuộc sống, con người và các giá trị nhân văn.",
        isActive: true
    },
    {
        name: "Ngôn tình",
        slug: "ngon-tinh",
        description: "Những câu chuyện xoay quanh tình yêu, tình cảm và các mối quan hệ.",
        isActive: true
    },
    {
        name: "Huyền huyễn",
        slug: "huyen-huyen",
        description: "Thể loại truyện có yếu tố kỳ ảo, phép thuật và thế giới siêu nhiên.",
        isActive: true
    },
    {
        name: "Trinh thám",
        slug: "trinh-tham",
        description: "Những câu chuyện điều tra, phá án và khám phá các bí ẩn.",
        isActive: true
    },
    {
        name: "Kinh dị",
        slug: "kinh-di",
        description: "Những câu chuyện mang yếu tố bí ẩn, rùng rợn và tâm linh.",
        isActive: true
    },
    {
        name: "Thiếu nhi",
        slug: "thieu-nhi",
        description: "Các tác phẩm dành cho thiếu nhi, mang tính giáo dục và giải trí.",
        isActive: true
    },
    {
        name: "Tâm lý - Xã hội",
        slug: "tam-ly-xa-hoi",
        description: "Những câu chuyện khai thác tâm lý nhân vật và các vấn đề xã hội.",
        isActive: true
    },
    {
        name: "Phiêu lưu",
        slug: "phieu-luu",
        description: "Những hành trình khám phá, trải nghiệm và chinh phục thử thách.",
        isActive: true
    }
];

const CategorySeeder = async () => {
    try {
        let seededCount = 0;

        for (const categoryData of sampleCategories) {
            const existingCategory = await Category.findOne({
                $or: [
                    { name: categoryData.name },
                    { slug: categoryData.slug }
                ]
            });

            if (existingCategory) {
                console.log(`Category already exists: ${categoryData.name}`);
                continue;
            }

            const category = new Category(categoryData);
            await category.save();

            seededCount++;
        }

        console.log(`Successfully seeded ${seededCount} categor(ies).`);
    }
    catch (error) {
        console.error("Error seeding categories:", error);
        throw error;
    }
};

// Allow standalone execution: node src/seeders/Category.seeder.js
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
    (async () => {
        let exitCode = 0;

        try {
            await connectDB();
            await CategorySeeder();
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

export default CategorySeeder;
