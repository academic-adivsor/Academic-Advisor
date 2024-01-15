function markAsDone() {
    var btn = document.querySelector('.btn');
    // Toggle 'done' class to change styles
    btn.classList.toggle('done');
    // Change button text and add an icon
    if (btn.classList.contains('done')) {
    btn.innerHTML = 'Done <i class="fas fa-check"></i>';
    } else {
    btn.innerHTML = 'Mark as Done';
    }
}
