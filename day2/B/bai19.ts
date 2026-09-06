interface User {
    id: number;
    name: string;
}

async function fetchUser(id: number): Promise<User> {
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });

    return { id: id, name: "User " + id };
}

async function fetchUsers(ids: number[]): Promise<User[]> {
    const users = await Promise.all(ids.map((id) => fetchUser(id)));
    return users;
}

fetchUsers([1, 2, 3]).then((users) => {
    console.log(users);
});
