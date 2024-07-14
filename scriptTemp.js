
/* Factory pattern 1 */

const createBook = ({title, author, pages, read}) => ({
    title,
    author,
    pages,
    read,
    info() {
        let readMessage = this.read ? "read" : "not read yet";
        let message = `${this.title} by ${this.author}, ${this.pages} pages, ${readMessage}`;
        return message;
    },
});

const book1 = createBook({
    title: "Thus Spoke Zarathustra",
    author: "Friedrich Nietzsche",
    pages: "335",
    read: true});

console.log(book1.info());

/* Factory pattern 2 */

let BookModule = (function() {
    function Book(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    Book.prototype.info = function() {
        let readMessage = this.read ? "read" : "not read yet";
        let message = `${this.title} by ${this.author}, ${this.pages} pages, ${readMessage}`;
        return message;
    }

    return {
        createBook: function(title, author, pages, read) {
            return new Book(title, author, pages, read);
        }
    };
})();

let book2 = BookModule.createBook("Thus Spoke Zarathustra", "Friedrich Nietzsche", 335, true);
console.log(book2.info());

/* Prototype pattern */

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        let readMessage = this.read ? "read" : "not read yet";
        let message = `${this.title} by ${this.author}, ${this.pages} pages, ${readMessage}`;
        return message;
    }
}

const book3 = new Book("Thus Spoke Zarathustra", "Friedrich Nietzsche", 335, true);

console.log(book3.info());
