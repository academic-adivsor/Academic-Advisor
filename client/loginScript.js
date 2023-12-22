document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login');

    loginButton.addEventListener('click', async () => {
        const username = document.getElementById('usernameInput').value;
        const password = document.getElementById('passwordInput').value;

        try {
            const adminResponse = await fetch('api/v1/admins/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (adminResponse.ok) {
                const adminUser = await adminResponse.json();
                window.location.href = '/Admin-Dashboard';
                return; // Make sure to exit the function after redirection
            }

            const teacherResponse = await fetch('http://localhost:2020/teachers/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (teacherResponse.ok) {
                const teacherUser = await teacherResponse.json();
                window.location.href = 'Doctor_DashBord';
                return;
            }

            const studentResponse = await fetch('http://localhost:2020/students/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (studentResponse.ok) {
                const studentUser = await studentResponse.json();
                window.location.href = 'Student-Dashboard-main';
                return;
            }

            // Handle other cases or show an error message
            console.error('Login failed');
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    });
});
