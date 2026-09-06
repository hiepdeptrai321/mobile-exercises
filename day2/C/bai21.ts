async function fetchTodo(): Promise<void> {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

    if (!response.ok) {
        throw new Error("HTTP error: " + response.status);
    }

    const todo = await response.json();
    console.log(todo);
}

fetchTodo().catch((error) => {
    console.log(error.message);
});
