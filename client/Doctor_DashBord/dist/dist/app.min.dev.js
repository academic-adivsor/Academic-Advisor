"use strict";

var sideMenu = document.querySelector("aside"),
    profileBtn = document.querySelector("#profile-btn"),
    themeToggler = document.querySelector(".theme-toggler"),
    nextDay = document.getElementById("nextDay"),
    prevDay = document.getElementById("prevDay");
profileBtn.onclick = function () {
  sideMenu.classList.toggle("active");
}, window.onscroll = function () {
  sideMenu.classList.remove("active"), 0 < window.scrollY ? document.querySelector("header").classList.add("active") : document.querySelector("header").classList.remove("active");
}, themeToggler.onclick = function () {
  document.body.classList.toggle("dark-theme"), themeToggler.querySelector("span:nth-child(1)").classList.toggle("active"), themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
};

var setData = function setData(e) {
  document.querySelector("table tbody").innerHTML = " ";

  switch (document.querySelector(".timetable div h2").innerHTML = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][e], e) {
    case 0:
      e = Sunday;
      break;

    case 1:
      e = Monday;
      break;

    case 2:
      e = Tuesday;
      break;

    case 3:
      e = Wednesday;
      break;

    case 4:
      e = Thursday;
      break;

    case 5:
      e = Friday;
      break;

    case 6:
      e = Saturday;
  }

  e.forEach(function (e) {
    var t = document.createElement("tr"),
        a = "\n                            <td>".concat(e.time, "</td>\n                            <td>").concat(e.roomNumber, "</td>\n                            <td>").concat(e.subject, "</td>\n                            <td>").concat(e.type, "</td>\n                        ");
    t.innerHTML = a, document.querySelector("table tbody").appendChild(t);
  });
},
    now = new Date(),
    today = now.getDay(),
    day = today;

function timeTableAll() {
  document.getElementById("timetable").classList.toggle("active"), setData(today), document.querySelector(".timetable div h2").innerHTML = "Today's Timetable";
}

nextDay.onclick = function () {
  day <= 5 ? day++ : day = 0, setData(day);
}, prevDay.onclick = function () {
  1 <= day ? day-- : day = 6, setData(day);
}, setData(day), document.querySelector(".timetable div h2").innerHTML = "Today's Timetable";

var userMessage,
    chatInput = document.querySelector(".chat-input textarea"),
    sendChatBtn = document.querySelector(".chat-input span"),
    chatbox = document.querySelector(".chatbox"),
    chatbotToggler = document.querySelector(".chatbot-toggler"),
    chatbotCloseBtn = document.querySelector(".close-btn"),
    API_KEY = "sk-7Palc22EziLHISrxbAVQT38lbkFJY9WCOZiqdBhebjUy2XpH",
    createChatLi = function createChatLi(e, t) {
  var a = document.createElement("li");
  a.classList.add("chat", t);
  var n = "outgoing" === t ? "<P></P>" : '<span class="material-symbols-outlined">smart_toy</span><P></P>';
  return a.innerHTML = n, a.querySelector("p").textContent = e, a;
},
    generateResponse = function generateResponse(e) {
  var t = e.querySelector("p"),
      a = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer ".concat(API_KEY)
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: userMessage
      }]
    })
  };
  fetch("https://api.openai.com/v1/chat/completions", a).then(function (e) {
    return e.json();
  }).then(function (e) {
    t.textContent = e.choices[0].message.content;
  })["catch"](function (e) {
    t.textContent = "Oops! Something went wrong. Please try again.";
  })["finally"](function () {
    return chatbox.scrollTo(0, chatbox.scrollHeight);
  });
},
    handleChat = function handleChat() {
  (userMessage = chatInput.value.trim()) && (chatInput.value = "", chatbox.appendChild(createChatLi(userMessage, "outgoing")), chatbox.scrollTo(0, chatbox.scrollHeight), setTimeout(function () {
    var e = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(e), chatbox.scrollTo(0, chatbox.scrollHeight), generateResponse(e);
  }, 600));
};

sendChatBtn.addEventListener("click", handleChat), chatbotCloseBtn.addEventListener("click", function () {
  return document.body.classList.remove("show-chatbot");
}), chatbotToggler.addEventListener("click", function () {
  return document.body.classList.toggle("show-chatbot");
});