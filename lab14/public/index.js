document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('bookList');
    const addBookForm = document.getElementById('addBookForm');
    const searchInput = document.getElementById('search');

    const displayBooks = (books) => {
        // Очистіть поточний список книг
        bookList.innerHTML = '';

        // Додайте кожну книгу до списку
        books.forEach(({ id, title, author, year, price }) => {
            const li = document.createElement('li');
            li.textContent = `${title} by ${author}, ${year}, $${price}`;

            // Додайте кнопку для видалення книги
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteBook(id));
            li.appendChild(deleteButton);
            bookList.appendChild(li);
        });
    };

    const getBooks = async () => {
        try {
            const response = await fetch('/books');
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const books = await response.json();
            displayBooks(books);
        } catch (error) {
            console.error('Error fetching books', error);
        }
    };

    const addBook = async () => {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = document.getElementById('year').value;
        const price = document.getElementById('price').value;

        try {
            const response = await fetch('/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author, year, price }),
            });

            if (!response.ok) {
                throw new Error('Failed to add a new book');
            }

            // Оповіщення про успішне додавання книги
            console.log('Book added successfully!');

            // Оновлення списку
            getBooks();

            // Очистка форми
            clearForm();
        } catch (error) {
            console.error('Error adding a new book', error);
        }
    };

    const deleteBook = async (bookId) => {
        console.log('Deleting book with ID:', bookId);
        try {
            const response = await fetch(`/books/${bookId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete the book with ID ${bookId}`);
            }

            // Оповіщення про успішне видалення книги
            console.log('Book deleted successfully!');

            // Оновлення списку
            await getBooks();
        } catch (error) {
            console.error(`Error deleting the book with ID ${bookId}`, error);
        }
    };

    const searchBooks = async () => {
        const searchValue = searchInput.value.toLowerCase();

        try {
            const response = await fetch('/books');
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const books = await response.json();
            const filteredBooks = books.filter(book =>
                book.title.toLowerCase().includes(searchValue) ||
                book.author.toLowerCase().includes(searchValue)
            );
            displayBooks(filteredBooks);
        } catch (error) {
            console.error('Error searching books', error);
        }
    };

    const clearForm = () => {
        // Очищення значень полів форми
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('year').value = '';
        document.getElementById('price').value = '';
    };

    // Отримайте та відобразіть список книг при завантаженні сторінки
    getBooks();

    // Обробник подій для відправки форми додавання нової книги
    addBookForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        await addBook();
    });
    searchInput.addEventListener('input', () => {
        searchBooks();
    });
});
