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
    // Replace 'your_token_here' with the actual token

    // Fetch data from the endpoint
    fetch('http://localhost:2020/api/v1/teachers/admin', {
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            // Get the table body
            const tableBody = document.getElementById('example3').getElementsByTagName('tbody')[0];

            // Clear any existing rows
            tableBody.innerHTML = '';

            // Loop through the data and create rows
            data.data.forEach((professor, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${professor.name}</td>
                    <td>${professor.program}</td>
                    <td>${getRandomGender()}</td>
                    <td><a href="mailto:${professor.email}"><strong>${professor.email}</strong></a></td>
                    <td>${professor.dateEmployed}</td>
                    <td>
                        <a href="edit-professor.html?id=${professor._id}" class="btn btn-sm btn-primary"><i class="la la-pencil"></i></a>
                        <a href="javascript:void(0);" class="btn btn-sm btn-danger delete-professor" data-id="${professor._id}" onclick="deleteProfessor('${professor._id}')"><i class="la la-trash-o"></i></a>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Function to get a random gender (either Male or Female)
function getRandomGender() {
    const genders = ['Male', 'Female'];
    const randomIndex = Math.floor(Math.random() * genders.length);
    return genders[randomIndex];
}

async function deleteProfessor(teacherId) {
	// Implement your logic for deleting a student here
	if (confirm('Are you sure you want to delete this Teacher?')) {
	  console.log(`Deleting Teacher with ID: ${teacherId}`);
	  try {
		const response = await fetch('http://localhost:2020/api/v1/teachers/'+ teacherId +'/delete/admin', {
		  method: 'DELETE',
		  headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
		 },
		});
  
		const data = await response.json();
  
		if (response.ok) {
		  console.log('Teacher deleted successfully:', data.message);
		  window.location.reload();
		} else {
		  console.error('Error deleting Teacher:', data.message);
		}
	  } catch (error) {
		console.error('Request failed:', error);
	  }
  
	}
  }