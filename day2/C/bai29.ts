function simulateTask29(id: number): Promise<string> {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve("Task " + id + " done");
        }, 1000);
    });
}

async function queueProcess(): Promise<void> {
    const tasks = [1, 2, 3, 4, 5];

    for (const id of tasks) {
        const result = await simulateTask29(id);
        console.log(result);
    }
}

queueProcess();
