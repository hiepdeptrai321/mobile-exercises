// 1. Create a class Person with attributes name and age. Write a method to display this information. 
export class Person {
    name: String;
    age: number;
}

function printPerson(p: Person): void {
    console.log(`Name: ${p.name} Age: ${p.age}`);
}

const p : Person = {
    name: "Đỗ Phú Hiệp",
    age: 22
}

printPerson(p)