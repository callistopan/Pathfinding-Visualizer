import MinHeap_Dijkstra from "./priority_queue/min_heap_dijkstra";


// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.

// O(ElogV) time
export function dijkstra(grid, startNode, finishNode) {

  
  const visitedNodesInOrder = []; // nodes in order of visited
  startNode.distance = 0;         // distance from start node to start node is 0
  let MinHeap = new MinHeap_Dijkstra();
  MinHeap.insert(startNode);      // insert the start node into the min heap


  const unvisitedNodes = getAllNodes(grid); // all nodes in the grid

  while (!MinHeap.is_empty()) { // while there are still nodes to visit

    // sortNodesByDistance(unvisitedNodes);  // sort the unvisited nodes by distance

    const closestNode = MinHeap.extract_min(); // get the closest node
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;  // return visited nodes in order

    closestNode.isVisited = true; // mark the closest node as visited
    visitedNodesInOrder.push(closestNode);  // add the closest node to the visited nodes in order

    if (closestNode === finishNode) return visitedNodesInOrder;  // we are done!

    const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid); // get the unvisited neighbors of the closest node
    for (const neighbor of unvisitedNeighbors) {
      // Update the distance to the neighbor and add it to the MinHeap
      if (neighbor.distance > closestNode.distance + 1) {
        neighbor.distance = closestNode.distance + 1;
        neighbor.previousNode = closestNode;
         MinHeap.insert(neighbor);
      }
      
     
    }
  }
  return visitedNodesInOrder;
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

