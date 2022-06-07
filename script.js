function Book (title, author, pages, favorite){
    this.title = title
    this.author = author
    this.pages = pages
    this.favorite = favorite
    this.reading = this.readed +1
    this.read = 'not read yet'
    this.info = function(){
        return(`${this.title} by ${this.author} has ${this.pages} pages, ${this.read}`)
    }   
}

let myLibrary = []


function addBooktoLibrary(title, author, pages){
    if (title == "" || author == "" || pages < 0 || pages == ""){
        console.log("false" + author + title + pages)
        alert("Please check form inputs and try again")
        
    } else {
    closeForm()
    const book = new Book(title, author, pages)
    myLibrary.push(book)
    console.table(myLibrary)
    const library = document.querySelector(".library")
    const bookdiv = document.createElement("div")
    bookdiv.setAttribute("id", `${book.title} book`)
    library.appendChild(bookdiv)
    const titlediv = document.createElement("p")
    titlediv.innerHTML = book.title
    bookdiv.appendChild(titlediv)
    }
}

function displaybook(){
    for (const books of myLibrary){
        const library = document.querySelector(".library")
        const book = document.createElement("div")
        book.setAttribute("class", "book")
        library.appendChild(book)
        const title = document.createElement("p")
        title.innerHTML = books.title
        book.appendChild(title)
    } 
}

function closeForm(){
    document.getElementsByClassName("form")[0].style.display = "none"
    document.getElementsByClassName("form")[0].reset()
}

function openForm(){
    document.getElementsByClassName("form")[0].style.display = "flex"

}

function addBook(){
    const book = new Book(title, author, pages)
    myLibrary.push(book)
    allbooks = document.getElementsByClassName("book")
    console.log(allbooks)
    allbooks.remove()
    for (const books of myLibrary){
        const library = document.querySelector(".library")
        const book = document.createElement("div")
        book.setAttribute("class", "book")
        library.appendChild(book)
        const title = document.createElement("p")
        title.innerHTML = books.title
        book.appendChild(title)
    } 
}

//const firstbook = new Book("Harry Potter", "JK Rowling", 300);
//firstbook.addBooktoLibrary()
//console.log(myLibrary)



addBooktoLibrary("Harry Potter", "JK Rowling", 300)
addBooktoLibrary("The Lightning", "Lorem Ipsum", 100)



