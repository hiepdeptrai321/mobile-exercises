function simulateTask17(time: number): Promise<string> {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve("Task done after " + time + " ms");
        }, time);
    });
}

async function iteratePromises(): Promise<void> {
    const promises = [
        simulateTask17(3000),
        simulateTask17(1000),
        simulateTask17(2000)
    ];

    for await (const result of promises) {
        console.log(result);
    }
}

iteratePromises();
