class UndirectedGraph {
    /* 
        graph is undirected with one between any two vertecies
        represented with an object:
        verteces are strings of lowercase letters followed by numbers (var naming rules)
        {
            'a': ['b','c,'d','e'],
            'b': ['c','a']
        }
    */
    
    constructor(graph) {
        this.graphAdjecencyList = this.createAdjecencyList(graph);
        this.lenVertecies = this.countVertecies(graph);
        this.lenEdges = 0;
    }

    createAdjecencyList(graph) {
        let adjList = {};
        for (const node in graph) {
            adjList[node] = graph[node];
        }

        return adjList;
    }

    countVertecies(graph) {
        return Object.keys(graph).length;
    }
}

module.exports = {
    UndirectedGraph: UndirectedGraph
};