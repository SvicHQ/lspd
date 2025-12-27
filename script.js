const penaltiesDiv = document.getElementById("penalties");

penaltiesDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-btn")) {
        const row = document.createElement("div");
        row.className = "penalty-row";
        row.innerHTML = `
            <input type="text" class="penalty" placeholder="Penalty">
            <input type="number" class="amount" placeholder="Fine">
            <button type="button" class="add-btn">+</button>
        `;
        penaltiesDiv.appendChild(row);
    }
});

document.getElementById("main_form").addEventListener("submit", (event) => {
    event.preventDefault();

    const suspect_name = document.getElementById("suspect_name").value.trim();
    const license_plate_input = document.getElementById("license_plate").value.trim().toUpperCase();
    const license_plate = license_plate_input || "N/A";

    const penalties = document.querySelectorAll(".penalty");
    const amounts = document.querySelectorAll(".amount");

    let penaltyList = "";
    let fineList = [];

    penalties.forEach((p, i) => {
        if (p.value.trim()) {
            penaltyList += `- ${p.value.trim()}\n`;
            const amt = amounts[i].value
                ? `$${Number(amounts[i].value).toLocaleString("en-US")}`
                : "$0";
            fineList.push(amt);
        }
    });

    const format = `
        Owner Name: ${suspect_name}
        License Plate: ${license_plate}
        Reason:
        ${penaltyList}
        Amount of Fine: ${fineList.join(" // ")}
        Proof:
    `;

    document.getElementById("output").innerText = format;
});

document.getElementById("copy_btn").addEventListener("click", () => {
    const output = document.getElementById("output").innerText;
    const btn = document.getElementById("copy_btn");

    if (!output.trim()) {
        btn.textContent = "Nothing to copy!";
        setTimeout(() => btn.textContent = "Copy", 1500);
        return;
    }

    navigator.clipboard.writeText(output).then(() => {
        btn.textContent = "Copied ✓";
        setTimeout(() => btn.textContent = "Copy", 1500);
    });
});