var React = require('react');
var AppBarExampleIco = require('./app-bar');

class Layout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body>
					<AppBarExampleIco title={this.props.title}/>
          {this.props.children}
        </body>
      </html>
    );
  }
}

Layout.propTypes = {
  title: React.PropTypes.string
};

module.exports = Layout;
