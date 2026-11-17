
import "dotenv/config";
import Chapter from "../models/Chapter.js";
import Story from "../models/Story.js";
import connectDB from "../config/database.config.js";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { CHAPTER_STATUS } from "../constants/Chapter.constant.js";

const sampleChapters = [
    // Ánh Đèn Cuối Ngõ
    {
        storySlug: "anh-den-cuoi-ngo",
        chapterNumber: 1,
        title: "Con Ngõ Sau Cơn Mưa",
        content: "Cơn mưa chiều vừa dứt, con ngõ nhỏ lại trở về với vẻ yên bình vốn có. Những mái nhà cũ nằm san sát nhau, nước mưa còn đọng trên từng tán lá. Nam bước chậm qua con đường quen thuộc, trong lòng mang theo những suy nghĩ chưa thể gọi thành tên.\n\nỞ cuối ngõ, ánh đèn vàng từ một căn nhà nhỏ vẫn sáng. Đó là nơi duy nhất khiến anh cảm thấy mình vẫn còn một chốn để trở về.",
        status: CHAPTER_STATUS.APPROVED,
        isFree: true,
        price: 0,
        reviewNote: null,
        reviewedBy: null,
        reviewedAt: new Date("2026-11-10"),
        publishedAt: new Date("2026-11-10")
    },
    {
        storySlug: "anh-den-cuoi-ngo",
        chapterNumber: 2,
        title: "Ánh Đèn Còn Sáng",
        content: "Đêm xuống, con ngõ trở nên tĩnh lặng. Nam đứng trước cánh cửa gỗ đã cũ, lặng lẽ nhìn ánh đèn hắt qua khe cửa. Anh nhớ lại những ngày tháng đã qua, khi căn nhà này vẫn còn đầy ắp tiếng cười.\n\nCó những điều tưởng chừng đã mất đi mãi mãi, nhưng chỉ cần một người còn chờ đợi, con đường trở về vẫn luôn tồn tại.",
        status: CHAPTER_STATUS.APPROVED,
        isFree: true,
        price: 0,
        reviewNote: null,
        reviewedBy: null,
        reviewedAt: new Date("2026-11-10"),
        publishedAt: new Date("2026-11-11")
    },

    // Mùa Hạ Không Tên
    {
        storySlug: "mua-ha-khong-ten",
        chapterNumber: 1,
        title: "Ngày Gặp Gỡ",
        content: "Mùa hạ năm ấy bắt đầu bằng một buổi sáng đầy nắng. Con đường đến trường ngập sắc phượng đỏ, tiếng ve vang lên từ những tán cây già. Minh gặp cô gái ấy lần đầu tiên tại thư viện, khi cả hai cùng đưa tay về phía một cuốn sách.\n\nMột lời xin lỗi vụng về, một nụ cười dịu dàng và một cuộc gặp gỡ tưởng chừng rất đỗi bình thường đã mở đầu cho những tháng ngày không thể quên.",
        status: CHAPTER_STATUS.PENDING,
        isFree: true,
        price: 0,
        reviewNote: null,
        reviewedBy: null,
        reviewedAt: null,
        publishedAt: null
    },
    {
        storySlug: "mua-ha-khong-ten",
        chapterNumber: 2,
        title: "Lá Thư Chưa Gửi",
        content: "Chiều cuối tuần, Minh ngồi bên cửa sổ nhìn những cánh phượng rơi ngoài sân. Trên bàn là lá thư đã được viết đi viết lại nhiều lần nhưng vẫn chưa có đủ can đảm để gửi.\n\nCậu hiểu rằng có những lời muốn nói không phải lúc nào cũng dễ dàng thốt ra. Đôi khi, sự im lặng lại chứa đựng nhiều cảm xúc hơn tất cả những câu chữ có thể viết thành lời.",
        status: CHAPTER_STATUS.PENDING,
        isFree: false,
        price: 10000,
        reviewNote: null,
        reviewedBy: null,
        reviewedAt: null,
        publishedAt: null
    },

    // Chuyến Tàu Qua Phố Nhỏ
    {
        storySlug: "chuyen-tau-qua-pho-nho",
        chapterNumber: 1,
        title: "Chuyến Tàu Buổi Sớm",
        content: "Tiếng còi tàu vang lên giữa buổi sáng còn phủ đầy sương. Tại sân ga nhỏ, những hành khách lặng lẽ mang theo hành lý và những câu chuyện riêng. Có người trở về quê nhà, có người bắt đầu một hành trình mới.\n\nÔng lão ngồi ở chiếc ghế gỗ quen thuộc, đôi mắt dõi theo đoàn tàu đang chậm rãi rời khỏi sân ga. Đối với ông, mỗi chuyến tàu đi qua đều mang theo một phần ký ức.",
        status: CHAPTER_STATUS.APPROVED,
        isFree: true,
        price: 0,
        reviewNote: null,
        reviewedBy: null,
        reviewedAt: new Date("2026-11-10"),
        publishedAt: new Date("2026-11-10")
    },
    {
        storySlug: "chuyen-tau-qua-pho-nho",
        chapterNumber: 2,
        title: "Người Khách Quen",
        content: "Sáng hôm sau, người khách quen lại xuất hiện tại sân ga. Ông vẫn mang chiếc túi vải cũ và ngồi đúng vị trí hôm qua. Người bán nước nhận ra ông, nhẹ nhàng đặt trước mặt ông một tách trà nóng.\n\nKhông ai biết ông đang chờ đợi điều gì. Chỉ có tiếng bánh tàu lăn đều trên đường ray vẫn kiên nhẫn nhắc nhở rằng thời gian chưa bao giờ ngừng trôi.",
        status: CHAPTER_STATUS.APPROVED,
        isFree: true,
        price: 0,
        reviewNote: null,
        reviewedBy: null,
        reviewedAt: new Date("2026-11-10"),
        publishedAt: new Date("2026-11-11")
    },

    // Bí Mật Khu Rừng Xanh
    {
        storySlug: "bi-mat-khu-rung-xanh",
        chapterNumber: 1,
        title: "Cánh Cổng Trong Rừng",
        content: "Một buổi sáng đẹp trời, An cùng những người bạn quyết định khám phá khu rừng phía sau ngôi làng. Sau một hồi đi sâu vào trong, cả nhóm bất ngờ phát hiện một cánh cổng đá phủ đầy dây leo.\n\nTrên cánh cổng có những ký hiệu kỳ lạ. Không ai biết chúng có ý nghĩa gì, nhưng tất cả đều cảm nhận được rằng phía sau cánh cổng đang ẩn chứa một bí mật thú vị.",
        status: CHAPTER_STATUS.DRAFT,
        isFree: true,
        price: 0,
        reviewNote: null,
        reviewedBy: null,
        reviewedAt: null,
        publishedAt: null
    },
    {
        storySlug: "bi-mat-khu-rung-xanh",
        chapterNumber: 2,
        title: "Dấu Chân Bí Ẩn",
        content: "Khi cả nhóm đang tìm cách mở cánh cổng, một âm thanh lạ bất ngờ vang lên từ phía sau những bụi cây. Trên nền đất ẩm xuất hiện những dấu chân nhỏ kéo dài về phía sâu trong rừng.\n\nAn nhìn các bạn rồi quyết định đi theo dấu chân ấy. Không ai biết chuyến phiêu lưu này sẽ dẫn họ đến đâu, nhưng tất cả đều háo hức khám phá điều đang chờ đợi phía trước.",
        status: CHAPTER_STATUS.DRAFT,
        isFree: true,
        price: 0,
        reviewNote: null,
        reviewedBy: null,
        reviewedAt: null,
        publishedAt: null
    }
];

const ChapterSeeder = async () => {
    try {
        let seededCount = 0;

        for (const chapterData of sampleChapters) {
            // Tìm truyện theo slug
            const story = await Story.findOne({
                slug: chapterData.storySlug
            });

            if (!story) {
                console.log(`Story not found: ${chapterData.storySlug}`);
                continue;
            }

            // Kiểm tra chương đã tồn tại
            const existingChapter = await Chapter.findOne({
                storyId: story._id,
                chapterNumber: chapterData.chapterNumber
            });

            if (existingChapter) {
                console.log(
                    `Chapter already exists: ${story.title} - Chapter ${chapterData.chapterNumber}`
                );
                continue;
            }

            // Loại bỏ trường dùng để tìm kiếm truyện
            const { storySlug, ...chapterInfo } = chapterData;

            // Khởi tạo Chapter
            const chapter = new Chapter({
                ...chapterInfo,
                storyId: story._id
            });

            await chapter.save();
            seededCount++;
        }

        console.log(`Successfully seeded ${seededCount} chapter(s).`);
    }
    catch (error) {
        console.error("Error seeding chapters:", error);
        throw error;
    }
};

// Allow standalone execution: node src/seeders/Chapter.seeder.js
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
    (async () => {
        let exitCode = 0;

        try {
            await connectDB();
            await ChapterSeeder();
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

export default ChapterSeeder;
