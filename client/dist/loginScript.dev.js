"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var loginButton = document.getElementById('login');
  loginButton.addEventListener('click', function _callee() {
    var username, password, adminResponse, adminUser, teacherResponse, teacherUser, studentResponse, studentUser;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            username = document.getElementById('usernameInput').value;
            password = document.getElementById('passwordInput').value;
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap(fetch('api/v1/admins/login', {
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
            adminResponse = _context.sent;

            if (!adminResponse.ok) {
              _context.next = 12;
              break;
            }

            _context.next = 9;
            return regeneratorRuntime.awrap(adminResponse.json());

          case 9:
            adminUser = _context.sent;
            window.location.href = '/Admin-Dashboard';
            return _context.abrupt("return");

          case 12:
            _context.next = 14;
            return regeneratorRuntime.awrap(fetch('http://localhost:2020/teachers/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: username,
                password: password
              })
            }));

          case 14:
            teacherResponse = _context.sent;

            if (!teacherResponse.ok) {
              _context.next = 21;
              break;
            }

            _context.next = 18;
            return regeneratorRuntime.awrap(teacherResponse.json());

          case 18:
            teacherUser = _context.sent;
            window.location.href = 'Doctor_DashBord';
            return _context.abrupt("return");

          case 21:
            _context.next = 23;
            return regeneratorRuntime.awrap(fetch('http://localhost:2020/students/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: username,
                password: password
              })
            }));

          case 23:
            studentResponse = _context.sent;

            if (!studentResponse.ok) {
              _context.next = 30;
              break;
            }

            _context.next = 27;
            return regeneratorRuntime.awrap(studentResponse.json());

          case 27:
            studentUser = _context.sent;
            window.location.href = 'Student-Dashboard-main';
            return _context.abrupt("return");

          case 30:
            // Handle other cases or show an error message
            console.error('Login failed');
            _context.next = 36;
            break;

          case 33:
            _context.prev = 33;
            _context.t0 = _context["catch"](2);
            console.error('Error during login:', _context.t0.message);

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 33]]);
  });
});
//# sourceMappingURL=loginScript.dev.js.map
