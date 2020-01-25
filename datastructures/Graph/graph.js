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
    addAdjacent(destinationNode, weight = 0) {
        const edge = new WEdge(destinationNode, weight);
        this.adjacents.push(edge);
    }

    // O(|E|) 
    removeAdjacent(node) {
        // given a node remove the related edge
        const newAdjacents = this.addAdjacent.filter(edge => {
            if (edge.getDestination !== node) {
                return true;
            } else {
                return false
            }
        });

        this.adjacents = newAdjacents;
        return node;
    }

    // O(1)
    getAdjacents() {
        // return this.adjacents;

        // 0(1) for testing purposes
        return [...this.adjacents];
    }

    // O(1)
    isAdjacent(edge) { // edge doesnt really make sense but we are storing edges
        return this.adjacents.indexOf(edge) > -1;
    }

}

class WEdge {
    constructor(destinationNode, weight = 0) {
        this.destinationNode =destinationNode;
        this.weight = weight;
    }

    getDestination() {
        return this.destinationNode;
    }

    getWeight() {
        return this.weight;
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

        // O(1)
        addEdge(sourceIdentifier, destinationIdentifier, weight = 0) {
            const sourceNode = this.addOrGetVertex(sourceIdentifier);
            const destinationNode = this.addOrGetVertex(destinationIdentifier);
            
            // this lets me add a weight to each edge
            // sourceNode.addAdjacent(destinationNode);
            sourceNode.addAdjacent(sourceNode, weight);
            if (this.edgeDirection === Graph.UNDIRECTED) {
                // destinationNode.addAdjacent(sourceNode);
                destinationNode.addAdjacent(destinationNode, weight);
            }
    
            return [sourceNode, destinationNode];
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