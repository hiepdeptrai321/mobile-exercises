// 5. Create a class BankAccount with balance. Add methods deposit() and withdraw().
class BankAccount {
    balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    deposit(amount: number): void {
        this.balance += amount;
    }

    withdraw(amount: number): void {
        this.balance -= amount;
    }

    showBalance(): void {
        console.log("Balance: " + this.balance)
    }
}

const acc = new BankAccount(1000);

acc.showBalance();
acc.deposit(400);
acc.showBalance();
acc.withdraw(1300);
acc.showBalance();