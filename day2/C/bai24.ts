async function postData(): Promise<void> {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: "Hello Async",
            body: "Learning TypeScript async/await",
            userId: 1
        })
    });

    if (!response.ok) {
        throw new Error("HTTP error: " + response.status);
    }

    const data = await response.json();
    console.log(data);
}

postData().catch((error) => {
    console.log(error.message);
});
