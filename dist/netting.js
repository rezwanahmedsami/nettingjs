(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Netting = factory());
})(this, (function () { 'use strict';

  function a() {
      console.log('a');
  }

  function main() {
      console.log('yes working');
  }
  var index = { main: main, a: a };

  return index;

}));
