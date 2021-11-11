class Book{
    constructor(title, author, pages, status){
        this.title = title;
        this.author = author;
        this.pages  = pages;
        this.status = status;
    }
}

//UI Class

class UI{
    static displayBooks(){
        const StoredBooks = Store.getBook();

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){

        const list = document.querySelector('.book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.status}</td>
        <td><i class = "fas fa-trash-alt delete"></i></td>
        `
        list.appendChild(row)
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector( 'input[name="status"]').value = null;
    }

    static deleteBook(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }

    }
}

//Storage Class

class Store{

    static getBook(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books
    }

    static addBook(book){
        const books = Store.getBook();
        books.push(book);
        localStorage.setItem('books' , JSON.stringify(books))
    }

    static removeBook(title){
        const books = Store.getBook();

        books.forEach((book, index) =>{
            if(book.title === title){
                books.splice(index, 1);
            }
        })

        localStorage.setItem('books' , JSON.stringify(books))

        
    }
}

//Event to display the books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

//Add a book to list
document.querySelector('.book-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    var status = document.querySelector( 'input[name="status"]').value; 

    if(title === '' || author === '' || pages === '' || status === null){
        alert("Please fill all the fields")
    }
    else{
        //Instantiate Book constructor
        const book = new Book(title, author, pages, status);
    
        //Add book to UI
        UI.addBookToList(book)

        //Add book to LS
        Store.addBook(book)

        const modal_bg = document.querySelector(".modal-bg");
        modal_bg.classList.remove('bg-active');
        alert("Book added successfully");
        
        //Clear fiels after adding the book to the list
        UI.clearFields()

        
    }
    
})

document.querySelector('.book-list').addEventListener('click', (e)=>{
    //Remove book for UI
    UI.deleteBook(e.target);

    //Remove book for LS
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent)
})

const modal_btn = document.querySelector('.add-btn');
const modal_bg = document.querySelector(".modal-bg");

modal_btn.addEventListener('click', ()=>{
    modal_bg.classList.add('bg-active')
})

const modal_close = document.querySelector('.modal-close');
modal_close.addEventListener('click', ()=>{
    modal_bg.classList.remove('bg-active')
})