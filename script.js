const btnAddBook = document.querySelector("#btnAddBook");
const dialogNode = document.querySelector("dialog");
const dialog__close = document.querySelector("#dialog__close");
const dialog__btnAddBook = document.querySelector("#dialog__btnAddBook");

/* Default books */

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
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
]

myLibrary.push(...defaultBooks);

/* Functions */

function loadTable() {

    const mainNode = document.querySelector("main");
    mainNode.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {

        let cardNode = document.createElement('div');
        cardNode.setAttribute('class', 'card');
        cardNode.setAttribute('data-id', i);
    
        let titleNode = document.createElement('h2');
        titleNode.setAttribute('class', 'title');
        titleNode.textContent = myLibrary[i].title;
        cardNode.appendChild(titleNode);
    
        let authorNode = document.createElement('p');
        authorNode.setAttribute('class', 'author');
        authorNode.textContent = myLibrary[i].author;
        cardNode.appendChild(authorNode);
    
        let pagesNode = document.createElement('p');
        pagesNode.setAttribute('class', 'pages');
        pagesNode.textContent = "Pages: " + myLibrary[i].pages;
        cardNode.appendChild(pagesNode);
    
        let readNode = document.createElement('button');
        readNode.setAttribute('class', 'read');
        readNode.setAttribute('type', 'button');
        readNode.textContent = getReadMessage(myLibrary[i].read);
        cardNode.appendChild(readNode);
    
        let removeNode = document.createElement('button');
        removeNode.setAttribute('class', 'remove');
        removeNode.setAttribute('type', 'button');
        removeNode.textContent = "Remove";
        cardNode.appendChild(removeNode);
    
        let mainNode = document.querySelector('main');
        mainNode.appendChild(cardNode);
    }
}

function getReadMessage(flag) {
    let readMessage = flag ? "Have Read This" : "Not Read Yet";
    return readMessage;
}

function resetCardsIds(id) {
    const cardNodeList = Array.from(document.querySelectorAll('.card'));
    for (let i = id; i < cardNodeList.length; i++){
        cardNodeList[i].setAttribute('data-id', i);
    }
}

/* Event Listeners */

btnAddBook.addEventListener("click", () => {
    dialogNode.showModal();
});

dialog__close.addEventListener("click", () => {
    dialogNode.close();
});

dialog__btnAddBook.addEventListener("click", () => {
    const formNode = document.querySelector("form");

    formNode.addEventListener("submit", function(e) {
        e.preventDefault();

        let input__title = document.querySelector("#title").value;
        let input__author = document.querySelector("#author").value;
        let input__pages = document.querySelector("#pages").value;
        let input__read = document.querySelector("#read").checked;

        if (input__title | input__author | input__pages) {
            const newBook = new Book(input__title, input__author, input__pages, input__read);
            myLibrary.push(newBook);
    
            loadTable();
    
            document.querySelector("#title").value = "";
            document.querySelector("#author").value = "";
            document.querySelector("#pages").value = "";
            document.querySelector("#read").checked = false;
    
            removeBook(Array.from(document.querySelectorAll('.remove')));
            changeReadStatus(Array.from(document.querySelectorAll('.read')));
        }
    });
});

function removeBook(list) {
    list.forEach(element => {    
            element.addEventListener("click", (e) => {
    
            let parentElement = e.target.parentNode;
            if (parentElement.getAttribute('class') === "card") {
                parentElement.remove();
                myLibrary.splice(parentElement.getAttribute('data-id'), 1);
                resetCardsIds(parentElement.getAttribute('data-id'));
            }
            if (myLibrary.length === 0) {

                document.querySelector("main").textContent = "No items yet.";
            }
        });
    });
}

function changeReadStatus(list) {
    list.forEach(element => {
        element.addEventListener("click", (e) => {
            let parentElement = e.target.parentNode;
            let id = parentElement.getAttribute('data-id')
            myLibrary[id].read = !myLibrary[id].read;
            e.target.textContent = getReadMessage(myLibrary[id].read);
        });
    });
}

loadTable();
removeBook(Array.from(document.querySelectorAll('.remove')));
changeReadStatus(Array.from(document.querySelectorAll('.read')));