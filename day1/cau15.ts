// 15. Create a Library class that can store Book and User objects. Add method to add books. 
import { User } from "./cau7";
import { Book } from "./cau6";
class Library {
    users: User[];
    books: Book[];
    constructor(users: User[], books: Book[]){
        this.users = users;
        this.books = books;
    }

    addBook(book: Book): void{
        this.books.push(book)
    }

    addUser(user: User): void{
        this.users.push(user)
    }

    showBooks(): void{
        this.books.forEach(element => {
            console.log(`Title: ${element.title} Author: ${element.author} Year: ${element.year}`)
        });
    }

    showUsers(): void{
        this.users.forEach(element => {
            console.log(`Name: ${element.getName()}`)
        });
    }
}

const users : User[] = [
    new User("Jason"),
    new User("Alex"),
    new User("Thoum")
]

const books: Book[] = [
    new Book("Doraemon", "Fujiiko", 1954)
]

const lib : Library = new Library(users, books)

lib.showBooks()
lib.showUsers()

lib.addBook(new Book("One Piece", "Oda", 2002))
lib.addUser(new User("ThaiOn"))
console.log("==================================")
lib.showBooks()
lib.showUsers()
