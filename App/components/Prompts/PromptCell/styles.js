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
    marginRight: 25,
    marginLeft: 25,
  },
  title: {
    fontSize: 22,
    textAlign: 'left',
    marginTop: 25,
    marginBottom: 4,
    color: '#333',
    fontFamily: 'Georgia',
    lineHeight: 34
  },
  type: {
    fontSize: 12,
    marginBottom: 35,
    textAlign: 'left',
    color: '#AAAAAA',
    lineHeight: 25,
    letterSpacing : 1
  },
})

module.exports = styles;
