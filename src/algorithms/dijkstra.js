// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid, startNode, finishNode) {

  const visitedNodesInOrder = []; // nodes in order of visited
  startNode.distance = 0;         // distance from start node to start node is 0

  const unvisitedNodes = getAllNodes(grid); // all nodes in the grid

  while (!!unvisitedNodes.length) { // while there are still nodes to visit

    sortNodesByDistance(unvisitedNodes);  // sort the unvisited nodes by distance

    const closestNode = unvisitedNodes.shift(); // get the closest node
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;  // return visited nodes in order

    closestNode.isVisited = true; // mark the closest node as visited
    visitedNodesInOrder.push(closestNode);  // add the closest node to the visited nodes in order

    if (closestNode === finishNode) return visitedNodesInOrder;  // we are done!

    updateUnvisitedNeighbors(closestNode, grid);  // update the unvisited neighbors of the closest node
  }
}

// Sorts the unvisited nodes by distance.
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}


// Updates the unvisited neighbors of the closest node.
function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid); // get the unvisited neighbors of the closest node
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = []; // neighbors of the node
  const { col, row } = node;  // get the row and column of the node
  if (row > 0) neighbors.push(grid[row - 1][col]);  // add the node above the node
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);  // add the node below the node
  if (col > 0) neighbors.push(grid[row][col - 1]);  // add the node to the left of the node
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // add the node to the right of the node
  return neighbors.filter((neighbor) => !neighbor.isVisited); // filter out the visited neighbors
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
// here we are using the fact that start node has no prev node.

export function getNodesInShortestPathOrder(finishNode) {

  const nodesInShortestPathOrder = [];  //  nodes in order of visited

  let currentNode = finishNode; // start at the finish node

  while (currentNode !== null) {  // while we haven't reached the start node
    nodesInShortestPathOrder.unshift(currentNode);  // add the current node to the beginning of the array
    currentNode = currentNode.previousNode;       // move to the previous node
  }
  return nodesInShortestPathOrder;  // return the nodes in order of visited
}
