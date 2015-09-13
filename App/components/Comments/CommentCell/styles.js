var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFD',
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
  },
  body: {
    fontSize: 22,
    textAlign: 'left',
    marginBottom: 25,
    marginRight: 25,
    marginLeft: 25,
    color: '#333',
    fontFamily: 'Times',
    lineHeight: 27,
    textAlign: 'justify'
  },
  author: {
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 15,
    marginTop: 15,
    marginRight: 10,
    marginLeft: 25,
    lineHeight: 25,
    letterSpacing : 1
  },
})

module.exports = styles;
