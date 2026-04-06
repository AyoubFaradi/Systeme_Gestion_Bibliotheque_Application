const API_BASE_URL = window.location.origin + '/api';

// Books
async function getBooks() {
    const response = await fetch(`${API_BASE_URL}/livres`);
    if (!response.ok) throw new Error('Failed to fetch books');
    return await response.json();
}

async function addBook(book) {
    const response = await fetch(`${API_BASE_URL}/livres`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });
    if (!response.ok) throw new Error('Failed to add book');
    return await response.json();
}

// Users
async function getUsers() {
    const response = await fetch(`${API_BASE_URL}/utilisateurs`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
}

async function addUser(user) {
    const response = await fetch(`${API_BASE_URL}/utilisateurs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    if (!response.ok) throw new Error('Failed to add user');
    return await response.json();
}

// Emprunts
async function getEmprunts() {
    const response = await fetch(`${API_BASE_URL}/emprunts`);
    if (!response.ok) throw new Error('Failed to fetch emprunts');
    return await response.json();
}

async function borrowBook(utilisateurId, livreId) {
    const response = await fetch(`${API_BASE_URL}/emprunts/borrow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ utilisateurId, livreId })
    });
    if (!response.ok) throw new Error('Failed to borrow book');
    return await response.json();
}

async function returnBook(empruntId) {
    const response = await fetch(`${API_BASE_URL}/emprunts/${empruntId}/return`, {
        method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to return book');
    return await response.json();
}