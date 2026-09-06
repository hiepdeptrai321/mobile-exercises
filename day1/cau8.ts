// 8. Create a Product class with name, price. Create an array of products and filter products with price > 100. +
class Product {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

const products: Product[] = [
    new Product("Backpack", 80),
    new Product("Mouse", 50),
    new Product("Phone", 1500),
    new Product("Headphone", 300),
    new Product("Car", 20000)
];

const expensiveProducts = products.filter(
    product => product.price > 100
);

console.log(expensiveProducts);
