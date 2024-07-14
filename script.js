
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const myLibrary = [];

/* Default books */

const book1 = new Book("Twilight of the Idols", "Friedrich Nietzsche", 208, true);
myLibrary.push(book1);

const book2 = new Book("The Antichrist", "Friedrich Nietzsche", 91, true);
myLibrary.push(book2);

const book3 = new Book("Human, All-Too Human", "Friedrich Nietzsche", 536, false);
myLibrary.push(book3);

const book4 = new Book("Daybreak", "Friedrich Nietzsche", 296, false);
myLibrary.push(book4);

const book5 = new Book("The Gay Science", "Friedrich Nietzsche", 516, false);
myLibrary.push(book5);

const book6 = new Book("Beyond Good and Evil", "Friedrich Nietzsche", 240, false);
myLibrary.push(book6);

const book7 = new Book("On the Genealogy of Morals", "Friedrich Nietzsche", 208, false);
myLibrary.push(book7);

const book8 = new Book("Thus Spoke Zarathustra", "Friedrich Nietzsche", 335, false);
myLibrary.push(book8);

function addBookToLibrary() {
  // do stuff here
}

function loadTable() {

    let mainNode = document.querySelector("main");
    mainNode.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {

        let cardNode = document.createElement('div');
        cardNode.setAttribute('class', 'card');
        cardNode.setAttribute('data-id', i);
    
        let titleNode = document.createElement('h2');
        titleNode.setAttribute('class', 'title');
        let titleTextnode = document.createTextNode(myLibrary[i].title);
        titleNode.appendChild(titleTextnode);
        cardNode.appendChild(titleNode);
    
        let authorNode = document.createElement('p');
        authorNode.setAttribute('class', 'author');
        let authorTextnode = document.createTextNode(myLibrary[i].author);
        authorNode.appendChild(authorTextnode);
        cardNode.appendChild(authorNode);
    
        let pagesNode = document.createElement('p');
        pagesNode.setAttribute('class', 'pages');
        let pagesTextnode = document.createTextNode("Pages: " + myLibrary[i].pages);
        pagesNode.appendChild(pagesTextnode);
        cardNode.appendChild(pagesNode);
    
        let readNode = document.createElement('button');
        readNode.setAttribute('class', 'read');
        readNode.setAttribute('type', 'button');
    
        let readTextnode = document.createTextNode(getReadMessage(myLibrary[i].read));
        readNode.appendChild(readTextnode);
        cardNode.appendChild(readNode);
    
        let removeNode = document.createElement('button');
        removeNode.setAttribute('class', 'remove');
        removeNode.setAttribute('type', 'button');
        let removeTextnode = document.createTextNode("Remove");
        removeNode.appendChild(removeTextnode);
        cardNode.appendChild(removeNode);
    
        let mainNode = document.querySelector('main');
        mainNode.appendChild(cardNode);
    }
}

loadTable();

function getReadMessage(flag) {
    let readMessage = flag ? "Have Read This" : "Not Read Yet";
    return readMessage;
}

const btnAddBook = document.querySelector("#btnAddBook");
const dialogNode = document.querySelector("dialog");

btnAddBook.addEventListener("click", () => {
    dialogNode.showModal();
});

const btnClose = document.querySelector("#close");

btnClose.addEventListener("click", () => {
    dialogNode.close();
});

const dialog__btnAddBook = document.querySelector("#dialog__btnAddBook");

dialog__btnAddBook.addEventListener("click", () => {
    let input__title = document.querySelector("#title").value;
    let input__author = document.querySelector("#author").value;
    let input__pages = document.querySelector("#pages").value;
    let input__read = document.querySelector("#read").checked;

    let formNode = document.querySelector("form");

    formNode.addEventListener("submit", function() {
        tempBook = new Book(input__title, input__author, input__pages, input__read);
        myLibrary.push(tempBook);

        loadTable();

        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#pages").value = "";
        document.querySelector("#read").checked = false;
    });
});

const btnRemoveList = Array.from(document.querySelectorAll('.remove'));

btnRemoveList.forEach(element => {
    element.addEventListener("click", (e) => {
        let parentElement = e.target.parentNode;
        if (parentElement.getAttribute('class') === "card") {
            parentElement.remove();
            myLibrary.splice(parentElement.getAttribute('data-id'), 1);
            resetCardsIds(parentElement.getAttribute('data-id'));
        }
        if (myLibrary.length === 0) {
            document.querySelector("main").appendChild(document.createTextNode("No items yet."));
        }
    });
});

function resetCardsIds(id) {
    const cardNodeList = Array.from(document.querySelectorAll('.card'));
    for (let i = id; i < cardNodeList.length; i++){
        cardNodeList[i].setAttribute('data-id', i);
    }
}

const btnReadList = Array.from(document.querySelectorAll('.read'));
btnReadList.forEach(element => {
    element.addEventListener("click", (e) => {
        let parentElement = e.target.parentNode;
        let id = parentElement.getAttribute('data-id')
        e.target.textContent = getReadMessage(!myLibrary[id].read);
        myLibrary[id].read = !myLibrary[id].read;
    });
});
