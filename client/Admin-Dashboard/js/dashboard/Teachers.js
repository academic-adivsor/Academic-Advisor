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

document.getElementById('teacherForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const fullName = `${firstName} ${lastName}`;

    // Get input values from the form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const program = document.getElementById('departmentDropdown');
  

// To get the selected text
const selectedText = program.options[program.selectedIndex].text;

    // Prepare input data
    const inputData = {
        name: fullName,
        email: email,
        password : password,
        program: selectedText
    };
  
    const apiUrl = `http://localhost:2020/api/v1/teachers/admin/register`;
  
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
    $('#firstName').val('');
    $('#lastName').val('');
    $('#email').val('');
    $('#password').val('');
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

    // Function to get input value by name
    function getValueByName(name) {
        const element = document.querySelector(`[name="${name}"]`);
        return element ? element.value : '';
    }
