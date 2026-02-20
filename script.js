// /* =================================
//    Helper Function
// ================================= */

// function getNumber(id) {
//     const el = document.getElementById(id);
//     if (!el) return 0;

//     const value = parseFloat(el.value);
//     return isNaN(value) ? 0 : value;
// }

// /* =================================
//    Smooth Scroll
// ================================= */

// function scrollToTools() {
//     const section = document.getElementById("tools");
//     if (section) {
//         section.scrollIntoView({ behavior: "smooth" });
//     }
// }

// /* =================================
//    SIP Calculator
// ================================= */

// function calculateSIP() {
//   const monthly = parseFloat(document.getElementById("sipAmount").value);
//   const annualRate = parseFloat(document.getElementById("sipRate").value);
//   const years = parseFloat(document.getElementById("sipYears").value);
//   const resultBox = document.getElementById("sipResult");

//   if (!monthly || !annualRate || !years) {
//     resultBox.innerText = "Please fill all fields.";
//     resultBox.classList.add("show");
//     return;
//   }

//   const r = annualRate / 12 / 100;
//   const n = years * 12;

//   const futureValue =
//     monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

//   resultBox.innerText =
//     "Future Value: ₹" + futureValue.toFixed(2);

//   resultBox.classList.remove("show", "success");
//   void resultBox.offsetWidth;
//   resultBox.classList.add("show", "success");
// }

// /* =================================
//    EMI Calculator
// ================================= */

// function calculateEMI() {
//   const P = parseFloat(document.getElementById("loanAmount").value);
//   const annualRate = parseFloat(document.getElementById("loanRate").value);
//   const years = parseFloat(document.getElementById("loanYears").value);
//   const resultBox = document.getElementById("emiResult");

//   if (!P || !annualRate || !years) {
//     resultBox.innerText = "Please fill all fields.";
//     resultBox.classList.add("show");
//     return;
//   }

//   const r = annualRate / 12 / 100;
//   const n = years * 12;

//   const emi = (P * r * Math.pow(1 + r, n)) /
//               (Math.pow(1 + r, n) - 1);

//   resultBox.innerText = "Monthly EMI: ₹" + emi.toFixed(2);

//   // 🔥 animation trigger
//   resultBox.classList.remove("show", "success");
//   void resultBox.offsetWidth; // force reflow
//   resultBox.classList.add("show", "success");
// }

// /* =================================
//    GST Calculator
// ================================= */

// function calculateGST() {
//   const amount = parseFloat(document.getElementById("gstAmount").value);
//   const rate = parseFloat(document.getElementById("gstRate").value);
//   const resultBox = document.getElementById("gstResult");

//   if (!amount || !rate) {
//     resultBox.innerText = "Please fill all fields.";
//     resultBox.classList.add("show");
//     return;
//   }

//   const gst = (amount * rate) / 100;
//   const total = amount + gst;

//   resultBox.innerText =
//     "GST: ₹" + gst.toFixed(2) + " | Total: ₹" + total.toFixed(2);

//   resultBox.classList.remove("show", "success");
//   void resultBox.offsetWidth;
//   resultBox.classList.add("show", "success");
// }
// /* =================================
//    CAGR Calculator
// ================================= */

// function calculateCAGR() {
//   const initial = parseFloat(document.getElementById("initialValue").value);
//   const finalVal = parseFloat(document.getElementById("finalValue").value);
//   const years = parseFloat(document.getElementById("cagrYears").value);
//   const resultBox = document.getElementById("cagrResult");

//   if (!initial || !finalVal || !years) {
//     resultBox.innerText = "Please fill all fields.";
//     resultBox.classList.add("show");
//     return;
//   }

//   const cagr = (Math.pow(finalVal / initial, 1 / years) - 1) * 100;

//   resultBox.innerText = "CAGR: " + cagr.toFixed(2) + "%";

//   resultBox.classList.remove("show", "success");
//   void resultBox.offsetWidth;
//   resultBox.classList.add("show", "success");
// }
// /* =================================
//    Percentage Calculator
// ================================= */

// function calculatePercentage() {
//   const part = parseFloat(document.getElementById("percentPart").value);
//   const total = parseFloat(document.getElementById("percentTotal").value);
//   const resultBox = document.getElementById("percentResult");

//   if (!part || !total) {
//     resultBox.innerText = "Please fill all fields.";
//     resultBox.classList.add("show");
//     return;
//   }

//   const percent = (part / total) * 100;

//   resultBox.innerText = "Percentage: " + percent.toFixed(2) + "%";

//   resultBox.classList.remove("show", "success");
//   void resultBox.offsetWidth;
//   resultBox.classList.add("show", "success");
// }

// /* =================================
//    Age Calculator
// ================================= */

// function calculateAge() {
//   const dob = document.getElementById("dob").value;
//   const resultBox = document.getElementById("ageResult");

//   if (!dob) {
//     resultBox.innerText = "Please select your date of birth.";
//     resultBox.classList.add("show");
//     return;
//   }

//   const birthDate = new Date(dob);
//   const today = new Date();

//   let age = today.getFullYear() - birthDate.getFullYear();
//   const m = today.getMonth() - birthDate.getMonth();

//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }

//   resultBox.innerText = "Your Age: " + age + " years";

//   resultBox.classList.remove("show", "success");
//   void resultBox.offsetWidth;
//   resultBox.classList.add("show", "success");
// }
// /* =================================
//    Dark Mode Toggle (Improved)
// ================================= */

// document.addEventListener("DOMContentLoaded", function () {

//     const toggleBtn = document.getElementById("themeToggle");
//     if (!toggleBtn) return;

//     // Load saved theme
//     const savedTheme = localStorage.getItem("theme");

//     if (savedTheme === "dark") {
//         document.body.classList.add("dark-mode");
//         toggleBtn.textContent = "☀️";
//     }

//     toggleBtn.addEventListener("click", function () {

//         document.body.classList.toggle("dark-mode");

//         const isDark = document.body.classList.contains("dark-mode");
//         toggleBtn.textContent = isDark ? "☀️" : "🌙";

//         localStorage.setItem("theme", isDark ? "dark" : "light");
//     });
// });

// /* =================================
//    Tool Search
// ================================= */

// function filterTools() {

//     const input = document.getElementById("toolSearch")?.value.toLowerCase() || "";
//     const cards = document.querySelectorAll(".tool-card");

//     cards.forEach(card => {
//         const text = card.textContent.toLowerCase();
//         card.style.display = text.includes(input) ? "" : "none";
//     });
// }

// /* =================================
//    Animated Counter
// ================================= */

// window.addEventListener("load", function () {

//     const counter = document.getElementById("toolCount");
//     if (!counter) return;

//     let count = 0;
//     const target = 6;

//     const interval = setInterval(() => {
//         if (count < target) {
//             count++;
//             counter.textContent = count;
//         } else {
//             clearInterval(interval);
//         }
//     }, 120);
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const elements = document.querySelectorAll(".fade-in-up");

//   const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.style.animationPlayState = "running";
//       }
//     });
//   }, { threshold: 0.15 });

//   elements.forEach(el => {
//     el.style.animationPlayState = "paused";
//     observer.observe(el);
//   });
// });
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
  const initial = getNumber("initialValue");
  const finalVal = getNumber("finalValue");
  const years = getNumber("cagrYears");
  const resultBox = document.getElementById("cagrResult");

  if (initial <= 0 || finalVal <= 0 || years <= 0) {
    showResult(resultBox, "Please fill all fields correctly.");
    return;
  }

  const cagr = (Math.pow(finalVal / initial, 1 / years) - 1) * 100;

  showResult(resultBox, "CAGR: " + cagr.toFixed(2) + "%");
}

/* =================================
   Percentage Calculator (FIXED)
================================= */
function calculatePercentage() {
  // 🔥 supports BOTH possible IDs safely
  const part =
    getNumber("percentPart") || getNumber("percentValue");
  const total = getNumber("percentTotal");
  const resultBox = document.getElementById("percentageResult") ||
                    document.getElementById("percentResult");

  if (total <= 0) {
    showResult(resultBox, "Total must be greater than 0.");
    return;
  }

  const percent = (part / total) * 100;

  showResult(resultBox, "Percentage: " + percent.toFixed(2) + "%");
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
