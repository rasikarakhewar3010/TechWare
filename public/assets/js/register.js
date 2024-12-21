function validateForm() {
    var username = document.forms["registerForm"]["username"].value;
    var email = document.forms["registerForm"]["email"].value;
    var password = document.forms["registerForm"]["password"].value;

    // Username validation
    if (username.trim() === "") {
        alert("Username must be filled out");
        return false;
    }

    // Email validation
    if (email.trim() === "") {
        alert("Email must be filled out");
        return false;
    } else if (!isValidEmail(email)) {
        alert("Please enter a valid email address");
        return false;
    }

    // Password validation
    if (password.trim() === "") {
        alert("Password must be filled out");
        return false;
    } else if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        return false;
    }

    return true;
}

function isValidEmail(email) {
    // Regular expression for email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
