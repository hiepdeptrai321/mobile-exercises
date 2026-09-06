function simulateTask5(time: number): Promise<string> {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
}

simulateTask5(2000).then((message) => {
    console.log(message);
});
