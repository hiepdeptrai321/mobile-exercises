interface User {
    id: number;
    name: string;
}

function fetchUser(id: number, time: number): Promise<User> {
    return new Promise<User>((resolve) => {
        setTimeout(() => {
            resolve({ id: id, name: "User " + id });
        }, time);
    });
}

async function fetchUserWithTimeout(id: number, time: number): Promise<User> {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const timeout = new Promise<never>((resolve, reject) => {
        timeoutId = setTimeout(() => {
            reject(new Error("API call timed out after 2 seconds"));
        }, 2000);
    });

    try {
        return await Promise.race([fetchUser(id, time), timeout]);
    } finally {
        clearTimeout(timeoutId);
    }
}

fetchUserWithTimeout(1, 1000).then((user) => {
    console.log(user);
}).catch((error) => {
    console.log(error.message);
});
