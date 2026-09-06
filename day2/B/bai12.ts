function simulateTask12(time: number): Promise<string> {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
}

async function runTask(): Promise<void> {
    const message = await simulateTask12(2000);
    console.log(message);
}

runTask();
