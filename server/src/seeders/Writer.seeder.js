import "dotenv/config";
import Writer from "../models/Writer.js";
import connectDB from "../config/database.config.js";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { WRITER_ISACTIVE } from "../constants/Writer.constant.js";

const sampleWriters = [
    {
        penName: "Nam Cao",
        email: "namcao@inkverse.com",
        password: "password123",
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=NamCao",
        bio: "Tác giả chuyên sáng tác truyện ngắn hiện thực xã hội và tâm lý nhân vật.",
        revenueBalance: 1500000,
        isActive: WRITER_ISACTIVE.ACTIVE
    },
    {
        penName: "Xuân Diệu",
        email: "xuandieu@inkverse.com",
        password: "password123",
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=XuanDieu",
        bio: "Nhà thơ, tác giả của những tác phẩm tình yêu nồng nàn và lãng mạn.",
        revenueBalance: 3200000,
        isActive: WRITER_ISACTIVE.ACTIVE
    },
    {
        penName: "Thạch Lam",
        email: "thachlam@inkverse.com",
        password: "password123",
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=ThachLam",
        bio: "Cây bút nhẹ nhàng, tinh tế và giàu cảm xúc đời thường.",
        revenueBalance: 0,
        isActive: WRITER_ISACTIVE.ACTIVE
    },
    {
        penName: "Tô Hoài",
        email: "tohoai@inkverse.com",
        password: "password123",
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=ToHoai",
        bio: "Tác giả văn học thiếu nhi, phiêu lưu và đồng thoại đặc sắc.",
        revenueBalance: 850000,
        isActive: WRITER_ISACTIVE.INACTIVE
    }
];

const WriterSeeder = async () => {
    try {
        let seededCount = 0;

        for (const writerData of sampleWriters) {
            const existingWriter = await Writer.findOne({ email: writerData.email });
            if (existingWriter) {
                console.log(`Writer already exists with email: ${writerData.email}`);
                continue;
            }

            const writer = new Writer(writerData);
            await writer.save();
            seededCount++;
        }

        console.log(`Successfully seeded ${seededCount} writer(s).`);
    } catch (error) {
        console.error("Error seeding writers:", error);
        throw error;
    }
};

// Allow standalone execution: node src/seeders/Writer.seeder.js
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
    (async () => {
        try {
            await connectDB();
            await WriterSeeder();
        } catch (error) {
            console.error("Standalone seeding failed:", error);
            process.exit(1);
        } finally {
            await mongoose.connection.close();
            process.exit(0);
        }
    })();
}

export default WriterSeeder;
