exports.badDFS = (startingNode) => {

    let visitedNodes = {}; // using a hashtable for O(1) access
    let frontier = []; // this will act as a stack from which I will select the next node to visit
    
    frontier.push(startingNode); // place starting node as first in the frontier

    // various references
    let adjacentNodes = [];
    let counter = 0;
    let currentNode = null;

    // keep traversing the graph as long as the frontier has nodes
    while(frontier.length > 0) {
        
        // get the current node (and its adjacent nodes) to explore as the "oldest" node in the frontier
        currentNode = frontier.pop();
        adjacentNodes = currentNode.getAdjacents();

        counter = 0;
        // repeat for each node adjacent to current node
        while(counter < adjacentNodes.length) {
            // add the next adjacent node to the frontier if it hasn't been visited yet AND it is not equal to the current node (second condition is to avoid putting the current node back into the frontier due to a loop edge)
            if (!visitedNodes[adjacentNodes[counter]['identifier']] && currentNode['identifier'] !== adjacentNodes[counter]['identifier']) {
                frontier.push(adjacentNodes[counter]);
            }
            counter++;
        }
        
        // now that all nodes adjacent to the current node have been added to the frontier, the current node is "fully explored" and added to the list of visited nodes
        visitedNodes[currentNode['identifier']] = true;

        process.stdout.write(currentNode['identifier'] + ' ');
    }
    console.log('');
}

exports.dfs = (graph) => {
    
    // in dfs parent keeps track of whether or not we've seen a vertex and helps us classify edges
    const parent = { };
    const dfsOrder = [ ];
    const treeEdges = [ ];

    // get all vertecies from the graph: which is a map of ('vertex_indentifier' => object('representing the node'))
    const vertecies = graph.getVertecies();

    const dfsVisit = (currentNode) => {
        
        const adjacentNodes = currentNode.getAdjacents();
        
        for (let vertex of adjacentNodes) {
            if (!parent[vertex['identifier']]) {
                parent[vertex['identifier']] = currentNode['identifier'];
                dfsOrder.push(vertex['identifier']);
                treeEdges.push([currentNode['identifier'], vertex['identifier']]);
                dfsVisit(vertex);
            } else {
                // if the edge isn't a tree edge
            }
        }

    }

    for (let vertexIdentifier of vertecies.keys()) {
        if (!parent[vertexIdentifier]) {
            parent[vertexIdentifier] = '*';
            dfsOrder.push(vertexIdentifier);
            dfsVisit(vertecies.get(vertexIdentifier));
        }
    }



    return [parent, dfsOrder, treeEdges];
}


