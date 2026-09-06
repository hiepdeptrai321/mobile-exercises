// 14. Create a base class Employee. Extend Manager and Developer with specific methods. 
abstract class Employee {
    abstract work(): void;
}

class Manager extends Employee {

    work(): void {
        console.log("Planning new project...")
    }
}

class Developer extends Employee {

    work(): void {
        console.log("Coding something...")
    }
}

const manager = new Manager()
manager.work();
const dev = new Developer();
dev.work();