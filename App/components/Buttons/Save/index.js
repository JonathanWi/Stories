var React = require('react-native');
var styles = require('./styles.js');

var Icon = require('react-native-vector-icons/Ionicons');

var {
	StyleSheet,
	TouchableHighlight,
	Image,
	View,
} = React;

var SaveButton = React.createClass({

	getInitialState: function() {
		return {
			isSaved : this.props.isSaved
		};
	},

	toggleSave: function() {
		var newState = !this.state.isSaved;
		this.setState({
			isSaved : newState
		});
		this.props.toggleSave();
	},

	render: function() {
		return (
			<View style={styles.rightContainer}>
				<TouchableHighlight underlayColor="transparent" onPress={this.toggleSave}>
					<Icon name={this.state.isSaved ? 'ios-bookmarks' : 'ios-bookmarks-outline'} style={styles.button} />
				</TouchableHighlight>
			</View>
		)
	}


})

module.exports = SaveButton;
