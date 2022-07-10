//import minHeap from './min_heap';

import MinHeap from './min_heap';
// a star algorithm for finding the shortest path


export function Astar(grid, startNode, finishNode) {
    // closedList is 2d array of boolean
    let visitedNodesInorder=[]
    // node details
    let nodeDetails = new Array(grid.length);
    for (let i = 0; i < grid.length; i++) {
        nodeDetails[i] = new Array(grid[0].length);
    }
    // set each node to to an object
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            nodeDetails[i][j] = {
                f: 10000,
                g: 10000,
                h: 10000,
                previousNode: null
            }
        }
    }
    // set the start node to 0
    nodeDetails[startNode.row][startNode.col].g = 0;
    nodeDetails[startNode.row][startNode.col].h = 0;
    nodeDetails[startNode.row][startNode.col].f = 0;

    // create a min heap
    let minHeap = new MinHeap();
    // insert the start node
    minHeap.insert(startNode);
    console.log(minHeap.heap)


    while (!minHeap.is_empty()) {
        console.log('hi')

        // choose in openlist having lowest f score
        let currentNode = minHeap.extract_min();
        if (currentNode === finishNode) {
            console.log(visitedNodesInorder)
            return visitedNodesInorder;
        }


        currentNode.isVisited = true;
        visitedNodesInorder.push(currentNode);
        // get unvisited neighbors of current node
        let unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);

        // for each neighbor
        for (const neighbor of unvisitedNeighbors) {
            

            //update the g score
            let gScore = nodeDetails[currentNode.row][currentNode.col].g + 1;
            if (gScore < nodeDetails[neighbor.row][neighbor.col].g) {
                neighbor.previousNode = currentNode;
                nodeDetails[neighbor.row][neighbor.col].g = gScore;
                nodeDetails[neighbor.row][neighbor.col].h= heuristic(neighbor, finishNode);
                nodeDetails[neighbor.row][neighbor.col].f = nodeDetails[neighbor.row][neighbor.col].g + nodeDetails[neighbor.row][neighbor.col].h;
                // if neighbor is not in openlist, add it to openlist
                if (!neighbor.isVisited) {
                    console.log("neighbor")
                    if (!neighbor.isWall) {
                       minHeap.insert(neighbor);
                    }
                    
                }
            }
        }
    }
    
    return visitedNodesInorder;

}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = []
    const { col, row } = node
    if (row > 0) neighbors.push(grid[row - 1][col])
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if (col > 0) neighbors.push(grid[row][col - 1])
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
    return neighbors.filter((neighbor) => !neighbor.isVisited)
}

function heuristic(node, finishNode) {
    return Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col);
}