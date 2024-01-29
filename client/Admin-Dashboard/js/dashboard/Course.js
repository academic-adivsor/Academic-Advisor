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

document.getElementById('courseForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get input values from the form
    const name = document.getElementById('name').value;
    const departmentCode = document.getElementById('code').value;
    const selectElement = document.getElementById('departmentDropdown').value;
    const duration = document.getElementById('duration').value;
    const description = document.getElementById('detail').value;
  
    // Prepare input data
    const inputData = {
        name: name,
        code: departmentCode,
        academicTerm : selectElement,
      duration: duration,
      description: description
    };
  
    const apiUrl = `http://localhost:2020/api/v1/subjects/${selectElement}`;
  
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


async function fetchAndPopulateDropdown() {
  
    try {
      // Fetch data from the API

      // Fetch data from the API with the authorization header
      var response = await fetch('http://localhost:2020/api/v1/programs', {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });
     var data = await response.json();
  
      // Clear existing options
      const departmentSelect = document.getElementById('departmentDropdown');
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Select Department';
      departmentSelect.appendChild(defaultOption);

      // Add department options
      data.data.forEach(function(program) {

        const option = document.createElement('option');
        option.value = program._id;
        option.textContent = program.name;
  
        departmentSelect.appendChild(option);
      });
      $('#departmentDropdown').selectpicker('refresh');

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    fetchAndPopulateDropdown();
  });




