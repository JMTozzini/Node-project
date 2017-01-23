var React = require('react');
import RaisedButton from 'material-ui/RaisedButton';

class NewProject extends React.Component {
  render() {
    return (
			<RaisedButton
        label={this.props.title}
        primary={true}
			/>
    );
  }
}

NewProject.propTypes = {
  title: React.PropTypes.string
};

module.exports = NewProject;
