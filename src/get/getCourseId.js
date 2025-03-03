

require('dotenv').config();

const getIds = async (url, token) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Sửa lỗi quên .json()
        // console.log("✔ Successfully retrieved courses:", data.data);
        return data.data;
    } catch (error) {
        console.error("❌ Failed to retrieve courses:", error.message);
        return null; // Trả về null nếu lỗi
    }
};

const apiUrl = "https://api.mapstudy.edu.vn/admin/v1/course/168/section?sort=order&pageSize=-1&sysId=1";
const accessToken = process.env.TOKEN_ADMIN;

console.log("🚀 Starting to get courses...");
console.log("🚀 apiUrl:", apiUrl);
// console.log("🚀 accessToken:", accessToken); // Hạn chế log token

const ids = [];

getIds(apiUrl, accessToken).then((data) => {
    if (data) {
        const courseIds = data.sections.map((course) => course.id);
        // console.log("✅ Course IDs:", courseIds);
        for (const id of courseIds) {
            getIds(`https://api.mapstudy.edu.vn/admin/v1/course/_/section/${id}/lesson?sort=order&pageSize=-1&sysId=1`, accessToken).then((data) => {
                if (data) {
                    // console.log("✅ Course data received:", data.data.lessons);
                    const lessonIds = data.lessons.map((lesson) => lesson.id);
                    ids.push(lessonIds);
                    console.log("✅ Lesson IDs:", lessonIds);
                } else {
                    console.log("⚠ No data received.");
                }
            }
            );
        }
    } else {
        console.log("⚠ No data received.");
    }
});
