function simulateTask28(id: number): Promise<string> {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve("Task " + id + " done");
        }, 1000);
    });
}

async function batchProcess(): Promise<void> {
    const tasks = [1, 2, 3, 4, 5];
    const results = await Promise.all(tasks.map((id) => simulateTask28(id)));
    console.log(results);
}

batchProcess();
