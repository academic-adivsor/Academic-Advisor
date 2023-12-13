"use strict";

document.getElementById('login').addEventListener('click', function _callee() {
  var username, password, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          username = document.getElementById('usernameInput').value;
          password = document.getElementById('passwordInput').value;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch('http://localhost:2020/api/v1/admins/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
          }));

        case 5:
          response = _context.sent;

          if (response.ok) {// Handle successful login, e.g., redirect to another page.
          } else {// Handle unsuccessful login, show an error message, etc.
            }

          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          console.error('Error during login:', _context.t0.message);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
//# sourceMappingURL=app.dev.js.map
