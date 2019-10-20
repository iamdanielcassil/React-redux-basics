export const debug = {
  log: (...args) => {
    if (window.DC.debug.on) {
      console.log(...args);
    }
  }
};

window.DC = window.DC || {};
window.DC.debug = debug;
