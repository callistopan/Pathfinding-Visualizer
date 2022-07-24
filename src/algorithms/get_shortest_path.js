export function get_shortest_path(finishNode) {
  const nodesInShortestPathOrder = []; //  nodes in order of visited

  let currentNode = finishNode; // start at the finish node

  while (currentNode !== null) {
    // while we haven't reached the start node
    nodesInShortestPathOrder.unshift(currentNode); // add the current node to the beginning of the array
    currentNode = currentNode.previousNode; // move to the previous node
  }
  return nodesInShortestPathOrder; // return the nodes in order of visited
}
