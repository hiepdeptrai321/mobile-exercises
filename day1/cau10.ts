// 10. Create a class Account with public, private and readonly fields. 

class Account {
    public username: string;
    private password: string;
    readonly accountId: number;

    constructor(username: string, password: string, accountId: number) {
        this.username = username;
        this.password = password;
        this.accountId = accountId;
    }

    checkPassword(password: string): boolean {
        return this.password === password;
    }
}

const account = new Account("hiep", "123456", 6789);

console.log(account.username);

console.log(account.accountId);
