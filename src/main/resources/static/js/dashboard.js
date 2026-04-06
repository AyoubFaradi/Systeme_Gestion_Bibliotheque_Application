// dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
});

async function loadDashboard() {
    try {
        const books = await getBooks();
        const users = await getUsers();
        const emprunts = await getEmprunts();

        // Update stats
        document.getElementById('total-books').textContent = books.length;
        document.getElementById('total-users').textContent = users.length;
        document.getElementById('borrowed-books').textContent = emprunts.length;

        // Create chart
        const ctx = document.getElementById('overviewChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Books', 'Users', 'Active Borrows'],
                datasets: [{
                    data: [books.length, users.length, emprunts.length],
                    backgroundColor: ['#6366f1', '#10b981', '#8b5cf6'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            boxWidth: 12,
                            useBorderRadius: true
                        }
                    }
                },
                cutout: '70%'
            }
        });

        if (typeof showToast === 'function') {
            showToast('Dashboard loaded successfully', 'success');
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
        if (typeof showToast === 'function') {
            showToast('Error loading dashboard data', 'error');
        }
    }
}