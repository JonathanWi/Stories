var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
    marginRight: 25,
    marginLeft: 25,
  },
  title: {
    fontSize: 26,
    textAlign: 'left',
    color: '#333',
    fontFamily: 'Georgia',
    lineHeight: 38,
    marginBottom: 25
  },
  icon: {
    fontSize: 22,
  },
  iconText: {
    fontSize: 16,
    color: '#AAA',
    paddingLeft: 5,
    paddingBottom: 5
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  author: {
    fontSize: 15,
    textAlign: 'left',
    color: '#AAAAAA',
    letterSpacing : 1
  },
  type: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 15,
    marginTop: 25,
  }
})

module.exports = styles;
