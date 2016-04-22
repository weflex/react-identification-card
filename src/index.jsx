"use strict";

import React from 'react';
import UIDashedBox from 'react-dashed-box';

/**
 * @class UIIdentificationCard
 */
export default class UIIdentificationCard extends React.Component {
  static propTypes = {
    /**
     * @property {String} className - the extend class name.
     */
    className: React.PropTypes.string,
    /**
     * @property {String} size - the size of this identification card.
     */
    format: React.PropTypes.string,
    /**
     * @property {Number} width - the width of this card.
     */
    width: React.PropTypes.number,
    /**
     * @property {String} color
     */
    color: React.PropTypes.string,
    /**
     * @property {String} fillColor
     */
    fillColor: React.PropTypes.string,
    /**
     * @property {Number} fillOpacity
     */
    fillOpacity: React.PropTypes.number,
    /**
     * @property {Boolean} data - the data
     */
    isEmpty: React.PropTypes.bool,
    /**
     * @property {Function} viewMetadata - view metadata info
     */
    viewMetadata: React.PropTypes.func.isRequired,
    /**
     * @property {Function} onClick
     */
    onClick: React.PropTypes.func,
  };

  static defaultProps = {
    className: '',
    format: 'ID-1',
    width: 236,
    color: '#999999',
    fillColor: '#ffffff',
    fillOpacity: 0.6,
  };

  static styles = {
    container: {
      display: 'inline-block',
      cursor: 'pointer',
      transition: 'all .2s ease-in-out',
      verticalAlign: 'top',
    },
    contents: {
      position: 'relative',
    },
    background: {
      transition: 'all .2s ease-in-out',
    },
    metadata: {
      position: 'absolute',
      bottom: '15px',
      left: '15px',
      right: '15px',
      top: '15px',
      transition: 'all .2s ease-in-out',
      textAlign: 'left',
    },
    path: {
      transition: 'all .2s ease-in-out',
    },
  };

  /**
   * @getter {Number} dimensions
   */
  get dimensions() {
    let dimensions;
    switch (this.props.format) {
      case 'ID-1': dimensions = 53.98 / 85.60; break;
      case 'ID-2': dimensions = 74.00 / 105.0; break;
      case 'ID-3': dimensions = 88.00 / 125.0; break;
      case 'ID-000': dimensions = 15 / 25; break;
    }
    return dimensions;
  }

  /**
   * @getter {Number} width
   */
  get width() {
    return this.props.width;
  }

  /**
   * @getter {Number} height
   */
  get height() {
    return this.dimensions * this.width;
  }

  /**
   * @getter {String} viewBox
   */
  get viewBox() {
    return [0, 0, this.width, this.height].join(' ');
  }

  /**
   * @getter {String} path
   */
  get path() {
    return [
      'M165.845472,0',
      'L227.99565,0',
      'C232.416331,0',
      '236,3.57268443',
      '236,7.99770351',
      'L236,141.002296',
      'C236,145.419306',
      '232.410871,149',
      '227.99565,149',
      'L74.7409935,149',
      'C81.7669784,130.92177',
      '98.4541553,89.6860279',
      '117.435739,54.7599123',
      'C134.773927,22.8576428',
      '154.983589,6.85502733',
      '165.845472,-4.88498131e-15 Z',
    ].join(' ');
  }

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      fillColor: props.fillColor,
      fillOpacity: props.fillOpacity,
      contentPosition: 0,
    };
  }

  onMouseOver() {
    this.setState({
      color: '#777777',
      fillOpacity: UIIdentificationCard.defaultProps.fillOpacity - 0.2,
      contentPosition: 10,
    });
  }

  onMouseLeave() {
    this.setState({
      fillOpacity: UIIdentificationCard.defaultProps.fillOpacity,
      contentPosition: 0,
    });
  }

  background() {
    return (
      <svg 
        style={UIIdentificationCard.styles.background}
        width={this.width} 
        height={this.height} 
        viewBox={this.viewBox} 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(-763.000000, -142.000000)">
          <g transform="translate(150.000000, 52.000000)">
            <g transform="translate(201.000000, 0.000000)">
              <g transform="translate(397.000000, 10.000000)">
                <g transform="translate(15.000000, 80.000000)">
                  <rect fill={this.props.color} x="0" y="0" rx="8"
                    width={this.width} 
                    height={this.height}
                  />
                  <path d={this.path} 
                    style={UIIdentificationCard.styles.path}
                    fillOpacity={this.state.fillOpacity} 
                    fill={this.props.fillColor}
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }

  metadata() {
    const styl = UIIdentificationCard.styles.metadata;
    const metadataStyl = Object.assign({}, styl, {
      bottom: (parseInt(styl.bottom) + this.state.contentPosition) + 'px',
    });
    return (
      <div style={metadataStyl}>
        {this.props.viewMetadata()}
      </div>
    );
  }

  wrap(children, props={}) {
    const style = Object.assign({
      width: this.width,
      height: this.height,
    }, UIIdentificationCard.styles.container, props.style);
    return (
      <div
        style={style}
        className={this.props.className}
        onClick={this.props.onClick}
        onMouseOver={props.onMouseOver}
        onMouseLeave={props.onMouseLeave}>
        {children}
      </div>
    );
  }

  render() {
    if (!this.props.isEmpty) {
      return this.wrap(
        <UIDashedBox
          height={this.height} 
          width={this.width}
          text="点击添加卡片"
        />
      );
    }
    return this.wrap(
      <div style={UIIdentificationCard.styles.contents}>
        {this.background()}
        {this.metadata()}
      </div>,
      {
        onMouseOver: this.onMouseOver.bind(this),
        onMouseLeave: this.onMouseLeave.bind(this),
      }
    );
  }

}
