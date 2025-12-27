const penaltiesDiv = document.getElementById("penalties");

/* Add new penalty row */
penaltiesDiv.addEventListener("click", (e) => {

    /* Add row */
    if (e.target.classList.contains("add-btn")) {
        const row = document.createElement("div");
        row.className = "penalty-row";
        row.innerHTML = `
            <input type="text" class="penalty" placeholder="Penalty">
            <input type="number" class="amount" placeholder="Fine">
            <button type="button" class="add-btn">+</button>
            <button type="button" class="copy-row">📋</button>
        `;
        penaltiesDiv.appendChild(row);
    }

    /* Copy single row */
    if (e.target.classList.contains("copy-row")) {
        const row = e.target.closest(".penalty-row");
        const penalty = row.querySelector(".penalty").value.trim();
        const amount = row.querySelector(".amount").value;

        if (!penalty) return;

        const fine = amount
            ? `$${Number(amount).toLocaleString("en-US")}`
            : "$0";

        const licensePlate =
            document.getElementById("license_plate").value.trim().toUpperCase() || "N/A";

        const textToCopy = `${licensePlate} - ${penalty} (${fine})`;

        navigator.clipboard.writeText(textToCopy);
        e.target.textContent = "✓";
        setTimeout(() => e.target.textContent = "📋", 1000);
    }
});

/* Form submit */
document.getElementById("main_form").addEventListener("submit", (event) => {
    event.preventDefault();

    const suspect_name = document.getElementById("suspect_name").value.trim();
    const license_plate =
        document.getElementById("license_plate").value.trim().toUpperCase() || "N/A";

    const penalties = document.querySelectorAll(".penalty");
    const amounts = document.querySelectorAll(".amount");

    let reasons = [];
    let fineList = [];

    penalties.forEach((p, i) => {
        if (p.value.trim()) {
            const fine = amounts[i].value
                ? `$${Number(amounts[i].value).toLocaleString("en-US")}`
                : "$0";

            reasons.push(`${license_plate} - ${p.value.trim()}`);
            fineList.push(fine);
        }
    });

    const format = `
        Owner Name: ${suspect_name}
        License Plate: ${license_plate}
        Reason:
        ${reasons.join("\n")}
        Amount of Fine: ${fineList.join(" // ")}
        Proof:
    `;

    document.getElementById("output").innerText = format;
});

/* Copy full output */
document.getElementById("copy_btn").addEventListener("click", () => {
    const output = document.getElementById("output").innerText;
    if (!output.trim()) return;

    navigator.clipboard.writeText(output);
});
