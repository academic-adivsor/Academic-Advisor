

const token = localStorage.getItem('authToken'); // Replace 'your_token_key' with the actual key used to store the token

// Check if token exists in Local Storage
function isTokenExists() {
    const authToken = localStorage.getItem('authToken');
    return authToken !== null && authToken !== undefined;
}

// Redirect to the login page
function redirectToLogin() {
    window.location.href = 'http://localhost:8080/index.html'; // Change this URL to your login page
}

document.addEventListener('DOMContentLoaded', function () {
    const changePasswordForm = document.getElementById('changePasswordForm');
    const passwordMismatchError = document.getElementById('passwordMismatchError');
    const passwordSuccessMessage = document.getElementById('passwordSuccessMessage');

    changePasswordForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Retrieve values from the form fields
        const newPassword = document.getElementById('newpass').value;
        const confirmPassword = document.getElementById('confirmpass').value;

        // Perform validation
        if (newPassword !== confirmPassword) {
            passwordMismatchError.style.display = 'block';
            passwordSuccessMessage.style.display = 'none';
            return;
        }else{

            const data = {
                password: newPassword,
            };
            fetch('http://localhost:2020/api/v1/teachers/update', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
                    'Content-Type': 'application/json',
                    // Include any authentication headers if needed
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
            // Show success message
            passwordMismatchError.style.display = 'none';
            passwordSuccessMessage.style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }


    });
});