function checkEligibility() {
    let age = prompt("Please enter your age:");

    if (age === null || age === "") {
        document.getElementById("result").innerHTML = "Invalid input. Please enter a valid age.";
    } else if (isNaN(age) || age < 0) {
        document.getElementById("result").innerHTML = "Invalid input. Age must be a positive number.";
    } else if (age >= 18) {
        document.getElementById("result").innerHTML = "You are eligible to vote.";
    } else {
        document.getElementById("result").innerHTML = "You are not eligible to vote.";
    }
}
