function simulateTask10(success: boolean): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve("Task done");
            } else {
                reject(new Error("Something went wrong"));
            }
        }, 1000);
    });
}

simulateTask10(true).then((message) => {
    console.log(message);
}).catch((error) => {
    console.log(error.message);
}).finally(() => {
    console.log("Done");
});

simulateTask10(false).then((message) => {
    console.log(message);
}).catch((error) => {
    console.log(error.message);
}).finally(() => {
    console.log("Done");
});
