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

document.addEventListener('DOMContentLoaded', () => {
	// Get the token from localStorage
  
	fetch('http://localhost:2020/api/v1/students/admin', {
	  headers: {
		'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
		'Content-Type': 'application/json'
	  },
	})
	  .then(response => response.json())
	  .then(data => {
		const studentTableBody = document.getElementById('studentTableBody');
  
		// Display only the last 5 students
		const lastFiveStudents = data.data.slice(-5);
  
		lastFiveStudents.forEach((student, index) => {
		  const row = document.createElement('tr');
		  row.innerHTML = `
			<td>${index + 1}</td>
			<td>${student.name}</td>
			<td>${student.email}</td>
			<td>${new Date(student.dateAdmitted).toLocaleDateString()}</td>
			<td>
			  <a href="edit-student.html?studentId=${student._id}" class="btn btn-sm btn-primary"><i class="la la-pencil"></i></a>
			  <a href="javascript:void(0);" class="btn btn-sm btn-danger" onclick="deleteStudent('${student._id}')"><i class="la la-trash-o"></i></a>
			  </td>
		  `;
  
		  studentTableBody.appendChild(row);
		});
	  })
	  .catch(error => console.error('Error fetching students:', error));


	  fetchAndPopulateDropdown();
  });
  
  function editStudent(studentId) {
	// Implement your logic for editing a student here
	console.log(`Editing student with ID: ${studentId}`);
  }
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
  


// Fetch data from the API
fetch('http://localhost:2020/api/v1/students/admin', {
	  headers: {
		'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
		'Content-Type': 'application/json'
	  },
	})
  .then(response => response.json())
  .then(data => {
    // Assuming data is an array of student objects

    // Total Students
    document.querySelector('.widget-stat.card.bg-primary h3').textContent = data.data.length;

    // New Students (Assuming you want to show the count of students added recently)
    const newStudentsCount = data.data.filter(student => {
      const admissionDate = new Date(student.dateAdmitted);
      const currentDate = new Date();
      // Assuming "recently" means added within the last 30 days
      return (currentDate - admissionDate) / (1000 * 60 * 60 * 24) <= 30;
    }).length;
    document.querySelector('.widget-stat.card.bg-warning h3').textContent = newStudentsCount;
  })
  .catch(error => console.error('Error fetching data:', error));

  
  fetch('http://localhost:2020/api/v1/subjects', {
	headers: {
	  'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
	  'Content-Type': 'application/json'
	},
  })
.then(response => response.json())
.then(data => {
  // Assuming data is an array of student objects

  // Total courses
  document.getElementById('totalCourseCount').textContent = data.data.length;

})
.catch(error => console.error('Error fetching data:', error));

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
        const studentClass = document.getElementById('departmentDropdown').value;
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
            program: studentClass,
            gender: gender,
            mobileNumber: mobileNumber,
            parentsName: parentsName,
            parentsMobileNumber: parentsMobileNumber,
            dob: dob,
            bloodGroup: bloodGroup,
            address: address,
            fileInput: fileInput
        };


        // Send a POST request to your API
        try {
            const response = await fetch('http://localhost:2020/api/v1/students/admin/register', {
                method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
					'Content-Type': 'application/json'
				  },
                body: JSON.stringify(studentData),
            });
			const theResponse = await response.json();
            if (response.ok) {
                // Student added successfully, you can handle the success case here
                console.log('Student added successfully!');
				displayMessage(theResponse);
				clearForm();

            } else {
                // Handle unsuccessful response (e.g., show an error message)
                console.error('Failed to add student. Status:', response.status);
				displayMessage(theResponse);
				clearForm();
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
	function clearForm() {
		// Clear form fields
		$("input[name='firstName']").val("");
		$("input[name='lastName']").val("");
		$("input[name='email']").val("");
		$("input[name='password']").val("");
		$("input[name='registrationDate']").val("");
		$("input[name='rollNo']").val("");
		$("select[name='studentClass']").val("Class");
		$("select[name='gender']").val("Gender");
		$("input[name='mobileNumber']").val("");
		$("input[name='parentsName']").val("");
		$("input[name='parentsMobileNumber']").val("");
		$("input[name='dob']").val("");
		$("input[name='bloodGroup']").val("");
		$("textarea[name='address']").val("");
		$(".dropify-clear").click(); // Clear the file input (assuming you are using Dropify)
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

(function($) {
    /* "use strict" */


 var eduMin = function(){
	
	var screenWidth = $(window).width();
	
	var morrisBarStalked = function(){
		if(jQuery('#morris_bar_stalked').length > 0)
		{	
			//bar chart
			Morris.Bar({
				element: 'morris_bar_stalked',
				data: [{
					y: 'S',
					a: 66, 
					b: 34
				}, {
					y: 'M',
					a: 75, 
					b: 25
				}, {
					y: 'T',
					a: 50, 
					b: 50
				}, {
					y: 'W',
					a: 75, 
					b: 25
				}, {
					y: 'T',
					a: 50, 
					b: 50
				}, {
					y: 'F',
					a: 16, 
					b: 84
				}, {
					y: 'S',
					a: 70, 
					b: 30
				}, {
					y: 'S',
					a: 30, 
					b: 70
				}, {
					y: 'M',
					a: 40, 
					b: 60
				}, {
					y: 'T',
					a: 29, 
					b: 71
				}, {
					y: 'W',
					a: 44, 
					b: 56
				}, {
					y: 'T',
					a: 30, 
					b: 70
				}, {
					y: 'F',
					a: 60, 
					b: 40
				}, {
					y: 'G',
					a: 40, 
					b: 60
				}, {
					y: 'S',
					a: 46, 
					b: 54
				}],
				xkey: 'y',
				ykeys: ['a', 'b'],
				labels: ['A', 'B'],
				barColors: ['#1367c8', "#F1F3F7"],
				hideHover: 'auto',
				gridLineColor: 'transparent',
				resize: true,
				barSizeRatio: 0.25,
				stacked: true, 
				behaveLikeLine: true, 
				// barRadius: [6, 6, 0, 0]
			});
		}
	}
	var morrisDonught = function(){
		if(jQuery('#morris_donught_2').length > 0)
		{
			//donught chart
			Morris.Donut({
				element: 'morris_donught_2',
				data: [{
					label: "\xa0 \xa0 Download Sales \xa0 \xa0",
					value: 12,

				}, {
					label: "\xa0 \xa0 In-Store Sales \xa0 \xa0",
					value: 30
				}, {
					label: "\xa0 \xa0 Mail-Order Sales \xa0 \xa0",
					value: 20
				}],
				resize: true,
				colors: ['#1367c8', '#1367c8', '#1367c8']
			});
		}
	}
	
	var morrisArea = function(){
		if(jQuery('#morris_area').length > 0)
		{
			
			//area chart
			Morris.Area({
				element: 'morris_area',
				data: [{
						period: '2001',
						smartphone: 0,
						windows: 0,
						mac: 0
					}, {
						period: '2002',
						smartphone: 90,
						windows: 60,
						mac: 25
					}, {
						period: '2003',
						smartphone: 40,
						windows: 80,
						mac: 35
					}, {
						period: '2004',
						smartphone: 30,
						windows: 47,
						mac: 17
					}, {
						period: '2005',
						smartphone: 150,
						windows: 40,
						mac: 120
					}, {
						period: '2006',
						smartphone: 25,
						windows: 80,
						mac: 40
					}, {
						period: '2007',
						smartphone: 10,
						windows: 10,
						mac: 10
					}


				],
				lineColors: ['#5aa1f2', '#2176d8', '#1565c0'],
				xkey: 'period',
				ykeys: ['smartphone', 'windows', 'mac'],
				labels: ['Phone', 'Windows', 'Mac'],
				pointSize: 0,
				lineWidth: 2,
				resize: true,
				fillOpacity: 1,
				behaveLikeLine: true,
				gridLineColor: 'transparent',
				hideHover: 'auto'

			});
		}
	}
	
	
	
	/* Function ============ */
	return {
		init:function(){
		
		},
			
		load:function(){
			morrisBarStalked();
			morrisDonught();
			morrisArea();
		},
		
		resize:function(){
			
		}
	}
	
	}();
	
	var direction =  getUrlParams('dir');
		if(direction != 'rtl')
		{direction = 'ltr'; }
	
	var dlabSettingsOptions = {
		typography: "roboto",
			version: "light",
			layout: "Vertical",
			headerBg: "color_14",
			navheaderBg: "color_14",
			sidebarBg: "color_13",
			sidebarStyle: "modern",
			sidebarPosition: "static",
			headerPosition: "static",
			containerLayout: "full",
			direction: direction
	};

	jQuery(document).ready(function(){		
		new dlabSettings(dlabSettingsOptions); 
	});
	
	
	
	

	
	jQuery(window).on('load',function(){
		eduMin.load();
	});

	jQuery(window).on('resize',function(){
		new dlabSettings(dlabSettingsOptions); 
	}); 


})(jQuery);

