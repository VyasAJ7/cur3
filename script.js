function checkWhitelist() {
    var userWhitelist = document.getElementById("whitelist").value.split("\n").map(site => site.trim()).filter(Boolean);
    if (userWhitelist.length === 0) {
        alert("Please enter at least one domain.");
        return;
    }

    document.getElementById("loading").style.display = "block";

    fetch("https://script.google.com/macros/s/AKfycbyTNBGpnGRVJilWj9e9akOht182D6F8M_Ra2PmKsRbOTgjS32Z5ZJi1MSQlGrAlsjVy/exec", {
        method: "POST",
        body: JSON.stringify({ userWhitelist }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(results => {
        document.getElementById("loading").style.display = "none";

        var output = "<h3>✅ Whitelist Classification Results</h3><ul>";
        results.existingResults.forEach(item => {
            output += `<li><b>${item.website}</b>: ${item.primaryIAB}, ${item.secondaryIAB}, ${item.originCountry}, ${item.websiteSections}</li>`;
        });

        results.newResults.forEach(item => {
            output += `<li><b>${item.website}</b>: ${item.primaryIAB}, ${item.secondaryIAB}, ${item.originCountry}, ${item.websiteSections}</li>`;
        });

        output += `</ul><h4>💰 Cost: $${results.totalCost} (Tokens: ${results.totalTokens})</h4>`;

        document.getElementById("results").innerHTML = output;
    })
    .catch(error => {
        document.getElementById("loading").style.display = "none";
        alert("Error fetching results. Try again.");
        console.error(error);
    });
}
