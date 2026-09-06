function simulateTask7(time: number): Promise<string> {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve("Task done after " + time + " ms");
        }, time);
    });
}

Promise.race([
    simulateTask7(3000),
    simulateTask7(1000),
    simulateTask7(2000)
]).then((result) => {
    console.log(result);
});
