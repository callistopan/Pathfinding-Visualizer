//import minHeap from './min_heap';

import MinHeap from './min_heap';
// a star algorithm for finding the shortest path


export function Astar(grid, startNode, finishNode) {
    // closedList is 2d array of boolean
    let visitedNodesInorder=[]
    
    startNode.f=0;
    startNode.g = 0;
    startNode.h = 0;


    // create a min heap
    let minHeap = new MinHeap();
    // insert the start node
  
    minHeap.insert(startNode);
    console.log(minHeap.heap.length)



    while (!minHeap.is_empty()) {
        

        // choose in openlist having lowest f score
        let currentNode = minHeap.extract_min();
        console.log(currentNode.f)
        if (currentNode === finishNode) {
           
            return visitedNodesInorder;
        }


        currentNode.isVisited = true;
        visitedNodesInorder.push(currentNode);
        // get unvisited neighbors of current node
        let unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);

        // for each neighbor
        for (const neighbor of unvisitedNeighbors) {
            

            //update the g score
            let gScore = currentNode.g +1
            if (gScore < neighbor.g) {
                neighbor.previousNode = currentNode;
                neighbor.g = gScore;
                neighbor.h= heuristic(neighbor, finishNode);
                neighbor.f = neighbor.g + neighbor.h;
                // if neighbor is not in heap then insert it
                if (!minHeap.heap.includes(neighbor)) {
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