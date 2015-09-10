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
  title: {
    fontSize: 22,
    textAlign: 'left',
    marginTop: 15,
    marginBottom: 4,
    marginRight: 25,
    marginLeft: 25,
    color: '#333',
    fontFamily: 'Times',
    lineHeight: 25
  },
  type: {
    fontSize: 12,
    textAlign: 'left',
    marginBottom: 25,
    marginRight: 10,
    marginLeft: 25,
    color: '#AAAAAA',
    lineHeight: 25,
    letterSpacing : 1
  },
})

module.exports = styles;
