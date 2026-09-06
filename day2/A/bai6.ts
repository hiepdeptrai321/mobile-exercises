function simulateTask6(time: number): Promise<string> {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
}

Promise.all([
    simulateTask6(1000),
    simulateTask6(2000),
    simulateTask6(3000)
]).then((results) => {
    console.log(results);
});
