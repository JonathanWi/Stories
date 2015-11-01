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
    fontSize: 22,
    textAlign: 'left',
    color: '#333',
    fontFamily: 'Georgia',
    lineHeight: 34,
    marginBottom: 25
  },
  icon: {
    fontSize: 22,
    flex: 1,
  },
  buttonSave: {
    padding: 0,
    backgroundColor: 'transparent'
  },
  iconTextContainer: {
    flex: 0, 
    marginRight: 15, 
    flexDirection: 'row'
  },
  iconText: {
    fontSize: 16,
    fontFamily: 'Avenir',
    color: '#8C9CA9',
    marginLeft: 5,
    flex: 0
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  author: {
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Avenir',
    color: '#8C9CA9',
    lineHeight: 18
  },
  flair : {
    fontSize: 12, 
    lineHeight:15,
    fontFamily: 'Avenir'
  },
  type: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 12.5,
    marginTop: 25,
  }
})

module.exports = styles;
