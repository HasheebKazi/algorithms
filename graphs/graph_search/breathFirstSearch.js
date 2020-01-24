exports.simpleBFS = (startingNode) => {

    let level = {}; // using a hashtable for O(1) access
    let parent = {};
    let i = 1;
    let frontier = []; // this will act as a queue from which I will select the next node to visit
    
    frontier.push(startingNode); // place starting node as first in the frontier

    // various references
    let adjacentNodes = [];
    let counter = 0;
    let currentNode = null;

    // keep traversing the graph as long as the frontier has nodes
    while(frontier.length > 0) {
        
        // get the current node (and its adjacent nodes) to explore as the "oldest" node in the frontier
        currentNode = frontier.shift();
        adjacentNodes = currentNode.getAdjacents();

        counter = 0;
        // repeat for each node adjacent to current node
        while(counter < adjacentNodes.length) {
            // add the next adjacent node to the frontier if it hasn't been visited yet AND it is not equal to the current node (second condition is to avoid putting the current node back into the frontier due to a loop edge)
            if (!level[adjacentNodes[counter]['identifier']] && currentNode['identifier'] !== adjacentNodes[counter]['identifier']) {
                frontier.push(adjacentNodes[counter]);
            }
            counter++;
        }
        
        // now that all nodes adjacent to the current node have been added to the frontier, the current node is "fully explored" and added to the list of visited nodes
        level[currentNode['identifier']] = true;
    }
}

// Time complexity: O(|V| + |E|);
// Space complexity: O(|V|)
exports.bfs = (startingNode) => {
    let level = {  };
    level[startingNode['identifier']] = 0;
    let parent = {  };
    parent[startingNode['identifier']] = null;

    let currentLevel = 1;
    let frontier = [startingNode];

    while (frontier.length > 0) {

        // this must be a queue or else you wouldn't be exploring breath first
        // e.g you must get all elements of the ith level before moving to the ith+1 level and once you are done exploring all the nodes form the ith level you MUST move one only to the ith + 1 level
        // thus this data structure must be some form of FIFO queue or some other mechanism that ensures the correct behaviour
        currentNode = frontier.shift(); 
        adjacentNodes = currentNode.getAdjacents();

        for (let vertex of adjacentNodes) {
            if (!(level[vertex['identifier']] >= 0) && (currentNode['identifier'] !== vertex['identifier'])) {
                level[vertex['identifier']] = currentLevel;
                parent[vertex['identifier']] = currentNode['identifier'];
                frontier.push(vertex);
            }
        }

        currentLevel += 1;
    }

    return {
        levels: level,
        parents: parent
    };
}