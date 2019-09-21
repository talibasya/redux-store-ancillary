"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomId = void 0;

var randomId = function () {
  var prefix = new Array(5).fill(1).map(function () {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }) // random letter
  .join(''); // const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26))

  var uniqid = prefix + Date.now();
  return uniqid;
};

exports.randomId = randomId;