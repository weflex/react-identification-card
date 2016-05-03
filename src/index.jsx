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
    rect: {
      borderRadius: '8px',
      transition: 'all .2s ease-in-out'
    },
    specular: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      backgroundSize: '100% 100%',
      borderRadius: '8px',
      transition: 'all .2s ease-in-out',
      WebkitMask: '-webkit-linear-gradient(top, #fff, transparent 80%)',
      // use -webkit-filter's filter function will enable the hardware acceleration for rendering performance
      WebkitFilter: 'opacity(0.5)',
      background: `linear-gradient(
        30deg,
        rgba(255, 255, 255, .7),
        rgba(255, 255, 255, .4) 50%,
        rgba(255, 255, 255, 0) 50.1%) no-repeat`
    }
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
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      fillColor: props.fillColor,
      fillOpacity: props.fillOpacity,
      boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2), 0 0 40px rgba(0, 0, 0, 0.1)',
      backgroundPosition: '0px 0px'
    };
  }

  onMouseOver() {
    this.setState({
      color: '#777777',
      fillOpacity: UIIdentificationCard.defaultProps.fillOpacity - 0.2,
      boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      backgroundPosition: '0px -30px'
    });
  }

  onMouseLeave() {
    this.setState({
      fillOpacity: UIIdentificationCard.defaultProps.fillOpacity,
      boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2), 0 0 40px rgba(0, 0, 0, 0.1)',
      backgroundPosition: '0px 0px'
    });
  }

  background() {
    const rectStyl = Object.assign(
      {},
      UIIdentificationCard.styles.rect,
      {
        width: this.width + 'px',
        height: this.height + 'px',
        background: this.props.color,
        boxShadow: this.state.boxShadow
      });

    const specularStyl = Object.assign(
      {},
      UIIdentificationCard.styles.specular,
      {
        width: this.width + 'px',
        height: this.height + 'px',
        backgroundPosition: this.state.backgroundPosition
      });

    return (
      <div className="background">
        <div style={rectStyl}></div>
        <div style={specularStyl}></div>
      </div>
    );
  }

  metadata() {
    const styl = UIIdentificationCard.styles.metadata;
    return (
      <div style={styl}>
        {this.props.viewMetadata()}
      </div>
    );
  }

  wrap(children, props={}) {
    const style = Object.assign({
      width: this.width,
      height: this.height
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
