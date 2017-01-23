import React from 'react';
import AppBar from 'material-ui/AppBar';
var AppBarMenuTest = require('./app-bar-menu');

class AppBarExampleIco extends React.Component {
  render() {
    return (
		  <AppBar
		    title={this.props.title}
		    iconElementLeft={<AppBarMenuTest/>}
		  />
    );
  }
}

AppBarExampleIco.propTypes = {
  title: React.PropTypes.string
};

module.exports = AppBarExampleIco;
