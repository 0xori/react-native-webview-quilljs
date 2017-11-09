/********************************************
 * WebViewQuillViewer.js
 * A Delta viewer suitable for viewing output from a Quill.js
 * editor.  The Delta format is discussed here: https://quilljs.com/docs/delta/
 * This component is useful for applications that must avoid using native code
 *  
 */
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview-messaging/WebView';
import PropTypes from 'prop-types';
import renderIf from 'render-if';

export default class WebViewQuillViewer extends React.Component {
  constructor() {
    super();
    this.state = {
      showActivityIndicator: true // flag to show activity indicator
    };
  }

  sendContentToViewer = (delta) => {
    if (this.props.hasOwnProperty('contentToDisplay')) {
      this.webview.emit('SET_CONTENTS', {
        payload: {
          ops: delta.ops
        }
      });
    }
  };

  webViewLoded=()=>{
    this.setState({showActivityIndicator: false});
  }
  render = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'green'
        }}
      >
        <WebView
          onLoad={this.sendContentToViewer}
          style={{
            flex: 1
          }}
          source={require('./dist/reactQuillViewer-index.html')}
          ref={component => (this.webview = component)}
          onLoad={this.webViewLoded}
        />
        {renderIf(this.state.showActivityIndicator)(
          <View style={styles.activityOverlayStyle}>
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator
                size="large"
                animating={this.state.showActivityIndicator}
                color="blue"
              />
            </View>
          </View>
        )}
      </View>
    );
  };
}

WebViewQuillViewer.propTypes = {
  contentToDisplay: PropTypes.object
};

const styles = StyleSheet.create({
  activityOverlayStyle: {
    ...StyleSheet.absoluteFillObject,
    marginHorizontal: 20,
    marginVertical: 60,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5
  },
  activityIndicatorContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  }
});
