async function fetchTodos(): Promise<void> {
    const ids = [1, 2, 3];

    for (const id of ids) {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/" + id);

        if (!response.ok) {
            throw new Error("HTTP error: " + response.status);
        }

        const todo = await response.json();
        console.log(todo);
    }
}

fetchTodos().catch((error) => {
    console.log(error.message);
});
