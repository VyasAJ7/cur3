function checkWhitelist() {
    var userWhitelist = document.getElementById("whitelist").value.split("\n").map(site => site.trim()).filter(Boolean);
    if (userWhitelist.length === 0) {
        alert("Please enter at least one domain.");
        return;
    }

    document.getElementById("loading").style.display = "block";

    fetch("https://script.google.com/macros/s/AKfycbxC-EVaYfzl-OC5mXLoLu-16MCgiyzEopI25VEBSo7xZKtdOU3PaXJ6ubHnvVBLtXc/exec", { // Replace with actual Web App URL
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userWhitelist })
    })
    .then(response => response.json())
    .then(results => {
        document.getElementById("loading").style.display = "none";
        document.getElementById("results").innerText = JSON.stringify(results, null, 2);
    })
    .catch(error => {
        document.getElementById("loading").style.display = "none";
        alert("Error fetching results. Try again.");
        console.error("Fetch Error: ", error);
    });
}
