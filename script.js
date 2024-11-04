const library = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}



function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    library.push(newBook);

    displayBooks();
}



function displayBooks() {
    const emptyMessage = document.querySelector('.display-books h2');
    const libraryContainer = document.querySelector('.display-books');

    libraryContainer.innerHTML = '';
    libraryContainer.appendChild(emptyMessage)


    if (library.length === 0) {
        emptyMessage.style.display = 'block'; // Show the empty message
    } else {
        emptyMessage.style.display = 'none'; // Hide the empty message
    }


    library.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('bookcard');

        //title div element
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');

        const titleText = document.createElement('p');
        titleText.textContent = 'Title:';

        const titleValue = document.createElement('p');
        titleValue.textContent = book.title;

        titleDiv.appendChild(titleText);
        titleDiv.appendChild(titleValue);
        bookCard.appendChild(titleDiv);

        //author div element
        const authorDiv = document.createElement('div');
        authorDiv.classList.add('author');

        const authorText = document.createElement('p');
        authorText.textContent = 'Author:';

        const authorValue = document.createElement('p');
        authorValue.textContent = book.author;

        authorDiv.appendChild(authorText);
        authorDiv.appendChild(authorValue);
        bookCard.appendChild(authorDiv);


        //pages div element
        const pagesDiv = document.createElement('div');
        pagesDiv.classList.add('pages');

        const pagesText = document.createElement('p');
        pagesText.textContent = 'Pages:';

        const pagesValue = document.createElement('p');
        pagesValue.textContent = book.pages;

        pagesDiv.appendChild(pagesText);
        pagesDiv.appendChild(pagesValue);
        bookCard.appendChild(pagesDiv);


        //read status div element
        const statusDiv = document.createElement('div');
        statusDiv.classList.add('status');

        const statusText = document.createElement('p');
        statusText.textContent = 'Status:';

        const statusValue = document.createElement('select');
        statusValue.id = 'select-status';
        
        const option1 = document.createElement('option');
        option1.value = 'not-read';
        option1.textContent = 'Not Read';
        statusValue.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = 'in-progress';
        option2.textContent = 'In Progress';
        statusValue.appendChild(option2);

        const option3 = document.createElement('option');
        option3.value = 'finished';
        option3.textContent = 'Finished';
        statusValue.appendChild(option3);

        statusDiv.appendChild(statusText);
        statusDiv.appendChild(statusValue);
        bookCard.appendChild(statusDiv);



        //buttons div element
        const btnDiv = document.createElement('div');
        btnDiv.classList.add('card-btn');

        const text = document.createElement('span');
        text.style.color = 'white';
        text.style.padding = '12px 15px';
        text.style.borderRadius = '10px';
        text.style.color = 'white';
        text.style.fontSize = '16px';
        text.textContent = book.isRead.toUpperCase();
        updateStatusColor(text, book.isRead);
    
        statusValue.addEventListener('change',  () => {
            text.textContent = statusValue.value.toUpperCase();
            updateStatusColor(text, statusValue.value);
        });

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Remove';
        closeBtn.addEventListener('click', () => {
            library.splice(index, 1);
            displayBooks();
        })


        btnDiv.appendChild(text);
        btnDiv.appendChild(closeBtn);
        bookCard.appendChild(btnDiv);


        
        libraryContainer.appendChild(bookCard)
        

    });
};


//updateStatus background color function
function updateStatusColor(text, status) {
    if (status === 'not-read') {
        text.style.backgroundColor = '#dc2626';
    } else if(status === 'in-progress') {
        text.style.backgroundColor = '#facc15';
    } else {
        text.style.backgroundColor = '#22c55e';
    }
}



// new book button
const newBookBtn = document.querySelector('.new-book');
newBookBtn.addEventListener('click', () => {
   document.querySelector('.form-container').style.display = 'flex';
});


//close form button {
const closeFormBtn = document.querySelector('#close-form');
closeFormBtn.addEventListener('click', () => {
    document.querySelector('.form-container').style.display = 'none';
})


 //delete all books 
 const deleteAllBooks = document.querySelector('.delete-all-book');
 deleteAllBooks.addEventListener('click', () => {
    library.length = 0;
    displayBooks();
 })


//submit form 
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#number').value;
    const read = document.querySelector('#read').value;

    addBookToLibrary(title, author, pages, read);

    document.querySelector('.form-container').style.display = 'none';
    document.querySelector('form').reset();
})