require('dotenv').config();
const getAPI = require('./get/getAPI');
const fs = require('fs');

const api = process.env.API_URL;
const accessToken = process.env.TOKEN_ADMIN;

async function getCourses(apiUrl) {
    try {
        return await getAPI(apiUrl, accessToken);
    } catch (error) {
        console.error("❌ Failed to get courses:", error.message);
        return null;
    }
}

async function getLesson(lessonId) {
    try {
        return await getAPI(`${api}/admin/v1/course/_/section/${lessonId}/lesson?sort=order&pageSize=-1&sysId=1`, accessToken);
    } catch (error) {
        console.error("❌ Failed to get lessons:", error.message);
        return null;
    }
}

async function getCourse(courseId) {
    try {
        const lessonData = await getLesson(courseId);
        return lessonData ? lessonData.lessons : [];
    } catch (error) {
        console.error("❌ Failed to get course:", error.message);
        return [];
    }
}

async function getDataLesson(lessonId) {
    try {
        const comments = await getAPI(`${api}/v1/lesson/${lessonId}/comment?page=1&pageSize=15&sysId=1`, accessToken);
        const data = await getAPI(`${api}/admin/v1/course/_/section/_/lesson/${lessonId}?sysId=1`, accessToken);
        return { ...data, comments };
    } catch (error) {
        console.error(`❌ Failed to get data for lesson ${lessonId}:`, error.message);
        return null;
    }
}

async function getDataLessons(lessons) {
    console.log("🚀 Fetching comments for lessons sequentially...");
    let results = [];

    for (const lesson of lessons) {
        const dataLesson = await getDataLesson(lesson.id);
        if (dataLesson) {
            results.push(dataLesson);
        }
        // await new Promise(resolve => setTimeout(resolve, 1000)); // Thêm độ trễ 1 giây để tránh bị chặn
    }

    return results;
}

async function main() {
    const apiUrl = `${api}/admin/v1/course/168/section?sort=order&pageSize=-1&sysId=1`;
    console.log("🚀 Fetching courses from:", apiUrl);

    const courses = await getCourses(apiUrl);
    if (!courses || !courses.sections) {
        console.error("❌ No courses found.");
        return;
    }

    console.log("🚀 Fetching lessons sequentially...");
    let data = [];

    for (const course of courses.sections) {
        const lessons = await getCourse(course.id);
        if (lessons.length === 0) continue;

        const dataResponse = await getDataLessons(lessons);
        if (dataResponse.length > 0) {
            data.push({ course, lessons: dataResponse });
        }
    }

    fs.unlinkSync('data.json');
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    console.log("✅ Data saved to data.json");
}

main();
