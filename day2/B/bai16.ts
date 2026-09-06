async function simulateTask16(time: number): Promise<string> {
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });

    return "Task done after " + time + " ms";
}

async function runInParallel(): Promise<void> {
    const results = await Promise.all([
        simulateTask16(1000),
        simulateTask16(2000),
        simulateTask16(3000)
    ]);

    console.log(results);
}

runInParallel();
