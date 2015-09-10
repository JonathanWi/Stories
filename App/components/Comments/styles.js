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
  	backgroundColor: '#DA552F',
  	padding: 25
  },
  title: {
  	color: '#FFFFFF',
  	lineHeight: 27,
  	fontSize: 18,
  	fontFamily: 'Times'
  },
  author: {
  	marginTop: 15,
  	color: '#8E3420'
  }
})

module.exports = styles;
