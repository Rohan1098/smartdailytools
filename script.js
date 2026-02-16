function calculateSIP() {
let P = document.getElementById("sipAmount").value;
let r = document.getElementById("sipRate").value / 100 / 12;
let n = document.getElementById("sipYears").value * 12;

let futureValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

document.getElementById("sipResult").innerText =
"Future Value: ₹" + futureValue.toFixed(2);
}

function calculateEMI() {
let P = document.getElementById("loanAmount").value;
let r = document.getElementById("loanRate").value / 100 / 12;
let n = document.getElementById("loanYears").value * 12;

let emi = (P * r * Math.pow(1 + r, n)) /
(Math.pow(1 + r, n) - 1);

document.getElementById("emiResult").innerText =
"Monthly EMI: ₹" + emi.toFixed(2);
}

function calculateAge() {
let dob = new Date(document.getElementById("dob").value);
let diff = Date.now() - dob.getTime();
let age = new Date(diff);

document.getElementById("ageResult").innerText =
"Age: " + Math.abs(age.getUTCFullYear() - 1970) + " years";
}
