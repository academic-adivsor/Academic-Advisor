"use strict";

var loginButton = document.getElementById('Login Now');
loginButton.addEventListener('Login', function _callee() {
  var username, password, response, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          username = document.getElementById('username').value;
          password = document.getElementById('password').value;
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch('http://localhost:2020/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
          }));

        case 4:
          response = _context.sent;

          if (!response.ok) {
            _context.next = 12;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          user = _context.sent;

          // Check the role and redirect
          if (user.role === 'admin') {
            window.location.href = '/admin-dashboard';
          } else if (user.role === 'student') {
            window.location.href = '/student-dashboard';
          } else if (user.role === 'doctor') {
            window.location.href = '/doctors-dashboard'; // Handle other roles or unexpected scenarios
          }

          _context.next = 13;
          break;

        case 12:
          // Handle login failure
          console.error('Login failed');

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
});
//# sourceMappingURL=loginbutton.dev.js.map
