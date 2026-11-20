# How are genes associated with Type 1 Diabetes connected in their biological functions?
https://rafael-ll.github.io/PRA3006-Programming-in-the-Life-Sciences/ 
Some genes are associated with an increased risk of T1D. Assessing these genes by their biological functions may reveal functional relationship and help characterize the disease phenotype.

Wikidata is used as the SPARQL endpoint for biological information. The queries use properties P2293 (genetic association), P688 (encodes), and P682 (biological process).

So far the HTML page was updated using JavaScript and SPARQL to show genes associated with T1D and their biological processes. The query returns genes with their respective biological processes, with the requirement that every biological process is linked to at least two T1D-related genes. 265 results were found. The significance of the results is unknown, however conclusions can be drawn from clustering the genes with the processes.

D3 visualization will be added next in the form of a network with nodes and links.
