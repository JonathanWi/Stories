var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFD',
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
    marginRight: 25,
    marginLeft: 25,
  },
  body: {
    fontSize: 22,
    textAlign: 'left',
    marginBottom: 25,
    color: '#333',
    fontFamily: 'Georgia',
    lineHeight: 34,
    textAlign: 'justify'
  },
  author: {
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 15,
    fontFamily: 'Avenir',
    marginTop: 25,
    lineHeight: 25,
    letterSpacing : 1
  },
  iconReply: {
    fontSize: 24,
  },
  textReply: {
    fontSize: 18,
    color: '#8C9CA9',
    fontFamily: 'Avenir',
    paddingLeft: 5,
  },
})

module.exports = styles;
