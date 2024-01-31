$(document).ready(function(){
    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('header').toggleClass('toggle');
    });

    $(window).on('scroll load' , function(){
        $('#menu').removeClass('fa-times');
        $('header').removeClass('toggle');
    });

    if($(window).scrollTop() > 0){
        $('.top').show();
    }else{
        $('.top').hide();
    }
});

 // smooth scrolling //
$('a[href*="#"]').on('click' , function(e){
    e.preventDefault();
    $('html , body').animate({
        scrollTop : $($(this).attr('href')).offset().top,
    } , 
    500,
    'linear'
    );
});



const token = localStorage.getItem('authToken'); // Replace 'your_token_key' with the actual key used to store the token
var programID ;
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
    var studentID = decodeJWT(token).id;

    fetch(`http://localhost:2020/api/v1/students/${studentID}/admin`, {
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {

        // Assuming the received data is stored in the 'user' variable
        const user = data.data;
        programID = user.program;

        // Update user information
        document.getElementById('profileName').textContent = user.name;
        document.getElementById('profileName2').textContent = user.name;
        document.getElementById('profileName3').textContent = user.name;

        document.getElementById('email').textContent = user.email;


        //   userContainer.querySelector('.post').textContent = user.role;

          fetch(`http://localhost:2020/api/v1/programs/${programID}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          })
            .then(response => response.json())
            .then(data => {
              // Assuming data is an array of education details
              fillEducationSection(data);
            })
            .catch(error => console.error('Error fetching education data:', error));
    
    })
    .catch(error => console.error('Error fetching user data:', error));
    
});



function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}





function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  function fillEducationSection(educationData) {

    fetch(`http://localhost:2020/api/v1/subjects/getBysubjectId/${programID}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(data => {
      // Assuming data is an array of education details

      const boxContainer = document.querySelector('.box-container');
  
      data.data.forEach((yearData) => {
        const box = document.createElement('div');
        box.classList.add('box');
    
        const subjectsList = document.createElement('ul');
        const subjectItem = document.createElement('li');
          subjectItem.classList.add('achievement');
    
          subjectItem.innerHTML = `
            <h2>${yearData.name}</h2>
            <p>${generateRandomProjects()} Projects <br> Grade : ${generateRandomGrade()}</p>
          `;
    
          subjectsList.appendChild(subjectItem);

    
        box.innerHTML = `
          <i class="fas fa-graduation-cap"></i>
          <span>${educationData.data.duration}</span>
          <h3>${educationData.data.name}</h3>
        `;
        box.appendChild(subjectsList);
    
        boxContainer.appendChild(box);
      });
  
    })
    .catch(error => console.error('Error fetching education data:', error));
  
  }
  
  // Function to generate a random number between min and max

  // Function to dynamically fill the education section
//   function fillEducationSection(educationData) {

//     const boxContainer = document.querySelector('.box-container');
  
//     educationData.forEach((yearData) => {
//       const box = document.createElement('div');
//       box.classList.add('box');
  
//       const subjectsList = document.createElement('ul');
  
//       yearData.subjects.forEach((subject) => {
//         const subjectItem = document.createElement('li');
//         subjectItem.classList.add('achievement');
  
//         subjectItem.innerHTML = `
//           <h2>${subject.name}</h2>
//           <p>${subject.projects} Projects <br> Grade : ${subject.grade}</p>
//         `;
  
//         subjectsList.appendChild(subjectItem);
//       });
  
//       box.innerHTML = `
//         <i class="fas fa-graduation-cap"></i>
//         <span>${yearData.year}</span>
//         <h3>${yearData.title}</h3>
//       `;
//       box.appendChild(subjectsList);
  
//       boxContainer.appendChild(box);
//     });
//   }
  
// Function to generate random grade
function generateRandomGrade() {
    const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C'];
    const randomIndex = getRandomNumber(0, grades.length - 1);
    return grades[randomIndex];
  }
  
  // Function to generate random projects
  function generateRandomProjects() {
    return getRandomNumber(1, 5); // Adjust the range as needed
  }  