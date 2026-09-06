function getRandomNumber(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
        const number = Math.random();

        if (number >= 0.5) {
            resolve(number);
        } else {
            reject(new Error("Number is less than 0.5"));
        }
    });
}

getRandomNumber().then((number) => {
    console.log(number);
}).catch((error) => {
    console.log(error.message);
});
