const API_URL = '/api';

const api = {
    async get(endpoint) {
        return this.request(endpoint, 'GET');
    },
    async post(endpoint, data) {
        return this.request(endpoint, 'POST', data);
    },
    async request(endpoint, method, data = null) {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const options = { method, headers };
        if (data) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(`${API_URL}${endpoint}`, options);
            const result = await response.json();
            if (!response.ok) {
                if (response.status === 401) {
                    // Unauthorized, clear token and redirect
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/index.html';
                }
                throw new Error(result.error || 'API Error');
            }
            return result;
        } catch (error) {
            console.error(`API ${method} ${endpoint} failed:`, error);
            throw error;
        }
    }
};

// Check auth on page load (except login/register)
document.addEventListener('DOMContentLoaded', () => {
    const isAuthPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('register.html') || window.location.pathname === '/';
    const token = localStorage.getItem('token');

    if (!token && !isAuthPage) {
        window.location.href = '/index.html';
    } else if (token && isAuthPage) {
        window.location.href = '/home.html';
    }

    // Setup logout button if exists
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/index.html';
        });
    }
});
