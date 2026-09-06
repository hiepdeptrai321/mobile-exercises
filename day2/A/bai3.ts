function getError(): Promise<never> {
    return new Promise<never>((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Something went wrong"));
        }, 1000);
    });
}

getError().catch((error) => {
    console.log(error.message);
});