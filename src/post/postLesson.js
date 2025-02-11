const postLesson = async (url, token, requestData) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`✔ Successfully created lesson: ${requestData.name}`);
        return data;
    } catch (error) {
        console.error(`❌ Failed to create lesson: ${requestData.name}`, error);
    }
};

module.exports = postLesson;
