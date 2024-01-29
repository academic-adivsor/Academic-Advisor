const sideMenu = document.querySelector("aside");
const profileBtn = document.querySelector("#profile-btn");
const themeToggler = document.querySelector(".theme-toggler");
const nextDay = document.getElementById('nextDay');
const prevDay = document.getElementById('prevDay');

profileBtn.onclick = function() {
    sideMenu.classList.toggle('active');
}
window.onscroll = () => {
    sideMenu.classList.remove('active');
    if(window.scrollY > 0){document.querySelector('header').classList.add('active');}
    else{document.querySelector('header').classList.remove('active');}
}

themeToggler.onclick = function() {
    document.body.classList.toggle('dark-theme');
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')
}

let setData = (day) =>{
    document.querySelector('table tbody').innerHTML = ' '; //To clear out previous table data;  
    let daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    document.querySelector('.timetable div h2').innerHTML = daylist[day];
    switch(day){
        case(0): day = Sunday; break;
        case(1): day = Monday; break;
        case(2): day = Tuesday; break;
        case(3): day = Wednesday; break;
        case(4): day = Thursday; break;
        case(5): day = Friday; break;
        case(6): day = Saturday; break;
    }

    day.forEach(sub => {
        const tr = document.createElement('tr');
        const trContent = `
                            <td>${sub.time}</td>
                            <td>${sub.roomNumber}</td>
                            <td>${sub.subject}</td>
                            <td>${sub.type}</td>
                        `
        tr.innerHTML = trContent;
        document.querySelector('table tbody').appendChild(tr)                        
    });
}

let now = new Date();
let today = now.getDay(); // Will return the present day in numerical value; 
let day = today; //To prevent the today value from changing;

function timeTableAll(){
    document.getElementById('timetable').classList.toggle('active');
    setData(today);
    document.querySelector('.timetable div h2').innerHTML = "Today's Timetable";
}
nextDay.onclick = function() {
    day<=5 ? day++ : day=0;  // If else one liner
    setData(day);
}
prevDay.onclick = function() {
    day>=1 ? day-- : day=6;    
    setData(day);
}

setData(day); //To set the data in the table on loading window.
document.querySelector('.timetable div h2').innerHTML = "Today's Timetable"; //To prevent overwriting the heading on loading;

// ===============> chat-bot Code Go as Follows <================ //
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = "sk-7Palc22EziLHISrxbAVQT38lbkFJY9WCOZiqdBhebjUy2XpH";

// Define chatDisplay
const chatDisplay = document.querySelector(".chatbot");

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

var generateResponse = async function generateResponse(incomingChatLi) {
    var API_URL, requestOptions, response, _ref, botResponse;
  
    try {
      API_URL = 'http://localhost:2020/api/v1/chat';
      requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage
        })
      };
      response = await fetch(API_URL, requestOptions);
  
      // Initialize botResponse to an empty string by default
      botResponse = '';
      if (response.ok) {
        // Parse the response and extract botResponse
          botResponse = await response.text();
          botResponse = JSON.parse(botResponse);
          botResponse = botResponse.message;

        // Update the UI with the chatbot's response
        const incomingChatLi = createChatLi(botResponse, "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
              } else {
        console.error("Error communicating with the server. Status: ".concat(response.status, ", ").concat(response.statusText));
      }
    } catch (error) {
      console.error('Error:', error.message);
      console.error(error.stack);
    } finally {
        
      chatbox.scrollTo(0, chatbox.scrollHeight);
    }
  };

const handleChat = async () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Display "Thinking..." message while waiting for the response
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Wait for generateResponse to complete before moving on
    await generateResponse(incomingChatLi);
};

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));




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
    // Fetch data from the endpoint
    var programName;
    var programID;
    var studentID = decodeJWT(token).id;
    fetch(`http://localhost:2020/api/v1/students/${studentID}/admin`, {
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            // Assuming there is only one student in the data
            const student = data.data;
            programID = student.program;
            // Update the profile section
            document.getElementById('studentName').textContent = student.name;
            document.getElementById('studentID').textContent = student.teacherId; // Adjust the actual property name

            // Update the about section
            document.getElementById('dob').textContent = student.dateAdmitted;
            document.getElementById('contact').textContent = student.contact || '123456789';
            document.getElementById('email').textContent = student.email;
            document.getElementById('address').textContent = student.address || 'Modern acedamy';

            // Fetch the second set of data after the first one
            return fetch(`http://localhost:2020/api/v1/programs/${programID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
                    'Content-Type': 'application/json'
                },
            });
        })
        .then(response => response.json())
        .then(data => {
            // Assuming there is only one student in the data
            const student = data.data;
            programName = student.name;
            document.getElementById('course').textContent = programName;
            // Fetch the third set of data after the second one
            return fetch(`http://localhost:2020/api/v1/subjects/getBysubjectId/${programID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the "Authorization" header
                    'Content-Type': 'application/json'
                },
            });
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success' && data.data) {
                // Iterate through subjects and create elements
                data.data.forEach(subject => {
                    const randomProgress = Math.floor(Math.random() * 101);
                    const subjectElement = createSubjectElement(subject ,randomProgress);
                    subjectContainer.appendChild(subjectElement);
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});


function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


function createSubjectElement(subject , randomProgress) {
    const randomColor = getRandomColor();
    const subjectElement = document.createElement('div');
    subjectElement.className = 'subject';
    subjectElement.innerHTML = `
        <h3>${subject.name}</h3>
        <h2>${randomProgress}%</h2>
        <div class="progress" style="color: ${randomColor};">
            <svg><circle cx="38" cy="38" r="36" stroke="${randomColor}"></circle></svg>
            <div class="number"><p>${randomProgress}%</p></div>
        </div>
        <small class="text-muted">Last 24 Hours</small>
    `;
    return subjectElement;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function changePasswordAndRedirect() {
    // Assuming you have the user ID stored in a variable named 'userId'
    const userId = token; // Replace with the actual user ID

    // Redirect to the user profile with the user ID in the URL
    window.location.href = `/Student-Dashboard-main/Portfilio for Acadimc_Advisor/index_Port.html`;
}