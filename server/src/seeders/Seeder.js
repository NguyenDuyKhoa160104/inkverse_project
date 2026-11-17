import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/database.config.js";
import AdminSeeder from "./Admin.seeder.js";
import ReaderSeeder from "./Reader.seeder.js";
import WriterSeeder from "./Writer.seeder.js";
import CategorySeeder from "./Category.seeder.js";
import StorySeeder from "./Story.seeder.js";
import ChapterSeeder from "./Chapter.seeder.js";

const seedDatabase = async () => {
    try {
        await connectDB();
        await AdminSeeder();
        await ReaderSeeder();
        await WriterSeeder();
        await CategorySeeder();
        await StorySeeder();
        await ChapterSeeder();
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
};

seedDatabase();