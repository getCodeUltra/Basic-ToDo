import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import './index.css';
import './index.html';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '', // store what we pass to our input
      items: [], // store values we pass to todo list
      selectedKeys: [],
      xCount: 0,
      aCount: 0
    };
    this.handleBodyKeyDown = this.handleBodyKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    global.document.body.addEventListener('keydown', this.handleBodyKeyDown);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    global.document.body.removeEventListener('keydown', this.handleBodyKeyDown);
  }

  onChange(event) { // change the state  depending on value
    this.setState({ term: event.target.value });
  }

  onClick(event) {
    event.preventDefault();
    this.setState({
      term: '', // cleans input field
      items: [
        ...this.state.items,
        this.state.term
      ] // push terms to an array
    });
  }
  handleBodyKeyDown(event) {
    let flag = false;
    console.log('pressed', event, event.keyCode);
    if (event.target.tagName === 'BODY') {
      console.log('it is not in input');
    }
    else if (event.target.tagName === 'INPUT') {
      flag = true;
    }

    const totalX = this.state.xCount;
    const totalA = this.state.aCount;

    if (event.keyCode === 88) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(function checkX() {
        this.setState({ xCount: 0 });
      }.bind(this), 500);

      this.setState({ xCount: totalX + 1 });

      if (this.state.xCount === 3 && flag === false) {
        console.log('triple X!!!');
        this.state.items.pop();
      }
    }
    if (event.keyCode === 65) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(function checkA() {
        this.setState({ aCount: 0 });
      }.bind(this), 500);
      this.setState({ aCount: totalA + 1 });

      if (this.state.aCount === 3 && flag === false) {
        console.log('triple A!!!');
        this.state.items.push('Empty Entry');
      }
    }
  }

  render() {
    return (
      <div>
        <form className="App">
          <input value={this.state.term} onChange={this.onChange} />
          <button type="button" onClick={this.onClick}>Add</button>
        </form>
        <List items={this.state.items} />
      </div>
    );
  }
}
ReactDOM.render(
  <App />, global.document.getElementById('root')
);
