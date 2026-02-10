const penaltiesDiv = document.getElementById("penalties");
const addBtn = document.getElementById("add_btn");
const clearBtn = document.getElementById("clear_btn");
const form = document.getElementById("main_form");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copy_btn");
const totalEl = document.getElementById("total");

function createRow() {

    const row = document.createElement("div");
    row.className = "penalty-row";

    row.innerHTML = `
        <input type="text" class="penalty" placeholder="Penalty">
        <input type="number" class="amount" placeholder="Fine" min="0">
        <button type="button" class="remove-btn">✖</button>
        <button type="button" class="copy-row">📋</button>
    `;

    penaltiesDiv.appendChild(row);
}

function updateTotal() {

    let total = 0;

    document.querySelectorAll(".amount").forEach(i => {
        total += Number(i.value) || 0;
    });

    totalEl.textContent = total.toLocaleString("en-US");
}

function resetAll() {

    form.reset();

    penaltiesDiv.innerHTML = "";

    createRow();

    output.textContent = "";

    totalEl.textContent = "0";
}

createRow();

addBtn.addEventListener("click", () => {
    createRow();
});

clearBtn.addEventListener("click", () => {
    resetAll();
});

penaltiesDiv.addEventListener("click", e => {

    const row = e.target.closest(".penalty-row");

    if (!row) return;

    if (e.target.classList.contains("remove-btn")) {
        row.remove();
        updateTotal();
    }

    if (e.target.classList.contains("copy-row")) {

        const penalty = row.querySelector(".penalty").value.trim();
        const amount = row.querySelector(".amount").value;

        if (!penalty) return;

        const plate =
            document.getElementById("license_plate").value.trim().toUpperCase() || "N/A";

        const fine = amount
            ? `$${Number(amount).toLocaleString("en-US")}`
            : "$0";

        const text = `${plate} - ${penalty} (${fine})`;

        navigator.clipboard.writeText(text);

        e.target.textContent = "✓";

        setTimeout(() => {
            e.target.textContent = "📋";
        }, 1000);
    }
});

document.addEventListener("input", e => {

    if (e.target.classList.contains("amount")) {
        updateTotal();
    }
});

form.addEventListener("submit", e => {

    e.preventDefault();

    const name =
        document.getElementById("suspect_name").value.trim();

    const plate =
        document.getElementById("license_plate").value.trim().toUpperCase() || "N/A";

    let reasons = [];
    let fines = [];

    document.querySelectorAll(".penalty-row").forEach((row, i) => {

        const p = row.querySelector(".penalty").value.trim();
        const a = row.querySelector(".amount").value;

        if (!p) return;

        const fine = a
            ? `$${Number(a).toLocaleString("en-US")}`
            : "$0";

        reasons.push(`${i + 1}. ${plate} - ${p}`);
        fines.push(fine);
    });

    let text = "";

    text += `Owner Name: ${name}\n`;
    text += `License Plate: ${plate}\n\n`;
    text += `Reason:\n`;
    text += `${reasons.join("\n")}\n\n`;
    text += `Amount of Fine: ${fines.join(" // ")}\n`;
    text += `Total: $${totalEl.textContent}\n\n`;
    text += `Proof:\n`;

    output.textContent = text;
});

copyBtn.addEventListener("click", () => {

    if (!output.textContent.trim()) return;

    navigator.clipboard.writeText(output.textContent);

    copyBtn.textContent = "Copied ✓";

    setTimeout(() => {
        copyBtn.textContent = "Copy";
    }, 1500);
});