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

        // Update user information
        document.getElementById('profileName').textContent = user.name;
        document.getElementById('profileName2').textContent = user.name;
        document.getElementById('profileName3').textContent = user.name;

        document.getElementById('email').textContent = user.email;


          userContainer.querySelector('.post').textContent = user.role;
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
