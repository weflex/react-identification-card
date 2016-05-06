import React, { Component } from 'react';
import UIIdentificationCard from '../../src/index.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#FF8AC2'
    };
  }

  content() {
    return (
      <p>Hello World</p>
    );
  }

  onClick() {
    alert('click');
  }

  onSetColor(color) {
    return () => {
      this.setState({ color });
    }
  }

  render() {
    const colors = [
      '#FF8AC2',
      '#6ED4A4',
      '#283547',
      '#F0AB51',
      '#00E4FF'
    ];
    const style = {
      color: {
        width: "30px",
        height: "30px",
        margin: "10px",
        display: "inline-block",
        borderRadius: "50%"
      }
    };

    const colorRow = colors.map((color, i) => {
      const divStyl = Object.assign({}, style.color, {
        backgroundColor: color
      });
      return (
        <div onClick={this.onSetColor(color)} style={divStyl} key={i}></div>
      );
    });

    return (
      <div>
        <div>{colorRow}</div>
        <UIIdentificationCard
          className="app"
          width={236}
          viewMetadata={this.content.bind(this)}
          color={this.state.color}
          isEmpty={true}
          onClick={this.onClick.bind(this)}
        />
      </div>
    );
  }
}
