require('dotenv').config();
const postLesson = require('./post/postLesson');

const apiUrl = "https://api.mapstudy.edu.vn/admin/v1/course/_/section/908/lesson?sysId=1";
const accessToken = process.env.TOKEN_ADMIN;

const nameLessons = 	[
    "Hóa học vô cơ - Kim loại nhóm IA, IIA",
    "Hóa học vô cơ - Sơ lược dãy kim loại chuyển tiếp thứ nhất và phức chất",
    "Hóa học vô cơ - Hóa học nguyên tố Nitrogen và Sulfur",
    "Hóa học vô cơ - Hóa học nguyên tố Halogen"
  ];

const createLessons = async () => {
    console.log("🚀 Starting to create lessons...");

    for (const name of nameLessons) {
        const requestData = {
            name,
            completeType: "video",
            status: 1,
            sysId: 1
        };
        await postLesson(apiUrl, accessToken, requestData);
    }

    console.log("✅ All lessons have been created.");
};

createLessons();
