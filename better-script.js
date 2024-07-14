/* This code is an improved version from script.js managed by ChatGPT */

document.addEventListener('DOMContentLoaded', () => {
    const btnAddBook = document.querySelector("#btnAddBook");
    const dialogNode = document.querySelector("dialog");
    const dialogClose = document.querySelector("#dialog__close");
    const dialogBtnAddBook = document.querySelector("#dialog__btnAddBook");

    class Book {
        constructor(title, author, pages, read) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        }
    }

    let myLibrary = [];

    const defaultBooks = [
        new Book("Twilight of the Idols", "Friedrich Nietzsche", 208, true),
        new Book("The Antichrist", "Friedrich Nietzsche", 91, true),
        new Book("Human, All-Too Human", "Friedrich Nietzsche", 536, false),
        new Book("Daybreak", "Friedrich Nietzsche", 296, false),
        new Book("The Gay Science", "Friedrich Nietzsche", 516, false),
        new Book("Beyond Good and Evil", "Friedrich Nietzsche", 240, false),
        new Book("On the Genealogy of Morals", "Friedrich Nietzsche", 208, false),
        new Book("Thus Spoke Zarathustra", "Friedrich Nietzsche", 335, false)
    ];

    myLibrary.push(...defaultBooks);

    function loadTable() {
        const mainNode = document.querySelector("main");
        mainNode.innerHTML = "";

        myLibrary.forEach((book, i) => {
            const cardNode = createCardNode(book, i);
            mainNode.appendChild(cardNode);
        });

        if (myLibrary.length === 0) {
            mainNode.textContent = "No items yet.";
        }
    }

    function createCardNode(book, id) {
        const cardNode = document.createElement('div');
        cardNode.className = 'card';
        cardNode.dataset.id = id;

        const titleNode = createElementWithText('h2', book.title, 'title');
        const authorNode = createElementWithText('p', book.author, 'author');
        const pagesNode = createElementWithText('p', `Pages: ${book.pages}`, 'pages');
        const readNode = createElementWithText('button', getReadMessage(book.read), 'read', 'button');
        const removeNode = createElementWithText('button', 'Remove', 'remove', 'button');

        cardNode.append(titleNode, authorNode, pagesNode, readNode, removeNode);

        return cardNode;
    }

    function createElementWithText(tag, text, className, type) {
        const element = document.createElement(tag);
        element.textContent = text;
        if (className) element.className = className;
        if (type) element.type = type;
        return element;
    }

    function getReadMessage(read) {
        return read ? "Have Read This" : "Not Read Yet";
    }

    function resetCardIds() {
        document.querySelectorAll('.card').forEach((card, index) => {
            card.dataset.id = index;
        });
    }

    /* Event Listeners */

    btnAddBook.addEventListener("click", () => dialogNode.showModal());

    dialogClose.addEventListener("click", () => dialogNode.close());

    dialogBtnAddBook.addEventListener("click", () => {
        const formNode = document.querySelector("form");

        formNode.addEventListener("submit", function (event) {
            event.preventDefault();
            const title = document.querySelector("#title").value.trim();
            const author = document.querySelector("#author").value.trim();
            const pages = document.querySelector("#pages").value.trim();
            const read = document.querySelector("#read").checked;

            if (title && author && pages) {
                const newBook = new Book(title, author, pages, read);
                myLibrary.push(newBook);

                loadTable();
                resetForm();

                addEventListeners();
            }
        });
    });

    function resetForm() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#pages").value = "";
        document.querySelector("#read").checked = false;
    }

    function addEventListeners() {
        document.querySelector("main").addEventListener("click", (e) => {
            if (e.target.classList.contains('remove')) {
                removeBook(e.target);
            } else if (e.target.classList.contains('read')) {
                changeReadStatus(e.target);
            }
        });
    }

    function removeBook(target) {
        const cardNode = target.closest('.card');
        const id = parseInt(cardNode.dataset.id, 10);
        myLibrary.splice(id, 1);
        loadTable();
        resetCardIds();
    }

    function changeReadStatus(target) {
        const cardNode = target.closest('.card');
        const id = parseInt(cardNode.dataset.id, 10);
        myLibrary[id].read = !myLibrary[id].read;
        target.textContent = getReadMessage(myLibrary[id].read);
    }

    /* Initial Load */
    loadTable();
    addEventListeners();
});
