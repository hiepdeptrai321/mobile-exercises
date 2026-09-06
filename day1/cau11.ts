// 11. Create a base class Animal. Extend Dog and Cat classes with methods bark() and meow(). 
class Animal {
    name: String;

    constructor(name: String) {
        this.name = name;
    }
}

class Dog extends Animal {
    bark(): void {
        console.log("Gau");
    }
}

class Cat extends Animal {
    meow(): void {
        console.log("Meow");
    }
}

const dog = new Dog("Lucky");
dog.bark();
const cat = new Cat("JJ")
cat.meow()

