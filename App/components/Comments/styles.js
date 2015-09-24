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
    fontFamily: 'Avenir',
  	fontWeight: 'bold'
  },
  author: {
  	color: '#000',
    fontSize: 18,
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
    fontSize: 24,
  },
  iconText: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Avenir',
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
  },
  modal: {
    height: 500,
    paddingTop: 0
  },
  reply: {
    paddingBottom: 10,
    paddingRight: 25,
    backgroundColor: '#FFF'
  },
  replyAuthor: {
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 10,
    fontFamily: 'Avenir',
    color: '#8C9CA9',
    lineHeight: 25,
    letterSpacing : 1
  },
  replyBody: {
    fontSize: 15,
    textAlign: 'left',
    fontFamily: 'Avenir',
    color: '#333',
  }
})

module.exports = styles;
