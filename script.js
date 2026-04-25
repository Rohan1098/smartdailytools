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
   Smart Number Formatter (Alpha++)
   - shows exact if clean
   - max 3 decimals if long
================================= */
function smartFormat(num) {
  if (!isFinite(num)) return "0";

  // check if number is clean (terminating nicely)
  const rounded = Number(num.toFixed(3));

  // if rounding doesn't change value much → show clean
  if (Math.abs(num - rounded) < 0.000001) {
    return rounded.toString();
  }

  // otherwise limit to 3 decimals
  return num.toFixed(3);
}
function switchPercentMode() {
  const mode = document.getElementById("percentMode").value;

  // hide all modes
  document.querySelectorAll(".percent-mode").forEach(el => {
    el.style.display = "none";
  });

  // show selected mode
  document.getElementById("mode-" + mode).style.display = "block";

  // ✅ CLEAR ALL INPUTS (important fix)
  document
    .querySelectorAll(".percent-mode input")
    .forEach(input => (input.value = ""));

  // ✅ CLEAR RESULT
  const resultBox = document.getElementById("percentageResult");
  if (resultBox) resultBox.innerHTML = "";

  // ✅ RESET AI INSIGHT
  resetAIInsight();
}
function resetAIInsight() {
  const aiBox = document.getElementById("aiInsight");
  const aiText = document.getElementById("aiInsightText");

  if (aiBox) aiBox.classList.add("hidden");
  if (aiText) aiText.innerHTML = "";
}
/* =================================
   GA Event Tracking Helper
================================= */
function trackCalculatorEvent(calculatorName, action, label = '') {
  if (window.gtag) {
    gtag('event', action, {
      event_category: 'Calculator',
      event_label: label || calculatorName
    });
  }
}
document.querySelectorAll('.tool-card').forEach(card => {
  card.addEventListener('click', function () {
    const name = this.textContent.trim();
    trackCalculatorEvent(name, 'Open');
  });
});
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
   trackCalculatorEvent('SIP Calculator', 'Calculate', 
  `Amount: ${getNumber("sipAmount")}, Rate: ${getNumber("sipRate")}, Years: ${getNumber("sipYears")}`);
  // ===== AI Insight: SIP =====

const yearsToDouble = (72 / annualRate).toFixed(1);

showAIInsight(
  `💡 At <b>${annualRate}%</b> return, your investment may double in approximately <b>${yearsToDouble} years</b>.`
);
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

  // ✅ Show result
  showResult(resultBox, "Monthly EMI: ₹" + emi.toFixed(2));

  // ✅ GA tracking (optimized)
  trackCalculatorEvent(
    'EMI Calculator',
    'Calculate',
    `Principal: ${P}, Rate: ${annualRate}, Years: ${years}`
  );

  // ===== AI Insight: EMI =====
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  showAIInsight(
    `💡 You will pay approximately <b>₹${Math.round(totalInterest).toLocaleString()}</b> as interest over the loan tenure.`
  );
}

//  =================================
//    GST Calculator
// ================================= 
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

  // ✅ Show result
  showResult(
    resultBox,
    `GST: ₹${gst.toFixed(2)} | Total: ₹${total.toFixed(2)}`
  );

  // ✅ GA tracking (optimized)
  trackCalculatorEvent(
    'GST Calculator',
    'Calculate',
    `Amount: ${amount}, Rate: ${rate}`
  );

  // ===== AI Insight: GST =====
  showAIInsight(
    `💡 At <b>${rate}% GST</b>, you pay <b>₹${gst.toLocaleString()}</b> tax on ₹${amount.toLocaleString()}.`
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
   trackCalculatorEvent('CAGR Calculator', 'Calculate', 
  `Start: ${getNumber("cagrStart")}, End: ${getNumber("cagrEnd")}, Years: ${getNumber("cagrYears")}`);
}
/* =================================
   Percentage Calculator (ALPHA++)
================================= */
function calculatePercentage() {
  resetAIInsight();
  const mode = document.getElementById("percentMode").value;
  const resultBox = document.getElementById("percentageResult");

  // smart formatter → max 3 decimals only if needed
  const formatNumber = (num) => {
    return Number.isInteger(num) ? num : parseFloat(num.toFixed(3));
  };

  // ================= BASIC =================
  if (mode === "basic") {
    const part = parseFloat(document.getElementById("percentValue").value);
    const total = parseFloat(document.getElementById("percentTotal").value);

    if (isNaN(part) || isNaN(total) || total === 0) {
      showResult(resultBox, "Please enter valid values.");
      return;
    }

    const percent = (part / total) * 100;

    showResult(
      resultBox,
      `📊 Percentage: ${formatNumber(percent)}%`
    );

    trackCalculatorEvent(
      "Percentage Calculator",
      "Basic",
      `Part: ${part}, Total: ${total}`
    );

    showAIInsight(
      `💡 <b>${part.toLocaleString()}</b> is <b>${formatNumber(percent)}%</b> of <b>${total.toLocaleString()}</b>.`
    );
  }

  // ================= REVERSE =================
  else if (mode === "reverse") {
    const finalValue = parseFloat(document.getElementById("finalValue").value);
    const percent = parseFloat(document.getElementById("revPercent").value);
    const type = document.getElementById("revType").value;

    if (isNaN(finalValue) || isNaN(percent)) {
      showResult(resultBox, "Please enter valid values.");
      return;
    }

    const original =
      type === "increase"
        ? finalValue / (1 + percent / 100)
        : finalValue / (1 - percent / 100);

    showResult(
      resultBox,
      `🧠 Original Value: ${formatNumber(original)}`
    );

    trackCalculatorEvent(
      "Percentage Calculator",
      "Reverse",
      `Final: ${finalValue}, Percent: ${percent}`
    );

    showAIInsight(
      `💡 Original value before ${percent}% ${type} was approximately <b>${formatNumber(original)}</b>.`
    );
  }

  // ================= CHANGE =================
  else if (mode === "change") {
    const oldValue = parseFloat(document.getElementById("oldValue").value);
    const newValue = parseFloat(document.getElementById("newValue").value);

    if (isNaN(oldValue) || isNaN(newValue) || oldValue === 0) {
      showResult(resultBox, "Please enter valid values.");
      return;
    }

    const percentChange = ((newValue - oldValue) / oldValue) * 100;

    if (percentChange > 0) {
      showResult(
        resultBox,
        `🔼 Increase: ${formatNumber(percentChange)}%`
      );
    } else if (percentChange < 0) {
      showResult(
        resultBox,
        `🔽 Decrease: ${formatNumber(Math.abs(percentChange))}%`
      );
    } else {
      showResult(resultBox, "No change.");
    }

    trackCalculatorEvent(
      "Percentage Calculator",
      "Change",
      `Old: ${oldValue}, New: ${newValue}`
    );
  }

  // ================= PROFIT LOSS =================
  else if (mode === "pl") {
    const costPrice = parseFloat(document.getElementById("costPrice").value);
    const sellingPrice = parseFloat(document.getElementById("sellingPrice").value);

    if (isNaN(costPrice) || isNaN(sellingPrice) || costPrice === 0) {
      showResult(resultBox, "Please enter valid values.");
      return;
    }

    const diff = sellingPrice - costPrice;
    const percent = (Math.abs(diff) / costPrice) * 100;

    if (diff > 0) {
      showResult(
        resultBox,
        `📈 Profit: ₹${formatNumber(diff)} (${formatNumber(percent)}%)`
      );
    } else if (diff < 0) {
      showResult(
        resultBox,
        `📉 Loss: ₹${formatNumber(Math.abs(diff))} (${formatNumber(percent)}%)`
      );
    } else {
      showResult(resultBox, "No Profit, No Loss.");
    }

    trackCalculatorEvent(
      "Percentage Calculator",
      "ProfitLoss",
      `CP: ${costPrice}, SP: ${sellingPrice}`
    );
  }
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
   trackCalculatorEvent('Age Calculator', 'Calculate', `DOB: ${document.getElementById("dob")?.value}`);
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
   trackCalculatorEvent('Income Tax Calculator', 'Calculate', 
  `Income: ${getNumber("income")}, Regime: ${document.getElementById("taxRegime")?.value}`);
  
 // ===== AI Insight: TAX =====

const effectiveRate = income > 0 ? (tax / income) * 100 : 0;

let insightMsg = "";

if (tax === 0) {
  insightMsg = "🎉 Your tax liability is zero under the selected regime.";
} else if (effectiveRate < 5) {
  insightMsg = "💡 Your effective tax rate is very low — good tax efficiency.";
} else if (effectiveRate < 15) {
  insightMsg = "💡 Your tax rate is moderate. Consider maximizing deductions.";
} else {
  insightMsg = "⚠️ Your tax outgo is high. Review deductions and regime choice.";
}

showAIInsight(
  `${insightMsg}<br><br>
   📊 Effective Tax Rate: <b>${effectiveRate.toFixed(2)}%</b>`
);
}

function calculateSalaryTax(){

const ctc = parseFloat(document.getElementById("ctcAmount").value);
const regime = document.getElementById("taxRegime").value;
const resultBox = document.getElementById("taxResult");

if(isNaN(ctc) || ctc <= 0){
resultBox.innerHTML = "Please enter a valid CTC.";
return;
}

/* PF deduction */

const pf = ctc * 0.048;

/* deductions */

let deductions = 0;
const taxpayer = document.getElementById("taxpayerType").value;

if(regime === "new"){

if(taxpayer === "salary"){
deductions = 75000;
}else{
deductions = 0;
}

}

if(regime === "old"){

const oldType = document.getElementById("oldRegimeType").value;

if(taxpayer === "salary"){
deductions = 50000;
}else{
deductions = 0;
}

if(oldType === "max"){
deductions += 150000; // 80C
deductions += 25000;  // 80D
}

}

/* taxable income */

let taxable = ctc - pf - deductions;

if(taxable < 0) taxable = 0;

let tax = 0;

/* NEW REGIME */

if(regime === "new"){

let remaining = taxable;

if(remaining > 2400000){
tax += (remaining - 2400000) * 0.30;
remaining = 2400000;
}

if(remaining > 2000000){
tax += (remaining - 2000000) * 0.25;
remaining = 2000000;
}

if(remaining > 1600000){
tax += (remaining - 1600000) * 0.20;
remaining = 1600000;
}

if(remaining > 1200000){
tax += (remaining - 1200000) * 0.15;
remaining = 1200000;
}

if(remaining > 800000){
tax += (remaining - 800000) * 0.10;
remaining = 800000;
}

if(remaining > 400000){
tax += (remaining - 400000) * 0.05;
}

/* rebate */

if(taxable <= 1200000){
tax = 0;
}

}

/* OLD REGIME */

if(regime === "old"){

let remaining = taxable;

if(remaining > 1000000){
tax += (remaining - 1000000) * 0.30;
remaining = 1000000;
}

if(remaining > 500000){
tax += (remaining - 500000) * 0.20;
remaining = 500000;
}

if(remaining > 250000){
tax += (remaining - 250000) * 0.05;
}

/* rebate */

if(taxable <= 500000){
tax = 0;
}

}

/* cess */

tax = tax * 1.04;

/* salary calculation */

const annualTakeHome = ctc - pf - tax;
const monthlyTakeHome = annualTakeHome / 12;

resultBox.innerHTML = `

<h3>Salary Breakdown</h3>

<p><strong>Taxable Income:</strong> ₹${Math.round(taxable).toLocaleString()}</p>

<p><strong>PF Deduction:</strong> ₹${Math.round(pf).toLocaleString()}</p>

<p><strong>Total Income Tax:</strong> ₹${Math.round(tax).toLocaleString()}</p>

<p><strong>Annual Take Home:</strong> ₹${Math.round(annualTakeHome).toLocaleString()}</p>

<p><strong>Monthly In-Hand Salary:</strong> ₹${Math.round(monthlyTakeHome).toLocaleString()}</p>

`;

resultBox.classList.add("show","success");

}

// HOME LOAN ELIGIBILTY CALCULATOR
function calculateUltraHomeLoan() {

const result = document.getElementById("result");

try {

let income1 = parseFloat(document.getElementById("income1").value) || 0;
let income2 = parseFloat(document.getElementById("income2").value) || 0;
let emi = parseFloat(document.getElementById("emi").value) || 0;
let rate = parseFloat(document.getElementById("rate").value) || 0;
let tenure = parseFloat(document.getElementById("tenure").value) || 0;

if (income1 <= 0 || rate <= 0 || tenure <= 0) {
result.innerHTML = "⚠️ Please fill required fields correctly.";
return;
}

let income = income1 + income2;

// FOIR = 45%
let maxEMI = income * 0.45 - emi;

if (maxEMI <= 0) {
result.innerHTML = "❌ Existing obligations too high for loan approval.";
return;
}

// Loan calculation
let r = rate / 12 / 100;
let n = tenure * 12;

let loan =
maxEMI *
((Math.pow(1 + r, n) - 1) /
(r * Math.pow(1 + r, n)));

// Property estimate
let property = loan / 0.8;
let down = property - loan;

// Eligibility score
let score = Math.min(100, Math.round((maxEMI / income) * 200));

let status = "🟡 Moderate";
if (score > 80) status = "🟢 Excellent";
else if (score < 50) status = "🔴 Weak";

// Tenure comparison table
let table = "";

[10,15,20,25,30].forEach(t => {

let m = t * 12;

let l =
maxEMI *
((Math.pow(1 + r, m) - 1) /
(r * Math.pow(1 + r, m)));

table += `
<tr>
<td>${t} yrs</td>
<td>₹ ${Math.round(l).toLocaleString("en-IN")}</td>
</tr>`;
});

result.innerHTML = `

<div class="tool-card fade-in-up"
     style="margin-top:20px; display:block;">

<h2>${status} Eligibility (${score}/100)</h2>

<p><strong>Total Income:</strong> ₹ ${income.toLocaleString("en-IN")}</p>
<p><strong>Max EMI Allowed:</strong> ₹ ${Math.round(maxEMI).toLocaleString("en-IN")}</p>

<hr>

<h2>🏦 Eligible Loan Amount</h2>
<h1>₹ ${Math.round(loan).toLocaleString("en-IN")}</h1>

<p><strong>Property You Can Afford:</strong> ₹ ${Math.round(property).toLocaleString("en-IN")}</p>
<p><strong>Minimum Down Payment:</strong> ₹ ${Math.round(down).toLocaleString("en-IN")}</p>

<hr>

<h3>📊 Loan by Tenure</h3>

<table style="width:100%;border-collapse:collapse;">
<tr><th>Tenure</th><th>Loan Amount</th></tr>
${table}
</table>

<hr>

<h3>💡 Planning Tools</h3>

<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:12px;">

<a class="primary-btn" href="emi-calculator.html">🧮 EMI Calculator</a>

<a class="primary-btn" href="fd-calculator.html">🏦 FD Calculator</a>

<a class="primary-btn" href="cagr-calculator.html">📈 Investment Planner</a>

</div>

</div>
<hr>

<p style="margin-top:15px; font-size:14px;">
📘 Want to understand these numbers?
<a href="home-loan-eligibility-calculator-guide.html">
Read the full Home Loan Eligibility Guide →
</a>
</p>

`;
result.style.display = "block";
result.scrollIntoView({ behavior: "smooth" });
} catch (error) {
result.innerHTML = "⚠️ Error calculating. Please refresh.";
console.error(error);
}

}

/* =================================
   FD Calculator
================================= */
function calculateFD() {

  resetAIInsight();

  const P = getNumber("fdAmount");
  const rate = getNumber("fdRate");
  const years = getNumber("fdYears");
  const n = getNumber("fdFrequency");

  const resultBox = document.getElementById("fdResult");

  if (P <= 0 || rate <= 0 || years <= 0 || n <= 0) {
    showResult(resultBox, "Please fill all fields correctly.");
    return;
  }

  const r = rate / 100;

  // Compound Interest Formula
  const maturity = P * Math.pow((1 + r / n), n * years);
  const interest = maturity - P;

  // Show result
  resultBox.innerHTML = `
    <div><strong>Invested Amount:</strong> ₹${Math.round(P).toLocaleString()}</div>
    <div><strong>Total Interest:</strong> ₹${Math.round(interest).toLocaleString()}</div>
    <div class="takehome-highlight">Maturity Amount: ₹${Math.round(maturity).toLocaleString()}</div>
  `;

  resultBox.classList.add("show", "success");

  trackCalculatorEvent(
    'FD Calculator',
    'Calculate',
    `Amount: ${P}, Rate: ${rate}, Years: ${years}`
  );

  // ===== AI Insight =====

  const yearlyInterest = interest / years;

  showAIInsight(
    `💡 Your FD generates approximately <b>₹${Math.round(yearlyInterest).toLocaleString()}</b> interest per year.`
  );
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
  const target = document.querySelectorAll(".tool-card").length;

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

/* =========================
   AI INSIGHT ENGINE
========================= */

function showAIInsight(message) {
  const box = document.getElementById("aiInsight");
  const text = document.getElementById("aiInsightText");

  if (!box || !text) return;

  text.innerHTML = message;
  box.classList.remove("hidden");
}

/* Hide when needed */
function hideAIInsight() {
  const box = document.getElementById("aiInsight");
  if (box) box.classList.add("hidden");
}

function toggleOldRegimeOptions(){

const regime=document.getElementById("taxRegime").value
const section=document.getElementById("oldRegimeSection")

if(regime==="old"){
section.classList.remove("hidden")
}
else{
section.classList.add("hidden")
}

}

function toggleInvestmentInput(){

const type=document.getElementById("oldRegimeType").value
const box=document.getElementById("investmentBox")

if(type==="custom"){
box.classList.remove("hidden")
}
else{
box.classList.add("hidden")
}

}












