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
   Result Animation Helper (Alpha)
================================= */
function showResult(resultBox, text) {
  if (!resultBox) return;

  resultBox.innerText = text;

  resultBox.classList.remove("show", "success");
  void resultBox.offsetWidth;
  resultBox.classList.add("show", "success");
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
  const monthly = getNumber("sipAmount");
  const annualRate = getNumber("sipRate");
  const years = getNumber("sipYears");
  const resultBox = document.getElementById("sipResult");

  if (monthly <= 0 || annualRate <= 0 || years <= 0) {
    showResult(resultBox, "Please fill all fields correctly.");
    return;
  }

  const r = annualRate / 12 / 100;
  const n = years * 12;

  const futureValue =
    monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

  showResult(resultBox, "Future Value: ₹" + futureValue.toFixed(2));
}

/* =================================
   EMI Calculator
================================= */
function calculateEMI() {
  const P = getNumber("loanAmount");
  const annualRate = getNumber("loanRate");
  const years = getNumber("loanYears");
  const resultBox = document.getElementById("emiResult");

  if (P <= 0 || annualRate <= 0 || years <= 0) {
    showResult(resultBox, "Please fill all fields correctly.");
    return;
  }

  const r = annualRate / 12 / 100;
  const n = years * 12;

  const emi =
    (P * r * Math.pow(1 + r, n)) /
    (Math.pow(1 + r, n) - 1);

  showResult(resultBox, "Monthly EMI: ₹" + emi.toFixed(2));
}

/* =================================
   GST Calculator
================================= */
function calculateGST() {
  const amount = getNumber("gstAmount");
  const rate = getNumber("gstRate");
  const resultBox = document.getElementById("gstResult");

  if (amount <= 0 || rate <= 0) {
    showResult(resultBox, "Please fill all fields correctly.");
    return;
  }

  const gst = (amount * rate) / 100;
  const total = amount + gst;

  showResult(
    resultBox,
    `GST: ₹${gst.toFixed(2)} | Total: ₹${total.toFixed(2)}`
  );
}

/* =================================
   CAGR Calculator
================================= */
function calculateCAGR() {
  const initial = getNumber("cagrStart");
  const finalVal = getNumber("cagrEnd");
  const years = getNumber("cagrYears");
  const resultBox = document.getElementById("cagrResult");

  if (initial <= 0 || finalVal <= 0 || years <= 0) {
    showResult(resultBox, "Please fill all fields correctly.");
    return;
  }

  const cagr = (Math.pow(finalVal / initial, 1 / years) - 1) * 100;

  showResult(resultBox, `📈 CAGR: ${cagr.toFixed(2)}% per year`);
}
/* =================================
   Percentage Calculator (FIXED)
================================= */
function calculatePercentage() {
  const part = getNumber("percentPart");
  const total = getNumber("percentTotal");
  const resultBox = document.getElementById("percentResult");

  // ✅ strong validation
  if (total === 0) {
    showResult(resultBox, "Total cannot be zero.");
    return;
  }

  if (part < 0 || total < 0) {
    showResult(resultBox, "Please enter valid positive numbers.");
    return;
  }

  const percent = (part / total) * 100;

  // ✅ supports decimals properly
  showResult(resultBox, `📊 Percentage: ${percent.toFixed(2)}%`);
}

/* =================================
   Age Calculator (ALPHA UPGRADE)
   ✅ works for < 1 year
================================= */
function calculateAge() {
  const dob = document.getElementById("dob")?.value;
  const resultBox = document.getElementById("ageResult");

  if (!dob) {
    showResult(resultBox, "Please select your date of birth.");
    return;
  }

  const birthDate = new Date(dob);
  const today = new Date();

  if (birthDate > today) {
    showResult(resultBox, "DOB cannot be in the future.");
    return;
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    days += prevMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  showResult(
    resultBox,
    `Age: ${years} years, ${months} months, ${days} days`
  );
}

/* =================================
   Income Tax Calculator — ALPHA++
   FY 2025-26 / AY 2026-27
================================= */

function calculateIncomeTax() {
  const resultBox = document.getElementById("taxResult");
  if (!resultBox) {
    console.error("taxResult div not found");
    return;
  }

  let incomeEl = document.getElementById("income");
  let regimeEl = document.getElementById("taxRegime");
  let salariedEl = document.getElementById("isSalaried");

  if (!incomeEl || !regimeEl || !salariedEl) {
    resultBox.innerHTML = "⚠️ Missing input fields.";
    return;
  }

  let income = parseFloat(incomeEl.value) || 0;
  let regime = regimeEl.value;
  let isSalaried = salariedEl.checked;

  let taxableIncome = income;
  let tax = 0;

  // ===== NEW REGIME =====
  if (regime === "new") {

    if (isSalaried) taxableIncome -= 75000;
    if (taxableIncome < 0) taxableIncome = 0;

    if (taxableIncome <= 1200000) {
      tax = 0;
    } else {
      let remaining = taxableIncome;

      if (remaining > 2400000) {
        tax += (remaining - 2400000) * 0.30;
        remaining = 2400000;
      }
      if (remaining > 2000000) {
        tax += (remaining - 2000000) * 0.25;
        remaining = 2000000;
      }
      if (remaining > 1600000) {
        tax += (remaining - 1600000) * 0.20;
        remaining = 1600000;
      }
      if (remaining > 1200000) {
        tax += (remaining - 1200000) * 0.15;
        remaining = 1200000;
      }
      if (remaining > 800000) {
        tax += (remaining - 800000) * 0.10;
        remaining = 800000;
      }
      if (remaining > 400000) {
        tax += (remaining - 400000) * 0.05;
      }
    }

  } else {
    // ===== OLD REGIME =====

    if (isSalaried) taxableIncome -= 50000;

    let d80c = Math.min(parseFloat(document.getElementById("deduction80C")?.value) || 0, 150000);
    let d80d = parseFloat(document.getElementById("deduction80D")?.value) || 0;
    let homeInt = Math.min(parseFloat(document.getElementById("homeInterest")?.value) || 0, 200000);
    let hra = parseFloat(document.getElementById("hraLta")?.value) || 0;

    taxableIncome -= (d80c + d80d + homeInt + hra);
    if (taxableIncome < 0) taxableIncome = 0;

    if (taxableIncome <= 500000) {
      tax = 0;
    } else {
      let remaining = taxableIncome;

      if (remaining > 1000000) {
        tax += (remaining - 1000000) * 0.30;
        remaining = 1000000;
      }
      if (remaining > 500000) {
        tax += (remaining - 500000) * 0.20;
        remaining = 500000;
      }
      if (remaining > 250000) {
        tax += (remaining - 250000) * 0.05;
      }
    }
  }

  let monthly = (income - tax) / 12;

  resultBox.innerHTML = `
    <strong>Taxable Income:</strong> ₹${Math.round(taxableIncome).toLocaleString()}<br>
    <strong>Total Tax:</strong> ₹${Math.round(tax).toLocaleString()}<br>
    <strong>Monthly Take Home:</strong> ₹${Math.round(monthly).toLocaleString()}<br>
    <strong>Regime Used:</strong> ${regime === "new" ? "New Regime" : "Old Regime"}
  `;
}
/* =================================
   Dark Mode Toggle
================================= */
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("themeToggle");
  if (!toggleBtn) return;

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
  const input =
    document.getElementById("toolSearch")?.value.toLowerCase() || "";
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
  const target = 7;

  const interval = setInterval(() => {
    if (count < target) {
      count++;
      counter.textContent = count;
    } else {
      clearInterval(interval);
    }
  }, 120);
});

/* =================================
   Fade-in Observer (Alpha)
================================= */
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in-up");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach(el => {
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });
});












