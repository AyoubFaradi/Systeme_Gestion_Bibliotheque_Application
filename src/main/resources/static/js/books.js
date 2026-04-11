// books.js
let allBooks = [];

document.addEventListener('DOMContentLoaded', function() {
    loadBooks();

    // Add book button
    document.getElementById('add-book-btn').addEventListener('click', function() {
        document.getElementById('add-book-modal').classList.remove('hidden');
    });

    // Add book form
    document.getElementById('add-book-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const title = document.getElementById('book-title').value;
        const author = document.getElementById('book-author').value;
        const category = document.getElementById('book-category').value;
        const isbn = document.getElementById('book-isbn').value;

        try {
            await addBook({ titre: title, auteur: author, categorie: category, isbn: isbn });
            if (typeof showToast === 'function') {
                showToast('Book added successfully!', 'success');
            }
            document.getElementById('add-book-form').reset();
            closeModal();
            loadBooks();
        } catch (error) {
            if (typeof showToast === 'function') {
                showToast('Error adding book: ' + error.message, 'error');
            }
        }
    });

    // Search functionality
    document.getElementById('search-input').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filterBooks(searchTerm);
    });
});

function closeModal() {
    document.getElementById('add-book-modal').classList.add('hidden');
}

async function loadBooks() {
    try {
        allBooks = await getBooks();
        displayBooks(allBooks);
    } catch (error) {
        console.error('Error loading books:', error);
        if (typeof showToast === 'function') {
            showToast('Error loading books', 'error');
        }
    }
}

function filterBooks(searchTerm) {
    const filteredBooks = allBooks.filter(book =>
        book.titre.toLowerCase().includes(searchTerm) ||
        book.auteur.toLowerCase().includes(searchTerm) ||
        book.categorie.toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
}

function displayBooks(books) {
    const container = document.getElementById('books-container');
    container.innerHTML = '';

    if (books.length === 0) {
        container.innerHTML = '<div class="col-span-full text-center py-12"><i class="fas fa-book text-4xl text-gray-300 mb-4"></i><p class="text-gray-500">No books found</p></div>';
        return;
    }

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300';
        bookCard.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 mb-1">${book.titre}</h3>
                    <p class="text-gray-600 text-sm mb-1"><i class="fas fa-user mr-1"></i>${book.auteur}</p>
                    <p class="text-gray-600 text-sm mb-2"><i class="fas fa-tag mr-1"></i>${book.categorie}</p>
                    <p class="text-xs text-gray-500"><i class="fas fa-barcode mr-1"></i>${book.isbn}</p>
                </div>
            </div>
            <div class="flex space-x-2">
                <button onclick="viewBookDetails(${book.id})" class="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm">
                    <i class="fas fa-eye mr-1"></i>View
                </button>
                <button onclick="editBook(${book.id})" class="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 text-sm">
                    <i class="fas fa-edit mr-1"></i>Edit
                </button>
                <button onclick="borrowBookPrompt(${book.id})" class="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-sm">
                    <i class="fas fa-hand-holding mr-1"></i>Borrow
                </button>
            </div>
        `;
        container.appendChild(bookCard);
    });
}

function borrowBookPrompt(bookId) {
    const userId = prompt('Enter User ID:');
    if (userId) {
        borrowBookFromPage(bookId, parseInt(userId));
    }
}

async function borrowBookFromPage(bookId, userId) {
    try {
        await borrowBook(userId, bookId);
        if (typeof showToast === 'function') {
            showToast('Book borrowed successfully!', 'success');
        }
        loadBooks(); // Refresh to show updated status
    } catch (error) {
        if (typeof showToast === 'function') {
            showToast('Error borrowing book: ' + error.message, 'error');
        }
    }
}
// View Book Details
async function viewBookDetails(bookId) {
    try {
        const book = await getBookById(bookId);
        document.getElementById('view-book-title').textContent = book.titre;
        document.getElementById('view-book-author').textContent = book.auteur;
        document.getElementById('view-book-category').textContent = book.categorie;
        document.getElementById('view-book-isbn').textContent = book.isbn;
        document.getElementById('view-book-modal').classList.remove('hidden');
    } catch (error) {
        if (typeof showToast === 'function') {
            showToast('Error loading book details: ' + error.message, 'error');
        }
    }
}

function closeViewBookModal() {
    document.getElementById('view-book-modal').classList.add('hidden');
}

// Edit Book
async function editBook(bookId) {
    try {
        const book = await getBookById(bookId);
        document.getElementById('edit-book-id').value = book.id;
        document.getElementById('edit-book-title').value = book.titre;
        document.getElementById('edit-book-author').value = book.auteur;
        document.getElementById('edit-book-category').value = book.categorie;
        document.getElementById('edit-book-isbn').value = book.isbn;
        document.getElementById('edit-book-modal').classList.remove('hidden');
    } catch (error) {
        if (typeof showToast === 'function') {
            showToast('Error loading book for editing: ' + error.message, 'error');
        }
    }
}

function closeEditBookModal() {
    document.getElementById('edit-book-modal').classList.add('hidden');
}

// Handle edit book form submission
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Edit book form
    document.getElementById('edit-book-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const id = document.getElementById('edit-book-id').value;
        const title = document.getElementById('edit-book-title').value;
        const author = document.getElementById('edit-book-author').value;
        const category = document.getElementById('edit-book-category').value;
        const isbn = document.getElementById('edit-book-isbn').value;

        const submitBtn = document.getElementById('edit-book-submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Saving...';

        try {
            await updateBook(id, { titre: title, auteur: author, categorie: category, isbn: isbn });
            if (typeof showToast === 'function') {
                showToast('Book updated successfully!', 'success');
            }
            closeEditBookModal();
            loadBooks();
        } catch (error) {
            if (typeof showToast === 'function') {
                showToast('Error updating book: ' + error.message, 'error');
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
});