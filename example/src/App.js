import React, { Component } from 'react';
import UIIdentificationCard from '../../src/index.jsx';

export default class App extends Component {
  content() {
    return (
      <p>Hello World</p>
    );
  }

  onClick() {
    alert('click');
  }

  render() {
    const colors = ['#FF8AC2', '#6ED4A4', '#283547', '#F0AB51', '#00E4FF'];
    const style = {
      ul: {
        listStyle: 'none'
      },
      li: {
        padding: '10px'
      }
    };
    const cards = colors.map((color) => {
      return (
        <li style={style.li}>
          <UIIdentificationCard
            className="app"
            width={236}
            viewMetadata={this.content.bind(this)}
            color={color}
            isEmpty={true}
            onClick={this.onClick.bind(this)}
          />
        </li>
      );
    });
    return (
      <ul style={style.ul}>
        {cards}
      </ul>
    );
  }
}
