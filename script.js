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

         // Check the retrieved data in the console
        console.log("Gene-process relationships:", results.length);

        // Create arrays for nodes and links
        let nodes = [];
        let links = [];

        // Convert gene-process relationships into network data
        for (let item of results) {
            let gene = item.geneLabel.value;
            let process = item.processLabel.value;

            // Add each gene only once
            if (!nodes.some(node => node.id === "gene:" + item.gene.value)) {
                nodes.push({
                    id: "gene:" + item.gene.value,
                    name: gene,
                    type: "gene"
                });
            }

            // Add each biological process only once
            if (!nodes.some(node => node.id === "process:" + item.process.value)) {
                nodes.push({
                    id: "process:" + item.process.value,
                    name: process,
                    type: "process"
                });
            }

            // Connect the gene to its biological process
            links.push({
                source: "gene:" + item.gene.value,
                target: "process:" + item.process.value
            });
        }

        // Display network information in the console
        console.log("Total nodes:", nodes.length);
        console.log("Total links:", links.length);

        // Set visualization dimensions
        let width = 900;
        let height = 600;

        // Create an SVG inside the network div
        let svg = d3.select("#network")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Draw links between genes and processes
        let link = svg.selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.5);

        // Draw nodes
        let node = svg.selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", 7)
            .attr("fill", d => d.type === "gene" ? "steelblue" : "orange");

        // Add labels when hovering over nodes
        node.append("title")
            .text(d => d.name);

        // Create the force-directed simulation
        let simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links)
                .id(d => d.id)
                .distance(80))
            .force("charge", d3.forceManyBody().strength(-100))
            .force("center", d3.forceCenter(width / 2, height / 2));

        // Update positions as the simulation runs
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });
    });
