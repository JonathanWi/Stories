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
  },
  cover: {
    height: 300,
    borderColor: '#FFF',
    borderWidth: 2,
  },
  magnify: {
    fontSize: 12,
    marginTop: 15,
    marginBottom: 15,
    color: '#FFF'
  },
  instructions: {
    color: '#FFF',
    marginLeft: 5
  }
})

module.exports = styles;
