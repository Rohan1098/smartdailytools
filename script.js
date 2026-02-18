/* =================================
   Helper Function
================================= */

function getNumber(id) {
    const el = document.getElementById(id);
    if (!el) return 0;

    const value = parseFloat(el.value);
    return isNaN(value) ? 0 : value;
}

/* =================================
   Smooth Scroll
================================= */

function scrollToTools() {
    const section = document.getElementById("tools");
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

/* =================================
   SIP Calculator
================================= */

function calculateSIP() {

    const P = getNumber("sipAmount");
    const r = getNumber("sipRate") / 100 / 12;
    const n = getNumber("sipYears") * 12;

    if (P <= 0 || r <= 0 || n <= 0) {
        document.getElementById("sipResult").innerText = "Please enter valid values.";
        return;
    }

    const futureValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

    document.getElementById("sipResult").innerText =
        "Future Value: ₹" + futureValue.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

/* =================================
   EMI Calculator
================================= */

function calculateEMI() {

    const P = getNumber("loanAmount");
    const r = getNumber("loanRate") / 100 / 12;
    const n = getNumber("loanYears") * 12;

    if (P <= 0 || r <= 0 || n <= 0) {
        document.getElementById("emiResult").innerText = "Please enter valid values.";
        return;
    }

    const emi = (P * r * Math.pow(1 + r, n)) /
        (Math.pow(1 + r, n) - 1);

    document.getElementById("emiResult").innerText =
        "Monthly EMI: ₹" + emi.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

/* =================================
   GST Calculator
================================= */

function calculateGST() {

    const amount = getNumber("gstAmount");
    const rate = getNumber("gstRate");

    if (amount <= 0 || rate < 0) {
        document.getElementById("gstResult").innerText = "Enter valid values.";
        return;
    }

    const gst = (amount * rate) / 100;

    document.getElementById("gstResult").innerText =
        "GST Amount: ₹" + gst.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

/* =================================
   CAGR Calculator
================================= */

function calculateCAGR() {

    const start = getNumber("cagrStart");
    const end = getNumber("cagrEnd");
    const years = getNumber("cagrYears");

    if (start <= 0 || end <= 0 || years <= 0) {
        document.getElementById("cagrResult").innerText = "Enter valid values.";
        return;
    }

    const cagr = (Math.pow(end / start, 1 / years) - 1) * 100;

    document.getElementById("cagrResult").innerText =
        "CAGR: " + cagr.toFixed(2) + "%";
}

/* =================================
   Percentage Calculator
================================= */

function calculatePercentage() {

    const value = getNumber("percentValue");
    const total = getNumber("percentTotal");

    if (total <= 0) {
        document.getElementById("percentageResult").innerText =
            "Total must be greater than zero.";
        return;
    }

    const percent = (value / total) * 100;

    document.getElementById("percentageResult").innerText =
        percent.toFixed(2) + "%";
}

/* =================================
   Age Calculator
================================= */

function calculateAge() {

    const dobInput = document.getElementById("dob")?.value;

    if (!dobInput) {
        document.getElementById("ageResult").innerText = "Select valid date.";
        return;
    }

    const dob = new Date(dobInput);
    const today = new Date();

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
        `${years} years, ${months} months, ${days} days`;
}

/* =================================
   Dark Mode Toggle (Improved)
================================= */

document.addEventListener("DOMContentLoaded", function () {

    const toggleBtn = document.getElementById("themeToggle");
    if (!toggleBtn) return;

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        toggleBtn.textContent = "☀️";
    }

    toggleBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");
        toggleBtn.textContent = isDark ? "☀️" : "🌙";

        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
});

/* =================================
   Tool Search
================================= */

function filterTools() {

    const input = document.getElementById("toolSearch")?.value.toLowerCase() || "";
    const cards = document.querySelectorAll(".tool-card");

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(input) ? "" : "none";
    });
}

/* =================================
   Animated Counter
================================= */

window.addEventListener("load", function () {

    const counter = document.getElementById("toolCount");
    if (!counter) return;

    let count = 0;
    const target = 6;

    const interval = setInterval(() => {
        if (count < target) {
            count++;
            counter.textContent = count;
        } else {
            clearInterval(interval);
        }
    }, 120);
});
