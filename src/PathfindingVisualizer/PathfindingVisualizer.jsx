import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { dfs, getNodesInShortestPathOrder_dfs } from "../algorithms/dfs";
import { bfs } from "../algorithms/bfs";
import { Astar } from "../algorithms/astar";

import "./PathfindingVisualizer.css";

// randomize the start and finish nodes
const START_NODE_ROW = Math.floor(Math.random() * 20);

const START_NODE_COL = Math.floor(Math.random() * 50);
const FINISH_NODE_ROW = Math.floor(Math.random() * 20);
const FINISH_NODE_COL = Math.floor(Math.random() * 50);

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid(); // initialize the grid and update the state
    this.setState({ grid });
  }

  // mouse down event handler
  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col); // get the new grid with the wall toggled
    this.setState({ grid: newGrid, mouseIsPressed: true }); // update the state with the new grid and mouseIsPressed
  }

  // mouse up event handler
  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return; // if the mouse is not pressed, return
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col); // get the new grid with the wall toggled
    this.setState({ grid: newGrid }); // update the state with the new grid
  }

  // mouse up event handler
  handleMouseUp() {
    this.setState({ mouseIsPressed: false }); // update the state with the mouseIsPressed as false
  }

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    // animate the dijkstra algorithm

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        // if the i is equal to the visited nodes in order length,
        setTimeout(() => {
          // set a timeout to animate the shortest path
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }

      setTimeout(() => {
        // set the timeout for the animation
        const node = visitedNodesInOrder[i]; // get the node from the visited nodes in order
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited"; // update the node class name to node-visited
      }, 10 * i); // set the timeout for the animation
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    // animate the shortest path
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      // for each node in the shortest path order
      setTimeout(() => {
        // set the timeout for the animation
        const node = nodesInShortestPathOrder[i]; // get the node from the shortest path order
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path"; // update the node class name to node-shortest-path
      }, 50 * i); // set the timeout for the animation
    }
  }

  visualizeAlgorithms() {
    const { grid } = this.state; // get current grid from the state
    const startNode = grid[START_NODE_ROW][START_NODE_COL]; // get the start node from the grid
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]; // get the finish node from the grid
    const algorithm = document.getElementById("algorithm").value; // get the algorithm from the dropdown menu
    // switch statement to call the appropriate algorithm
    let visitedNodesInOrder =[]
    switch (algorithm) {
      case "bfs":
        visitedNodesInOrder = bfs(grid, startNode, finishNode);
        break;
      case "dfs":
        visitedNodesInOrder = dfs(grid, startNode, finishNode);
        break;
      case "dijkstra":
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        break;
      case "astar":
        visitedNodesInOrder = Astar(grid, startNode, finishNode);
        break;
      default:
        break;
    }

    const nodesInShortestPathOrder =
      getNodesInShortestPathOrder_dfs(finishNode); // get the nodes in shortest path order from the finish node
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder); // animate the dijkstra algorithm
  }

  reset() {
    // refresh the page
    window.location.reload();
    
  }

  render() {
    const { grid, mouseIsPressed } = this.state; // get the grid and mouseIsPressed from the state

    return (
      <>
        <select name="algorithm" id="algorithm">

          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
          <option value="dijkstra">Dijkstra</option>
          <option value="astar">A*</option>
        </select>

        <button onClick={() => this.visualizeAlgorithms()}>Visualize</button>
        <button onClick={()=> this.reset()}>Reset</button>

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node; // get the row, col, isFinish, isStart, and isWall from the node object
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  // create a node object
  return {
    col, // column
    row, // row
    isStart: row === START_NODE_ROW && col === START_NODE_COL, // if the node is the start node
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL, // if the node is the finish node
    distance: Infinity, // distance from start node
    isVisited: false, // if the node has been visited
    isWall: false, // if the node is a wall
    previousNode: null, // previous node of this node
  };
};

// toggle the wall property of a node
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice(); // copy the grid
  const node = newGrid[row][col]; // get the node
  const newNode = {
    // create a new node
    ...node, // copy the properties of the old node
    isWall: !node.isWall, // toggle the wall property
  };
  newGrid[row][col] = newNode; //  update the grid
  return newGrid; // return the new grid
};
