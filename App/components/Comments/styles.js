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
  	lineHeight: 38,
  	fontSize: 26,
  	fontWeight: 'bold'
  },
  author: {
  	color: '#000',
    fontSize: 18,
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
  },
  toastText: {
    color: '#ffffff',
    padding: 15,
    backgroundColor: 'transparent',
    fontSize: 14,
  },
  icon: {
    fontSize: 24,
  },
  iconText: {
    fontSize: 18,
    color: '#000',
    paddingLeft: 5,
    paddingBottom: 6
  },
  stats: {
    flex: 1,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  stat: {
    flex: 0, 
    marginRight: 15, 
    opacity:.5
  }
})

module.exports = styles;
