exports.bfs = (startingNode) => {

    let visitedNodes = {}; // using a hashtable for O(1) access
    let frontier = []; // this will act as a queue from which I will select the next node to visit
    
    frontier.push(startingNode);

    let adjacentNodes = [];
    let counter = 0;
    let currentNode = null;
    while(frontier.length > 0) {
        currentNode = frontier.shift();
        adjacentNodes = currentNode.getAdjacents();

        counter = 0;
        while(counter < adjacentNodes.length) {
            if (!visitedNodes[adjacentNodes[counter]['identifier']] && currentNode['identifier'] !== adjacentNodes[counter]['identifier']) {
                frontier.push(adjacentNodes[counter]);
            }
            counter++;
        }
        visitedNodes[currentNode['identifier']] = true;
    }
}