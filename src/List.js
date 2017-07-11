import React, { Component } from 'react';
import './index.css';

export default class List extends Component {
  renderSingleItem(item, index) {
    return <li key={index}>{item}</li>;
  }
  renderItems(list) {
    this.renderItems = this.renderItems.bind(this);
    return list.map((item, index) => {
      return this.renderSingleItem(item, index);
    });
  }
  render() {
    const items = this.renderItems(this.props.items);
    return (
      <ul>
        <h1>Hello World</h1>
        {items}
      </ul>
    );
  }
}
