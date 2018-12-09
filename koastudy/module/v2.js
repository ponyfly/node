'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _module = require('./module1.js');

var _module2 = _interopRequireDefault(_module);

var _fs = require('fs');

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(say);

console.log(_module.a);
console.log(_module.name);
console.log((0, _module.getName)());
console.log(_module2.default);

var readFileAsync = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path) {
    var ff;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _fs.readFile)((0, _path.resolve)(__dirname, path), function (err, data) {
              console.log(JSON.parse(data).name);
            });
            _context.next = 3;
            return _promise2.default.resolve(3);

          case 3:
            ff = _context.sent;

            console.log(ff);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function readFileAsync(_x) {
    return _ref.apply(this, arguments);
  };
}();

readFileAsync('../../package.json');

var arr = [1, 2, 3, 5];

console.log(arr.includes(2));

var newO = (0, _assign2.default)({}, { name: 'zhangsan' });
console.log(newO);

new _set2.default([1, 2, 3]);
console.log('hello'.padStart(5, 'X'));

function say() {
  return _regenerator2.default.wrap(function say$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked, this);
}

var Person = function Person() {
  (0, _classCallCheck3.default)(this, Person);
};
//# sourceMappingURL=index.js.map