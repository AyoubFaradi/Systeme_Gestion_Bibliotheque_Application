// users.js
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();

    // Add user button
    document.getElementById('add-user-btn').addEventListener('click', function() {
        document.getElementById('add-user-modal').classList.remove('hidden');
    });

    // Add user form
    document.getElementById('add-user-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;
        const address = document.getElementById('user-address').value;
        const phone = document.getElementById('user-phone').value;

        try {
            await addUser({ nom: name, email: email, adresse: address, telephone: phone });
            if (typeof showToast === 'function') {
                showToast('User added successfully!', 'success');
            }
            document.getElementById('add-user-form').reset();
            closeModal();
            loadUsers();
        } catch (error) {
            if (typeof showToast === 'function') {
                showToast('Error adding user: ' + error.message, 'error');
            }
        }
    });

    // Edit user form
    document.getElementById('edit-user-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const id = document.getElementById('edit-user-id').value;
        const name = document.getElementById('edit-user-name').value;
        const email = document.getElementById('edit-user-email').value;
        const address = document.getElementById('edit-user-address').value;
        const phone = document.getElementById('edit-user-phone').value;

        try {
            await updateUser(id, { nom: name, email: email, adresse: address, telephone: phone });
            if (typeof showToast === 'function') {
                showToast('User updated successfully!', 'success');
            }
            closeEditUserModal();
            loadUsers();
        } catch (error) {
            if (typeof showToast === 'function') {
                showToast('Error updating user: ' + error.message, 'error');
            }
        }
    });
});

function closeModal() {
    document.getElementById('add-user-modal').classList.add('hidden');
}

async function loadUsers() {
    try {
        const users = await getUsers();
        const tbody = document.getElementById('users-table-body');
        tbody.innerHTML = '';

        if (users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" class="px-6 py-12 text-center text-gray-500"><i class="fas fa-users text-4xl text-gray-300 mb-4"></i><br>No users found</td></tr>';
            return;
        }

        users.forEach(user => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50 transition-colors duration-200';
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <i class="fas fa-user text-green-600"></i>
                        </div>
                        <div>
                            <div class="text-sm font-medium text-gray-900">${user.nom}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${user.email}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${user.telephone || 'N/A'}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${user.id}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex space-x-2">
                        <button onclick="viewUserDetails(${user.id})" class="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors duration-300 text-xs">
                            <i class="fas fa-eye mr-1"></i>View
                        </button>
                        <button onclick="editUser(${user.id})" class="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors duration-300 text-xs">
                            <i class="fas fa-edit mr-1"></i>Edit
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading users:', error);
        if (typeof showToast === 'function') {
            showToast('Error loading users', 'error');
        }
    }
}

// View user details
async function viewUserDetails(userId) {
    try {
        const user = await getUserById(userId);
        document.getElementById('view-user-name').textContent = user.nom;
        document.getElementById('view-user-email').textContent = user.email;
        document.getElementById('view-user-address').textContent = user.adresse || 'N/A';
        document.getElementById('view-user-phone').textContent = user.telephone || 'N/A';
        document.getElementById('view-user-id').textContent = user.id;
        document.getElementById('view-user-modal').classList.remove('hidden');
    } catch (error) {
        console.error('Error loading user details:', error);
        if (typeof showToast === 'function') {
            showToast('Error loading user details', 'error');
        }
    }
}

// Edit user
async function editUser(userId) {
    try {
        const user = await getUserById(userId);
        document.getElementById('edit-user-id').value = user.id;
        document.getElementById('edit-user-name').value = user.nom;
        document.getElementById('edit-user-email').value = user.email;
        document.getElementById('edit-user-address').value = user.adresse || '';
        document.getElementById('edit-user-phone').value = user.telephone || '';
        document.getElementById('edit-user-modal').classList.remove('hidden');
    } catch (error) {
        console.error('Error loading user for editing:', error);
        if (typeof showToast === 'function') {
            showToast('Error loading user for editing', 'error');
        }
    }
}

// Close view user modal
function closeViewUserModal() {
    document.getElementById('view-user-modal').classList.add('hidden');
}

// Close edit user modal
function closeEditUserModal() {
    document.getElementById('edit-user-modal').classList.add('hidden');
}