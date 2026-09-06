async function simulateTask15(time: number): Promise<string> {
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });

    return "Task done after " + time + " ms";
}

async function runSequentially(): Promise<void> {
    const firstResult = await simulateTask15(1000);
    console.log(firstResult);

    const secondResult = await simulateTask15(2000);
    console.log(secondResult);

    const thirdResult = await simulateTask15(3000);
    console.log(thirdResult);
}

runSequentially();
