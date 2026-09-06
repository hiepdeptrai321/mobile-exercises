// 2. Write a class Student extending Person with an additional attribute grade. Add a method to display all info. 
import { Person } from "./cau1";
class Student extends Person {
    grade: number;
}

function printStudent(st: Student): void {
    console.log(`Name: ${st.name} Age: ${st.age} Grade:${st.grade}`);
}

const st : Student = {
    name: "Đỗ Phú Hiệp",
    age: 22,
    grade: 3
}

printStudent(st)
