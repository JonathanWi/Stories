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
  	padding: 20,
    paddingTop: 30
  },
  title: {
    fontSize: 22,
    textAlign: 'left',
    color: '#FFF',
    fontFamily: 'Georgia',
    lineHeight: 34
  },
  author: {
  	color: '#FFF',
    fontSize: 12,
    fontFamily: 'Avenir',
  },
  cover: {
    height: 300,
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
    color: '#FFF',
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
    flexDirection: 'row'
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
