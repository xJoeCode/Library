function Book (title, author, pages){
    this.title = title
    this.author = author
    this.pages = pages
    this.readed = 0
    this.reading = this.readed +1
    this.read = 'not read yet'
    this.info = function(){
        return(`${this.title} by ${this.author} has ${this.pages} pages, ${this.read}`)
    }
    
}

let myLibrary = []

function addBooktoLibrary2(e) {
    myLibrary.push(e)   
}

function addBooktoLibrary(title, author, pages){
    const book = new Book(title, author, pages)
    myLibrary.push(book)
}

//const firstbook = new Book("Harry Potter", "JK Rowling", 300);
//firstbook.addBooktoLibrary()
//console.log(myLibrary)

const book1 = new Book("Harry Potter", "JK Rowling", 300);
const book2 = new Book("The Lightning", "Lorem Ipsum", 100);

addBooktoLibrary(book1, book2)
addBooktoLibrary(book2)

console.log(myLibrary)