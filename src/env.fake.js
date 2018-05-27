/**
 * @flow
 */
/**
Rename this file to env.js
**/

const defaults = {};

if (__DEV__) {
  module.exports = {
    ...defaults,
    API_URL: '',
    GOOGLE_MAPS_KEY: '',
    GOOGLE_MAPS_IOS_KEY: '',
    GOOGLE_MAPS_ANDROID_KEY: '',
    CODEPUSH_ENABLED: false,
  };
  // XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  //   ? GLOBAL.originalXMLHttpRequest
  //   : GLOBAL.XMLHttpRequest;
} else {
  module.exports = {
    ...defaults,
    API_URL: '',
    GOOGLE_MAPS_KEY: '',
    GOOGLE_MAPS_IOS_KEY: '',
    GOOGLE_MAPS_ANDROID_KEY: '',
    CODEPUSH_ENABLED: true,
  };
}
