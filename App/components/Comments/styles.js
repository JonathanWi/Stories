var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFD',
    flex: 1,
    flexDirection: 'column'
  },
  header: {
  	padding: 25
  },
  title: {
  	color: '#FFFFFF',
  	lineHeight: 30,
  	fontSize: 22,
  	fontWeight: 'bold'
  },
  author: {
  	marginTop: 15,
  	color: '#000'
  }
})

module.exports = styles;
