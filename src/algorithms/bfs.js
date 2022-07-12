
export function bfs(grid, startNode, endNode) {
    
    const visitedNodeInorder = []
    startNode.distance = 0
    // declare a queue to store the nodes to be visited

    var q = []
    
    q.push(startNode)
    while (q.length ) {

        const currentNode = q.shift()
        if (currentNode === endNode) {
            return visitedNodeInorder
        }
        if (currentNode.isVisited) {
            continue
        }
        if (currentNode.isWall) {
            continue
        }
        currentNode.isVisited = true
        visitedNodeInorder.push(currentNode)
        const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid)
        for (const neighbor of unvisitedNeighbors) {
            neighbor.previousNode = currentNode
            q.push(neighbor)
        }
        

        



    }
    
    
    return visitedNodeInorder


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