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

document.addEventListener("DOMContentLoaded", function () {
    debugger
        // Fetch data from the API with the Authorization header
        fetch("http://localhost:2020/api/v1/programs", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    // Iterate over the departments and dynamically create rows
                    var oddRows = document.querySelectorAll('tr.odd');
                    oddRows.forEach(function(row) {
                        row.parentNode.removeChild(row);
                    });
                    data.data.forEach((department, index) => {
                        // Append a new row to the table body
                        document.getElementById("departmentTableBody").innerHTML += `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${department.name}</td>
                                <td>${department.code}</td>
                                <td>${department.createdAt}</td>
                                <td>${department.studentNumber}</td>
                                <td>
                                    <!-- Add any action buttons here -->
                                    <a href="edit-departments.html?departmentId=${department._id}" class="btn btn-sm btn-primary"><i class="la la-pencil"></i></a>
                                    <a href="javascript:void(0);" class="btn btn-sm btn-danger" onclick="deleteDepartment('${department._id}')"><i class="la la-trash-o"></i></a>
                                </td>
                            </tr>
                        `;
                    });
                } else {
                    // Handle the case where the API request was not successful
                    console.error("Failed to fetch department data");
                }
            })
            .catch(error => console.error("Error:", error));
    });


    async function deleteDepartment(departmentId) {
        // Implement your logic for deleting a student here
        if (confirm('Are you sure you want to delete this Department?')) {
          console.log(`Deleting Department with ID: ${departmentId}`);
          try {
            const response = await fetch('http://localhost:2020/api/v1/programs/'+ departmentId , {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
             },
            });
      
            const data = await response.json();
      
            if (response.ok) {
              console.log('Department deleted successfully:', data.message);
              window.location.reload();
            } else {
              console.error('Error deleting Department:', data.message);
            }
          } catch (error) {
            console.error('Request failed:', error);
          }
      
        }
      }
    

      function populateFormFields() {
        const params = new URLSearchParams(window.location.search);
        const studentId = params.get('departmentId');
    
        // Fetch student data using the studentId
        fetch(`http://localhost:2020/api/v1/programs/${studentId}` ,{
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
            'Content-Type': 'application/json'
        },
          })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Populate form fields with student data
                
                document.getElementById('name').value = data.data.name;
                document.getElementById('description').value = data.data.description;
                document.getElementById('duration').value = data.data.duration;
                document.getElementById('code').value = data.data.code;
                document.getElementById('createdAt').value = data.data.createdAt;

    
    
                // You can continue to populate other form fields based on your data structure
            })
            .catch(error => console.error('Error fetching student data:', error));
    }
    
    function cancelEdit() {
        window.location.href = 'edit-departments.html';
    }
    
    window.onload = function () {
        populateFormFields();
    };