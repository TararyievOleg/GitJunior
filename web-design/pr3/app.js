"use strict";
const get = id => document.getElementById(id);
function numberValue(id) { const field = get(id); return field.value !== "" && field.validity.valid ? field.valueAsNumber : NaN; }
function show(id, value, digits = 2) { get(id).value = Number.isFinite(value) ? String(Number(value.toFixed(digits))) : "—"; }
function updateCalculations() {
 if (!get("weight")) return;
 const weight = numberValue("weight"); show("pounds", weight * 2.2046226218); show("centners", weight / 100, 3);
 show("sum", numberValue("a") + numberValue("b"), 8);
 show("range-result", numberValue("range"), 0);
 const base = numberValue("hours") * numberValue("rate"); show("base", base); show("total", base * 1.30);
}
for (const form of document.querySelectorAll("form")) {
 form.addEventListener("submit", event => {
  event.preventDefault();
  const result = form.querySelector(".status");
  if (result) result.textContent = "Перевірку пройдено. Це локальна демонстрація: дані не надсилалися й не зберігалися.";
 });
 form.addEventListener("reset", () => { const result = form.querySelector(".status"); if (result) result.textContent = ""; setTimeout(updateSurvey, 0); });
}
if (get("password")) {
 const validate = () => get("repeat").setCustomValidity(get("password").value === get("repeat").value ? "" : "Паролі мають збігатися.");
 get("password").addEventListener("input", validate); get("repeat").addEventListener("input", validate);
}
function updateSurvey() {
 if (!get("survey")) return;
 const required = [...get("survey").querySelectorAll("[required]")];
 const filled = required.filter(field => field.value.trim() && field.validity.valid).length;
 get("filled").max = required.length; get("filled").value = filled; get("filled-count").value = filled + " із " + required.length;
 get("rating-result").value = get("rating").value; get("satisfaction").value = get("rating").value;
}
document.addEventListener("input", () => { updateCalculations(); updateSurvey(); });
updateCalculations(); updateSurvey();
// Only one audio track plays at a time.
for (const player of document.querySelectorAll("audio")) player.addEventListener("play", () => {
 for (const other of document.querySelectorAll("audio")) if (other !== player) other.pause();
});
