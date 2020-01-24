// adjacency list representation of a graph 
// const graph = {
//     a: [a, b],
//     b: [c],
//     c: []
// } // this represents the graph G = (V, E) where V = {a,b,c} and E = {{a}, {a, b},{b, c}}
// a graph is an ordered pair of vertecies and edges, where vertecies is a non-empty set of vertecies and edges is a set of either ordered pairs or unorded pairs


// represets each each + all nodes adjacent to it
class Node {

    constructor(identifier, value = 1) {
        this.identifier = identifier;
        this.value = value;
        this.adjacents = [];
    }

    // O(1) 
    addAdjacent(node) {
        this.adjacents.push(node);
    }

    // O(|E|) 
    removeAdjacent(node) {
        const index = this.adjacents.indexOf(node);
        if (index > -1) {
            this.adjacents.splice(index, 1);
            return node;
        }
    }

    // O(1)
    getAdjacents() {
        // return this.adjacents;

        // 0(1) for testing purposes
        return [...this.adjacents];
    }

    // O(1)
    isAdjacent(node) {
        return this.adjacents.indexOf(node) > -1;
    }

}

class Graph {

    constructor(edgeDirection = Graph.UNDIRECTED) {
        this.nodes = new Map();
        this.edgeDirection = edgeDirection;
    }

    // O(1)
    getVertecies() {
        return this.nodes;
    }

    // O(1)
    addEdge(sourceIdentifier, destinationIdentifier) {
        const sourceNode = this.addOrGetVertex(sourceIdentifier);
        const destinationNode = this.addOrGetVertex(destinationIdentifier);

        sourceNode.addAdjacent(destinationNode);

        if (this.edgeDirection === Graph.UNDIRECTED) {
            destinationNode.addAdjacent(sourceNode);
        }

        return [sourceNode, destinationNode];
    }

    // O(1)
    addOrGetVertex(identifier) {
        if (this.nodes.has(identifier)) {
            return this.nodes.get(identifier);
        } else {
            const vertex = new Node(identifier);
            this.nodes.set(identifier, vertex);
            return vertex;
        }
    }

    // O(|V|+|E|)
    removeVertex(identifier) {
        const current = this.nodes.get(identifier);
        if (current) {
            for (const node of this.nodes.values()) {
                node.removeAdjacent(current);
            }
        }
        return this.nodes.delete(identifier);
    }

    // O(|E|)
    removeEdge(sourceIdentifier, destinationIdentifier) {
        const sourceNode = this.nodes.get(sourceIdentifier);
        const destinationNode = this.nodes.get(destinationIdentifier);

        if (sourceNode && destinationNode) {
            sourceNode.removeAdjacent(destinationNode);

            if (this.edgeDirection === Graph.UNDIRECTED) {
                destinationNode.removeAdjacent(sourceNode);
            }
        }

        return [sourceNode, destinationNode];
    }

}

Graph.UNDIRECTED = Symbol('directed graph');
Graph.DIRECTED = Symbol('undirected graph');

module.exports = {
    Graph
}