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
    marginRight: 20,
    marginLeft: 20,
  },
  body: {
    fontSize: 17.3,
    textAlign: 'left',
    marginBottom: 20,
    color: '#333',
    fontFamily: 'Georgia',
    lineHeight: 30
  },
  author: {
    fontSize: 12,
    textAlign: 'left',
    marginBottom: 10,
    fontFamily: 'Avenir',
    marginTop: 20,
    lineHeight: 20,
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
