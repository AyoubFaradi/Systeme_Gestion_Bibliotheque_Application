// borrow.js
let allUsers = [];
let allBooks = [];
let allEmprunts = [];

document.addEventListener('DOMContentLoaded', async function() {
    await loadUsers();
    await loadBooks();
    await loadBorrowings();
    setupBorrowForm();
    setupReturnForm();
});

async function loadUsers() {
    try {
        console.log('Loading users...');
        allUsers = await getUsers();
        console.log('Users loaded:', allUsers);
        const userSelect = document.getElementById('userSelect');
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
        console.log('Loading books...');
        allBooks = await getBooks();
        console.log('Books loaded:', allBooks);
        const bookSelect = document.getElementById('bookSelect');
        bookSelect.innerHTML = '<option value="">Choose a book...</option>';
        allBooks.forEach(book => {
            const option = document.createElement('option');
            option.value = book.id;
            option.textContent = `${book.titre} by ${book.auteur}`;
            bookSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading books:', error);
        alert('Error loading books: ' + (error.message || error));
    }
}

async function loadBorrowings() {
    try {
        console.log('Loading borrowings...');
        allEmprunts = await getEmprunts();
        console.log('Borrowings loaded:', allEmprunts);
        displayBorrowings();
    } catch (error) {
        console.error('Error loading borrowings:', error);
        alert('Error loading borrowings: ' + (error.message || error));
    }
}

function displayBorrowings() {
    const tbody = document.getElementById('emprunts-table-body');
    tbody.innerHTML = '';
    if (allEmprunts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-12 text-center text-gray-500"><i class="fas fa-book text-4xl text-gray-300 mb-4"></i><br>No borrowings found</td></tr>';
        return;
    }

    const userMap = new Map(allUsers.map(user => [user.id, user.nom]));
    const bookMap = new Map(allBooks.map(book => [book.id, `${book.titre} by ${book.auteur}`]));

    allEmprunts.forEach(emprunt => {
        const userName = userMap.get(emprunt.utilisateurId) || 'Unknown User';
        const bookTitle = bookMap.get(emprunt.livreId) || 'Unknown Book';
        const dateEmprunt = new Date(emprunt.dateEmprunt).toLocaleDateString();
        const dateRetour = emprunt.dateRetour ? new Date(emprunt.dateRetour).toLocaleDateString() : 'Not returned';
        const status = emprunt.dateRetour ? 'Returned' : 'Borrowed';
        const statusClass = emprunt.dateRetour ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
        const actions = emprunt.dateRetour ? '' : `<button onclick="returnBook(${emprunt.id})" class="text-green-600 hover:text-green-900 transition-colors duration-200"><i class="fas fa-undo mr-1"></i>Return</button>`;

        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 transition-colors duration-200';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${emprunt.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${userName}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${bookTitle}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${dateEmprunt}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${dateRetour}</td>
            <td class="px-6 py-4 whitespace-nowrap"><span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusClass}">${status}</span></td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">${actions}</td>
        `;
        tbody.appendChild(row);
    });
}

function setupBorrowForm() {
    const borrowForm = document.getElementById('borrow-form');
    const borrowButton = borrowForm.querySelector('button[type="submit"]');
    const userSelect = document.getElementById('userSelect');
    const bookSelect = document.getElementById('bookSelect');

    function updateBorrowButton() {
        borrowButton.disabled = !userSelect.value || !bookSelect.value;
        borrowButton.classList.toggle('opacity-50', borrowButton.disabled);
        borrowButton.classList.toggle('cursor-not-allowed', borrowButton.disabled);
    }

    userSelect.addEventListener('change', updateBorrowButton);
    bookSelect.addEventListener('change', updateBorrowButton);
    updateBorrowButton();

    borrowForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const userId = userSelect.value;
        const bookId = bookSelect.value;

        try {
            console.log('Borrowing book:', { userId, bookId });
            await borrowBook(parseInt(userId), parseInt(bookId));
            if (typeof showToast === 'function') {
                showToast('Book borrowed successfully!', 'success');
            }
            borrowForm.reset();
            await loadBorrowings();
            await loadBooks(); // Refresh available books
        } catch (error) {
            console.error('Error borrowing book:', error);
            alert('Error borrowing book: ' + (error.message || error));
        }
    });
}

function setupReturnForm() {
    const returnForm = document.getElementById('return-form');
    returnForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const empruntId = document.getElementById('borrowIdInput').value;

        try {
            console.log('Returning book:', empruntId);
            await returnBook(parseInt(empruntId));
            if (typeof showToast === 'function') {
                showToast('Book returned successfully!', 'success');
            }
            returnForm.reset();
            await loadBorrowings();
            await loadBooks(); // Refresh available books
        } catch (error) {
            console.error('Error returning book:', error);
            alert('Error returning book: ' + (error.message || error));
        }
    });
}

async function returnBook(empruntId) {
    try {
        console.log('Returning book from table:', empruntId);
        await returnBook(empruntId); // This calls the api.js returnBook function
        if (typeof showToast === 'function') {
            showToast('Book returned successfully!', 'success');
        }
        await loadBorrowings();
        await loadBooks();
    } catch (error) {
        console.error('Error returning book from table:', error);
        alert('Error returning book: ' + (error.message || error));
    }
}