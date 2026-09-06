// 4. Create a class Rectangle with width and height. Write a method to calculate area and perimeter. 
class Rectangle {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    area(): number {
        return this.width * this.height;
    }

    perimeter(): number {
        return 2 * (this.width + this.height);
    }
}

const rect = new Rectangle(6, 7);

console.log(`Area: ${rect.area()}`);
console.log(`Perimeter: ${rect.perimeter()}`);