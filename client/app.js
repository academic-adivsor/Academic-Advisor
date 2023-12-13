document.getElementById('login').addEventListener('click', async () => {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    try {
        const response = await fetch('http://localhost:2020/api/v1/admins/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            // Handle successful login, e.g., redirect to another page.
        } else {
            // Handle unsuccessful login, show an error message, etc.
        }
    } catch (error) {
        console.error('Error during login:', error.message);
    }
});
