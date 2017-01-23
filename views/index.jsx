var React = require('react');
var Layout = require('./layout');
var NewProject = require('./new-project');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
var AppBarMenuTest = require('./app-bar-menu');

// Contrived example to show how one might use Flow type annotations
function countTo(n:number):string {
  var a = [];
  for (var i = 0; i < n; i++ ) {
    a.push(i + 1);
  }
  return a.join(', ');
}

class Index extends React.Component {
  render() {
    return (
  		<MuiThemeProvider>
	      <Layout title={this.props.title}>
					<NewProject title={this.props.title}/>
					<AppBarMenuTest/>
	      </Layout>
  		</MuiThemeProvider>
    );
  }
}

Index.propTypes = {
  title: React.PropTypes.string
};

module.exports = Index;
