function getError(): Promise<never> {
    return new Promise<never>((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Something went wrong"));
        }, 1000);
    });
}

async function handleError(): Promise<void> {
    try {
        await getError();
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log(error);
        }
    }
}

handleError();
