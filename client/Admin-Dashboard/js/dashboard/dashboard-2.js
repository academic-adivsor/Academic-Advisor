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
			  <button class="btn btn-sm btn-primary" onclick="editStudent('${student._id}')">Edit</button>
			  <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student._id}')">Delete</button>
			</td>
		  `;
  
		  studentTableBody.appendChild(row);
		});
	  })
	  .catch(error => console.error('Error fetching students:', error));
  });

   
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
  document.getElementById('totalStudentsCount').innerText = data.data.length || 'N/A';

  // New Students (Assuming you want to show the count of students added recently)
  const newStudentsCount = data.data.filter(student => {
	const admissionDate = new Date(student.dateAdmitted);
	const currentDate = new Date();
	// Assuming "recently" means added within the last 30 days
	return (currentDate - admissionDate) / (1000 * 60 * 60 * 24) <= 30;
  }).length;
  document.getElementById('newStudentsCount').innerText = newStudentsCount || 'N/A';
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

  function editStudent(studentId) {
	// Implement your logic for editing a student here
	console.log(`Editing student with ID: ${studentId}`);
  }
  function deleteStudent(studentId) {
	// Implement your logic for deleting a student here
	if (confirm('Are you sure you want to delete this student?')) {
	  console.log(`Deleting student with ID: ${studentId}`);
	  // Make a fetch request to delete the student using the studentId
	  // ...
	}
  }
  


(function($) {
    /* "use strict" */


var eduMin = function(){
	
	var screenWidth = $(window).width();
	var morrisBar = function(){
		if(jQuery('#morris_bar_2').length > 0 ){
			
			//bar chart stalked

			Morris.Bar.prototype.fillForSeries = function(i) {
				var color;
				return "0-#fff-#fff:20-#fff";
			};

			Morris.Bar({
				element: 'morris_bar_2',
				data: [
				  { y: '2006', a: 100, b: 90, c: 80 },
				  { y: '2007', a: 75,  b: 65, c: 75 },
				  { y: '2007', a: 75,  b: 65, c: 75 },
				  { y: '2007', a: 75,  b: 65, c: 75 },
				  { y: '2008', a: 50,  b: 40, c: 45 },
				  { y: '2009', a: 75,  b: 65, c: 85 },
				  { y: '2009', a: 79,  b: 35, c: 45 },
				  { y: '2009', a: 60,  b: 20, c: 60 },
				  { y: '2009', a: 66,  b: 30, c: 50 },
				  { y: '2009', a: 46,  b: 60, c: 90 },
				  { y: '2009', a: 35,  b: 80, c: 60 },
				],
				xkey: 'y',
				ykeys: ['a', 'b', 'c'],
				labels: ['Series A', 'Series B', 'Series C'],
				barColors: ['rgb(7, 41, 77)', 'rgb(20, 59, 100)', '#ff8f16'], 
				stacked: true,
				gridTextSize: 10,
				hideHover: 'auto',
				resize: true
			});
		}
	}
	
	var peityLine = function(){
		$(".peity-line").peity("line", {
			fill: ["rgba(162, 186, 211, 1)"], 
			stroke: 'rgba(20, 59, 100, 1)', 
			width: "100%",
			height: "150"
		});
	}
	var peityLine2 = function(){
		$(".peity-line-2").peity("line", {
			fill: ["rgba(255, 225, 193, 1)"], 
			stroke: 'rgba(255, 143, 22, 1)', 
			width: "100%",
			height: "150"
		});	
	}
	var peityLine3 = function(){
		$(".peity-line-3").peity("line", {
			fill: ["rgba(251, 180, 157, 1)"], 
			stroke: 'rgba(242, 85, 33, 1)', 
			width: "100%",
			height: "150"
		});	
	}
	/* Function ============ */
		return {
			init:function(){
			},
			
			
			load:function(){
				morrisBar();
				peityLine();
				peityLine2();
				peityLine3();
				
			},
			
			resize:function(){
				peityLine();
				peityLine2();
				peityLine3();
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
		headerBg: "color_2",
		navheaderBg: "color_10",
		sidebarBg: "color_2",
		sidebarStyle: "full",
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
		eduMin.resize();
		new dlabSettings(dlabSettingsOptions); 
	});     

})(jQuery);