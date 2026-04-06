// borrow.js
let allUsers = [];
let allBooks = [];
let allEmprunts = [];

document.addEventListener('DOMContentLoaded', async function() {
    await loadUsers();
    await loadBooks();
    await loadEmprunts();
    setupBorrowForm();
    setupReturnForm();
});

async function loadUsers() {
    try {
        allUsers = await getUsers();
        const userSelect = document.getElementById('borrow-user-id');
        if (!userSelect) {
            console.error('User select element not found!');
            return;
        }

        userSelect.innerHTML = '<option value="">Choose a user...</option>';
        allUsers.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.nom;
            userSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading users:', error);
        alert('Error loading users: ' + (error.message || error));
    }
}

async function loadBooks() {
    try {
        allBooks = await getBooks();
        allEmprunts = await getEmprunts();

        const borrowedBookIds = allEmprunts
            .filter(emprunt => emprunt.dateRetour === null)
            .map(emprunt => emprunt.livreId);

        const bookSelect = document.getElementById('borrow-book-id');
        if (!bookSelect) {
            console.error('Book select element not found!');
            return;
        }

        bookSelect.innerHTML = '<option value="">Choose a book...</option>';
        allBooks.forEach(book => {
            if (!borrowedBookIds.includes(book.id)) {
                const option = document.createElement('option');
                option.value = book.id;
                option.textContent = `${book.titre} by ${book.auteur}`;
                bookSelect.appendChild(option);
            }
        });
    } catch (error) {
        console.error('Error loading books:', error);
        alert('Error loading books: ' + (error.message || error));
    }
}

async function loadEmprunts() {
    try {
        allEmprunts = await getEmprunts();
        const activeEmprunts = allEmprunts.filter(emprunt => emprunt.dateRetour === null);

        const tbody = document.getElementById('emprunts-table-body');
        if (!tbody) {
            console.error('Emprunts table body not found!');
            return;
        }

        tbody.innerHTML = '';
        if (activeEmprunts.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="px-6 py-12 text-center text-gray-500"><i class="fas fa-book text-4xl text-gray-300 mb-4"></i><br>No current borrowings</td></tr>';
            return;
        }

        const userMap = new Map(allUsers.map(user => [user.id, user.nom]));
        const bookMap = new Map(allBooks.map(book => [book.id, `${book.titre} by ${book.auteur}`]));

        activeEmprunts.forEach(emprunt => {
            const userName = userMap.get(emprunt.utilisateurId) || 'Unknown User';
            const bookTitle = bookMap.get(emprunt.livreId) || 'Unknown Book';

            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50 transition-colors duration-200';
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${emprunt.id}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${userName}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${bookTitle}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${new Date(emprunt.dateEmprunt).toLocaleDateString()}</td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Active</span></td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium"><button onclick="returnBookFromTable(${emprunt.id})" class="text-green-600 hover:text-green-900 transition-colors duration-200"><i class="fas fa-undo mr-1"></i>Return</button></td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading emprunts:', error);
        alert('Error loading borrow data: ' + (error.message || error));
    }
}

function setupBorrowForm() {
    const borrowForm = document.getElementById('borrow-form');
    if (!borrowForm) return;

    borrowForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const userId = document.getElementById('borrow-user-id').value;
        const bookId = document.getElementById('borrow-book-id').value;

        if (!userId || !bookId) {
            alert('Please select both user and book');
            return;
        }

        try {
            await borrowBook(parseInt(userId), parseInt(bookId));
            if (typeof showToast === 'function') {
                showToast('Book borrowed successfully!', 'success');
            }
            borrowForm.reset();
            loadBooks();
            loadEmprunts();
        } catch (error) {
            console.error('Error borrowing book:', error);
            alert('Error borrowing book: ' + (error.message || error));
        }
    });
}

function setupReturnForm() {
    const returnForm = document.getElementById('return-form');
    if (!returnForm) return;

    returnForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const empruntId = document.getElementById('return-emprunt-id').value;

        if (!empruntId) {
            alert('Please enter a borrow ID');
            return;
        }

        try {
            await returnBook(parseInt(empruntId));
            if (typeof showToast === 'function') {
                showToast('Book returned successfully!', 'success');
            }
            returnForm.reset();
            loadBooks();
            loadEmprunts();
        } catch (error) {
            console.error('Error returning book:', error);
            alert('Error returning book: ' + (error.message || error));
        }
    });
}

async function returnBookFromTable(empruntId) {
    if (!confirm('Confirm return for this borrow.')) return;
    try {
        await returnBook(empruntId);
        if (typeof showToast === 'function') {
            showToast('Book returned successfully!', 'success');
        }
        loadBooks();
        loadEmprunts();
    } catch (error) {
        console.error('Error returning book from table:', error);
        alert('Error returning book: ' + (error.message || error));
    }
}