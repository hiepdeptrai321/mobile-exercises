// 7. Write a class User with private property name and getter/setter. 
export class User {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }
}

// const user = new User("Đỗ Phú Hiệp");

// console.log(user.getName());

// user.setName("Trallelo Tralala");

// console.log(user.getName());
