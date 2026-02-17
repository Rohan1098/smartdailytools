function getNumber(id) {
let value = parseFloat(document.getElementById(id)?.value);
return isNaN(value) ? 0 : value;
}

/* Smooth Scroll */
function scrollToTools(){
document.getElementById("tools").scrollIntoView({behavior:"smooth"});
}

/* SIP */
function calculateSIP() {
let P = getNumber("sipAmount");
let r = getNumber("sipRate") / 100 / 12;
let n = getNumber("sipYears") * 12;

if(P <= 0 || r <= 0 || n <= 0){
document.getElementById("sipResult").innerText = "Please enter valid values.";
return;
}

let futureValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
document.getElementById("sipResult").innerText =
"Future Value: ₹" + futureValue.toFixed(2);
}

/* EMI */
function calculateEMI() {
let P = getNumber("loanAmount");
let r = getNumber("loanRate") / 100 / 12;
let n = getNumber("loanYears") * 12;

if(P <= 0 || r <= 0 || n <= 0){
document.getElementById("emiResult").innerText = "Please enter valid values.";
return;
}

let emi = (P * r * Math.pow(1 + r, n)) /
(Math.pow(1 + r, n) - 1);

document.getElementById("emiResult").innerText =
"Monthly EMI: ₹" + emi.toFixed(2);
}

/* GST */
function calculateGST() {
let amount = getNumber("gstAmount");
let rate = getNumber("gstRate");

if(amount <= 0 || rate < 0){
document.getElementById("gstResult").innerText = "Enter valid values.";
return;
}

let gst = (amount * rate) / 100;
document.getElementById("gstResult").innerText =
"GST: ₹" + gst.toFixed(2);
}

/* CAGR */
function calculateCAGR() {
let start = getNumber("cagrStart");
let end = getNumber("cagrEnd");
let years = getNumber("cagrYears");

if(start <= 0 || end <= 0 || years <= 0){
document.getElementById("cagrResult").innerText = "Enter valid values.";
return;
}

let cagr = (Math.pow(end/start,1/years)-1)*100;
document.getElementById("cagrResult").innerText =
"CAGR: " + cagr.toFixed(2) + "%";
}

/* Percentage */
function calculatePercentage() {
let value = getNumber("percentValue");
let total = getNumber("percentTotal");

if(total === 0){
document.getElementById("percentageResult").innerText = "Total cannot be zero.";
return;
}

let percent = (value/total)*100;
document.getElementById("percentageResult").innerText =
percent.toFixed(2) + "%";
}

/* Age */
function calculateAge() {
let dobInput = document.getElementById("dob")?.value;

if (!dobInput) {
document.getElementById("ageResult").innerText = "Select valid date.";
return;
}

let dob = new Date(dobInput);
let today = new Date();

if (dob > today) {
document.getElementById("ageResult").innerText = "Date cannot be future.";
return;
}

let years = today.getFullYear() - dob.getFullYear();
let months = today.getMonth() - dob.getMonth();
let days = today.getDate() - dob.getDate();

if (days < 0) {
months--;
days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
}

if (months < 0) {
years--;
months += 12;
}

document.getElementById("ageResult").innerText =
years + " years, " + months + " months, " + days + " days";
}
/* Dark Mode Toggle */
document.addEventListener("DOMContentLoaded", function(){

    const toggleBtn = document.getElementById("themeToggle");

    if(toggleBtn){
        toggleBtn.addEventListener("click", function(){
            document.body.classList.toggle("dark-mode");

            const isDark = document.body.classList.contains("dark-mode");
            toggleBtn.textContent = isDark ? "☀️" : "🌙";

            // Save preference
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });

        // Load saved theme
        const savedTheme = localStorage.getItem("theme");
        if(savedTheme === "dark"){
            document.body.classList.add("dark-mode");
            toggleBtn.textContent = "☀️";
        }
    }

});


/* Tool Search */
function filterTools(){
let input = document.getElementById("toolSearch").value.toLowerCase();
let cards = document.querySelectorAll(".tool-card");

cards.forEach(card => {
let text = card.textContent.toLowerCase();
card.style.display = text.includes(input) ? "block" : "none";
});
}

/* Animated Counter */
window.addEventListener("load", function(){
let count = 0;
let target = 6;
let counter = document.getElementById("toolCount");

let interval = setInterval(()=>{
if(count < target){
count++;
counter.textContent = count;
} else {
clearInterval(interval);
}
}, 150);
});


