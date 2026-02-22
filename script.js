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

  const income = parseFloat(document.getElementById("income")?.value) || 0;
  const regime = document.getElementById("taxRegime")?.value || "new";
  const isSalaried = document.getElementById("isSalaried")?.checked;

  const resultBox = document.getElementById("taxResult");
  const breakdownBox = document.getElementById("exemptionBreakdown");

  if (!resultBox) return;

  let taxableIncome = income;
  let tax = 0;

  // ================= NEW REGIME =================
  if (regime === "new") {

    // standard deduction
    if (isSalaried) taxableIncome -= 75000;
    if (taxableIncome < 0) taxableIncome = 0;

    // rebate logic (₹12L taxable -> zero tax)
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

    // hide old regime breakdown
    if (breakdownBox) breakdownBox.style.display = "none";
  }

  // ================= OLD REGIME =================
  else {

    const standardDeduction = isSalaried ? 50000 : 0;
    taxableIncome -= standardDeduction;

    const input80c = parseFloat(document.getElementById("deduction80C")?.value) || 0;
    const d80c = Math.min(input80c, 150000);

    const d80d = parseFloat(document.getElementById("deduction80D")?.value) || 0;

    const homeInput = parseFloat(document.getElementById("homeInterest")?.value) || 0;
    const homeInt = Math.min(homeInput, 200000);

    const hra = parseFloat(document.getElementById("hraLta")?.value) || 0;

    const totalExemptions = standardDeduction + d80c + d80d + homeInt + hra;

    taxableIncome -= (d80c + d80d + homeInt + hra);
    if (taxableIncome < 0) taxableIncome = 0;

    // rebate under 5L
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

    // ⭐ EXEMPTION BREAKDOWN ⭐
    if (breakdownBox) {
      breakdownBox.style.display = "block";
      breakdownBox.innerHTML = `
        <h2>Old Regime Exemption Breakdown</h2>
        <p><strong>Standard Deduction:</strong> ₹${standardDeduction.toLocaleString()}</p>
        <p><strong>Section 80C Used:</strong> ₹${Math.round(d80c).toLocaleString()}</p>
        <p><strong>Section 80D:</strong> ₹${Math.round(d80d).toLocaleString()}</p>
        <p><strong>Home Loan Interest:</strong> ₹${Math.round(homeInt).toLocaleString()}</p>
        <p><strong>HRA/LTA:</strong> ₹${Math.round(hra).toLocaleString()}</p>
        <hr>
        <p><strong>Total Exemptions:</strong> ₹${Math.round(totalExemptions).toLocaleString()}</p>
      `;
    }
  }

  const monthly = (income - tax) / 12;

  // ✅ RESULT OUTPUT (CODE ALPHA SAFE)
  resultBox.innerHTML = `
    <strong>Taxable Income:</strong> ₹${Math.round(taxableIncome).toLocaleString()}<br>
    <strong>Total Tax:</strong> ₹${Math.round(tax).toLocaleString()}<br>
    <strong>Monthly Take Home:</strong> ₹${Math.round(monthly).toLocaleString()}<br>
    <strong>Regime Used:</strong> ${regime === "new" ? "New Regime" : "Old Regime"}
  `;

  // ⭐⭐⭐ THIS MAKES RESULT VISIBLE ⭐⭐⭐
  resultBox.classList.add("show", "success");
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
// ===== AI BLOG GENERATOR =====
const blogBtn = document.getElementById("generateBlog");

if (blogBtn) {
  blogBtn.addEventListener("click", async () => {
    const topicEl = document.getElementById("blogTopic");
    const resultBox = document.getElementById("blogResult");
    const loader = document.getElementById("blogLoading");

    const topic = topicEl.value.trim();

    if (!topic) {
      alert("Please enter a topic");
      return;
    }

    loader.classList.remove("hidden");
    resultBox.classList.add("hidden");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_OPENAI_KEY",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `Write a SEO optimized blog post about: ${topic}`,
            },
          ],
        }),
      });

      const data = await res.json();
      resultBox.textContent =
        data?.choices?.[0]?.message?.content || "No response received.";
    } catch (err) {
      resultBox.textContent = "⚠️ Error generating blog.";
    }

    loader.classList.add("hidden");
    resultBox.classList.remove("hidden");
  });
}
// ===== AI ASSISTANT =====

const aiToggle = document.getElementById("aiToggle");
const aiChatBox = document.getElementById("aiChatBox");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

aiToggle?.addEventListener("click", () => {
  aiChatBox.classList.toggle("hidden");
});

chatInput?.addEventListener("keypress", (e) => {
  if (e.key !== "Enter") return;

  const text = chatInput.value.trim();
  if (!text) return;

  chatMessages.innerHTML += `<div><b>You:</b> ${text}</div>`;

  let reply = "I can help you use SmartDailyTools calculators.";

  if (text.toLowerCase().includes("sip"))
    reply = "👉 Try our SIP Calculator for investment planning.";

  if (text.toLowerCase().includes("gst"))
    reply = "👉 Use the GST Calculator to compute tax instantly.";

  chatMessages.innerHTML += `<div><b>AI:</b> ${reply}</div>`;

  chatInput.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;
});














