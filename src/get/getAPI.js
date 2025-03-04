const getIds = async (url, token = null) => {
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

module.exports = getIds;

