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
// Example usage:
// Assume this code is part of a script that runs when your application loads
if (!isTokenExists()) {
    // If the token doesn't exist, redirect to the login page
    redirectToLogin();
}
document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the endpoint
    fetch('http://localhost:2020/api/v1/students/admin', {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
          'Content-Type': 'application/json'
        },
      })
    .then(response => response.json())
    .then(data => {
            // Get the table body
            const tableBody = document.getElementById('studentTableBodyAll');

            // Clear any existing rows
            tableBody.innerHTML = '';

            // Loop through the data and create rows
            data.data.forEach((student, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td><img class="rounded-circle" width="35" src="images/profile/small/pic7.jpg" alt=""></td>
                <td>${index + 1}</td>
                  <td>${student.name}</td>
                  <td>Dummy</td>
                  <td>${student.email}</td>
                  <td>${new Date(student.dateAdmitted).toLocaleDateString()}</td>
                  <td>
                  <a href="javascript:void(0);" class="btn btn-sm btn-primary onclick="editStudent('${student._id}')"><i class="la la-pencil"></i></a>
                  <a href="javascript:void(0);" class="btn btn-sm btn-danger" onclick="deleteStudent('${student._id}')"><i class="la la-trash-o"></i></a>
                  </td>
                `;
        
                tableBody.appendChild(row);
              });
        })
        .catch(error => console.error('Error fetching data:', error));
});

async function deleteStudent(studentId) {
	// Implement your logic for deleting a student here
	if (confirm('Are you sure you want to delete this student?')) {
	  console.log(`Deleting student with ID: ${studentId}`);
	  try {
		const response = await fetch('http://localhost:2020/api/v1/students/'+ studentId +'/delete/admin', {
		  method: 'DELETE',
		  headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
		 },
		});
  
		const data = await response.json();
  
		if (response.ok) {
		  console.log('Student deleted successfully:', data.message);
		  window.location.reload();
		} else {
		  console.error('Error deleting student:', data.message);
		}
	  } catch (error) {
		console.error('Request failed:', error);
	  }
  
	}
  }

  function populateFormFields() {
    const params = new URLSearchParams(window.location.search);
    const studentId = params.get('studentId');

    // Fetch student data using the studentId
    fetch(`http://localhost:2020/api/v1/students/${studentId}/admin` ,{
    headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
        'Content-Type': 'application/json'
    },
      })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Populate form fields with student data
            const nameArray = data.data.name.split(' ');
            const firstName = nameArray[0];
            const lastName = nameArray.slice(1).join(' '); // Join the remaining elements to get the last name
            
            document.getElementById('firstName').value = firstName;
            document.getElementById('lastName').value = lastName;
            document.getElementById('email').value = data.data.email;
            document.getElementById('password').value = data.data.password;
            document.getElementById('datepicker').value = data.data.createdAt;


            // Populate other fields...

            // You can continue to populate other form fields based on your data structure
        })
        .catch(error => console.error('Error fetching student data:', error));
}

function cancelEdit() {
    window.location.href = 'student-list.html';
}

window.onload = function () {
    populateFormFields();
};


document.getElementById('studentForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Combine first name and last name
    const firstName = getValueByName('firstName');
    const lastName = getValueByName('lastName');
    const fullName = `${firstName} ${lastName}`;

    // Get other form fields
    const email = getValueByName('email');
    const password = getValueByName('password');
    const registrationDate = getValueByName('datepicker');
    const rollNo = getValueByName('rollNo');
    const studentClass = getValueByName('studentClass');
    const gender = getValueByName('gender');
    const mobileNumber = getValueByName('mobileNumber');
    const parentsName = getValueByName('parentsName');
    const parentsMobileNumber = getValueByName('parentsMobileNumber');
    const dob = getValueByName('datepicker1');
    const bloodGroup = getValueByName('bloodGroup');
    const address = getValueByName('address');
    const fileInput = getValueByName('fileInput');

    // Create the student object
    var studentData = {
        name: fullName,
        email: email,
        password : password,
        registrationDate: registrationDate,
        rollNo: rollNo,
        studentClass: studentClass,
        gender: gender,
        mobileNumber: mobileNumber,
        parentsName: parentsName,
        parentsMobileNumber: parentsMobileNumber,
        dob: dob,
        bloodGroup: bloodGroup,
        address: address,
        fileInput: fileInput
    };

    const params = new URLSearchParams(window.location.search);
    const studentId = params.get('studentId');

    // Send a POST request to your API
    try {
        const response = await fetch(`http://localhost:2020/api/v1/students/${studentId}/update/admin`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(studentData),
        });
        const theResponse = await response.json();
        if (response.ok) {
            // Student added successfully, you can handle the success case here
            console.log('Student Updated successfully!');
            displayMessage(theResponse);

        } else {
            // Handle unsuccessful response (e.g., show an error message)
            console.error('Failed to Update student. Status:', response.status);
            displayMessage(theResponse);
        }
    } catch (error) {
        console.error('Error during student addition:', error.message);
    }
});

    // Function to get input value by name
    function getValueByName(name) {
        const element = document.querySelector(`[name="${name}"]`);
        return element ? element.value : '';
    }


function displayMessage(response) {
    var messageDiv = $("#message");
    messageDiv.text(response.message);

    if (response.status === "failed") {
        messageDiv.removeClass("alert-success").addClass("alert-danger");
    } else {
        messageDiv.removeClass("alert-danger").addClass("alert-success");
    }
}