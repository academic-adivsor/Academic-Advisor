
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
    // Fetch data from your API
    fetch('http://localhost:2020/api/v1/subjects' , {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
          'Content-Type': 'application/json',
       }})
      .then(response => response.json())
      .then(data => {
        const coursesContainer = document.getElementById('courseContainer');
        
        // Loop through the data and create cards for each course
        data.data.forEach(course => {
          const card = document.createElement('div');
          card.className = 'col-xl-3 col-xxl-4 col-lg-4 col-md-6 col-sm-6';
          card.innerHTML = `
            <div class="card">
              <img class="img-fluid" src="images/courses/pic${getRandomNumber(1, 8)}.jpg" alt="">
              <div class="card-body">
                <h4>${course.name}</h4>
                <ul class="list-group mb-3 list-group-flush">
                  <li class="list-group-item px-0 border-top-0 d-flex justify-content-between">
                    <span class="mb-0 text-muted">Total Likes</span>
                    <a href="javascript:void(0);"><i class="la la-heart-o mr-1"></i><strong>${getRandomNumber(100, 500)}</strong></a>
                  </li>
                  <li class="list-group-item px-0 d-flex justify-content-between">
                    <span class="mb-0">Duration :</span><strong>${course.duration}</strong>
                  </li>
                  <li class="list-group-item px-0 d-flex justify-content-between">
                    <span class="mb-0">Created At :</span><strong>${course.createdAt}</strong>
                  </li>
                  <li class="list-group-item px-0 d-flex justify-content-between">
                    <span><i class="fa fa-graduation-cap text-primary mr-2"></i>Student</span><strong>${getRandomNumber(100, 500)}</strong>
                  </li>
                </ul>
              </div>
            </div>
          `;
  
          coursesContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  
    // Function to get a random number between min and max (inclusive)
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  });