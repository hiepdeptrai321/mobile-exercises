const promise = new Promise<number[]>((resolve) => {
    setTimeout(() => {
        resolve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }, 1000);
});

promise.then((numbers) => {
    return numbers.filter((number) => number % 2 === 0);
}).then((evenNumbers) => {
    console.log(evenNumbers);
});
