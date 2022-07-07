import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}

/*  each node has and unique id that is the row and col number
    the id is used to identify the node in the grid

    the className is used to style the node
    if the node is a finish node, it is styled with the className 'node-finish'
    if the node is a start node, it is styled with the className 'node-start'
    if node is a wall node, it is styled with the className 'node-wall'
    if node is neither a finish node, start node, or wall node, it is styled with the className 'node'


    */