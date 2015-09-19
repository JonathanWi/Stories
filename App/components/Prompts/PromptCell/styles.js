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
    fontFamily: 'Avenir',
    color: '#8C9CA9',
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
    fontFamily: 'Avenir',
    color: '#8C9CA9',
    letterSpacing : 1,
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
    marginBottom: 15,
    marginTop: 25,
  }
})

module.exports = styles;
