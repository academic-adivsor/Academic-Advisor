async function handleLogin() {
    const email = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    const messageContainer = document.getElementById('messageContainer');

    try {
        const response = await fetch('http://localhost:2020/api/v1/admins/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email , password }),
        });
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.data != undefined) {
               // Handle successful login, e.g., redirect to another page.
                showMessage('success', responseData.message);
                localStorage.setItem('authToken', responseData.data);
                window.location.href = '/Admin-Dashboard/index.html'; 
                
            }
            else {
                const response = await fetch('http://localhost:2020/api/v1/teachers/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email , password }),
                });
                if (response.ok) {
                    const responseData = await response.json();
                    if (responseData.data != undefined) {
                       // Handle successful login, e.g., redirect to another page.
                        showMessage('success', responseData.message);
                        localStorage.setItem('authToken', responseData.data);
                        window.location.href = '/Doctor_DashBord/index.html'; 

        
                    }
                else{
                    const response = await fetch('http://localhost:2020/api/v1/students/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email , password }),
                    });
                    if (response.ok) {
                        const responseData = await response.json();
                        if (responseData.data != undefined) {
                           // Handle successful login, e.g., redirect to another page.
                            showMessage('success', responseData.message);
                            localStorage.setItem('authToken', responseData.data);
                            window.location.href = '/Student-Dashboard-main/index.html'; 

                        
                        }
                            else{
                                // Handle unsuccessful login, show an error message, etc.
                                showMessage('error', responseData.message);
                
                                }
                        }

                }
            }
        }
    }
        } 
     catch (error) {
        console.error('Error during login:', error.message);
        showMessage('error', 'An unexpected error occurred.');
    }
}

function showMessage(type, text) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.innerHTML = text;

    if (type === 'success') {
        messageContainer.style.backgroundColor = 'green';
    } else if (type === 'error') {
        messageContainer.style.backgroundColor = 'red';
    }

    // Display the message container
    messageContainer.style.display = 'block';

    // Hide the message container after 3 seconds
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 3000);
}