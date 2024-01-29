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

document.getElementById('departmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get input values from the form
    const departmentName = document.getElementById('departmentName').value;
    const departmentCode = document.getElementById('departmentCode').value;
    const departmentStartDate = document.getElementById('departmentStartDate').value;
    const duration = document.getElementById('duration').value;
    const departmentDetails = document.getElementById('departmentDetails').value;
  
    // Prepare input data
    const inputData = {
        name: departmentName,
        code: departmentCode,
        createdAt: departmentStartDate,
      duration: duration,
      description: departmentDetails
    };
  
    const apiUrl = 'http://localhost:2020/api/v1/programs';
  
    // Make a POST request using fetch
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == "success") {
        // Handle the response data
        // Optionally, refresh the page or perform other actions on success
        displayMessage(data);
        clearForm();
        }else{
        displayMessage(data);

        }

      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
  });


  
function displayMessage(response) {
    var messageDiv = $("#message");
    messageDiv.text(response.message);

    if (response.status === "failed") {
        messageDiv.removeClass("alert-success").addClass("alert-danger");
    } else {
        messageDiv.removeClass("alert-danger").addClass("alert-success");
    }
}

function clearForm() {
    // Clear each specific input field by its ID
    $('#departmentName').val('');
    $('#departmentCode').val('');
    $('#departmentStartDate').val('');
    $('#duration').val('');
    $('#departmentDetails').val('');
}


