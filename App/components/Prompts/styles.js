var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FFF',
    flexDirection: 'row'
  },
  row: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height:100,
    borderRadius: 50,
    resizeMode: 'cover'
  }
});

module.exports = styles;
