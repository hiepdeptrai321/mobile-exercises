// 3. Create a class Car with properties brand, model, year. Write a method to show car info. 
export class Car {
    brand: String;
    model: String;
    year: number;
}

function printCar(p: Car): void {
    console.log(`Brand: ${p.brand} Model: ${p.model} Year: ${p.year}`);
}

const p : Car = {
    brand: "Mercedes",
    model: "S450",
    year: 2022
}

printCar(p)