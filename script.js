// Load the SPARQL query from the separate file
fetch("query.rq")
    .then(response => response.text())
    .then(query => {

        // Create the Wikidata URL
        let url = "https://query.wikidata.org/sparql?query="
            + encodeURIComponent(query) + "&format=json";

        // Request results from Wikidata
        return fetch(url);
    })
    .then(response => response.json())
    .then(data => {

        // Access the results
        let results = data.results.bindings;

        // Display each gene and its biological process
        for (let item of results) {
            let paragraph = document.createElement("p");

            paragraph.textContent = item.geneLabel.value
                + " -> "
                + item.processLabel.value;

            document.getElementById("gene-list").appendChild(paragraph);
        }
    });
