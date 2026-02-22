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

/* ================================
   Income Tax Calculator
================================ */

// safe regime listener (works only if element exists)
document.addEventListener("DOMContentLoaded", function () {
  const regimeEl = document.getElementById("regime");

  if (regimeEl) {
    regimeEl.addEventListener("change", function () {
      const oldBox = document.getElementById("oldDeductions");
      if (oldBox) {
        oldBox.style.display = this.value === "old" ? "block" : "none";
      }
    });
  }
});

function calculateTax() {
  const incomeEl = document.getElementById("income");
  const regimeEl = document.getElementById("regime");
  const deductionEl = document.getElementById("deductions");
  const resultEl = document.getElementById("taxResult");

  if (!incomeEl || !regimeEl || !resultEl) return;

  let income = Number(incomeEl.value);
  let regime = regimeEl.value;

  // ✅ SAFE deductions handling
  let deductions = 0;
  if (deductionEl && deductionEl.value) {
    deductions = Number(deductionEl.value);
  }

  if (!income || income <= 0) {
    resultEl.innerHTML = "⚠️ Please enter valid income.";
    return;
  }

  let taxableIncome = income;
  let tax = 0;

  if (regime === "new") {
    taxableIncome = Math.max(0, income - 50000);

    if (taxableIncome <= 700000) {
      tax = 0;
    } else {
      tax = calculateNewTax(taxableIncome);
    }
  } else {
    taxableIncome = Math.max(0, income - deductions);
    tax = calculateOldTax(taxableIncome);
  }

  const monthly = Math.round((income - tax) / 12);

 const outputText =
  `Taxable Income: ₹${taxableIncome.toLocaleString()}\n` +
  `Total Tax: ₹${Math.round(tax).toLocaleString()}\n` +
  `Monthly Take Home: ₹${monthly.toLocaleString()}\n` +
  `Regime Used: ${regime === "new" ? "New Regime" : "Old Regime"}`;

showResult(resultEl, outputText);
}

// New regime slabs
function calculateNewTax(income) {
  let tax = 0;

  if (income > 1500000) {
    tax += (income - 1500000) * 0.30;
    income = 1500000;
  }
  if (income > 1200000) {
    tax += (income - 1200000) * 0.20;
    income = 1200000;
  }
  if (income > 900000) {
    tax += (income - 900000) * 0.15;
    income = 900000;
  }
  if (income > 600000) {
    tax += (income - 600000) * 0.10;
    income = 600000;
  }
  if (income > 300000) {
    tax += (income - 300000) * 0.05;
  }

  return tax;
}

// Old regime slabs
function calculateOldTax(income) {
  let tax = 0;

  if (income > 1000000) {
    tax += (income - 1000000) * 0.30;
    income = 1000000;
  }
  if (income > 500000) {
    tax += (income - 500000) * 0.20;
    income = 500000;
  }
  if (income > 250000) {
    tax += (income - 250000) * 0.05;
  }

  return tax;
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








