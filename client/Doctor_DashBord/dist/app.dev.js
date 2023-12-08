"use strict";

var sideMenu = document.querySelector("aside");
var profileBtn = document.querySelector("#profile-btn");
var themeToggler = document.querySelector(".theme-toggler");
var nextDay = document.getElementById('nextDay');
var prevDay = document.getElementById('prevDay');

profileBtn.onclick = function () {
  sideMenu.classList.toggle('active');
};

window.onscroll = function () {
  sideMenu.classList.remove('active');

  if (window.scrollY > 0) {
    document.querySelector('header').classList.add('active');
  } else {
    document.querySelector('header').classList.remove('active');
  }
};

themeToggler.onclick = function () {
  document.body.classList.toggle('dark-theme');
  themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
  themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
};

var setData = function setData(day) {
  document.querySelector('table tbody').innerHTML = ' '; //To clear out previous table data;  

  var daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  document.querySelector('.timetable div h2').innerHTML = daylist[day];

  switch (day) {
    case 0:
      day = Sunday;
      break;

    case 1:
      day = Monday;
      break;

    case 2:
      day = Tuesday;
      break;

    case 3:
      day = Wednesday;
      break;

    case 4:
      day = Thursday;
      break;

    case 5:
      day = Friday;
      break;

    case 6:
      day = Saturday;
      break;
  }

  day.forEach(function (sub) {
    var tr = document.createElement('tr');
    var trContent = "\n                            <td>".concat(sub.time, "</td>\n                            <td>").concat(sub.roomNumber, "</td>\n                            <td>").concat(sub.subject, "</td>\n                            <td>").concat(sub.type, "</td>\n                        ");
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
  });
};

var now = new Date();
var today = now.getDay(); // Will return the present day in numerical value; 

var day = today; //To prevent the today value from changing;

function timeTableAll() {
  document.getElementById('timetable').classList.toggle('active');
  setData(today);
  document.querySelector('.timetable div h2').innerHTML = "Today's Timetable";
}

nextDay.onclick = function () {
  day <= 5 ? day++ : day = 0; // If else one liner

  setData(day);
};

prevDay.onclick = function () {
  day >= 1 ? day-- : day = 6;
  setData(day);
};

setData(day); //To set the data in the table on loading window.

document.querySelector('.timetable div h2').innerHTML = "Today's Timetable"; //To prevent overwriting the heading on loading;
// ===============> chat-bot Code Go as Follows <================ //

var chatInput = document.querySelector(".chat-input textarea");
var sendChatBtn = document.querySelector(".chat-input span");
var chatbox = document.querySelector(".chatbox");
var chatbotToggler = document.querySelector(".chatbot-toggler");
var chatbotCloseBtn = document.querySelector(".close-btn");
var userMessage;
var API_KEY = "sk-7Palc22EziLHISrxbAVQT38lbkFJY9WCOZiqdBhebjUy2XpH";

var createChatLi = function createChatLi(message, className) {
  var chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  var chatContent = className === "outgoing" ? "<P></P>" : "<span class=\"material-symbols-outlined\">smart_toy</span><P></P>";
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

var generateResponse = function generateResponse(incomingChatLi) {
  var API_URL = "https://api.openai.com/v1/chat/completions";
  var messageElement = incomingChatLi.querySelector("p");
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer ".concat(API_KEY)
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: userMessage
      }]
    })
  };
  fetch(API_URL, requestOptions).then(function (res) {
    return res.json();
  }).then(function (data) {
    messageElement.textContent = data.choices[0].message.content;
  })["catch"](function (error) {
    messageElement.textContent = "Oops! Something went wrong. Please try again.";
  })["finally"](function () {
    return chatbox.scrollTo(0, chatbox.scrollHeight);
  });
};

var handleChat = function handleChat() {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);
  setTimeout(function () {
    // Display "Thinking ..." message while waiting for the response //
    var incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", function () {
  return document.body.classList.remove("show-chatbot");
});
chatbotToggler.addEventListener("click", function () {
  return document.body.classList.toggle("show-chatbot");
});