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

function calculateGST() {
let amount = document.getElementById("gstAmount").value;
let rate = document.getElementById("gstRate").value;
let gst = (amount * rate) / 100;
document.getElementById("gstResult").innerText =
"GST: ₹" + gst.toFixed(2);
}

function calculateCAGR() {
let start = document.getElementById("cagrStart").value;
let end = document.getElementById("cagrEnd").value;
let years = document.getElementById("cagrYears").value;
let cagr = (Math.pow(end/start,1/years)-1)*100;
document.getElementById("cagrResult").innerText =
"CAGR: " + cagr.toFixed(2) + "%";
}

function calculatePercentage() {
let value = document.getElementById("percentValue").value;
let total = document.getElementById("percentTotal").value;
let percent = (value/total)*100;
document.getElementById("percentageResult").innerText =
percent.toFixed(2) + "%";
}

function calculateAge() {
let dob = new Date(document.getElementById("dob").value);
let diff = Date.now() - dob.getTime();
let age = new Date(diff);
document.getElementById("ageResult").innerText =
Math.abs(age.getUTCFullYear()-1970)+" years";
}
