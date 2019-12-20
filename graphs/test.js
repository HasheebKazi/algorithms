const UndirectedGraph = require('./graph');

const graph1 = new UndirectedGraph.UndirectedGraph({
    'a': ['b','c'],
    'b': ['a'],
    'c': ['d','a'],
    'd': ['c']
});

console.log(graph1);