export default {
  authIsDisabled: () => {
    console.group();
    console.warn('Authentication is disabled for development purposes');
    console.warn('Change value of REACT_APP_DISABLE_AUTH to change this behaviour');
    console.groupEnd();
  }
};