function Book (title, author, pages, favorite){
    this.title = title
    this.author = author
    this.pages = pages
    this.favorite = favorite
    this.read = 'not read yet'
    this.id = 1
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
    book.id = myLibrary.length
    const library = document.querySelector(".library")
    //creates main book element
    const bookdiv = document.createElement("div")
    bookdiv.setAttribute("id", `${book.title} book`)
    bookdiv.setAttribute("data-id", `${book.id}`)
    bookdiv.setAttribute("onClick","showIcons()")
    library.appendChild(bookdiv)
    //creates title 
    const titlediv = document.createElement("p")
    titlediv.innerHTML = book.title
    bookdiv.appendChild(titlediv)
    //creates delete button
    const deleteButton = document.createElement("img")
    deleteButton.setAttribute("src", "./Assets/delete.svg")
    deleteButton.setAttribute("id", "removeBook")
    deleteButton.setAttribute("onClick", `removeBook(${book.id})`)
    bookdiv.appendChild(deleteButton) 
    console.table(myLibrary)

    }
}

function removeBook(id){
    //removes book element from html
    const bookForRemoval = document.querySelector(`[data-id="${id}"]`)
    bookForRemoval.remove()
    //also remove book from array
    myLibrary = myLibrary.filter(e => e.id !== id)
    console.table(myLibrary)
}



function closeForm(){
    document.getElementsByClassName("form")[0].style.display = "none"
    document.getElementsByClassName("form")[0].reset()
}

function openForm(){
    document.getElementsByClassName("form")[0].style.display = "flex"

}

function showIcons(){
    const icons = document.querySelectorAll("img")
    console.log(icons)
    icons[0].style.visibility = "visible"
}




//const firstbook = new Book("Harry Potter", "JK Rowling", 300);
//firstbook.addBooktoLibrary()
//console.log(myLibrary)



addBooktoLibrary("Harry Potter", "JK Rowling", 300)
addBooktoLibrary("The Lightning", "Lorem Ipsum", 100)



