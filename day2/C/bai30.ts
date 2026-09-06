async function fetchAllData(): Promise<void> {
    const urls = [
        "https://jsonplaceholder.typicode.com/todos/1",
        "https://jsonplaceholder.typicode.com/todos/2",
        "https://jsonplaceholder.typicode.com/todos/999999"
    ];

    const results = await Promise.allSettled(urls.map(async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("HTTP error: " + response.status);
        }

        return await response.json();
    }));

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(urls[index], "Success:", result.value);
        } else {
            console.log(urls[index], "Failure:", result.reason);
        }
    });
}

fetchAllData().catch((error) => {
    console.log(error.message);
});
