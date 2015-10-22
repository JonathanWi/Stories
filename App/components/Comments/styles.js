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
  	padding: 20
  },
  title: {
  	color: '#FFFFFF',
  	lineHeight: 32,
  	fontSize: 24,
    fontFamily: 'Avenir',
  	fontWeight: 'bold'
  },
  author: {
  	color: '#000',
    fontSize: 12,
    fontFamily: 'Avenir',
  },
  cover: {
    height: 300,
    borderColor: '#FFF',
    borderWidth: 2,
  },
  magnify: {
    fontSize: 12,
    fontFamily: 'Avenir',
    marginTop: 15,
    marginBottom: 15,
    color: '#FFF'
  },
  instructions: {
    color: '#FFF',
    marginLeft: 5
  },
  icon: {
    fontSize: 16,
  },
  iconText: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Avenir',
    paddingLeft: 5
  },
  stats: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  stat: {
    flex: 0, 
    marginRight: 15, 
    opacity:.5
  },
  modal: {
    height: 500,
    paddingTop: 0
  },
  reply: {
    paddingBottom: 10,
    paddingRight: 20,
    backgroundColor: '#FFF'
  },
  replyAuthor: {
    fontSize: 12,
    textAlign: 'left',
    marginBottom: 5,
    fontFamily: 'Avenir',
    color: '#8C9CA9',
    lineHeight: 20,
    letterSpacing : 1
  },
  replyBody: {
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'left',
    fontFamily: 'Avenir',
    color: '#333',
  }
})

module.exports = styles;
