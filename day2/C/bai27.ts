async function fetchWithRetry(url: string, retries: number): Promise<unknown> {
    if (!Number.isInteger(retries) || retries < 0) {
        throw new Error("Retries must be a non-negative integer");
    }

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }

            return await response.json();
        } catch (error) {
            if (attempt === retries) {
                throw error;
            }

            console.log("Retry " + (attempt + 1));
        }
    }
}

fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 3).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error.message);
});
