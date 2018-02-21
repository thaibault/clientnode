
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
'use strict';
/* !
    region header
    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

exports.default = function (callback) {
    var roundTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var closeWindow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (testRan) throw new Error('You have to register your tests immediately after importing the' + ' library.');
    if (!testRegistered) {
        testRegistered = true;
        tests = [];
    }
    tests.push({ callback: callback, closeWindow: closeWindow, roundTypes: roundTypes });
    return tests;
};

var _clientnode = require('clientnode');

var _clientnode2 = _interopRequireDefault(_clientnode);

var _browserAPI = require('weboptimizer/browserAPI.compiled');

var _browserAPI2 = _interopRequireDefault(_browserAPI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChildProcess = void 0;
try {
    ChildProcess = eval('require')('child_process').ChildProcess;
} catch (error) {}
// NOTE: Only needed for debugging this file.
try {
    module.require('source-map-support/register');
} catch (error) {}

// endregion
// region determine technology specific implementations

// endregion
// region types

// endregion
// region declaration
var fileSystem = void 0;
var path = void 0;
var QUnit = void 0;
var removeDirectoryRecursivelySync = void 0;
if (typeof TARGET_TECHNOLOGY === 'undefined' || TARGET_TECHNOLOGY === 'node') {
    require('colors');
    fileSystem = require('fs');
    path = require('path');
    QUnit = require('qunit');
    removeDirectoryRecursivelySync = require('rimraf').sync;
    var errors = [];
    var indention = '';
    var seenTests = new _set2.default();
    QUnit.moduleStart(function (module) {
        if (module.name) {
            indention = '    ';
            console.info(module.name.bold.blue);
        }
    });
    QUnit.log(function (details) {
        if (!details.result) errors.push(details);
    });
    QUnit.testDone(function (details) {
        if (seenTests.has(details.name)) return;
        seenTests.add(details.name);
        if (details.failed) {
            // IgnoreTypeCheck
            console.info((indention + '\u2716 ' + details.name).red);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(errors), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var error = _step.value;

                    if (error.message) console.warn('' + indention + error.message.red);
                    if (typeof error.actual !== 'undefined') console.warn((indention + 'actual: ' + _clientnode2.default.representObject(error.actual, '    ', indention) + (' (' + (0, _typeof3.default)(error.actual) + ') != ') + 'expected: ' + _clientnode2.default.representObject(error.expected, '    ', indention) + (' (' + (0, _typeof3.default)(error.expected) + ')')
                    // IgnoreTypeCheck
                    ).red);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            errors.length = 0;
        } else
            // IgnoreTypeCheck
            console.info((indention + '\u2714 ' + details.name).green);
    });
    var done = function done(details) {
        console.info(
        // IgnoreTypeCheck
        ('Tests completed in ' + details.runtime / 1000 + ' seconds.').grey);
        var message = details.passed + ' tests of ' + details.total + ' passed.';
        if (details.failed > 0)
            // IgnoreTypeCheck
            console.warn((message + ', ' + details.failed + ' failed.').red.bold);else
            // IgnoreTypeCheck
            console.info(('' + message).green.bold);
        process.once('exit', function () {
            return process.exit(details.failed);
        });
    };
    // NOTE: Fixes qunit's ugly multi "done()" calls.
    var finalDoneTimeoutID = null;
    QUnit.done(function () {
        for (var _len = arguments.length, parameter = Array(_len), _key = 0; _key < _len; _key++) {
            parameter[_key] = arguments[_key];
        }

        if (finalDoneTimeoutID) {
            // IgnoreTypeCheck
            clearTimeout(finalDoneTimeoutID);
            finalDoneTimeoutID = null;
        }
        finalDoneTimeoutID = setTimeout(function () {
            finalDoneTimeoutID = setTimeout(function () {
                done.apply(undefined, parameter);
            });
        });
    });
} else QUnit = require('script!qunit') && window.QUnit;
// endregion
// region default test specification
var tests = [{ callback: function callback(roundType, targetTechnology, $, browserAPI, tools, $bodyDomNode) {
        var _this = this;

        this.module('tools (' + roundType + ')');
        // region tests
        // / region public methods
        // // region special
        this.test('constructor (' + roundType + ')', function (assert) {
            return assert.ok(tools);
        });
        this.test('destructor (' + roundType + ')', function (assert) {
            return assert.strictEqual(tools.destructor(), tools);
        });
        this.test('initialize (' + roundType + ')', function (assert) {
            var secondToolsInstance = $.Tools({ logging: true });
            var thirdToolsInstance = $.Tools({
                domNodeSelectorPrefix: 'body.{1} div.{1}' });

            assert.notOk(tools._options.logging);
            assert.ok(secondToolsInstance._options.logging);
            assert.strictEqual(thirdToolsInstance._options.domNodeSelectorPrefix, 'body.tools div.tools');
        });
        // // endregion
        // // region object orientation
        this.test('controller (' + roundType + ')', function (assert) {
            assert.strictEqual(tools.controller(tools, []), tools);
            assert.strictEqual(tools.controller($.Tools.class, [], $('body')).constructor.name, $.Tools.class.name);
        });
        // // endregion
        // // region mutual exclusion
        this.test('acquireLock|releaseLock (' + roundType + ')', function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(assert) {
                var done, testValue;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                done = assert.async();
                                testValue = false;
                                _context3.next = 4;
                                return tools.acquireLock('test', function () {
                                    testValue = true;
                                });

                            case 4:
                                assert.ok(testValue);
                                assert.ok(tools.acquireLock('test', function () {
                                    testValue = false;
                                }) instanceof _promise2.default);
                                assert.ok(testValue);
                                assert.ok($.Tools().releaseLock('test') instanceof _promise2.default);
                                assert.ok(testValue);
                                assert.ok(tools.releaseLock('test') instanceof _promise2.default);
                                assert.notOk(testValue);
                                assert.ok(tools.releaseLock('test') instanceof _promise2.default);
                                assert.notOk(testValue);
                                _context3.next = 15;
                                return tools.acquireLock('test', function () {
                                    testValue = true;
                                });

                            case 15:
                                assert.ok(testValue);
                                assert.ok(tools.acquireLock('test', function () {
                                    testValue = false;
                                }) instanceof _promise2.default);
                                assert.ok(testValue);
                                assert.ok(tools.acquireLock('test', function () {
                                    testValue = true;
                                }) instanceof _promise2.default);
                                assert.ok(testValue);
                                tools.releaseLock('test');
                                assert.notOk(testValue);
                                tools.releaseLock('test');
                                assert.ok(testValue);
                                tools.acquireLock('test').then(function () {
                                    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(result) {
                                        return _regenerator2.default.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        assert.strictEqual(result, 'test');
                                                        $.Tools.class.timeout(function () {
                                                            return tools.releaseLock('test');
                                                        });
                                                        _context2.next = 4;
                                                        return tools.acquireLock('test');

                                                    case 4:
                                                        result = _context2.sent;

                                                        assert.strictEqual(result, 'test');
                                                        $.Tools.class.timeout(function () {
                                                            return tools.releaseLock('test');
                                                        });
                                                        _context2.next = 9;
                                                        return tools.acquireLock('test', function () {
                                                            return new _promise2.default(function () {
                                                                var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(resolve) {
                                                                    return _regenerator2.default.wrap(function _callee$(_context) {
                                                                        while (1) {
                                                                            switch (_context.prev = _context.next) {
                                                                                case 0:
                                                                                    _context.next = 2;
                                                                                    return $.Tools.class.timeout();

                                                                                case 2:
                                                                                    testValue = false;
                                                                                    resolve(testValue);

                                                                                case 4:
                                                                                case 'end':
                                                                                    return _context.stop();
                                                                            }
                                                                        }
                                                                    }, _callee, _this);
                                                                }));

                                                                return function (_x3) {
                                                                    return _ref3.apply(this, arguments);
                                                                };
                                                            }());
                                                        });

                                                    case 9:
                                                        result = _context2.sent;

                                                        assert.notOk(testValue);
                                                        done();

                                                    case 12:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this);
                                    }));

                                    return function (_x2) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }());
                                tools.releaseLock('test');

                            case 26:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }());
        this.test('getSemaphore (' + roundType + ')', function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(assert) {
                var semaphore;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                semaphore = $.Tools.class.getSemaphore(2);

                                assert.strictEqual(semaphore.queue.length, 0);
                                assert.strictEqual(semaphore.numberOfFreeResources, 2);
                                assert.strictEqual(semaphore.numberOfResources, 2);
                                _context4.next = 6;
                                return semaphore.acquire();

                            case 6:
                                assert.strictEqual(semaphore.queue.length, 0);
                                assert.strictEqual(semaphore.numberOfFreeResources, 1);
                                assert.strictEqual(semaphore.numberOfResources, 2);
                                _context4.next = 11;
                                return semaphore.acquire();

                            case 11:
                                assert.strictEqual(semaphore.queue.length, 0);
                                assert.strictEqual(semaphore.numberOfFreeResources, 0);
                                semaphore.acquire();
                                assert.strictEqual(semaphore.queue.length, 1);
                                assert.strictEqual(semaphore.numberOfFreeResources, 0);
                                semaphore.acquire();
                                assert.strictEqual(semaphore.queue.length, 2);
                                assert.strictEqual(semaphore.numberOfFreeResources, 0);
                                semaphore.release();
                                assert.strictEqual(semaphore.queue.length, 1);
                                assert.strictEqual(semaphore.numberOfFreeResources, 0);
                                semaphore.release();
                                assert.strictEqual(semaphore.queue.length, 0);
                                assert.strictEqual(semaphore.numberOfFreeResources, 0);
                                semaphore.release();
                                assert.strictEqual(semaphore.queue.length, 0);
                                assert.strictEqual(semaphore.numberOfFreeResources, 1);
                                semaphore.release();
                                assert.strictEqual(semaphore.queue.length, 0);
                                assert.strictEqual(semaphore.numberOfFreeResources, 2);
                                semaphore.release();
                                assert.strictEqual(semaphore.queue.length, 0);
                                assert.strictEqual(semaphore.numberOfFreeResources, 3);

                            case 34:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this);
            }));

            return function (_x4) {
                return _ref4.apply(this, arguments);
            };
        }());
        // // endregion
        // // region boolean
        this.test('isNumeric (' + roundType + ')', function (assert) {
            var _arr = [0, 1, '-10', '0', 0xFF, '0xFF', '8e5', '3.1415', +10];

            for (var _i = 0; _i < _arr.length; _i++) {
                var test = _arr[_i];
                assert.ok($.Tools.class.isNumeric(test));
            }var _arr2 = [null, undefined, false, true, '', 'a', {}, /a/, '-0x42', '7.2acdgs', NaN, Infinity];
            for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
                var _test = _arr2[_i2];
                assert.notOk($.Tools.class.isNumeric(_test));
            }
        });
        this.test('isWindow (' + roundType + ')', function (assert) {
            assert.ok($.Tools.class.isWindow(browserAPI.window));
            var _arr3 = [null, {}, browserAPI];
            for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
                var test = _arr3[_i3];
                assert.notOk($.Tools.class.isWindow(test));
            }
        });
        this.test('isArrayLike (' + roundType + ')', function (assert) {
            var _arr4 = [[], window.document.querySelectorAll('*')];

            for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
                var test = _arr4[_i4];
                assert.ok($.Tools.class.isArrayLike(test));
            }var _arr5 = [{}, null, undefined, false, true, /a/];
            for (var _i5 = 0; _i5 < _arr5.length; _i5++) {
                var _test2 = _arr5[_i5];
                assert.notOk($.Tools.class.isArrayLike(_test2));
            }
        });
        this.test('isAnyMatching (' + roundType + ')', function (assert) {
            var _arr6 = [['', ['']], ['test', [/test/]], ['test', [/a/, /b/, /es/]], ['test', ['', 'test']]];

            for (var _i6 = 0; _i6 < _arr6.length; _i6++) {
                var _$$Tools$class;

                var test = _arr6[_i6];
                assert.ok((_$$Tools$class = $.Tools.class).isAnyMatching.apply(_$$Tools$class, (0, _toConsumableArray3.default)(test)));
            }var _arr7 = [['', []], ['test', [/tes$/]], ['test', [/^est/]], ['test', [/^est$/]], ['test', ['a']]];
            for (var _i7 = 0; _i7 < _arr7.length; _i7++) {
                var _$$Tools$class2;

                var _test3 = _arr7[_i7];
                assert.notOk((_$$Tools$class2 = $.Tools.class).isAnyMatching.apply(_$$Tools$class2, (0, _toConsumableArray3.default)(_test3)));
            }
        });
        this.test('isPlainObject (' + roundType + ')', function (assert) {
            var _arr8 = [{}, { a: 1 },
            /* eslint-disable no-new-object */
            new Object()
            /* eslint-enable no-new-object */
            ];

            for (var _i8 = 0; _i8 < _arr8.length; _i8++) {
                var okValue = _arr8[_i8];
                assert.ok($.Tools.class.isPlainObject(okValue));
            }var _arr9 = [new String(), Object, null, 0, 1, true, undefined];
            for (var _i9 = 0; _i9 < _arr9.length; _i9++) {
                var notOkValue = _arr9[_i9];
                assert.notOk($.Tools.class.isPlainObject(notOkValue));
            }
        });
        this.test('isFunction (' + roundType + ')', function (assert) {
            var _arr10 = [Object, new Function('return 1'), function () {}, function () {}];

            for (var _i10 = 0; _i10 < _arr10.length; _i10++) {
                var okValue = _arr10[_i10];
                assert.ok($.Tools.class.isFunction(okValue));
            }var _arr11 = [null, false, 0, 1, undefined, {}, new Boolean()];
            for (var _i11 = 0; _i11 < _arr11.length; _i11++) {
                var notOkValue = _arr11[_i11];
                assert.notOk($.Tools.class.isFunction(notOkValue));
            }
        });
        // // endregion
        // // region language fixes
        this.test('mouseOutEventHandlerFix (' + roundType + ')', function (assert) {
            return assert.ok($.Tools.class.mouseOutEventHandlerFix(function () {}));
        });
        // // endregion
        // // region logging
        this.test('log (' + roundType + ')', function (assert) {
            return assert.strictEqual(tools.log('test'), tools);
        });
        this.test('info (' + roundType + ')', function (assert) {
            return assert.strictEqual(tools.info('test {0}'), tools);
        });
        this.test('debug (' + roundType + ')', function (assert) {
            return assert.strictEqual(tools.debug('test'), tools);
        });
        // NOTE: This test breaks javaScript modules in strict mode.
        this.skip(roundType + '-error', function (assert) {
            return assert.strictEqual(tools.error('ignore this error, it is only a {1}', 'test'), tools);
        });
        this.test('warn (' + roundType + ')', function (assert) {
            return assert.strictEqual(tools.warn('test'), tools);
        });
        this.test('show (' + roundType + ')', function (assert) {
            var _arr12 = [[1, '1 (Type: "number")'], [null, 'null (Type: "null")'], [/a/, '/a/ (Type: "regexp")'], ['hans', 'hans (Type: "string")'], [{ A: 'a', B: 'b' }, 'A: a (Type: "string")\nB: b (Type: "string")']];

            for (var _i12 = 0; _i12 < _arr12.length; _i12++) {
                var test = _arr12[_i12];
                assert.strictEqual($.Tools.class.show(test[0]), test[1]);
            }assert.ok(new RegExp(
            /* eslint-disable no-control-regex */
            '^(.|\n|\r|\\u2028|\\u2029)+\\(Type: "function"\\)$'
            /* eslint-enable no-control-regex */
            ).test($.Tools.class.show($.Tools)));
        });
        // // endregion
        // // region dom node handling
        if (roundType === 'full') {
            // region getter
            this.test('get normalizedClassNames (' + roundType + ')', function (assert) {
                assert.strictEqual($('<div>').Tools('normalizedClassNames').$domNode.prop('outerHTML'), $('<div>').prop('outerHTML'));
                assert.strictEqual($('<div class>').Tools('normalizedClassNames').$domNode.html(), $('<div>').html());
                assert.strictEqual($('<div class="">').Tools('normalizedClassNames').$domNode.html(), $('<div>').html());
                assert.strictEqual($('<div class="a">').Tools('normalizedClassNames').$domNode.prop('outerHTML'), $('<div class="a">').prop('outerHTML'));
                assert.strictEqual($('<div class="b a">').Tools('normalizedClassNames').$domNode.prop('outerHTML'), $('<div class="a b">').prop('outerHTML'));
                assert.strictEqual($('<div class="b a"><pre class="c b a"></pre></div>').Tools('normalizedClassNames').$domNode.prop('outerHTML'), $('<div class="a b"><pre class="a b c"></pre></div>').prop('outerHTML'));
            });
            this.test('get normalizedStyles (' + roundType + ')', function (assert) {
                assert.strictEqual($('<div>').Tools('normalizedStyles').$domNode.prop('outerHTML'), $('<div>').prop('outerHTML'));
                assert.strictEqual($('<div style>').Tools('normalizedStyles').$domNode.html(), $('<div>').html());
                assert.strictEqual($('<div style="">').Tools('normalizedStyles').$domNode.html(), $('<div>').html());
                assert.strictEqual($('<div style="border: 1px solid  red ;">').Tools('normalizedStyles').$domNode.prop('outerHTML'), $('<div style="border:1px solid red">').prop('outerHTML'));
                assert.strictEqual($('<div style="width: 50px;height: 100px;">').Tools('normalizedStyles').$domNode.prop('outerHTML'), $('<div style="height:100px;width:50px">').prop('outerHTML'));
                assert.strictEqual($('<div style=";width: 50px ; height:100px">').Tools('normalizedStyles').$domNode.prop('outerHTML'), $('<div style="height:100px;width:50px">').prop('outerHTML'));
                assert.strictEqual($('<div style="width:10px;height:50px">' + '    <pre style=";;width:2px;height:1px; color: red; ">' + '</pre>' + '</div>').Tools('normalizedStyles').$domNode.prop('outerHTML'), $('<div style="height:50px;width:10px">' + '    <pre style="color:red;height:1px;width:2px"></pre>' + '</div>').prop('outerHTML'));
            });
            this.test('get style (' + roundType + ')', function (assert) {
                var _arr13 = [['<span>', {}], ['<span>hans</span>', {}], ['<span style="display:block"></span>', { display: 'block' }], ['<span style="display:block;float:left"></span>', {
                    display: 'block', float: 'left'
                }]];

                for (var _i13 = 0; _i13 < _arr13.length; _i13++) {
                    var test = _arr13[_i13];
                    var $domNode = $(test[0]);
                    $bodyDomNode.append($domNode);
                    var styles = $domNode.Tools('style');
                    for (var propertyName in test[1]) {
                        if (test[1].hasOwnProperty(propertyName)) {
                            assert.ok(styles.hasOwnProperty(propertyName));
                            assert.strictEqual(styles[propertyName], test[1][propertyName]);
                        }
                    }$domNode.remove();
                }
            });
            this.test('get text (' + roundType + ')', function (assert) {
                var _arr14 = [['<div>', ''], ['<div>hans</div>', 'hans'], ['<div><div>hans</div</div>', ''], ['<div>hans<div>peter</div></div>', 'hans']];

                for (var _i14 = 0; _i14 < _arr14.length; _i14++) {
                    var test = _arr14[_i14];
                    assert.strictEqual($(test[0]).Tools('text'), test[1]);
                }
            });
            // endregion
            this.test('isEquivalentDOM (' + roundType + ')', function (assert) {
                var _arr15 = [['test', 'test'], ['test test', 'test test'], ['<div>', '<div>'], ['<div class>', '<div>'], ['<div class="">', '<div>'], ['<div style>', '<div>'], ['<div style="">', '<div>'], ['<div></div>', '<div>'], ['<div class="a"></div>', '<div class="a"></div>'], [$('<a target="_blank" class="a"></a>'), '<a class="a" target="_blank"></a>'], ['<a target="_blank" class="a"></a>', '<a class="a" target="_blank"></a>'], ['<a target="_blank" class="a"><div b="3" a="2"></div></a>', '<a class="a" target="_blank"><div a="2" b="3">' + '</div></a>'], ['<a target="_blank" class="b a">' + '   <div b="3" a="2"></div>' + '</a>', '<a class="a b" target="_blank">' + '   <div a="2" b="3"></div>' + '</a>'], ['<div>a</div><div>b</div>', '<div>a</div><div>b</div>'], ['<div>a</div>b', '<div>a</div>b'], ['<br>', '<br />'], ['<div><br><br /></div>', '<div><br /><br /></div>'], [' <div style="">' + 'german<!--deDE--><!--enUS: english --> </div>', ' <div style="">german<!--deDE--><!--enUS: english --> ' + '</div>'], ['a<br>', 'a<br />', true]];

                for (var _i15 = 0; _i15 < _arr15.length; _i15++) {
                    var _$$Tools$class3;

                    var test = _arr15[_i15];
                    assert.ok((_$$Tools$class3 = $.Tools.class).isEquivalentDOM.apply(_$$Tools$class3, (0, _toConsumableArray3.default)(test)));
                }var _arr16 = [['test', ''], ['test', 'hans'], ['test test', 'testtest'], ['test test:', ''], ['<div class="a"></div>', '<div>'], [$('<a class="a"></a>'), '<a class="a" target="_blank"></a>'], ['<a target="_blank" class="a"><div a="2"></div></a>', '<a class="a" target="_blank"></a>'], ['<div>a</div>b', '<div>a</div>c'], [' <div>a</div>', '<div>a</div>'], ['<div>a</div><div>bc</div>', '<div>a</div><div>b</div>'], ['text', 'text a'], ['text', 'text a'], ['text', 'text a & +']];
                for (var _i16 = 0; _i16 < _arr16.length; _i16++) {
                    var _$$Tools$class4;

                    var _test4 = _arr16[_i16];
                    assert.notOk((_$$Tools$class4 = $.Tools.class).isEquivalentDOM.apply(_$$Tools$class4, (0, _toConsumableArray3.default)(_test4)));
                }
            });
        }
        if (roundType === 'full') this.test('getPositionRelativeToViewport (' + roundType + ')', function (assert) {
            return assert.ok(['above', 'left', 'right', 'below', 'in'].includes(tools.getPositionRelativeToViewport()));
        });
        this.test('generateDirectiveSelector (' + roundType + ')', function (assert) {
            var _arr17 = [['a-b', 'a-b, .a-b, [a-b], [data-a-b], [x-a-b], [a\\:b], [a_b]'], ['aB', 'a-b, .a-b, [a-b], [data-a-b], [x-a-b], [a\\:b], [a_b]'], ['a', 'a, .a, [a], [data-a], [x-a]'], ['aa', 'aa, .aa, [aa], [data-aa], [x-aa]'], ['aaBB', 'aa-bb, .aa-bb, [aa-bb], [data-aa-bb], [x-aa-bb], [aa\\:bb],' + ' [aa_bb]'], ['aaBbCcDd', 'aa-bb-cc-dd, .aa-bb-cc-dd, [aa-bb-cc-dd], ' + '[data-aa-bb-cc-dd], [x-aa-bb-cc-dd], ' + '[aa\\:bb\\:cc\\:dd], [aa_bb_cc_dd]'], ['mceHREF', 'mce-href, .mce-href, [mce-href], [data-mce-href], ' + '[x-mce-href], [mce\\:href], [mce_href]']];

            for (var _i17 = 0; _i17 < _arr17.length; _i17++) {
                var test = _arr17[_i17];
                assert.strictEqual($.Tools.class.generateDirectiveSelector(test[0]), test[1]);
            }
        });
        if (roundType === 'full') this.test('removeDirective (' + roundType + ')', function (assert) {
            var $localBodyDomNode = $bodyDomNode.Tools('removeDirective', 'a');
            assert.equal($localBodyDomNode.Tools().removeDirective('a'), $localBodyDomNode);
        });
        this.test('getNormalizedDirectiveName (' + roundType + ')', function (assert) {
            var _arr18 = [['data-a', 'a'], ['x-a', 'a'], ['data-a-bb', 'aBb'], ['x:a:b', 'aB']];

            for (var _i18 = 0; _i18 < _arr18.length; _i18++) {
                var test = _arr18[_i18];
                assert.equal($.Tools.class.getNormalizedDirectiveName(test[0]), test[1]);
            }
        });
        if (roundType === 'full') this.test('getDirectiveValue (' + roundType + ')', function (assert) {
            return assert.equal($('body').Tools('getDirectiveValue', 'a'), null);
        });
        this.test('sliceDomNodeSelectorPrefix (' + roundType + ')', function (assert) {
            assert.strictEqual(tools.sliceDomNodeSelectorPrefix('body div'), 'div');
            assert.strictEqual($.Tools({
                domNodeSelectorPrefix: 'body div'
            }).sliceDomNodeSelectorPrefix('body div'), '');
            assert.strictEqual($.Tools({
                domNodeSelectorPrefix: ''
            }).sliceDomNodeSelectorPrefix('body div'), 'body div');
        });
        this.test('getDomNodeName (' + roundType + ')', function (assert) {
            var _arr19 = [['div', 'div'], ['<div>', 'div'], ['<div />', 'div'], ['<div></div>', 'div'], ['a', 'a'], ['<a>', 'a'], ['<a />', 'a'], ['<a></a>', 'a']];

            for (var _i19 = 0; _i19 < _arr19.length; _i19++) {
                var test = _arr19[_i19];
                assert.strictEqual($.Tools.class.getDomNodeName(test[0]), test[1]);
            }
        });
        if (roundType === 'full') this.test('grabDomNode (' + roundType + ')', function (assert) {
            var _arr20 = [[[{
                qunit: 'body div#qunit',
                qunitFixture: 'body div#qunit-fixture'
            }], {
                qunit: $('body div#qunit'),
                qunitFixture: $('body div#qunit-fixture'),
                parent: $('body')
            }], [[{
                qunit: 'div#qunit',
                qunitFixture: 'div#qunit-fixture'
            }], {
                parent: $('body'),
                qunit: $('body div#qunit'),
                qunitFixture: $('body div#qunit-fixture')
            }], [[{
                qunit: 'div#qunit',
                qunitFixture: 'div#qunit-fixture'
            }, 'body'], {
                parent: $('body'),
                qunit: $('body').find('div#qunit'),
                qunitFixture: $('body').find('div#qunit-fixture')
            }]];

            for (var _i20 = 0; _i20 < _arr20.length; _i20++) {
                var test = _arr20[_i20];
                var $domNodes = tools.grabDomNode.apply(tools, (0, _toConsumableArray3.default)(test[0]));
                delete $domNodes.window;
                delete $domNodes.document;
                assert.deepEqual($domNodes, test[1]);
            }
        });
        // // endregion
        // // region scope
        this.test('isolateScope (' + roundType + ')', function (assert) {
            assert.deepEqual($.Tools.class.isolateScope({}), {});
            assert.deepEqual($.Tools.class.isolateScope({ a: 2 }), { a: 2 });
            assert.deepEqual($.Tools.class.isolateScope({
                a: 2, b: { a: [1, 2] }
            }), { a: 2, b: { a: [1, 2] } });
            var scope = function scope() {
                this.a = 2;
            };
            scope.prototype = { b: 2, _a: 5 };
            scope = new scope();
            assert.deepEqual($.Tools.class.isolateScope(scope, ['_']), {
                _a: 5, a: 2, b: undefined
            });
            scope.b = 3;
            assert.deepEqual($.Tools.class.isolateScope(scope, ['_']), { _a: 5, a: 2, b: 3 });
            assert.deepEqual($.Tools.class.isolateScope(scope), {
                _a: undefined, a: 2, b: 3 });
            scope._a = 6;
            assert.deepEqual($.Tools.class.isolateScope(scope, ['_']), { _a: 6, a: 2, b: 3 });
            scope = function scope() {
                this.a = 2;
            };
            scope.prototype = { b: 3 };
            assert.deepEqual($.Tools.class.isolateScope(new scope(), ['b']), { a: 2, b: 3 });
            assert.deepEqual($.Tools.class.isolateScope(new scope()), {
                a: 2, b: undefined
            });
        });
        this.test('determineUniqueScopeName (' + roundType + ')', function (assert) {
            assert.ok($.Tools.class.determineUniqueScopeName().startsWith('callback'));
            assert.ok($.Tools.class.determineUniqueScopeName('hans').startsWith('hans'));
            assert.ok($.Tools.class.determineUniqueScopeName('hans', '', {}).startsWith('hans'));
            assert.strictEqual($.Tools.class.determineUniqueScopeName('hans', '', {}, 'peter'), 'peter');
            assert.ok($.Tools.class.determineUniqueScopeName('hans', '', { peter: 2 }, 'peter').startsWith('hans'));
            var name = $.Tools.class.determineUniqueScopeName('hans', 'klaus', { peter: 2 }, 'peter');
            assert.ok(name.startsWith('hans'));
            assert.ok(name.endsWith('klaus'));
            assert.ok(name.length > 'hans'.length + 'klaus'.length);
        });
        // // endregion
        // // region function handling
        this.test('getParameterNames (' + roundType + ')', function (assert) {
            var _arr21 = [[function () {}, []], ['function() {}', []], ['function(a, /* asd*/ b, c/**/) {}', ['a', 'b', 'c']], ['(a, /*asd*/b, c/**/) => {}', ['a', 'b', 'c']], ['(a, /*asd*/b, c/**/) => {\n                return 2\n            }', ['a', 'b', 'c']], ['(a, /* asd*/b, c/* */) => 2', ['a', 'b', 'c']], ['(a, /* asd*/b = 2, c/* */) => 2', ['a', 'b', 'c']], ['a => 2', ['a']], ['class A {\n                constructor(a, b, c) {}\n                a() {}\n            }', ['a', 'b', 'c']]];

            for (var _i21 = 0; _i21 < _arr21.length; _i21++) {
                var test = _arr21[_i21];
                assert.deepEqual($.Tools.class.getParameterNames(test[0]), test[1]);
            }
        });
        this.test('identity (' + roundType + ')', function (assert) {
            var _arr22 = [[2, 2], ['', ''], [undefined, undefined], [null, null], ['hans', 'hans']];

            for (var _i22 = 0; _i22 < _arr22.length; _i22++) {
                var test = _arr22[_i22];
                assert.strictEqual($.Tools.class.identity(test[0]), test[1]);
            }assert.ok($.Tools.class.identity({}) !== {});
            var testObject = {};
            assert.strictEqual($.Tools.class.identity(testObject), testObject);
        });
        this.test('invertArrayFilter (' + roundType + ')', function (assert) {
            assert.deepEqual($.Tools.class.invertArrayFilter($.Tools.class.arrayDeleteEmptyItems)([{ a: null }]), [{ a: null }]);
            assert.deepEqual($.Tools.class.invertArrayFilter($.Tools.class.arrayExtractIfMatches)(['a', 'b'], '^a$'), ['b']);
        });
        this.test('timeout (' + roundType + ')', function () {
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(assert) {
                var done, test, result, test2;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                done = assert.async();
                                _context5.t0 = assert;
                                _context5.next = 4;
                                return $.Tools.class.timeout();

                            case 4:
                                _context5.t1 = _context5.sent;

                                _context5.t0.notOk.call(_context5.t0, _context5.t1);

                                _context5.t2 = assert;
                                _context5.next = 9;
                                return $.Tools.class.timeout(0);

                            case 9:
                                _context5.t3 = _context5.sent;

                                _context5.t2.notOk.call(_context5.t2, _context5.t3);

                                _context5.t4 = assert;
                                _context5.next = 14;
                                return $.Tools.class.timeout(1);

                            case 14:
                                _context5.t5 = _context5.sent;

                                _context5.t4.notOk.call(_context5.t4, _context5.t5);

                                assert.ok($.Tools.class.timeout() instanceof _promise2.default);
                                assert.ok($.Tools.class.timeout().hasOwnProperty('clear'));
                                test = false;
                                result = $.Tools.class.timeout(Math.pow(10, 20), true);

                                result.catch(function () {
                                    test = true;
                                });
                                // IgnoreTypeCheck
                                result.clear();
                                test2 = false;
                                _context5.t6 = assert;
                                _context5.next = 26;
                                return $.Tools.class.timeout(function () {
                                    test2 = true;
                                });

                            case 26:
                                _context5.t7 = _context5.sent;

                                _context5.t6.notOk.call(_context5.t6, _context5.t7);

                                assert.ok(test);
                                assert.ok(test2);
                                done();

                            case 31:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, _this);
            }));

            return function (_x5) {
                return _ref5.apply(this, arguments);
            };
        }());
        // // endregion
        // // region event
        this.test('debounce (' + roundType + ')', function (assert) {
            var testValue = false;
            $.Tools.class.debounce(function () {
                testValue = true;
            })();
            assert.ok(testValue);
            var callback = $.Tools.class.debounce(function () {
                testValue = !testValue;
            }, 1000);
            callback();
            callback();
            assert.notOk(testValue);
        });
        this.test('fireEvent (' + roundType + ')', function (assert) {
            assert.strictEqual($.Tools({ onClick: function onClick() {
                    return 2;
                } }).fireEvent('click', true), 2);
            assert.notOk($.Tools({ onClick: function onClick() {
                    return false;
                } }).fireEvent('click', true));
            assert.ok(tools.fireEvent('click'));
            tools.onClick = function () {
                return 3;
            };
            assert.strictEqual(tools.fireEvent('click'), true);
            assert.strictEqual(tools.fireEvent('click', true), true);
        });
        if (roundType === 'full') {
            this.test('on (' + roundType + ')', function (assert) {
                var testValue = false;
                assert.strictEqual(tools.on('body', 'click', function () {
                    testValue = true;
                })[0], $('body')[0]);

                $('body').trigger('click');
                assert.ok(testValue);
            });
            this.test('off (' + roundType + ')', function (assert) {
                var testValue = false;
                assert.strictEqual(tools.on('body', 'click', function () {
                    testValue = true;
                })[0], $('body')[0]);
                assert.strictEqual(tools.off('body', 'click')[0], $('body')[0]);

                $('body').trigger('click');
                assert.notOk(testValue);
            });
        }
        // // endregion
        // // region object
        this.test('addDynamicGetterAndSetter (' + roundType + ')', function (assert) {
            assert.strictEqual($.Tools.class.addDynamicGetterAndSetter(null), null);
            assert.strictEqual($.Tools.class.addDynamicGetterAndSetter(true), true);
            assert.deepEqual($.Tools.class.addDynamicGetterAndSetter({ a: 2 }), { a: 2 });
            assert.notOk($.Tools.class.addDynamicGetterAndSetter({}).__target__ instanceof Object);
            assert.ok($.Tools.class.addDynamicGetterAndSetter({}, function (value) {
                return value;
            }).__target__ instanceof Object);
            var mockup = {};
            assert.strictEqual($.Tools.class.addDynamicGetterAndSetter(mockup), mockup);
            assert.strictEqual($.Tools.class.addDynamicGetterAndSetter(mockup, function (value) {
                return value;
            }).__target__, mockup);
            assert.deepEqual($.Tools.class.addDynamicGetterAndSetter({ a: 1 }, function (value) {
                return value + 2;
            }).a, 3);
            assert.deepEqual($.Tools.class.addDynamicGetterAndSetter({ a: { a: 1 } }, function (value) {
                return value instanceof Object ? value : value + 2;
            }).a.a, 3);
            assert.deepEqual($.Tools.class.addDynamicGetterAndSetter({ a: { a: [{
                        a: 1
                    }] } }, function (value) {
                return value instanceof Object ? value : value + 2;
            }).a.a[0].a, 3);
            assert.deepEqual($.Tools.class.addDynamicGetterAndSetter({ a: { a: 1 } }, function (value) {
                return value instanceof Object ? value : value + 2;
            }, null, { has: 'hasOwnProperty' }, false).a.a, 1);
            assert.deepEqual($.Tools.class.addDynamicGetterAndSetter({ a: 1 }, function (value) {
                return value instanceof Object ? value : value + 2;
            }, null, { has: 'hasOwnProperty' }, false, []).a, 1);
            assert.deepEqual($.Tools.class.addDynamicGetterAndSetter({ a: new _map2.default([['a', 1]]) }, function (value) {
                return value instanceof Object ? value : value + 2;
            }, null, { delete: 'delete', get: 'get', set: 'set', has: 'has' }, true, [_map2.default]).a.a, 3);
        });
        this.test('convertCircularObjectToJSON (' + roundType + ')', function (assert) {
            var testObject1 = {};
            var testObject2 = { a: testObject1 };
            testObject1.a = testObject2;
            var _arr23 = [[{}, '{}'], [{ a: null }, '{"a":null}'], [{ a: { a: 2 } }, '{"a":{"a":2}}'], [{ a: { a: Infinity } }, '{"a":{"a":null}}'], [testObject1, '{"a":{"a":"__circularReference__"}}']];
            for (var _i23 = 0; _i23 < _arr23.length; _i23++) {
                var test = _arr23[_i23];
                assert.deepEqual($.Tools.class.convertCircularObjectToJSON(test[0]), test[1]);
            }
        });
        this.test('convertMapToPlainObject (' + roundType + ')', function (assert) {
            var _arr24 = [[[null], null], [[true], true], [[0], 0], [[2], 2], [['a'], 'a'], [[new _map2.default()], {}], [[[new _map2.default()]], [{}]], [[[new _map2.default()], false], [new _map2.default()]], [[[new _map2.default([['a', 2], [2, 2]])]], [{ a: 2, '2': 2 }]], [[[new _map2.default([['a', new _map2.default()], [2, 2]])]], [{ a: {}, '2': 2 }]], [[[new _map2.default([['a', new _map2.default([['a', 2]])], [2, 2]])]], [{ a: { a: 2 }, '2': 2 }]]];

            for (var _i24 = 0; _i24 < _arr24.length; _i24++) {
                var _$$Tools$class5;

                var test = _arr24[_i24];
                assert.deepEqual((_$$Tools$class5 = $.Tools.class).convertMapToPlainObject.apply(_$$Tools$class5, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('convertPlainObjectToMap (' + roundType + ')', function (assert) {
            var _arr25 = [[[null], null], [[true], true], [[0], 0], [[2], 2], [['a'], 'a'], [[{}], new _map2.default()], [[[{}]], [new _map2.default()]], [[[{}], false], [{}]], [[[{ a: {}, b: 2 }]], [new _map2.default([['a', new _map2.default()], ['b', 2]])]], [[[{ b: 2, a: {} }]], [new _map2.default([['a', new _map2.default()], ['b', 2]])]], [[[{ b: 2, a: new _map2.default() }]], [new _map2.default([['a', new _map2.default()], ['b', 2]])]], [[[{ b: 2, a: [{}] }]], [new _map2.default([['a', [new _map2.default()]], ['b', 2]])]], [[[{ b: 2, a: new _set2.default([{}]) }]], [new _map2.default([['a', new _set2.default([new _map2.default()])], ['b', 2]])]]];

            for (var _i25 = 0; _i25 < _arr25.length; _i25++) {
                var _$$Tools$class6;

                var test = _arr25[_i25];
                assert.deepEqual((_$$Tools$class6 = $.Tools.class).convertPlainObjectToMap.apply(_$$Tools$class6, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('convertSubstringInPlainObject (' + roundType + ')', function (assert) {
            var _arr26 = [[{}, /a/, '', {}], [{ a: 'a' }, /a/, 'b', { a: 'b' }], [{ a: 'aa' }, /a/, 'b', { a: 'ba' }], [{ a: 'aa' }, /a/g, 'b', { a: 'bb' }], [{ a: { a: 'aa' } }, /a/g, 'b', { a: { a: 'bb' } }]];

            for (var _i26 = 0; _i26 < _arr26.length; _i26++) {
                var test = _arr26[_i26];
                assert.deepEqual($.Tools.class.convertSubstringInPlainObject(test[0], test[1], test[2]), test[3]);
            }
        });
        this.test('copy (' + roundType + ')', function (assert) {
            var _arr27 = [[[21], 21], [[0, -1], 0], [[0, 1], 0], [[0, 10], 0], [[new Date(0)], new Date(0)], [[/a/], /a/], [[{}], {}], [[{}, -1], {}], [[[]], []], [[new _map2.default(), -1], new _map2.default()], [[new _set2.default(), -1], new _set2.default()], [[{ a: 2 }, 0], { a: 2 }], [[{ a: { a: 2 } }, 0], { a: null }], [[{ a: { a: 2 } }, 1], { a: { a: 2 } }], [[{ a: { a: 2 } }, 2], { a: { a: 2 } }], [[{ a: [{ a: 2 }] }, 1], { a: [null] }], [[{ a: [{ a: 2 }] }, 2], { a: [{ a: 2 }] }], [[{ a: { a: 2 } }, 10], { a: { a: 2 } }], [[new _map2.default([['a', 2]]), 0], new _map2.default([['a', 2]])], [[new _map2.default([['a', new _map2.default([['a', 2]])]]), 0], new _map2.default([['a', null]])], [[new _map2.default([['a', new _map2.default([['a', 2]])]]), 1], new _map2.default([['a', new _map2.default([['a', 2]])]])], [[new _map2.default([['a', new _map2.default([['a', 2]])]]), 2], new _map2.default([['a', new _map2.default([['a', 2]])]])], [[new _map2.default([['a', [new _map2.default([['a', 2]])]]]), 1], new _map2.default([['a', [null]]])], [[new _map2.default([['a', [new _map2.default([['a', 2]])]]]), 2], new _map2.default([['a', [new _map2.default([['a', 2]])]]])], [[new _map2.default([['a', new _map2.default([['a', 2]])]]), 10], new _map2.default([['a', new _map2.default([['a', 2]])]])], [[new _map2.default([['a', new _map2.default([['a', 2]])]]), 10], new _map2.default([['a', new _map2.default([['a', 2]])]])], [[new _set2.default(['a', 2]), 0], new _set2.default(['a', 2])], [[new _set2.default(['a', new _set2.default(['a', 2])]), 0], new _set2.default(['a', null])], [[new _set2.default(['a', new _set2.default(['a', 2])]), 1], new _set2.default(['a', new _set2.default(['a', 2])])], [[new _set2.default(['a', new _set2.default(['a', 2])]), 2], new _set2.default(['a', new _set2.default(['a', 2])])], [[new _set2.default(['a', [new _set2.default(['a', 2])]]), 1], new _set2.default(['a', [null]])], [[new _set2.default(['a', [new _set2.default(['a', 2])]]), 2], new _set2.default(['a', [new _set2.default(['a', 2])]])], [[new _set2.default(['a', new _set2.default(['a', 2])]), 10], new _set2.default(['a', new _set2.default(['a', 2])])], [[new _set2.default(['a', new _set2.default(['a', 2])]), 10], new _set2.default(['a', new _set2.default(['a', 2])])]];

            for (var _i27 = 0; _i27 < _arr27.length; _i27++) {
                var _$$Tools$class7;

                var test = _arr27[_i27];
                assert.deepEqual((_$$Tools$class7 = $.Tools.class).copy.apply(_$$Tools$class7, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('determineType (' + roundType + ')', function (assert) {
            assert.strictEqual($.Tools.class.determineType(), 'undefined');
            var _arr28 = [[undefined, 'undefined'], [{}.notDefined, 'undefined'], [null, 'null'], [true, 'boolean'], [new Boolean(), 'boolean'], [3, 'number'], [new Number(3), 'number'], ['', 'string'], [new String(''), 'string'], ['test', 'string'], [new String('test'), 'string'], [function () {}, 'function'], [function () {}, 'function'], [[], 'array'],
            /* eslint-disable no-array-constructor */
            // IgnoreTypeCheck
            [new Array(), 'array'],
            /* eslint-enable no-array-constructor */
            [new Date(), 'date'], [new Error(), 'error'], [new _map2.default(), 'map'], [new _set2.default(), 'set'], [/test/, 'regexp']];
            for (var _i28 = 0; _i28 < _arr28.length; _i28++) {
                var test = _arr28[_i28];
                assert.strictEqual($.Tools.class.determineType(test[0]), test[1]);
            }
        });
        this.test('equals (' + roundType + ')', function () {
            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(assert) {
                var done, testFunction, _arr29, _i29, _$$Tools$class10, _test5, _arr30, _i30, _$$Tools$class8, _test6, _arr31, _i31, _$$Tools$class9, _test7, _arr32, _i32, _$$Tools$class11, _test8, test;

                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                done = assert.async();

                                testFunction = function testFunction() {};

                                _arr29 = [[1, 1], [new Date(), new Date()], [new Date(1995, 11, 17), new Date(1995, 11, 17)], [/a/, /a/], [{ a: 2 }, { a: 2 }], [{ a: 2, b: 3 }, { a: 2, b: 3 }], [[1, 2, 3], [1, 2, 3]], [[], []], [{}, {}], [new _map2.default(), new _map2.default()], [new _set2.default(), new _set2.default()], [[1, 2, 3, { a: 2 }], [1, 2, 3, { a: 2 }]], [[1, 2, 3, new _map2.default([['a', 2]])], [1, 2, 3, new _map2.default([['a', 2]])]], [[1, 2, 3, new _set2.default(['a', 2])], [1, 2, 3, new _set2.default(['a', 2])]], [[1, 2, 3, [1, 2]], [1, 2, 3, [1, 2]]], [[{ a: 1 }], [{ a: 1 }]], [[{ a: 1, b: 1 }], [{ a: 1 }], []], [[{ a: 1, b: 1 }], [{ a: 1 }], ['a']], [2, 2, 0], [[{ a: 1, b: 1 }], [{ a: 1 }], null, 0], [[{ a: 1 }, { b: 1 }], [{ a: 1 }, { b: 1 }], null, 1], [[{ a: { b: 1 } }, { b: 1 }], [{ a: 1 }, { b: 1 }], null, 1], [[{ a: { b: 1 } }, { b: 1 }], [{ a: { b: 1 } }, { b: 1 }], null, 2], [[{ a: { b: { c: 1 } } }, { b: 1 }], [{ a: { b: 1 } }, { b: 1 }], null, 2], [[{ a: { b: { c: 1 } } }, { b: 1 }], [{ a: { b: 1 } }, { b: 1 }], null, 3, ['b']], [testFunction, testFunction]];

                                for (_i29 = 0; _i29 < _arr29.length; _i29++) {
                                    _test5 = _arr29[_i29];

                                    assert.ok((_$$Tools$class10 = $.Tools.class).equals.apply(_$$Tools$class10, (0, _toConsumableArray3.default)(_test5)));
                                }
                                if (!(TARGET_TECHNOLOGY === 'node')) {
                                    _context6.next = 8;
                                    break;
                                }

                                assert.ok($.Tools.class.equals(new Buffer('a'), new Buffer('a'), null, -1, [], true, true));
                                _context6.next = 32;
                                break;

                            case 8:
                                _arr30 = [[new Blob(['a'], { type: 'text/plain' }), new Blob(['a'], { type: 'text/plain' })], [[new Blob(['a'], { type: 'text/plain' })], [new Blob(['a'], { type: 'text/plain' })]], [{ a: new Blob(['a'], { type: 'text/plain' }) }, { a: new Blob(['a'], { type: 'text/plain' }) }], [new _map2.default([['a', new Blob(['a'], { type: 'text/plain' })]]), new _map2.default([['a', new Blob(['a'], { type: 'text/plain' })]])], [new _set2.default([new Blob(['a'], { type: 'text/plain' })]), new _set2.default([new Blob(['a'], { type: 'text/plain' })])], [{
                                    a: new _set2.default([[new _map2.default([['a', new Blob(['a'], {
                                        type: 'text/plain'
                                    })]])]]),
                                    b: 2
                                }, {
                                    a: new _set2.default([[new _map2.default([['a', new Blob(['a'], {
                                        type: 'text/plain'
                                    })]])]]),
                                    b: 2
                                }]];
                                _i30 = 0;

                            case 10:
                                if (!(_i30 < _arr30.length)) {
                                    _context6.next = 20;
                                    break;
                                }

                                _test6 = _arr30[_i30];
                                _context6.t0 = assert;
                                _context6.next = 15;
                                return (_$$Tools$class8 = $.Tools.class).equals.apply(_$$Tools$class8, (0, _toConsumableArray3.default)(_test6).concat([null, -1, [], true, true]));

                            case 15:
                                _context6.t1 = _context6.sent;

                                _context6.t0.ok.call(_context6.t0, _context6.t1);

                            case 17:
                                _i30++;
                                _context6.next = 10;
                                break;

                            case 20:
                                _arr31 = [[new Blob(['a'], { type: 'text/plain' }), new Blob(['b'], { type: 'text/plain' })], [[new Blob(['a'], { type: 'text/plain' })], [new Blob(['b'], { type: 'text/plain' })]], [{ a: new Blob(['a'], { type: 'text/plain' }) }, { a: new Blob(['b'], { type: 'text/plain' }) }], [new _map2.default([['a', new Blob(['a'], { type: 'text/plain' })]]), new _map2.default([['a', new Blob(['b'], { type: 'text/plain' })]])], [new _set2.default([new Blob(['a'], { type: 'text/plain' })]), new _set2.default([new Blob(['b'], { type: 'text/plain' })])], [{
                                    a: new _set2.default([[new _map2.default([['a', new Blob(['a'], {
                                        type: 'text/plain'
                                    })]])]]),
                                    b: 2
                                }, {
                                    a: new _set2.default([[new _map2.default([['a', new Blob(['b'], {
                                        type: 'text/plain'
                                    })]])]]),
                                    b: 2
                                }]];
                                _i31 = 0;

                            case 22:
                                if (!(_i31 < _arr31.length)) {
                                    _context6.next = 32;
                                    break;
                                }

                                _test7 = _arr31[_i31];
                                _context6.t2 = assert;
                                _context6.next = 27;
                                return (_$$Tools$class9 = $.Tools.class).equals.apply(_$$Tools$class9, (0, _toConsumableArray3.default)(_test7).concat([null, -1, [], true, true]));

                            case 27:
                                _context6.t3 = _context6.sent;

                                _context6.t2.notOk.call(_context6.t2, _context6.t3);

                            case 29:
                                _i31++;
                                _context6.next = 22;
                                break;

                            case 32:
                                _arr32 = [[[{ a: { b: 1 } }, { b: 1 }], [{ a: 1 }, { b: 1 }], null, 2], [[{ a: { b: { c: 1 } } }, { b: 1 }], [{ a: { b: 1 } }, { b: 1 }], null, 3], [new Date(1995, 11, 17), new Date(1995, 11, 16)], [/a/i, /a/], [1, 2], [{ a: 2, b: 3 }, { a: 2 }], [[1, 2, 3, 4], [1, 2, 3, 5]], [[1, 2, 3, 4], [1, 2, 3]], [[1, 2, 3, { a: 2 }], [1, 2, 3, { b: 2 }]], [[1, 2, 3, new _map2.default([['a', 2]])], [1, 2, 3, new _map2.default([['b', 2]])]], [[1, 2, 3, new _set2.default(['a', 2])], [1, 2, 3, new _set2.default(['b', 2])]], [[1, 2, 3, [1, 2]], [1, 2, 3, [1, 2, 3]]], [[1, 2, 3, [1, 2, 3]], [1, 2, 3, [1, 2]]], [[1, 2, 3, [1, 2, 3]], [1, 2, 3, [1, 2, {}]]], [[{ a: 1, b: 1 }], [{ a: 1 }]], [[{ a: 1, b: 1 }], [{ a: 1 }], ['a', 'b']], [1, 2, 0], [[{ a: 1 }, { b: 1 }], [{ a: 1 }], null, 1], [function () {}, function () {}, null, -1, [], false]];

                                for (_i32 = 0; _i32 < _arr32.length; _i32++) {
                                    _test8 = _arr32[_i32];

                                    assert.notOk((_$$Tools$class11 = $.Tools.class).equals.apply(_$$Tools$class11, (0, _toConsumableArray3.default)(_test8)));
                                }
                                test = function test() {};

                                assert.ok($.Tools.class.equals(test, test, null, -1, [], false));
                                done();

                            case 37:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, _this);
            }));

            return function (_x6) {
                return _ref6.apply(this, arguments);
            };
        }());
        this.test('evaluateDynamicDataStructure (' + roundType + ')', function (assert) {
            var _arr33 = [[[null], null], [[false], false], [['1'], '1'], [[3], 3], [[{}], {}], [[{ a: null }], { a: null }], [[{ __evaluate__: '1 + 3' }], 4], [[[{ __evaluate__: '1' }]], [1]], [[[{ __evaluate__: '\'1\'' }]], ['1']], [[{ a: { __evaluate__: '\'a\'' } }], { a: 'a' }], [[{ a: { __evaluate__: '1' } }], { a: 1 }], [[{ a: { __evaluate__: 'self.b' }, b: 2 }, {}, 'self', '__run__'], { a: { __evaluate__: 'self.b' }, b: 2 }], [[{ a: { __run: '_.b' }, b: 1 }, {}, '_', '__run'], { a: 1, b: 1 }], [[{ a: [{ __run: 'self.b' }], b: 1 }, {}, 'self', '__run'], { a: [1], b: 1 }], [[{ a: { __evaluate__: 'self.b' }, b: 2 }], { a: 2, b: 2 }], [[{ a: { __evaluate__: 'c.b' }, b: 2 }, {}, 'c'], { a: 2, b: 2 }], [[{
                a: { __evaluate__: 'self.b' },
                b: { __evaluate__: 'self.c' },
                c: 2
            }], { a: 2, b: 2, c: 2 }], [[{
                a: { __execute__: 'return self.b' },
                b: { __execute__: 'return self.c' },
                c: { __execute__: 'return self.d' },
                d: { __execute__: 'return self.e' },
                e: { __execute__: 'return self.f' },
                f: 3
            }], { a: 3, b: 3, c: 3, d: 3, e: 3, f: 3 }], [[{
                a: { __evaluate__: 'self.b.d.e' },
                b: { __evaluate__: 'self.c' },
                c: { d: { e: 3 } }
            }], { a: 3, b: { d: { e: 3 } }, c: { d: { e: 3 } } }], [[{
                n: { __evaluate__: '{a: [1, 2, 3]}' },
                b: { __evaluate__: 'self.c' },
                f: { __evaluate__: 'self.g.h' },
                d: { __evaluate__: 'self.e' },
                a: { __evaluate__: 'self.b' },
                e: { __evaluate__: 'self.f.i' },
                k: { __evaluate__: '`kk <-> "${self.l.join(\'", "\')}"`' },
                c: { __evaluate__: 'self.d' },
                o: [{ a: 2, b: [[[{ __evaluate__: '10 ** 2' }]]] }],
                l: { __evaluate__: 'self.m.a' },
                g: { h: { i: { __evaluate__: '`${self.k} <-> ${self.j}`' } } },
                m: { a: [1, 2, { __evaluate__: '3' }] },
                j: 'jj'
            }], {
                a: 'kk <-> "1", "2", "3" <-> jj',
                b: 'kk <-> "1", "2", "3" <-> jj',
                c: 'kk <-> "1", "2", "3" <-> jj',
                d: 'kk <-> "1", "2", "3" <-> jj',
                e: 'kk <-> "1", "2", "3" <-> jj',
                f: { i: 'kk <-> "1", "2", "3" <-> jj' },
                g: { h: { i: 'kk <-> "1", "2", "3" <-> jj' } },
                j: 'jj',
                k: 'kk <-> "1", "2", "3"',
                l: [1, 2, 3],
                m: { a: [1, 2, 3] },
                n: { a: [1, 2, 3] },
                o: [{ a: 2, b: [[[100]]] }]
            }], [[{
                a: { __evaluate__: '_.b.d.e' },
                b: { __evaluate__: '_.c' },
                c: { d: { e: { __evaluate__: 'tools.copy([2])' } } }
            }, { tools: $.Tools.class }, '_'], { a: [2], b: { d: { e: [2] } }, c: { d: { e: [2] } } }], [[{ a: {
                    b: 1,
                    c: { __evaluate__: 'self.a.b' }
                } }], { a: { b: 1, c: 1 } }], [[{ a: {
                    b: null,
                    c: { __evaluate__: 'self.a.b' }
                } }], { a: { b: null, c: null } }], [[{ a: {
                    b: undefined,
                    c: { __evaluate__: 'self.a.b' }
                } }], { a: { b: undefined, c: undefined } }], [[{ a: {
                    b: 'jau',
                    c: { __evaluate__: 'self.a.b' }
                } }], { a: { b: 'jau', c: 'jau' } }], [[{ a: {
                    b: {
                        c: 'jau',
                        d: { __evaluate__: 'self.a.b.c' }
                    }
                } }], { a: { b: { c: 'jau', d: 'jau' } } }], [[[1, 1], [6, 1], [25, 3], [28, 3], [1, 5], [5, 5], [16, 5], [26, 5], [3, 10], [1, 11], [25, 12], [26, 12]], [1, 1], [6, 1], [25, 3], [28, 3], [1, 5], [5, 5], [16, 5], [26, 5], [3, 10], [1, 11], [25, 12], [26, 12]], [[{ a: {
                    b: { __evaluate__: '"t" + "es" + "t"' },
                    c: { __evaluate__: 'removeS(self.a.b)' }
                } }, { removeS: function removeS(value) {
                    return value.replace('s', '');
                } }], { a: { b: 'test', c: 'tet' } }], [[{
                a: { __evaluate__: 'toString(self.b)' },
                b: { __evaluate__: '\'a\'' }
            }, { toString: function toString(value) {
                    return value.toString();
                } }], { a: 'a', b: 'a' }], [[{
                a: { __evaluate__: 'Object.getOwnPropertyNames(self.b)' },
                b: { __evaluate__: '{a: 2}' }
            }], { a: ['a'], b: { a: 2 } }], [[{
                a: { __evaluate__: 'Reflect.ownKeys(self.b)' },
                b: { __evaluate__: '{a: 2}' }
            }], { a: ['a'], b: { a: 2 } }], [[{
                a: { __evaluate__: 'Object.getOwnPropertyNames(self.b)' },
                b: { __evaluate__: 'self.c' },
                c: { __execute__: 'return {a: 1, b: 2}' }
            }], { a: ['a', 'b'], b: { a: 1, b: 2 }, c: { a: 1, b: 2 } }],
            /*
                NOTE: This describes a workaround until the "ownKeys" proxy
                trap works for this use cases.
            */
            [[{
                a: { __evaluate__: 'Object.keys(resolve(self.b))' },
                b: { __evaluate__: '{a: 2}' }
            }], { a: ['a'], b: { a: 2 } }], [[{
                a: { __evaluate__: '(() => {\n                    const result = []\n                    for (const key in resolve(self.b))\n                        result.push(key)\n                    return result\n                })()' },
                b: { __evaluate__: '{a: 1, b: 2, c: 3}' }
            }], { a: ['a', 'b', 'c'], b: { a: 1, b: 2, c: 3 } }]];

            for (var _i33 = 0; _i33 < _arr33.length; _i33++) {
                var _$$Tools$class12;

                var test = _arr33[_i33];
                assert.deepEqual($.Tools.class.copy((_$$Tools$class12 = $.Tools.class).evaluateDynamicDataStructure.apply(_$$Tools$class12, (0, _toConsumableArray3.default)(test[0])), -1, true), test[1]);
            }
        });
        this.test('extendObject (' + roundType + ')', function (assert) {
            var _arr34 = [[[[]], []], [[{}], {}], [[{ a: 1 }], { a: 1 }], [[{ a: 1 }, { a: 2 }], { a: 2 }], [[{}, { a: 1 }, { a: 2 }], { a: 2 }], [[{}, { a: 1 }, { a: 2 }], { a: 2 }], [[{ a: 1, b: { a: 1 } }, { a: 2, b: { b: 1 } }], { a: 2, b: { b: 1 } }], [[[1, 2], [1]], [1]], [[new _map2.default()], new _map2.default()], [[new _set2.default()], new _set2.default()], [[new _map2.default([['a', 1]])], new _map2.default([['a', 1]])], [[new _map2.default([['a', 1]]), new _map2.default([['a', 2]])], new _map2.default([['a', 2]])], [[new _map2.default(), new _map2.default([['a', 1]]), new _map2.default([['a', 2]])], new _map2.default([['a', 2]])], [[new _map2.default(), new _map2.default([['a', 1]]), new _map2.default([['a', 2]])], new _map2.default([['a', 2]])], [[new _map2.default([['a', 1], ['b', new _map2.default([['a', 1]])]]), new _map2.default([['a', 2], ['b', new _map2.default([['b', 1]])]])], new _map2.default([['a', 2], ['b', new _map2.default([['b', 1]])]])], [[true, {}], {}], [[true, { a: 1, b: { a: 1 } }, { a: 2, b: { b: 1 } }], { a: 2, b: { a: 1, b: 1 } }], [[true, { a: 1, b: { a: [] } }, { a: 2, b: { b: 1 } }], { a: 2, b: { a: [], b: 1 } }], [[true, { a: { a: [1, 2] } }, { a: { a: [3, 4] } }], { a: { a: [3, 4] } }], [[true, { a: { a: [1, 2] } }, { a: { a: null } }], { a: { a: null } }], [[true, { a: { a: [1, 2] } }, { a: true }], { a: true }], [[true, { a: { _a: 1 } }, { a: { b: 2 } }], { a: { _a: 1, b: 2 } }], [[false, { _a: 1 }, { a: 2 }], { a: 2, _a: 1 }], [[true, { a: { a: [1, 2] } }, false], false], [[true, { a: { a: [1, 2] } }, undefined], undefined], [[true, { a: 1 }, { a: 2 }, { a: 3 }], { a: 3 }], [[true, [1], [1, 2]], [1, 2]], [[true, [1, 2], [1]], [1]], [[true, new _map2.default()], new _map2.default()], [[true, new _map2.default([['a', 1], ['b', new _map2.default([['a', 1]])]]), new _map2.default([['a', 2], ['b', new _map2.default([['b', 1]])]])], new _map2.default([['a', 2], ['b', new _map2.default([['a', 1], ['b', 1]])]])], [[true, new _map2.default([['a', 1], ['b', new _map2.default([['a', []]])]]), new _map2.default([['a', 2], ['b', new _map2.default([['b', 1]])]])], new _map2.default([['a', 2], ['b', new _map2.default([['a', []], ['b', 1]])]])], [[true, new _map2.default([['a', new _map2.default([['a', [1, 2]]])]]), new _map2.default([['a', new _map2.default([['a', [3, 4]]])]])], new _map2.default([['a', new _map2.default([['a', [3, 4]]])]])]];

            for (var _i34 = 0; _i34 < _arr34.length; _i34++) {
                var _$$Tools$class13;

                var test = _arr34[_i34];
                assert.deepEqual((_$$Tools$class13 = $.Tools.class).extendObject.apply(_$$Tools$class13, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }assert.strictEqual($.Tools.class.extendObject([1, 2], undefined), undefined);
            assert.strictEqual($.Tools.class.extendObject([1, 2], null), null);
            var target = { a: [1, 2] };
            $.Tools.class.extendObject(true, target, { a: [3, 4] });
            assert.deepEqual(target, { a: [3, 4] });
        });
        this.test('forEachSorted (' + roundType + ')', function (assert) {
            var result = [];
            var tester = function tester(item) {
                return $.Tools.class.forEachSorted(item, function (value, key) {
                    return result.push([key, value]);
                });
            };
            tester({});
            assert.deepEqual(result, []);
            assert.deepEqual(tester({}), []);
            assert.deepEqual(tester([]), []);
            assert.deepEqual(tester({ a: 2 }), ['a']);
            assert.deepEqual(tester({ b: 1, a: 2 }), ['a', 'b']);
            result = [];
            tester({ b: 1, a: 2 });
            assert.deepEqual(result, [['a', 2], ['b', 1]]);
            result = [];

            tester([2, 2]);
            assert.deepEqual(result, [[0, 2], [1, 2]]);
            result = [];
            tester({ '5': 2, '6': 2, '2': 3 });
            assert.deepEqual(result, [['2', 3], ['5', 2], ['6', 2]]);
            result = [];
            tester({ a: 2, c: 2, z: 3 });
            assert.deepEqual(result, [['a', 2], ['c', 2], ['z', 3]]);
            $.Tools.class.forEachSorted([1], function () {
                result = this;
                return result;
            }, 2);
            assert.deepEqual(result, 2);
        });
        this.test('getProxyHandler (' + roundType + ')', function (assert) {
            assert.ok($.Tools.class.isPlainObject($.Tools.class.getProxyHandler({})));
            assert.ok($.Tools.class.isPlainObject($.Tools.class.getProxyHandler(new _map2.default(), { get: 'get' })));
        });
        this.test('modifyObject (' + roundType + ')', function (assert) {
            var _arr35 = [[[{}, {}], {}, {}], [[{ a: 2 }, {}], { a: 2 }, {}], [[{ a: 2 }, { b: 1 }], { a: 2 }, { b: 1 }], [[{ a: 2 }, { __remove__: 'a' }], {}, {}], [[{ a: 2 }, { __remove__: ['a'] }], {}, {}], [[{ a: [2] }, { a: { __prepend__: 1 } }], { a: [1, 2] }, {}], [[{ a: [2] }, { a: { __remove__: 1 } }], { a: [2] }, {}], [[{ a: [2, 1] }, { a: { __remove__: 1 } }], { a: [2] }, {}], [[{ a: [2, 1] }, { a: { __remove__: [1, 2] } }], { a: [] }, {}], [[{ a: [1] }, { a: { __remove__: 1 } }], { a: [] }, {}], [[{ a: [1] }, { a: { __remove__: [1, 2] } }], { a: [] }, {}], [[{ a: [2] }, { a: { __append__: 1 } }], { a: [2, 1] }, {}], [[{ a: [2] }, { a: { __append__: [1, 2] } }], { a: [2, 1, 2] }, {}], [[{ a: [2] }, { a: { __append__: [1, 2] }, b: 1 }], { a: [2, 1, 2] }, { b: 1 }], [[{ a: [2] }, { a: { add: [1, 2] }, b: 1 }, 'rm', 'unshift', 'add'], { a: [2, 1, 2] }, { b: 1 }], [[{ a: [2] }, { a: { __prepend__: 1 } }, '_r', '_p'], { a: [2] }, { a: { __prepend__: 1 } }], [[{ a: [2] }, { a: { __prepend__: [1, 3] } }], { a: [1, 3, 2] }, {}], [[{ a: [2] }, { a: { __append__: [1, 2], __prepend__: 's' } }], { a: ['s', 2, 1, 2] }, {}], [[{ a: [2, 2] }, { a: { __prepend__: 's', __remove__: 2 } }], { a: ['s', 2] }, {}], [[{ a: [2, 2] }, { a: { __prepend__: 's', __remove__: [2, 2] } }], { a: ['s'] }, {}], [[{ a: [2, 1, 2] }, { a: { __prepend__: 's', __remove__: [2, 2], __append__: 'a' } }], { a: ['s', 1, 'a'] }, {}]];

            for (var _i35 = 0; _i35 < _arr35.length; _i35++) {
                var _$$Tools$class14;

                var test = _arr35[_i35];
                assert.deepEqual((_$$Tools$class14 = $.Tools.class).modifyObject.apply(_$$Tools$class14, (0, _toConsumableArray3.default)(test[0])), test[1]);
                assert.deepEqual(test[0][1], test[2]);
            }
        });
        QUnit.test('representObject', function (assert) {
            var error = new Error('A');
            var _arr36 = [[{}, '{}'], [new _set2.default(), 'EmptySet'], [new _map2.default(), 'EmptyMap'], [5, '5'], ['a', '"a"'], [[], '[]'], [{ a: 2, b: 3 }, '{\n a: 2,\n b: 3\n}'], [new _map2.default([['3', 2], [2, 3]]), '"3" -> 2,\n 2 -> 3'], [new _map2.default([['3', 2], [2, new _map2.default([[3, 3], [2, 2]])]]), '"3" -> 2,\n 2 -> 3 -> 3,\n  2 -> 2'], [new _set2.default(['3', 2, 2, 3]), '{\n "3",\n 2,\n 3\n}'], [new _set2.default(['3', 2, new _set2.default([3, 2])]), '{\n "3",\n 2,\n {\n  3,\n  2\n }\n}'], [{ a: null, b: 3, c: 'a', d: true }, '{\n a: null,\n b: 3,\n c: "a",\n d: true\n}'], [{ a: { a: null, b: 3, c: 'a', d: true } }, '{\n a: {\n  a: null,\n  b: 3,\n  c: "a",\n  d: true\n }\n}'], [{ a: { a: null, b: 3, c: 'a', d: {} } }, '{\n a: {\n  a: null,\n  b: 3,\n  c: "a",\n  d: {}\n }\n}'], [{ a: { a: { a: null, b: {} } } }, '{\n a: {\n  a: {\n   a: null,\n   b: {}\n  }\n }\n}'], [{ a: { a: error } }, '{\n a: {\n  a: {\n   message: "A",\n   stack: "' + (error.stack.replace(/\n/g, '\n   ') + '"\n  }\n }\n}')], [[{ a: 2 }], '[\n {\n  a: 2\n }\n]']];
            for (var _i36 = 0; _i36 < _arr36.length; _i36++) {
                var test = _arr36[_i36];
                assert.strictEqual($.Tools.class.representObject(test[0], ' '), test[1]);
            }
        });
        this.test('sort (' + roundType + ')', function (assert) {
            var _arr37 = [[[], []], [{}, []], [[1], [0]], [[1, 2, 3], [0, 1, 2]], [[3, 2, 1], [0, 1, 2]], [[2, 3, 1], [0, 1, 2]], [{ '1': 2, '2': 5, '3': 'a' }, ['1', '2', '3']], [{ '2': 2, '1': 5, '-5': 'a' }, ['-5', '1', '2']], [{ '3': 2, '2': 5, '1': 'a' }, ['1', '2', '3']], [{ a: 2, b: 5, c: 'a' }, ['a', 'b', 'c']], [{ c: 2, b: 5, a: 'a' }, ['a', 'b', 'c']], [{ b: 2, c: 5, z: 'a' }, ['b', 'c', 'z']]];

            for (var _i37 = 0; _i37 < _arr37.length; _i37++) {
                var test = _arr37[_i37];
                assert.deepEqual($.Tools.class.sort(test[0]), test[1]);
            }
        });
        this.test('unwrapProxy (' + roundType + ')', function (assert) {
            var _arr38 = [[{}, {}], [{ a: 'a' }, { a: 'a' }], [{ a: 'aa' }, { a: 'aa' }], [{ a: { __target__: 2, __revoke__: function __revoke__() {} } }, { a: 2 }]];

            for (var _i38 = 0; _i38 < _arr38.length; _i38++) {
                var test = _arr38[_i38];
                assert.deepEqual($.Tools.class.unwrapProxy(test[0]), test[1]);
            }
        });
        // // endregion
        // // region array
        this.test('arrayMerge (' + roundType + ')', function (assert) {
            var _arr39 = [[[], [], []], [[1], [], [1]], [[], [1], [1]], [[1], [1], [1, 1]], [[1, 2, 3, 1], [1, 2, 3], [1, 2, 3, 1, 1, 2, 3]]];

            for (var _i39 = 0; _i39 < _arr39.length; _i39++) {
                var test = _arr39[_i39];
                assert.deepEqual($.Tools.class.arrayMerge(test[0], test[1]), test[2]);
            }
        });
        this.test('arrayMake (' + roundType + ')', function (assert) {
            var _arr40 = [[[], []], [[1, 2, 3], [1, 2, 3]], [1, [1]]];

            for (var _i40 = 0; _i40 < _arr40.length; _i40++) {
                var test = _arr40[_i40];
                assert.deepEqual($.Tools.class.arrayMake(test[0]), test[1]);
            }
        });
        this.test('arrayUnique (' + roundType + ')', function (assert) {
            var _arr41 = [[[1, 2, 3, 1], [1, 2, 3]], [[1, 2, 3, 1, 2, 3], [1, 2, 3]], [[], []], [[1, 2, 3], [1, 2, 3]]];

            for (var _i41 = 0; _i41 < _arr41.length; _i41++) {
                var test = _arr41[_i41];
                assert.deepEqual($.Tools.class.arrayUnique(test[0]), test[1]);
            }
        });
        this.test('arrayAggregatePropertyIfEqual (' + roundType + ')', function (assert) {
            var _arr42 = [[[[{ a: 'b' }], 'a'], 'b'], [[[{ a: 'b' }, { a: 'b' }], 'a'], 'b'], [[[{ a: 'b' }, { a: 'c' }], 'a'], ''], [[[{ a: 'b' }, { a: 'c' }], 'a', false], false]];

            for (var _i42 = 0; _i42 < _arr42.length; _i42++) {
                var _$$Tools$class15;

                var test = _arr42[_i42];
                assert.strictEqual((_$$Tools$class15 = $.Tools.class).arrayAggregatePropertyIfEqual.apply(_$$Tools$class15, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('arrayDeleteEmptyItems (' + roundType + ')', function (assert) {
            var _arr43 = [[[[{ a: null }]], []], [[[{ a: null, b: 2 }]], [{ a: null, b: 2 }]], [[[{ a: null, b: 2 }], ['a']], []], [[[], ['a']], []], [[[]], []]];

            for (var _i43 = 0; _i43 < _arr43.length; _i43++) {
                var _$$Tools$class16;

                var test = _arr43[_i43];
                assert.deepEqual((_$$Tools$class16 = $.Tools.class).arrayDeleteEmptyItems.apply(_$$Tools$class16, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('arrayExtract (' + roundType + ')', function (assert) {
            var _arr44 = [[[[{ a: 'b', c: 'd' }], ['a']], [{ a: 'b' }]], [[[{ a: 'b', c: 'd' }], ['b']], [{}]], [[[{ a: 'b', c: 'd' }], ['c']], [{ c: 'd' }]], [[[{ a: 'b', c: 'd' }, { a: 3 }], ['c']], [{ c: 'd' }, {}]], [[[{ a: 'b', c: 'd' }, { c: 3 }], ['c']], [{ c: 'd' }, { c: 3 }]]];

            for (var _i44 = 0; _i44 < _arr44.length; _i44++) {
                var _$$Tools$class17;

                var test = _arr44[_i44];
                assert.deepEqual((_$$Tools$class17 = $.Tools.class).arrayExtract.apply(_$$Tools$class17, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('arrayExtractIfMatches (' + roundType + ')', function (assert) {
            var _arr45 = [[['b'], /b/, ['b']], [['b'], 'b', ['b']], [['b'], 'a', []], [[], 'a', []], [['a', 'b'], '', ['a', 'b']], [['a', 'b'], '^$', []], [['a', 'b'], 'b', ['b']], [['a', 'b'], '[ab]', ['a', 'b']]];

            for (var _i45 = 0; _i45 < _arr45.length; _i45++) {
                var test = _arr45[_i45];
                assert.deepEqual($.Tools.class.arrayExtractIfMatches(test[0], test[1]), test[2]);
            }
        });
        this.test('arrayExtractIfPropertyExists (' + roundType + ')', function (assert) {
            var _arr46 = [[[{ a: 2 }], 'a', [{ a: 2 }]], [[{ a: 2 }], 'b', []], [[], 'b', []], [[{ a: 2 }, { b: 3 }], 'a', [{ a: 2 }]]];

            for (var _i46 = 0; _i46 < _arr46.length; _i46++) {
                var test = _arr46[_i46];
                assert.deepEqual($.Tools.class.arrayExtractIfPropertyExists(test[0], test[1]), test[2]);
            }
        });
        this.test('arrayExtractIfPropertyMatches (' + roundType + ')', function (assert) {
            var _arr47 = [[[{ a: 'b' }], { a: 'b' }, [{ a: 'b' }]], [[{ a: 'b' }], { a: '.' }, [{ a: 'b' }]], [[{ a: 'b' }], { a: 'a' }, []], [[], { a: 'a' }, []], [[{ a: 2 }], { b: /a/ }, []], [[{ mimeType: 'text/x-webm' }], { mimeType: new RegExp('^text/x-webm$') }, [{ mimeType: 'text/x-webm' }]]];

            for (var _i47 = 0; _i47 < _arr47.length; _i47++) {
                var test = _arr47[_i47];
                assert.deepEqual($.Tools.class.arrayExtractIfPropertyMatches(test[0], test[1]), test[2]);
            }
        });
        this.test('arrayIntersect (' + roundType + ')', function (assert) {
            var _arr48 = [[[['A'], ['A']], ['A']], [[['A', 'B'], ['A']], ['A']], [[[], []], []], [[[5], []], []], [[[{ a: 2 }], [{ a: 2 }]], [{ a: 2 }]], [[[{ a: 3 }], [{ a: 2 }]], []], [[[{ a: 3 }], [{ b: 3 }]], []], [[[{ a: 3 }], [{ b: 3 }], ['b']], []], [[[{ a: 3 }], [{ b: 3 }], ['b'], false], []], [[[{ b: null }], [{ b: null }], ['b']], [{ b: null }]], [[[{ b: null }], [{ b: undefined }], ['b']], []], [[[{ b: null }], [{ b: undefined }], ['b'], false], [{ b: null }]], [[[{ b: null }], [{}], ['b'], false], [{ b: null }]], [[[{ b: undefined }], [{}], ['b'], false], [{ b: undefined }]], [[[{}], [{}], ['b'], false], [{}]], [[[{ b: null }], [{}], ['b']], []], [[[{ b: undefined }], [{}], ['b'], true], [{ b: undefined }]], [[[{ b: 1 }], [{ a: 1 }], { b: 'a' }, true], [{ b: 1 }]]];

            for (var _i48 = 0; _i48 < _arr48.length; _i48++) {
                var _$$Tools$class18;

                var test = _arr48[_i48];
                assert.deepEqual((_$$Tools$class18 = $.Tools.class).arrayIntersect.apply(_$$Tools$class18, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('arrayMakeRange (' + roundType + ')', function (assert) {
            var _arr49 = [[[[0]], [0]], [[[5]], [0, 1, 2, 3, 4, 5]], [[[]], []], [[[2, 5]], [2, 3, 4, 5]], [[[2, 10], 2], [2, 4, 6, 8, 10]]];

            for (var _i49 = 0; _i49 < _arr49.length; _i49++) {
                var _$$Tools$class19;

                var test = _arr49[_i49];
                assert.deepEqual((_$$Tools$class19 = $.Tools.class).arrayMakeRange.apply(_$$Tools$class19, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('arraySumUpProperty (' + roundType + ')', function (assert) {
            var _arr50 = [[[[{ a: 2 }, { a: 3 }], 'a'], 5], [[[{ a: 2 }, { b: 3 }], 'a'], 2], [[[{ a: 2 }, { b: 3 }], 'c'], 0]];

            for (var _i50 = 0; _i50 < _arr50.length; _i50++) {
                var _$$Tools$class20;

                var test = _arr50[_i50];
                assert.strictEqual((_$$Tools$class20 = $.Tools.class).arraySumUpProperty.apply(_$$Tools$class20, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('arrayAppendAdd (' + roundType + ')', function (assert) {
            var testObject = {};
            var _arr51 = [[[{}, {}, 'b'], { b: [{}] }], [[testObject, { a: 3 }, 'b'], { b: [{ a: 3 }] }], [[testObject, { a: 3 }, 'b'], { b: [{ a: 3 }, { a: 3 }] }], [[{ b: [2] }, 2, 'b', false], { b: [2, 2] }], [[{ b: [2] }, 2, 'b'], { b: [2] }]];
            for (var _i51 = 0; _i51 < _arr51.length; _i51++) {
                var _$$Tools$class21;

                var test = _arr51[_i51];
                assert.deepEqual((_$$Tools$class21 = $.Tools.class).arrayAppendAdd.apply(_$$Tools$class21, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('arrayRemove (' + roundType + ')', function (assert) {
            var _arr52 = [[[[], 2], []], [[[2], 2], []], [[[2], 2, true], []], [[[1, 2], 2], [1]], [[[1, 2], 2, true], [1]]];

            for (var _i52 = 0; _i52 < _arr52.length; _i52++) {
                var _$$Tools$class22;

                var test = _arr52[_i52];
                assert.deepEqual((_$$Tools$class22 = $.Tools.class).arrayRemove.apply(_$$Tools$class22, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }assert.throws(function () {
                return $.Tools.class.arrayRemove([], 2, true);
            }, new Error('Given target doesn\'t exists in given list.'));
        });
        this.test('arraySortTopological (' + roundType + ')', function (assert) {
            var _arr53 = [[{}, []], [{ a: [] }, ['a']], [{ a: 'b' }, ['b', 'a']], [{ a: [], b: 'a' }, ['a', 'b']], [{ a: [], b: ['a'] }, ['a', 'b']], [{ a: ['b'], b: [] }, ['b', 'a']], [{ c: 'b', a: [], b: ['a'] }, ['a', 'b', 'c']], [{ b: ['a'], a: [], c: ['a', 'b'] }, ['a', 'b', 'c']]];

            for (var _i53 = 0; _i53 < _arr53.length; _i53++) {
                var test = _arr53[_i53];
                assert.deepEqual($.Tools.class.arraySortTopological(test[0]), test[1]);
            }
            var _loop = function _loop(_test9) {
                assert.throws(function () {
                    return $.Tools.class.arraySortTopological(_test9);
                });
            };

            var _arr54 = [{ a: 'a' }, { a: 'b', b: 'a' }, { a: 'b', b: 'c', c: 'a' }];
            for (var _i54 = 0; _i54 < _arr54.length; _i54++) {
                var _test9 = _arr54[_i54];
                _loop(_test9);
            }
        });
        // // endregion
        // // region string
        this.test('stringEscapeRegularExpressions', function (assert) {
            var _arr55 = [[[''], ''], [['that\'s no regex: .*$'], 'that\'s no regex: \\.\\*\\$'], [['-\\[]()^$*+.}-', '}'], '\\-\\\\[\\]\\(\\)\\^\\$\\*\\+\\.}\\-'], [['-\\[]()^$*+.{}-', ['[', ']', '(', ')', '^', '$', '*', '+', '.', '{']], '\\-\\[]()^$*+.{\\}\\-'], [['-', '\\'], '\\-']];

            for (var _i55 = 0; _i55 < _arr55.length; _i55++) {
                var _$$Tools$class23;

                var test = _arr55[_i55];
                assert.strictEqual((_$$Tools$class23 = $.Tools.class).stringEscapeRegularExpressions.apply(_$$Tools$class23, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('stringConvertToValidVariableName', function (assert) {
            var _arr56 = [['', ''], ['a', 'a'], ['_a', '_a'], ['_a_a', '_a_a'], ['_a-a', '_aA'], ['-a-a', 'aA'], ['-a--a', 'aA'], ['--a--a', 'aA']];

            for (var _i56 = 0; _i56 < _arr56.length; _i56++) {
                var test = _arr56[_i56];
                assert.strictEqual($.Tools.class.stringConvertToValidVariableName(test[0]), test[1]);
            }
        });
        // /// region url handling
        this.test('stringEncodeURIComponent (' + roundType + ')', function (assert) {
            var _arr57 = [[[''], ''], [[' '], '+'], [[' ', true], '%20'], [['@:$, '], '@:$,+'], [['+'], '%2B']];

            for (var _i57 = 0; _i57 < _arr57.length; _i57++) {
                var _$$Tools$class24;

                var test = _arr57[_i57];
                assert.strictEqual((_$$Tools$class24 = $.Tools.class).stringEncodeURIComponent.apply(_$$Tools$class24, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('stringAddSeparatorToPath (' + roundType + ')', function (assert) {
            var _arr58 = [[[''], ''], [['/'], '/'], [['/a'], '/a/'], [['/a/bb/'], '/a/bb/'], [['/a/bb'], '/a/bb/'], [['/a/bb', '|'], '/a/bb|'], [['/a/bb/', '|'], '/a/bb/|']];

            for (var _i58 = 0; _i58 < _arr58.length; _i58++) {
                var _$$Tools$class25;

                var test = _arr58[_i58];
                assert.strictEqual((_$$Tools$class25 = $.Tools.class).stringAddSeparatorToPath.apply(_$$Tools$class25, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('stringHasPathPrefix (' + roundType + ')', function (assert) {
            var _arr59 = [['/admin', '/admin'], ['test', 'test'], ['', ''], ['a', 'a/b'], ['a/', 'a/b'], ['/admin', '/admin#test', '#']];

            for (var _i59 = 0; _i59 < _arr59.length; _i59++) {
                var _$$Tools$class26;

                var test = _arr59[_i59];
                assert.ok((_$$Tools$class26 = $.Tools.class).stringHasPathPrefix.apply(_$$Tools$class26, (0, _toConsumableArray3.default)(test)));
            }var _arr60 = [['b', 'a/b'], ['b/', 'a/b'], ['/admin/', '/admin/test', '#'], ['/admin', '/admin/test', '#']];
            for (var _i60 = 0; _i60 < _arr60.length; _i60++) {
                var _$$Tools$class27;

                var _test10 = _arr60[_i60];
                assert.notOk((_$$Tools$class27 = $.Tools.class).stringHasPathPrefix.apply(_$$Tools$class27, (0, _toConsumableArray3.default)(_test10)));
            }
        });
        this.test('stringGetDomainName (' + roundType + ')', function (assert) {
            var _arr61 = [[['https://www.test.de/site/subSite?param=value#hash'], 'www.test.de'], [['a', true], true], [['http://www.test.de'], 'www.test.de'], [['http://a.de'], 'a.de'], [['http://localhost'], 'localhost'], [['localhost', 'a'], 'a'], [['a', $.global.location.hostname], $.global.location.hostname], [['//a'], 'a'], [['a/site/subSite?param=value#hash', $.global.location.hostname], $.global.location.hostname], [['/a/site/subSite?param=value#hash', $.global.location.hostname], $.global.location.hostname], [['//alternate.local/a/site/subSite?param=value#hash'], 'alternate.local'], [['//alternate.local/'], 'alternate.local']];

            for (var _i61 = 0; _i61 < _arr61.length; _i61++) {
                var _$$Tools$class28;

                var test = _arr61[_i61];
                assert.strictEqual((_$$Tools$class28 = $.Tools.class).stringGetDomainName.apply(_$$Tools$class28, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('stringGetPortNumber (' + roundType + ')', function (assert) {
            var _arr62 = [[['https://www.test.de/site/subSite?param=value#hash'], 443], [['http://www.test.de'], 80], [['http://www.test.de', true], true], [['www.test.de', true], true], [['a', true], true], [['a', true], true], [['a:80'], 80], [['a:20'], 20], [['a:444'], 444], [['http://localhost:89'], 89], [['https://localhost:89'], 89]];

            for (var _i62 = 0; _i62 < _arr62.length; _i62++) {
                var _$$Tools$class29;

                var test = _arr62[_i62];
                assert.strictEqual((_$$Tools$class29 = $.Tools.class).stringGetPortNumber.apply(_$$Tools$class29, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('stringGetProtocolName (' + roundType + ')', function (assert) {
            var _arr63 = [[['https://www.test.de/site/subSite?param=value#hash'], 'https'], [['http://www.test.de'], 'http'], [['//www.test.de', $.global.location.protocol.substring(0, $.global.location.protocol.length - 1)], $.global.location.protocol.substring(0, $.global.location.protocol.length - 1)], [['http://a.de'], 'http'], [['ftp://localhost'], 'ftp'], [['a', $.global.location.protocol.substring(0, $.global.location.protocol.length - 1)], $.global.location.protocol.substring(0, $.global.location.protocol.length - 1)], [['a/site/subSite?param=value#hash', $.global.location.protocol.substring(0, $.global.location.protocol.length - 1)], $.global.location.protocol.substring(0, $.global.location.protocol.length - 1)], [['/a/site/subSite?param=value#hash', 'a'], 'a'], [['alternate.local/a/site/subSite?param=value#hash', 'b'], 'b'], [['alternate.local/', 'c'], 'c'], [['', $.global.location.protocol.substring(0, $.global.location.protocol.length - 1)], $.global.location.protocol.substring(0, $.global.location.protocol.length - 1)]];

            for (var _i63 = 0; _i63 < _arr63.length; _i63++) {
                var _$$Tools$class30;

                var test = _arr63[_i63];
                assert.strictEqual((_$$Tools$class30 = $.Tools.class).stringGetProtocolName.apply(_$$Tools$class30, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('stringGetURLVariable (' + roundType + ')', function (assert) {
            assert.ok(Array.isArray($.Tools.class.stringGetURLVariable()));
            assert.ok(Array.isArray($.Tools.class.stringGetURLVariable(null, '&')));
            assert.ok(Array.isArray($.Tools.class.stringGetURLVariable(null, '#')));
            var _arr64 = [[['notExisting'], undefined], [['notExisting', '&'], undefined], [['notExisting', '#'], undefined], [['test', '?test=2'], '2'], [['test', 'test=2'], '2'], [['test', 'test=2&a=2'], '2'], [['test', 'b=3&test=2&a=2'], '2'], [['test', '?b=3&test=2&a=2'], '2'], [['test', '?b=3&test=2&a=2'], '2'], [['test', '&', '$', '!', '', '#$test=2'], '2'], [['test', '&', '$', '!', '?test=4', '#$test=3'], '4'], [['a', '&', '$', '!', '?test=4', '#$test=3'], undefined], [['test', '#', '$', '!', '?test=4', '#$test=3'], '3'], [['test', '#', '$', '!', '', '#!test#$test=4'], '4'], [['test', '#', '$', '!', '', '#!/test/a#$test=4'], '4'], [['test', '#', '$', '!', '', '#!/test/a/#$test=4'], '4'], [['test', '#', '$', '!', '', '#!test/a/#$test=4'], '4'], [['test', '#', '$', '!', '', '#!/#$test=4'], '4'], [['test', '#', '$', '!', '', '#!test?test=3#$test=4'], '4'], [['test', '&', '?', '!', null, '#!a?test=3'], '3'], [['test', '&', '$', '!', null, '#!test#$test=4'], '4'], [['test', '&', '$', '!', null, '#!test?test=3#$test=4'], '4']];
            for (var _i64 = 0; _i64 < _arr64.length; _i64++) {
                var _$$Tools$class31;

                var test = _arr64[_i64];
                assert.strictEqual((_$$Tools$class31 = $.Tools.class).stringGetURLVariable.apply(_$$Tools$class31, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('stringIsInternalURL (' + roundType + ')', function (assert) {
            var _arr65 = [['https://www.test.de/site/subSite?param=value#hash', 'https://www.test.de/site/subSite?param=value#hash'], ['//www.test.de/site/subSite?param=value#hash', '//www.test.de/site/subSite?param=value#hash'], [$.global.location.protocol + '//www.test.de/site/subSite' + '?param=value#hash', $.global.location.protocol + '//www.test.de/site/subSite' + '?param=value#hash'], ['https://www.test.de:443/site/subSite?param=value#hash', 'https://www.test.de/site/subSite?param=value#hash'], ['//www.test.de:80/site/subSite?param=value#hash', '//www.test.de/site/subSite?param=value#hash'], [$.global.location.href, $.global.location.href], ['1', $.global.location.href], ['#1', $.global.location.href], ['/a', $.global.location.href]];

            for (var _i65 = 0; _i65 < _arr65.length; _i65++) {
                var _$$Tools$class32;

                var test = _arr65[_i65];
                assert.ok((_$$Tools$class32 = $.Tools.class).stringIsInternalURL.apply(_$$Tools$class32, (0, _toConsumableArray3.default)(test)));
            }var _arr66 = [[$.global.location.protocol + '//www.test.de/site/subSite' + '?param=value#hash', 'ftp://www.test.de/site/subSite?param=value#hash'], ['https://www.test.de/site/subSite?param=value#hash', 'http://www.test.de/site/subSite?param=value#hash'], ['http://www.test.de/site/subSite?param=value#hash', 'test.de/site/subSite?param=value#hash'], [$.global.location.protocol + '//www.test.de:' + ($.global.location.port + '/site/subSite') + '?param=value#hash/site/subSite?param=value#hash'], ['http://www.test.de:' + $.global.location.port + '/site/subSite?' + 'param=value#hash', 'https://www.test.de/site/subSite?param=value#hash']];
            for (var _i66 = 0; _i66 < _arr66.length; _i66++) {
                var _$$Tools$class33;

                var _test11 = _arr66[_i66];
                assert.notOk((_$$Tools$class33 = $.Tools.class).stringIsInternalURL.apply(_$$Tools$class33, (0, _toConsumableArray3.default)(_test11)));
            }
        });
        this.test('stringNormalizeURL (' + roundType + ')', function (assert) {
            var _arr67 = [['www.test.com', 'http://www.test.com'], ['test', 'http://test'], ['http://test', 'http://test'], ['https://test', 'https://test']];

            for (var _i67 = 0; _i67 < _arr67.length; _i67++) {
                var test = _arr67[_i67];
                assert.strictEqual($.Tools.class.stringNormalizeURL(test[0]), test[1]);
            }
        });
        this.test('stringRepresentURL (' + roundType + ')', function (assert) {
            var _arr68 = [['http://www.test.com', 'www.test.com'], ['ftp://www.test.com', 'ftp://www.test.com'], ['https://www.test.com', 'www.test.com'], [undefined, ''], [null, ''], [false, ''], [true, ''], ['', ''], [' ', '']];

            for (var _i68 = 0; _i68 < _arr68.length; _i68++) {
                var test = _arr68[_i68];
                assert.strictEqual($.Tools.class.stringRepresentURL(test[0]), test[1]);
            }
        });
        // /// endregion
        this.test('stringCompressStyleValue (' + roundType + ')', function (assert) {
            var _arr69 = [['', ''], [' border: 1px  solid red;', 'border:1px solid red'], ['border : 1px solid red ', 'border:1px solid red'], ['border : 1px  solid red ;', 'border:1px solid red'], ['border : 1px  solid red   ; ', 'border:1px solid red'], ['height: 1px ; width:2px ; ', 'height:1px;width:2px'], [';;height: 1px ; width:2px ; ;', 'height:1px;width:2px'], [' ;;height: 1px ; width:2px ; ;', 'height:1px;width:2px'], [';height: 1px ; width:2px ; ', 'height:1px;width:2px']];

            for (var _i69 = 0; _i69 < _arr69.length; _i69++) {
                var test = _arr69[_i69];
                assert.strictEqual($.Tools.class.stringCompressStyleValue(test[0]), test[1]);
            }
        });
        this.test('stringCamelCaseToDelimited (' + roundType + ')', function (assert) {
            var _arr70 = [[['hansPeter'], 'hans-peter'], [['hansPeter', '|'], 'hans|peter'], [[''], ''], [['h'], 'h'], [['hP', ''], 'hp'], [['hansPeter'], 'hans-peter'], [['hans-peter'], 'hans-peter'], [['hansPeter', '_'], 'hans_peter'], [['hansPeter', '+'], 'hans+peter'], [['Hans'], 'hans'], [['hansAPIURL', '-', ['api', 'url']], 'hans-api-url'], [['hansPeter', '-', []], 'hans-peter']];

            for (var _i70 = 0; _i70 < _arr70.length; _i70++) {
                var _$$Tools$class34;

                var test = _arr70[_i70];
                assert.strictEqual((_$$Tools$class34 = $.Tools.class).stringCamelCaseToDelimited.apply(_$$Tools$class34, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('stringCapitalize (' + roundType + ')', function (assert) {
            var _arr71 = [['hansPeter', 'HansPeter'], ['', ''], ['a', 'A'], ['A', 'A'], ['AA', 'AA'], ['Aa', 'Aa'], ['aa', 'Aa']];

            for (var _i71 = 0; _i71 < _arr71.length; _i71++) {
                var test = _arr71[_i71];
                assert.strictEqual($.Tools.class.stringCapitalize(test[0]), test[1]);
            }
        });
        this.test('stringDelimitedToCamelCase (' + roundType + ')', function (assert) {
            var _arr72 = [[['hans-peter'], 'hansPeter'], [['hans|peter', '|'], 'hansPeter'], [[''], ''], [['h'], 'h'], [['hans-peter'], 'hansPeter'], [['hans--peter'], 'hans-Peter'], [['Hans-Peter'], 'HansPeter'], [['-Hans-Peter'], '-HansPeter'], [['-'], '-'], [['hans-peter', '_'], 'hans-peter'], [['hans_peter', '_'], 'hansPeter'], [['hans_id', '_'], 'hansID'], [['url_hans_id', '_', ['hans']], 'urlHANSId'], [['url_hans_1', '_'], 'urlHans1'], [['hansUrl1', '-', ['url'], true], 'hansUrl1'], [['hans-url', '-', ['url'], true], 'hansURL'], [['hans-Url', '-', ['url'], true], 'hansUrl'], [['hans-Url', '-', ['url'], false], 'hansURL'], [['hans-Url', '-', [], false], 'hansUrl'], [['hans--Url', '-', [], false, true], 'hansUrl']];

            for (var _i72 = 0; _i72 < _arr72.length; _i72++) {
                var _$$Tools$class35;

                var test = _arr72[_i72];
                assert.strictEqual((_$$Tools$class35 = $.Tools.class).stringDelimitedToCamelCase.apply(_$$Tools$class35, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('stringFormat (' + roundType + ')', function (assert) {
            var _arr73 = [[['{1}', 'test'], 'test'], [['', 'test'], ''], [['{1}'], '{1}'], [['{1} test {2} - {2}', 1, 2], '1 test 2 - 2']];

            for (var _i73 = 0; _i73 < _arr73.length; _i73++) {
                var _$$Tools$class36;

                var test = _arr73[_i73];
                assert.strictEqual((_$$Tools$class36 = $.Tools.class).stringFormat.apply(_$$Tools$class36, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('stringGetRegularExpressionValidated (' + roundType + ')', function (assert) {
            var _arr74 = [['that\'s no regex: .*$', 'that\'s no regex: \\.\\*\\$'], ['', ''], ['-[]()^$*+.}-\\', '\\-\\[\\]\\(\\)\\^\\$\\*\\+\\.\\}\\-\\\\'], ['-', '\\-']];

            for (var _i74 = 0; _i74 < _arr74.length; _i74++) {
                var test = _arr74[_i74];
                assert.strictEqual($.Tools.class.stringGetRegularExpressionValidated(test[0]), test[1]);
            }
        });
        this.test('stringLowerCase (' + roundType + ')', function (assert) {
            var _arr75 = [['HansPeter', 'hansPeter'], ['', ''], ['A', 'a'], ['a', 'a'], ['aa', 'aa'], ['Aa', 'aa'], ['aa', 'aa']];

            for (var _i75 = 0; _i75 < _arr75.length; _i75++) {
                var test = _arr75[_i75];
                assert.strictEqual($.Tools.class.stringLowerCase(test[0]), test[1]);
            }
        });
        this.test('stringFindNormalizedMatchRange (' + roundType + ')', function (assert) {
            var _arr76 = [[['', ''], null], [['hans', ''], null], [['hans', 'a'], [1, 2]], [['hans', 'an'], [1, 3]], [['hans', 'han'], [0, 3]], [['hans', 'hans'], [0, 4]], [['hans', 'ans'], [1, 4]], [['hans hans', 'ans'], [1, 4]], [[' hAns ', 'ans', function (value) {
                return value.toLowerCase();
            }], [2, 5]], [['a straße b', 'strasse', function (value) {
                return value.replace(/ß/g, 'ss').toLowerCase();
            }], [2, 8]], [['a strasse b', 'strasse', function (value) {
                return value.replace(/ß/g, 'ss').toLowerCase();
            }], [2, 9]], [['a strasse b', 'straße', function (value) {
                return value.replace(/ß/g, 'ss').toLowerCase();
            }], [2, 9]]];

            for (var _i76 = 0; _i76 < _arr76.length; _i76++) {
                var _$$Tools$class37;

                var test = _arr76[_i76];
                assert.deepEqual((_$$Tools$class37 = $.Tools.class).stringFindNormalizedMatchRange.apply(_$$Tools$class37, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('stringMark (' + roundType + ')', function (assert) {
            var _arr77 = [[[''], ''], [['test', 'e'], 't<span class="tools-mark">e</span>st'], [['test', 'es'], 't<span class="tools-mark">es</span>t'], [['test', 'test'], '<span class="tools-mark">test</span>'], [['test', ''], 'test'], [['test', 'tests'], 'test'], [['', 'test'], ''], [['test', 'e', '<a>{1}</a>'], 't<a>e</a>st'], [['test', ['e'], '<a>{1}</a>'], 't<a>e</a>st'], [['test', 'E', '<a>{1}</a>'], 't<a>e</a>st'], [['test', 'E', '<a>{1}</a>'], 't<a>e</a>st'], [['tesT', 't', '<a>{1}</a>'], '<a>t</a>es<a>T</a>'], [['tesT', 't', '<a>{1} - {1}</a>'], '<a>t - t</a>es<a>T - T</a>'], [['test', 'E', '<a>{1}</a>', function (value) {
                return '' + value;
            }], 'test'], [['abcd', ['a', 'c']], '<span class="tools-mark">a</span>b' + '<span class="tools-mark">c</span>d'], [['aabcd', ['a', 'c']], '<span class="tools-mark">a</span>' + '<span class="tools-mark">a</span>b' + '<span class="tools-mark">c</span>d'], [['acbcd', ['a', 'c', 'd']], '<span class="tools-mark">a</span>' + '<span class="tools-mark">c</span>b' + '<span class="tools-mark">c</span>' + '<span class="tools-mark">d</span>'], [['a EBikes München', ['ebikes', 'münchen'], '<a>{1}</a>', function (value) {
                return ('' + value).toLowerCase();
            }], 'a <a>EBikes</a> <a>München</a>'], [['a E-Bikes München', ['ebikes', 'münchen'], '<a>{1}</a>', function (value) {
                return ('' + value).toLowerCase().replace('-', '');
            }], 'a <a>E-Bikes</a> <a>München</a>'], [['a str. 2', ['straße', '2'], '<a>{1}</a>', function (value) {
                return ('' + value).toLowerCase().replace('str.', 'strasse').replace('ß', 'ss');
            }], 'a <a>str.</a> <a>2</a>'], [['EGO Movement Store E-Bikes München', ['eBikes', 'München'], '<a>{1}</a>', function (value) {
                return ('' + value).toLowerCase().replace(/[-_]+/g, '').replace(/ß/g, 'ss').replace(/(^| )str\./g, '$1strasse').replace(/[& ]+/g, ' ');
            }], 'EGO Movement Store <a>E-Bikes</a> <a>München</a>'], [['str.A strasse B straße C str. D', ['str.'], '<a>{1}</a>', function (value) {
                return ('' + value).toLowerCase().replace(/[-_]+/g, '').replace(/ß/g, 'ss').replace(/(^| )str\./g, '$1strasse').replace(/[& ]+/g, ' ');
            }], '<a>str.</a>A <a>strasse</a> B <a>straße</a> C <a>str.</a> D']];

            for (var _i77 = 0; _i77 < _arr77.length; _i77++) {
                var _$$Tools$class38;

                var test = _arr77[_i77];
                assert.strictEqual((_$$Tools$class38 = $.Tools.class).stringMark.apply(_$$Tools$class38, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('stringMD5 (' + roundType + ')', function (assert) {
            var _arr78 = [[[''], 'd41d8cd98f00b204e9800998ecf8427e'], [['test'], '098f6bcd4621d373cade4e832627b4f6'], [['ä'], '8419b71c87a225a2c70b50486fbee545'], [['test', true], '098f6bcd4621d373cade4e832627b4f6'], [['ä', true], 'c15bcc5577f9fade4b4a3256190a59b0']];

            for (var _i78 = 0; _i78 < _arr78.length; _i78++) {
                var _$$Tools$class39;

                var test = _arr78[_i78];
                assert.strictEqual((_$$Tools$class39 = $.Tools.class).stringMD5.apply(_$$Tools$class39, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('stringNormalizePhoneNumber (' + roundType + ')', function (assert) {
            var _arr79 = [['0', '0'], [0, '0'], ['+49 172 (0) / 0212 - 3', '0049172002123']];

            for (var _i79 = 0; _i79 < _arr79.length; _i79++) {
                var test = _arr79[_i79];
                assert.strictEqual($.Tools.class.stringNormalizePhoneNumber(test[0]), test[1]);
            }
        });
        if (TARGET_TECHNOLOGY === 'node') this.test('stringParseEncodedObject', function (assert) {
            var _arr80 = [[[''], null], [['null'], null], [['{a: undefined}'], { a: undefined }], [[new Buffer('{a: undefined}').toString('base64')], { a: undefined }], [['{a: 2}'], { a: 2 }], [[new Buffer('{a: 1}').toString('base64')], { a: 1 }], [['null'], null], [[new Buffer('null').toString('base64')], null], [['{}'], {}], [[new Buffer('{}').toString('base64')], {}], [['{a: a}'], null], [[new Buffer('{a: a}').toString('base64')], null], [['{a: scope.a}', { a: 2 }], { a: 2 }], [[new Buffer('{a: scope.a}').toString('base64'), { a: 2 }], { a: 2 }]];

            for (var _i80 = 0; _i80 < _arr80.length; _i80++) {
                var _$$Tools$class40;

                var test = _arr80[_i80];
                assert.deepEqual((_$$Tools$class40 = $.Tools.class).stringParseEncodedObject.apply(_$$Tools$class40, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('stringRepresentPhoneNumber (' + roundType + ')', function (assert) {
            var _arr81 = [['0', '0'], ['0172-12321-1', '+49 (0) 172 / 123 21-1'], ['0172-123211', '+49 (0) 172 / 12 32 11'], ['0172-1232111', '+49 (0) 172 / 123 21 11'], [undefined, ''], [null, ''], [false, ''], [true, ''], ['', ''], [' ', '']];

            for (var _i81 = 0; _i81 < _arr81.length; _i81++) {
                var test = _arr81[_i81];
                assert.strictEqual($.Tools.class.stringRepresentPhoneNumber(test[0]), test[1]);
            }
        });
        this.test('stringDecodeHTMLEntities (' + roundType + ')', function (assert) {
            var _arr82 = [['', ''], ['<div></div>', '<div></div>'], ['<div>&amp;</div>', '<div>&</div>'], ['<div>&amp;&auml;&Auml;&uuml;&Uuml;&ouml;&Ouml;</div>', '<div>&äÄüÜöÖ</div>']];

            for (var _i82 = 0; _i82 < _arr82.length; _i82++) {
                var test = _arr82[_i82];
                assert.equal($.Tools.class.stringDecodeHTMLEntities(test[0]), test[1]);
            }
        });
        this.test('stringNormalizeDomNodeSelector (' + roundType + ')', function (assert) {
            var _arr83 = [['div', 'body div'], ['div p', 'body div p'], ['body div', 'body div'], ['body div p', 'body div p'], ['', 'body']];

            for (var _i83 = 0; _i83 < _arr83.length; _i83++) {
                var test = _arr83[_i83];
                assert.strictEqual(tools.stringNormalizeDomNodeSelector(test[0]), test[1]);
            }var _arr84 = ['', 'div', 'div, p'];
            for (var _i84 = 0; _i84 < _arr84.length; _i84++) {
                var _test12 = _arr84[_i84];
                assert.strictEqual($.Tools({
                    domNodeSelectorPrefix: ''
                }).stringNormalizeDomNodeSelector(_test12), _test12);
            }
        });
        // // endregion
        // // region number
        this.test('numberGetUTCTimestamp (' + roundType + ')', function (assert) {
            var _arr85 = [[[new Date(0)], 0], [[new Date(1)], 0.001], [[new Date(0), true], 0], [[new Date(1000), false], 1], [[new Date(1000), true], 1000], [[new Date(0), false], 0]];

            for (var _i85 = 0; _i85 < _arr85.length; _i85++) {
                var _$$Tools$class41;

                var test = _arr85[_i85];
                assert.strictEqual((_$$Tools$class41 = $.Tools.class).numberGetUTCTimestamp.apply(_$$Tools$class41, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        this.test('numberIsNotANumber (' + roundType + ')', function (assert) {
            var _arr86 = [[NaN, true], [{}, false], [undefined, false], [new Date().toString(), false], [null, false], [false, false], [true, false], [0, false]];

            for (var _i86 = 0; _i86 < _arr86.length; _i86++) {
                var test = _arr86[_i86];
                assert.strictEqual($.Tools.class.numberIsNotANumber(test[0]), test[1]);
            }
        });
        this.test('numberRound (' + roundType + ')', function (assert) {
            var _arr87 = [[[1.5, 0], 2], [[1.4, 0], 1], [[1.4, -1], 0], [[1000, -2], 1000], [[999, -2], 1000], [[950, -2], 1000], [[949, -2], 900], [[1.2345], 1], [[1.2345, 2], 1.23], [[1.2345, 3], 1.235], [[1.2345, 4], 1.2345], [[699, -2], 700], [[650, -2], 700], [[649, -2], 600]];

            for (var _i87 = 0; _i87 < _arr87.length; _i87++) {
                var _$$Tools$class42;

                var test = _arr87[_i87];
                assert.strictEqual((_$$Tools$class42 = $.Tools.class).numberRound.apply(_$$Tools$class42, (0, _toConsumableArray3.default)(test[0])), test[1]);
            }
        });
        // // endregion
        // // region data transfer
        this.test('checkReachability', function () {
            var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(assert) {
                var done, _arr88, _i88, test, _$$Tools$class43;

                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                done = assert.async();
                                _arr88 = [['unknownURL', false], ['unknownURL', false, 301], ['http://unknownHostName', true, 200, 0.025], ['http://unknownHostName', true, [200], 0.025], ['http://unknownHostName', true, [200, 301], 0.025]];
                                _i88 = 0;

                            case 3:
                                if (!(_i88 < _arr88.length)) {
                                    _context7.next = 17;
                                    break;
                                }

                                test = _arr88[_i88];
                                _context7.prev = 5;
                                _context7.next = 8;
                                return (_$$Tools$class43 = $.Tools.class).checkReachability.apply(_$$Tools$class43, (0, _toConsumableArray3.default)(test));

                            case 8:
                                assert.ok(false);
                                _context7.next = 14;
                                break;

                            case 11:
                                _context7.prev = 11;
                                _context7.t0 = _context7['catch'](5);

                                assert.ok(true);

                            case 14:
                                _i88++;
                                _context7.next = 3;
                                break;

                            case 17:
                                done();

                            case 18:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, _this, [[5, 11]]);
            }));

            return function (_x7) {
                return _ref7.apply(this, arguments);
            };
        }());
        this.test('checkUnreachability', function () {
            var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(assert) {
                var done, _arr89, _i89, test, _$$Tools$class44;

                return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                done = assert.async();
                                _arr89 = [['unknownURL', false, 10, 0.1, 200], ['unknownURL', true, 10, 0.1, 200], ['unknownURL', true, 10, 0.1, [200]], ['unknownURL', true, 10, 0.1, [200, 301]], ['http://unknownHostName', true]];
                                _i89 = 0;

                            case 3:
                                if (!(_i89 < _arr89.length)) {
                                    _context8.next = 17;
                                    break;
                                }

                                test = _arr89[_i89];
                                _context8.prev = 5;
                                _context8.next = 8;
                                return (_$$Tools$class44 = $.Tools.class).checkUnreachability.apply(_$$Tools$class44, (0, _toConsumableArray3.default)(test));

                            case 8:
                                assert.ok(true);
                                _context8.next = 14;
                                break;

                            case 11:
                                _context8.prev = 11;
                                _context8.t0 = _context8['catch'](5);

                                assert.ok(false);

                            case 14:
                                _i89++;
                                _context8.next = 3;
                                break;

                            case 17:
                                done();

                            case 18:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, _this, [[5, 11]]);
            }));

            return function (_x8) {
                return _ref8.apply(this, arguments);
            };
        }());
        if (typeof targetTechnology !== 'undefined' && targetTechnology === 'web' && roundType === 'full') {
            this.test('sendToIFrame (' + roundType + ')', function (assert) {
                var iFrame = $('<iframe>').hide().attr('name', 'test');
                $('body').append(iFrame);
                assert.ok($.Tools.class.sendToIFrame(iFrame, window.document.URL, { test: 5 }, 'get', true));
            });
            this.test('sendToExternalURL (' + roundType + ')', function (assert) {
                return assert.ok(tools.sendToExternalURL(window.document.URL, { test: 5 }));
            });
        }
        // // endregion
        // // region file
        if (TARGET_TECHNOLOGY === 'node') {
            this.test('copyDirectoryRecursive (' + roundType + ')', function () {
                var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(assert) {
                    var done, result;
                    return _regenerator2.default.wrap(function _callee9$(_context9) {
                        while (1) {
                            switch (_context9.prev = _context9.next) {
                                case 0:
                                    done = assert.async();
                                    result = '';
                                    _context9.prev = 2;
                                    _context9.next = 5;
                                    return $.Tools.class.copyDirectoryRecursive('./', './test.compiled', function () {
                                        return null;
                                    });

                                case 5:
                                    result = _context9.sent;
                                    _context9.next = 11;
                                    break;

                                case 8:
                                    _context9.prev = 8;
                                    _context9.t0 = _context9['catch'](2);

                                    console.error(_context9.t0);

                                case 11:
                                    assert.ok(result.endsWith('/test.compiled'));
                                    removeDirectoryRecursivelySync('./test.compiled');
                                    done();

                                case 14:
                                case 'end':
                                    return _context9.stop();
                            }
                        }
                    }, _callee9, _this, [[2, 8]]);
                }));

                return function (_x9) {
                    return _ref9.apply(this, arguments);
                };
            }());
            this.test('copyDirectoryRecursiveSync (' + roundType + ')', function (assert) {
                assert.ok($.Tools.class.copyDirectoryRecursiveSync('./', './synctest.compiled', function () {
                    return null;
                }).endsWith('/synctest.compiled'));
                removeDirectoryRecursivelySync('./synctest.compiled');
            });
            this.test('copyFile (' + roundType + ')', function () {
                var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(assert) {
                    var done, result;
                    return _regenerator2.default.wrap(function _callee10$(_context10) {
                        while (1) {
                            switch (_context10.prev = _context10.next) {
                                case 0:
                                    done = assert.async();
                                    result = '';
                                    _context10.prev = 2;
                                    _context10.next = 5;
                                    return $.Tools.class.copyFile(path.resolve('./', path.basename(__filename)), './test.compiled.js');

                                case 5:
                                    result = _context10.sent;
                                    _context10.next = 11;
                                    break;

                                case 8:
                                    _context10.prev = 8;
                                    _context10.t0 = _context10['catch'](2);

                                    console.error(_context10.t0);

                                case 11:
                                    assert.ok(result.endsWith('/test.compiled.js'));
                                    fileSystem.unlinkSync('./test.compiled.js');
                                    done();

                                case 14:
                                case 'end':
                                    return _context10.stop();
                            }
                        }
                    }, _callee10, _this, [[2, 8]]);
                }));

                return function (_x10) {
                    return _ref10.apply(this, arguments);
                };
            }());
            this.test('copyFileSync (' + roundType + ')', function (assert) {
                assert.ok($.Tools.class.copyFileSync(path.resolve('./', path.basename(__filename)), './synctest.compiled.js').endsWith('/synctest.compiled.js'));
                fileSystem.unlinkSync('./synctest.compiled.js');
            });
            this.test('isDirectory (' + roundType + ')', function () {
                var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(assert) {
                    var done, _arr90, _i90, filePath, result, _arr91, _i91, _filePath;

                    return _regenerator2.default.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    done = assert.async();
                                    _arr90 = ['./', '../'];
                                    _i90 = 0;

                                case 3:
                                    if (!(_i90 < _arr90.length)) {
                                        _context11.next = 19;
                                        break;
                                    }

                                    filePath = _arr90[_i90];
                                    result = void 0;
                                    _context11.prev = 6;
                                    _context11.next = 9;
                                    return $.Tools.class.isDirectory(filePath);

                                case 9:
                                    result = _context11.sent;
                                    _context11.next = 15;
                                    break;

                                case 12:
                                    _context11.prev = 12;
                                    _context11.t0 = _context11['catch'](6);

                                    console.error(_context11.t0);

                                case 15:
                                    assert.ok(result);

                                case 16:
                                    _i90++;
                                    _context11.next = 3;
                                    break;

                                case 19:
                                    _arr91 = [path.resolve('./', path.basename(__filename))];
                                    _i91 = 0;

                                case 21:
                                    if (!(_i91 < _arr91.length)) {
                                        _context11.next = 37;
                                        break;
                                    }

                                    _filePath = _arr91[_i91];
                                    result = void 0;
                                    _context11.prev = 24;
                                    _context11.next = 27;
                                    return $.Tools.class.isDirectory(_filePath);

                                case 27:
                                    result = _context11.sent;
                                    _context11.next = 33;
                                    break;

                                case 30:
                                    _context11.prev = 30;
                                    _context11.t1 = _context11['catch'](24);

                                    console.error(_context11.t1);

                                case 33:
                                    assert.notOk(result);

                                case 34:
                                    _i91++;
                                    _context11.next = 21;
                                    break;

                                case 37:
                                    done();

                                case 38:
                                case 'end':
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, _this, [[6, 12], [24, 30]]);
                }));

                return function (_x11) {
                    return _ref11.apply(this, arguments);
                };
            }());
            this.test('isDirectorySync (' + roundType + ')', function (assert) {
                var _arr92 = ['./', '../'];

                for (var _i92 = 0; _i92 < _arr92.length; _i92++) {
                    var filePath = _arr92[_i92];
                    assert.ok($.Tools.class.isDirectorySync(filePath));
                }var _arr93 = [path.resolve('./', path.basename(__filename))];
                for (var _i93 = 0; _i93 < _arr93.length; _i93++) {
                    var _filePath2 = _arr93[_i93];
                    assert.notOk($.Tools.class.isDirectorySync(_filePath2));
                }
            });
            this.test('isFile (' + roundType + ')', function () {
                var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(assert) {
                    var done, _arr94, _i94, filePath, result, _arr95, _i95, _filePath3;

                    return _regenerator2.default.wrap(function _callee12$(_context12) {
                        while (1) {
                            switch (_context12.prev = _context12.next) {
                                case 0:
                                    done = assert.async();
                                    _arr94 = [path.resolve('./', path.basename(__filename))];
                                    _i94 = 0;

                                case 3:
                                    if (!(_i94 < _arr94.length)) {
                                        _context12.next = 19;
                                        break;
                                    }

                                    filePath = _arr94[_i94];
                                    result = void 0;
                                    _context12.prev = 6;
                                    _context12.next = 9;
                                    return $.Tools.class.isFile(filePath);

                                case 9:
                                    result = _context12.sent;
                                    _context12.next = 15;
                                    break;

                                case 12:
                                    _context12.prev = 12;
                                    _context12.t0 = _context12['catch'](6);

                                    console.error(_context12.t0);

                                case 15:
                                    assert.ok(result);

                                case 16:
                                    _i94++;
                                    _context12.next = 3;
                                    break;

                                case 19:
                                    _arr95 = ['./', '../'];
                                    _i95 = 0;

                                case 21:
                                    if (!(_i95 < _arr95.length)) {
                                        _context12.next = 37;
                                        break;
                                    }

                                    _filePath3 = _arr95[_i95];
                                    result = void 0;
                                    _context12.prev = 24;
                                    _context12.next = 27;
                                    return $.Tools.class.isFile(_filePath3);

                                case 27:
                                    result = _context12.sent;
                                    _context12.next = 33;
                                    break;

                                case 30:
                                    _context12.prev = 30;
                                    _context12.t1 = _context12['catch'](24);

                                    console.error(_context12.t1);

                                case 33:
                                    assert.notOk(result);

                                case 34:
                                    _i95++;
                                    _context12.next = 21;
                                    break;

                                case 37:
                                    done();

                                case 38:
                                case 'end':
                                    return _context12.stop();
                            }
                        }
                    }, _callee12, _this, [[6, 12], [24, 30]]);
                }));

                return function (_x12) {
                    return _ref12.apply(this, arguments);
                };
            }());
            this.test('isFileSync (' + roundType + ')', function (assert) {
                var _arr96 = [path.resolve('./', path.basename(__filename))];

                for (var _i96 = 0; _i96 < _arr96.length; _i96++) {
                    var filePath = _arr96[_i96];
                    assert.ok($.Tools.class.isFileSync(filePath));
                }var _arr97 = ['./', '../'];
                for (var _i97 = 0; _i97 < _arr97.length; _i97++) {
                    var _filePath4 = _arr97[_i97];
                    assert.notOk($.Tools.class.isFileSync(_filePath4));
                }
            });
            this.test('walkDirectoryRecursively (' + roundType + ')', function () {
                var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(assert) {
                    var done, filePaths, callback, files;
                    return _regenerator2.default.wrap(function _callee13$(_context13) {
                        while (1) {
                            switch (_context13.prev = _context13.next) {
                                case 0:
                                    done = assert.async();
                                    filePaths = [];

                                    callback = function callback(filePath) {
                                        filePaths.push(filePath);
                                        return null;
                                    };

                                    files = [];
                                    _context13.prev = 4;
                                    _context13.next = 7;
                                    return $.Tools.class.walkDirectoryRecursively('./', callback);

                                case 7:
                                    files = _context13.sent;
                                    _context13.next = 13;
                                    break;

                                case 10:
                                    _context13.prev = 10;
                                    _context13.t0 = _context13['catch'](4);

                                    console.error(_context13.t0);

                                case 13:
                                    assert.strictEqual(files.length, 1);
                                    assert.ok(files[0].hasOwnProperty('path'));
                                    assert.ok(files[0].hasOwnProperty('stats'));
                                    assert.strictEqual(filePaths.length, 1);
                                    done();

                                case 18:
                                case 'end':
                                    return _context13.stop();
                            }
                        }
                    }, _callee13, _this, [[4, 10]]);
                }));

                return function (_x13) {
                    return _ref13.apply(this, arguments);
                };
            }());
            this.test('walkDirectoryRecursivelySync (' + roundType + ')', function (assert) {
                var filePaths = [];
                var callback = function callback(filePath) {
                    filePaths.push(filePath);
                    return null;
                };
                var files = $.Tools.class.walkDirectoryRecursivelySync('./', callback);
                assert.strictEqual(files.length, 1);
                assert.ok(files[0].hasOwnProperty('path'));
                assert.ok(files[0].hasOwnProperty('stats'));
                assert.strictEqual(filePaths.length, 1);
            });
        }
        // // endregion
        // // region process handler
        if (TARGET_TECHNOLOGY === 'node') {
            this.test('getProcessCloseHandler (' + roundType + ')', function (assert) {
                return assert.strictEqual((0, _typeof3.default)($.Tools.class.getProcessCloseHandler(function () {}, function () {})), 'function');
            });
            this.test('handleChildProcess (' + roundType + ')', function (assert) {
                /**
                 * A mockup duplex stream for mocking "stdout" and "strderr"
                 * process connections.
                 */
                var MockupDuplexStream = function (_require$Duplex) {
                    (0, _inherits3.default)(MockupDuplexStream, _require$Duplex);

                    function MockupDuplexStream() {
                        (0, _classCallCheck3.default)(this, MockupDuplexStream);
                        return (0, _possibleConstructorReturn3.default)(this, (MockupDuplexStream.__proto__ || (0, _getPrototypeOf2.default)(MockupDuplexStream)).apply(this, arguments));
                    }

                    (0, _createClass3.default)(MockupDuplexStream, [{
                        key: '_read',

                        /**
                         * Triggers if contents from current stream should be red.
                         * @param size - Number of bytes to read asynchronously.
                         * @returns Red data.
                         */
                        value: function _read(size) {
                            return '' + size;
                        }
                        /**
                         * Triggers if contents should be written on current stream.
                         * @param chunk - The chunk to be written. Will always be a
                         * buffer unless the "decodeStrings" option was set to "false".
                         * @param encoding - Specifies encoding to be used as input
                         * data.
                         * @param callback - Will be called if data has been written.
                         * @returns Returns "true" if more data could be written and
                         * "false" otherwise.
                         */

                    }, {
                        key: '_write',
                        value: function _write(chunk, encoding, callback) {
                            callback(new Error('test'));
                            return true;
                        }
                    }]);
                    return MockupDuplexStream;
                }(require('stream').Duplex);

                var stdoutMockupDuplexStream = new MockupDuplexStream();
                var stderrMockupDuplexStream = new MockupDuplexStream();
                var childProcess = new ChildProcess();
                childProcess.stdout = stdoutMockupDuplexStream;
                childProcess.stderr = stderrMockupDuplexStream;

                assert.strictEqual($.Tools.class.handleChildProcess(childProcess), childProcess);
            });
        }
        // // endregion
        // / endregion
        // / region protected
        if (roundType === 'full') this.test('_bindEventHelper (' + roundType + ')', function (assert) {
            var _arr98 = [[['body']], [['body'], true], [['body'], false, 'bind']];

            for (var _i98 = 0; _i98 < _arr98.length; _i98++) {
                var test = _arr98[_i98];
                assert.ok(tools._bindEventHelper.apply(tools, (0, _toConsumableArray3.default)(test)));
            }
        });
        // / endregion
        // endregion
    }, closeWindow: false, roundTypes: [] }];
// endregion
// region test runner (in browserAPI)
var testRan = false;
(0, _browserAPI2.default)(function (browserAPI) {
    return _clientnode2.default.timeout(function () {
        var _arr99 = [{ link: {
                attributes: {
                    href: '/node_modules/qunit/qunit/qunit.css',
                    rel: 'stylesheet',
                    type: 'text/css'
                },
                inject: window.document.getElementsByTagName('head')[0]
            } }, { div: { attributes: { id: 'qunit' }, inject: window.document.body } }, { div: {
                attributes: { id: 'qunit-fixture' }, inject: window.document.body
            } }];

        for (var _i99 = 0; _i99 < _arr99.length; _i99++) {
            var domNodeSpecification = _arr99[_i99];
            var domNodeName = (0, _keys2.default)(domNodeSpecification)[0];
            var domNode = window.document.createElement(domNodeName);
            for (var name in domNodeSpecification[domNodeName].attributes) {
                if (domNodeSpecification[domNodeName].attributes.hasOwnProperty(name)) domNode.setAttribute(name, domNodeSpecification[domNodeName].attributes[name]);
            }domNodeSpecification[domNodeName].inject.appendChild(domNode);
        }
        testRan = true;
        // region configuration
        QUnit.config = _clientnode2.default.extendObject(QUnit.config || {}, {
            /*
            notrycatch: true,
            noglobals: true,
            */
            testTimeout: 30 * 1000,
            scrolltop: false
        });
        // endregion
        var testPromises = [];
        var closeWindow = false;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = (0, _getIterator3.default)(tests), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var test = _step2.value;

                if (test.closeWindow) closeWindow = true;
                var _arr100 = ['plain', 'document', 'full'];
                for (var _i100 = 0; _i100 < _arr100.length; _i100++) {
                    var _roundType = _arr100[_i100];
                    if (test.roundTypes.length === 0 || test.roundTypes.includes(_roundType)) {
                        // NOTE: Enforce to reload module to rebind "$".
                        try {
                            delete require.cache[require.resolve('clientnode')];
                            delete require.cache[require.resolve('jquery')];
                        } catch (error) {}
                        /*
                            NOTE: Module bundler like webpack wraps a commonjs
                            environment. So we have to try to clear the underling
                            cache.
                        */
                        var _arr101 = ['clientnode', 'jquery', 'jquery/dist/jquery', 'jquery/dist/jquery.js', 'jquery/dist/jquery.min', 'jquery/dist/jquery.min.js', 'jquery/dist/jquery.min'];
                        for (var _i101 = 0; _i101 < _arr101.length; _i101++) {
                            var request = _arr101[_i101];
                            try {
                                eval('delete require.cache[require.resolve(\'' + (request + '\')]'));
                            } catch (error) {}
                        }var _$bodyDomNode = void 0;
                        var _$ = void 0;
                        if (_roundType === 'plain') {
                            window.$ = null;
                            _$ = require('clientnode').$;
                        } else {
                            if (_roundType === 'full') {
                                var _arr102 = ['document', 'Element', 'HTMLElement', 'matchMedia', 'Node'];

                                for (var _i102 = 0; _i102 < _arr102.length; _i102++) {
                                    var _name = _arr102[_i102];
                                    if (!(_name in global)) global[_name] = window[_name];
                                }window.$ = require('jquery');
                            }
                            _$ = require('clientnode').$;
                            _$.context = window.document;
                            _$bodyDomNode = _$('body');
                        }
                        var _tools = _roundType === 'plain' ? _$.Tools() : _$('body').Tools();
                        var testPromise = test.callback.call(QUnit, _roundType, typeof TARGET_TECHNOLOGY === 'undefined' ? null : TARGET_TECHNOLOGY, _$, browserAPI, _tools, _$bodyDomNode);
                        if ((typeof testPromise === 'undefined' ? 'undefined' : (0, _typeof3.default)(testPromise)) === 'object' && testPromise && 'then' in testPromise) testPromises.push(testPromise);
                    }
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        if (typeof TARGET_TECHNOLOGY === 'undefined' || TARGET_TECHNOLOGY === 'node') _promise2.default.all(testPromises).then(function () {
            if (closeWindow) browserAPI.window.close();
            QUnit.load();
        }).catch(function (error) {
            throw error;
        });
        // region hot module replacement handler
        /*
            NOTE: hot module replacement doesn't work with async tests yet since
            qunit is not resetable yet:
             if (typeof module === 'object' && 'hot' in module && module.hot) {
                module.hot.accept()
                // IgnoreTypeCheck
                module.hot.dispose(():void => {
                    QUnit.reset()
                    console.clear()
                }
            }
        */
        // endregion
    });
});
// endregion
// region export test register function

// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
var testRegistered = false;
/**
 * Registers a complete test set.
 * @param callback - A function containing all tests to run. This callback gets
 * some useful parameters and will be executed in context of qunit.
 * @param roundTypes - A list of round types which should be avoided.
 * @param closeWindow - Indicates whether the window object should be closed
 * after finishing all tests.
 * @returns The list of currently registered tests.
 */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFEaUIsRUFFcEIsT0FBTyxpQkFBUCxLQUE2QixXQURmLEdBRWQsSUFGYyxHQUVQLGlCQUhhLEVBR00sRUFITixFQUdTLFVBSFQsRUFHcUIsTUFIckIsRUFJeEIsYUFKd0IsQ0FBNUI7QUFLQSw0QkFDSSxRQUFPLFdBQVAsdURBQU8sV0FBUCxPQUF1QixRQUF2QixJQUFtQyxXQUFuQyxJQUNBLFVBQVUsV0FGZCxFQUlJLGFBQWEsSUFBYixDQUFrQixXQUFsQjtBQUNQO0FBdkRMO0FBd0RIO0FBbEdLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBbUdOLFlBQ0ksT0FBTyxpQkFBUCxLQUE2QixXQUE3QixJQUNBLHNCQUFzQixNQUYxQixFQUlJLGtCQUFRLEdBQVIsQ0FBWSxZQUFaLEVBQTBCLElBQTFCLENBQStCLFlBQVc7QUFDdEMsZ0JBQUksV0FBSixFQUNJLFdBQVcsTUFBWCxDQUFrQixLQUFsQjtBQUNKLGtCQUFNLElBQU47QUFDSCxTQUpELEVBSUcsS0FKSCxDQUlTLFVBQUMsS0FBRCxFQUFzQjtBQUMzQixrQkFBTSxLQUFOO0FBQ0gsU0FORDtBQU9KO0FBQ0E7Ozs7Ozs7Ozs7OztBQWFBO0FBQ0gsS0E5SHNELENBQTVDO0FBQUEsQ0FBWDtBQStIQTtBQUNBOztBQTRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBL0JBLElBQUksaUJBQXlCLEtBQTdCO0FBQ0EiLCJmaWxlIjoidGVzdC5jb21waWxlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG4vLyAjIS91c3IvYmluL2VudiBub2RlXG4vLyAtKi0gY29kaW5nOiB1dGYtOCAtKi1cbid1c2Ugc3RyaWN0J1xuLyogIVxuICAgIHJlZ2lvbiBoZWFkZXJcbiAgICBDb3B5cmlnaHQgVG9yYmVuIFNpY2tlcnQgKGluZm9bXCJ+YXR+XCJddG9yYmVuLndlYnNpdGUpIDE2LjEyLjIwMTJcblxuICAgIExpY2Vuc2VcbiAgICAtLS0tLS0tXG5cbiAgICBUaGlzIGxpYnJhcnkgd3JpdHRlbiBieSBUb3JiZW4gU2lja2VydCBzdGFuZCB1bmRlciBhIGNyZWF0aXZlIGNvbW1vbnNcbiAgICBuYW1pbmcgMy4wIHVucG9ydGVkIGxpY2Vuc2UuXG4gICAgU2VlIGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LzMuMC9kZWVkLmRlXG4gICAgZW5kcmVnaW9uXG4qL1xuLy8gcmVnaW9uIGltcG9ydHNcbmltcG9ydCBUb29scyBmcm9tICdjbGllbnRub2RlJ1xuaW1wb3J0IHR5cGUge0RvbU5vZGUsIEZpbGUsIFBsYWluT2JqZWN0LCAkRG9tTm9kZX0gZnJvbSAnY2xpZW50bm9kZSdcbmxldCBDaGlsZFByb2Nlc3M6Q2hpbGRQcm9jZXNzXG50cnkge1xuICAgIENoaWxkUHJvY2VzcyA9IGV2YWwoJ3JlcXVpcmUnKSgnY2hpbGRfcHJvY2VzcycpLkNoaWxkUHJvY2Vzc1xufSBjYXRjaCAoZXJyb3IpIHt9XG4vLyBOT1RFOiBPbmx5IG5lZWRlZCBmb3IgZGVidWdnaW5nIHRoaXMgZmlsZS5cbnRyeSB7XG4gICAgbW9kdWxlLnJlcXVpcmUoJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3RlcicpXG59IGNhdGNoIChlcnJvcikge31cbmltcG9ydCBicm93c2VyQVBJIGZyb20gJ3dlYm9wdGltaXplci9icm93c2VyQVBJLmNvbXBpbGVkJ1xuaW1wb3J0IHR5cGUge0Jyb3dzZXJBUEl9IGZyb20gJ3dlYm9wdGltaXplci90eXBlJ1xuLy8gZW5kcmVnaW9uXG4vLyByZWdpb24gdHlwZXNcbmV4cG9ydCB0eXBlIFRlc3QgPSB7XG4gICAgY2FsbGJhY2s6RnVuY3Rpb247XG4gICAgY2xvc2VXaW5kb3c6Ym9vbGVhbjtcbiAgICByb3VuZFR5cGVzOkFycmF5PHN0cmluZz5cbn1cbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIGRlY2xhcmF0aW9uXG5kZWNsYXJlIHZhciBUQVJHRVRfVEVDSE5PTE9HWTpzdHJpbmdcbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIGRldGVybWluZSB0ZWNobm9sb2d5IHNwZWNpZmljIGltcGxlbWVudGF0aW9uc1xubGV0IGZpbGVTeXN0ZW06T2JqZWN0XG5sZXQgcGF0aDpPYmplY3RcbmxldCBRVW5pdDpPYmplY3RcbmxldCByZW1vdmVEaXJlY3RvcnlSZWN1cnNpdmVseVN5bmM6RnVuY3Rpb25cbmlmICh0eXBlb2YgVEFSR0VUX1RFQ0hOT0xPR1kgPT09ICd1bmRlZmluZWQnIHx8IFRBUkdFVF9URUNITk9MT0dZID09PSAnbm9kZScpIHtcbiAgICByZXF1aXJlKCdjb2xvcnMnKVxuICAgIGZpbGVTeXN0ZW0gPSByZXF1aXJlKCdmcycpXG4gICAgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuICAgIFFVbml0ID0gcmVxdWlyZSgncXVuaXQnKVxuICAgIHJlbW92ZURpcmVjdG9yeVJlY3Vyc2l2ZWx5U3luYyA9IHJlcXVpcmUoJ3JpbXJhZicpLnN5bmNcbiAgICBjb25zdCBlcnJvcnM6QXJyYXk8UGxhaW5PYmplY3Q+ID0gW11cbiAgICBsZXQgaW5kZW50aW9uOnN0cmluZyA9ICcnXG4gICAgY29uc3Qgc2VlblRlc3RzOlNldDxzdHJpbmc+ID0gbmV3IFNldCgpXG4gICAgUVVuaXQubW9kdWxlU3RhcnQoKG1vZHVsZTpQbGFpbk9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGlmIChtb2R1bGUubmFtZSkge1xuICAgICAgICAgICAgaW5kZW50aW9uID0gJyAgICAnXG4gICAgICAgICAgICBjb25zb2xlLmluZm8obW9kdWxlLm5hbWUuYm9sZC5ibHVlKVxuICAgICAgICB9XG4gICAgfSlcbiAgICBRVW5pdC5sb2coKGRldGFpbHM6UGxhaW5PYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBpZiAoIWRldGFpbHMucmVzdWx0KVxuICAgICAgICAgICAgZXJyb3JzLnB1c2goZGV0YWlscylcbiAgICB9KVxuICAgIFFVbml0LnRlc3REb25lKChkZXRhaWxzOlBsYWluT2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgaWYgKHNlZW5UZXN0cy5oYXMoZGV0YWlscy5uYW1lKSlcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBzZWVuVGVzdHMuYWRkKGRldGFpbHMubmFtZSlcbiAgICAgICAgaWYgKGRldGFpbHMuZmFpbGVkKSB7XG4gICAgICAgICAgICAvLyBJZ25vcmVUeXBlQ2hlY2tcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhgJHtpbmRlbnRpb2594pyWICR7ZGV0YWlscy5uYW1lfWAucmVkKVxuICAgICAgICAgICAgZm9yIChjb25zdCBlcnJvcjpQbGFpbk9iamVjdCBvZiBlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSlcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke2luZGVudGlvbn0ke2Vycm9yLm1lc3NhZ2UucmVkfWApXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvci5hY3R1YWwgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oKFxuICAgICAgICAgICAgICAgICAgICAgICAgYCR7aW5kZW50aW9ufWFjdHVhbDogYCArIFRvb2xzLnJlcHJlc2VudE9iamVjdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvci5hY3R1YWwsICcgICAgJywgaW5kZW50aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICApICsgYCAoJHt0eXBlb2YgZXJyb3IuYWN0dWFsfSkgIT0gYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgZXhwZWN0ZWQ6IGAgKyBUb29scy5yZXByZXNlbnRPYmplY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IuZXhwZWN0ZWQsICcgICAgJywgaW5kZW50aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICApICsgYCAoJHt0eXBlb2YgZXJyb3IuZXhwZWN0ZWR9KWBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElnbm9yZVR5cGVDaGVja1xuICAgICAgICAgICAgICAgICAgICApLnJlZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVycm9ycy5sZW5ndGggPSAwXG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgLy8gSWdub3JlVHlwZUNoZWNrXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oYCR7aW5kZW50aW9ufeKclCAke2RldGFpbHMubmFtZX1gLmdyZWVuKVxuICAgIH0pXG4gICAgY29uc3QgZG9uZTpGdW5jdGlvbiA9IChkZXRhaWxzOlBsYWluT2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgY29uc29sZS5pbmZvKFxuICAgICAgICAgICAgLy8gSWdub3JlVHlwZUNoZWNrXG4gICAgICAgICAgICBgVGVzdHMgY29tcGxldGVkIGluICR7ZGV0YWlscy5ydW50aW1lIC8gMTAwMH0gc2Vjb25kcy5gLmdyZXkpXG4gICAgICAgIGNvbnN0IG1lc3NhZ2U6c3RyaW5nID1cbiAgICAgICAgICAgIGAke2RldGFpbHMucGFzc2VkfSB0ZXN0cyBvZiAke2RldGFpbHMudG90YWx9IHBhc3NlZC5gXG4gICAgICAgIGlmIChkZXRhaWxzLmZhaWxlZCA+IDApXG4gICAgICAgICAgICAvLyBJZ25vcmVUeXBlQ2hlY2tcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHttZXNzYWdlfSwgJHtkZXRhaWxzLmZhaWxlZH0gZmFpbGVkLmAucmVkLmJvbGQpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIC8vIElnbm9yZVR5cGVDaGVja1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKGAke21lc3NhZ2V9YC5ncmVlbi5ib2xkKVxuICAgICAgICBwcm9jZXNzLm9uY2UoJ2V4aXQnLCAoKTp2b2lkID0+IHByb2Nlc3MuZXhpdChkZXRhaWxzLmZhaWxlZCkpXG4gICAgfVxuICAgIC8vIE5PVEU6IEZpeGVzIHF1bml0J3MgdWdseSBtdWx0aSBcImRvbmUoKVwiIGNhbGxzLlxuICAgIGxldCBmaW5hbERvbmVUaW1lb3V0SUQ6YW55ID0gbnVsbFxuICAgIFFVbml0LmRvbmUoKC4uLnBhcmFtZXRlcjpBcnJheTxhbnk+KTp2b2lkID0+IHtcbiAgICAgICAgaWYgKGZpbmFsRG9uZVRpbWVvdXRJRCkge1xuICAgICAgICAgICAgLy8gSWdub3JlVHlwZUNoZWNrXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoZmluYWxEb25lVGltZW91dElEKVxuICAgICAgICAgICAgZmluYWxEb25lVGltZW91dElEID0gbnVsbFxuICAgICAgICB9XG4gICAgICAgIGZpbmFsRG9uZVRpbWVvdXRJRCA9IHNldFRpbWVvdXQoKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICBmaW5hbERvbmVUaW1lb3V0SUQgPSBzZXRUaW1lb3V0KCgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIGRvbmUoLi4ucGFyYW1ldGVyKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxufSBlbHNlXG4gICAgUVVuaXQgPSByZXF1aXJlKCdzY3JpcHQhcXVuaXQnKSAmJiB3aW5kb3cuUVVuaXRcbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIGRlZmF1bHQgdGVzdCBzcGVjaWZpY2F0aW9uXG5sZXQgdGVzdHM6QXJyYXk8VGVzdD4gPSBbe2NhbGxiYWNrOiBmdW5jdGlvbihcbiAgICByb3VuZFR5cGU6c3RyaW5nLCB0YXJnZXRUZWNobm9sb2d5Oj9zdHJpbmcsICQ6YW55LCBicm93c2VyQVBJOkJyb3dzZXJBUEksXG4gICAgdG9vbHM6T2JqZWN0LCAkYm9keURvbU5vZGU6JERvbU5vZGVcbik6dm9pZCB7XG4gICAgdGhpcy5tb2R1bGUoYHRvb2xzICgke3JvdW5kVHlwZX0pYClcbiAgICAvLyByZWdpb24gdGVzdHNcbiAgICAvLyAvIHJlZ2lvbiBwdWJsaWMgbWV0aG9kc1xuICAgIC8vIC8vIHJlZ2lvbiBzcGVjaWFsXG4gICAgdGhpcy50ZXN0KGBjb25zdHJ1Y3RvciAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IGFzc2VydC5vayhcbiAgICAgICAgdG9vbHMpKVxuICAgIHRoaXMudGVzdChgZGVzdHJ1Y3RvciAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0b29scy5kZXN0cnVjdG9yKCksIHRvb2xzKSlcbiAgICB0aGlzLnRlc3QoYGluaXRpYWxpemUgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IHNlY29uZFRvb2xzSW5zdGFuY2UgPSAkLlRvb2xzKHtsb2dnaW5nOiB0cnVlfSlcbiAgICAgICAgY29uc3QgdGhpcmRUb29sc0luc3RhbmNlID0gJC5Ub29scyh7XG4gICAgICAgICAgICBkb21Ob2RlU2VsZWN0b3JQcmVmaXg6ICdib2R5LnsxfSBkaXYuezF9J30pXG5cbiAgICAgICAgYXNzZXJ0Lm5vdE9rKHRvb2xzLl9vcHRpb25zLmxvZ2dpbmcpXG4gICAgICAgIGFzc2VydC5vayhzZWNvbmRUb29sc0luc3RhbmNlLl9vcHRpb25zLmxvZ2dpbmcpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgIHRoaXJkVG9vbHNJbnN0YW5jZS5fb3B0aW9ucy5kb21Ob2RlU2VsZWN0b3JQcmVmaXgsXG4gICAgICAgICAgICAnYm9keS50b29scyBkaXYudG9vbHMnKVxuICAgIH0pXG4gICAgLy8gLy8gZW5kcmVnaW9uXG4gICAgLy8gLy8gcmVnaW9uIG9iamVjdCBvcmllbnRhdGlvblxuICAgIHRoaXMudGVzdChgY29udHJvbGxlciAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRvb2xzLmNvbnRyb2xsZXIodG9vbHMsIFtdKSwgdG9vbHMpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0b29scy5jb250cm9sbGVyKCQuVG9vbHMuY2xhc3MsIFtdLCAkKFxuICAgICAgICAgICAgJ2JvZHknXG4gICAgICAgICkpLmNvbnN0cnVjdG9yLm5hbWUsICQuVG9vbHMuY2xhc3MubmFtZSlcbiAgICB9KVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBtdXR1YWwgZXhjbHVzaW9uXG4gICAgdGhpcy50ZXN0KGBhY3F1aXJlTG9ja3xyZWxlYXNlTG9jayAoJHtyb3VuZFR5cGV9KWAsIGFzeW5jIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6UHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGNvbnN0IGRvbmU6RnVuY3Rpb24gPSBhc3NlcnQuYXN5bmMoKVxuICAgICAgICBsZXQgdGVzdFZhbHVlOmJvb2xlYW4gPSBmYWxzZVxuICAgICAgICBhd2FpdCB0b29scy5hY3F1aXJlTG9jaygndGVzdCcsICgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgdGVzdFZhbHVlID0gdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICBhc3NlcnQub2sodGVzdFZhbHVlKVxuICAgICAgICBhc3NlcnQub2sodG9vbHMuYWNxdWlyZUxvY2soJ3Rlc3QnLCAoKTp2b2lkID0+IHtcbiAgICAgICAgICAgIHRlc3RWYWx1ZSA9IGZhbHNlXG4gICAgICAgIH0pIGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXNzZXJ0Lm9rKHRlc3RWYWx1ZSlcbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMoKS5yZWxlYXNlTG9jaygndGVzdCcpIGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXNzZXJ0Lm9rKHRlc3RWYWx1ZSlcbiAgICAgICAgYXNzZXJ0Lm9rKHRvb2xzLnJlbGVhc2VMb2NrKCd0ZXN0JykgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICBhc3NlcnQubm90T2sodGVzdFZhbHVlKVxuICAgICAgICBhc3NlcnQub2sodG9vbHMucmVsZWFzZUxvY2soJ3Rlc3QnKSBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgIGFzc2VydC5ub3RPayh0ZXN0VmFsdWUpXG4gICAgICAgIGF3YWl0IHRvb2xzLmFjcXVpcmVMb2NrKCd0ZXN0JywgKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICB0ZXN0VmFsdWUgPSB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIGFzc2VydC5vayh0ZXN0VmFsdWUpXG4gICAgICAgIGFzc2VydC5vayh0b29scy5hY3F1aXJlTG9jaygndGVzdCcsICgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgdGVzdFZhbHVlID0gZmFsc2VcbiAgICAgICAgfSkgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICBhc3NlcnQub2sodGVzdFZhbHVlKVxuICAgICAgICBhc3NlcnQub2sodG9vbHMuYWNxdWlyZUxvY2soJ3Rlc3QnLCAoKTp2b2lkID0+IHtcbiAgICAgICAgICAgIHRlc3RWYWx1ZSA9IHRydWVcbiAgICAgICAgfSkgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICBhc3NlcnQub2sodGVzdFZhbHVlKVxuICAgICAgICB0b29scy5yZWxlYXNlTG9jaygndGVzdCcpXG4gICAgICAgIGFzc2VydC5ub3RPayh0ZXN0VmFsdWUpXG4gICAgICAgIHRvb2xzLnJlbGVhc2VMb2NrKCd0ZXN0JylcbiAgICAgICAgYXNzZXJ0Lm9rKHRlc3RWYWx1ZSlcbiAgICAgICAgdG9vbHMuYWNxdWlyZUxvY2soJ3Rlc3QnKS50aGVuKGFzeW5jIChyZXN1bHQ6c3RyaW5nKTpQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdCwgJ3Rlc3QnKVxuICAgICAgICAgICAgJC5Ub29scy5jbGFzcy50aW1lb3V0KCgpOnRvb2xzLmNvbnN0cnVjdG9yID0+IHRvb2xzLnJlbGVhc2VMb2NrKFxuICAgICAgICAgICAgICAgICd0ZXN0JykpXG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0b29scy5hY3F1aXJlTG9jaygndGVzdCcpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0LCAndGVzdCcpXG4gICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnRpbWVvdXQoKCk6dG9vbHMuY29uc3RydWN0b3IgPT4gdG9vbHMucmVsZWFzZUxvY2soXG4gICAgICAgICAgICAgICAgJ3Rlc3QnKSlcbiAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRvb2xzLmFjcXVpcmVMb2NrKCd0ZXN0JywgKCk6UHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlOkZ1bmN0aW9uKTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgJC5Ub29scy5jbGFzcy50aW1lb3V0KClcbiAgICAgICAgICAgICAgICAgICAgdGVzdFZhbHVlID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0ZXN0VmFsdWUpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBhc3NlcnQubm90T2sodGVzdFZhbHVlKVxuICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgIH0pXG4gICAgICAgIHRvb2xzLnJlbGVhc2VMb2NrKCd0ZXN0JylcbiAgICB9KVxuICAgIHRoaXMudGVzdChgZ2V0U2VtYXBob3JlICgke3JvdW5kVHlwZX0pYCwgYXN5bmMgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgY29uc3Qgc2VtYXBob3JlOk9iamVjdCA9ICQuVG9vbHMuY2xhc3MuZ2V0U2VtYXBob3JlKDIpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUucXVldWUubGVuZ3RoLCAwKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLm51bWJlck9mRnJlZVJlc291cmNlcywgMilcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5udW1iZXJPZlJlc291cmNlcywgMilcbiAgICAgICAgYXdhaXQgc2VtYXBob3JlLmFjcXVpcmUoKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLnF1ZXVlLmxlbmd0aCwgMClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5udW1iZXJPZkZyZWVSZXNvdXJjZXMsIDEpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUubnVtYmVyT2ZSZXNvdXJjZXMsIDIpXG4gICAgICAgIGF3YWl0IHNlbWFwaG9yZS5hY3F1aXJlKClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5xdWV1ZS5sZW5ndGgsIDApXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUubnVtYmVyT2ZGcmVlUmVzb3VyY2VzLCAwKVxuICAgICAgICBzZW1hcGhvcmUuYWNxdWlyZSgpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUucXVldWUubGVuZ3RoLCAxKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLm51bWJlck9mRnJlZVJlc291cmNlcywgMClcbiAgICAgICAgc2VtYXBob3JlLmFjcXVpcmUoKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLnF1ZXVlLmxlbmd0aCwgMilcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5udW1iZXJPZkZyZWVSZXNvdXJjZXMsIDApXG4gICAgICAgIHNlbWFwaG9yZS5yZWxlYXNlKClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5xdWV1ZS5sZW5ndGgsIDEpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUubnVtYmVyT2ZGcmVlUmVzb3VyY2VzLCAwKVxuICAgICAgICBzZW1hcGhvcmUucmVsZWFzZSgpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUucXVldWUubGVuZ3RoLCAwKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLm51bWJlck9mRnJlZVJlc291cmNlcywgMClcbiAgICAgICAgc2VtYXBob3JlLnJlbGVhc2UoKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLnF1ZXVlLmxlbmd0aCwgMClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5udW1iZXJPZkZyZWVSZXNvdXJjZXMsIDEpXG4gICAgICAgIHNlbWFwaG9yZS5yZWxlYXNlKClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5xdWV1ZS5sZW5ndGgsIDApXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUubnVtYmVyT2ZGcmVlUmVzb3VyY2VzLCAyKVxuICAgICAgICBzZW1hcGhvcmUucmVsZWFzZSgpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUucXVldWUubGVuZ3RoLCAwKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLm51bWJlck9mRnJlZVJlc291cmNlcywgMylcbiAgICB9KVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBib29sZWFuXG4gICAgdGhpcy50ZXN0KGBpc051bWVyaWMgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDphbnkgb2YgW1xuICAgICAgICAgICAgMCwgMSwgJy0xMCcsICcwJywgMHhGRiwgJzB4RkYnLCAnOGU1JywgJzMuMTQxNScsICsxMFxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuaXNOdW1lcmljKHRlc3QpKVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6YW55IG9mIFtcbiAgICAgICAgICAgIG51bGwsIHVuZGVmaW5lZCwgZmFsc2UsIHRydWUsICcnLCAnYScsIHt9LCAvYS8sICctMHg0MicsXG4gICAgICAgICAgICAnNy4yYWNkZ3MnLCBOYU4sIEluZmluaXR5XG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQubm90T2soJC5Ub29scy5jbGFzcy5pc051bWVyaWModGVzdCkpXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGlzV2luZG93ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5pc1dpbmRvdyhicm93c2VyQVBJLndpbmRvdykpXG4gICAgICAgIGZvciAoY29uc3QgdGVzdDphbnkgb2YgW251bGwsIHt9LCBicm93c2VyQVBJXSlcbiAgICAgICAgICAgIGFzc2VydC5ub3RPaygkLlRvb2xzLmNsYXNzLmlzV2luZG93KHRlc3QpKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBpc0FycmF5TGlrZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW10sIHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJylcbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmlzQXJyYXlMaWtlKHRlc3QpKVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6YW55IG9mIFt7fSwgbnVsbCwgdW5kZWZpbmVkLCBmYWxzZSwgdHJ1ZSwgL2EvXSlcbiAgICAgICAgICAgIGFzc2VydC5ub3RPaygkLlRvb2xzLmNsYXNzLmlzQXJyYXlMaWtlKHRlc3QpKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBpc0FueU1hdGNoaW5nICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbJycsIFsnJ11dLFxuICAgICAgICAgICAgWyd0ZXN0JywgWy90ZXN0L11dLFxuICAgICAgICAgICAgWyd0ZXN0JywgWy9hLywgL2IvLCAvZXMvXV0sXG4gICAgICAgICAgICBbJ3Rlc3QnLCBbJycsICd0ZXN0J11dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5pc0FueU1hdGNoaW5nKC4uLnRlc3QpKVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbJycsIFtdXSxcbiAgICAgICAgICAgIFsndGVzdCcsIFsvdGVzJC9dXSxcbiAgICAgICAgICAgIFsndGVzdCcsIFsvXmVzdC9dXSxcbiAgICAgICAgICAgIFsndGVzdCcsIFsvXmVzdCQvXV0sXG4gICAgICAgICAgICBbJ3Rlc3QnLCBbJ2EnXV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5ub3RPaygkLlRvb2xzLmNsYXNzLmlzQW55TWF0Y2hpbmcoLi4udGVzdCkpXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGlzUGxhaW5PYmplY3QgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3Qgb2tWYWx1ZTphbnkgb2YgW1xuICAgICAgICAgICAge30sXG4gICAgICAgICAgICB7YTogMX0sXG4gICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctb2JqZWN0ICovXG4gICAgICAgICAgICBuZXcgT2JqZWN0KClcbiAgICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tbmV3LW9iamVjdCAqL1xuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuaXNQbGFpbk9iamVjdChva1ZhbHVlKSlcbiAgICAgICAgZm9yIChjb25zdCBub3RPa1ZhbHVlOmFueSBvZiBbXG4gICAgICAgICAgICBuZXcgU3RyaW5nKCksIE9iamVjdCwgbnVsbCwgMCwgMSwgdHJ1ZSwgdW5kZWZpbmVkXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQubm90T2soJC5Ub29scy5jbGFzcy5pc1BsYWluT2JqZWN0KG5vdE9rVmFsdWUpKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBpc0Z1bmN0aW9uICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IG9rVmFsdWU6YW55IG9mIFtcbiAgICAgICAgICAgIE9iamVjdCwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gMScpLCBmdW5jdGlvbigpOnZvaWQge30sICgpOnZvaWQgPT4ge31cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmlzRnVuY3Rpb24ob2tWYWx1ZSkpXG4gICAgICAgIGZvciAoY29uc3Qgbm90T2tWYWx1ZTphbnkgb2YgW1xuICAgICAgICAgICAgbnVsbCwgZmFsc2UsIDAsIDEsIHVuZGVmaW5lZCwge30sIG5ldyBCb29sZWFuKClcbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5ub3RPaygkLlRvb2xzLmNsYXNzLmlzRnVuY3Rpb24obm90T2tWYWx1ZSkpXG4gICAgfSlcbiAgICAvLyAvLyBlbmRyZWdpb25cbiAgICAvLyAvLyByZWdpb24gbGFuZ3VhZ2UgZml4ZXNcbiAgICB0aGlzLnRlc3QoYG1vdXNlT3V0RXZlbnRIYW5kbGVyRml4ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT5cbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MubW91c2VPdXRFdmVudEhhbmRsZXJGaXgoKCk6dm9pZCA9PiB7fSkpKVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBsb2dnaW5nXG4gICAgdGhpcy50ZXN0KGBsb2cgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIHRvb2xzLmxvZygndGVzdCcpLCB0b29scykpXG4gICAgdGhpcy50ZXN0KGBpbmZvICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRvb2xzLmluZm8oJ3Rlc3QgezB9JyksIHRvb2xzKSlcbiAgICB0aGlzLnRlc3QoYGRlYnVnICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRvb2xzLmRlYnVnKCd0ZXN0JyksIHRvb2xzKSlcbiAgICAvLyBOT1RFOiBUaGlzIHRlc3QgYnJlYWtzIGphdmFTY3JpcHQgbW9kdWxlcyBpbiBzdHJpY3QgbW9kZS5cbiAgICB0aGlzLnNraXAoYCR7cm91bmRUeXBlfS1lcnJvcmAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgdG9vbHMuZXJyb3IoJ2lnbm9yZSB0aGlzIGVycm9yLCBpdCBpcyBvbmx5IGEgezF9JywgJ3Rlc3QnKSwgdG9vbHMpKVxuICAgIHRoaXMudGVzdChgd2FybiAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0b29scy53YXJuKCd0ZXN0JyksIHRvb2xzKSlcbiAgICB0aGlzLnRlc3QoYHNob3cgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFsxLCAnMSAoVHlwZTogXCJudW1iZXJcIiknXSxcbiAgICAgICAgICAgIFtudWxsLCAnbnVsbCAoVHlwZTogXCJudWxsXCIpJ10sXG4gICAgICAgICAgICBbL2EvLCAnL2EvIChUeXBlOiBcInJlZ2V4cFwiKSddLFxuICAgICAgICAgICAgWydoYW5zJywgJ2hhbnMgKFR5cGU6IFwic3RyaW5nXCIpJ10sXG4gICAgICAgICAgICBbe0E6ICdhJywgQjogJ2InfSwgJ0E6IGEgKFR5cGU6IFwic3RyaW5nXCIpXFxuQjogYiAoVHlwZTogXCJzdHJpbmdcIiknXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3Muc2hvdyh0ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICAgICAgYXNzZXJ0Lm9rKChuZXcgUmVnRXhwKFxuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29udHJvbC1yZWdleCAqL1xuICAgICAgICAgICAgJ14oLnxcXG58XFxyfFxcXFx1MjAyOHxcXFxcdTIwMjkpK1xcXFwoVHlwZTogXCJmdW5jdGlvblwiXFxcXCkkJ1xuICAgICAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1jb250cm9sLXJlZ2V4ICovXG4gICAgICAgICkpLnRlc3QoJC5Ub29scy5jbGFzcy5zaG93KCQuVG9vbHMpKSlcbiAgICB9KVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBkb20gbm9kZSBoYW5kbGluZ1xuICAgIGlmIChyb3VuZFR5cGUgPT09ICdmdWxsJykge1xuICAgICAgICAvLyByZWdpb24gZ2V0dGVyXG4gICAgICAgIHRoaXMudGVzdChgZ2V0IG5vcm1hbGl6ZWRDbGFzc05hbWVzICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOnZvaWQgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQoJzxkaXY+JykuVG9vbHMoXG4gICAgICAgICAgICAgICAgJ25vcm1hbGl6ZWRDbGFzc05hbWVzJ1xuICAgICAgICAgICAgKS4kZG9tTm9kZS5wcm9wKCdvdXRlckhUTUwnKSwgJCgnPGRpdj4nKS5wcm9wKCdvdXRlckhUTUwnKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkKCc8ZGl2IGNsYXNzPicpLlRvb2xzKFxuICAgICAgICAgICAgICAgICdub3JtYWxpemVkQ2xhc3NOYW1lcydcbiAgICAgICAgICAgICkuJGRvbU5vZGUuaHRtbCgpLCAkKCc8ZGl2PicpLmh0bWwoKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkKCc8ZGl2IGNsYXNzPVwiXCI+JykuVG9vbHMoXG4gICAgICAgICAgICAgICAgJ25vcm1hbGl6ZWRDbGFzc05hbWVzJ1xuICAgICAgICAgICAgKS4kZG9tTm9kZS5odG1sKCksICQoJzxkaXY+JykuaHRtbCgpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQoJzxkaXYgY2xhc3M9XCJhXCI+JykuVG9vbHMoXG4gICAgICAgICAgICAgICAgJ25vcm1hbGl6ZWRDbGFzc05hbWVzJ1xuICAgICAgICAgICAgKS4kZG9tTm9kZS5wcm9wKCdvdXRlckhUTUwnKSwgJCgnPGRpdiBjbGFzcz1cImFcIj4nKS5wcm9wKFxuICAgICAgICAgICAgICAgICdvdXRlckhUTUwnKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkKCc8ZGl2IGNsYXNzPVwiYiBhXCI+JykuVG9vbHMoXG4gICAgICAgICAgICAgICAgJ25vcm1hbGl6ZWRDbGFzc05hbWVzJ1xuICAgICAgICAgICAgKS4kZG9tTm9kZS5wcm9wKCdvdXRlckhUTUwnKSwgJCgnPGRpdiBjbGFzcz1cImEgYlwiPicpLnByb3AoXG4gICAgICAgICAgICAgICAgJ291dGVySFRNTCcpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQoXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiIGFcIj48cHJlIGNsYXNzPVwiYyBiIGFcIj48L3ByZT48L2Rpdj4nXG4gICAgICAgICAgICApLlRvb2xzKCdub3JtYWxpemVkQ2xhc3NOYW1lcycpLiRkb21Ob2RlLnByb3AoJ291dGVySFRNTCcpLFxuICAgICAgICAgICAgJCgnPGRpdiBjbGFzcz1cImEgYlwiPjxwcmUgY2xhc3M9XCJhIGIgY1wiPjwvcHJlPjwvZGl2PicpLnByb3AoXG4gICAgICAgICAgICAgICAgJ291dGVySFRNTCcpKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlc3QoYGdldCBub3JtYWxpemVkU3R5bGVzICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOnZvaWQgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQoJzxkaXY+JykuVG9vbHMoXG4gICAgICAgICAgICAgICAgJ25vcm1hbGl6ZWRTdHlsZXMnXG4gICAgICAgICAgICApLiRkb21Ob2RlLnByb3AoJ291dGVySFRNTCcpLCAkKCc8ZGl2PicpLnByb3AoJ291dGVySFRNTCcpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQoJzxkaXYgc3R5bGU+JykuVG9vbHMoXG4gICAgICAgICAgICAgICAgJ25vcm1hbGl6ZWRTdHlsZXMnXG4gICAgICAgICAgICApLiRkb21Ob2RlLmh0bWwoKSwgJCgnPGRpdj4nKS5odG1sKCkpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJCgnPGRpdiBzdHlsZT1cIlwiPicpLlRvb2xzKFxuICAgICAgICAgICAgICAgICdub3JtYWxpemVkU3R5bGVzJ1xuICAgICAgICAgICAgKS4kZG9tTm9kZS5odG1sKCksICQoJzxkaXY+JykuaHRtbCgpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQoXG4gICAgICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJib3JkZXI6IDFweCBzb2xpZCAgcmVkIDtcIj4nXG4gICAgICAgICAgICApLlRvb2xzKCdub3JtYWxpemVkU3R5bGVzJykuJGRvbU5vZGUucHJvcCgnb3V0ZXJIVE1MJyksICQoXG4gICAgICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJib3JkZXI6MXB4IHNvbGlkIHJlZFwiPidcbiAgICAgICAgICAgICkucHJvcCgnb3V0ZXJIVE1MJykpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJChcbiAgICAgICAgICAgICAgICAnPGRpdiBzdHlsZT1cIndpZHRoOiA1MHB4O2hlaWdodDogMTAwcHg7XCI+J1xuICAgICAgICAgICAgKS5Ub29scygnbm9ybWFsaXplZFN0eWxlcycpLiRkb21Ob2RlLnByb3AoJ291dGVySFRNTCcpLCAkKFxuICAgICAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiaGVpZ2h0OjEwMHB4O3dpZHRoOjUwcHhcIj4nXG4gICAgICAgICAgICApLnByb3AoJ291dGVySFRNTCcpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQoXG4gICAgICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCI7d2lkdGg6IDUwcHggOyBoZWlnaHQ6MTAwcHhcIj4nXG4gICAgICAgICAgICApLlRvb2xzKCdub3JtYWxpemVkU3R5bGVzJykuJGRvbU5vZGUucHJvcCgnb3V0ZXJIVE1MJyksICQoXG4gICAgICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJoZWlnaHQ6MTAwcHg7d2lkdGg6NTBweFwiPidcbiAgICAgICAgICAgICkucHJvcCgnb3V0ZXJIVE1MJykpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJChcbiAgICAgICAgICAgICAgICAnPGRpdiBzdHlsZT1cIndpZHRoOjEwcHg7aGVpZ2h0OjUwcHhcIj4nICtcbiAgICAgICAgICAgICAgICAnICAgIDxwcmUgc3R5bGU9XCI7O3dpZHRoOjJweDtoZWlnaHQ6MXB4OyBjb2xvcjogcmVkOyBcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvcHJlPicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nXG4gICAgICAgICAgICApLlRvb2xzKCdub3JtYWxpemVkU3R5bGVzJykuJGRvbU5vZGUucHJvcCgnb3V0ZXJIVE1MJyksXG4gICAgICAgICAgICAkKFxuICAgICAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiaGVpZ2h0OjUwcHg7d2lkdGg6MTBweFwiPicgK1xuICAgICAgICAgICAgICAgICcgICAgPHByZSBzdHlsZT1cImNvbG9yOnJlZDtoZWlnaHQ6MXB4O3dpZHRoOjJweFwiPjwvcHJlPicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nXG4gICAgICAgICAgICApLnByb3AoJ291dGVySFRNTCcpKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlc3QoYGdldCBzdHlsZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgICAgICBbJzxzcGFuPicsIHt9XSxcbiAgICAgICAgICAgICAgICBbJzxzcGFuPmhhbnM8L3NwYW4+Jywge31dLFxuICAgICAgICAgICAgICAgIFsnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmJsb2NrXCI+PC9zcGFuPicsIHtkaXNwbGF5OiAnYmxvY2snfV0sXG4gICAgICAgICAgICAgICAgWyc8c3BhbiBzdHlsZT1cImRpc3BsYXk6YmxvY2s7ZmxvYXQ6bGVmdFwiPjwvc3Bhbj4nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsIGZsb2F0OiAnbGVmdCdcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0ICRkb21Ob2RlOiREb21Ob2RlID0gJCh0ZXN0WzBdKVxuICAgICAgICAgICAgICAgICRib2R5RG9tTm9kZS5hcHBlbmQoJGRvbU5vZGUpXG4gICAgICAgICAgICAgICAgY29uc3Qgc3R5bGVzOlBsYWluT2JqZWN0ID0gJGRvbU5vZGUuVG9vbHMoJ3N0eWxlJylcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5TmFtZTpzdHJpbmcgaW4gdGVzdFsxXSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3RbMV0uaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHN0eWxlcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlc1twcm9wZXJ0eU5hbWVdLCB0ZXN0WzFdW3Byb3BlcnR5TmFtZV0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkZG9tTm9kZS5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlc3QoYGdldCB0ZXh0ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PHN0cmluZz4gb2YgW1xuICAgICAgICAgICAgICAgIFsnPGRpdj4nLCAnJ10sXG4gICAgICAgICAgICAgICAgWyc8ZGl2PmhhbnM8L2Rpdj4nLCAnaGFucyddLFxuICAgICAgICAgICAgICAgIFsnPGRpdj48ZGl2PmhhbnM8L2RpdjwvZGl2PicsICcnXSxcbiAgICAgICAgICAgICAgICBbJzxkaXY+aGFuczxkaXY+cGV0ZXI8L2Rpdj48L2Rpdj4nLCAnaGFucyddXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkKHRlc3RbMF0pLlRvb2xzKCd0ZXh0JyksIHRlc3RbMV0pXG4gICAgICAgIH0pXG4gICAgICAgIC8vIGVuZHJlZ2lvblxuICAgICAgICB0aGlzLnRlc3QoYGlzRXF1aXZhbGVudERPTSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgICAgICBbJ3Rlc3QnLCAndGVzdCddLFxuICAgICAgICAgICAgICAgIFsndGVzdCB0ZXN0JywgJ3Rlc3QgdGVzdCddLFxuICAgICAgICAgICAgICAgIFsnPGRpdj4nLCAnPGRpdj4nXSxcbiAgICAgICAgICAgICAgICBbJzxkaXYgY2xhc3M+JywgJzxkaXY+J10sXG4gICAgICAgICAgICAgICAgWyc8ZGl2IGNsYXNzPVwiXCI+JywgJzxkaXY+J10sXG4gICAgICAgICAgICAgICAgWyc8ZGl2IHN0eWxlPicsICc8ZGl2PiddLFxuICAgICAgICAgICAgICAgIFsnPGRpdiBzdHlsZT1cIlwiPicsICc8ZGl2PiddLFxuICAgICAgICAgICAgICAgIFsnPGRpdj48L2Rpdj4nLCAnPGRpdj4nXSxcbiAgICAgICAgICAgICAgICBbJzxkaXYgY2xhc3M9XCJhXCI+PC9kaXY+JywgJzxkaXYgY2xhc3M9XCJhXCI+PC9kaXY+J10sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAkKCc8YSB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImFcIj48L2E+JyksXG4gICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImFcIiB0YXJnZXQ9XCJfYmxhbmtcIj48L2E+J1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnPGEgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCJhXCI+PC9hPicsXG4gICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImFcIiB0YXJnZXQ9XCJfYmxhbmtcIj48L2E+J1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnPGEgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCJhXCI+PGRpdiBiPVwiM1wiIGE9XCIyXCI+PC9kaXY+PC9hPicsXG4gICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImFcIiB0YXJnZXQ9XCJfYmxhbmtcIj48ZGl2IGE9XCIyXCIgYj1cIjNcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PjwvYT4nXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICc8YSB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImIgYVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAnICAgPGRpdiBiPVwiM1wiIGE9XCIyXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICc8L2E+JyxcbiAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYSBiXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICcgICA8ZGl2IGE9XCIyXCIgYj1cIjNcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvYT4nXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbJzxkaXY+YTwvZGl2PjxkaXY+YjwvZGl2PicsICc8ZGl2PmE8L2Rpdj48ZGl2PmI8L2Rpdj4nXSxcbiAgICAgICAgICAgICAgICBbJzxkaXY+YTwvZGl2PmInLCAnPGRpdj5hPC9kaXY+YiddLFxuICAgICAgICAgICAgICAgIFsnPGJyPicsICc8YnIgLz4nXSxcbiAgICAgICAgICAgICAgICBbJzxkaXY+PGJyPjxiciAvPjwvZGl2PicsICc8ZGl2PjxiciAvPjxiciAvPjwvZGl2PiddLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJyA8ZGl2IHN0eWxlPVwiXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICdnZXJtYW48IS0tZGVERS0tPjwhLS1lblVTOiBlbmdsaXNoIC0tPiA8L2Rpdj4nLFxuICAgICAgICAgICAgICAgICAgICAnIDxkaXYgc3R5bGU9XCJcIj5nZXJtYW48IS0tZGVERS0tPjwhLS1lblVTOiBlbmdsaXNoIC0tPiAnICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PidcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFsnYTxicj4nLCAnYTxiciAvPicsIHRydWVdXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmlzRXF1aXZhbGVudERPTSguLi50ZXN0KSlcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgICAgICBbJ3Rlc3QnLCAnJ10sXG4gICAgICAgICAgICAgICAgWyd0ZXN0JywgJ2hhbnMnXSxcbiAgICAgICAgICAgICAgICBbJ3Rlc3QgdGVzdCcsICd0ZXN0dGVzdCddLFxuICAgICAgICAgICAgICAgIFsndGVzdCB0ZXN0OicsICcnXSxcbiAgICAgICAgICAgICAgICBbJzxkaXYgY2xhc3M9XCJhXCI+PC9kaXY+JywgJzxkaXY+J10sXG4gICAgICAgICAgICAgICAgWyQoJzxhIGNsYXNzPVwiYVwiPjwvYT4nKSwgJzxhIGNsYXNzPVwiYVwiIHRhcmdldD1cIl9ibGFua1wiPjwvYT4nXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICc8YSB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImFcIj48ZGl2IGE9XCIyXCI+PC9kaXY+PC9hPicsXG4gICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImFcIiB0YXJnZXQ9XCJfYmxhbmtcIj48L2E+J1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgWyc8ZGl2PmE8L2Rpdj5iJywgJzxkaXY+YTwvZGl2PmMnXSxcbiAgICAgICAgICAgICAgICBbJyA8ZGl2PmE8L2Rpdj4nLCAnPGRpdj5hPC9kaXY+J10sXG4gICAgICAgICAgICAgICAgWyc8ZGl2PmE8L2Rpdj48ZGl2PmJjPC9kaXY+JywgJzxkaXY+YTwvZGl2PjxkaXY+YjwvZGl2PiddLFxuICAgICAgICAgICAgICAgIFsndGV4dCcsICd0ZXh0IGEnXSxcbiAgICAgICAgICAgICAgICBbJ3RleHQnLCAndGV4dCBhJ10sXG4gICAgICAgICAgICAgICAgWyd0ZXh0JywgJ3RleHQgYSAmICsnXVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBhc3NlcnQubm90T2soJC5Ub29scy5jbGFzcy5pc0VxdWl2YWxlbnRET00oLi4udGVzdCkpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIGlmIChyb3VuZFR5cGUgPT09ICdmdWxsJylcbiAgICAgICAgdGhpcy50ZXN0KGBnZXRQb3NpdGlvblJlbGF0aXZlVG9WaWV3cG9ydCAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgICAgIGFzc2VydDpPYmplY3RcbiAgICAgICAgKTp2b2lkID0+IGFzc2VydC5vayhbXG4gICAgICAgICAgICAnYWJvdmUnLCAnbGVmdCcsICdyaWdodCcsICdiZWxvdycsICdpbidcbiAgICAgICAgXS5pbmNsdWRlcyh0b29scy5nZXRQb3NpdGlvblJlbGF0aXZlVG9WaWV3cG9ydCgpKSkpXG4gICAgdGhpcy50ZXN0KGBnZW5lcmF0ZURpcmVjdGl2ZVNlbGVjdG9yICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PHN0cmluZz4gb2YgW1xuICAgICAgICAgICAgWydhLWInLCAnYS1iLCAuYS1iLCBbYS1iXSwgW2RhdGEtYS1iXSwgW3gtYS1iXSwgW2FcXFxcOmJdLCBbYV9iXSddLFxuICAgICAgICAgICAgWydhQicsICdhLWIsIC5hLWIsIFthLWJdLCBbZGF0YS1hLWJdLCBbeC1hLWJdLCBbYVxcXFw6Yl0sIFthX2JdJ10sXG4gICAgICAgICAgICBbJ2EnLCAnYSwgLmEsIFthXSwgW2RhdGEtYV0sIFt4LWFdJ10sXG4gICAgICAgICAgICBbJ2FhJywgJ2FhLCAuYWEsIFthYV0sIFtkYXRhLWFhXSwgW3gtYWFdJ10sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJ2FhQkInLFxuICAgICAgICAgICAgICAgICdhYS1iYiwgLmFhLWJiLCBbYWEtYmJdLCBbZGF0YS1hYS1iYl0sIFt4LWFhLWJiXSwgW2FhXFxcXDpiYl0sJyArXG4gICAgICAgICAgICAgICAgJyBbYWFfYmJdJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnYWFCYkNjRGQnLFxuICAgICAgICAgICAgICAgICdhYS1iYi1jYy1kZCwgLmFhLWJiLWNjLWRkLCBbYWEtYmItY2MtZGRdLCAnICtcbiAgICAgICAgICAgICAgICAnW2RhdGEtYWEtYmItY2MtZGRdLCBbeC1hYS1iYi1jYy1kZF0sICcgK1xuICAgICAgICAgICAgICAgICdbYWFcXFxcOmJiXFxcXDpjY1xcXFw6ZGRdLCBbYWFfYmJfY2NfZGRdJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnbWNlSFJFRicsXG4gICAgICAgICAgICAgICAgJ21jZS1ocmVmLCAubWNlLWhyZWYsIFttY2UtaHJlZl0sIFtkYXRhLW1jZS1ocmVmXSwgJyArXG4gICAgICAgICAgICAgICAgJ1t4LW1jZS1ocmVmXSwgW21jZVxcXFw6aHJlZl0sIFttY2VfaHJlZl0nXG4gICAgICAgICAgICBdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5nZW5lcmF0ZURpcmVjdGl2ZVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIHRlc3RbMF1cbiAgICAgICAgICAgICksIHRlc3RbMV0pXG4gICAgfSlcbiAgICBpZiAocm91bmRUeXBlID09PSAnZnVsbCcpXG4gICAgICAgIHRoaXMudGVzdChgcmVtb3ZlRGlyZWN0aXZlICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGxvY2FsQm9keURvbU5vZGUgPSAkYm9keURvbU5vZGUuVG9vbHMoXG4gICAgICAgICAgICAgICAgJ3JlbW92ZURpcmVjdGl2ZScsICdhJylcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbCgkbG9jYWxCb2R5RG9tTm9kZS5Ub29scygpLnJlbW92ZURpcmVjdGl2ZShcbiAgICAgICAgICAgICAgICAnYSdcbiAgICAgICAgICAgICksICRsb2NhbEJvZHlEb21Ob2RlKVxuICAgICAgICB9KVxuICAgIHRoaXMudGVzdChgZ2V0Tm9ybWFsaXplZERpcmVjdGl2ZU5hbWUgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8c3RyaW5nPiBvZiBbXG4gICAgICAgICAgICBbJ2RhdGEtYScsICdhJ10sXG4gICAgICAgICAgICBbJ3gtYScsICdhJ10sXG4gICAgICAgICAgICBbJ2RhdGEtYS1iYicsICdhQmInXSxcbiAgICAgICAgICAgIFsneDphOmInLCAnYUInXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuZ2V0Tm9ybWFsaXplZERpcmVjdGl2ZU5hbWUodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICBpZiAocm91bmRUeXBlID09PSAnZnVsbCcpXG4gICAgICAgIHRoaXMudGVzdChgZ2V0RGlyZWN0aXZlVmFsdWUgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PlxuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKCQoJ2JvZHknKS5Ub29scygnZ2V0RGlyZWN0aXZlVmFsdWUnLCAnYScpLCBudWxsKSlcbiAgICB0aGlzLnRlc3QoYHNsaWNlRG9tTm9kZVNlbGVjdG9yUHJlZml4ICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRvb2xzLnNsaWNlRG9tTm9kZVNlbGVjdG9yUHJlZml4KCdib2R5IGRpdicpLCAnZGl2JylcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMoe1xuICAgICAgICAgICAgZG9tTm9kZVNlbGVjdG9yUHJlZml4OiAnYm9keSBkaXYnXG4gICAgICAgIH0pLnNsaWNlRG9tTm9kZVNlbGVjdG9yUHJlZml4KCdib2R5IGRpdicpLCAnJylcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMoe1xuICAgICAgICAgICAgZG9tTm9kZVNlbGVjdG9yUHJlZml4OiAnJ1xuICAgICAgICB9KS5zbGljZURvbU5vZGVTZWxlY3RvclByZWZpeCgnYm9keSBkaXYnKSwgJ2JvZHkgZGl2JylcbiAgICB9KVxuICAgIHRoaXMudGVzdChgZ2V0RG9tTm9kZU5hbWUgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxzdHJpbmc+IG9mIFtcbiAgICAgICAgICAgIFsnZGl2JywgJ2RpdiddLFxuICAgICAgICAgICAgWyc8ZGl2PicsICdkaXYnXSxcbiAgICAgICAgICAgIFsnPGRpdiAvPicsICdkaXYnXSxcbiAgICAgICAgICAgIFsnPGRpdj48L2Rpdj4nLCAnZGl2J10sXG4gICAgICAgICAgICBbJ2EnLCAnYSddLFxuICAgICAgICAgICAgWyc8YT4nLCAnYSddLFxuICAgICAgICAgICAgWyc8YSAvPicsICdhJ10sXG4gICAgICAgICAgICBbJzxhPjwvYT4nLCAnYSddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5nZXREb21Ob2RlTmFtZSh0ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIGlmIChyb3VuZFR5cGUgPT09ICdmdWxsJylcbiAgICAgICAgdGhpcy50ZXN0KGBncmFiRG9tTm9kZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdW5pdDogJ2JvZHkgZGl2I3F1bml0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1bml0Rml4dHVyZTogJ2JvZHkgZGl2I3F1bml0LWZpeHR1cmUnXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdW5pdDogJCgnYm9keSBkaXYjcXVuaXQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1bml0Rml4dHVyZTogJCgnYm9keSBkaXYjcXVuaXQtZml4dHVyZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiAkKCdib2R5JylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVuaXQ6ICdkaXYjcXVuaXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVuaXRGaXh0dXJlOiAnZGl2I3F1bml0LWZpeHR1cmUnXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6ICQoJ2JvZHknKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1bml0OiAkKCdib2R5IGRpdiNxdW5pdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVuaXRGaXh0dXJlOiAkKCdib2R5IGRpdiNxdW5pdC1maXh0dXJlJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVuaXQ6ICdkaXYjcXVuaXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1bml0Rml4dHVyZTogJ2RpdiNxdW5pdC1maXh0dXJlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdib2R5J1xuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6ICQoJ2JvZHknKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1bml0OiAkKCdib2R5JykuZmluZCgnZGl2I3F1bml0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBxdW5pdEZpeHR1cmU6ICQoJ2JvZHknKS5maW5kKCdkaXYjcXVuaXQtZml4dHVyZScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICBdKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgJGRvbU5vZGVzID0gdG9vbHMuZ3JhYkRvbU5vZGUoLi4udGVzdFswXSlcbiAgICAgICAgICAgICAgICBkZWxldGUgJGRvbU5vZGVzLndpbmRvd1xuICAgICAgICAgICAgICAgIGRlbGV0ZSAkZG9tTm9kZXMuZG9jdW1lbnRcbiAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCRkb21Ob2RlcywgdGVzdFsxXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAvLyAvLyBlbmRyZWdpb25cbiAgICAvLyAvLyByZWdpb24gc2NvcGVcbiAgICB0aGlzLnRlc3QoYGlzb2xhdGVTY29wZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmlzb2xhdGVTY29wZSh7fSksIHt9KVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuaXNvbGF0ZVNjb3BlKHthOiAyfSksIHthOiAyfSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmlzb2xhdGVTY29wZSh7XG4gICAgICAgICAgICBhOiAyLCBiOiB7YTogWzEsIDJdfVxuICAgICAgICB9KSwge2E6IDIsIGI6IHthOiBbMSwgMl19fSlcbiAgICAgICAgbGV0IHNjb3BlID0gZnVuY3Rpb24oKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuYSA9IDJcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5wcm90b3R5cGUgPSB7YjogMiwgX2E6IDV9XG4gICAgICAgIHNjb3BlID0gbmV3IHNjb3BlKClcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmlzb2xhdGVTY29wZShzY29wZSwgWydfJ10pLCB7XG4gICAgICAgICAgICBfYTogNSwgYTogMiwgYjogdW5kZWZpbmVkXG4gICAgICAgIH0pXG4gICAgICAgIHNjb3BlLmIgPSAzXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmlzb2xhdGVTY29wZShzY29wZSwgWydfJ10pLCB7X2E6IDUsIGE6IDIsIGI6IDN9KVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuaXNvbGF0ZVNjb3BlKHNjb3BlKSwge1xuICAgICAgICAgICAgX2E6IHVuZGVmaW5lZCwgYTogMiwgYjogM30pXG4gICAgICAgIHNjb3BlLl9hID0gNlxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5pc29sYXRlU2NvcGUoc2NvcGUsIFsnXyddKSwge19hOiA2LCBhOiAyLCBiOiAzfSlcbiAgICAgICAgc2NvcGUgPSBmdW5jdGlvbigpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5hID0gMlxuICAgICAgICB9XG4gICAgICAgIHNjb3BlLnByb3RvdHlwZSA9IHtiOiAzfVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuaXNvbGF0ZVNjb3BlKFxuICAgICAgICAgICAgbmV3IHNjb3BlKCksIFsnYiddXG4gICAgICAgICksIHthOiAyLCBiOiAzfSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmlzb2xhdGVTY29wZShuZXcgc2NvcGUoKSksIHtcbiAgICAgICAgICAgIGE6IDIsIGI6IHVuZGVmaW5lZFxuICAgICAgICB9KVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBkZXRlcm1pbmVVbmlxdWVTY29wZU5hbWUgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5kZXRlcm1pbmVVbmlxdWVTY29wZU5hbWUoKS5zdGFydHNXaXRoKFxuICAgICAgICAgICAgJ2NhbGxiYWNrJykpXG4gICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmRldGVybWluZVVuaXF1ZVNjb3BlTmFtZSgnaGFucycpLnN0YXJ0c1dpdGgoXG4gICAgICAgICAgICAnaGFucycpKVxuICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5kZXRlcm1pbmVVbmlxdWVTY29wZU5hbWUoXG4gICAgICAgICAgICAnaGFucycsICcnLCB7fVxuICAgICAgICApLnN0YXJ0c1dpdGgoJ2hhbnMnKSlcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3MuZGV0ZXJtaW5lVW5pcXVlU2NvcGVOYW1lKFxuICAgICAgICAgICAgJ2hhbnMnLCAnJywge30sICdwZXRlcidcbiAgICAgICAgKSwgJ3BldGVyJylcbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuZGV0ZXJtaW5lVW5pcXVlU2NvcGVOYW1lKFxuICAgICAgICAgICAgJ2hhbnMnLCAnJywge3BldGVyOiAyfSwgJ3BldGVyJ1xuICAgICAgICApLnN0YXJ0c1dpdGgoJ2hhbnMnKSlcbiAgICAgICAgY29uc3QgbmFtZTpzdHJpbmcgPSAkLlRvb2xzLmNsYXNzLmRldGVybWluZVVuaXF1ZVNjb3BlTmFtZShcbiAgICAgICAgICAgICdoYW5zJywgJ2tsYXVzJywge3BldGVyOiAyfSwgJ3BldGVyJylcbiAgICAgICAgYXNzZXJ0Lm9rKG5hbWUuc3RhcnRzV2l0aCgnaGFucycpKVxuICAgICAgICBhc3NlcnQub2sobmFtZS5lbmRzV2l0aCgna2xhdXMnKSlcbiAgICAgICAgYXNzZXJ0Lm9rKG5hbWUubGVuZ3RoID4gJ2hhbnMnLmxlbmd0aCArICdrbGF1cycubGVuZ3RoKVxuICAgIH0pXG4gICAgLy8gLy8gZW5kcmVnaW9uXG4gICAgLy8gLy8gcmVnaW9uIGZ1bmN0aW9uIGhhbmRsaW5nXG4gICAgdGhpcy50ZXN0KGBnZXRQYXJhbWV0ZXJOYW1lcyAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW2Z1bmN0aW9uKCk6dm9pZCB7fSwgW11dLFxuICAgICAgICAgICAgWydmdW5jdGlvbigpIHt9JywgW11dLFxuICAgICAgICAgICAgWydmdW5jdGlvbihhLCAvKiBhc2QqLyBiLCBjLyoqLykge30nLCBbJ2EnLCAnYicsICdjJ11dLFxuICAgICAgICAgICAgWycoYSwgLyphc2QqL2IsIGMvKiovKSA9PiB7fScsIFsnYScsICdiJywgJ2MnXV0sXG4gICAgICAgICAgICBbYChhLCAvKmFzZCovYiwgYy8qKi8pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMlxuICAgICAgICAgICAgfWAsIFsnYScsICdiJywgJ2MnXV0sXG4gICAgICAgICAgICBbJyhhLCAvKiBhc2QqL2IsIGMvKiAqLykgPT4gMicsIFsnYScsICdiJywgJ2MnXV0sXG4gICAgICAgICAgICBbJyhhLCAvKiBhc2QqL2IgPSAyLCBjLyogKi8pID0+IDInLCBbJ2EnLCAnYicsICdjJ11dLFxuICAgICAgICAgICAgWydhID0+IDInLCBbJ2EnXV0sXG4gICAgICAgICAgICBbYGNsYXNzIEEge1xuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKGEsIGIsIGMpIHt9XG4gICAgICAgICAgICAgICAgYSgpIHt9XG4gICAgICAgICAgICB9YCwgWydhJywgJ2InLCAnYyddXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmdldFBhcmFtZXRlck5hbWVzKHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBpZGVudGl0eSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgWzIsIDJdLFxuICAgICAgICAgICAgWycnLCAnJ10sXG4gICAgICAgICAgICBbdW5kZWZpbmVkLCB1bmRlZmluZWRdLFxuICAgICAgICAgICAgW251bGwsIG51bGxdLFxuICAgICAgICAgICAgWydoYW5zJywgJ2hhbnMnXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3MuaWRlbnRpdHkodGVzdFswXSksIHRlc3RbMV0pXG4gICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmlkZW50aXR5KHt9KSAhPT0ge30pXG4gICAgICAgIGNvbnN0IHRlc3RPYmplY3QgPSB7fVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5pZGVudGl0eSh0ZXN0T2JqZWN0KSwgdGVzdE9iamVjdClcbiAgICB9KVxuICAgIHRoaXMudGVzdChgaW52ZXJ0QXJyYXlGaWx0ZXIgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5pbnZlcnRBcnJheUZpbHRlcihcbiAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuYXJyYXlEZWxldGVFbXB0eUl0ZW1zXG4gICAgICAgICkoW3thOiBudWxsfV0pLCBbe2E6IG51bGx9XSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmludmVydEFycmF5RmlsdGVyKFxuICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5hcnJheUV4dHJhY3RJZk1hdGNoZXNcbiAgICAgICAgKShbJ2EnLCAnYiddLCAnXmEkJyksIFsnYiddKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGB0aW1lb3V0ICgke3JvdW5kVHlwZX0pYCwgYXN5bmMgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgY29uc3QgZG9uZTpGdW5jdGlvbiA9IGFzc2VydC5hc3luYygpXG4gICAgICAgIGFzc2VydC5ub3RPayhhd2FpdCAkLlRvb2xzLmNsYXNzLnRpbWVvdXQoKSlcbiAgICAgICAgYXNzZXJ0Lm5vdE9rKGF3YWl0ICQuVG9vbHMuY2xhc3MudGltZW91dCgwKSlcbiAgICAgICAgYXNzZXJ0Lm5vdE9rKGF3YWl0ICQuVG9vbHMuY2xhc3MudGltZW91dCgxKSlcbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MudGltZW91dCgpIGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MudGltZW91dCgpLmhhc093blByb3BlcnR5KCdjbGVhcicpKVxuICAgICAgICBsZXQgdGVzdDpib29sZWFuID0gZmFsc2VcbiAgICAgICAgY29uc3QgcmVzdWx0OlByb21pc2U8Ym9vbGVhbj4gPSAkLlRvb2xzLmNsYXNzLnRpbWVvdXQoMTAgKiogMjAsIHRydWUpXG4gICAgICAgIHJlc3VsdC5jYXRjaCgoKTp2b2lkID0+IHtcbiAgICAgICAgICAgIHRlc3QgPSB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIC8vIElnbm9yZVR5cGVDaGVja1xuICAgICAgICByZXN1bHQuY2xlYXIoKVxuICAgICAgICBsZXQgdGVzdDI6Ym9vbGVhbiA9IGZhbHNlXG4gICAgICAgIGFzc2VydC5ub3RPayhhd2FpdCAkLlRvb2xzLmNsYXNzLnRpbWVvdXQoKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICB0ZXN0MiA9IHRydWVcbiAgICAgICAgfSkpXG4gICAgICAgIGFzc2VydC5vayh0ZXN0KVxuICAgICAgICBhc3NlcnQub2sodGVzdDIpXG4gICAgICAgIGRvbmUoKVxuICAgIH0pXG4gICAgLy8gLy8gZW5kcmVnaW9uXG4gICAgLy8gLy8gcmVnaW9uIGV2ZW50XG4gICAgdGhpcy50ZXN0KGBkZWJvdW5jZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgbGV0IHRlc3RWYWx1ZSA9IGZhbHNlXG4gICAgICAgICQuVG9vbHMuY2xhc3MuZGVib3VuY2UoKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICB0ZXN0VmFsdWUgPSB0cnVlXG4gICAgICAgIH0pKClcbiAgICAgICAgYXNzZXJ0Lm9rKHRlc3RWYWx1ZSlcbiAgICAgICAgY29uc3QgY2FsbGJhY2s6RnVuY3Rpb24gPSAkLlRvb2xzLmNsYXNzLmRlYm91bmNlKCgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgdGVzdFZhbHVlID0gIXRlc3RWYWx1ZVxuICAgICAgICB9LCAxMDAwKVxuICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgYXNzZXJ0Lm5vdE9rKHRlc3RWYWx1ZSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgZmlyZUV2ZW50ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scyh7b25DbGljazogKCk6MiA9PiAyfSkuZmlyZUV2ZW50KFxuICAgICAgICAgICAgJ2NsaWNrJywgdHJ1ZVxuICAgICAgICApLCAyKVxuICAgICAgICBhc3NlcnQubm90T2soJC5Ub29scyh7b25DbGljazogKCk6ZmFsc2UgPT4gZmFsc2V9KS5maXJlRXZlbnQoXG4gICAgICAgICAgICAnY2xpY2snLCB0cnVlKSlcbiAgICAgICAgYXNzZXJ0Lm9rKHRvb2xzLmZpcmVFdmVudCgnY2xpY2snKSlcbiAgICAgICAgdG9vbHMub25DbGljayA9ICgpOjMgPT4gM1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodG9vbHMuZmlyZUV2ZW50KCdjbGljaycpLCB0cnVlKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodG9vbHMuZmlyZUV2ZW50KCdjbGljaycsIHRydWUpLCB0cnVlKVxuICAgIH0pXG4gICAgaWYgKHJvdW5kVHlwZSA9PT0gJ2Z1bGwnKSB7XG4gICAgICAgIHRoaXMudGVzdChgb24gKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgICAgICBsZXQgdGVzdFZhbHVlID0gZmFsc2VcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0b29scy5vbignYm9keScsICdjbGljaycsICgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRlc3RWYWx1ZSA9IHRydWVcbiAgICAgICAgICAgIH0pWzBdLCAkKCdib2R5JylbMF0pXG5cbiAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VyKCdjbGljaycpXG4gICAgICAgICAgICBhc3NlcnQub2sodGVzdFZhbHVlKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlc3QoYG9mZiAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgICAgIGxldCB0ZXN0VmFsdWUgPSBmYWxzZVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRvb2xzLm9uKCdib2R5JywgJ2NsaWNrJywgKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgdGVzdFZhbHVlID0gdHJ1ZVxuICAgICAgICAgICAgfSlbMF0sICQoJ2JvZHknKVswXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0b29scy5vZmYoJ2JvZHknLCAnY2xpY2snKVswXSwgJCgnYm9keScpWzBdKVxuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcignY2xpY2snKVxuICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKHRlc3RWYWx1ZSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8gLy8gZW5kcmVnaW9uXG4gICAgLy8gLy8gcmVnaW9uIG9iamVjdFxuICAgIHRoaXMudGVzdChgYWRkRHluYW1pY0dldHRlckFuZFNldHRlciAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkLlRvb2xzLmNsYXNzLmFkZER5bmFtaWNHZXR0ZXJBbmRTZXR0ZXIobnVsbCksIG51bGwpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkLlRvb2xzLmNsYXNzLmFkZER5bmFtaWNHZXR0ZXJBbmRTZXR0ZXIodHJ1ZSksIHRydWUpXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmFkZER5bmFtaWNHZXR0ZXJBbmRTZXR0ZXIoe2E6IDJ9KSwge2E6IDJ9KVxuICAgICAgICBhc3NlcnQubm90T2soJC5Ub29scy5jbGFzcy5hZGREeW5hbWljR2V0dGVyQW5kU2V0dGVyKHtcbiAgICAgICAgfSkuX190YXJnZXRfXyBpbnN0YW5jZW9mIE9iamVjdClcbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuYWRkRHluYW1pY0dldHRlckFuZFNldHRlcih7fSwgKFxuICAgICAgICAgICAgdmFsdWU6YW55XG4gICAgICAgICk6YW55ID0+IHZhbHVlKS5fX3RhcmdldF9fIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgICAgICBjb25zdCBtb2NrdXAgPSB7fVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5hZGREeW5hbWljR2V0dGVyQW5kU2V0dGVyKFxuICAgICAgICAgICAgbW9ja3VwXG4gICAgICAgICksIG1vY2t1cClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3MuYWRkRHluYW1pY0dldHRlckFuZFNldHRlcihcbiAgICAgICAgICAgIG1vY2t1cCwgKHZhbHVlOmFueSk6YW55ID0+IHZhbHVlXG4gICAgICAgICkuX190YXJnZXRfXywgbW9ja3VwKVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYWRkRHluYW1pY0dldHRlckFuZFNldHRlcih7YTogMX0sIChcbiAgICAgICAgICAgIHZhbHVlOmFueVxuICAgICAgICApOmFueSA9PiB2YWx1ZSArIDIpLmEsIDMpXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5hZGREeW5hbWljR2V0dGVyQW5kU2V0dGVyKFxuICAgICAgICAgICAge2E6IHthOiAxfX0sICh2YWx1ZTphbnkpOmFueSA9PiAoXG4gICAgICAgICAgICAgICAgdmFsdWUgaW5zdGFuY2VvZiBPYmplY3RcbiAgICAgICAgICAgICkgPyB2YWx1ZSA6IHZhbHVlICsgMikuYS5hLCAzKVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYWRkRHluYW1pY0dldHRlckFuZFNldHRlcih7YToge2E6IFt7XG4gICAgICAgICAgICBhOiAxXG4gICAgICAgIH1dfX0sICh2YWx1ZTphbnkpOmFueSA9PiAoXG4gICAgICAgICAgICB2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdFxuICAgICAgICApID8gdmFsdWUgOiB2YWx1ZSArIDIpLmEuYVswXS5hLCAzKVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYWRkRHluYW1pY0dldHRlckFuZFNldHRlcihcbiAgICAgICAgICAgIHthOiB7YTogMX19LCAodmFsdWU6YW55KTphbnkgPT5cbiAgICAgICAgICAgICAgICAodmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpID8gdmFsdWUgOiB2YWx1ZSArIDIsXG4gICAgICAgICAgICBudWxsLCB7aGFzOiAnaGFzT3duUHJvcGVydHknfSwgZmFsc2VcbiAgICAgICAgKS5hLmEsIDEpXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5hZGREeW5hbWljR2V0dGVyQW5kU2V0dGVyKFxuICAgICAgICAgICAge2E6IDF9LCAodmFsdWU6YW55KTphbnkgPT5cbiAgICAgICAgICAgICAgICAodmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpID8gdmFsdWUgOiB2YWx1ZSArIDIsXG4gICAgICAgICAgICBudWxsLCB7aGFzOiAnaGFzT3duUHJvcGVydHknfSwgZmFsc2UsIFtdXG4gICAgICAgICkuYSwgMSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmFkZER5bmFtaWNHZXR0ZXJBbmRTZXR0ZXIoXG4gICAgICAgICAgICB7YTogbmV3IE1hcChbWydhJywgMV1dKX0sICh2YWx1ZTphbnkpOmFueSA9PlxuICAgICAgICAgICAgICAgICh2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgPyB2YWx1ZSA6IHZhbHVlICsgMixcbiAgICAgICAgICAgIG51bGwsIHtkZWxldGU6ICdkZWxldGUnLCBnZXQ6ICdnZXQnLCBzZXQ6ICdzZXQnLCBoYXM6ICdoYXMnfSwgdHJ1ZSxcbiAgICAgICAgICAgIFtNYXBdXG4gICAgICAgICkuYS5hLCAzKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBjb252ZXJ0Q2lyY3VsYXJPYmplY3RUb0pTT04gKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBsZXQgdGVzdE9iamVjdDE6T2JqZWN0ID0ge31cbiAgICAgICAgY29uc3QgdGVzdE9iamVjdDI6T2JqZWN0ID0ge2E6IHRlc3RPYmplY3QxfVxuICAgICAgICB0ZXN0T2JqZWN0MS5hID0gdGVzdE9iamVjdDJcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW3t9LCAne30nXSxcbiAgICAgICAgICAgIFt7YTogbnVsbH0sICd7XCJhXCI6bnVsbH0nXSxcbiAgICAgICAgICAgIFt7YToge2E6IDJ9fSwgJ3tcImFcIjp7XCJhXCI6Mn19J10sXG4gICAgICAgICAgICBbe2E6IHthOiBJbmZpbml0eX19LCAne1wiYVwiOntcImFcIjpudWxsfX0nXSxcbiAgICAgICAgICAgIFt0ZXN0T2JqZWN0MSwgJ3tcImFcIjp7XCJhXCI6XCJfX2NpcmN1bGFyUmVmZXJlbmNlX19cIn19J11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5jb252ZXJ0Q2lyY3VsYXJPYmplY3RUb0pTT04odGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGNvbnZlcnRNYXBUb1BsYWluT2JqZWN0ICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tudWxsXSwgbnVsbF0sXG4gICAgICAgICAgICBbW3RydWVdLCB0cnVlXSxcbiAgICAgICAgICAgIFtbMF0sIDBdLFxuICAgICAgICAgICAgW1syXSwgMl0sXG4gICAgICAgICAgICBbWydhJ10sICdhJ10sXG4gICAgICAgICAgICBbW25ldyBNYXAoKV0sIHt9XSxcbiAgICAgICAgICAgIFtbW25ldyBNYXAoKV1dLCBbe31dXSxcbiAgICAgICAgICAgIFtbW25ldyBNYXAoKV0sIGZhbHNlXSwgW25ldyBNYXAoKV1dLFxuICAgICAgICAgICAgW1tbbmV3IE1hcChbWydhJywgMl0sIFsyLCAyXV0pXV0sIFt7YTogMiwgJzInOiAyfV1dLFxuICAgICAgICAgICAgW1tbbmV3IE1hcChbWydhJywgbmV3IE1hcCgpXSwgWzIsIDJdXSldXSwgW3thOiB7fSwgJzInOiAyfV1dLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtbbmV3IE1hcChbWydhJywgbmV3IE1hcChbWydhJywgMl1dKV0sIFsyLCAyXV0pXV0sXG4gICAgICAgICAgICAgICAgW3thOiB7YTogMn0sICcyJzogMn1dXG4gICAgICAgICAgICBdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuY29udmVydE1hcFRvUGxhaW5PYmplY3QoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGNvbnZlcnRQbGFpbk9iamVjdFRvTWFwICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tudWxsXSwgbnVsbF0sXG4gICAgICAgICAgICBbW3RydWVdLCB0cnVlXSxcbiAgICAgICAgICAgIFtbMF0sIDBdLFxuICAgICAgICAgICAgW1syXSwgMl0sXG4gICAgICAgICAgICBbWydhJ10sICdhJ10sXG4gICAgICAgICAgICBbW3t9XSwgbmV3IE1hcCgpXSxcbiAgICAgICAgICAgIFtbW3t9XV0sIFtuZXcgTWFwKCldXSxcbiAgICAgICAgICAgIFtbW3t9XSwgZmFsc2VdLCBbe31dXSxcbiAgICAgICAgICAgIFtbW3thOiB7fSwgYjogMn1dXSwgW25ldyBNYXAoW1snYScsIG5ldyBNYXAoKV0sIFsnYicsIDJdXSldXSxcbiAgICAgICAgICAgIFtbW3tiOiAyLCBhOiB7fX1dXSwgW25ldyBNYXAoW1snYScsIG5ldyBNYXAoKV0sIFsnYicsIDJdXSldXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbW3tiOiAyLCBhOiBuZXcgTWFwKCl9XV0sXG4gICAgICAgICAgICAgICAgW25ldyBNYXAoW1snYScsIG5ldyBNYXAoKV0sIFsnYicsIDJdXSldXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtbe2I6IDIsIGE6IFt7fV19XV0sXG4gICAgICAgICAgICAgICAgW25ldyBNYXAoW1snYScsIFtuZXcgTWFwKCldXSwgWydiJywgMl1dKV1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1t7YjogMiwgYTogbmV3IFNldChbe31dKX1dXSxcbiAgICAgICAgICAgICAgICBbbmV3IE1hcChbWydhJywgbmV3IFNldChbbmV3IE1hcCgpXSldLCBbJ2InLCAyXV0pXVxuICAgICAgICAgICAgXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmNvbnZlcnRQbGFpbk9iamVjdFRvTWFwKC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBjb252ZXJ0U3Vic3RyaW5nSW5QbGFpbk9iamVjdCAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFt7fSwgL2EvLCAnJywge31dLFxuICAgICAgICAgICAgW3thOiAnYSd9LCAvYS8sICdiJywge2E6ICdiJ31dLFxuICAgICAgICAgICAgW3thOiAnYWEnfSwgL2EvLCAnYicsIHthOiAnYmEnfV0sXG4gICAgICAgICAgICBbe2E6ICdhYSd9LCAvYS9nLCAnYicsIHthOiAnYmInfV0sXG4gICAgICAgICAgICBbe2E6IHthOiAnYWEnfX0sIC9hL2csICdiJywge2E6IHthOiAnYmInfX1dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuY29udmVydFN1YnN0cmluZ0luUGxhaW5PYmplY3QoXG4gICAgICAgICAgICAgICAgdGVzdFswXSwgdGVzdFsxXSwgdGVzdFsyXVxuICAgICAgICAgICAgKSwgdGVzdFszXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgY29weSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1syMV0sIDIxXSxcbiAgICAgICAgICAgIFtbMCwgLTFdLCAwXSxcbiAgICAgICAgICAgIFtbMCwgMV0sIDBdLFxuICAgICAgICAgICAgW1swLCAxMF0sIDBdLFxuICAgICAgICAgICAgW1tuZXcgRGF0ZSgwKV0sIG5ldyBEYXRlKDApXSxcbiAgICAgICAgICAgIFtbL2EvXSwgL2EvXSxcbiAgICAgICAgICAgIFtbe31dLCB7fV0sXG4gICAgICAgICAgICBbW3t9LCAtMV0sIHt9XSxcbiAgICAgICAgICAgIFtbW11dLCBbXV0sXG4gICAgICAgICAgICBbW25ldyBNYXAoKSwgLTFdLCBuZXcgTWFwKCldLFxuICAgICAgICAgICAgW1tuZXcgU2V0KCksIC0xXSwgbmV3IFNldCgpXSxcbiAgICAgICAgICAgIFtbe2E6IDJ9LCAwXSwge2E6IDJ9XSxcbiAgICAgICAgICAgIFtbe2E6IHthOiAyfX0sIDBdLCB7YTogbnVsbH1dLFxuICAgICAgICAgICAgW1t7YToge2E6IDJ9fSwgMV0sIHthOiB7YTogMn19XSxcbiAgICAgICAgICAgIFtbe2E6IHthOiAyfX0sIDJdLCB7YToge2E6IDJ9fV0sXG4gICAgICAgICAgICBbW3thOiBbe2E6IDJ9XX0sIDFdLCB7YTogW251bGxdfV0sXG4gICAgICAgICAgICBbW3thOiBbe2E6IDJ9XX0sIDJdLCB7YTogW3thOiAyfV19XSxcbiAgICAgICAgICAgIFtbe2E6IHthOiAyfX0sIDEwXSwge2E6IHthOiAyfX1dLFxuICAgICAgICAgICAgW1tuZXcgTWFwKFtbJ2EnLCAyXV0pLCAwXSwgbmV3IE1hcChbWydhJywgMl1dKV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW25ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIDJdXSldXSksIDBdLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIG51bGxdXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW25ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIDJdXSldXSksIDFdLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIDJdXSldXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW25ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIDJdXSldXSksIDJdLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIDJdXSldXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW25ldyBNYXAoW1snYScsIFtuZXcgTWFwKFtbJ2EnLCAyXV0pXV1dKSwgMV0sXG4gICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgW251bGxdXV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtuZXcgTWFwKFtbJ2EnLCBbbmV3IE1hcChbWydhJywgMl1dKV1dXSksIDJdLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIFtuZXcgTWFwKFtbJ2EnLCAyXV0pXV1dKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbbmV3IE1hcChbWydhJywgbmV3IE1hcChbWydhJywgMl1dKV1dKSwgMTBdLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIDJdXSldXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW25ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIDJdXSldXSksIDEwXSxcbiAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCBuZXcgTWFwKFtbJ2EnLCAyXV0pXV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1tuZXcgU2V0KFsnYScsIDJdKSwgMF0sIG5ldyBTZXQoWydhJywgMl0pXSxcbiAgICAgICAgICAgIFtbbmV3IFNldChbJ2EnLCBuZXcgU2V0KFsnYScsIDJdKV0pLCAwXSwgbmV3IFNldChbJ2EnLCBudWxsXSldLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtuZXcgU2V0KFsnYScsIG5ldyBTZXQoWydhJywgMl0pXSksIDFdLFxuICAgICAgICAgICAgICAgIG5ldyBTZXQoWydhJywgbmV3IFNldChbJ2EnLCAyXSldKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbbmV3IFNldChbJ2EnLCBuZXcgU2V0KFsnYScsIDJdKV0pLCAyXSxcbiAgICAgICAgICAgICAgICBuZXcgU2V0KFsnYScsIG5ldyBTZXQoWydhJywgMl0pXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbW25ldyBTZXQoWydhJywgW25ldyBTZXQoWydhJywgMl0pXV0pLCAxXSwgbmV3IFNldChbJ2EnLCBbbnVsbF1dKV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW25ldyBTZXQoWydhJywgW25ldyBTZXQoWydhJywgMl0pXV0pLCAyXSxcbiAgICAgICAgICAgICAgICBuZXcgU2V0KFsnYScsIFtuZXcgU2V0KFsnYScsIDJdKV1dKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbbmV3IFNldChbJ2EnLCBuZXcgU2V0KFsnYScsIDJdKV0pLCAxMF0sXG4gICAgICAgICAgICAgICAgbmV3IFNldChbJ2EnLCBuZXcgU2V0KFsnYScsIDJdKV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtuZXcgU2V0KFsnYScsIG5ldyBTZXQoWydhJywgMl0pXSksIDEwXSxcbiAgICAgICAgICAgICAgICBuZXcgU2V0KFsnYScsIG5ldyBTZXQoWydhJywgMl0pXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5jb3B5KC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBkZXRlcm1pbmVUeXBlICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5kZXRlcm1pbmVUeXBlKCksICd1bmRlZmluZWQnKVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbdW5kZWZpbmVkLCAndW5kZWZpbmVkJ10sXG4gICAgICAgICAgICBbe30ubm90RGVmaW5lZCwgJ3VuZGVmaW5lZCddLFxuICAgICAgICAgICAgW251bGwsICdudWxsJ10sXG4gICAgICAgICAgICBbdHJ1ZSwgJ2Jvb2xlYW4nXSxcbiAgICAgICAgICAgIFtuZXcgQm9vbGVhbigpLCAnYm9vbGVhbiddLFxuICAgICAgICAgICAgWzMsICdudW1iZXInXSxcbiAgICAgICAgICAgIFtuZXcgTnVtYmVyKDMpLCAnbnVtYmVyJ10sXG4gICAgICAgICAgICBbJycsICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFtuZXcgU3RyaW5nKCcnKSwgJ3N0cmluZyddLFxuICAgICAgICAgICAgWyd0ZXN0JywgJ3N0cmluZyddLFxuICAgICAgICAgICAgW25ldyBTdHJpbmcoJ3Rlc3QnKSwgJ3N0cmluZyddLFxuICAgICAgICAgICAgW2Z1bmN0aW9uKCk6dm9pZCB7fSwgJ2Z1bmN0aW9uJ10sXG4gICAgICAgICAgICBbKCk6dm9pZCA9PiB7fSwgJ2Z1bmN0aW9uJ10sXG4gICAgICAgICAgICBbW10sICdhcnJheSddLFxuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tYXJyYXktY29uc3RydWN0b3IgKi9cbiAgICAgICAgICAgIC8vIElnbm9yZVR5cGVDaGVja1xuICAgICAgICAgICAgW25ldyBBcnJheSgpLCAnYXJyYXknXSxcbiAgICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tYXJyYXktY29uc3RydWN0b3IgKi9cbiAgICAgICAgICAgIFtuZXcgRGF0ZSgpLCAnZGF0ZSddLFxuICAgICAgICAgICAgW25ldyBFcnJvcigpLCAnZXJyb3InXSxcbiAgICAgICAgICAgIFtuZXcgTWFwKCksICdtYXAnXSxcbiAgICAgICAgICAgIFtuZXcgU2V0KCksICdzZXQnXSxcbiAgICAgICAgICAgIFsvdGVzdC8sICdyZWdleHAnXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3MuZGV0ZXJtaW5lVHlwZSh0ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgZXF1YWxzICgke3JvdW5kVHlwZX0pYCwgYXN5bmMgKGFzc2VydDpPYmplY3QpOlByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCBkb25lOkZ1bmN0aW9uID0gYXNzZXJ0LmFzeW5jKClcbiAgICAgICAgY29uc3QgdGVzdEZ1bmN0aW9uOkZ1bmN0aW9uID0gKCk6dm9pZCA9PiB7fVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbMSwgMV0sXG4gICAgICAgICAgICBbbmV3IERhdGUoKSwgbmV3IERhdGUoKV0sXG4gICAgICAgICAgICBbbmV3IERhdGUoMTk5NSwgMTEsIDE3KSwgbmV3IERhdGUoMTk5NSwgMTEsIDE3KV0sXG4gICAgICAgICAgICBbL2EvLCAvYS9dLFxuICAgICAgICAgICAgW3thOiAyfSwge2E6IDJ9XSxcbiAgICAgICAgICAgIFt7YTogMiwgYjogM30sIHthOiAyLCBiOiAzfV0sXG4gICAgICAgICAgICBbWzEsIDIsIDNdLCBbMSwgMiwgM11dLFxuICAgICAgICAgICAgW1tdLCBbXV0sXG4gICAgICAgICAgICBbe30sIHt9XSxcbiAgICAgICAgICAgIFtuZXcgTWFwKCksIG5ldyBNYXAoKV0sXG4gICAgICAgICAgICBbbmV3IFNldCgpLCBuZXcgU2V0KCldLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCB7YTogMn1dLCBbMSwgMiwgMywge2E6IDJ9XV0sXG4gICAgICAgICAgICBbWzEsIDIsIDMsIG5ldyBNYXAoW1snYScsIDJdXSldLCBbMSwgMiwgMywgbmV3IE1hcChbWydhJywgMl1dKV1dLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCBuZXcgU2V0KFsnYScsIDJdKV0sIFsxLCAyLCAzLCBuZXcgU2V0KFsnYScsIDJdKV1dLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCBbMSwgMl1dLCBbMSwgMiwgMywgWzEsIDJdXV0sXG4gICAgICAgICAgICBbW3thOiAxfV0sIFt7YTogMX1dXSxcbiAgICAgICAgICAgIFtbe2E6IDEsIGI6IDF9XSwgW3thOiAxfV0sIFtdXSxcbiAgICAgICAgICAgIFtbe2E6IDEsIGI6IDF9XSwgW3thOiAxfV0sIFsnYSddXSxcbiAgICAgICAgICAgIFsyLCAyLCAwXSxcbiAgICAgICAgICAgIFtbe2E6IDEsIGI6IDF9XSwgW3thOiAxfV0sIG51bGwsIDBdLFxuICAgICAgICAgICAgW1t7YTogMX0sIHtiOiAxfV0sIFt7YTogMX0sIHtiOiAxfV0sIG51bGwsIDFdLFxuICAgICAgICAgICAgW1t7YToge2I6IDF9fSwge2I6IDF9XSwgW3thOiAxfSwge2I6IDF9XSwgbnVsbCwgMV0sXG4gICAgICAgICAgICBbW3thOiB7YjogMX19LCB7YjogMX1dLCBbe2E6IHtiOiAxfX0sIHtiOiAxfV0sIG51bGwsIDJdLFxuICAgICAgICAgICAgW1t7YToge2I6IHtjOiAxfX19LCB7YjogMX1dLCBbe2E6IHtiOiAxfX0sIHtiOiAxfV0sIG51bGwsIDJdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFt7YToge2I6IHtjOiAxfX19LCB7YjogMX1dLCBbe2E6IHtiOiAxfX0sIHtiOiAxfV0sIG51bGwsIDMsXG4gICAgICAgICAgICAgICAgWydiJ11cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbdGVzdEZ1bmN0aW9uLCB0ZXN0RnVuY3Rpb25dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5lcXVhbHMoLi4udGVzdCkpXG4gICAgICAgIGlmIChUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ25vZGUnKVxuICAgICAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuZXF1YWxzKFxuICAgICAgICAgICAgICAgIG5ldyBCdWZmZXIoJ2EnKSwgbmV3IEJ1ZmZlcignYScpLFxuICAgICAgICAgICAgICAgIG51bGwsIC0xLCBbXSwgdHJ1ZSwgdHJ1ZSkpXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IEJsb2IoWydhJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IEJsb2IoWydhJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBbbmV3IEJsb2IoWydhJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KV0sXG4gICAgICAgICAgICAgICAgICAgIFtuZXcgQmxvYihbJ2EnXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pXVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7YTogbmV3IEJsb2IoWydhJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KX0sXG4gICAgICAgICAgICAgICAgICAgIHthOiBuZXcgQmxvYihbJ2EnXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCBuZXcgQmxvYihbJ2EnXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pXV0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCBuZXcgQmxvYihbJ2EnXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pXV0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBTZXQoW25ldyBCbG9iKFsnYSddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSldKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFNldChbbmV3IEJsb2IoWydhJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KV0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGE6IG5ldyBTZXQoW1tuZXcgTWFwKFtbJ2EnLCBuZXcgQmxvYihbJ2EnXSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0L3BsYWluJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSldXSldXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBiOiAyXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGE6IG5ldyBTZXQoW1tuZXcgTWFwKFtbJ2EnLCBuZXcgQmxvYihbJ2EnXSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0L3BsYWluJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSldXSldXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBiOiAyXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIGFzc2VydC5vayhhd2FpdCAkLlRvb2xzLmNsYXNzLmVxdWFscyhcbiAgICAgICAgICAgICAgICAgICAgLi4udGVzdCwgbnVsbCwgLTEsIFtdLCB0cnVlLCB0cnVlKSlcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBCbG9iKFsnYSddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBCbG9iKFsnYiddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgW25ldyBCbG9iKFsnYSddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSldLFxuICAgICAgICAgICAgICAgICAgICBbbmV3IEJsb2IoWydiJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KV1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge2E6IG5ldyBCbG9iKFsnYSddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSl9LFxuICAgICAgICAgICAgICAgICAgICB7YTogbmV3IEJsb2IoWydiJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KX1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgbmV3IEJsb2IoWydhJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KV1dKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgbmV3IEJsb2IoWydiJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KV1dKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBuZXcgU2V0KFtuZXcgQmxvYihbJ2EnXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pXSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBTZXQoW25ldyBCbG9iKFsnYiddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSldKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhOiBuZXcgU2V0KFtbbmV3IE1hcChbWydhJywgbmV3IEJsb2IoWydhJ10sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGV4dC9wbGFpbidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXV0pXV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgYjogMlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhOiBuZXcgU2V0KFtbbmV3IE1hcChbWydhJywgbmV3IEJsb2IoWydiJ10sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGV4dC9wbGFpbidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXV0pXV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgYjogMlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBhc3NlcnQubm90T2soYXdhaXQgJC5Ub29scy5jbGFzcy5lcXVhbHMoXG4gICAgICAgICAgICAgICAgICAgIC4uLnRlc3QsIG51bGwsIC0xLCBbXSwgdHJ1ZSwgdHJ1ZSkpXG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1t7YToge2I6IDF9fSwge2I6IDF9XSwgW3thOiAxfSwge2I6IDF9XSwgbnVsbCwgMl0sXG4gICAgICAgICAgICBbW3thOiB7Yjoge2M6IDF9fX0sIHtiOiAxfV0sIFt7YToge2I6IDF9fSwge2I6IDF9XSwgbnVsbCwgM10sXG4gICAgICAgICAgICBbbmV3IERhdGUoMTk5NSwgMTEsIDE3KSwgbmV3IERhdGUoMTk5NSwgMTEsIDE2KV0sXG4gICAgICAgICAgICBbL2EvaSwgL2EvXSxcbiAgICAgICAgICAgIFsxLCAyXSxcbiAgICAgICAgICAgIFt7YTogMiwgYjogM30sIHthOiAyfV0sXG4gICAgICAgICAgICBbWzEsIDIsIDMsIDRdLCBbMSwgMiwgMywgNV1dLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCA0XSwgWzEsIDIsIDNdXSxcbiAgICAgICAgICAgIFtbMSwgMiwgMywge2E6IDJ9XSwgWzEsIDIsIDMsIHtiOiAyfV1dLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCBuZXcgTWFwKFtbJ2EnLCAyXV0pXSwgWzEsIDIsIDMsIG5ldyBNYXAoW1snYicsIDJdXSldXSxcbiAgICAgICAgICAgIFtbMSwgMiwgMywgbmV3IFNldChbJ2EnLCAyXSldLCBbMSwgMiwgMywgbmV3IFNldChbJ2InLCAyXSldXSxcbiAgICAgICAgICAgIFtbMSwgMiwgMywgWzEsIDJdXSwgWzEsIDIsIDMsIFsxLCAyLCAzXV1dLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCBbMSwgMiwgM11dLCBbMSwgMiwgMywgWzEsIDJdXV0sXG4gICAgICAgICAgICBbWzEsIDIsIDMsIFsxLCAyLCAzXV0sIFsxLCAyLCAzLCBbMSwgMiwge31dXV0sXG4gICAgICAgICAgICBbW3thOiAxLCBiOiAxfV0sIFt7YTogMX1dXSxcbiAgICAgICAgICAgIFtbe2E6IDEsIGI6IDF9XSwgW3thOiAxfV0sIFsnYScsICdiJ11dLFxuICAgICAgICAgICAgWzEsIDIsIDBdLFxuICAgICAgICAgICAgW1t7YTogMX0sIHtiOiAxfV0sIFt7YTogMX1dLCBudWxsLCAxXSxcbiAgICAgICAgICAgIFsoKTp2b2lkID0+IHt9LCAoKTp2b2lkID0+IHt9LCBudWxsLCAtMSwgW10sIGZhbHNlXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKCQuVG9vbHMuY2xhc3MuZXF1YWxzKC4uLnRlc3QpKVxuICAgICAgICBjb25zdCB0ZXN0ID0gKCk6dm9pZCA9PiB7fVxuICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5lcXVhbHModGVzdCwgdGVzdCwgbnVsbCwgLTEsIFtdLCBmYWxzZSkpXG4gICAgICAgIGRvbmUoKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBldmFsdWF0ZUR5bmFtaWNEYXRhU3RydWN0dXJlICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tudWxsXSwgbnVsbF0sXG4gICAgICAgICAgICBbW2ZhbHNlXSwgZmFsc2VdLFxuICAgICAgICAgICAgW1snMSddLCAnMSddLFxuICAgICAgICAgICAgW1szXSwgM10sXG4gICAgICAgICAgICBbW3t9XSwge31dLFxuICAgICAgICAgICAgW1t7YTogbnVsbH1dLCB7YTogbnVsbH1dLFxuICAgICAgICAgICAgW1t7X19ldmFsdWF0ZV9fOiAnMSArIDMnfV0sIDRdLFxuICAgICAgICAgICAgW1tbe19fZXZhbHVhdGVfXzogJzEnfV1dLCBbMV1dLFxuICAgICAgICAgICAgW1tbe19fZXZhbHVhdGVfXzogYCcxJ2B9XV0sIFsnMSddXSxcbiAgICAgICAgICAgIFtbe2E6IHtfX2V2YWx1YXRlX186IGAnYSdgfX1dLCB7YTogJ2EnfV0sXG4gICAgICAgICAgICBbW3thOiB7X19ldmFsdWF0ZV9fOiAnMSd9fV0sIHthOiAxfV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3thOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5iJ30sIGI6IDJ9LCB7fSwgJ3NlbGYnLCAnX19ydW5fXyddLFxuICAgICAgICAgICAgICAgIHthOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5iJ30sIGI6IDJ9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1t7YToge19fcnVuOiAnXy5iJ30sIGI6IDF9LCB7fSwgJ18nLCAnX19ydW4nXSwge2E6IDEsIGI6IDF9XSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbe2E6IFt7X19ydW46ICdzZWxmLmInfV0sIGI6IDF9LCB7fSwgJ3NlbGYnLCAnX19ydW4nXSxcbiAgICAgICAgICAgICAgICB7YTogWzFdLCBiOiAxfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbe2E6IHtfX2V2YWx1YXRlX186ICdzZWxmLmInfSwgYjogMn1dLCB7YTogMiwgYjogMn1dLFxuICAgICAgICAgICAgW1t7YToge19fZXZhbHVhdGVfXzogJ2MuYid9LCBiOiAyfSwge30sICdjJ10sIHthOiAyLCBiOiAyfV0sXG4gICAgICAgICAgICBbW3tcbiAgICAgICAgICAgICAgICBhOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5iJ30sXG4gICAgICAgICAgICAgICAgYjoge19fZXZhbHVhdGVfXzogJ3NlbGYuYyd9LFxuICAgICAgICAgICAgICAgIGM6IDJcbiAgICAgICAgICAgIH1dLCB7YTogMiwgYjogMiwgYzogMn1dLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgICAgICAgIGE6IHtfX2V4ZWN1dGVfXzogJ3JldHVybiBzZWxmLmInfSxcbiAgICAgICAgICAgICAgICAgICAgYjoge19fZXhlY3V0ZV9fOiAncmV0dXJuIHNlbGYuYyd9LFxuICAgICAgICAgICAgICAgICAgICBjOiB7X19leGVjdXRlX186ICdyZXR1cm4gc2VsZi5kJ30sXG4gICAgICAgICAgICAgICAgICAgIGQ6IHtfX2V4ZWN1dGVfXzogJ3JldHVybiBzZWxmLmUnfSxcbiAgICAgICAgICAgICAgICAgICAgZToge19fZXhlY3V0ZV9fOiAncmV0dXJuIHNlbGYuZid9LFxuICAgICAgICAgICAgICAgICAgICBmOiAzXG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAge2E6IDMsIGI6IDMsIGM6IDMsIGQ6IDMsIGU6IDMsIGY6IDN9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1t7XG4gICAgICAgICAgICAgICAgYToge19fZXZhbHVhdGVfXzogJ3NlbGYuYi5kLmUnfSxcbiAgICAgICAgICAgICAgICBiOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5jJ30sXG4gICAgICAgICAgICAgICAgYzoge2Q6IHtlOiAzfX1cbiAgICAgICAgICAgIH1dLCB7YTogMywgYjoge2Q6IHtlOiAzfX0sIGM6IHtkOiB7ZTogM319fV0sXG4gICAgICAgICAgICBbW3tcbiAgICAgICAgICAgICAgICBuOiB7X19ldmFsdWF0ZV9fOiAne2E6IFsxLCAyLCAzXX0nfSxcbiAgICAgICAgICAgICAgICBiOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5jJ30sXG4gICAgICAgICAgICAgICAgZjoge19fZXZhbHVhdGVfXzogJ3NlbGYuZy5oJ30sXG4gICAgICAgICAgICAgICAgZDoge19fZXZhbHVhdGVfXzogJ3NlbGYuZSd9LFxuICAgICAgICAgICAgICAgIGE6IHtfX2V2YWx1YXRlX186ICdzZWxmLmInfSxcbiAgICAgICAgICAgICAgICBlOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5mLmknfSxcbiAgICAgICAgICAgICAgICBrOiB7X19ldmFsdWF0ZV9fOiAnYGtrIDwtPiBcIiR7c2VsZi5sLmpvaW4oXFwnXCIsIFwiXFwnKX1cImAnfSxcbiAgICAgICAgICAgICAgICBjOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5kJ30sXG4gICAgICAgICAgICAgICAgbzogW3thOiAyLCBiOiBbW1t7X19ldmFsdWF0ZV9fOiAnMTAgKiogMid9XV1dfV0sXG4gICAgICAgICAgICAgICAgbDoge19fZXZhbHVhdGVfXzogJ3NlbGYubS5hJ30sXG4gICAgICAgICAgICAgICAgZzoge2g6IHtpOiB7X19ldmFsdWF0ZV9fOiAnYCR7c2VsZi5rfSA8LT4gJHtzZWxmLmp9YCd9fX0sXG4gICAgICAgICAgICAgICAgbToge2E6IFsxLCAyLCB7X19ldmFsdWF0ZV9fOiAnMyd9XX0sXG4gICAgICAgICAgICAgICAgajogJ2pqJ1xuICAgICAgICAgICAgfV0sIHtcbiAgICAgICAgICAgICAgICBhOiAna2sgPC0+IFwiMVwiLCBcIjJcIiwgXCIzXCIgPC0+IGpqJyxcbiAgICAgICAgICAgICAgICBiOiAna2sgPC0+IFwiMVwiLCBcIjJcIiwgXCIzXCIgPC0+IGpqJyxcbiAgICAgICAgICAgICAgICBjOiAna2sgPC0+IFwiMVwiLCBcIjJcIiwgXCIzXCIgPC0+IGpqJyxcbiAgICAgICAgICAgICAgICBkOiAna2sgPC0+IFwiMVwiLCBcIjJcIiwgXCIzXCIgPC0+IGpqJyxcbiAgICAgICAgICAgICAgICBlOiAna2sgPC0+IFwiMVwiLCBcIjJcIiwgXCIzXCIgPC0+IGpqJyxcbiAgICAgICAgICAgICAgICBmOiB7aTogJ2trIDwtPiBcIjFcIiwgXCIyXCIsIFwiM1wiIDwtPiBqaid9LFxuICAgICAgICAgICAgICAgIGc6IHtoOiB7aTogJ2trIDwtPiBcIjFcIiwgXCIyXCIsIFwiM1wiIDwtPiBqaid9fSxcbiAgICAgICAgICAgICAgICBqOiAnamonLFxuICAgICAgICAgICAgICAgIGs6ICdrayA8LT4gXCIxXCIsIFwiMlwiLCBcIjNcIicsXG4gICAgICAgICAgICAgICAgbDogWzEsIDIsIDNdLFxuICAgICAgICAgICAgICAgIG06IHthOiBbMSwgMiwgM119LFxuICAgICAgICAgICAgICAgIG46IHthOiBbMSwgMiwgM119LFxuICAgICAgICAgICAgICAgIG86IFt7YTogMiwgYjogW1tbMTAwXV1dfV1cbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgICAgICAgIGE6IHtfX2V2YWx1YXRlX186ICdfLmIuZC5lJ30sXG4gICAgICAgICAgICAgICAgICAgIGI6IHtfX2V2YWx1YXRlX186ICdfLmMnfSxcbiAgICAgICAgICAgICAgICAgICAgYzoge2Q6IHtlOiB7X19ldmFsdWF0ZV9fOiAndG9vbHMuY29weShbMl0pJ319fVxuICAgICAgICAgICAgICAgIH0sIHt0b29sczogJC5Ub29scy5jbGFzc30sICdfJ10sXG4gICAgICAgICAgICAgICAge2E6IFsyXSwgYjoge2Q6IHtlOiBbMl19fSwgYzoge2Q6IHtlOiBbMl19fX1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbW3thOiB7XG4gICAgICAgICAgICAgICAgYjogMSxcbiAgICAgICAgICAgICAgICBjOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5hLmInfVxuICAgICAgICAgICAgfX1dLCB7YToge2I6IDEsIGM6IDF9fV0sXG4gICAgICAgICAgICBbW3thOiB7XG4gICAgICAgICAgICAgICAgYjogbnVsbCxcbiAgICAgICAgICAgICAgICBjOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5hLmInfVxuICAgICAgICAgICAgfX1dLCB7YToge2I6IG51bGwsIGM6IG51bGx9fV0sXG4gICAgICAgICAgICBbW3thOiB7XG4gICAgICAgICAgICAgICAgYjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGM6IHtfX2V2YWx1YXRlX186ICdzZWxmLmEuYid9XG4gICAgICAgICAgICB9fV0sIHthOiB7YjogdW5kZWZpbmVkLCBjOiB1bmRlZmluZWR9fV0sXG4gICAgICAgICAgICBbW3thOiB7XG4gICAgICAgICAgICAgICAgYjogJ2phdScsXG4gICAgICAgICAgICAgICAgYzoge19fZXZhbHVhdGVfXzogJ3NlbGYuYS5iJ31cbiAgICAgICAgICAgIH19XSwge2E6IHtiOiAnamF1JywgYzogJ2phdSd9fV0sXG4gICAgICAgICAgICBbW3thOiB7XG4gICAgICAgICAgICAgICAgYjoge1xuICAgICAgICAgICAgICAgICAgICBjOiAnamF1JyxcbiAgICAgICAgICAgICAgICAgICAgZDoge19fZXZhbHVhdGVfXzogJ3NlbGYuYS5iLmMnfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XSwge2E6IHtiOiB7YzogJ2phdScsIGQ6ICdqYXUnfX19XSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIFsxLCAxXSwgWzYsIDFdLCBbMjUsIDNdLCBbMjgsIDNdLCBbMSwgNV0sIFs1LCA1XSwgWzE2LCA1XSxcbiAgICAgICAgICAgICAgICAgICAgWzI2LCA1XSwgWzMsIDEwXSwgWzEsIDExXSwgWzI1LCAxMl0sIFsyNiwgMTJdXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbMSwgMV0sIFs2LCAxXSwgWzI1LCAzXSwgWzI4LCAzXSwgWzEsIDVdLCBbNSwgNV0sIFsxNiwgNV0sXG4gICAgICAgICAgICAgICAgWzI2LCA1XSwgWzMsIDEwXSwgWzEsIDExXSwgWzI1LCAxMl0sIFsyNiwgMTJdXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge2E6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGI6IHtfX2V2YWx1YXRlX186ICdcInRcIiArIFwiZXNcIiArIFwidFwiJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICBjOiB7X19ldmFsdWF0ZV9fOiAncmVtb3ZlUyhzZWxmLmEuYiknfVxuICAgICAgICAgICAgICAgICAgICB9fSxcbiAgICAgICAgICAgICAgICAgICAge3JlbW92ZVM6ICh2YWx1ZTpzdHJpbmcpOnN0cmluZyA9PiB2YWx1ZS5yZXBsYWNlKCdzJywgJycpfVxuICAgICAgICAgICAgICAgIF0sIHthOiB7YjogJ3Rlc3QnLCBjOiAndGV0J319XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgICAgICAgIGE6IHtfX2V2YWx1YXRlX186ICd0b1N0cmluZyhzZWxmLmIpJ30sXG4gICAgICAgICAgICAgICAgICAgIGI6IHtfX2V2YWx1YXRlX186IGAnYSdgfVxuICAgICAgICAgICAgICAgIH0sIHt0b1N0cmluZzogKHZhbHVlOmFueSk6c3RyaW5nID0+IHZhbHVlLnRvU3RyaW5nKCl9XSxcbiAgICAgICAgICAgICAgICB7YTogJ2EnLCBiOiAnYSd9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1t7XG4gICAgICAgICAgICAgICAgYToge19fZXZhbHVhdGVfXzogJ09iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNlbGYuYiknfSxcbiAgICAgICAgICAgICAgICBiOiB7X19ldmFsdWF0ZV9fOiAne2E6IDJ9J31cbiAgICAgICAgICAgIH1dLCB7YTogWydhJ10sIGI6IHthOiAyfX1dLFxuICAgICAgICAgICAgW1t7XG4gICAgICAgICAgICAgICAgYToge19fZXZhbHVhdGVfXzogJ1JlZmxlY3Qub3duS2V5cyhzZWxmLmIpJ30sXG4gICAgICAgICAgICAgICAgYjoge19fZXZhbHVhdGVfXzogJ3thOiAyfSd9XG4gICAgICAgICAgICB9XSwge2E6IFsnYSddLCBiOiB7YTogMn19XSxcbiAgICAgICAgICAgIFtbe1xuICAgICAgICAgICAgICAgIGE6IHtfX2V2YWx1YXRlX186ICdPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzZWxmLmIpJ30sXG4gICAgICAgICAgICAgICAgYjoge19fZXZhbHVhdGVfXzogJ3NlbGYuYyd9LFxuICAgICAgICAgICAgICAgIGM6IHtfX2V4ZWN1dGVfXzogJ3JldHVybiB7YTogMSwgYjogMn0nfVxuICAgICAgICAgICAgfV0sIHthOiBbJ2EnLCAnYiddLCBiOiB7YTogMSwgYjogMn0sIGM6IHthOiAxLCBiOiAyfX1dLFxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICBOT1RFOiBUaGlzIGRlc2NyaWJlcyBhIHdvcmthcm91bmQgdW50aWwgdGhlIFwib3duS2V5c1wiIHByb3h5XG4gICAgICAgICAgICAgICAgdHJhcCB3b3JrcyBmb3IgdGhpcyB1c2UgY2FzZXMuXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgW1t7XG4gICAgICAgICAgICAgICAgYToge19fZXZhbHVhdGVfXzogJ09iamVjdC5rZXlzKHJlc29sdmUoc2VsZi5iKSknfSxcbiAgICAgICAgICAgICAgICBiOiB7X19ldmFsdWF0ZV9fOiAne2E6IDJ9J31cbiAgICAgICAgICAgIH1dLCB7YTogWydhJ10sIGI6IHthOiAyfX1dLFxuICAgICAgICAgICAgW1t7XG4gICAgICAgICAgICAgICAgYToge19fZXZhbHVhdGVfXzogYCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHJlc29sdmUoc2VsZi5iKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGtleSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgICAgIH0pKClgfSxcbiAgICAgICAgICAgICAgICBiOiB7X19ldmFsdWF0ZV9fOiAne2E6IDEsIGI6IDIsIGM6IDN9J31cbiAgICAgICAgICAgIH1dLCB7YTogWydhJywgJ2InLCAnYyddLCBiOiB7YTogMSwgYjogMiwgYzogM319XVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmNvcHkoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5ldmFsdWF0ZUR5bmFtaWNEYXRhU3RydWN0dXJlKC4uLnRlc3RbMF0pLCAtMSxcbiAgICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICApLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBleHRlbmRPYmplY3QgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDphbnkgb2YgW1xuICAgICAgICAgICAgW1tbXV0sIFtdXSxcbiAgICAgICAgICAgIFtbe31dLCB7fV0sXG4gICAgICAgICAgICBbW3thOiAxfV0sIHthOiAxfV0sXG4gICAgICAgICAgICBbW3thOiAxfSwge2E6IDJ9XSwge2E6IDJ9XSxcbiAgICAgICAgICAgIFtbe30sIHthOiAxfSwge2E6IDJ9XSwge2E6IDJ9XSxcbiAgICAgICAgICAgIFtbe30sIHthOiAxfSwge2E6IDJ9XSwge2E6IDJ9XSxcbiAgICAgICAgICAgIFtbe2E6IDEsIGI6IHthOiAxfX0sIHthOiAyLCBiOiB7YjogMX19XSwge2E6IDIsIGI6IHtiOiAxfX1dLFxuICAgICAgICAgICAgW1tbMSwgMl0sIFsxXV0sIFsxXV0sXG4gICAgICAgICAgICBbW25ldyBNYXAoKV0sIG5ldyBNYXAoKV0sXG4gICAgICAgICAgICBbW25ldyBTZXQoKV0sIG5ldyBTZXQoKV0sXG4gICAgICAgICAgICBbW25ldyBNYXAoW1snYScsIDFdXSldLCBuZXcgTWFwKFtbJ2EnLCAxXV0pXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbbmV3IE1hcChbWydhJywgMV1dKSwgbmV3IE1hcChbWydhJywgMl1dKV0sXG4gICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgMl1dKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbbmV3IE1hcCgpLCBuZXcgTWFwKFtbJ2EnLCAxXV0pLCBuZXcgTWFwKFtbJ2EnLCAyXV0pXSxcbiAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCAyXV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtuZXcgTWFwKCksIG5ldyBNYXAoW1snYScsIDFdXSksIG5ldyBNYXAoW1snYScsIDJdXSldLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIDJdXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCAxXSwgWydiJywgbmV3IE1hcChbWydhJywgMV1dKV1dKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgMl0sIFsnYicsIG5ldyBNYXAoW1snYicsIDFdXSldXSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIDJdLCBbJ2InLCBuZXcgTWFwKFtbJ2InLCAxXV0pXV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1t0cnVlLCB7fV0sIHt9XSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbdHJ1ZSwge2E6IDEsIGI6IHthOiAxfX0sIHthOiAyLCBiOiB7YjogMX19XSxcbiAgICAgICAgICAgICAgICB7YTogMiwgYjoge2E6IDEsIGI6IDF9fVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbdHJ1ZSwge2E6IDEsIGI6IHthOiBbXX19LCB7YTogMiwgYjoge2I6IDF9fV0sXG4gICAgICAgICAgICAgICAge2E6IDIsIGI6IHthOiBbXSwgYjogMX19XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1t0cnVlLCB7YToge2E6IFsxLCAyXX19LCB7YToge2E6IFszLCA0XX19XSwge2E6IHthOiBbMywgNF19fV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3RydWUsIHthOiB7YTogWzEsIDJdfX0sIHthOiB7YTogbnVsbH19XSxcbiAgICAgICAgICAgICAgICB7YToge2E6IG51bGx9fVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbdHJ1ZSwge2E6IHthOiBbMSwgMl19fSwge2E6IHRydWV9XSwge2E6IHRydWV9XSxcbiAgICAgICAgICAgIFtbdHJ1ZSwge2E6IHtfYTogMX19LCB7YToge2I6IDJ9fV0sIHthOiB7X2E6IDEsIGI6IDJ9fV0sXG4gICAgICAgICAgICBbW2ZhbHNlLCB7X2E6IDF9LCB7YTogMn1dLCB7YTogMiwgX2E6IDF9XSxcbiAgICAgICAgICAgIFtbdHJ1ZSwge2E6IHthOiBbMSwgMl19fSwgZmFsc2VdLCBmYWxzZV0sXG4gICAgICAgICAgICBbW3RydWUsIHthOiB7YTogWzEsIDJdfX0sIHVuZGVmaW5lZF0sIHVuZGVmaW5lZF0sXG4gICAgICAgICAgICBbW3RydWUsIHthOiAxfSwge2E6IDJ9LCB7YTogM31dLCB7YTogM31dLFxuICAgICAgICAgICAgW1t0cnVlLCBbMV0sIFsxLCAyXV0sIFsxLCAyXV0sXG4gICAgICAgICAgICBbW3RydWUsIFsxLCAyXSwgWzFdXSwgWzFdXSxcbiAgICAgICAgICAgIFtbdHJ1ZSwgbmV3IE1hcCgpXSwgbmV3IE1hcCgpXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHRydWUsIG5ldyBNYXAoW1snYScsIDFdLCBbJ2InLCBuZXcgTWFwKFtbJ2EnLCAxXV0pXV0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCAyXSwgWydiJywgbmV3IE1hcChbWydiJywgMV1dKV1dKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgMl0sIFsnYicsIG5ldyBNYXAoW1snYScsIDFdLCBbJ2InLCAxXV0pXV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSwgbmV3IE1hcChbWydhJywgMV0sIFsnYicsIG5ldyBNYXAoW1snYScsIFtdXV0pXV0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCAyXSwgWydiJywgbmV3IE1hcChbWydiJywgMV1dKV1dKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgMl0sIFsnYicsIG5ldyBNYXAoW1snYScsIFtdXSwgWydiJywgMV1dKV1dKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHRydWUsIG5ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIFsxLCAyXV1dKV1dKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgbmV3IE1hcChbWydhJywgWzMsIDRdXV0pXV0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCBuZXcgTWFwKFtbJ2EnLCBbMywgNF1dXSldXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5leHRlbmRPYmplY3QoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuZXh0ZW5kT2JqZWN0KFsxLCAyXSwgdW5kZWZpbmVkKSwgdW5kZWZpbmVkKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5leHRlbmRPYmplY3QoWzEsIDJdLCBudWxsKSwgbnVsbClcbiAgICAgICAgY29uc3QgdGFyZ2V0Ok9iamVjdCA9IHthOiBbMSwgMl19XG4gICAgICAgICQuVG9vbHMuY2xhc3MuZXh0ZW5kT2JqZWN0KHRydWUsIHRhcmdldCwge2E6IFszLCA0XX0pXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwodGFyZ2V0LCB7YTogWzMsIDRdfSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgZm9yRWFjaFNvcnRlZCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdXG4gICAgICAgIGNvbnN0IHRlc3RlciA9IChpdGVtOkFycmF5PGFueT58T2JqZWN0KTpBcnJheTxhbnk+ID0+XG4gICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmZvckVhY2hTb3J0ZWQoXG4gICAgICAgICAgICAgICAgaXRlbSwgKHZhbHVlOmFueSwga2V5OnN0cmluZ3xudW1iZXIpOm51bWJlciA9PlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChba2V5LCB2YWx1ZV0pKVxuICAgICAgICB0ZXN0ZXIoe30pXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbXSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCh0ZXN0ZXIoe30pLCBbXSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCh0ZXN0ZXIoW10pLCBbXSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCh0ZXN0ZXIoe2E6IDJ9KSwgWydhJ10pXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwodGVzdGVyKHtiOiAxLCBhOiAyfSksIFsnYScsICdiJ10pXG4gICAgICAgIHJlc3VsdCA9IFtdXG4gICAgICAgIHRlc3Rlcih7YjogMSwgYTogMn0pXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbWydhJywgMl0sIFsnYicsIDFdXSlcbiAgICAgICAgcmVzdWx0ID0gW11cblxuICAgICAgICB0ZXN0ZXIoWzIsIDJdKVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW1swLCAyXSwgWzEsIDJdXSlcbiAgICAgICAgcmVzdWx0ID0gW11cbiAgICAgICAgdGVzdGVyKHsnNSc6IDIsICc2JzogMiwgJzInOiAzfSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFtbJzInLCAzXSwgWyc1JywgMl0sIFsnNicsIDJdXSlcbiAgICAgICAgcmVzdWx0ID0gW11cbiAgICAgICAgdGVzdGVyKHthOiAyLCBjOiAyLCB6OiAzfSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFtbJ2EnLCAyXSwgWydjJywgMl0sIFsneicsIDNdXSlcbiAgICAgICAgJC5Ub29scy5jbGFzcy5mb3JFYWNoU29ydGVkKFsxXSwgZnVuY3Rpb24oKTpudW1iZXIge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpc1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICB9LCAyKVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgMilcbiAgICB9KVxuICAgIHRoaXMudGVzdChgZ2V0UHJveHlIYW5kbGVyICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5pc1BsYWluT2JqZWN0KCQuVG9vbHMuY2xhc3MuZ2V0UHJveHlIYW5kbGVyKFxuICAgICAgICAgICAge30pKSlcbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuaXNQbGFpbk9iamVjdCgkLlRvb2xzLmNsYXNzLmdldFByb3h5SGFuZGxlcihcbiAgICAgICAgICAgIG5ldyBNYXAoKSwge2dldDogJ2dldCd9KSkpXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYG1vZGlmeU9iamVjdCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OmFueSBvZiBbXG4gICAgICAgICAgICBbW3t9LCB7fV0sIHt9LCB7fV0sXG4gICAgICAgICAgICBbW3thOiAyfSwge31dLCB7YTogMn0sIHt9XSxcbiAgICAgICAgICAgIFtbe2E6IDJ9LCB7YjogMX1dLCB7YTogMn0sIHtiOiAxfV0sXG4gICAgICAgICAgICBbW3thOiAyfSwge19fcmVtb3ZlX186ICdhJ31dLCB7fSwge31dLFxuICAgICAgICAgICAgW1t7YTogMn0sIHtfX3JlbW92ZV9fOiBbJ2EnXX1dLCB7fSwge31dLFxuICAgICAgICAgICAgW1t7YTogWzJdfSwge2E6IHtfX3ByZXBlbmRfXzogMX19XSwge2E6IFsxLCAyXX0sIHt9XSxcbiAgICAgICAgICAgIFtbe2E6IFsyXX0sIHthOiB7X19yZW1vdmVfXzogMX19XSwge2E6IFsyXX0sIHt9XSxcbiAgICAgICAgICAgIFtbe2E6IFsyLCAxXX0sIHthOiB7X19yZW1vdmVfXzogMX19XSwge2E6IFsyXX0sIHt9XSxcbiAgICAgICAgICAgIFtbe2E6IFsyLCAxXX0sIHthOiB7X19yZW1vdmVfXzogWzEsIDJdfX1dLCB7YTogW119LCB7fV0sXG4gICAgICAgICAgICBbW3thOiBbMV19LCB7YToge19fcmVtb3ZlX186IDF9fV0sIHthOiBbXX0sIHt9XSxcbiAgICAgICAgICAgIFtbe2E6IFsxXX0sIHthOiB7X19yZW1vdmVfXzogWzEsIDJdfX1dLCB7YTogW119LCB7fV0sXG4gICAgICAgICAgICBbW3thOiBbMl19LCB7YToge19fYXBwZW5kX186IDF9fV0sIHthOiBbMiwgMV19LCB7fV0sXG4gICAgICAgICAgICBbW3thOiBbMl19LCB7YToge19fYXBwZW5kX186IFsxLCAyXX19XSwge2E6IFsyLCAxLCAyXX0sIHt9XSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbe2E6IFsyXX0sIHthOiB7X19hcHBlbmRfXzogWzEsIDJdfSwgYjogMX1dLFxuICAgICAgICAgICAgICAgIHthOiBbMiwgMSwgMl19LCB7YjogMX1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3thOiBbMl19LCB7YToge2FkZDogWzEsIDJdfSwgYjogMX0sICdybScsICd1bnNoaWZ0JywgJ2FkZCddLFxuICAgICAgICAgICAgICAgIHthOiBbMiwgMSwgMl19LCB7YjogMX1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3thOiBbMl19LCB7YToge19fcHJlcGVuZF9fOiAxfX0sICdfcicsICdfcCddLFxuICAgICAgICAgICAgICAgIHthOiBbMl19LCB7YToge19fcHJlcGVuZF9fOiAxfX1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbW3thOiBbMl19LCB7YToge19fcHJlcGVuZF9fOiBbMSwgM119fV0sIHthOiBbMSwgMywgMl19LCB7fV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3thOiBbMl19LCB7YToge19fYXBwZW5kX186IFsxLCAyXSwgX19wcmVwZW5kX186ICdzJ319XSxcbiAgICAgICAgICAgICAgICB7YTogWydzJywgMiwgMSwgMl19LCB7fVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbe2E6IFsyLCAyXX0sIHthOiB7X19wcmVwZW5kX186ICdzJywgX19yZW1vdmVfXzogMn19XSxcbiAgICAgICAgICAgICAgICB7YTogWydzJywgMl19LCB7fVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbe2E6IFsyLCAyXX0sIHthOiB7X19wcmVwZW5kX186ICdzJywgX19yZW1vdmVfXzogWzIsIDJdfX1dLFxuICAgICAgICAgICAgICAgIHthOiBbJ3MnXX0sIHt9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1tcbiAgICAgICAgICAgICAgICB7YTogWzIsIDEsIDJdfSxcbiAgICAgICAgICAgICAgICB7YToge19fcHJlcGVuZF9fOiAncycsIF9fcmVtb3ZlX186IFsyLCAyXSwgX19hcHBlbmRfXzogJ2EnfX1cbiAgICAgICAgICAgIF0sIHthOiBbJ3MnLCAxLCAnYSddfSwge31dXG4gICAgICAgIF0pIHtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5tb2RpZnlPYmplY3QoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHRlc3RbMF1bMV0sIHRlc3RbMl0pXG4gICAgICAgIH1cbiAgICB9KVxuICAgIFFVbml0LnRlc3QoJ3JlcHJlc2VudE9iamVjdCcsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgY29uc3QgZXJyb3I6RXJyb3IgPSBuZXcgRXJyb3IoJ0EnKVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbe30sICd7fSddLFxuICAgICAgICAgICAgW25ldyBTZXQoKSwgJ0VtcHR5U2V0J10sXG4gICAgICAgICAgICBbbmV3IE1hcCgpLCAnRW1wdHlNYXAnXSxcbiAgICAgICAgICAgIFs1LCAnNSddLFxuICAgICAgICAgICAgWydhJywgJ1wiYVwiJ10sXG4gICAgICAgICAgICBbW10sICdbXSddLFxuICAgICAgICAgICAgW3thOiAyLCBiOiAzfSwgJ3tcXG4gYTogMixcXG4gYjogM1xcbn0nXSxcbiAgICAgICAgICAgIFtuZXcgTWFwKFtbJzMnLCAyXSwgWzIsIDNdXSksICdcIjNcIiAtPiAyLFxcbiAyIC0+IDMnXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJzMnLCAyXSwgWzIsIG5ldyBNYXAoW1szLCAzXSwgWzIsIDJdXSldXSksXG4gICAgICAgICAgICAgICAgJ1wiM1wiIC0+IDIsXFxuIDIgLT4gMyAtPiAzLFxcbiAgMiAtPiAyJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtuZXcgU2V0KFsnMycsIDIsIDIsIDNdKSwgJ3tcXG4gXCIzXCIsXFxuIDIsXFxuIDNcXG59J10sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgbmV3IFNldChbJzMnLCAyLCBuZXcgU2V0KFszLCAyXSldKSxcbiAgICAgICAgICAgICAgICAne1xcbiBcIjNcIixcXG4gMixcXG4ge1xcbiAgMyxcXG4gIDJcXG4gfVxcbn0nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHthOiBudWxsLCBiOiAzLCBjOiAnYScsIGQ6IHRydWV9LFxuICAgICAgICAgICAgICAgICd7XFxuIGE6IG51bGwsXFxuIGI6IDMsXFxuIGM6IFwiYVwiLFxcbiBkOiB0cnVlXFxufSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge2E6IHthOiBudWxsLCBiOiAzLCBjOiAnYScsIGQ6IHRydWV9fSxcbiAgICAgICAgICAgICAgICAne1xcbiBhOiB7XFxuICBhOiBudWxsLFxcbiAgYjogMyxcXG4gIGM6IFwiYVwiLFxcbiAgZDogdHJ1ZVxcbiB9XFxufSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge2E6IHthOiBudWxsLCBiOiAzLCBjOiAnYScsIGQ6IHt9fX0sXG4gICAgICAgICAgICAgICAgJ3tcXG4gYToge1xcbiAgYTogbnVsbCxcXG4gIGI6IDMsXFxuICBjOiBcImFcIixcXG4gIGQ6IHt9XFxuIH1cXG59J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICB7YToge2E6IHthOiBudWxsLCBiOiB7fX19fSxcbiAgICAgICAgICAgICAgICAne1xcbiBhOiB7XFxuICBhOiB7XFxuICAgYTogbnVsbCxcXG4gICBiOiB7fVxcbiAgfVxcbiB9XFxufSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge2E6IHthOiBlcnJvcn19LFxuICAgICAgICAgICAgICAgICd7XFxuIGE6IHtcXG4gIGE6IHtcXG4gICBtZXNzYWdlOiBcIkFcIixcXG4gICBzdGFjazogXCInICtcbiAgICAgICAgICAgICAgICBgJHtlcnJvci5zdGFjay5yZXBsYWNlKC9cXG4vZywgJ1xcbiAgICcpfVwiXFxuICB9XFxuIH1cXG59YFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbe2E6IDJ9XSwgJ1tcXG4ge1xcbiAgYTogMlxcbiB9XFxuXSddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5yZXByZXNlbnRPYmplY3QodGVzdFswXSwgJyAnKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc29ydCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tdLCBbXV0sXG4gICAgICAgICAgICBbe30sIFtdXSxcbiAgICAgICAgICAgIFtbMV0sIFswXV0sXG4gICAgICAgICAgICBbWzEsIDIsIDNdLCBbMCwgMSwgMl1dLFxuICAgICAgICAgICAgW1szLCAyLCAxXSwgWzAsIDEsIDJdXSxcbiAgICAgICAgICAgIFtbMiwgMywgMV0sIFswLCAxLCAyXV0sXG4gICAgICAgICAgICBbeycxJzogMiwgJzInOiA1LCAnMyc6ICdhJ30sIFsnMScsICcyJywgJzMnXV0sXG4gICAgICAgICAgICBbeycyJzogMiwgJzEnOiA1LCAnLTUnOiAnYSd9LCBbJy01JywgJzEnLCAnMiddXSxcbiAgICAgICAgICAgIFt7JzMnOiAyLCAnMic6IDUsICcxJzogJ2EnfSwgWycxJywgJzInLCAnMyddXSxcbiAgICAgICAgICAgIFt7YTogMiwgYjogNSwgYzogJ2EnfSwgWydhJywgJ2InLCAnYyddXSxcbiAgICAgICAgICAgIFt7YzogMiwgYjogNSwgYTogJ2EnfSwgWydhJywgJ2InLCAnYyddXSxcbiAgICAgICAgICAgIFt7YjogMiwgYzogNSwgejogJ2EnfSwgWydiJywgJ2MnLCAneiddXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLnNvcnQodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHVud3JhcFByb3h5ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbe30sIHt9XSxcbiAgICAgICAgICAgIFt7YTogJ2EnfSwge2E6ICdhJ31dLFxuICAgICAgICAgICAgW3thOiAnYWEnfSwge2E6ICdhYSd9XSxcbiAgICAgICAgICAgIFt7YToge19fdGFyZ2V0X186IDIsIF9fcmV2b2tlX186ICgpOnZvaWQgPT4ge319fSwge2E6IDJ9XVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLnVud3JhcFByb3h5KHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgLy8gLy8gZW5kcmVnaW9uXG4gICAgLy8gLy8gcmVnaW9uIGFycmF5XG4gICAgdGhpcy50ZXN0KGBhcnJheU1lcmdlICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbW10sIFtdLCBbXV0sXG4gICAgICAgICAgICBbWzFdLCBbXSwgWzFdXSxcbiAgICAgICAgICAgIFtbXSwgWzFdLCBbMV1dLFxuICAgICAgICAgICAgW1sxXSwgWzFdLCBbMSwgMV1dLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCAxXSwgWzEsIDIsIDNdLCBbMSwgMiwgMywgMSwgMSwgMiwgM11dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuYXJyYXlNZXJnZSh0ZXN0WzBdLCB0ZXN0WzFdKSwgdGVzdFsyXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgYXJyYXlNYWtlICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbW10sIFtdXSxcbiAgICAgICAgICAgIFtbMSwgMiwgM10sIFsxLCAyLCAzXV0sXG4gICAgICAgICAgICBbMSwgWzFdXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmFycmF5TWFrZSh0ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgYXJyYXlVbmlxdWUgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbMSwgMiwgMywgMV0sIFsxLCAyLCAzXV0sXG4gICAgICAgICAgICBbWzEsIDIsIDMsIDEsIDIsIDNdLCBbMSwgMiwgM11dLFxuICAgICAgICAgICAgW1tdLCBbXV0sXG4gICAgICAgICAgICBbWzEsIDIsIDNdLCBbMSwgMiwgM11dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYXJyYXlVbmlxdWUodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGFycmF5QWdncmVnYXRlUHJvcGVydHlJZkVxdWFsICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tbe2E6ICdiJ31dLCAnYSddLCAnYiddLFxuICAgICAgICAgICAgW1tbe2E6ICdiJ30sIHthOiAnYid9XSwgJ2EnXSwgJ2InXSxcbiAgICAgICAgICAgIFtbW3thOiAnYid9LCB7YTogJ2MnfV0sICdhJ10sICcnXSxcbiAgICAgICAgICAgIFtbW3thOiAnYid9LCB7YTogJ2MnfV0sICdhJywgZmFsc2VdLCBmYWxzZV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkLlRvb2xzLmNsYXNzLmFycmF5QWdncmVnYXRlUHJvcGVydHlJZkVxdWFsKFxuICAgICAgICAgICAgICAgIC4uLnRlc3RbMF1cbiAgICAgICAgICAgICksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGFycmF5RGVsZXRlRW1wdHlJdGVtcyAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tbe2E6IG51bGx9XV0sIFtdXSxcbiAgICAgICAgICAgIFtbW3thOiBudWxsLCBiOiAyfV1dLCBbe2E6IG51bGwsIGI6IDJ9XV0sXG4gICAgICAgICAgICBbW1t7YTogbnVsbCwgYjogMn1dLCBbJ2EnXV0sIFtdXSxcbiAgICAgICAgICAgIFtbW10sIFsnYSddXSwgW11dLFxuICAgICAgICAgICAgW1tbXV0sIFtdXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmFycmF5RGVsZXRlRW1wdHlJdGVtcyguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgYXJyYXlFeHRyYWN0ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbW1t7YTogJ2InLCBjOiAnZCd9XSwgWydhJ11dLCBbe2E6ICdiJ31dXSxcbiAgICAgICAgICAgIFtbW3thOiAnYicsIGM6ICdkJ31dLCBbJ2InXV0sIFt7fV1dLFxuICAgICAgICAgICAgW1tbe2E6ICdiJywgYzogJ2QnfV0sIFsnYyddXSwgW3tjOiAnZCd9XV0sXG4gICAgICAgICAgICBbW1t7YTogJ2InLCBjOiAnZCd9LCB7YTogM31dLCBbJ2MnXV0sIFt7YzogJ2QnfSwge31dXSxcbiAgICAgICAgICAgIFtbW3thOiAnYicsIGM6ICdkJ30sIHtjOiAzfV0sIFsnYyddXSwgW3tjOiAnZCd9LCB7YzogM31dXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmFycmF5RXh0cmFjdCguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgYXJyYXlFeHRyYWN0SWZNYXRjaGVzICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbWydiJ10sIC9iLywgWydiJ11dLFxuICAgICAgICAgICAgW1snYiddLCAnYicsIFsnYiddXSxcbiAgICAgICAgICAgIFtbJ2InXSwgJ2EnLCBbXV0sXG4gICAgICAgICAgICBbW10sICdhJywgW11dLFxuICAgICAgICAgICAgW1snYScsICdiJ10sICcnLCBbJ2EnLCAnYiddXSxcbiAgICAgICAgICAgIFtbJ2EnLCAnYiddLCAnXiQnLCBbXV0sXG4gICAgICAgICAgICBbWydhJywgJ2InXSwgJ2InLCBbJ2InXV0sXG4gICAgICAgICAgICBbWydhJywgJ2InXSwgJ1thYl0nLCBbJ2EnLCAnYiddXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmFycmF5RXh0cmFjdElmTWF0Y2hlcyhcbiAgICAgICAgICAgICAgICB0ZXN0WzBdLCB0ZXN0WzFdXG4gICAgICAgICAgICApLCB0ZXN0WzJdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBhcnJheUV4dHJhY3RJZlByb3BlcnR5RXhpc3RzICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1t7YTogMn1dLCAnYScsIFt7YTogMn1dXSxcbiAgICAgICAgICAgIFtbe2E6IDJ9XSwgJ2InLCBbXV0sXG4gICAgICAgICAgICBbW10sICdiJywgW11dLFxuICAgICAgICAgICAgW1t7YTogMn0sIHtiOiAzfV0sICdhJywgW3thOiAyfV1dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYXJyYXlFeHRyYWN0SWZQcm9wZXJ0eUV4aXN0cyhcbiAgICAgICAgICAgICAgICB0ZXN0WzBdLCB0ZXN0WzFdXG4gICAgICAgICAgICApLCB0ZXN0WzJdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBhcnJheUV4dHJhY3RJZlByb3BlcnR5TWF0Y2hlcyAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbe2E6ICdiJ31dLCB7YTogJ2InfSwgW3thOiAnYid9XV0sXG4gICAgICAgICAgICBbW3thOiAnYid9XSwge2E6ICcuJ30sIFt7YTogJ2InfV1dLFxuICAgICAgICAgICAgW1t7YTogJ2InfV0sIHthOiAnYSd9LCBbXV0sXG4gICAgICAgICAgICBbW10sIHthOiAnYSd9LCBbXV0sXG4gICAgICAgICAgICBbW3thOiAyfV0sIHtiOiAvYS99LCBbXV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3ttaW1lVHlwZTogJ3RleHQveC13ZWJtJ31dLFxuICAgICAgICAgICAgICAgIHttaW1lVHlwZTogbmV3IFJlZ0V4cCgnXnRleHQveC13ZWJtJCcpfSxcbiAgICAgICAgICAgICAgICBbe21pbWVUeXBlOiAndGV4dC94LXdlYm0nfV1cbiAgICAgICAgICAgIF1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5hcnJheUV4dHJhY3RJZlByb3BlcnR5TWF0Y2hlcyhcbiAgICAgICAgICAgICAgICB0ZXN0WzBdLCB0ZXN0WzFdXG4gICAgICAgICAgICApLCB0ZXN0WzJdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBhcnJheUludGVyc2VjdCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tbJ0EnXSwgWydBJ11dLCBbJ0EnXV0sXG4gICAgICAgICAgICBbW1snQScsICdCJ10sIFsnQSddXSwgWydBJ11dLFxuICAgICAgICAgICAgW1tbXSwgW11dLCBbXV0sXG4gICAgICAgICAgICBbW1s1XSwgW11dLCBbXV0sXG4gICAgICAgICAgICBbW1t7YTogMn1dLCBbe2E6IDJ9XV0sIFt7YTogMn1dXSxcbiAgICAgICAgICAgIFtbW3thOiAzfV0sIFt7YTogMn1dXSwgW11dLFxuICAgICAgICAgICAgW1tbe2E6IDN9XSwgW3tiOiAzfV1dLCBbXV0sXG4gICAgICAgICAgICBbW1t7YTogM31dLCBbe2I6IDN9XSwgWydiJ11dLCBbXV0sXG4gICAgICAgICAgICBbW1t7YTogM31dLCBbe2I6IDN9XSwgWydiJ10sIGZhbHNlXSwgW11dLFxuICAgICAgICAgICAgW1tbe2I6IG51bGx9XSwgW3tiOiBudWxsfV0sIFsnYiddXSwgW3tiOiBudWxsfV1dLFxuICAgICAgICAgICAgW1tbe2I6IG51bGx9XSwgW3tiOiB1bmRlZmluZWR9XSwgWydiJ11dLCBbXV0sXG4gICAgICAgICAgICBbW1t7YjogbnVsbH1dLCBbe2I6IHVuZGVmaW5lZH1dLCBbJ2InXSwgZmFsc2VdLCBbe2I6IG51bGx9XV0sXG4gICAgICAgICAgICBbW1t7YjogbnVsbH1dLCBbe31dLCBbJ2InXSwgZmFsc2VdLCBbe2I6IG51bGx9XV0sXG4gICAgICAgICAgICBbW1t7YjogdW5kZWZpbmVkfV0sIFt7fV0sIFsnYiddLCBmYWxzZV0sIFt7YjogdW5kZWZpbmVkfV1dLFxuICAgICAgICAgICAgW1tbe31dLCBbe31dLCBbJ2InXSwgZmFsc2VdLCBbe31dXSxcbiAgICAgICAgICAgIFtbW3tiOiBudWxsfV0sIFt7fV0sIFsnYiddXSwgW11dLFxuICAgICAgICAgICAgW1tbe2I6IHVuZGVmaW5lZH1dLCBbe31dLCBbJ2InXSwgdHJ1ZV0sIFt7YjogdW5kZWZpbmVkfV1dLFxuICAgICAgICAgICAgW1tbe2I6IDF9XSwgW3thOiAxfV0sIHtiOiAnYSd9LCB0cnVlXSwgW3tiOiAxfV1dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYXJyYXlJbnRlcnNlY3QoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGFycmF5TWFrZVJhbmdlICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbW1swXV0sIFswXV0sXG4gICAgICAgICAgICBbW1s1XV0sIFswLCAxLCAyLCAzLCA0LCA1XV0sXG4gICAgICAgICAgICBbW1tdXSwgW11dLFxuICAgICAgICAgICAgW1tbMiwgNV1dLCBbMiwgMywgNCwgNV1dLFxuICAgICAgICAgICAgW1tbMiwgMTBdLCAyXSwgWzIsIDQsIDYsIDgsIDEwXV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5hcnJheU1ha2VSYW5nZSguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgYXJyYXlTdW1VcFByb3BlcnR5ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbW1t7YTogMn0sIHthOiAzfV0sICdhJ10sIDVdLFxuICAgICAgICAgICAgW1tbe2E6IDJ9LCB7YjogM31dLCAnYSddLCAyXSxcbiAgICAgICAgICAgIFtbW3thOiAyfSwge2I6IDN9XSwgJ2MnXSwgMF1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmFycmF5U3VtVXBQcm9wZXJ0eSguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgYXJyYXlBcHBlbmRBZGQgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IHRlc3RPYmplY3Q6T2JqZWN0ID0ge31cbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1t7fSwge30sICdiJ10sIHtiOiBbe31dfV0sXG4gICAgICAgICAgICBbW3Rlc3RPYmplY3QsIHthOiAzfSwgJ2InXSwge2I6IFt7YTogM31dfV0sXG4gICAgICAgICAgICBbW3Rlc3RPYmplY3QsIHthOiAzfSwgJ2InXSwge2I6IFt7YTogM30sIHthOiAzfV19XSxcbiAgICAgICAgICAgIFtbe2I6IFsyXX0sIDIsICdiJywgZmFsc2VdLCB7YjogWzIsIDJdfV0sXG4gICAgICAgICAgICBbW3tiOiBbMl19LCAyLCAnYiddLCB7YjogWzJdfV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5hcnJheUFwcGVuZEFkZCguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgYXJyYXlSZW1vdmUgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbW10sIDJdLCBbXV0sXG4gICAgICAgICAgICBbW1syXSwgMl0sIFtdXSxcbiAgICAgICAgICAgIFtbWzJdLCAyLCB0cnVlXSwgW11dLFxuICAgICAgICAgICAgW1tbMSwgMl0sIDJdLCBbMV1dLFxuICAgICAgICAgICAgW1tbMSwgMl0sIDIsIHRydWVdLCBbMV1dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYXJyYXlSZW1vdmUoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgICAgIGFzc2VydC50aHJvd3MoKCk6P0FycmF5PGFueT4gPT4gJC5Ub29scy5jbGFzcy5hcnJheVJlbW92ZShcbiAgICAgICAgICAgIFtdLCAyLCB0cnVlXG4gICAgICAgICksIG5ldyBFcnJvcihgR2l2ZW4gdGFyZ2V0IGRvZXNuJ3QgZXhpc3RzIGluIGdpdmVuIGxpc3QuYCkpXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGFycmF5U29ydFRvcG9sb2dpY2FsICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbe30sIFtdXSxcbiAgICAgICAgICAgIFt7YTogW119LCBbJ2EnXV0sXG4gICAgICAgICAgICBbe2E6ICdiJ30sIFsnYicsICdhJ11dLFxuICAgICAgICAgICAgW3thOiBbXSwgYjogJ2EnfSwgWydhJywgJ2InXV0sXG4gICAgICAgICAgICBbe2E6IFtdLCBiOiBbJ2EnXX0sIFsnYScsICdiJ11dLFxuICAgICAgICAgICAgW3thOiBbJ2InXSwgYjogW119LCBbJ2InLCAnYSddXSxcbiAgICAgICAgICAgIFt7YzogJ2InLCBhOiBbXSwgYjogWydhJ119LCBbJ2EnLCAnYicsICdjJ11dLFxuICAgICAgICAgICAgW3tiOiBbJ2EnXSwgYTogW10sIGM6IFsnYScsICdiJ119LCBbJ2EnLCAnYicsICdjJ11dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuYXJyYXlTb3J0VG9wb2xvZ2ljYWwodGVzdFswXSksIHRlc3RbMV0pXG4gICAgICAgIGZvciAoY29uc3QgdGVzdDphbnkgb2YgW1xuICAgICAgICAgICAge2E6ICdhJ30sXG4gICAgICAgICAgICB7YTogJ2InLCBiOiAnYSd9LFxuICAgICAgICAgICAge2E6ICdiJywgYjogJ2MnLCBjOiAnYSd9XG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpOnZvaWQgPT4gJC5Ub29scy5jbGFzcy5hcnJheVNvcnRUb3BvbG9naWNhbCh0ZXN0KSlcbiAgICB9KVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBzdHJpbmdcbiAgICB0aGlzLnRlc3QoJ3N0cmluZ0VzY2FwZVJlZ3VsYXJFeHByZXNzaW9ucycsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbJyddLCAnJ10sXG4gICAgICAgICAgICBbW2B0aGF0J3Mgbm8gcmVnZXg6IC4qJGBdLCBgdGhhdCdzIG5vIHJlZ2V4OiBcXFxcLlxcXFwqXFxcXCRgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJy1cXFxcW10oKV4kKisufS0nLCAnfSddLFxuICAgICAgICAgICAgICAgICdcXFxcLVxcXFxcXFxcW1xcXFxdXFxcXChcXFxcKVxcXFxeXFxcXCRcXFxcKlxcXFwrXFxcXC59XFxcXC0nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1tcbiAgICAgICAgICAgICAgICAnLVxcXFxbXSgpXiQqKy57fS0nLFxuICAgICAgICAgICAgICAgIFsnWycsICddJywgJygnLCAnKScsICdeJywgJyQnLCAnKicsICcrJywgJy4nLCAneyddXG4gICAgICAgICAgICBdLCAnXFxcXC1cXFxcW10oKV4kKisue1xcXFx9XFxcXC0nXSxcbiAgICAgICAgICAgIFtbJy0nLCAnXFxcXCddLCAnXFxcXC0nXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nRXNjYXBlUmVndWxhckV4cHJlc3Npb25zKC4uLnRlc3RbMF0pLFxuICAgICAgICAgICAgICAgIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoJ3N0cmluZ0NvbnZlcnRUb1ZhbGlkVmFyaWFibGVOYW1lJywgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8c3RyaW5nPiBvZiBbXG4gICAgICAgICAgICBbJycsICcnXSxcbiAgICAgICAgICAgIFsnYScsICdhJ10sXG4gICAgICAgICAgICBbJ19hJywgJ19hJ10sXG4gICAgICAgICAgICBbJ19hX2EnLCAnX2FfYSddLFxuICAgICAgICAgICAgWydfYS1hJywgJ19hQSddLFxuICAgICAgICAgICAgWyctYS1hJywgJ2FBJ10sXG4gICAgICAgICAgICBbJy1hLS1hJywgJ2FBJ10sXG4gICAgICAgICAgICBbJy0tYS0tYScsICdhQSddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5zdHJpbmdDb252ZXJ0VG9WYWxpZFZhcmlhYmxlTmFtZShcbiAgICAgICAgICAgICAgICAgICAgdGVzdFswXVxuICAgICAgICAgICAgICAgICksIHRlc3RbMV0pXG4gICAgfSlcbiAgICAvLyAvLy8gcmVnaW9uIHVybCBoYW5kbGluZ1xuICAgIHRoaXMudGVzdChgc3RyaW5nRW5jb2RlVVJJQ29tcG9uZW50ICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1snJ10sICcnXSxcbiAgICAgICAgICAgIFtbJyAnXSwgJysnXSxcbiAgICAgICAgICAgIFtbJyAnLCB0cnVlXSwgJyUyMCddLFxuICAgICAgICAgICAgW1snQDokLCAnXSwgJ0A6JCwrJ10sXG4gICAgICAgICAgICBbWycrJ10sICclMkInXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nRW5jb2RlVVJJQ29tcG9uZW50KC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdBZGRTZXBhcmF0b3JUb1BhdGggKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbWycnXSwgJyddLFxuICAgICAgICAgICAgW1snLyddLCAnLyddLFxuICAgICAgICAgICAgW1snL2EnXSwgJy9hLyddLFxuICAgICAgICAgICAgW1snL2EvYmIvJ10sICcvYS9iYi8nXSxcbiAgICAgICAgICAgIFtbJy9hL2JiJ10sICcvYS9iYi8nXSxcbiAgICAgICAgICAgIFtbJy9hL2JiJywgJ3wnXSwgJy9hL2JifCddLFxuICAgICAgICAgICAgW1snL2EvYmIvJywgJ3wnXSwgJy9hL2JiL3wnXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nQWRkU2VwYXJhdG9yVG9QYXRoKC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdIYXNQYXRoUHJlZml4ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbJy9hZG1pbicsICcvYWRtaW4nXSxcbiAgICAgICAgICAgIFsndGVzdCcsICd0ZXN0J10sXG4gICAgICAgICAgICBbJycsICcnXSxcbiAgICAgICAgICAgIFsnYScsICdhL2InXSxcbiAgICAgICAgICAgIFsnYS8nLCAnYS9iJ10sXG4gICAgICAgICAgICBbJy9hZG1pbicsICcvYWRtaW4jdGVzdCcsICcjJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLnN0cmluZ0hhc1BhdGhQcmVmaXgoLi4udGVzdCkpXG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFsnYicsICdhL2InXSxcbiAgICAgICAgICAgIFsnYi8nLCAnYS9iJ10sXG4gICAgICAgICAgICBbJy9hZG1pbi8nLCAnL2FkbWluL3Rlc3QnLCAnIyddLFxuICAgICAgICAgICAgWycvYWRtaW4nLCAnL2FkbWluL3Rlc3QnLCAnIyddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQubm90T2soJC5Ub29scy5jbGFzcy5zdHJpbmdIYXNQYXRoUHJlZml4KC4uLnRlc3QpKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdHZXREb21haW5OYW1lICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWydodHRwczovL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJ10sXG4gICAgICAgICAgICAgICAgJ3d3dy50ZXN0LmRlJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbJ2EnLCB0cnVlXSwgdHJ1ZV0sXG4gICAgICAgICAgICBbWydodHRwOi8vd3d3LnRlc3QuZGUnXSwgJ3d3dy50ZXN0LmRlJ10sXG4gICAgICAgICAgICBbWydodHRwOi8vYS5kZSddLCAnYS5kZSddLFxuICAgICAgICAgICAgW1snaHR0cDovL2xvY2FsaG9zdCddLCAnbG9jYWxob3N0J10sXG4gICAgICAgICAgICBbWydsb2NhbGhvc3QnLCAnYSddLCAnYSddLFxuICAgICAgICAgICAgW1snYScsICQuZ2xvYmFsLmxvY2F0aW9uLmhvc3RuYW1lXSwgJC5nbG9iYWwubG9jYXRpb24uaG9zdG5hbWVdLFxuICAgICAgICAgICAgW1snLy9hJ10sICdhJ10sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnYS9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCcsXG4gICAgICAgICAgICAgICAgICAgICQuZ2xvYmFsLmxvY2F0aW9uLmhvc3RuYW1lXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAkLmdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICcvYS9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCcsXG4gICAgICAgICAgICAgICAgICAgICQuZ2xvYmFsLmxvY2F0aW9uLmhvc3RuYW1lXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAkLmdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJy8vYWx0ZXJuYXRlLmxvY2FsL2Evc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnXSxcbiAgICAgICAgICAgICAgICAnYWx0ZXJuYXRlLmxvY2FsJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbJy8vYWx0ZXJuYXRlLmxvY2FsLyddLCAnYWx0ZXJuYXRlLmxvY2FsJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0dldERvbWFpbk5hbWUoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ0dldFBvcnROdW1iZXIgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbJ2h0dHBzOi8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnXSwgNDQzXSxcbiAgICAgICAgICAgIFtbJ2h0dHA6Ly93d3cudGVzdC5kZSddLCA4MF0sXG4gICAgICAgICAgICBbWydodHRwOi8vd3d3LnRlc3QuZGUnLCB0cnVlXSwgdHJ1ZV0sXG4gICAgICAgICAgICBbWyd3d3cudGVzdC5kZScsIHRydWVdLCB0cnVlXSxcbiAgICAgICAgICAgIFtbJ2EnLCB0cnVlXSwgdHJ1ZV0sXG4gICAgICAgICAgICBbWydhJywgdHJ1ZV0sIHRydWVdLFxuICAgICAgICAgICAgW1snYTo4MCddLCA4MF0sXG4gICAgICAgICAgICBbWydhOjIwJ10sIDIwXSxcbiAgICAgICAgICAgIFtbJ2E6NDQ0J10sIDQ0NF0sXG4gICAgICAgICAgICBbWydodHRwOi8vbG9jYWxob3N0Ojg5J10sIDg5XSxcbiAgICAgICAgICAgIFtbJ2h0dHBzOi8vbG9jYWxob3N0Ojg5J10sIDg5XVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nR2V0UG9ydE51bWJlciguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nR2V0UHJvdG9jb2xOYW1lICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWydodHRwczovL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJ10sXG4gICAgICAgICAgICAgICAgJ2h0dHBzJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbJ2h0dHA6Ly93d3cudGVzdC5kZSddLCAnaHR0cCddLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFsnLy93d3cudGVzdC5kZScsICQuZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgMCwgJC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2wubGVuZ3RoIC0gMSldLFxuICAgICAgICAgICAgICAgICQuZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgMCwgJC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2wubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbWydodHRwOi8vYS5kZSddLCAnaHR0cCddLFxuICAgICAgICAgICAgW1snZnRwOi8vbG9jYWxob3N0J10sICdmdHAnXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJ2EnLCAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgIDAsICQuZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sLmxlbmd0aCAtIDEpXSxcbiAgICAgICAgICAgICAgICAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgIDAsICQuZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJ2Evc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICAgICAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICAwLCAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgJC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2wuc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAwLCAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5sZW5ndGggLSAxKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbJy9hL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJywgJ2EnXSwgJ2EnXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJ2FsdGVybmF0ZS5sb2NhbC9hL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJywgJ2InXSxcbiAgICAgICAgICAgICAgICAnYidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbWydhbHRlcm5hdGUubG9jYWwvJywgJ2MnXSwgJ2MnXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICcnLCAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICAwLCAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgJC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2wuc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAwLCAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5sZW5ndGggLSAxKVxuICAgICAgICAgICAgXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nR2V0UHJvdG9jb2xOYW1lKC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdHZXRVUkxWYXJpYWJsZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgYXNzZXJ0Lm9rKEFycmF5LmlzQXJyYXkoJC5Ub29scy5jbGFzcy5zdHJpbmdHZXRVUkxWYXJpYWJsZSgpKSlcbiAgICAgICAgYXNzZXJ0Lm9rKEFycmF5LmlzQXJyYXkoJC5Ub29scy5jbGFzcy5zdHJpbmdHZXRVUkxWYXJpYWJsZShudWxsLCAnJicpKSlcbiAgICAgICAgYXNzZXJ0Lm9rKEFycmF5LmlzQXJyYXkoJC5Ub29scy5jbGFzcy5zdHJpbmdHZXRVUkxWYXJpYWJsZShudWxsLCAnIycpKSlcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1snbm90RXhpc3RpbmcnXSwgdW5kZWZpbmVkXSxcbiAgICAgICAgICAgIFtbJ25vdEV4aXN0aW5nJywgJyYnXSwgdW5kZWZpbmVkXSxcbiAgICAgICAgICAgIFtbJ25vdEV4aXN0aW5nJywgJyMnXSwgdW5kZWZpbmVkXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnP3Rlc3Q9MiddLCAnMiddLFxuICAgICAgICAgICAgW1sndGVzdCcsICd0ZXN0PTInXSwgJzInXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAndGVzdD0yJmE9MiddLCAnMiddLFxuICAgICAgICAgICAgW1sndGVzdCcsICdiPTMmdGVzdD0yJmE9MiddLCAnMiddLFxuICAgICAgICAgICAgW1sndGVzdCcsICc/Yj0zJnRlc3Q9MiZhPTInXSwgJzInXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnP2I9MyZ0ZXN0PTImYT0yJ10sICcyJ10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJyYnLCAnJCcsICchJywgJycsICcjJHRlc3Q9MiddLCAnMiddLFxuICAgICAgICAgICAgW1sndGVzdCcsICcmJywgJyQnLCAnIScsICc/dGVzdD00JywgJyMkdGVzdD0zJ10sICc0J10sXG4gICAgICAgICAgICBbWydhJywgJyYnLCAnJCcsICchJywgJz90ZXN0PTQnLCAnIyR0ZXN0PTMnXSwgdW5kZWZpbmVkXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnIycsICckJywgJyEnLCAnP3Rlc3Q9NCcsICcjJHRlc3Q9MyddLCAnMyddLFxuICAgICAgICAgICAgW1sndGVzdCcsICcjJywgJyQnLCAnIScsICcnLCAnIyF0ZXN0IyR0ZXN0PTQnXSwgJzQnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnIycsICckJywgJyEnLCAnJywgJyMhL3Rlc3QvYSMkdGVzdD00J10sICc0J10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJyMnLCAnJCcsICchJywgJycsICcjIS90ZXN0L2EvIyR0ZXN0PTQnXSwgJzQnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnIycsICckJywgJyEnLCAnJywgJyMhdGVzdC9hLyMkdGVzdD00J10sICc0J10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJyMnLCAnJCcsICchJywgJycsICcjIS8jJHRlc3Q9NCddLCAnNCddLFxuICAgICAgICAgICAgW1sndGVzdCcsICcjJywgJyQnLCAnIScsICcnLCAnIyF0ZXN0P3Rlc3Q9MyMkdGVzdD00J10sICc0J10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJyYnLCAnPycsICchJywgbnVsbCwgJyMhYT90ZXN0PTMnXSwgJzMnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnJicsICckJywgJyEnLCBudWxsLCAnIyF0ZXN0IyR0ZXN0PTQnXSwgJzQnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnJicsICckJywgJyEnLCBudWxsLCAnIyF0ZXN0P3Rlc3Q9MyMkdGVzdD00J10sICc0J11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0dldFVSTFZhcmlhYmxlKC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdJc0ludGVybmFsVVJMICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICdodHRwczovL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnLy93d3cudGVzdC5kZS9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCcsXG4gICAgICAgICAgICAgICAgJy8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIGAkeyQuZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sfS8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlYCArXG4gICAgICAgICAgICAgICAgICAgICc/cGFyYW09dmFsdWUjaGFzaCcsXG4gICAgICAgICAgICAgICAgYCR7JC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2x9Ly93d3cudGVzdC5kZS9zaXRlL3N1YlNpdGVgICtcbiAgICAgICAgICAgICAgICAgICAgYD9wYXJhbT12YWx1ZSNoYXNoYFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly93d3cudGVzdC5kZTo0NDMvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICdodHRwczovL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnLy93d3cudGVzdC5kZTo4MC9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCcsXG4gICAgICAgICAgICAgICAgJy8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgWyQuZ2xvYmFsLmxvY2F0aW9uLmhyZWYsICQuZ2xvYmFsLmxvY2F0aW9uLmhyZWZdLFxuICAgICAgICAgICAgWycxJywgJC5nbG9iYWwubG9jYXRpb24uaHJlZl0sXG4gICAgICAgICAgICBbJyMxJywgJC5nbG9iYWwubG9jYXRpb24uaHJlZl0sXG4gICAgICAgICAgICBbJy9hJywgJC5nbG9iYWwubG9jYXRpb24uaHJlZl1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLnN0cmluZ0lzSW50ZXJuYWxVUkwoLi4udGVzdCkpXG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBgJHskLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbH0vL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZWAgK1xuICAgICAgICAgICAgICAgICAgICAnP3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICdmdHA6Ly93d3cudGVzdC5kZS9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICd0ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBgJHskLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbH0vL3d3dy50ZXN0LmRlOmAgK1xuICAgICAgICAgICAgICAgIGAkeyQuZ2xvYmFsLmxvY2F0aW9uLnBvcnR9L3NpdGUvc3ViU2l0ZWAgK1xuICAgICAgICAgICAgICAgICc/cGFyYW09dmFsdWUjaGFzaC9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgYGh0dHA6Ly93d3cudGVzdC5kZTokeyQuZ2xvYmFsLmxvY2F0aW9uLnBvcnR9L3NpdGUvc3ViU2l0ZT9gICtcbiAgICAgICAgICAgICAgICAgICAgJ3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICdodHRwczovL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJ1xuICAgICAgICAgICAgXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKCQuVG9vbHMuY2xhc3Muc3RyaW5nSXNJbnRlcm5hbFVSTCguLi50ZXN0KSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nTm9ybWFsaXplVVJMICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbJ3d3dy50ZXN0LmNvbScsICdodHRwOi8vd3d3LnRlc3QuY29tJ10sXG4gICAgICAgICAgICBbJ3Rlc3QnLCAnaHR0cDovL3Rlc3QnXSxcbiAgICAgICAgICAgIFsnaHR0cDovL3Rlc3QnLCAnaHR0cDovL3Rlc3QnXSxcbiAgICAgICAgICAgIFsnaHR0cHM6Ly90ZXN0JywgJ2h0dHBzOi8vdGVzdCddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5zdHJpbmdOb3JtYWxpemVVUkwodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ1JlcHJlc2VudFVSTCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgWydodHRwOi8vd3d3LnRlc3QuY29tJywgJ3d3dy50ZXN0LmNvbSddLFxuICAgICAgICAgICAgWydmdHA6Ly93d3cudGVzdC5jb20nLCAnZnRwOi8vd3d3LnRlc3QuY29tJ10sXG4gICAgICAgICAgICBbJ2h0dHBzOi8vd3d3LnRlc3QuY29tJywgJ3d3dy50ZXN0LmNvbSddLFxuICAgICAgICAgICAgW3VuZGVmaW5lZCwgJyddLFxuICAgICAgICAgICAgW251bGwsICcnXSxcbiAgICAgICAgICAgIFtmYWxzZSwgJyddLFxuICAgICAgICAgICAgW3RydWUsICcnXSxcbiAgICAgICAgICAgIFsnJywgJyddLFxuICAgICAgICAgICAgWycgJywgJyddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5zdHJpbmdSZXByZXNlbnRVUkwodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICAvLyAvLy8gZW5kcmVnaW9uXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdDb21wcmVzc1N0eWxlVmFsdWUgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbJycsICcnXSxcbiAgICAgICAgICAgIFsnIGJvcmRlcjogMXB4ICBzb2xpZCByZWQ7JywgJ2JvcmRlcjoxcHggc29saWQgcmVkJ10sXG4gICAgICAgICAgICBbJ2JvcmRlciA6IDFweCBzb2xpZCByZWQgJywgJ2JvcmRlcjoxcHggc29saWQgcmVkJ10sXG4gICAgICAgICAgICBbJ2JvcmRlciA6IDFweCAgc29saWQgcmVkIDsnLCAnYm9yZGVyOjFweCBzb2xpZCByZWQnXSxcbiAgICAgICAgICAgIFsnYm9yZGVyIDogMXB4ICBzb2xpZCByZWQgICA7ICcsICdib3JkZXI6MXB4IHNvbGlkIHJlZCddLFxuICAgICAgICAgICAgWydoZWlnaHQ6IDFweCA7IHdpZHRoOjJweCA7ICcsICdoZWlnaHQ6MXB4O3dpZHRoOjJweCddLFxuICAgICAgICAgICAgWyc7O2hlaWdodDogMXB4IDsgd2lkdGg6MnB4IDsgOycsICdoZWlnaHQ6MXB4O3dpZHRoOjJweCddLFxuICAgICAgICAgICAgWycgOztoZWlnaHQ6IDFweCA7IHdpZHRoOjJweCA7IDsnLCAnaGVpZ2h0OjFweDt3aWR0aDoycHgnXSxcbiAgICAgICAgICAgIFsnO2hlaWdodDogMXB4IDsgd2lkdGg6MnB4IDsgJywgJ2hlaWdodDoxcHg7d2lkdGg6MnB4J11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0NvbXByZXNzU3R5bGVWYWx1ZSh0ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nQ2FtZWxDYXNlVG9EZWxpbWl0ZWQgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbWydoYW5zUGV0ZXInXSwgJ2hhbnMtcGV0ZXInXSxcbiAgICAgICAgICAgIFtbJ2hhbnNQZXRlcicsICd8J10sICdoYW5zfHBldGVyJ10sXG4gICAgICAgICAgICBbWycnXSwgJyddLFxuICAgICAgICAgICAgW1snaCddLCAnaCddLFxuICAgICAgICAgICAgW1snaFAnLCAnJ10sICdocCddLFxuICAgICAgICAgICAgW1snaGFuc1BldGVyJ10sICdoYW5zLXBldGVyJ10sXG4gICAgICAgICAgICBbWydoYW5zLXBldGVyJ10sICdoYW5zLXBldGVyJ10sXG4gICAgICAgICAgICBbWydoYW5zUGV0ZXInLCAnXyddLCAnaGFuc19wZXRlciddLFxuICAgICAgICAgICAgW1snaGFuc1BldGVyJywgJysnXSwgJ2hhbnMrcGV0ZXInXSxcbiAgICAgICAgICAgIFtbJ0hhbnMnXSwgJ2hhbnMnXSxcbiAgICAgICAgICAgIFtbJ2hhbnNBUElVUkwnLCAnLScsIFsnYXBpJywgJ3VybCddXSwgJ2hhbnMtYXBpLXVybCddLFxuICAgICAgICAgICAgW1snaGFuc1BldGVyJywgJy0nLCBbXV0sICdoYW5zLXBldGVyJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0NhbWVsQ2FzZVRvRGVsaW1pdGVkKC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdDYXBpdGFsaXplICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbJ2hhbnNQZXRlcicsICdIYW5zUGV0ZXInXSxcbiAgICAgICAgICAgIFsnJywgJyddLFxuICAgICAgICAgICAgWydhJywgJ0EnXSxcbiAgICAgICAgICAgIFsnQScsICdBJ10sXG4gICAgICAgICAgICBbJ0FBJywgJ0FBJ10sXG4gICAgICAgICAgICBbJ0FhJywgJ0FhJ10sXG4gICAgICAgICAgICBbJ2FhJywgJ0FhJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0NhcGl0YWxpemUodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ0RlbGltaXRlZFRvQ2FtZWxDYXNlICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1snaGFucy1wZXRlciddLCAnaGFuc1BldGVyJ10sXG4gICAgICAgICAgICBbWydoYW5zfHBldGVyJywgJ3wnXSwgJ2hhbnNQZXRlciddLFxuICAgICAgICAgICAgW1snJ10sICcnXSxcbiAgICAgICAgICAgIFtbJ2gnXSwgJ2gnXSxcbiAgICAgICAgICAgIFtbJ2hhbnMtcGV0ZXInXSwgJ2hhbnNQZXRlciddLFxuICAgICAgICAgICAgW1snaGFucy0tcGV0ZXInXSwgJ2hhbnMtUGV0ZXInXSxcbiAgICAgICAgICAgIFtbJ0hhbnMtUGV0ZXInXSwgJ0hhbnNQZXRlciddLFxuICAgICAgICAgICAgW1snLUhhbnMtUGV0ZXInXSwgJy1IYW5zUGV0ZXInXSxcbiAgICAgICAgICAgIFtbJy0nXSwgJy0nXSxcbiAgICAgICAgICAgIFtbJ2hhbnMtcGV0ZXInLCAnXyddLCAnaGFucy1wZXRlciddLFxuICAgICAgICAgICAgW1snaGFuc19wZXRlcicsICdfJ10sICdoYW5zUGV0ZXInXSxcbiAgICAgICAgICAgIFtbJ2hhbnNfaWQnLCAnXyddLCAnaGFuc0lEJ10sXG4gICAgICAgICAgICBbWyd1cmxfaGFuc19pZCcsICdfJywgWydoYW5zJ11dLCAndXJsSEFOU0lkJ10sXG4gICAgICAgICAgICBbWyd1cmxfaGFuc18xJywgJ18nXSwgJ3VybEhhbnMxJ10sXG4gICAgICAgICAgICBbWydoYW5zVXJsMScsICctJywgWyd1cmwnXSwgdHJ1ZV0sICdoYW5zVXJsMSddLFxuICAgICAgICAgICAgW1snaGFucy11cmwnLCAnLScsIFsndXJsJ10sIHRydWVdLCAnaGFuc1VSTCddLFxuICAgICAgICAgICAgW1snaGFucy1VcmwnLCAnLScsIFsndXJsJ10sIHRydWVdLCAnaGFuc1VybCddLFxuICAgICAgICAgICAgW1snaGFucy1VcmwnLCAnLScsIFsndXJsJ10sIGZhbHNlXSwgJ2hhbnNVUkwnXSxcbiAgICAgICAgICAgIFtbJ2hhbnMtVXJsJywgJy0nLCBbXSwgZmFsc2VdLCAnaGFuc1VybCddLFxuICAgICAgICAgICAgW1snaGFucy0tVXJsJywgJy0nLCBbXSwgZmFsc2UsIHRydWVdLCAnaGFuc1VybCddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5zdHJpbmdEZWxpbWl0ZWRUb0NhbWVsQ2FzZSguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nRm9ybWF0ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbWyd7MX0nLCAndGVzdCddLCAndGVzdCddLFxuICAgICAgICAgICAgW1snJywgJ3Rlc3QnXSwgJyddLFxuICAgICAgICAgICAgW1snezF9J10sICd7MX0nXSxcbiAgICAgICAgICAgIFtbJ3sxfSB0ZXN0IHsyfSAtIHsyfScsIDEsIDJdLCAnMSB0ZXN0IDIgLSAyJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0Zvcm1hdCguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nR2V0UmVndWxhckV4cHJlc3Npb25WYWxpZGF0ZWQgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbYHRoYXQncyBubyByZWdleDogLiokYCwgYHRoYXQncyBubyByZWdleDogXFxcXC5cXFxcKlxcXFwkYF0sXG4gICAgICAgICAgICBbJycsICcnXSxcbiAgICAgICAgICAgIFsnLVtdKCleJCorLn0tXFxcXCcsICdcXFxcLVxcXFxbXFxcXF1cXFxcKFxcXFwpXFxcXF5cXFxcJFxcXFwqXFxcXCtcXFxcLlxcXFx9XFxcXC1cXFxcXFxcXCddLFxuICAgICAgICAgICAgWyctJywgJ1xcXFwtJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0dldFJlZ3VsYXJFeHByZXNzaW9uVmFsaWRhdGVkKHRlc3RbMF0pLFxuICAgICAgICAgICAgICAgIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ0xvd2VyQ2FzZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgWydIYW5zUGV0ZXInLCAnaGFuc1BldGVyJ10sXG4gICAgICAgICAgICBbJycsICcnXSxcbiAgICAgICAgICAgIFsnQScsICdhJ10sXG4gICAgICAgICAgICBbJ2EnLCAnYSddLFxuICAgICAgICAgICAgWydhYScsICdhYSddLFxuICAgICAgICAgICAgWydBYScsICdhYSddLFxuICAgICAgICAgICAgWydhYScsICdhYSddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5zdHJpbmdMb3dlckNhc2UodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ0ZpbmROb3JtYWxpemVkTWF0Y2hSYW5nZSAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbJycsICcnXSwgbnVsbF0sXG4gICAgICAgICAgICBbWydoYW5zJywgJyddLCBudWxsXSxcbiAgICAgICAgICAgIFtbJ2hhbnMnLCAnYSddLCBbMSwgMl1dLFxuICAgICAgICAgICAgW1snaGFucycsICdhbiddLCBbMSwgM11dLFxuICAgICAgICAgICAgW1snaGFucycsICdoYW4nXSwgWzAsIDNdXSxcbiAgICAgICAgICAgIFtbJ2hhbnMnLCAnaGFucyddLCBbMCwgNF1dLFxuICAgICAgICAgICAgW1snaGFucycsICdhbnMnXSwgWzEsIDRdXSxcbiAgICAgICAgICAgIFtbJ2hhbnMgaGFucycsICdhbnMnXSwgWzEsIDRdXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJyBoQW5zICcsICdhbnMnLCAodmFsdWU6YW55KTpzdHJpbmcgPT4gdmFsdWUudG9Mb3dlckNhc2UoKV0sXG4gICAgICAgICAgICAgICAgWzIsIDVdXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFsnYSBzdHJhw59lIGInLCAnc3RyYXNzZScsICh2YWx1ZTphbnkpOnN0cmluZyA9PlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5yZXBsYWNlKC/Dny9nLCAnc3MnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbMiwgOF1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWydhIHN0cmFzc2UgYicsICdzdHJhc3NlJywgKHZhbHVlOmFueSk6c3RyaW5nID0+XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnJlcGxhY2UoL8OfL2csICdzcycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFsyLCA5XVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJ2Egc3RyYXNzZSBiJywgJ3N0cmHDn2UnLCAodmFsdWU6YW55KTpzdHJpbmcgPT5cbiAgICAgICAgICAgICAgICAgICAgdmFsdWUucmVwbGFjZSgvw58vZywgJ3NzJykudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgWzIsIDldXG4gICAgICAgICAgICBdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3Muc3RyaW5nRmluZE5vcm1hbGl6ZWRNYXRjaFJhbmdlKFxuICAgICAgICAgICAgICAgIC4uLnRlc3RbMF1cbiAgICAgICAgICAgICksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ01hcmsgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbJyddLCAnJ10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJ2UnXSwgJ3Q8c3BhbiBjbGFzcz1cInRvb2xzLW1hcmtcIj5lPC9zcGFuPnN0J10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJ2VzJ10sICd0PHNwYW4gY2xhc3M9XCJ0b29scy1tYXJrXCI+ZXM8L3NwYW4+dCddLFxuICAgICAgICAgICAgW1sndGVzdCcsICd0ZXN0J10sICc8c3BhbiBjbGFzcz1cInRvb2xzLW1hcmtcIj50ZXN0PC9zcGFuPiddLFxuICAgICAgICAgICAgW1sndGVzdCcsICcnXSwgJ3Rlc3QnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAndGVzdHMnXSwgJ3Rlc3QnXSxcbiAgICAgICAgICAgIFtbJycsICd0ZXN0J10sICcnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnZScsICc8YT57MX08L2E+J10sICd0PGE+ZTwvYT5zdCddLFxuICAgICAgICAgICAgW1sndGVzdCcsIFsnZSddLCAnPGE+ezF9PC9hPiddLCAndDxhPmU8L2E+c3QnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnRScsICc8YT57MX08L2E+J10sICd0PGE+ZTwvYT5zdCddLFxuICAgICAgICAgICAgW1sndGVzdCcsICdFJywgJzxhPnsxfTwvYT4nXSwgJ3Q8YT5lPC9hPnN0J10sXG4gICAgICAgICAgICBbWyd0ZXNUJywgJ3QnLCAnPGE+ezF9PC9hPiddLCAnPGE+dDwvYT5lczxhPlQ8L2E+J10sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWyd0ZXNUJywgJ3QnLCAnPGE+ezF9IC0gezF9PC9hPiddLFxuICAgICAgICAgICAgICAgICc8YT50IC0gdDwvYT5lczxhPlQgLSBUPC9hPidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWyd0ZXN0JywgJ0UnLCAnPGE+ezF9PC9hPicsICh2YWx1ZTphbnkpOnN0cmluZyA9PiBgJHt2YWx1ZX1gXSxcbiAgICAgICAgICAgICAgICAndGVzdCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWydhYmNkJywgWydhJywgJ2MnXV0sXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwidG9vbHMtbWFya1wiPmE8L3NwYW4+YicgK1xuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInRvb2xzLW1hcmtcIj5jPC9zcGFuPmQnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFsnYWFiY2QnLCBbJ2EnLCAnYyddXSxcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ0b29scy1tYXJrXCI+YTwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ0b29scy1tYXJrXCI+YTwvc3Bhbj5iJyArXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwidG9vbHMtbWFya1wiPmM8L3NwYW4+ZCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWydhY2JjZCcsIFsnYScsICdjJywgJ2QnXV0sXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwidG9vbHMtbWFya1wiPmE8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwidG9vbHMtbWFya1wiPmM8L3NwYW4+YicgK1xuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInRvb2xzLW1hcmtcIj5jPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInRvb2xzLW1hcmtcIj5kPC9zcGFuPidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWydhIEVCaWtlcyBNw7xuY2hlbicsIFsnZWJpa2VzJywgJ23DvG5jaGVuJ10sICc8YT57MX08L2E+JywgKFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTphbnlcbiAgICAgICAgICAgICAgICApOnN0cmluZyA9PiBgJHt2YWx1ZX1gLnRvTG93ZXJDYXNlKCldLFxuICAgICAgICAgICAgICAgICdhIDxhPkVCaWtlczwvYT4gPGE+TcO8bmNoZW48L2E+J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJ2EgRS1CaWtlcyBNw7xuY2hlbicsIFsnZWJpa2VzJywgJ23DvG5jaGVuJ10sICc8YT57MX08L2E+JywgKFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTphbnlcbiAgICAgICAgICAgICAgICApOnN0cmluZyA9PiBgJHt2YWx1ZX1gLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnLScsICcnKV0sXG4gICAgICAgICAgICAgICAgJ2EgPGE+RS1CaWtlczwvYT4gPGE+TcO8bmNoZW48L2E+J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJ2Egc3RyLiAyJywgWydzdHJhw59lJywgJzInXSwgJzxhPnsxfTwvYT4nLCAoXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOmFueVxuICAgICAgICAgICAgICAgICk6c3RyaW5nID0+IGAke3ZhbHVlfWAudG9Mb3dlckNhc2UoKS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgICAnc3RyLicsICdzdHJhc3NlJ1xuICAgICAgICAgICAgICAgICkucmVwbGFjZSgnw58nLCAnc3MnKV0sXG4gICAgICAgICAgICAgICAgJ2EgPGE+c3RyLjwvYT4gPGE+MjwvYT4nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJ0VHTyBNb3ZlbWVudCBTdG9yZSBFLUJpa2VzIE3DvG5jaGVuJyxcbiAgICAgICAgICAgICAgICAgICAgWydlQmlrZXMnLCAnTcO8bmNoZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgJzxhPnsxfTwvYT4nLCAodmFsdWU6YW55KTpzdHJpbmcgPT4gYCR7dmFsdWV9YC50b0xvd2VyQ2FzZShcbiAgICAgICAgICAgICAgICAgICAgKS5yZXBsYWNlKC9bLV9dKy9nLCAnJykucmVwbGFjZSgvw58vZywgJ3NzJykucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgICAgIC8oXnwgKXN0clxcLi9nLCAnJDFzdHJhc3NlJ1xuICAgICAgICAgICAgICAgICAgICApLnJlcGxhY2UoL1smIF0rL2csICcgJylcbiAgICAgICAgICAgICAgICBdLCAnRUdPIE1vdmVtZW50IFN0b3JlIDxhPkUtQmlrZXM8L2E+IDxhPk3DvG5jaGVuPC9hPidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnc3RyLkEgc3RyYXNzZSBCIHN0cmHDn2UgQyBzdHIuIEQnLCBbJ3N0ci4nXSxcbiAgICAgICAgICAgICAgICAgICAgJzxhPnsxfTwvYT4nLCAodmFsdWU6YW55KTpzdHJpbmcgPT4gYCR7dmFsdWV9YC50b0xvd2VyQ2FzZShcbiAgICAgICAgICAgICAgICAgICAgKS5yZXBsYWNlKC9bLV9dKy9nLCAnJykucmVwbGFjZSgvw58vZywgJ3NzJykucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgICAgIC8oXnwgKXN0clxcLi9nLCAnJDFzdHJhc3NlJ1xuICAgICAgICAgICAgICAgICAgICApLnJlcGxhY2UoL1smIF0rL2csICcgJylcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICc8YT5zdHIuPC9hPkEgPGE+c3RyYXNzZTwvYT4gQiA8YT5zdHJhw59lPC9hPiBDIDxhPnN0ci48L2E+IEQnXG4gICAgICAgICAgICBdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5zdHJpbmdNYXJrKC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdNRDUgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbJyddLCAnZDQxZDhjZDk4ZjAwYjIwNGU5ODAwOTk4ZWNmODQyN2UnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnXSwgJzA5OGY2YmNkNDYyMWQzNzNjYWRlNGU4MzI2MjdiNGY2J10sXG4gICAgICAgICAgICBbWyfDpCddLCAnODQxOWI3MWM4N2EyMjVhMmM3MGI1MDQ4NmZiZWU1NDUnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCB0cnVlXSwgJzA5OGY2YmNkNDYyMWQzNzNjYWRlNGU4MzI2MjdiNGY2J10sXG4gICAgICAgICAgICBbWyfDpCcsIHRydWVdLCAnYzE1YmNjNTU3N2Y5ZmFkZTRiNGEzMjU2MTkwYTU5YjAnXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3Muc3RyaW5nTUQ1KC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdOb3JtYWxpemVQaG9uZU51bWJlciAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFsnMCcsICcwJ10sXG4gICAgICAgICAgICBbMCwgJzAnXSxcbiAgICAgICAgICAgIFsnKzQ5IDE3MiAoMCkgLyAwMjEyIC0gMycsICcwMDQ5MTcyMDAyMTIzJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ05vcm1hbGl6ZVBob25lTnVtYmVyKHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgaWYgKFRBUkdFVF9URUNITk9MT0dZID09PSAnbm9kZScpXG4gICAgICAgIHRoaXMudGVzdCgnc3RyaW5nUGFyc2VFbmNvZGVkT2JqZWN0JywgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgICAgIFtbJyddLCBudWxsXSxcbiAgICAgICAgICAgICAgICBbWydudWxsJ10sIG51bGxdLFxuICAgICAgICAgICAgICAgIFtbJ3thOiB1bmRlZmluZWR9J10sIHthOiB1bmRlZmluZWR9XSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIFtuZXcgQnVmZmVyKCd7YTogdW5kZWZpbmVkfScpLnRvU3RyaW5nKCdiYXNlNjQnKV0sXG4gICAgICAgICAgICAgICAgICAgIHthOiB1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbWyd7YTogMn0nXSwge2E6IDJ9XSxcbiAgICAgICAgICAgICAgICBbW25ldyBCdWZmZXIoJ3thOiAxfScpLnRvU3RyaW5nKCdiYXNlNjQnKV0sIHthOiAxfV0sXG4gICAgICAgICAgICAgICAgW1snbnVsbCddLCBudWxsXSxcbiAgICAgICAgICAgICAgICBbW25ldyBCdWZmZXIoJ251bGwnKS50b1N0cmluZygnYmFzZTY0JyldLCBudWxsXSxcbiAgICAgICAgICAgICAgICBbWyd7fSddLCB7fV0sXG4gICAgICAgICAgICAgICAgW1tuZXcgQnVmZmVyKCd7fScpLnRvU3RyaW5nKCdiYXNlNjQnKV0sIHt9XSxcbiAgICAgICAgICAgICAgICBbWyd7YTogYX0nXSwgbnVsbF0sXG4gICAgICAgICAgICAgICAgW1tuZXcgQnVmZmVyKCd7YTogYX0nKS50b1N0cmluZygnYmFzZTY0JyldLCBudWxsXSxcbiAgICAgICAgICAgICAgICBbWyd7YTogc2NvcGUuYX0nLCB7YTogMn1dLCB7YTogMn1dLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgW25ldyBCdWZmZXIoJ3thOiBzY29wZS5hfScpLnRvU3RyaW5nKCdiYXNlNjQnKSwge2E6IDJ9XSxcbiAgICAgICAgICAgICAgICAgICAge2E6IDJ9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ1BhcnNlRW5jb2RlZE9iamVjdCguLi50ZXN0WzBdKSwgdGVzdFsxXVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ1JlcHJlc2VudFBob25lTnVtYmVyICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgWycwJywgJzAnXSxcbiAgICAgICAgICAgIFsnMDE3Mi0xMjMyMS0xJywgJys0OSAoMCkgMTcyIC8gMTIzIDIxLTEnXSxcbiAgICAgICAgICAgIFsnMDE3Mi0xMjMyMTEnLCAnKzQ5ICgwKSAxNzIgLyAxMiAzMiAxMSddLFxuICAgICAgICAgICAgWycwMTcyLTEyMzIxMTEnLCAnKzQ5ICgwKSAxNzIgLyAxMjMgMjEgMTEnXSxcbiAgICAgICAgICAgIFt1bmRlZmluZWQsICcnXSxcbiAgICAgICAgICAgIFtudWxsLCAnJ10sXG4gICAgICAgICAgICBbZmFsc2UsICcnXSxcbiAgICAgICAgICAgIFt0cnVlLCAnJ10sXG4gICAgICAgICAgICBbJycsICcnXSxcbiAgICAgICAgICAgIFsnICcsICcnXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nUmVwcmVzZW50UGhvbmVOdW1iZXIodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ0RlY29kZUhUTUxFbnRpdGllcyAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxzdHJpbmc+IG9mIFtcbiAgICAgICAgICAgIFsnJywgJyddLFxuICAgICAgICAgICAgWyc8ZGl2PjwvZGl2PicsICc8ZGl2PjwvZGl2PiddLFxuICAgICAgICAgICAgWyc8ZGl2PiZhbXA7PC9kaXY+JywgJzxkaXY+JjwvZGl2PiddLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICc8ZGl2PiZhbXA7JmF1bWw7JkF1bWw7JnV1bWw7JlV1bWw7Jm91bWw7Jk91bWw7PC9kaXY+JyxcbiAgICAgICAgICAgICAgICAnPGRpdj4mw6TDhMO8w5zDtsOWPC9kaXY+J1xuICAgICAgICAgICAgXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nRGVjb2RlSFRNTEVudGl0aWVzKHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdOb3JtYWxpemVEb21Ob2RlU2VsZWN0b3IgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8c3RyaW5nPiBvZiBbXG4gICAgICAgICAgICBbJ2RpdicsICdib2R5IGRpdiddLFxuICAgICAgICAgICAgWydkaXYgcCcsICdib2R5IGRpdiBwJ10sXG4gICAgICAgICAgICBbJ2JvZHkgZGl2JywgJ2JvZHkgZGl2J10sXG4gICAgICAgICAgICBbJ2JvZHkgZGl2IHAnLCAnYm9keSBkaXYgcCddLFxuICAgICAgICAgICAgWycnLCAnYm9keSddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgdG9vbHMuc3RyaW5nTm9ybWFsaXplRG9tTm9kZVNlbGVjdG9yKHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6c3RyaW5nIG9mIFtcbiAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAnZGl2LCBwJ1xuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMoe1xuICAgICAgICAgICAgICAgIGRvbU5vZGVTZWxlY3RvclByZWZpeDogJydcbiAgICAgICAgICAgIH0pLnN0cmluZ05vcm1hbGl6ZURvbU5vZGVTZWxlY3Rvcih0ZXN0KSwgdGVzdClcbiAgICB9KVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBudW1iZXJcbiAgICB0aGlzLnRlc3QoYG51bWJlckdldFVUQ1RpbWVzdGFtcCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tuZXcgRGF0ZSgwKV0sIDBdLFxuICAgICAgICAgICAgW1tuZXcgRGF0ZSgxKV0sIDAuMDAxXSxcbiAgICAgICAgICAgIFtbbmV3IERhdGUoMCksIHRydWVdLCAwXSxcbiAgICAgICAgICAgIFtbbmV3IERhdGUoMTAwMCksIGZhbHNlXSwgMV0sXG4gICAgICAgICAgICBbW25ldyBEYXRlKDEwMDApLCB0cnVlXSwgMTAwMF0sXG4gICAgICAgICAgICBbW25ldyBEYXRlKDApLCBmYWxzZV0sIDBdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5udW1iZXJHZXRVVENUaW1lc3RhbXAoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYG51bWJlcklzTm90QU51bWJlciAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW05hTiwgdHJ1ZV0sXG4gICAgICAgICAgICBbe30sIGZhbHNlXSxcbiAgICAgICAgICAgIFt1bmRlZmluZWQsIGZhbHNlXSxcbiAgICAgICAgICAgIFtuZXcgRGF0ZSgpLnRvU3RyaW5nKCksIGZhbHNlXSxcbiAgICAgICAgICAgIFtudWxsLCBmYWxzZV0sXG4gICAgICAgICAgICBbZmFsc2UsIGZhbHNlXSxcbiAgICAgICAgICAgIFt0cnVlLCBmYWxzZV0sXG4gICAgICAgICAgICBbMCwgZmFsc2VdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5udW1iZXJJc05vdEFOdW1iZXIodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYG51bWJlclJvdW5kICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbWzEuNSwgMF0sIDJdLFxuICAgICAgICAgICAgW1sxLjQsIDBdLCAxXSxcbiAgICAgICAgICAgIFtbMS40LCAtMV0sIDBdLFxuICAgICAgICAgICAgW1sxMDAwLCAtMl0sIDEwMDBdLFxuICAgICAgICAgICAgW1s5OTksIC0yXSwgMTAwMF0sXG4gICAgICAgICAgICBbWzk1MCwgLTJdLCAxMDAwXSxcbiAgICAgICAgICAgIFtbOTQ5LCAtMl0sIDkwMF0sXG4gICAgICAgICAgICBbWzEuMjM0NV0sIDFdLFxuICAgICAgICAgICAgW1sxLjIzNDUsIDJdLCAxLjIzXSxcbiAgICAgICAgICAgIFtbMS4yMzQ1LCAzXSwgMS4yMzVdLFxuICAgICAgICAgICAgW1sxLjIzNDUsIDRdLCAxLjIzNDVdLFxuICAgICAgICAgICAgW1s2OTksIC0yXSwgNzAwXSxcbiAgICAgICAgICAgIFtbNjUwLCAtMl0sIDcwMF0sXG4gICAgICAgICAgICBbWzY0OSwgLTJdLCA2MDBdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5udW1iZXJSb3VuZCguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBkYXRhIHRyYW5zZmVyXG4gICAgdGhpcy50ZXN0KCdjaGVja1JlYWNoYWJpbGl0eScsIGFzeW5jIChhc3NlcnQ6T2JqZWN0KTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgY29uc3QgZG9uZTpGdW5jdGlvbiA9IGFzc2VydC5hc3luYygpXG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFsndW5rbm93blVSTCcsIGZhbHNlXSxcbiAgICAgICAgICAgIFsndW5rbm93blVSTCcsIGZhbHNlLCAzMDFdLFxuICAgICAgICAgICAgWydodHRwOi8vdW5rbm93bkhvc3ROYW1lJywgdHJ1ZSwgMjAwLCAwLjAyNV0sXG4gICAgICAgICAgICBbJ2h0dHA6Ly91bmtub3duSG9zdE5hbWUnLCB0cnVlLCBbMjAwXSwgMC4wMjVdLFxuICAgICAgICAgICAgWydodHRwOi8vdW5rbm93bkhvc3ROYW1lJywgdHJ1ZSwgWzIwMCwgMzAxXSwgMC4wMjVdXG4gICAgICAgIF0pXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0ICQuVG9vbHMuY2xhc3MuY2hlY2tSZWFjaGFiaWxpdHkoLi4udGVzdClcbiAgICAgICAgICAgICAgICBhc3NlcnQub2soZmFsc2UpXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGFzc2VydC5vayh0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICBkb25lKClcbiAgICB9KVxuICAgIHRoaXMudGVzdCgnY2hlY2tVbnJlYWNoYWJpbGl0eScsIGFzeW5jIChhc3NlcnQ6T2JqZWN0KTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgY29uc3QgZG9uZTpGdW5jdGlvbiA9IGFzc2VydC5hc3luYygpXG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFsndW5rbm93blVSTCcsIGZhbHNlLCAxMCwgMC4xLCAyMDBdLFxuICAgICAgICAgICAgWyd1bmtub3duVVJMJywgdHJ1ZSwgMTAsIDAuMSwgMjAwXSxcbiAgICAgICAgICAgIFsndW5rbm93blVSTCcsIHRydWUsIDEwLCAwLjEsIFsyMDBdXSxcbiAgICAgICAgICAgIFsndW5rbm93blVSTCcsIHRydWUsIDEwLCAwLjEsIFsyMDAsIDMwMV1dLFxuICAgICAgICAgICAgWydodHRwOi8vdW5rbm93bkhvc3ROYW1lJywgdHJ1ZV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgJC5Ub29scy5jbGFzcy5jaGVja1VucmVhY2hhYmlsaXR5KC4uLnRlc3QpXG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHRydWUpXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGFzc2VydC5vayhmYWxzZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgZG9uZSgpXG4gICAgfSlcbiAgICBpZiAoXG4gICAgICAgIHR5cGVvZiB0YXJnZXRUZWNobm9sb2d5ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0YXJnZXRUZWNobm9sb2d5ID09PSAnd2ViJyAmJiByb3VuZFR5cGUgPT09ICdmdWxsJ1xuICAgICkge1xuICAgICAgICB0aGlzLnRlc3QoYHNlbmRUb0lGcmFtZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlGcmFtZSA9ICQoJzxpZnJhbWU+JykuaGlkZSgpLmF0dHIoJ25hbWUnLCAndGVzdCcpXG4gICAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKGlGcmFtZSlcbiAgICAgICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLnNlbmRUb0lGcmFtZShcbiAgICAgICAgICAgICAgICBpRnJhbWUsIHdpbmRvdy5kb2N1bWVudC5VUkwsIHt0ZXN0OiA1fSwgJ2dldCcsIHRydWUpKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlc3QoYHNlbmRUb0V4dGVybmFsVVJMICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOnZvaWQgPT4gYXNzZXJ0Lm9rKHRvb2xzLnNlbmRUb0V4dGVybmFsVVJMKFxuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LlVSTCwge3Rlc3Q6IDV9KSkpXG4gICAgfVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBmaWxlXG4gICAgaWYgKFRBUkdFVF9URUNITk9MT0dZID09PSAnbm9kZScpIHtcbiAgICAgICAgdGhpcy50ZXN0KGBjb3B5RGlyZWN0b3J5UmVjdXJzaXZlICgke3JvdW5kVHlwZX0pYCwgYXN5bmMgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOlByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICAgICAgY29uc3QgZG9uZTpGdW5jdGlvbiA9IGFzc2VydC5hc3luYygpXG4gICAgICAgICAgICBsZXQgcmVzdWx0OnN0cmluZyA9ICcnXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0ICQuVG9vbHMuY2xhc3MuY29weURpcmVjdG9yeVJlY3Vyc2l2ZShcbiAgICAgICAgICAgICAgICAgICAgJy4vJywgJy4vdGVzdC5jb21waWxlZCcsICgpOm51bGwgPT4gbnVsbClcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFzc2VydC5vayhyZXN1bHQuZW5kc1dpdGgoJy90ZXN0LmNvbXBpbGVkJykpXG4gICAgICAgICAgICByZW1vdmVEaXJlY3RvcnlSZWN1cnNpdmVseVN5bmMoJy4vdGVzdC5jb21waWxlZCcpXG4gICAgICAgICAgICBkb25lKClcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy50ZXN0KGBjb3B5RGlyZWN0b3J5UmVjdXJzaXZlU3luYyAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgICAgIGFzc2VydDpPYmplY3RcbiAgICAgICAgKTp2b2lkID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmNvcHlEaXJlY3RvcnlSZWN1cnNpdmVTeW5jKFxuICAgICAgICAgICAgICAgICcuLycsICcuL3N5bmN0ZXN0LmNvbXBpbGVkJywgKCk6bnVsbCA9PiBudWxsXG4gICAgICAgICAgICApLmVuZHNXaXRoKCcvc3luY3Rlc3QuY29tcGlsZWQnKSlcbiAgICAgICAgICAgIHJlbW92ZURpcmVjdG9yeVJlY3Vyc2l2ZWx5U3luYygnLi9zeW5jdGVzdC5jb21waWxlZCcpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudGVzdChgY29weUZpbGUgKCR7cm91bmRUeXBlfSlgLCBhc3luYyAoXG4gICAgICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgICAgICk6UHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgICAgICBjb25zdCBkb25lOkZ1bmN0aW9uID0gYXNzZXJ0LmFzeW5jKClcbiAgICAgICAgICAgIGxldCByZXN1bHQ6c3RyaW5nID0gJydcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgJC5Ub29scy5jbGFzcy5jb3B5RmlsZShcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5yZXNvbHZlKCcuLycsIHBhdGguYmFzZW5hbWUoX19maWxlbmFtZSkpLFxuICAgICAgICAgICAgICAgICAgICAnLi90ZXN0LmNvbXBpbGVkLmpzJylcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFzc2VydC5vayhyZXN1bHQuZW5kc1dpdGgoJy90ZXN0LmNvbXBpbGVkLmpzJykpXG4gICAgICAgICAgICBmaWxlU3lzdGVtLnVubGlua1N5bmMoJy4vdGVzdC5jb21waWxlZC5qcycpXG4gICAgICAgICAgICBkb25lKClcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy50ZXN0KGBjb3B5RmlsZVN5bmMgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5jb3B5RmlsZVN5bmMoXG4gICAgICAgICAgICAgICAgcGF0aC5yZXNvbHZlKCcuLycsIHBhdGguYmFzZW5hbWUoX19maWxlbmFtZSkpLFxuICAgICAgICAgICAgICAgICcuL3N5bmN0ZXN0LmNvbXBpbGVkLmpzJ1xuICAgICAgICAgICAgKS5lbmRzV2l0aCgnL3N5bmN0ZXN0LmNvbXBpbGVkLmpzJykpXG4gICAgICAgICAgICBmaWxlU3lzdGVtLnVubGlua1N5bmMoJy4vc3luY3Rlc3QuY29tcGlsZWQuanMnKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlc3QoYGlzRGlyZWN0b3J5ICgke3JvdW5kVHlwZX0pYCwgYXN5bmMgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOlByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICAgICAgY29uc3QgZG9uZTpGdW5jdGlvbiA9IGFzc2VydC5hc3luYygpXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGVQYXRoOnN0cmluZyBvZiBbJy4vJywgJy4uLyddKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDpib29sZWFuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgJC5Ub29scy5jbGFzcy5pc0RpcmVjdG9yeShmaWxlUGF0aClcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhc3NlcnQub2socmVzdWx0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlUGF0aDpzdHJpbmcgb2YgW1xuICAgICAgICAgICAgICAgIHBhdGgucmVzb2x2ZSgnLi8nLCBwYXRoLmJhc2VuYW1lKF9fZmlsZW5hbWUpKVxuICAgICAgICAgICAgXSkge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6Ym9vbGVhblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0ICQuVG9vbHMuY2xhc3MuaXNEaXJlY3RvcnkoZmlsZVBhdGgpXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKHJlc3VsdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvbmUoKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlc3QoYGlzRGlyZWN0b3J5U3luYyAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZVBhdGg6c3RyaW5nIG9mIFsnLi8nLCAnLi4vJ10pXG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuaXNEaXJlY3RvcnlTeW5jKGZpbGVQYXRoKSlcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZVBhdGg6c3RyaW5nIG9mIFtcbiAgICAgICAgICAgICAgICBwYXRoLnJlc29sdmUoJy4vJywgcGF0aC5iYXNlbmFtZShfX2ZpbGVuYW1lKSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKCQuVG9vbHMuY2xhc3MuaXNEaXJlY3RvcnlTeW5jKGZpbGVQYXRoKSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy50ZXN0KGBpc0ZpbGUgKCR7cm91bmRUeXBlfSlgLCBhc3luYyAoXG4gICAgICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgICAgICk6UHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgICAgICBjb25zdCBkb25lOkZ1bmN0aW9uID0gYXNzZXJ0LmFzeW5jKClcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZVBhdGg6c3RyaW5nIG9mIFtcbiAgICAgICAgICAgICAgICBwYXRoLnJlc29sdmUoJy4vJywgcGF0aC5iYXNlbmFtZShfX2ZpbGVuYW1lKSlcbiAgICAgICAgICAgIF0pIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OmJvb2xlYW5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCAkLlRvb2xzLmNsYXNzLmlzRmlsZShmaWxlUGF0aClcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhc3NlcnQub2socmVzdWx0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlUGF0aDpzdHJpbmcgb2YgWycuLycsICcuLi8nXSkge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6Ym9vbGVhblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0ICQuVG9vbHMuY2xhc3MuaXNGaWxlKGZpbGVQYXRoKVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFzc2VydC5ub3RPayhyZXN1bHQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb25lKClcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy50ZXN0KGBpc0ZpbGVTeW5jICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlUGF0aDpzdHJpbmcgb2YgW1xuICAgICAgICAgICAgICAgIHBhdGgucmVzb2x2ZSgnLi8nLCBwYXRoLmJhc2VuYW1lKF9fZmlsZW5hbWUpKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5pc0ZpbGVTeW5jKGZpbGVQYXRoKSlcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZVBhdGg6c3RyaW5nIG9mIFsnLi8nLCAnLi4vJ10pXG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKCQuVG9vbHMuY2xhc3MuaXNGaWxlU3luYyhmaWxlUGF0aCkpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudGVzdChgd2Fsa0RpcmVjdG9yeVJlY3Vyc2l2ZWx5ICgke3JvdW5kVHlwZX0pYCwgYXN5bmMgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOlByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICAgICAgY29uc3QgZG9uZTpGdW5jdGlvbiA9IGFzc2VydC5hc3luYygpXG4gICAgICAgICAgICBjb25zdCBmaWxlUGF0aHM6QXJyYXk8c3RyaW5nPiA9IFtdXG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjazpGdW5jdGlvbiA9IChmaWxlUGF0aDpzdHJpbmcpOm51bGwgPT4ge1xuICAgICAgICAgICAgICAgIGZpbGVQYXRocy5wdXNoKGZpbGVQYXRoKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZmlsZXM6QXJyYXk8RmlsZT4gPSBbXVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmaWxlcyA9IGF3YWl0ICQuVG9vbHMuY2xhc3Mud2Fsa0RpcmVjdG9yeVJlY3Vyc2l2ZWx5KFxuICAgICAgICAgICAgICAgICAgICAnLi8nLCBjYWxsYmFjaylcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmaWxlcy5sZW5ndGgsIDEpXG4gICAgICAgICAgICBhc3NlcnQub2soZmlsZXNbMF0uaGFzT3duUHJvcGVydHkoJ3BhdGgnKSlcbiAgICAgICAgICAgIGFzc2VydC5vayhmaWxlc1swXS5oYXNPd25Qcm9wZXJ0eSgnc3RhdHMnKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmaWxlUGF0aHMubGVuZ3RoLCAxKVxuICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudGVzdChgd2Fsa0RpcmVjdG9yeVJlY3Vyc2l2ZWx5U3luYyAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgICAgIGFzc2VydDpPYmplY3RcbiAgICAgICAgKTp2b2lkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoczpBcnJheTxzdHJpbmc+ID0gW11cbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrOkZ1bmN0aW9uID0gKGZpbGVQYXRoOnN0cmluZyk6bnVsbCA9PiB7XG4gICAgICAgICAgICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGZpbGVzOkFycmF5PEZpbGU+ID1cbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLndhbGtEaXJlY3RvcnlSZWN1cnNpdmVseVN5bmMoJy4vJywgY2FsbGJhY2spXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZmlsZXMubGVuZ3RoLCAxKVxuICAgICAgICAgICAgYXNzZXJ0Lm9rKGZpbGVzWzBdLmhhc093blByb3BlcnR5KCdwYXRoJykpXG4gICAgICAgICAgICBhc3NlcnQub2soZmlsZXNbMF0uaGFzT3duUHJvcGVydHkoJ3N0YXRzJykpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZmlsZVBhdGhzLmxlbmd0aCwgMSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8gLy8gZW5kcmVnaW9uXG4gICAgLy8gLy8gcmVnaW9uIHByb2Nlc3MgaGFuZGxlclxuICAgIGlmIChUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ25vZGUnKSB7XG4gICAgICAgIHRoaXMudGVzdChgZ2V0UHJvY2Vzc0Nsb3NlSGFuZGxlciAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgICAgIGFzc2VydDpPYmplY3RcbiAgICAgICAgKTp2b2lkID0+IGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgIHR5cGVvZiAkLlRvb2xzLmNsYXNzLmdldFByb2Nlc3NDbG9zZUhhbmRsZXIoXG4gICAgICAgICAgICAgICAgKCk6dm9pZCA9PiB7fSwgKCk6dm9pZCA9PiB7fVxuICAgICAgICAgICAgKSwgJ2Z1bmN0aW9uJykpXG4gICAgICAgIHRoaXMudGVzdChgaGFuZGxlQ2hpbGRQcm9jZXNzICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOnZvaWQgPT4ge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBIG1vY2t1cCBkdXBsZXggc3RyZWFtIGZvciBtb2NraW5nIFwic3Rkb3V0XCIgYW5kIFwic3RyZGVyclwiXG4gICAgICAgICAgICAgKiBwcm9jZXNzIGNvbm5lY3Rpb25zLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjbGFzcyBNb2NrdXBEdXBsZXhTdHJlYW0gZXh0ZW5kcyByZXF1aXJlKCdzdHJlYW0nKS5EdXBsZXgge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFRyaWdnZXJzIGlmIGNvbnRlbnRzIGZyb20gY3VycmVudCBzdHJlYW0gc2hvdWxkIGJlIHJlZC5cbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gc2l6ZSAtIE51bWJlciBvZiBieXRlcyB0byByZWFkIGFzeW5jaHJvbm91c2x5LlxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIFJlZCBkYXRhLlxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIF9yZWFkKHNpemU6bnVtYmVyKTpzdHJpbmcge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7c2l6ZX1gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFRyaWdnZXJzIGlmIGNvbnRlbnRzIHNob3VsZCBiZSB3cml0dGVuIG9uIGN1cnJlbnQgc3RyZWFtLlxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSBjaHVuayAtIFRoZSBjaHVuayB0byBiZSB3cml0dGVuLiBXaWxsIGFsd2F5cyBiZSBhXG4gICAgICAgICAgICAgICAgICogYnVmZmVyIHVubGVzcyB0aGUgXCJkZWNvZGVTdHJpbmdzXCIgb3B0aW9uIHdhcyBzZXQgdG8gXCJmYWxzZVwiLlxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSBlbmNvZGluZyAtIFNwZWNpZmllcyBlbmNvZGluZyB0byBiZSB1c2VkIGFzIGlucHV0XG4gICAgICAgICAgICAgICAgICogZGF0YS5cbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgLSBXaWxsIGJlIGNhbGxlZCBpZiBkYXRhIGhhcyBiZWVuIHdyaXR0ZW4uXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMgUmV0dXJucyBcInRydWVcIiBpZiBtb3JlIGRhdGEgY291bGQgYmUgd3JpdHRlbiBhbmRcbiAgICAgICAgICAgICAgICAgKiBcImZhbHNlXCIgb3RoZXJ3aXNlLlxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIF93cml0ZShcbiAgICAgICAgICAgICAgICAgICAgY2h1bms6QnVmZmVyfHN0cmluZywgZW5jb2Rpbmc6c3RyaW5nLCBjYWxsYmFjazpGdW5jdGlvblxuICAgICAgICAgICAgICAgICk6Ym9vbGVhbiB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG5ldyBFcnJvcigndGVzdCcpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN0ZG91dE1vY2t1cER1cGxleFN0cmVhbTpNb2NrdXBEdXBsZXhTdHJlYW0gPVxuICAgICAgICAgICAgICAgIG5ldyBNb2NrdXBEdXBsZXhTdHJlYW0oKVxuICAgICAgICAgICAgY29uc3Qgc3RkZXJyTW9ja3VwRHVwbGV4U3RyZWFtOk1vY2t1cER1cGxleFN0cmVhbSA9XG4gICAgICAgICAgICAgICAgbmV3IE1vY2t1cER1cGxleFN0cmVhbSgpXG4gICAgICAgICAgICBjb25zdCBjaGlsZFByb2Nlc3M6Q2hpbGRQcm9jZXNzID0gbmV3IENoaWxkUHJvY2VzcygpXG4gICAgICAgICAgICBjaGlsZFByb2Nlc3Muc3Rkb3V0ID0gc3Rkb3V0TW9ja3VwRHVwbGV4U3RyZWFtXG4gICAgICAgICAgICBjaGlsZFByb2Nlc3Muc3RkZXJyID0gc3RkZXJyTW9ja3VwRHVwbGV4U3RyZWFtXG5cbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmhhbmRsZUNoaWxkUHJvY2VzcyhjaGlsZFByb2Nlc3MpLCBjaGlsZFByb2Nlc3MpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8gZW5kcmVnaW9uXG4gICAgLy8gLyByZWdpb24gcHJvdGVjdGVkXG4gICAgaWYgKHJvdW5kVHlwZSA9PT0gJ2Z1bGwnKVxuICAgICAgICB0aGlzLnRlc3QoYF9iaW5kRXZlbnRIZWxwZXIgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgICAgICk6dm9pZCA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICAgICAgW1snYm9keSddXSxcbiAgICAgICAgICAgICAgICBbWydib2R5J10sIHRydWVdLFxuICAgICAgICAgICAgICAgIFtbJ2JvZHknXSwgZmFsc2UsICdiaW5kJ11cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHRvb2xzLl9iaW5kRXZlbnRIZWxwZXIoLi4udGVzdCkpXG4gICAgICAgIH0pXG4gICAgLy8gLyBlbmRyZWdpb25cbiAgICAvLyBlbmRyZWdpb25cbn0sIGNsb3NlV2luZG93OiBmYWxzZSwgcm91bmRUeXBlczogW119XVxuLy8gZW5kcmVnaW9uXG4vLyByZWdpb24gdGVzdCBydW5uZXIgKGluIGJyb3dzZXJBUEkpXG5sZXQgdGVzdFJhbjpib29sZWFuID0gZmFsc2VcbmJyb3dzZXJBUEkoKGJyb3dzZXJBUEk6QnJvd3NlckFQSSk6UHJvbWlzZTxib29sZWFuPiA9PiBUb29scy50aW1lb3V0KChcbik6dm9pZCA9PiB7XG4gICAgZm9yIChjb25zdCBkb21Ob2RlU3BlY2lmaWNhdGlvbjpQbGFpbk9iamVjdCBvZiBbXG4gICAgICAgIHtsaW5rOiB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgaHJlZjogJy9ub2RlX21vZHVsZXMvcXVuaXQvcXVuaXQvcXVuaXQuY3NzJyxcbiAgICAgICAgICAgICAgICByZWw6ICdzdHlsZXNoZWV0JyxcbiAgICAgICAgICAgICAgICB0eXBlOiAndGV4dC9jc3MnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5qZWN0OiB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXVxuICAgICAgICB9fSxcbiAgICAgICAge2Rpdjoge2F0dHJpYnV0ZXM6IHtpZDogJ3F1bml0J30sIGluamVjdDogd2luZG93LmRvY3VtZW50LmJvZHl9fSxcbiAgICAgICAge2Rpdjoge1xuICAgICAgICAgICAgYXR0cmlidXRlczoge2lkOiAncXVuaXQtZml4dHVyZSd9LCBpbmplY3Q6IHdpbmRvdy5kb2N1bWVudC5ib2R5XG4gICAgICAgIH19XG4gICAgXSkge1xuICAgICAgICBjb25zdCBkb21Ob2RlTmFtZTpzdHJpbmcgPSBPYmplY3Qua2V5cyhkb21Ob2RlU3BlY2lmaWNhdGlvbilbMF1cbiAgICAgICAgY29uc3QgZG9tTm9kZTpEb21Ob2RlID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZG9tTm9kZU5hbWUpXG4gICAgICAgIGZvciAoY29uc3QgbmFtZTpzdHJpbmcgaW4gZG9tTm9kZVNwZWNpZmljYXRpb25bZG9tTm9kZU5hbWVdLmF0dHJpYnV0ZXMpXG4gICAgICAgICAgICBpZiAoZG9tTm9kZVNwZWNpZmljYXRpb25bZG9tTm9kZU5hbWVdLmF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICAgICBkb21Ob2RlLnNldEF0dHJpYnV0ZShuYW1lLCBkb21Ob2RlU3BlY2lmaWNhdGlvbltcbiAgICAgICAgICAgICAgICAgICAgZG9tTm9kZU5hbWVcbiAgICAgICAgICAgICAgICBdLmF0dHJpYnV0ZXNbbmFtZV0pXG4gICAgICAgIGRvbU5vZGVTcGVjaWZpY2F0aW9uW2RvbU5vZGVOYW1lXS5pbmplY3QuYXBwZW5kQ2hpbGQoZG9tTm9kZSlcbiAgICB9XG4gICAgdGVzdFJhbiA9IHRydWVcbiAgICAvLyByZWdpb24gY29uZmlndXJhdGlvblxuICAgIFFVbml0LmNvbmZpZyA9IFRvb2xzLmV4dGVuZE9iamVjdChRVW5pdC5jb25maWcgfHwge30sIHtcbiAgICAgICAgLypcbiAgICAgICAgbm90cnljYXRjaDogdHJ1ZSxcbiAgICAgICAgbm9nbG9iYWxzOiB0cnVlLFxuICAgICAgICAqL1xuICAgICAgICB0ZXN0VGltZW91dDogMzAgKiAxMDAwLFxuICAgICAgICBzY3JvbGx0b3A6IGZhbHNlXG4gICAgfSlcbiAgICAvLyBlbmRyZWdpb25cbiAgICBjb25zdCB0ZXN0UHJvbWlzZXM6QXJyYXk8UHJvbWlzZTxhbnk+PiA9IFtdXG4gICAgbGV0IGNsb3NlV2luZG93OmJvb2xlYW4gPSBmYWxzZVxuICAgIGZvciAoY29uc3QgdGVzdDpUZXN0IG9mIHRlc3RzKSB7XG4gICAgICAgIGlmICh0ZXN0LmNsb3NlV2luZG93KVxuICAgICAgICAgICAgY2xvc2VXaW5kb3cgPSB0cnVlXG4gICAgICAgIGZvciAoY29uc3Qgcm91bmRUeXBlOnN0cmluZyBvZiBbJ3BsYWluJywgJ2RvY3VtZW50JywgJ2Z1bGwnXSlcbiAgICAgICAgICAgIGlmICh0ZXN0LnJvdW5kVHlwZXMubGVuZ3RoID09PSAwIHx8IHRlc3Qucm91bmRUeXBlcy5pbmNsdWRlcyhcbiAgICAgICAgICAgICAgICByb3VuZFR5cGVcbiAgICAgICAgICAgICkpIHtcbiAgICAgICAgICAgICAgICAvLyBOT1RFOiBFbmZvcmNlIHRvIHJlbG9hZCBtb2R1bGUgdG8gcmViaW5kIFwiJFwiLlxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZXF1aXJlLmNhY2hlW3JlcXVpcmUucmVzb2x2ZSgnY2xpZW50bm9kZScpXVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcmVxdWlyZS5jYWNoZVtyZXF1aXJlLnJlc29sdmUoJ2pxdWVyeScpXVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgIE5PVEU6IE1vZHVsZSBidW5kbGVyIGxpa2Ugd2VicGFjayB3cmFwcyBhIGNvbW1vbmpzXG4gICAgICAgICAgICAgICAgICAgIGVudmlyb25tZW50LiBTbyB3ZSBoYXZlIHRvIHRyeSB0byBjbGVhciB0aGUgdW5kZXJsaW5nXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlLlxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByZXF1ZXN0OnN0cmluZyBvZiBbXG4gICAgICAgICAgICAgICAgICAgICdjbGllbnRub2RlJywgJ2pxdWVyeScsICdqcXVlcnkvZGlzdC9qcXVlcnknLFxuICAgICAgICAgICAgICAgICAgICAnanF1ZXJ5L2Rpc3QvanF1ZXJ5LmpzJywgJ2pxdWVyeS9kaXN0L2pxdWVyeS5taW4nLFxuICAgICAgICAgICAgICAgICAgICAnanF1ZXJ5L2Rpc3QvanF1ZXJ5Lm1pbi5qcycsICdqcXVlcnkvZGlzdC9qcXVlcnkubWluJ1xuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmFsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBkZWxldGUgcmVxdWlyZS5jYWNoZVtyZXF1aXJlLnJlc29sdmUoJ2AgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAke3JlcXVlc3R9JyldYClcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgICAgICAgICAgICAgbGV0ICRib2R5RG9tTm9kZTokRG9tTm9kZVxuICAgICAgICAgICAgICAgIGxldCAkOmFueVxuICAgICAgICAgICAgICAgIGlmIChyb3VuZFR5cGUgPT09ICdwbGFpbicpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LiQgPSBudWxsXG4gICAgICAgICAgICAgICAgICAgICQgPSByZXF1aXJlKCdjbGllbnRub2RlJykuJFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3VuZFR5cGUgPT09ICdmdWxsJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBuYW1lOnN0cmluZyBvZiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RvY3VtZW50JywgJ0VsZW1lbnQnLCAnSFRNTEVsZW1lbnQnLCAnbWF0Y2hNZWRpYScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ05vZGUnXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKG5hbWUgaW4gZ2xvYmFsKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsW25hbWVdID0gd2luZG93W25hbWVdXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuJCA9IHJlcXVpcmUoJ2pxdWVyeScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgJCA9IHJlcXVpcmUoJ2NsaWVudG5vZGUnKS4kXG4gICAgICAgICAgICAgICAgICAgICQuY29udGV4dCA9IHdpbmRvdy5kb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAkYm9keURvbU5vZGUgPSAkKCdib2R5JylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgdG9vbHM6JC5Ub29scyA9IChyb3VuZFR5cGUgPT09ICdwbGFpbicpID8gJC5Ub29scyhcbiAgICAgICAgICAgICAgICApIDogJCgnYm9keScpLlRvb2xzKClcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXN0UHJvbWlzZTo/T2JqZWN0ID0gdGVzdC5jYWxsYmFjay5jYWxsKFxuICAgICAgICAgICAgICAgICAgICBRVW5pdCwgcm91bmRUeXBlLCAoXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgVEFSR0VUX1RFQ0hOT0xPR1kgPT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgICAgICkgPyBudWxsIDogVEFSR0VUX1RFQ0hOT0xPR1ksICQsIGJyb3dzZXJBUEksIHRvb2xzLFxuICAgICAgICAgICAgICAgICAgICAkYm9keURvbU5vZGUpXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgdGVzdFByb21pc2UgPT09ICdvYmplY3QnICYmIHRlc3RQcm9taXNlICYmXG4gICAgICAgICAgICAgICAgICAgICd0aGVuJyBpbiB0ZXN0UHJvbWlzZVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGVzdFByb21pc2VzLnB1c2godGVzdFByb21pc2UpXG4gICAgICAgICAgICB9XG4gICAgfVxuICAgIGlmIChcbiAgICAgICAgdHlwZW9mIFRBUkdFVF9URUNITk9MT0dZID09PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICBUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ25vZGUnXG4gICAgKVxuICAgICAgICBQcm9taXNlLmFsbCh0ZXN0UHJvbWlzZXMpLnRoZW4oKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICBpZiAoY2xvc2VXaW5kb3cpXG4gICAgICAgICAgICAgICAgYnJvd3NlckFQSS53aW5kb3cuY2xvc2UoKVxuICAgICAgICAgICAgUVVuaXQubG9hZCgpXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcjpFcnJvcik6dm9pZCA9PiB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvclxuICAgICAgICB9KVxuICAgIC8vIHJlZ2lvbiBob3QgbW9kdWxlIHJlcGxhY2VtZW50IGhhbmRsZXJcbiAgICAvKlxuICAgICAgICBOT1RFOiBob3QgbW9kdWxlIHJlcGxhY2VtZW50IGRvZXNuJ3Qgd29yayB3aXRoIGFzeW5jIHRlc3RzIHlldCBzaW5jZVxuICAgICAgICBxdW5pdCBpcyBub3QgcmVzZXRhYmxlIHlldDpcblxuICAgICAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgJ2hvdCcgaW4gbW9kdWxlICYmIG1vZHVsZS5ob3QpIHtcbiAgICAgICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICAgICAgICAgIC8vIElnbm9yZVR5cGVDaGVja1xuICAgICAgICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIFFVbml0LnJlc2V0KClcbiAgICAgICAgICAgICAgICBjb25zb2xlLmNsZWFyKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICovXG4gICAgLy8gZW5kcmVnaW9uXG59KSlcbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIGV4cG9ydCB0ZXN0IHJlZ2lzdGVyIGZ1bmN0aW9uXG5sZXQgdGVzdFJlZ2lzdGVyZWQ6Ym9vbGVhbiA9IGZhbHNlXG4vKipcbiAqIFJlZ2lzdGVycyBhIGNvbXBsZXRlIHRlc3Qgc2V0LlxuICogQHBhcmFtIGNhbGxiYWNrIC0gQSBmdW5jdGlvbiBjb250YWluaW5nIGFsbCB0ZXN0cyB0byBydW4uIFRoaXMgY2FsbGJhY2sgZ2V0c1xuICogc29tZSB1c2VmdWwgcGFyYW1ldGVycyBhbmQgd2lsbCBiZSBleGVjdXRlZCBpbiBjb250ZXh0IG9mIHF1bml0LlxuICogQHBhcmFtIHJvdW5kVHlwZXMgLSBBIGxpc3Qgb2Ygcm91bmQgdHlwZXMgd2hpY2ggc2hvdWxkIGJlIGF2b2lkZWQuXG4gKiBAcGFyYW0gY2xvc2VXaW5kb3cgLSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgd2luZG93IG9iamVjdCBzaG91bGQgYmUgY2xvc2VkXG4gKiBhZnRlciBmaW5pc2hpbmcgYWxsIHRlc3RzLlxuICogQHJldHVybnMgVGhlIGxpc3Qgb2YgY3VycmVudGx5IHJlZ2lzdGVyZWQgdGVzdHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKFxuICAgIGNhbGxiYWNrOigoXG4gICAgICAgIHJvdW5kVHlwZTpzdHJpbmcsIHRhcmdldFRlY2hub2xvZ3k6P3N0cmluZywgJDphbnksXG4gICAgICAgIGJyb3dzZXJBUEk6QnJvd3NlckFQSSwgdG9vbHM6T2JqZWN0LCAkYm9keURvbU5vZGU6JERvbU5vZGVcbiAgICApID0+IGFueSksIHJvdW5kVHlwZXM6QXJyYXk8c3RyaW5nPiA9IFtdLCBjbG9zZVdpbmRvdzpib29sZWFuID0gZmFsc2Vcbik6QXJyYXk8VGVzdD4ge1xuICAgIGlmICh0ZXN0UmFuKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnWW91IGhhdmUgdG8gcmVnaXN0ZXIgeW91ciB0ZXN0cyBpbW1lZGlhdGVseSBhZnRlciBpbXBvcnRpbmcgdGhlJyArXG4gICAgICAgICAgICAnIGxpYnJhcnkuJylcbiAgICBpZiAoIXRlc3RSZWdpc3RlcmVkKSB7XG4gICAgICAgIHRlc3RSZWdpc3RlcmVkID0gdHJ1ZVxuICAgICAgICB0ZXN0cyA9IFtdXG4gICAgfVxuICAgIHRlc3RzLnB1c2goe2NhbGxiYWNrLCBjbG9zZVdpbmRvdywgcm91bmRUeXBlc30pXG4gICAgcmV0dXJuIHRlc3RzXG59XG4vLyBlbmRyZWdpb25cbi8vIHJlZ2lvbiB2aW0gbW9kbGluZVxuLy8gdmltOiBzZXQgdGFic3RvcD00IHNoaWZ0d2lkdGg9NCBleHBhbmR0YWI6XG4vLyB2aW06IGZvbGRtZXRob2Q9bWFya2VyIGZvbGRtYXJrZXI9cmVnaW9uLGVuZHJlZ2lvbjpcbi8vIGVuZHJlZ2lvblxuIl19