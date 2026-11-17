import "dotenv/config";
import Reader from "../models/Reader.js";
import connectDB from "../config/database.config.js";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { READER_ISACTIVE } from "../constants/Reader.constant.js";

const sampleReaders = [
    {
        fullName: "Nguyễn Văn An",
        email: "nguyenvanan@inkverse.com",
        password: "password123",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=An",
        walletBalance: 50000,
        isActive: READER_ISACTIVE.ACTIVE
    },
    {
        fullName: "Trần Thị Bình",
        email: "tranthibinh@inkverse.com",
        password: "password123",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Binh",
        walletBalance: 100000,
        isActive: READER_ISACTIVE.ACTIVE
    },
    {
        fullName: "Lê Hoàng Cường",
        email: "lehoangcuong@inkverse.com",
        password: "password123",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cuong",
        walletBalance: 0,
        isActive: READER_ISACTIVE.ACTIVE
    },
    {
        fullName: "Phạm Minh Dung",
        email: "phamminhdung@inkverse.com",
        password: "password123",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dung",
        walletBalance: 25000,
        isActive: READER_ISACTIVE.INACTIVE
    }
];

const ReaderSeeder = async () => {
    try {
        let seededCount = 0;

        for (const readerData of sampleReaders) {
            const existingReader = await Reader.findOne({ email: readerData.email });
            if (existingReader) {
                console.log(`Reader already exists with email: ${readerData.email}`);
                continue;
            }

            const reader = new Reader(readerData);
            await reader.save();
            seededCount++;
        }

        console.log(`Successfully seeded ${seededCount} reader(s).`);
    } catch (error) {
        console.error("Error seeding readers:", error);
        throw error;
    }
};

// Allow standalone execution: node src/seeders/Reader.seeder.js
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
    (async () => {
        try {
            await connectDB();
            await ReaderSeeder();
        } catch (error) {
            console.error("Standalone seeding failed:", error);
            process.exit(1);
        } finally {
            await mongoose.connection.close();
            process.exit(0);
        }
    })();
}

export default ReaderSeeder;

