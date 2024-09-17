function validation() {
    console.log("Validation function called.");
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var domain = document.getElementById("domain").value;
    var password = document.getElementById("password").value;
    var cpassword = document.getElementById("cpassword").value;
    var result = document.getElementById("result");

    if (name.trim() === " ") {
        result.innerHTML = "Enter Name*";
        return false;
    }
    if (name.length <= 3) {
        result.innerHTML = "Name should be at least three characters*";
        return false;
    }
    if (email.trim() === "") {
        result.innerHTML = "Enter Email*";
        return false;
    }
    if (domain.trim() === "") {
        result.innerHTML = "Enter Domain*";
        return false;
    }
    if (password.trim() === "") {
        result.innerHTML = "Enter Password*";
        return false;
    }
    if (cpassword.trim() === "") {
        result.innerHTML = "Enter Confirm Password*";
        return false;
    }
    if (password !== cpassword) {
        result.innerHTML = "Passwords do not match*";
        return false;
    }
    return true;
}
