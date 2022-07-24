

export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = []; // nodes in order of visited
    startNode.distance = 0;         // distance from start node to start node is 0
    
    let res=dfs_h(grid,startNode, finishNode, visitedNodesInOrder);
    return visitedNodesInOrder;
  
}

function dfs_h(grid, startNode, finishNode, visitedNodeInorder) {
    
    // if start node in visited then return
    if (startNode === finishNode) return true ;  // we ar
    if (startNode.isVisited) return false;
    if (startNode.isWall) return false;
    startNode.isVisited = true;
    
    visitedNodeInorder.push(startNode);  // add the closest node to the visited nodes in order
    
    
    const unvisitedNeighbors = getUnvisitedNeighbors(startNode, grid); // get the unvisited neighbors of the closest node
  for (const neighbor of unvisitedNeighbors) {
        neighbor.previousNode =startNode
        if (dfs_h(grid, neighbor, finishNode, visitedNodeInorder)) {
            return true;
        }
    }
}
function getUnvisitedNeighbors(node, grid) {
  const neighbors = []; // neighbors of the node
  const { col, row } = node; // get the row and column of the node
  
  if (row > 0) neighbors.push(grid[row - 1][col]); // add the node above the node
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // add the node below the node

  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // add the node to the right of the node
 
  if (col > 0) neighbors.push(grid[row][col - 1]); // add the node to the left of the node
 
  return neighbors.filter((neighbor) => !neighbor.isVisited); // filter out the visited neighbors
}


