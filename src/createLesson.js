require('dotenv').config();
const postLesson = require('./post/postLesson');

const apiUrl = "https://api.mapstudy.edu.vn/admin/v1/course/_/section/905/lesson?sysId=1";
const accessToken = process.env.TOKEN_ADMIN;

const nameLessons = [
    "Bài 6 - Đang cập nhật ...",
    "Bài 7 - Đang cập nhật ...",
    "Bài 8 - Đang cập nhật ...",
    "Bài 9 - Đang cập nhật ...",
    "Bài 10 - Đang cập nhật ..."
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
