
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
    QUnit = require('qunitjs');
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
                    if (typeof error.actual !== 'undefined') console.warn((
                    // IgnoreTypeCheck
                    indention + 'actual: ' + _clientnode2.default.representObject(error.actual, '    ', indention) + (' (' + (0, _typeof3.default)(error.actual) + ') != ') + 'expected: ' + _clientnode2.default.representObject(error.expected, '    ', indention) + (' (' + (0, _typeof3.default)(error.expected) + ')')).red);
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
            clearTimeout(finalDoneTimeoutID);
            finalDoneTimeoutID = null;
        }
        finalDoneTimeoutID = setTimeout(function () {
            finalDoneTimeoutID = setTimeout(function () {
                done.apply(undefined, parameter);
            });
        });
    });
} else QUnit = require('script!qunitjs') && window.QUnit;
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
        this.test('copyLimitedRecursively (' + roundType + ')', function (assert) {
            var _arr27 = [[[21], 21], [[0, -1], 0], [[0, 1], 0], [[0, 10], 0], [[new Date(0)], new Date(0)], [[/a/], /a/], [[{}], {}], [[{}, -1], {}], [[[]], []], [[new _map2.default(), -1], new _map2.default()], [[new _set2.default(), -1], new _set2.default()], [[{ a: 2 }, 0], { a: 2 }], [[{ a: { a: 2 } }, 0], { a: null }], [[{ a: { a: 2 } }, 1], { a: { a: 2 } }], [[{ a: { a: 2 } }, 2], { a: { a: 2 } }], [[{ a: [{ a: 2 }] }, 1], { a: [null] }], [[{ a: [{ a: 2 }] }, 2], { a: [{ a: 2 }] }], [[{ a: { a: 2 } }, 10], { a: { a: 2 } }], [[new _map2.default([['a', 2]]), 0], new _map2.default([['a', 2]])], [[new _map2.default([['a', new _map2.default([['a', 2]])]]), 0], new _map2.default([['a', null]])], [[new _map2.default([['a', new _map2.default([['a', 2]])]]), 1], new _map2.default([['a', new _map2.default([['a', 2]])]])], [[new _map2.default([['a', new _map2.default([['a', 2]])]]), 2], new _map2.default([['a', new _map2.default([['a', 2]])]])], [[new _map2.default([['a', [new _map2.default([['a', 2]])]]]), 1], new _map2.default([['a', [null]]])], [[new _map2.default([['a', [new _map2.default([['a', 2]])]]]), 2], new _map2.default([['a', [new _map2.default([['a', 2]])]]])], [[new _map2.default([['a', new _map2.default([['a', 2]])]]), 10], new _map2.default([['a', new _map2.default([['a', 2]])]])], [[new _map2.default([['a', new _map2.default([['a', 2]])]]), 10], new _map2.default([['a', new _map2.default([['a', 2]])]])], [[new _set2.default(['a', 2]), 0], new _set2.default(['a', 2])], [[new _set2.default(['a', new _set2.default(['a', 2])]), 0], new _set2.default(['a', null])], [[new _set2.default(['a', new _set2.default(['a', 2])]), 1], new _set2.default(['a', new _set2.default(['a', 2])])], [[new _set2.default(['a', new _set2.default(['a', 2])]), 2], new _set2.default(['a', new _set2.default(['a', 2])])], [[new _set2.default(['a', [new _set2.default(['a', 2])]]), 1], new _set2.default(['a', [null]])], [[new _set2.default(['a', [new _set2.default(['a', 2])]]), 2], new _set2.default(['a', [new _set2.default(['a', 2])]])], [[new _set2.default(['a', new _set2.default(['a', 2])]), 10], new _set2.default(['a', new _set2.default(['a', 2])])], [[new _set2.default(['a', new _set2.default(['a', 2])]), 10], new _set2.default(['a', new _set2.default(['a', 2])])]];

            for (var _i27 = 0; _i27 < _arr27.length; _i27++) {
                var _$$Tools$class7;

                var test = _arr27[_i27];
                assert.deepEqual((_$$Tools$class7 = $.Tools.class).copyLimitedRecursively.apply(_$$Tools$class7, (0, _toConsumableArray3.default)(test[0])), test[1]);
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
                c: { d: { e: {
                            __evaluate__: 'tools.copyLimitedRecursively([2])'
                        } } }
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
                assert.deepEqual($.Tools.class.copyLimitedRecursively((_$$Tools$class12 = $.Tools.class).evaluateDynamicDataStructure.apply(_$$Tools$class12, (0, _toConsumableArray3.default)(test[0])), -1, true), test[1]);
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
                                    assert.ok(files[0].hasOwnProperty('stat'));
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
                assert.ok(files[0].hasOwnProperty('stat'));
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
                    href: '/node_modules/qunitjs/qunit/qunit.css',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QURpQixFQUVwQixPQUFPLGlCQUFQLEtBQTZCLFdBRGYsR0FFZCxJQUZjLEdBRVAsaUJBSGEsRUFHTSxFQUhOLEVBR1MsVUFIVCxFQUdxQixNQUhyQixFQUl4QixhQUp3QixDQUE1QjtBQUtBLDRCQUNJLFFBQU8sV0FBUCx1REFBTyxXQUFQLE9BQXVCLFFBQXZCLElBQW1DLFdBQW5DLElBQ0EsVUFBVSxXQUZkLEVBSUksYUFBYSxJQUFiLENBQWtCLFdBQWxCO0FBQ1A7QUF2REw7QUF3REg7QUFsR0s7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFtR04sWUFDSSxPQUFPLGlCQUFQLEtBQTZCLFdBQTdCLElBQ0Esc0JBQXNCLE1BRjFCLEVBSUksa0JBQVEsR0FBUixDQUFZLFlBQVosRUFBMEIsSUFBMUIsQ0FBK0IsWUFBVztBQUN0QyxnQkFBSSxXQUFKLEVBQ0ksV0FBVyxNQUFYLENBQWtCLEtBQWxCO0FBQ0osa0JBQU0sSUFBTjtBQUNILFNBSkQsRUFJRyxLQUpILENBSVMsVUFBQyxLQUFELEVBQXNCO0FBQzNCLGtCQUFNLEtBQU47QUFDSCxTQU5EO0FBT0o7QUFDQTs7Ozs7Ozs7Ozs7O0FBYUE7QUFDSCxLQTlIc0QsQ0FBNUM7QUFBQSxDQUFYO0FBK0hBO0FBQ0E7O0FBNEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEvQkEsSUFBSSxpQkFBeUIsS0FBN0I7QUFDQSIsImZpbGUiOiJ0ZXN0LmNvbXBpbGVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbi8vICMhL3Vzci9iaW4vZW52IG5vZGVcbi8vIC0qLSBjb2Rpbmc6IHV0Zi04IC0qLVxuJ3VzZSBzdHJpY3QnXG4vKiAhXG4gICAgcmVnaW9uIGhlYWRlclxuICAgIENvcHlyaWdodCBUb3JiZW4gU2lja2VydCAoaW5mb1tcIn5hdH5cIl10b3JiZW4ud2Vic2l0ZSkgMTYuMTIuMjAxMlxuXG4gICAgTGljZW5zZVxuICAgIC0tLS0tLS1cblxuICAgIFRoaXMgbGlicmFyeSB3cml0dGVuIGJ5IFRvcmJlbiBTaWNrZXJ0IHN0YW5kIHVuZGVyIGEgY3JlYXRpdmUgY29tbW9uc1xuICAgIG5hbWluZyAzLjAgdW5wb3J0ZWQgbGljZW5zZS5cbiAgICBTZWUgaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnkvMy4wL2RlZWQuZGVcbiAgICBlbmRyZWdpb25cbiovXG4vLyByZWdpb24gaW1wb3J0c1xuaW1wb3J0IFRvb2xzIGZyb20gJ2NsaWVudG5vZGUnXG5pbXBvcnQgdHlwZSB7RG9tTm9kZSwgRmlsZSwgUGxhaW5PYmplY3QsICREb21Ob2RlfSBmcm9tICdjbGllbnRub2RlJ1xubGV0IENoaWxkUHJvY2VzczpDaGlsZFByb2Nlc3NcbnRyeSB7XG4gICAgQ2hpbGRQcm9jZXNzID0gZXZhbCgncmVxdWlyZScpKCdjaGlsZF9wcm9jZXNzJykuQ2hpbGRQcm9jZXNzXG59IGNhdGNoIChlcnJvcikge31cbi8vIE5PVEU6IE9ubHkgbmVlZGVkIGZvciBkZWJ1Z2dpbmcgdGhpcyBmaWxlLlxudHJ5IHtcbiAgICBtb2R1bGUucmVxdWlyZSgnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJylcbn0gY2F0Y2ggKGVycm9yKSB7fVxuaW1wb3J0IGJyb3dzZXJBUEkgZnJvbSAnd2Vib3B0aW1pemVyL2Jyb3dzZXJBUEkuY29tcGlsZWQnXG5pbXBvcnQgdHlwZSB7QnJvd3NlckFQSX0gZnJvbSAnd2Vib3B0aW1pemVyL3R5cGUnXG4vLyBlbmRyZWdpb25cbi8vIHJlZ2lvbiB0eXBlc1xuZXhwb3J0IHR5cGUgVGVzdCA9IHtcbiAgICBjYWxsYmFjazpGdW5jdGlvbjtcbiAgICBjbG9zZVdpbmRvdzpib29sZWFuO1xuICAgIHJvdW5kVHlwZXM6QXJyYXk8c3RyaW5nPlxufVxuLy8gZW5kcmVnaW9uXG4vLyByZWdpb24gZGVjbGFyYXRpb25cbmRlY2xhcmUgdmFyIFRBUkdFVF9URUNITk9MT0dZOnN0cmluZ1xuLy8gZW5kcmVnaW9uXG4vLyByZWdpb24gZGV0ZXJtaW5lIHRlY2hub2xvZ3kgc3BlY2lmaWMgaW1wbGVtZW50YXRpb25zXG5sZXQgZmlsZVN5c3RlbTpPYmplY3RcbmxldCBwYXRoOk9iamVjdFxubGV0IFFVbml0Ok9iamVjdFxubGV0IHJlbW92ZURpcmVjdG9yeVJlY3Vyc2l2ZWx5U3luYzpGdW5jdGlvblxuaWYgKHR5cGVvZiBUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ3VuZGVmaW5lZCcgfHwgVEFSR0VUX1RFQ0hOT0xPR1kgPT09ICdub2RlJykge1xuICAgIHJlcXVpcmUoJ2NvbG9ycycpXG4gICAgZmlsZVN5c3RlbSA9IHJlcXVpcmUoJ2ZzJylcbiAgICBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4gICAgUVVuaXQgPSByZXF1aXJlKCdxdW5pdGpzJylcbiAgICByZW1vdmVEaXJlY3RvcnlSZWN1cnNpdmVseVN5bmMgPSByZXF1aXJlKCdyaW1yYWYnKS5zeW5jXG4gICAgY29uc3QgZXJyb3JzOkFycmF5PFBsYWluT2JqZWN0PiA9IFtdXG4gICAgbGV0IGluZGVudGlvbjpzdHJpbmcgPSAnJ1xuICAgIGNvbnN0IHNlZW5UZXN0czpTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoKVxuICAgIFFVbml0Lm1vZHVsZVN0YXJ0KChtb2R1bGU6UGxhaW5PYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBpZiAobW9kdWxlLm5hbWUpIHtcbiAgICAgICAgICAgIGluZGVudGlvbiA9ICcgICAgJ1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKG1vZHVsZS5uYW1lLmJvbGQuYmx1ZSlcbiAgICAgICAgfVxuICAgIH0pXG4gICAgUVVuaXQubG9nKChkZXRhaWxzOlBsYWluT2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgaWYgKCFkZXRhaWxzLnJlc3VsdClcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKGRldGFpbHMpXG4gICAgfSlcbiAgICBRVW5pdC50ZXN0RG9uZSgoZGV0YWlsczpQbGFpbk9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGlmIChzZWVuVGVzdHMuaGFzKGRldGFpbHMubmFtZSkpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgc2VlblRlc3RzLmFkZChkZXRhaWxzLm5hbWUpXG4gICAgICAgIGlmIChkZXRhaWxzLmZhaWxlZCkge1xuICAgICAgICAgICAgLy8gSWdub3JlVHlwZUNoZWNrXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oYCR7aW5kZW50aW9ufeKcliAke2RldGFpbHMubmFtZX1gLnJlZClcbiAgICAgICAgICAgIGZvciAoY29uc3QgZXJyb3I6UGxhaW5PYmplY3Qgb2YgZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtpbmRlbnRpb259JHtlcnJvci5tZXNzYWdlLnJlZH1gKVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3IuYWN0dWFsICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKChcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElnbm9yZVR5cGVDaGVja1xuICAgICAgICAgICAgICAgICAgICAgICAgYCR7aW5kZW50aW9ufWFjdHVhbDogYCArIFRvb2xzLnJlcHJlc2VudE9iamVjdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvci5hY3R1YWwsICcgICAgJywgaW5kZW50aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICApICsgYCAoJHt0eXBlb2YgZXJyb3IuYWN0dWFsfSkgIT0gYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgZXhwZWN0ZWQ6IGAgKyBUb29scy5yZXByZXNlbnRPYmplY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IuZXhwZWN0ZWQsICcgICAgJywgaW5kZW50aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICApICsgYCAoJHt0eXBlb2YgZXJyb3IuZXhwZWN0ZWR9KWBcbiAgICAgICAgICAgICAgICAgICAgKS5yZWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlcnJvcnMubGVuZ3RoID0gMFxuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIC8vIElnbm9yZVR5cGVDaGVja1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKGAke2luZGVudGlvbn3inJQgJHtkZXRhaWxzLm5hbWV9YC5ncmVlbilcbiAgICB9KVxuICAgIGNvbnN0IGRvbmU6RnVuY3Rpb24gPSAoZGV0YWlsczpQbGFpbk9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhcbiAgICAgICAgICAgIC8vIElnbm9yZVR5cGVDaGVja1xuICAgICAgICAgICAgYFRlc3RzIGNvbXBsZXRlZCBpbiAke2RldGFpbHMucnVudGltZSAvIDEwMDB9IHNlY29uZHMuYC5ncmV5KVxuICAgICAgICBjb25zdCBtZXNzYWdlOnN0cmluZyA9XG4gICAgICAgICAgICBgJHtkZXRhaWxzLnBhc3NlZH0gdGVzdHMgb2YgJHtkZXRhaWxzLnRvdGFsfSBwYXNzZWQuYFxuICAgICAgICBpZiAoZGV0YWlscy5mYWlsZWQgPiAwKVxuICAgICAgICAgICAgLy8gSWdub3JlVHlwZUNoZWNrXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bWVzc2FnZX0sICR7ZGV0YWlscy5mYWlsZWR9IGZhaWxlZC5gLnJlZC5ib2xkKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICAvLyBJZ25vcmVUeXBlQ2hlY2tcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhgJHttZXNzYWdlfWAuZ3JlZW4uYm9sZClcbiAgICAgICAgcHJvY2Vzcy5vbmNlKCdleGl0JywgKCk6dm9pZCA9PiBwcm9jZXNzLmV4aXQoZGV0YWlscy5mYWlsZWQpKVxuICAgIH1cbiAgICAvLyBOT1RFOiBGaXhlcyBxdW5pdCdzIHVnbHkgbXVsdGkgXCJkb25lKClcIiBjYWxscy5cbiAgICBsZXQgZmluYWxEb25lVGltZW91dElEOj9udW1iZXIgPSBudWxsXG4gICAgUVVuaXQuZG9uZSgoLi4ucGFyYW1ldGVyOkFycmF5PGFueT4pOnZvaWQgPT4ge1xuICAgICAgICBpZiAoZmluYWxEb25lVGltZW91dElEKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoZmluYWxEb25lVGltZW91dElEKVxuICAgICAgICAgICAgZmluYWxEb25lVGltZW91dElEID0gbnVsbFxuICAgICAgICB9XG4gICAgICAgIGZpbmFsRG9uZVRpbWVvdXRJRCA9IHNldFRpbWVvdXQoKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICBmaW5hbERvbmVUaW1lb3V0SUQgPSBzZXRUaW1lb3V0KCgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIGRvbmUoLi4ucGFyYW1ldGVyKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxufSBlbHNlXG4gICAgUVVuaXQgPSByZXF1aXJlKCdzY3JpcHQhcXVuaXRqcycpICYmIHdpbmRvdy5RVW5pdFxuLy8gZW5kcmVnaW9uXG4vLyByZWdpb24gZGVmYXVsdCB0ZXN0IHNwZWNpZmljYXRpb25cbmxldCB0ZXN0czpBcnJheTxUZXN0PiA9IFt7Y2FsbGJhY2s6IGZ1bmN0aW9uKFxuICAgIHJvdW5kVHlwZTpzdHJpbmcsIHRhcmdldFRlY2hub2xvZ3k6P3N0cmluZywgJDphbnksIGJyb3dzZXJBUEk6QnJvd3NlckFQSSxcbiAgICB0b29sczpPYmplY3QsICRib2R5RG9tTm9kZTokRG9tTm9kZVxuKTp2b2lkIHtcbiAgICB0aGlzLm1vZHVsZShgdG9vbHMgKCR7cm91bmRUeXBlfSlgKVxuICAgIC8vIHJlZ2lvbiB0ZXN0c1xuICAgIC8vIC8gcmVnaW9uIHB1YmxpYyBtZXRob2RzXG4gICAgLy8gLy8gcmVnaW9uIHNwZWNpYWxcbiAgICB0aGlzLnRlc3QoYGNvbnN0cnVjdG9yICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4gYXNzZXJ0Lm9rKFxuICAgICAgICB0b29scykpXG4gICAgdGhpcy50ZXN0KGBkZXN0cnVjdG9yICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRvb2xzLmRlc3RydWN0b3IoKSwgdG9vbHMpKVxuICAgIHRoaXMudGVzdChgaW5pdGlhbGl6ZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgY29uc3Qgc2Vjb25kVG9vbHNJbnN0YW5jZSA9ICQuVG9vbHMoe2xvZ2dpbmc6IHRydWV9KVxuICAgICAgICBjb25zdCB0aGlyZFRvb2xzSW5zdGFuY2UgPSAkLlRvb2xzKHtcbiAgICAgICAgICAgIGRvbU5vZGVTZWxlY3RvclByZWZpeDogJ2JvZHkuezF9IGRpdi57MX0nfSlcblxuICAgICAgICBhc3NlcnQubm90T2sodG9vbHMuX29wdGlvbnMubG9nZ2luZylcbiAgICAgICAgYXNzZXJ0Lm9rKHNlY29uZFRvb2xzSW5zdGFuY2UuX29wdGlvbnMubG9nZ2luZylcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgdGhpcmRUb29sc0luc3RhbmNlLl9vcHRpb25zLmRvbU5vZGVTZWxlY3RvclByZWZpeCxcbiAgICAgICAgICAgICdib2R5LnRvb2xzIGRpdi50b29scycpXG4gICAgfSlcbiAgICAvLyAvLyBlbmRyZWdpb25cbiAgICAvLyAvLyByZWdpb24gb2JqZWN0IG9yaWVudGF0aW9uXG4gICAgdGhpcy50ZXN0KGBjb250cm9sbGVyICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodG9vbHMuY29udHJvbGxlcih0b29scywgW10pLCB0b29scylcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRvb2xzLmNvbnRyb2xsZXIoJC5Ub29scy5jbGFzcywgW10sICQoXG4gICAgICAgICAgICAnYm9keSdcbiAgICAgICAgKSkuY29uc3RydWN0b3IubmFtZSwgJC5Ub29scy5jbGFzcy5uYW1lKVxuICAgIH0pXG4gICAgLy8gLy8gZW5kcmVnaW9uXG4gICAgLy8gLy8gcmVnaW9uIG11dHVhbCBleGNsdXNpb25cbiAgICB0aGlzLnRlc3QoYGFjcXVpcmVMb2NrfHJlbGVhc2VMb2NrICgke3JvdW5kVHlwZX0pYCwgYXN5bmMgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgY29uc3QgZG9uZTpGdW5jdGlvbiA9IGFzc2VydC5hc3luYygpXG4gICAgICAgIGxldCB0ZXN0VmFsdWU6Ym9vbGVhbiA9IGZhbHNlXG4gICAgICAgIGF3YWl0IHRvb2xzLmFjcXVpcmVMb2NrKCd0ZXN0JywgKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICB0ZXN0VmFsdWUgPSB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIGFzc2VydC5vayh0ZXN0VmFsdWUpXG4gICAgICAgIGFzc2VydC5vayh0b29scy5hY3F1aXJlTG9jaygndGVzdCcsICgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgdGVzdFZhbHVlID0gZmFsc2VcbiAgICAgICAgfSkgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICBhc3NlcnQub2sodGVzdFZhbHVlKVxuICAgICAgICBhc3NlcnQub2soJC5Ub29scygpLnJlbGVhc2VMb2NrKCd0ZXN0JykgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICBhc3NlcnQub2sodGVzdFZhbHVlKVxuICAgICAgICBhc3NlcnQub2sodG9vbHMucmVsZWFzZUxvY2soJ3Rlc3QnKSBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgIGFzc2VydC5ub3RPayh0ZXN0VmFsdWUpXG4gICAgICAgIGFzc2VydC5vayh0b29scy5yZWxlYXNlTG9jaygndGVzdCcpIGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXNzZXJ0Lm5vdE9rKHRlc3RWYWx1ZSlcbiAgICAgICAgYXdhaXQgdG9vbHMuYWNxdWlyZUxvY2soJ3Rlc3QnLCAoKTp2b2lkID0+IHtcbiAgICAgICAgICAgIHRlc3RWYWx1ZSA9IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgYXNzZXJ0Lm9rKHRlc3RWYWx1ZSlcbiAgICAgICAgYXNzZXJ0Lm9rKHRvb2xzLmFjcXVpcmVMb2NrKCd0ZXN0JywgKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICB0ZXN0VmFsdWUgPSBmYWxzZVxuICAgICAgICB9KSBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgIGFzc2VydC5vayh0ZXN0VmFsdWUpXG4gICAgICAgIGFzc2VydC5vayh0b29scy5hY3F1aXJlTG9jaygndGVzdCcsICgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgdGVzdFZhbHVlID0gdHJ1ZVxuICAgICAgICB9KSBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgIGFzc2VydC5vayh0ZXN0VmFsdWUpXG4gICAgICAgIHRvb2xzLnJlbGVhc2VMb2NrKCd0ZXN0JylcbiAgICAgICAgYXNzZXJ0Lm5vdE9rKHRlc3RWYWx1ZSlcbiAgICAgICAgdG9vbHMucmVsZWFzZUxvY2soJ3Rlc3QnKVxuICAgICAgICBhc3NlcnQub2sodGVzdFZhbHVlKVxuICAgICAgICB0b29scy5hY3F1aXJlTG9jaygndGVzdCcpLnRoZW4oYXN5bmMgKHJlc3VsdDpzdHJpbmcpOlByb21pc2U8YW55PiA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0LCAndGVzdCcpXG4gICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnRpbWVvdXQoKCk6dG9vbHMuY29uc3RydWN0b3IgPT4gdG9vbHMucmVsZWFzZUxvY2soXG4gICAgICAgICAgICAgICAgJ3Rlc3QnKSlcbiAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRvb2xzLmFjcXVpcmVMb2NrKCd0ZXN0JylcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHQsICd0ZXN0JylcbiAgICAgICAgICAgICQuVG9vbHMuY2xhc3MudGltZW91dCgoKTp0b29scy5jb25zdHJ1Y3RvciA9PiB0b29scy5yZWxlYXNlTG9jayhcbiAgICAgICAgICAgICAgICAndGVzdCcpKVxuICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdG9vbHMuYWNxdWlyZUxvY2soJ3Rlc3QnLCAoKTpQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmU6RnVuY3Rpb24pOlByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCAkLlRvb2xzLmNsYXNzLnRpbWVvdXQoKVxuICAgICAgICAgICAgICAgICAgICB0ZXN0VmFsdWUgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRlc3RWYWx1ZSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGFzc2VydC5ub3RPayh0ZXN0VmFsdWUpXG4gICAgICAgICAgICBkb25lKClcbiAgICAgICAgfSlcbiAgICAgICAgdG9vbHMucmVsZWFzZUxvY2soJ3Rlc3QnKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBnZXRTZW1hcGhvcmUgKCR7cm91bmRUeXBlfSlgLCBhc3luYyAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOlByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCBzZW1hcGhvcmU6T2JqZWN0ID0gJC5Ub29scy5jbGFzcy5nZXRTZW1hcGhvcmUoMilcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5xdWV1ZS5sZW5ndGgsIDApXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUubnVtYmVyT2ZGcmVlUmVzb3VyY2VzLCAyKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLm51bWJlck9mUmVzb3VyY2VzLCAyKVxuICAgICAgICBhd2FpdCBzZW1hcGhvcmUuYWNxdWlyZSgpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUucXVldWUubGVuZ3RoLCAwKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLm51bWJlck9mRnJlZVJlc291cmNlcywgMSlcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5udW1iZXJPZlJlc291cmNlcywgMilcbiAgICAgICAgYXdhaXQgc2VtYXBob3JlLmFjcXVpcmUoKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLnF1ZXVlLmxlbmd0aCwgMClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5udW1iZXJPZkZyZWVSZXNvdXJjZXMsIDApXG4gICAgICAgIHNlbWFwaG9yZS5hY3F1aXJlKClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5xdWV1ZS5sZW5ndGgsIDEpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUubnVtYmVyT2ZGcmVlUmVzb3VyY2VzLCAwKVxuICAgICAgICBzZW1hcGhvcmUuYWNxdWlyZSgpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUucXVldWUubGVuZ3RoLCAyKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLm51bWJlck9mRnJlZVJlc291cmNlcywgMClcbiAgICAgICAgc2VtYXBob3JlLnJlbGVhc2UoKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLnF1ZXVlLmxlbmd0aCwgMSlcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5udW1iZXJPZkZyZWVSZXNvdXJjZXMsIDApXG4gICAgICAgIHNlbWFwaG9yZS5yZWxlYXNlKClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5xdWV1ZS5sZW5ndGgsIDApXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUubnVtYmVyT2ZGcmVlUmVzb3VyY2VzLCAwKVxuICAgICAgICBzZW1hcGhvcmUucmVsZWFzZSgpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUucXVldWUubGVuZ3RoLCAwKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLm51bWJlck9mRnJlZVJlc291cmNlcywgMSlcbiAgICAgICAgc2VtYXBob3JlLnJlbGVhc2UoKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLnF1ZXVlLmxlbmd0aCwgMClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5udW1iZXJPZkZyZWVSZXNvdXJjZXMsIDIpXG4gICAgICAgIHNlbWFwaG9yZS5yZWxlYXNlKClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5xdWV1ZS5sZW5ndGgsIDApXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUubnVtYmVyT2ZGcmVlUmVzb3VyY2VzLCAzKVxuICAgIH0pXG4gICAgLy8gLy8gZW5kcmVnaW9uXG4gICAgLy8gLy8gcmVnaW9uIGJvb2xlYW5cbiAgICB0aGlzLnRlc3QoYGlzTnVtZXJpYyAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OmFueSBvZiBbXG4gICAgICAgICAgICAwLCAxLCAnLTEwJywgJzAnLCAweEZGLCAnMHhGRicsICc4ZTUnLCAnMy4xNDE1JywgKzEwXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5pc051bWVyaWModGVzdCkpXG4gICAgICAgIGZvciAoY29uc3QgdGVzdDphbnkgb2YgW1xuICAgICAgICAgICAgbnVsbCwgdW5kZWZpbmVkLCBmYWxzZSwgdHJ1ZSwgJycsICdhJywge30sIC9hLywgJy0weDQyJyxcbiAgICAgICAgICAgICc3LjJhY2RncycsIE5hTiwgSW5maW5pdHlcbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5ub3RPaygkLlRvb2xzLmNsYXNzLmlzTnVtZXJpYyh0ZXN0KSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgaXNXaW5kb3cgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmlzV2luZG93KGJyb3dzZXJBUEkud2luZG93KSlcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OmFueSBvZiBbbnVsbCwge30sIGJyb3dzZXJBUEldKVxuICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKCQuVG9vbHMuY2xhc3MuaXNXaW5kb3codGVzdCkpXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGlzQXJyYXlMaWtlICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbXSwgd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuaXNBcnJheUxpa2UodGVzdCkpXG4gICAgICAgIGZvciAoY29uc3QgdGVzdDphbnkgb2YgW3t9LCBudWxsLCB1bmRlZmluZWQsIGZhbHNlLCB0cnVlLCAvYS9dKVxuICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKCQuVG9vbHMuY2xhc3MuaXNBcnJheUxpa2UodGVzdCkpXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGlzQW55TWF0Y2hpbmcgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFsnJywgWycnXV0sXG4gICAgICAgICAgICBbJ3Rlc3QnLCBbL3Rlc3QvXV0sXG4gICAgICAgICAgICBbJ3Rlc3QnLCBbL2EvLCAvYi8sIC9lcy9dXSxcbiAgICAgICAgICAgIFsndGVzdCcsIFsnJywgJ3Rlc3QnXV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmlzQW55TWF0Y2hpbmcoLi4udGVzdCkpXG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFsnJywgW11dLFxuICAgICAgICAgICAgWyd0ZXN0JywgWy90ZXMkL11dLFxuICAgICAgICAgICAgWyd0ZXN0JywgWy9eZXN0L11dLFxuICAgICAgICAgICAgWyd0ZXN0JywgWy9eZXN0JC9dXSxcbiAgICAgICAgICAgIFsndGVzdCcsIFsnYSddXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKCQuVG9vbHMuY2xhc3MuaXNBbnlNYXRjaGluZyguLi50ZXN0KSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgaXNQbGFpbk9iamVjdCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBva1ZhbHVlOmFueSBvZiBbXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIHthOiAxfSxcbiAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1vYmplY3QgKi9cbiAgICAgICAgICAgIG5ldyBPYmplY3QoKVxuICAgICAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1uZXctb2JqZWN0ICovXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5pc1BsYWluT2JqZWN0KG9rVmFsdWUpKVxuICAgICAgICBmb3IgKGNvbnN0IG5vdE9rVmFsdWU6YW55IG9mIFtcbiAgICAgICAgICAgIG5ldyBTdHJpbmcoKSwgT2JqZWN0LCBudWxsLCAwLCAxLCB0cnVlLCB1bmRlZmluZWRcbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5ub3RPaygkLlRvb2xzLmNsYXNzLmlzUGxhaW5PYmplY3Qobm90T2tWYWx1ZSkpXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGlzRnVuY3Rpb24gKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3Qgb2tWYWx1ZTphbnkgb2YgW1xuICAgICAgICAgICAgT2JqZWN0LCBuZXcgRnVuY3Rpb24oJ3JldHVybiAxJyksIGZ1bmN0aW9uKCk6dm9pZCB7fSwgKCk6dm9pZCA9PiB7fVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuaXNGdW5jdGlvbihva1ZhbHVlKSlcbiAgICAgICAgZm9yIChjb25zdCBub3RPa1ZhbHVlOmFueSBvZiBbXG4gICAgICAgICAgICBudWxsLCBmYWxzZSwgMCwgMSwgdW5kZWZpbmVkLCB7fSwgbmV3IEJvb2xlYW4oKVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKCQuVG9vbHMuY2xhc3MuaXNGdW5jdGlvbihub3RPa1ZhbHVlKSlcbiAgICB9KVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBsYW5ndWFnZSBmaXhlc1xuICAgIHRoaXMudGVzdChgbW91c2VPdXRFdmVudEhhbmRsZXJGaXggKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PlxuICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5tb3VzZU91dEV2ZW50SGFuZGxlckZpeCgoKTp2b2lkID0+IHt9KSkpXG4gICAgLy8gLy8gZW5kcmVnaW9uXG4gICAgLy8gLy8gcmVnaW9uIGxvZ2dpbmdcbiAgICB0aGlzLnRlc3QoYGxvZyAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgdG9vbHMubG9nKCd0ZXN0JyksIHRvb2xzKSlcbiAgICB0aGlzLnRlc3QoYGluZm8gKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PlxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodG9vbHMuaW5mbygndGVzdCB7MH0nKSwgdG9vbHMpKVxuICAgIHRoaXMudGVzdChgZGVidWcgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PlxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodG9vbHMuZGVidWcoJ3Rlc3QnKSwgdG9vbHMpKVxuICAgIC8vIE5PVEU6IFRoaXMgdGVzdCBicmVha3MgamF2YVNjcmlwdCBtb2R1bGVzIGluIHN0cmljdCBtb2RlLlxuICAgIHRoaXMuc2tpcChgJHtyb3VuZFR5cGV9LWVycm9yYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4gYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICB0b29scy5lcnJvcignaWdub3JlIHRoaXMgZXJyb3IsIGl0IGlzIG9ubHkgYSB7MX0nLCAndGVzdCcpLCB0b29scykpXG4gICAgdGhpcy50ZXN0KGB3YXJuICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRvb2xzLndhcm4oJ3Rlc3QnKSwgdG9vbHMpKVxuICAgIHRoaXMudGVzdChgc2hvdyAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgWzEsICcxIChUeXBlOiBcIm51bWJlclwiKSddLFxuICAgICAgICAgICAgW251bGwsICdudWxsIChUeXBlOiBcIm51bGxcIiknXSxcbiAgICAgICAgICAgIFsvYS8sICcvYS8gKFR5cGU6IFwicmVnZXhwXCIpJ10sXG4gICAgICAgICAgICBbJ2hhbnMnLCAnaGFucyAoVHlwZTogXCJzdHJpbmdcIiknXSxcbiAgICAgICAgICAgIFt7QTogJ2EnLCBCOiAnYid9LCAnQTogYSAoVHlwZTogXCJzdHJpbmdcIilcXG5COiBiIChUeXBlOiBcInN0cmluZ1wiKSddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5zaG93KHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgICAgICBhc3NlcnQub2soKG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb250cm9sLXJlZ2V4ICovXG4gICAgICAgICAgICAnXigufFxcbnxcXHJ8XFxcXHUyMDI4fFxcXFx1MjAyOSkrXFxcXChUeXBlOiBcImZ1bmN0aW9uXCJcXFxcKSQnXG4gICAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnRyb2wtcmVnZXggKi9cbiAgICAgICAgKSkudGVzdCgkLlRvb2xzLmNsYXNzLnNob3coJC5Ub29scykpKVxuICAgIH0pXG4gICAgLy8gLy8gZW5kcmVnaW9uXG4gICAgLy8gLy8gcmVnaW9uIGRvbSBub2RlIGhhbmRsaW5nXG4gICAgaWYgKHJvdW5kVHlwZSA9PT0gJ2Z1bGwnKSB7XG4gICAgICAgIC8vIHJlZ2lvbiBnZXR0ZXJcbiAgICAgICAgdGhpcy50ZXN0KGBnZXQgbm9ybWFsaXplZENsYXNzTmFtZXMgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgICAgICk6dm9pZCA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJCgnPGRpdj4nKS5Ub29scyhcbiAgICAgICAgICAgICAgICAnbm9ybWFsaXplZENsYXNzTmFtZXMnXG4gICAgICAgICAgICApLiRkb21Ob2RlLnByb3AoJ291dGVySFRNTCcpLCAkKCc8ZGl2PicpLnByb3AoJ291dGVySFRNTCcpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQoJzxkaXYgY2xhc3M+JykuVG9vbHMoXG4gICAgICAgICAgICAgICAgJ25vcm1hbGl6ZWRDbGFzc05hbWVzJ1xuICAgICAgICAgICAgKS4kZG9tTm9kZS5odG1sKCksICQoJzxkaXY+JykuaHRtbCgpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQoJzxkaXYgY2xhc3M9XCJcIj4nKS5Ub29scyhcbiAgICAgICAgICAgICAgICAnbm9ybWFsaXplZENsYXNzTmFtZXMnXG4gICAgICAgICAgICApLiRkb21Ob2RlLmh0bWwoKSwgJCgnPGRpdj4nKS5odG1sKCkpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJCgnPGRpdiBjbGFzcz1cImFcIj4nKS5Ub29scyhcbiAgICAgICAgICAgICAgICAnbm9ybWFsaXplZENsYXNzTmFtZXMnXG4gICAgICAgICAgICApLiRkb21Ob2RlLnByb3AoJ291dGVySFRNTCcpLCAkKCc8ZGl2IGNsYXNzPVwiYVwiPicpLnByb3AoXG4gICAgICAgICAgICAgICAgJ291dGVySFRNTCcpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQoJzxkaXYgY2xhc3M9XCJiIGFcIj4nKS5Ub29scyhcbiAgICAgICAgICAgICAgICAnbm9ybWFsaXplZENsYXNzTmFtZXMnXG4gICAgICAgICAgICApLiRkb21Ob2RlLnByb3AoJ291dGVySFRNTCcpLCAkKCc8ZGl2IGNsYXNzPVwiYSBiXCI+JykucHJvcChcbiAgICAgICAgICAgICAgICAnb3V0ZXJIVE1MJykpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJChcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImIgYVwiPjxwcmUgY2xhc3M9XCJjIGIgYVwiPjwvcHJlPjwvZGl2PidcbiAgICAgICAgICAgICkuVG9vbHMoJ25vcm1hbGl6ZWRDbGFzc05hbWVzJykuJGRvbU5vZGUucHJvcCgnb3V0ZXJIVE1MJyksXG4gICAgICAgICAgICAkKCc8ZGl2IGNsYXNzPVwiYSBiXCI+PHByZSBjbGFzcz1cImEgYiBjXCI+PC9wcmU+PC9kaXY+JykucHJvcChcbiAgICAgICAgICAgICAgICAnb3V0ZXJIVE1MJykpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudGVzdChgZ2V0IG5vcm1hbGl6ZWRTdHlsZXMgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgICAgICk6dm9pZCA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJCgnPGRpdj4nKS5Ub29scyhcbiAgICAgICAgICAgICAgICAnbm9ybWFsaXplZFN0eWxlcydcbiAgICAgICAgICAgICkuJGRvbU5vZGUucHJvcCgnb3V0ZXJIVE1MJyksICQoJzxkaXY+JykucHJvcCgnb3V0ZXJIVE1MJykpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJCgnPGRpdiBzdHlsZT4nKS5Ub29scyhcbiAgICAgICAgICAgICAgICAnbm9ybWFsaXplZFN0eWxlcydcbiAgICAgICAgICAgICkuJGRvbU5vZGUuaHRtbCgpLCAkKCc8ZGl2PicpLmh0bWwoKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkKCc8ZGl2IHN0eWxlPVwiXCI+JykuVG9vbHMoXG4gICAgICAgICAgICAgICAgJ25vcm1hbGl6ZWRTdHlsZXMnXG4gICAgICAgICAgICApLiRkb21Ob2RlLmh0bWwoKSwgJCgnPGRpdj4nKS5odG1sKCkpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJChcbiAgICAgICAgICAgICAgICAnPGRpdiBzdHlsZT1cImJvcmRlcjogMXB4IHNvbGlkICByZWQgO1wiPidcbiAgICAgICAgICAgICkuVG9vbHMoJ25vcm1hbGl6ZWRTdHlsZXMnKS4kZG9tTm9kZS5wcm9wKCdvdXRlckhUTUwnKSwgJChcbiAgICAgICAgICAgICAgICAnPGRpdiBzdHlsZT1cImJvcmRlcjoxcHggc29saWQgcmVkXCI+J1xuICAgICAgICAgICAgKS5wcm9wKCdvdXRlckhUTUwnKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkKFxuICAgICAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwid2lkdGg6IDUwcHg7aGVpZ2h0OiAxMDBweDtcIj4nXG4gICAgICAgICAgICApLlRvb2xzKCdub3JtYWxpemVkU3R5bGVzJykuJGRvbU5vZGUucHJvcCgnb3V0ZXJIVE1MJyksICQoXG4gICAgICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJoZWlnaHQ6MTAwcHg7d2lkdGg6NTBweFwiPidcbiAgICAgICAgICAgICkucHJvcCgnb3V0ZXJIVE1MJykpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJChcbiAgICAgICAgICAgICAgICAnPGRpdiBzdHlsZT1cIjt3aWR0aDogNTBweCA7IGhlaWdodDoxMDBweFwiPidcbiAgICAgICAgICAgICkuVG9vbHMoJ25vcm1hbGl6ZWRTdHlsZXMnKS4kZG9tTm9kZS5wcm9wKCdvdXRlckhUTUwnKSwgJChcbiAgICAgICAgICAgICAgICAnPGRpdiBzdHlsZT1cImhlaWdodDoxMDBweDt3aWR0aDo1MHB4XCI+J1xuICAgICAgICAgICAgKS5wcm9wKCdvdXRlckhUTUwnKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkKFxuICAgICAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwid2lkdGg6MTBweDtoZWlnaHQ6NTBweFwiPicgK1xuICAgICAgICAgICAgICAgICcgICAgPHByZSBzdHlsZT1cIjs7d2lkdGg6MnB4O2hlaWdodDoxcHg7IGNvbG9yOiByZWQ7IFwiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPC9wcmU+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2PidcbiAgICAgICAgICAgICkuVG9vbHMoJ25vcm1hbGl6ZWRTdHlsZXMnKS4kZG9tTm9kZS5wcm9wKCdvdXRlckhUTUwnKSxcbiAgICAgICAgICAgICQoXG4gICAgICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJoZWlnaHQ6NTBweDt3aWR0aDoxMHB4XCI+JyArXG4gICAgICAgICAgICAgICAgJyAgICA8cHJlIHN0eWxlPVwiY29sb3I6cmVkO2hlaWdodDoxcHg7d2lkdGg6MnB4XCI+PC9wcmU+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2PidcbiAgICAgICAgICAgICkucHJvcCgnb3V0ZXJIVE1MJykpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudGVzdChgZ2V0IHN0eWxlICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgICAgIFsnPHNwYW4+Jywge31dLFxuICAgICAgICAgICAgICAgIFsnPHNwYW4+aGFuczwvc3Bhbj4nLCB7fV0sXG4gICAgICAgICAgICAgICAgWyc8c3BhbiBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIj48L3NwYW4+Jywge2Rpc3BsYXk6ICdibG9jayd9XSxcbiAgICAgICAgICAgICAgICBbJzxzcGFuIHN0eWxlPVwiZGlzcGxheTpibG9jaztmbG9hdDpsZWZ0XCI+PC9zcGFuPicsIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJywgZmxvYXQ6ICdsZWZ0J1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICBdKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgJGRvbU5vZGU6JERvbU5vZGUgPSAkKHRlc3RbMF0pXG4gICAgICAgICAgICAgICAgJGJvZHlEb21Ob2RlLmFwcGVuZCgkZG9tTm9kZSlcbiAgICAgICAgICAgICAgICBjb25zdCBzdHlsZXM6UGxhaW5PYmplY3QgPSAkZG9tTm9kZS5Ub29scygnc3R5bGUnKVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcGVydHlOYW1lOnN0cmluZyBpbiB0ZXN0WzFdKVxuICAgICAgICAgICAgICAgICAgICBpZiAodGVzdFsxXS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soc3R5bGVzLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzW3Byb3BlcnR5TmFtZV0sIHRlc3RbMV1bcHJvcGVydHlOYW1lXSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRkb21Ob2RlLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudGVzdChgZ2V0IHRleHQgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8c3RyaW5nPiBvZiBbXG4gICAgICAgICAgICAgICAgWyc8ZGl2PicsICcnXSxcbiAgICAgICAgICAgICAgICBbJzxkaXY+aGFuczwvZGl2PicsICdoYW5zJ10sXG4gICAgICAgICAgICAgICAgWyc8ZGl2PjxkaXY+aGFuczwvZGl2PC9kaXY+JywgJyddLFxuICAgICAgICAgICAgICAgIFsnPGRpdj5oYW5zPGRpdj5wZXRlcjwvZGl2PjwvZGl2PicsICdoYW5zJ11cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQodGVzdFswXSkuVG9vbHMoJ3RleHQnKSwgdGVzdFsxXSlcbiAgICAgICAgfSlcbiAgICAgICAgLy8gZW5kcmVnaW9uXG4gICAgICAgIHRoaXMudGVzdChgaXNFcXVpdmFsZW50RE9NICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgICAgIFsndGVzdCcsICd0ZXN0J10sXG4gICAgICAgICAgICAgICAgWyd0ZXN0IHRlc3QnLCAndGVzdCB0ZXN0J10sXG4gICAgICAgICAgICAgICAgWyc8ZGl2PicsICc8ZGl2PiddLFxuICAgICAgICAgICAgICAgIFsnPGRpdiBjbGFzcz4nLCAnPGRpdj4nXSxcbiAgICAgICAgICAgICAgICBbJzxkaXYgY2xhc3M9XCJcIj4nLCAnPGRpdj4nXSxcbiAgICAgICAgICAgICAgICBbJzxkaXYgc3R5bGU+JywgJzxkaXY+J10sXG4gICAgICAgICAgICAgICAgWyc8ZGl2IHN0eWxlPVwiXCI+JywgJzxkaXY+J10sXG4gICAgICAgICAgICAgICAgWyc8ZGl2PjwvZGl2PicsICc8ZGl2PiddLFxuICAgICAgICAgICAgICAgIFsnPGRpdiBjbGFzcz1cImFcIj48L2Rpdj4nLCAnPGRpdiBjbGFzcz1cImFcIj48L2Rpdj4nXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICQoJzxhIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwiYVwiPjwvYT4nKSxcbiAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYVwiIHRhcmdldD1cIl9ibGFua1wiPjwvYT4nXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICc8YSB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImFcIj48L2E+JyxcbiAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYVwiIHRhcmdldD1cIl9ibGFua1wiPjwvYT4nXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICc8YSB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImFcIj48ZGl2IGI9XCIzXCIgYT1cIjJcIj48L2Rpdj48L2E+JyxcbiAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYVwiIHRhcmdldD1cIl9ibGFua1wiPjxkaXYgYT1cIjJcIiBiPVwiM1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+PC9hPidcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJzxhIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwiYiBhXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICcgICA8ZGl2IGI9XCIzXCIgYT1cIjJcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvYT4nLFxuICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJhIGJcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJyAgIDxkaXYgYT1cIjJcIiBiPVwiM1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPC9hPidcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFsnPGRpdj5hPC9kaXY+PGRpdj5iPC9kaXY+JywgJzxkaXY+YTwvZGl2PjxkaXY+YjwvZGl2PiddLFxuICAgICAgICAgICAgICAgIFsnPGRpdj5hPC9kaXY+YicsICc8ZGl2PmE8L2Rpdj5iJ10sXG4gICAgICAgICAgICAgICAgWyc8YnI+JywgJzxiciAvPiddLFxuICAgICAgICAgICAgICAgIFsnPGRpdj48YnI+PGJyIC8+PC9kaXY+JywgJzxkaXY+PGJyIC8+PGJyIC8+PC9kaXY+J10sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnIDxkaXYgc3R5bGU9XCJcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJ2dlcm1hbjwhLS1kZURFLS0+PCEtLWVuVVM6IGVuZ2xpc2ggLS0+IDwvZGl2PicsXG4gICAgICAgICAgICAgICAgICAgICcgPGRpdiBzdHlsZT1cIlwiPmdlcm1hbjwhLS1kZURFLS0+PCEtLWVuVVM6IGVuZ2xpc2ggLS0+ICcgK1xuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgWydhPGJyPicsICdhPGJyIC8+JywgdHJ1ZV1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuaXNFcXVpdmFsZW50RE9NKC4uLnRlc3QpKVxuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgICAgIFsndGVzdCcsICcnXSxcbiAgICAgICAgICAgICAgICBbJ3Rlc3QnLCAnaGFucyddLFxuICAgICAgICAgICAgICAgIFsndGVzdCB0ZXN0JywgJ3Rlc3R0ZXN0J10sXG4gICAgICAgICAgICAgICAgWyd0ZXN0IHRlc3Q6JywgJyddLFxuICAgICAgICAgICAgICAgIFsnPGRpdiBjbGFzcz1cImFcIj48L2Rpdj4nLCAnPGRpdj4nXSxcbiAgICAgICAgICAgICAgICBbJCgnPGEgY2xhc3M9XCJhXCI+PC9hPicpLCAnPGEgY2xhc3M9XCJhXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PC9hPiddLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJzxhIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwiYVwiPjxkaXYgYT1cIjJcIj48L2Rpdj48L2E+JyxcbiAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYVwiIHRhcmdldD1cIl9ibGFua1wiPjwvYT4nXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbJzxkaXY+YTwvZGl2PmInLCAnPGRpdj5hPC9kaXY+YyddLFxuICAgICAgICAgICAgICAgIFsnIDxkaXY+YTwvZGl2PicsICc8ZGl2PmE8L2Rpdj4nXSxcbiAgICAgICAgICAgICAgICBbJzxkaXY+YTwvZGl2PjxkaXY+YmM8L2Rpdj4nLCAnPGRpdj5hPC9kaXY+PGRpdj5iPC9kaXY+J10sXG4gICAgICAgICAgICAgICAgWyd0ZXh0JywgJ3RleHQgYSddLFxuICAgICAgICAgICAgICAgIFsndGV4dCcsICd0ZXh0IGEnXSxcbiAgICAgICAgICAgICAgICBbJ3RleHQnLCAndGV4dCBhICYgKyddXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIGFzc2VydC5ub3RPaygkLlRvb2xzLmNsYXNzLmlzRXF1aXZhbGVudERPTSguLi50ZXN0KSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgaWYgKHJvdW5kVHlwZSA9PT0gJ2Z1bGwnKVxuICAgICAgICB0aGlzLnRlc3QoYGdldFBvc2l0aW9uUmVsYXRpdmVUb1ZpZXdwb3J0ICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOnZvaWQgPT4gYXNzZXJ0Lm9rKFtcbiAgICAgICAgICAgICdhYm92ZScsICdsZWZ0JywgJ3JpZ2h0JywgJ2JlbG93JywgJ2luJ1xuICAgICAgICBdLmluY2x1ZGVzKHRvb2xzLmdldFBvc2l0aW9uUmVsYXRpdmVUb1ZpZXdwb3J0KCkpKSlcbiAgICB0aGlzLnRlc3QoYGdlbmVyYXRlRGlyZWN0aXZlU2VsZWN0b3IgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8c3RyaW5nPiBvZiBbXG4gICAgICAgICAgICBbJ2EtYicsICdhLWIsIC5hLWIsIFthLWJdLCBbZGF0YS1hLWJdLCBbeC1hLWJdLCBbYVxcXFw6Yl0sIFthX2JdJ10sXG4gICAgICAgICAgICBbJ2FCJywgJ2EtYiwgLmEtYiwgW2EtYl0sIFtkYXRhLWEtYl0sIFt4LWEtYl0sIFthXFxcXDpiXSwgW2FfYl0nXSxcbiAgICAgICAgICAgIFsnYScsICdhLCAuYSwgW2FdLCBbZGF0YS1hXSwgW3gtYV0nXSxcbiAgICAgICAgICAgIFsnYWEnLCAnYWEsIC5hYSwgW2FhXSwgW2RhdGEtYWFdLCBbeC1hYV0nXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnYWFCQicsXG4gICAgICAgICAgICAgICAgJ2FhLWJiLCAuYWEtYmIsIFthYS1iYl0sIFtkYXRhLWFhLWJiXSwgW3gtYWEtYmJdLCBbYWFcXFxcOmJiXSwnICtcbiAgICAgICAgICAgICAgICAnIFthYV9iYl0nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICdhYUJiQ2NEZCcsXG4gICAgICAgICAgICAgICAgJ2FhLWJiLWNjLWRkLCAuYWEtYmItY2MtZGQsIFthYS1iYi1jYy1kZF0sICcgK1xuICAgICAgICAgICAgICAgICdbZGF0YS1hYS1iYi1jYy1kZF0sIFt4LWFhLWJiLWNjLWRkXSwgJyArXG4gICAgICAgICAgICAgICAgJ1thYVxcXFw6YmJcXFxcOmNjXFxcXDpkZF0sIFthYV9iYl9jY19kZF0nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICdtY2VIUkVGJyxcbiAgICAgICAgICAgICAgICAnbWNlLWhyZWYsIC5tY2UtaHJlZiwgW21jZS1ocmVmXSwgW2RhdGEtbWNlLWhyZWZdLCAnICtcbiAgICAgICAgICAgICAgICAnW3gtbWNlLWhyZWZdLCBbbWNlXFxcXDpocmVmXSwgW21jZV9ocmVmXSdcbiAgICAgICAgICAgIF1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkLlRvb2xzLmNsYXNzLmdlbmVyYXRlRGlyZWN0aXZlU2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgdGVzdFswXVxuICAgICAgICAgICAgKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIGlmIChyb3VuZFR5cGUgPT09ICdmdWxsJylcbiAgICAgICAgdGhpcy50ZXN0KGByZW1vdmVEaXJlY3RpdmUgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgICAgICBjb25zdCAkbG9jYWxCb2R5RG9tTm9kZSA9ICRib2R5RG9tTm9kZS5Ub29scyhcbiAgICAgICAgICAgICAgICAncmVtb3ZlRGlyZWN0aXZlJywgJ2EnKVxuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKCRsb2NhbEJvZHlEb21Ob2RlLlRvb2xzKCkucmVtb3ZlRGlyZWN0aXZlKFxuICAgICAgICAgICAgICAgICdhJ1xuICAgICAgICAgICAgKSwgJGxvY2FsQm9keURvbU5vZGUpXG4gICAgICAgIH0pXG4gICAgdGhpcy50ZXN0KGBnZXROb3JtYWxpemVkRGlyZWN0aXZlTmFtZSAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxzdHJpbmc+IG9mIFtcbiAgICAgICAgICAgIFsnZGF0YS1hJywgJ2EnXSxcbiAgICAgICAgICAgIFsneC1hJywgJ2EnXSxcbiAgICAgICAgICAgIFsnZGF0YS1hLWJiJywgJ2FCYiddLFxuICAgICAgICAgICAgWyd4OmE6YicsICdhQiddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5nZXROb3JtYWxpemVkRGlyZWN0aXZlTmFtZSh0ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIGlmIChyb3VuZFR5cGUgPT09ICdmdWxsJylcbiAgICAgICAgdGhpcy50ZXN0KGBnZXREaXJlY3RpdmVWYWx1ZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+XG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwoJCgnYm9keScpLlRvb2xzKCdnZXREaXJlY3RpdmVWYWx1ZScsICdhJyksIG51bGwpKVxuICAgIHRoaXMudGVzdChgc2xpY2VEb21Ob2RlU2VsZWN0b3JQcmVmaXggKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodG9vbHMuc2xpY2VEb21Ob2RlU2VsZWN0b3JQcmVmaXgoJ2JvZHkgZGl2JyksICdkaXYnKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scyh7XG4gICAgICAgICAgICBkb21Ob2RlU2VsZWN0b3JQcmVmaXg6ICdib2R5IGRpdidcbiAgICAgICAgfSkuc2xpY2VEb21Ob2RlU2VsZWN0b3JQcmVmaXgoJ2JvZHkgZGl2JyksICcnKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scyh7XG4gICAgICAgICAgICBkb21Ob2RlU2VsZWN0b3JQcmVmaXg6ICcnXG4gICAgICAgIH0pLnNsaWNlRG9tTm9kZVNlbGVjdG9yUHJlZml4KCdib2R5IGRpdicpLCAnYm9keSBkaXYnKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBnZXREb21Ob2RlTmFtZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PHN0cmluZz4gb2YgW1xuICAgICAgICAgICAgWydkaXYnLCAnZGl2J10sXG4gICAgICAgICAgICBbJzxkaXY+JywgJ2RpdiddLFxuICAgICAgICAgICAgWyc8ZGl2IC8+JywgJ2RpdiddLFxuICAgICAgICAgICAgWyc8ZGl2PjwvZGl2PicsICdkaXYnXSxcbiAgICAgICAgICAgIFsnYScsICdhJ10sXG4gICAgICAgICAgICBbJzxhPicsICdhJ10sXG4gICAgICAgICAgICBbJzxhIC8+JywgJ2EnXSxcbiAgICAgICAgICAgIFsnPGE+PC9hPicsICdhJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkLlRvb2xzLmNsYXNzLmdldERvbU5vZGVOYW1lKHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgaWYgKHJvdW5kVHlwZSA9PT0gJ2Z1bGwnKVxuICAgICAgICB0aGlzLnRlc3QoYGdyYWJEb21Ob2RlICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1bml0OiAnYm9keSBkaXYjcXVuaXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVuaXRGaXh0dXJlOiAnYm9keSBkaXYjcXVuaXQtZml4dHVyZSdcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1bml0OiAkKCdib2R5IGRpdiNxdW5pdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVuaXRGaXh0dXJlOiAkKCdib2R5IGRpdiNxdW5pdC1maXh0dXJlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6ICQoJ2JvZHknKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdW5pdDogJ2RpdiNxdW5pdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdW5pdEZpeHR1cmU6ICdkaXYjcXVuaXQtZml4dHVyZSdcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogJCgnYm9keScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVuaXQ6ICQoJ2JvZHkgZGl2I3F1bml0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBxdW5pdEZpeHR1cmU6ICQoJ2JvZHkgZGl2I3F1bml0LWZpeHR1cmUnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdW5pdDogJ2RpdiNxdW5pdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVuaXRGaXh0dXJlOiAnZGl2I3F1bml0LWZpeHR1cmUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2JvZHknXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogJCgnYm9keScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVuaXQ6ICQoJ2JvZHknKS5maW5kKCdkaXYjcXVuaXQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1bml0Rml4dHVyZTogJCgnYm9keScpLmZpbmQoJ2RpdiNxdW5pdC1maXh0dXJlJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCAkZG9tTm9kZXMgPSB0b29scy5ncmFiRG9tTm9kZSguLi50ZXN0WzBdKVxuICAgICAgICAgICAgICAgIGRlbGV0ZSAkZG9tTm9kZXMud2luZG93XG4gICAgICAgICAgICAgICAgZGVsZXRlICRkb21Ob2Rlcy5kb2N1bWVudFxuICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJGRvbU5vZGVzLCB0ZXN0WzFdKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBzY29wZVxuICAgIHRoaXMudGVzdChgaXNvbGF0ZVNjb3BlICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuaXNvbGF0ZVNjb3BlKHt9KSwge30pXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5pc29sYXRlU2NvcGUoe2E6IDJ9KSwge2E6IDJ9KVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuaXNvbGF0ZVNjb3BlKHtcbiAgICAgICAgICAgIGE6IDIsIGI6IHthOiBbMSwgMl19XG4gICAgICAgIH0pLCB7YTogMiwgYjoge2E6IFsxLCAyXX19KVxuICAgICAgICBsZXQgc2NvcGUgPSBmdW5jdGlvbigpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5hID0gMlxuICAgICAgICB9XG4gICAgICAgIHNjb3BlLnByb3RvdHlwZSA9IHtiOiAyLCBfYTogNX1cbiAgICAgICAgc2NvcGUgPSBuZXcgc2NvcGUoKVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuaXNvbGF0ZVNjb3BlKHNjb3BlLCBbJ18nXSksIHtcbiAgICAgICAgICAgIF9hOiA1LCBhOiAyLCBiOiB1bmRlZmluZWRcbiAgICAgICAgfSlcbiAgICAgICAgc2NvcGUuYiA9IDNcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuaXNvbGF0ZVNjb3BlKHNjb3BlLCBbJ18nXSksIHtfYTogNSwgYTogMiwgYjogM30pXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5pc29sYXRlU2NvcGUoc2NvcGUpLCB7XG4gICAgICAgICAgICBfYTogdW5kZWZpbmVkLCBhOiAyLCBiOiAzfSlcbiAgICAgICAgc2NvcGUuX2EgPSA2XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmlzb2xhdGVTY29wZShzY29wZSwgWydfJ10pLCB7X2E6IDYsIGE6IDIsIGI6IDN9KVxuICAgICAgICBzY29wZSA9IGZ1bmN0aW9uKCk6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLmEgPSAyXG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUucHJvdG90eXBlID0ge2I6IDN9XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5pc29sYXRlU2NvcGUoXG4gICAgICAgICAgICBuZXcgc2NvcGUoKSwgWydiJ11cbiAgICAgICAgKSwge2E6IDIsIGI6IDN9KVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuaXNvbGF0ZVNjb3BlKG5ldyBzY29wZSgpKSwge1xuICAgICAgICAgICAgYTogMiwgYjogdW5kZWZpbmVkXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGRldGVybWluZVVuaXF1ZVNjb3BlTmFtZSAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmRldGVybWluZVVuaXF1ZVNjb3BlTmFtZSgpLnN0YXJ0c1dpdGgoXG4gICAgICAgICAgICAnY2FsbGJhY2snKSlcbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuZGV0ZXJtaW5lVW5pcXVlU2NvcGVOYW1lKCdoYW5zJykuc3RhcnRzV2l0aChcbiAgICAgICAgICAgICdoYW5zJykpXG4gICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmRldGVybWluZVVuaXF1ZVNjb3BlTmFtZShcbiAgICAgICAgICAgICdoYW5zJywgJycsIHt9XG4gICAgICAgICkuc3RhcnRzV2l0aCgnaGFucycpKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5kZXRlcm1pbmVVbmlxdWVTY29wZU5hbWUoXG4gICAgICAgICAgICAnaGFucycsICcnLCB7fSwgJ3BldGVyJ1xuICAgICAgICApLCAncGV0ZXInKVxuICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5kZXRlcm1pbmVVbmlxdWVTY29wZU5hbWUoXG4gICAgICAgICAgICAnaGFucycsICcnLCB7cGV0ZXI6IDJ9LCAncGV0ZXInXG4gICAgICAgICkuc3RhcnRzV2l0aCgnaGFucycpKVxuICAgICAgICBjb25zdCBuYW1lOnN0cmluZyA9ICQuVG9vbHMuY2xhc3MuZGV0ZXJtaW5lVW5pcXVlU2NvcGVOYW1lKFxuICAgICAgICAgICAgJ2hhbnMnLCAna2xhdXMnLCB7cGV0ZXI6IDJ9LCAncGV0ZXInKVxuICAgICAgICBhc3NlcnQub2sobmFtZS5zdGFydHNXaXRoKCdoYW5zJykpXG4gICAgICAgIGFzc2VydC5vayhuYW1lLmVuZHNXaXRoKCdrbGF1cycpKVxuICAgICAgICBhc3NlcnQub2sobmFtZS5sZW5ndGggPiAnaGFucycubGVuZ3RoICsgJ2tsYXVzJy5sZW5ndGgpXG4gICAgfSlcbiAgICAvLyAvLyBlbmRyZWdpb25cbiAgICAvLyAvLyByZWdpb24gZnVuY3Rpb24gaGFuZGxpbmdcbiAgICB0aGlzLnRlc3QoYGdldFBhcmFtZXRlck5hbWVzICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbZnVuY3Rpb24oKTp2b2lkIHt9LCBbXV0sXG4gICAgICAgICAgICBbJ2Z1bmN0aW9uKCkge30nLCBbXV0sXG4gICAgICAgICAgICBbJ2Z1bmN0aW9uKGEsIC8qIGFzZCovIGIsIGMvKiovKSB7fScsIFsnYScsICdiJywgJ2MnXV0sXG4gICAgICAgICAgICBbJyhhLCAvKmFzZCovYiwgYy8qKi8pID0+IHt9JywgWydhJywgJ2InLCAnYyddXSxcbiAgICAgICAgICAgIFtgKGEsIC8qYXNkKi9iLCBjLyoqLykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAyXG4gICAgICAgICAgICB9YCwgWydhJywgJ2InLCAnYyddXSxcbiAgICAgICAgICAgIFsnKGEsIC8qIGFzZCovYiwgYy8qICovKSA9PiAyJywgWydhJywgJ2InLCAnYyddXSxcbiAgICAgICAgICAgIFsnKGEsIC8qIGFzZCovYiA9IDIsIGMvKiAqLykgPT4gMicsIFsnYScsICdiJywgJ2MnXV0sXG4gICAgICAgICAgICBbJ2EgPT4gMicsIFsnYSddXSxcbiAgICAgICAgICAgIFtgY2xhc3MgQSB7XG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3IoYSwgYiwgYykge31cbiAgICAgICAgICAgICAgICBhKCkge31cbiAgICAgICAgICAgIH1gLCBbJ2EnLCAnYicsICdjJ11dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuZ2V0UGFyYW1ldGVyTmFtZXModGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGlkZW50aXR5ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbMiwgMl0sXG4gICAgICAgICAgICBbJycsICcnXSxcbiAgICAgICAgICAgIFt1bmRlZmluZWQsIHVuZGVmaW5lZF0sXG4gICAgICAgICAgICBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBbJ2hhbnMnLCAnaGFucyddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5pZGVudGl0eSh0ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuaWRlbnRpdHkoe30pICE9PSB7fSlcbiAgICAgICAgY29uc3QgdGVzdE9iamVjdCA9IHt9XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkLlRvb2xzLmNsYXNzLmlkZW50aXR5KHRlc3RPYmplY3QpLCB0ZXN0T2JqZWN0KVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBpbnZlcnRBcnJheUZpbHRlciAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmludmVydEFycmF5RmlsdGVyKFxuICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5hcnJheURlbGV0ZUVtcHR5SXRlbXNcbiAgICAgICAgKShbe2E6IG51bGx9XSksIFt7YTogbnVsbH1dKVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuaW52ZXJ0QXJyYXlGaWx0ZXIoXG4gICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmFycmF5RXh0cmFjdElmTWF0Y2hlc1xuICAgICAgICApKFsnYScsICdiJ10sICdeYSQnKSwgWydiJ10pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHRpbWVvdXQgKCR7cm91bmRUeXBlfSlgLCBhc3luYyAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOlByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCBkb25lOkZ1bmN0aW9uID0gYXNzZXJ0LmFzeW5jKClcbiAgICAgICAgYXNzZXJ0Lm5vdE9rKGF3YWl0ICQuVG9vbHMuY2xhc3MudGltZW91dCgpKVxuICAgICAgICBhc3NlcnQubm90T2soYXdhaXQgJC5Ub29scy5jbGFzcy50aW1lb3V0KDApKVxuICAgICAgICBhc3NlcnQubm90T2soYXdhaXQgJC5Ub29scy5jbGFzcy50aW1lb3V0KDEpKVxuICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy50aW1lb3V0KCkgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy50aW1lb3V0KCkuaGFzT3duUHJvcGVydHkoJ2NsZWFyJykpXG4gICAgICAgIGxldCB0ZXN0OmJvb2xlYW4gPSBmYWxzZVxuICAgICAgICBjb25zdCByZXN1bHQ6UHJvbWlzZTxib29sZWFuPiA9ICQuVG9vbHMuY2xhc3MudGltZW91dCgxMCAqKiAyMCwgdHJ1ZSlcbiAgICAgICAgcmVzdWx0LmNhdGNoKCgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgdGVzdCA9IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgLy8gSWdub3JlVHlwZUNoZWNrXG4gICAgICAgIHJlc3VsdC5jbGVhcigpXG4gICAgICAgIGxldCB0ZXN0Mjpib29sZWFuID0gZmFsc2VcbiAgICAgICAgYXNzZXJ0Lm5vdE9rKGF3YWl0ICQuVG9vbHMuY2xhc3MudGltZW91dCgoKTp2b2lkID0+IHtcbiAgICAgICAgICAgIHRlc3QyID0gdHJ1ZVxuICAgICAgICB9KSlcbiAgICAgICAgYXNzZXJ0Lm9rKHRlc3QpXG4gICAgICAgIGFzc2VydC5vayh0ZXN0MilcbiAgICAgICAgZG9uZSgpXG4gICAgfSlcbiAgICAvLyAvLyBlbmRyZWdpb25cbiAgICAvLyAvLyByZWdpb24gZXZlbnRcbiAgICB0aGlzLnRlc3QoYGRlYm91bmNlICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBsZXQgdGVzdFZhbHVlID0gZmFsc2VcbiAgICAgICAgJC5Ub29scy5jbGFzcy5kZWJvdW5jZSgoKTp2b2lkID0+IHtcbiAgICAgICAgICAgIHRlc3RWYWx1ZSA9IHRydWVcbiAgICAgICAgfSkoKVxuICAgICAgICBhc3NlcnQub2sodGVzdFZhbHVlKVxuICAgICAgICBjb25zdCBjYWxsYmFjazpGdW5jdGlvbiA9ICQuVG9vbHMuY2xhc3MuZGVib3VuY2UoKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICB0ZXN0VmFsdWUgPSAhdGVzdFZhbHVlXG4gICAgICAgIH0sIDEwMDApXG4gICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICBhc3NlcnQubm90T2sodGVzdFZhbHVlKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBmaXJlRXZlbnQgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkLlRvb2xzKHtvbkNsaWNrOiAoKToyID0+IDJ9KS5maXJlRXZlbnQoXG4gICAgICAgICAgICAnY2xpY2snLCB0cnVlXG4gICAgICAgICksIDIpXG4gICAgICAgIGFzc2VydC5ub3RPaygkLlRvb2xzKHtvbkNsaWNrOiAoKTpmYWxzZSA9PiBmYWxzZX0pLmZpcmVFdmVudChcbiAgICAgICAgICAgICdjbGljaycsIHRydWUpKVxuICAgICAgICBhc3NlcnQub2sodG9vbHMuZmlyZUV2ZW50KCdjbGljaycpKVxuICAgICAgICB0b29scy5vbkNsaWNrID0gKCk6MyA9PiAzXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0b29scy5maXJlRXZlbnQoJ2NsaWNrJyksIHRydWUpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0b29scy5maXJlRXZlbnQoJ2NsaWNrJywgdHJ1ZSksIHRydWUpXG4gICAgfSlcbiAgICBpZiAocm91bmRUeXBlID09PSAnZnVsbCcpIHtcbiAgICAgICAgdGhpcy50ZXN0KGBvbiAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgICAgIGxldCB0ZXN0VmFsdWUgPSBmYWxzZVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRvb2xzLm9uKCdib2R5JywgJ2NsaWNrJywgKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgdGVzdFZhbHVlID0gdHJ1ZVxuICAgICAgICAgICAgfSlbMF0sICQoJ2JvZHknKVswXSlcblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXIoJ2NsaWNrJylcbiAgICAgICAgICAgIGFzc2VydC5vayh0ZXN0VmFsdWUpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudGVzdChgb2ZmICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICAgICAgbGV0IHRlc3RWYWx1ZSA9IGZhbHNlXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodG9vbHMub24oJ2JvZHknLCAnY2xpY2snLCAoKTp2b2lkID0+IHtcbiAgICAgICAgICAgICAgICB0ZXN0VmFsdWUgPSB0cnVlXG4gICAgICAgICAgICB9KVswXSwgJCgnYm9keScpWzBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRvb2xzLm9mZignYm9keScsICdjbGljaycpWzBdLCAkKCdib2R5JylbMF0pXG5cbiAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VyKCdjbGljaycpXG4gICAgICAgICAgICBhc3NlcnQubm90T2sodGVzdFZhbHVlKVxuICAgICAgICB9KVxuICAgIH1cbiAgICAvLyAvLyBlbmRyZWdpb25cbiAgICAvLyAvLyByZWdpb24gb2JqZWN0XG4gICAgdGhpcy50ZXN0KGBhZGREeW5hbWljR2V0dGVyQW5kU2V0dGVyICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3MuYWRkRHluYW1pY0dldHRlckFuZFNldHRlcihudWxsKSwgbnVsbClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3MuYWRkRHluYW1pY0dldHRlckFuZFNldHRlcih0cnVlKSwgdHJ1ZSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuYWRkRHluYW1pY0dldHRlckFuZFNldHRlcih7YTogMn0pLCB7YTogMn0pXG4gICAgICAgIGFzc2VydC5ub3RPaygkLlRvb2xzLmNsYXNzLmFkZER5bmFtaWNHZXR0ZXJBbmRTZXR0ZXIoe1xuICAgICAgICB9KS5fX3RhcmdldF9fIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5hZGREeW5hbWljR2V0dGVyQW5kU2V0dGVyKHt9LCAoXG4gICAgICAgICAgICB2YWx1ZTphbnlcbiAgICAgICAgKTphbnkgPT4gdmFsdWUpLl9fdGFyZ2V0X18gaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgICAgIGNvbnN0IG1vY2t1cCA9IHt9XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkLlRvb2xzLmNsYXNzLmFkZER5bmFtaWNHZXR0ZXJBbmRTZXR0ZXIoXG4gICAgICAgICAgICBtb2NrdXBcbiAgICAgICAgKSwgbW9ja3VwKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5hZGREeW5hbWljR2V0dGVyQW5kU2V0dGVyKFxuICAgICAgICAgICAgbW9ja3VwLCAodmFsdWU6YW55KTphbnkgPT4gdmFsdWVcbiAgICAgICAgKS5fX3RhcmdldF9fLCBtb2NrdXApXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5hZGREeW5hbWljR2V0dGVyQW5kU2V0dGVyKHthOiAxfSwgKFxuICAgICAgICAgICAgdmFsdWU6YW55XG4gICAgICAgICk6YW55ID0+IHZhbHVlICsgMikuYSwgMylcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmFkZER5bmFtaWNHZXR0ZXJBbmRTZXR0ZXIoXG4gICAgICAgICAgICB7YToge2E6IDF9fSwgKHZhbHVlOmFueSk6YW55ID0+IChcbiAgICAgICAgICAgICAgICB2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdFxuICAgICAgICAgICAgKSA/IHZhbHVlIDogdmFsdWUgKyAyKS5hLmEsIDMpXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5hZGREeW5hbWljR2V0dGVyQW5kU2V0dGVyKHthOiB7YTogW3tcbiAgICAgICAgICAgIGE6IDFcbiAgICAgICAgfV19fSwgKHZhbHVlOmFueSk6YW55ID0+IChcbiAgICAgICAgICAgIHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0XG4gICAgICAgICkgPyB2YWx1ZSA6IHZhbHVlICsgMikuYS5hWzBdLmEsIDMpXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5hZGREeW5hbWljR2V0dGVyQW5kU2V0dGVyKFxuICAgICAgICAgICAge2E6IHthOiAxfX0sICh2YWx1ZTphbnkpOmFueSA9PlxuICAgICAgICAgICAgICAgICh2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgPyB2YWx1ZSA6IHZhbHVlICsgMixcbiAgICAgICAgICAgIG51bGwsIHtoYXM6ICdoYXNPd25Qcm9wZXJ0eSd9LCBmYWxzZVxuICAgICAgICApLmEuYSwgMSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmFkZER5bmFtaWNHZXR0ZXJBbmRTZXR0ZXIoXG4gICAgICAgICAgICB7YTogMX0sICh2YWx1ZTphbnkpOmFueSA9PlxuICAgICAgICAgICAgICAgICh2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgPyB2YWx1ZSA6IHZhbHVlICsgMixcbiAgICAgICAgICAgIG51bGwsIHtoYXM6ICdoYXNPd25Qcm9wZXJ0eSd9LCBmYWxzZSwgW11cbiAgICAgICAgKS5hLCAxKVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYWRkRHluYW1pY0dldHRlckFuZFNldHRlcihcbiAgICAgICAgICAgIHthOiBuZXcgTWFwKFtbJ2EnLCAxXV0pfSwgKHZhbHVlOmFueSk6YW55ID0+XG4gICAgICAgICAgICAgICAgKHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSA/IHZhbHVlIDogdmFsdWUgKyAyLFxuICAgICAgICAgICAgbnVsbCwge2RlbGV0ZTogJ2RlbGV0ZScsIGdldDogJ2dldCcsIHNldDogJ3NldCcsIGhhczogJ2hhcyd9LCB0cnVlLFxuICAgICAgICAgICAgW01hcF1cbiAgICAgICAgKS5hLmEsIDMpXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGNvbnZlcnRDaXJjdWxhck9iamVjdFRvSlNPTiAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGxldCB0ZXN0T2JqZWN0MTpPYmplY3QgPSB7fVxuICAgICAgICBjb25zdCB0ZXN0T2JqZWN0MjpPYmplY3QgPSB7YTogdGVzdE9iamVjdDF9XG4gICAgICAgIHRlc3RPYmplY3QxLmEgPSB0ZXN0T2JqZWN0MlxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbe30sICd7fSddLFxuICAgICAgICAgICAgW3thOiBudWxsfSwgJ3tcImFcIjpudWxsfSddLFxuICAgICAgICAgICAgW3thOiB7YTogMn19LCAne1wiYVwiOntcImFcIjoyfX0nXSxcbiAgICAgICAgICAgIFt7YToge2E6IEluZmluaXR5fX0sICd7XCJhXCI6e1wiYVwiOm51bGx9fSddLFxuICAgICAgICAgICAgW3Rlc3RPYmplY3QxLCAne1wiYVwiOntcImFcIjpcIl9fY2lyY3VsYXJSZWZlcmVuY2VfX1wifX0nXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmNvbnZlcnRDaXJjdWxhck9iamVjdFRvSlNPTih0ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgY29udmVydE1hcFRvUGxhaW5PYmplY3QgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbW251bGxdLCBudWxsXSxcbiAgICAgICAgICAgIFtbdHJ1ZV0sIHRydWVdLFxuICAgICAgICAgICAgW1swXSwgMF0sXG4gICAgICAgICAgICBbWzJdLCAyXSxcbiAgICAgICAgICAgIFtbJ2EnXSwgJ2EnXSxcbiAgICAgICAgICAgIFtbbmV3IE1hcCgpXSwge31dLFxuICAgICAgICAgICAgW1tbbmV3IE1hcCgpXV0sIFt7fV1dLFxuICAgICAgICAgICAgW1tbbmV3IE1hcCgpXSwgZmFsc2VdLCBbbmV3IE1hcCgpXV0sXG4gICAgICAgICAgICBbW1tuZXcgTWFwKFtbJ2EnLCAyXSwgWzIsIDJdXSldXSwgW3thOiAyLCAnMic6IDJ9XV0sXG4gICAgICAgICAgICBbW1tuZXcgTWFwKFtbJ2EnLCBuZXcgTWFwKCldLCBbMiwgMl1dKV1dLCBbe2E6IHt9LCAnMic6IDJ9XV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1tuZXcgTWFwKFtbJ2EnLCBuZXcgTWFwKFtbJ2EnLCAyXV0pXSwgWzIsIDJdXSldXSxcbiAgICAgICAgICAgICAgICBbe2E6IHthOiAyfSwgJzInOiAyfV1cbiAgICAgICAgICAgIF1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5jb252ZXJ0TWFwVG9QbGFpbk9iamVjdCguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgY29udmVydFBsYWluT2JqZWN0VG9NYXAgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbW251bGxdLCBudWxsXSxcbiAgICAgICAgICAgIFtbdHJ1ZV0sIHRydWVdLFxuICAgICAgICAgICAgW1swXSwgMF0sXG4gICAgICAgICAgICBbWzJdLCAyXSxcbiAgICAgICAgICAgIFtbJ2EnXSwgJ2EnXSxcbiAgICAgICAgICAgIFtbe31dLCBuZXcgTWFwKCldLFxuICAgICAgICAgICAgW1tbe31dXSwgW25ldyBNYXAoKV1dLFxuICAgICAgICAgICAgW1tbe31dLCBmYWxzZV0sIFt7fV1dLFxuICAgICAgICAgICAgW1tbe2E6IHt9LCBiOiAyfV1dLCBbbmV3IE1hcChbWydhJywgbmV3IE1hcCgpXSwgWydiJywgMl1dKV1dLFxuICAgICAgICAgICAgW1tbe2I6IDIsIGE6IHt9fV1dLCBbbmV3IE1hcChbWydhJywgbmV3IE1hcCgpXSwgWydiJywgMl1dKV1dLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtbe2I6IDIsIGE6IG5ldyBNYXAoKX1dXSxcbiAgICAgICAgICAgICAgICBbbmV3IE1hcChbWydhJywgbmV3IE1hcCgpXSwgWydiJywgMl1dKV1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1t7YjogMiwgYTogW3t9XX1dXSxcbiAgICAgICAgICAgICAgICBbbmV3IE1hcChbWydhJywgW25ldyBNYXAoKV1dLCBbJ2InLCAyXV0pXVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbW3tiOiAyLCBhOiBuZXcgU2V0KFt7fV0pfV1dLFxuICAgICAgICAgICAgICAgIFtuZXcgTWFwKFtbJ2EnLCBuZXcgU2V0KFtuZXcgTWFwKCldKV0sIFsnYicsIDJdXSldXG4gICAgICAgICAgICBdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuY29udmVydFBsYWluT2JqZWN0VG9NYXAoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGNvbnZlcnRTdWJzdHJpbmdJblBsYWluT2JqZWN0ICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW3t9LCAvYS8sICcnLCB7fV0sXG4gICAgICAgICAgICBbe2E6ICdhJ30sIC9hLywgJ2InLCB7YTogJ2InfV0sXG4gICAgICAgICAgICBbe2E6ICdhYSd9LCAvYS8sICdiJywge2E6ICdiYSd9XSxcbiAgICAgICAgICAgIFt7YTogJ2FhJ30sIC9hL2csICdiJywge2E6ICdiYid9XSxcbiAgICAgICAgICAgIFt7YToge2E6ICdhYSd9fSwgL2EvZywgJ2InLCB7YToge2E6ICdiYid9fV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5jb252ZXJ0U3Vic3RyaW5nSW5QbGFpbk9iamVjdChcbiAgICAgICAgICAgICAgICB0ZXN0WzBdLCB0ZXN0WzFdLCB0ZXN0WzJdXG4gICAgICAgICAgICApLCB0ZXN0WzNdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBjb3B5TGltaXRlZFJlY3Vyc2l2ZWx5ICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1syMV0sIDIxXSxcbiAgICAgICAgICAgIFtbMCwgLTFdLCAwXSxcbiAgICAgICAgICAgIFtbMCwgMV0sIDBdLFxuICAgICAgICAgICAgW1swLCAxMF0sIDBdLFxuICAgICAgICAgICAgW1tuZXcgRGF0ZSgwKV0sIG5ldyBEYXRlKDApXSxcbiAgICAgICAgICAgIFtbL2EvXSwgL2EvXSxcbiAgICAgICAgICAgIFtbe31dLCB7fV0sXG4gICAgICAgICAgICBbW3t9LCAtMV0sIHt9XSxcbiAgICAgICAgICAgIFtbW11dLCBbXV0sXG4gICAgICAgICAgICBbW25ldyBNYXAoKSwgLTFdLCBuZXcgTWFwKCldLFxuICAgICAgICAgICAgW1tuZXcgU2V0KCksIC0xXSwgbmV3IFNldCgpXSxcbiAgICAgICAgICAgIFtbe2E6IDJ9LCAwXSwge2E6IDJ9XSxcbiAgICAgICAgICAgIFtbe2E6IHthOiAyfX0sIDBdLCB7YTogbnVsbH1dLFxuICAgICAgICAgICAgW1t7YToge2E6IDJ9fSwgMV0sIHthOiB7YTogMn19XSxcbiAgICAgICAgICAgIFtbe2E6IHthOiAyfX0sIDJdLCB7YToge2E6IDJ9fV0sXG4gICAgICAgICAgICBbW3thOiBbe2E6IDJ9XX0sIDFdLCB7YTogW251bGxdfV0sXG4gICAgICAgICAgICBbW3thOiBbe2E6IDJ9XX0sIDJdLCB7YTogW3thOiAyfV19XSxcbiAgICAgICAgICAgIFtbe2E6IHthOiAyfX0sIDEwXSwge2E6IHthOiAyfX1dLFxuICAgICAgICAgICAgW1tuZXcgTWFwKFtbJ2EnLCAyXV0pLCAwXSwgbmV3IE1hcChbWydhJywgMl1dKV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW25ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIDJdXSldXSksIDBdLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIG51bGxdXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW25ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIDJdXSldXSksIDFdLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIDJdXSldXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW25ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIDJdXSldXSksIDJdLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIDJdXSldXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW25ldyBNYXAoW1snYScsIFtuZXcgTWFwKFtbJ2EnLCAyXV0pXV1dKSwgMV0sXG4gICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgW251bGxdXV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtuZXcgTWFwKFtbJ2EnLCBbbmV3IE1hcChbWydhJywgMl1dKV1dXSksIDJdLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIFtuZXcgTWFwKFtbJ2EnLCAyXV0pXV1dKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbbmV3IE1hcChbWydhJywgbmV3IE1hcChbWydhJywgMl1dKV1dKSwgMTBdLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIDJdXSldXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW25ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIDJdXSldXSksIDEwXSxcbiAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCBuZXcgTWFwKFtbJ2EnLCAyXV0pXV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1tuZXcgU2V0KFsnYScsIDJdKSwgMF0sIG5ldyBTZXQoWydhJywgMl0pXSxcbiAgICAgICAgICAgIFtbbmV3IFNldChbJ2EnLCBuZXcgU2V0KFsnYScsIDJdKV0pLCAwXSwgbmV3IFNldChbJ2EnLCBudWxsXSldLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtuZXcgU2V0KFsnYScsIG5ldyBTZXQoWydhJywgMl0pXSksIDFdLFxuICAgICAgICAgICAgICAgIG5ldyBTZXQoWydhJywgbmV3IFNldChbJ2EnLCAyXSldKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbbmV3IFNldChbJ2EnLCBuZXcgU2V0KFsnYScsIDJdKV0pLCAyXSxcbiAgICAgICAgICAgICAgICBuZXcgU2V0KFsnYScsIG5ldyBTZXQoWydhJywgMl0pXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbW25ldyBTZXQoWydhJywgW25ldyBTZXQoWydhJywgMl0pXV0pLCAxXSwgbmV3IFNldChbJ2EnLCBbbnVsbF1dKV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW25ldyBTZXQoWydhJywgW25ldyBTZXQoWydhJywgMl0pXV0pLCAyXSxcbiAgICAgICAgICAgICAgICBuZXcgU2V0KFsnYScsIFtuZXcgU2V0KFsnYScsIDJdKV1dKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbbmV3IFNldChbJ2EnLCBuZXcgU2V0KFsnYScsIDJdKV0pLCAxMF0sXG4gICAgICAgICAgICAgICAgbmV3IFNldChbJ2EnLCBuZXcgU2V0KFsnYScsIDJdKV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtuZXcgU2V0KFsnYScsIG5ldyBTZXQoWydhJywgMl0pXSksIDEwXSxcbiAgICAgICAgICAgICAgICBuZXcgU2V0KFsnYScsIG5ldyBTZXQoWydhJywgMl0pXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5jb3B5TGltaXRlZFJlY3Vyc2l2ZWx5KC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBkZXRlcm1pbmVUeXBlICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5kZXRlcm1pbmVUeXBlKCksICd1bmRlZmluZWQnKVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbdW5kZWZpbmVkLCAndW5kZWZpbmVkJ10sXG4gICAgICAgICAgICBbe30ubm90RGVmaW5lZCwgJ3VuZGVmaW5lZCddLFxuICAgICAgICAgICAgW251bGwsICdudWxsJ10sXG4gICAgICAgICAgICBbdHJ1ZSwgJ2Jvb2xlYW4nXSxcbiAgICAgICAgICAgIFtuZXcgQm9vbGVhbigpLCAnYm9vbGVhbiddLFxuICAgICAgICAgICAgWzMsICdudW1iZXInXSxcbiAgICAgICAgICAgIFtuZXcgTnVtYmVyKDMpLCAnbnVtYmVyJ10sXG4gICAgICAgICAgICBbJycsICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFtuZXcgU3RyaW5nKCcnKSwgJ3N0cmluZyddLFxuICAgICAgICAgICAgWyd0ZXN0JywgJ3N0cmluZyddLFxuICAgICAgICAgICAgW25ldyBTdHJpbmcoJ3Rlc3QnKSwgJ3N0cmluZyddLFxuICAgICAgICAgICAgW2Z1bmN0aW9uKCk6dm9pZCB7fSwgJ2Z1bmN0aW9uJ10sXG4gICAgICAgICAgICBbKCk6dm9pZCA9PiB7fSwgJ2Z1bmN0aW9uJ10sXG4gICAgICAgICAgICBbW10sICdhcnJheSddLFxuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tYXJyYXktY29uc3RydWN0b3IgKi9cbiAgICAgICAgICAgIC8vIElnbm9yZVR5cGVDaGVja1xuICAgICAgICAgICAgW25ldyBBcnJheSgpLCAnYXJyYXknXSxcbiAgICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tYXJyYXktY29uc3RydWN0b3IgKi9cbiAgICAgICAgICAgIFtuZXcgRGF0ZSgpLCAnZGF0ZSddLFxuICAgICAgICAgICAgW25ldyBFcnJvcigpLCAnZXJyb3InXSxcbiAgICAgICAgICAgIFtuZXcgTWFwKCksICdtYXAnXSxcbiAgICAgICAgICAgIFtuZXcgU2V0KCksICdzZXQnXSxcbiAgICAgICAgICAgIFsvdGVzdC8sICdyZWdleHAnXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3MuZGV0ZXJtaW5lVHlwZSh0ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgZXF1YWxzICgke3JvdW5kVHlwZX0pYCwgYXN5bmMgKGFzc2VydDpPYmplY3QpOlByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCBkb25lOkZ1bmN0aW9uID0gYXNzZXJ0LmFzeW5jKClcbiAgICAgICAgY29uc3QgdGVzdEZ1bmN0aW9uOkZ1bmN0aW9uID0gKCk6dm9pZCA9PiB7fVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbMSwgMV0sXG4gICAgICAgICAgICBbbmV3IERhdGUoKSwgbmV3IERhdGUoKV0sXG4gICAgICAgICAgICBbbmV3IERhdGUoMTk5NSwgMTEsIDE3KSwgbmV3IERhdGUoMTk5NSwgMTEsIDE3KV0sXG4gICAgICAgICAgICBbL2EvLCAvYS9dLFxuICAgICAgICAgICAgW3thOiAyfSwge2E6IDJ9XSxcbiAgICAgICAgICAgIFt7YTogMiwgYjogM30sIHthOiAyLCBiOiAzfV0sXG4gICAgICAgICAgICBbWzEsIDIsIDNdLCBbMSwgMiwgM11dLFxuICAgICAgICAgICAgW1tdLCBbXV0sXG4gICAgICAgICAgICBbe30sIHt9XSxcbiAgICAgICAgICAgIFtuZXcgTWFwKCksIG5ldyBNYXAoKV0sXG4gICAgICAgICAgICBbbmV3IFNldCgpLCBuZXcgU2V0KCldLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCB7YTogMn1dLCBbMSwgMiwgMywge2E6IDJ9XV0sXG4gICAgICAgICAgICBbWzEsIDIsIDMsIG5ldyBNYXAoW1snYScsIDJdXSldLCBbMSwgMiwgMywgbmV3IE1hcChbWydhJywgMl1dKV1dLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCBuZXcgU2V0KFsnYScsIDJdKV0sIFsxLCAyLCAzLCBuZXcgU2V0KFsnYScsIDJdKV1dLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCBbMSwgMl1dLCBbMSwgMiwgMywgWzEsIDJdXV0sXG4gICAgICAgICAgICBbW3thOiAxfV0sIFt7YTogMX1dXSxcbiAgICAgICAgICAgIFtbe2E6IDEsIGI6IDF9XSwgW3thOiAxfV0sIFtdXSxcbiAgICAgICAgICAgIFtbe2E6IDEsIGI6IDF9XSwgW3thOiAxfV0sIFsnYSddXSxcbiAgICAgICAgICAgIFsyLCAyLCAwXSxcbiAgICAgICAgICAgIFtbe2E6IDEsIGI6IDF9XSwgW3thOiAxfV0sIG51bGwsIDBdLFxuICAgICAgICAgICAgW1t7YTogMX0sIHtiOiAxfV0sIFt7YTogMX0sIHtiOiAxfV0sIG51bGwsIDFdLFxuICAgICAgICAgICAgW1t7YToge2I6IDF9fSwge2I6IDF9XSwgW3thOiAxfSwge2I6IDF9XSwgbnVsbCwgMV0sXG4gICAgICAgICAgICBbW3thOiB7YjogMX19LCB7YjogMX1dLCBbe2E6IHtiOiAxfX0sIHtiOiAxfV0sIG51bGwsIDJdLFxuICAgICAgICAgICAgW1t7YToge2I6IHtjOiAxfX19LCB7YjogMX1dLCBbe2E6IHtiOiAxfX0sIHtiOiAxfV0sIG51bGwsIDJdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFt7YToge2I6IHtjOiAxfX19LCB7YjogMX1dLCBbe2E6IHtiOiAxfX0sIHtiOiAxfV0sIG51bGwsIDMsXG4gICAgICAgICAgICAgICAgWydiJ11cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbdGVzdEZ1bmN0aW9uLCB0ZXN0RnVuY3Rpb25dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5lcXVhbHMoLi4udGVzdCkpXG4gICAgICAgIGlmIChUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ25vZGUnKVxuICAgICAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuZXF1YWxzKFxuICAgICAgICAgICAgICAgIG5ldyBCdWZmZXIoJ2EnKSwgbmV3IEJ1ZmZlcignYScpLFxuICAgICAgICAgICAgICAgIG51bGwsIC0xLCBbXSwgdHJ1ZSwgdHJ1ZSkpXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IEJsb2IoWydhJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IEJsb2IoWydhJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBbbmV3IEJsb2IoWydhJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KV0sXG4gICAgICAgICAgICAgICAgICAgIFtuZXcgQmxvYihbJ2EnXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pXVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7YTogbmV3IEJsb2IoWydhJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KX0sXG4gICAgICAgICAgICAgICAgICAgIHthOiBuZXcgQmxvYihbJ2EnXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCBuZXcgQmxvYihbJ2EnXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pXV0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCBuZXcgQmxvYihbJ2EnXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pXV0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBTZXQoW25ldyBCbG9iKFsnYSddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSldKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFNldChbbmV3IEJsb2IoWydhJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KV0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGE6IG5ldyBTZXQoW1tuZXcgTWFwKFtbJ2EnLCBuZXcgQmxvYihbJ2EnXSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0L3BsYWluJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSldXSldXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBiOiAyXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGE6IG5ldyBTZXQoW1tuZXcgTWFwKFtbJ2EnLCBuZXcgQmxvYihbJ2EnXSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0L3BsYWluJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSldXSldXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBiOiAyXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIGFzc2VydC5vayhhd2FpdCAkLlRvb2xzLmNsYXNzLmVxdWFscyhcbiAgICAgICAgICAgICAgICAgICAgLi4udGVzdCwgbnVsbCwgLTEsIFtdLCB0cnVlLCB0cnVlKSlcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBCbG9iKFsnYSddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBCbG9iKFsnYiddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgW25ldyBCbG9iKFsnYSddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSldLFxuICAgICAgICAgICAgICAgICAgICBbbmV3IEJsb2IoWydiJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KV1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge2E6IG5ldyBCbG9iKFsnYSddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSl9LFxuICAgICAgICAgICAgICAgICAgICB7YTogbmV3IEJsb2IoWydiJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KX1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgbmV3IEJsb2IoWydhJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KV1dKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgbmV3IEJsb2IoWydiJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KV1dKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBuZXcgU2V0KFtuZXcgQmxvYihbJ2EnXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pXSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBTZXQoW25ldyBCbG9iKFsnYiddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSldKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhOiBuZXcgU2V0KFtbbmV3IE1hcChbWydhJywgbmV3IEJsb2IoWydhJ10sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGV4dC9wbGFpbidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXV0pXV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgYjogMlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhOiBuZXcgU2V0KFtbbmV3IE1hcChbWydhJywgbmV3IEJsb2IoWydiJ10sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGV4dC9wbGFpbidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXV0pXV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgYjogMlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBhc3NlcnQubm90T2soYXdhaXQgJC5Ub29scy5jbGFzcy5lcXVhbHMoXG4gICAgICAgICAgICAgICAgICAgIC4uLnRlc3QsIG51bGwsIC0xLCBbXSwgdHJ1ZSwgdHJ1ZSkpXG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1t7YToge2I6IDF9fSwge2I6IDF9XSwgW3thOiAxfSwge2I6IDF9XSwgbnVsbCwgMl0sXG4gICAgICAgICAgICBbW3thOiB7Yjoge2M6IDF9fX0sIHtiOiAxfV0sIFt7YToge2I6IDF9fSwge2I6IDF9XSwgbnVsbCwgM10sXG4gICAgICAgICAgICBbbmV3IERhdGUoMTk5NSwgMTEsIDE3KSwgbmV3IERhdGUoMTk5NSwgMTEsIDE2KV0sXG4gICAgICAgICAgICBbL2EvaSwgL2EvXSxcbiAgICAgICAgICAgIFsxLCAyXSxcbiAgICAgICAgICAgIFt7YTogMiwgYjogM30sIHthOiAyfV0sXG4gICAgICAgICAgICBbWzEsIDIsIDMsIDRdLCBbMSwgMiwgMywgNV1dLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCA0XSwgWzEsIDIsIDNdXSxcbiAgICAgICAgICAgIFtbMSwgMiwgMywge2E6IDJ9XSwgWzEsIDIsIDMsIHtiOiAyfV1dLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCBuZXcgTWFwKFtbJ2EnLCAyXV0pXSwgWzEsIDIsIDMsIG5ldyBNYXAoW1snYicsIDJdXSldXSxcbiAgICAgICAgICAgIFtbMSwgMiwgMywgbmV3IFNldChbJ2EnLCAyXSldLCBbMSwgMiwgMywgbmV3IFNldChbJ2InLCAyXSldXSxcbiAgICAgICAgICAgIFtbMSwgMiwgMywgWzEsIDJdXSwgWzEsIDIsIDMsIFsxLCAyLCAzXV1dLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCBbMSwgMiwgM11dLCBbMSwgMiwgMywgWzEsIDJdXV0sXG4gICAgICAgICAgICBbWzEsIDIsIDMsIFsxLCAyLCAzXV0sIFsxLCAyLCAzLCBbMSwgMiwge31dXV0sXG4gICAgICAgICAgICBbW3thOiAxLCBiOiAxfV0sIFt7YTogMX1dXSxcbiAgICAgICAgICAgIFtbe2E6IDEsIGI6IDF9XSwgW3thOiAxfV0sIFsnYScsICdiJ11dLFxuICAgICAgICAgICAgWzEsIDIsIDBdLFxuICAgICAgICAgICAgW1t7YTogMX0sIHtiOiAxfV0sIFt7YTogMX1dLCBudWxsLCAxXSxcbiAgICAgICAgICAgIFsoKTp2b2lkID0+IHt9LCAoKTp2b2lkID0+IHt9LCBudWxsLCAtMSwgW10sIGZhbHNlXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKCQuVG9vbHMuY2xhc3MuZXF1YWxzKC4uLnRlc3QpKVxuICAgICAgICBjb25zdCB0ZXN0ID0gKCk6dm9pZCA9PiB7fVxuICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5lcXVhbHModGVzdCwgdGVzdCwgbnVsbCwgLTEsIFtdLCBmYWxzZSkpXG4gICAgICAgIGRvbmUoKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBldmFsdWF0ZUR5bmFtaWNEYXRhU3RydWN0dXJlICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tudWxsXSwgbnVsbF0sXG4gICAgICAgICAgICBbW2ZhbHNlXSwgZmFsc2VdLFxuICAgICAgICAgICAgW1snMSddLCAnMSddLFxuICAgICAgICAgICAgW1szXSwgM10sXG4gICAgICAgICAgICBbW3t9XSwge31dLFxuICAgICAgICAgICAgW1t7YTogbnVsbH1dLCB7YTogbnVsbH1dLFxuICAgICAgICAgICAgW1t7X19ldmFsdWF0ZV9fOiAnMSArIDMnfV0sIDRdLFxuICAgICAgICAgICAgW1tbe19fZXZhbHVhdGVfXzogJzEnfV1dLCBbMV1dLFxuICAgICAgICAgICAgW1tbe19fZXZhbHVhdGVfXzogYCcxJ2B9XV0sIFsnMSddXSxcbiAgICAgICAgICAgIFtbe2E6IHtfX2V2YWx1YXRlX186IGAnYSdgfX1dLCB7YTogJ2EnfV0sXG4gICAgICAgICAgICBbW3thOiB7X19ldmFsdWF0ZV9fOiAnMSd9fV0sIHthOiAxfV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3thOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5iJ30sIGI6IDJ9LCB7fSwgJ3NlbGYnLCAnX19ydW5fXyddLFxuICAgICAgICAgICAgICAgIHthOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5iJ30sIGI6IDJ9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1t7YToge19fcnVuOiAnXy5iJ30sIGI6IDF9LCB7fSwgJ18nLCAnX19ydW4nXSwge2E6IDEsIGI6IDF9XSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbe2E6IFt7X19ydW46ICdzZWxmLmInfV0sIGI6IDF9LCB7fSwgJ3NlbGYnLCAnX19ydW4nXSxcbiAgICAgICAgICAgICAgICB7YTogWzFdLCBiOiAxfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbe2E6IHtfX2V2YWx1YXRlX186ICdzZWxmLmInfSwgYjogMn1dLCB7YTogMiwgYjogMn1dLFxuICAgICAgICAgICAgW1t7YToge19fZXZhbHVhdGVfXzogJ2MuYid9LCBiOiAyfSwge30sICdjJ10sIHthOiAyLCBiOiAyfV0sXG4gICAgICAgICAgICBbW3tcbiAgICAgICAgICAgICAgICBhOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5iJ30sXG4gICAgICAgICAgICAgICAgYjoge19fZXZhbHVhdGVfXzogJ3NlbGYuYyd9LFxuICAgICAgICAgICAgICAgIGM6IDJcbiAgICAgICAgICAgIH1dLCB7YTogMiwgYjogMiwgYzogMn1dLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgICAgICAgIGE6IHtfX2V4ZWN1dGVfXzogJ3JldHVybiBzZWxmLmInfSxcbiAgICAgICAgICAgICAgICAgICAgYjoge19fZXhlY3V0ZV9fOiAncmV0dXJuIHNlbGYuYyd9LFxuICAgICAgICAgICAgICAgICAgICBjOiB7X19leGVjdXRlX186ICdyZXR1cm4gc2VsZi5kJ30sXG4gICAgICAgICAgICAgICAgICAgIGQ6IHtfX2V4ZWN1dGVfXzogJ3JldHVybiBzZWxmLmUnfSxcbiAgICAgICAgICAgICAgICAgICAgZToge19fZXhlY3V0ZV9fOiAncmV0dXJuIHNlbGYuZid9LFxuICAgICAgICAgICAgICAgICAgICBmOiAzXG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAge2E6IDMsIGI6IDMsIGM6IDMsIGQ6IDMsIGU6IDMsIGY6IDN9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1t7XG4gICAgICAgICAgICAgICAgYToge19fZXZhbHVhdGVfXzogJ3NlbGYuYi5kLmUnfSxcbiAgICAgICAgICAgICAgICBiOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5jJ30sXG4gICAgICAgICAgICAgICAgYzoge2Q6IHtlOiAzfX1cbiAgICAgICAgICAgIH1dLCB7YTogMywgYjoge2Q6IHtlOiAzfX0sIGM6IHtkOiB7ZTogM319fV0sXG4gICAgICAgICAgICBbW3tcbiAgICAgICAgICAgICAgICBuOiB7X19ldmFsdWF0ZV9fOiAne2E6IFsxLCAyLCAzXX0nfSxcbiAgICAgICAgICAgICAgICBiOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5jJ30sXG4gICAgICAgICAgICAgICAgZjoge19fZXZhbHVhdGVfXzogJ3NlbGYuZy5oJ30sXG4gICAgICAgICAgICAgICAgZDoge19fZXZhbHVhdGVfXzogJ3NlbGYuZSd9LFxuICAgICAgICAgICAgICAgIGE6IHtfX2V2YWx1YXRlX186ICdzZWxmLmInfSxcbiAgICAgICAgICAgICAgICBlOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5mLmknfSxcbiAgICAgICAgICAgICAgICBrOiB7X19ldmFsdWF0ZV9fOiAnYGtrIDwtPiBcIiR7c2VsZi5sLmpvaW4oXFwnXCIsIFwiXFwnKX1cImAnfSxcbiAgICAgICAgICAgICAgICBjOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5kJ30sXG4gICAgICAgICAgICAgICAgbzogW3thOiAyLCBiOiBbW1t7X19ldmFsdWF0ZV9fOiAnMTAgKiogMid9XV1dfV0sXG4gICAgICAgICAgICAgICAgbDoge19fZXZhbHVhdGVfXzogJ3NlbGYubS5hJ30sXG4gICAgICAgICAgICAgICAgZzoge2g6IHtpOiB7X19ldmFsdWF0ZV9fOiAnYCR7c2VsZi5rfSA8LT4gJHtzZWxmLmp9YCd9fX0sXG4gICAgICAgICAgICAgICAgbToge2E6IFsxLCAyLCB7X19ldmFsdWF0ZV9fOiAnMyd9XX0sXG4gICAgICAgICAgICAgICAgajogJ2pqJ1xuICAgICAgICAgICAgfV0sIHtcbiAgICAgICAgICAgICAgICBhOiAna2sgPC0+IFwiMVwiLCBcIjJcIiwgXCIzXCIgPC0+IGpqJyxcbiAgICAgICAgICAgICAgICBiOiAna2sgPC0+IFwiMVwiLCBcIjJcIiwgXCIzXCIgPC0+IGpqJyxcbiAgICAgICAgICAgICAgICBjOiAna2sgPC0+IFwiMVwiLCBcIjJcIiwgXCIzXCIgPC0+IGpqJyxcbiAgICAgICAgICAgICAgICBkOiAna2sgPC0+IFwiMVwiLCBcIjJcIiwgXCIzXCIgPC0+IGpqJyxcbiAgICAgICAgICAgICAgICBlOiAna2sgPC0+IFwiMVwiLCBcIjJcIiwgXCIzXCIgPC0+IGpqJyxcbiAgICAgICAgICAgICAgICBmOiB7aTogJ2trIDwtPiBcIjFcIiwgXCIyXCIsIFwiM1wiIDwtPiBqaid9LFxuICAgICAgICAgICAgICAgIGc6IHtoOiB7aTogJ2trIDwtPiBcIjFcIiwgXCIyXCIsIFwiM1wiIDwtPiBqaid9fSxcbiAgICAgICAgICAgICAgICBqOiAnamonLFxuICAgICAgICAgICAgICAgIGs6ICdrayA8LT4gXCIxXCIsIFwiMlwiLCBcIjNcIicsXG4gICAgICAgICAgICAgICAgbDogWzEsIDIsIDNdLFxuICAgICAgICAgICAgICAgIG06IHthOiBbMSwgMiwgM119LFxuICAgICAgICAgICAgICAgIG46IHthOiBbMSwgMiwgM119LFxuICAgICAgICAgICAgICAgIG86IFt7YTogMiwgYjogW1tbMTAwXV1dfV1cbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgICAgICAgIGE6IHtfX2V2YWx1YXRlX186ICdfLmIuZC5lJ30sXG4gICAgICAgICAgICAgICAgICAgIGI6IHtfX2V2YWx1YXRlX186ICdfLmMnfSxcbiAgICAgICAgICAgICAgICAgICAgYzoge2Q6IHtlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX2V2YWx1YXRlX186ICd0b29scy5jb3B5TGltaXRlZFJlY3Vyc2l2ZWx5KFsyXSknXG4gICAgICAgICAgICAgICAgICAgIH19fVxuICAgICAgICAgICAgICAgIH0sIHt0b29sczogJC5Ub29scy5jbGFzc30sICdfJ10sXG4gICAgICAgICAgICAgICAge2E6IFsyXSwgYjoge2Q6IHtlOiBbMl19fSwgYzoge2Q6IHtlOiBbMl19fX1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbW3thOiB7XG4gICAgICAgICAgICAgICAgYjogMSxcbiAgICAgICAgICAgICAgICBjOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5hLmInfVxuICAgICAgICAgICAgfX1dLCB7YToge2I6IDEsIGM6IDF9fV0sXG4gICAgICAgICAgICBbW3thOiB7XG4gICAgICAgICAgICAgICAgYjogbnVsbCxcbiAgICAgICAgICAgICAgICBjOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5hLmInfVxuICAgICAgICAgICAgfX1dLCB7YToge2I6IG51bGwsIGM6IG51bGx9fV0sXG4gICAgICAgICAgICBbW3thOiB7XG4gICAgICAgICAgICAgICAgYjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGM6IHtfX2V2YWx1YXRlX186ICdzZWxmLmEuYid9XG4gICAgICAgICAgICB9fV0sIHthOiB7YjogdW5kZWZpbmVkLCBjOiB1bmRlZmluZWR9fV0sXG4gICAgICAgICAgICBbW3thOiB7XG4gICAgICAgICAgICAgICAgYjogJ2phdScsXG4gICAgICAgICAgICAgICAgYzoge19fZXZhbHVhdGVfXzogJ3NlbGYuYS5iJ31cbiAgICAgICAgICAgIH19XSwge2E6IHtiOiAnamF1JywgYzogJ2phdSd9fV0sXG4gICAgICAgICAgICBbW3thOiB7XG4gICAgICAgICAgICAgICAgYjoge1xuICAgICAgICAgICAgICAgICAgICBjOiAnamF1JyxcbiAgICAgICAgICAgICAgICAgICAgZDoge19fZXZhbHVhdGVfXzogJ3NlbGYuYS5iLmMnfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XSwge2E6IHtiOiB7YzogJ2phdScsIGQ6ICdqYXUnfX19XSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIFsxLCAxXSwgWzYsIDFdLCBbMjUsIDNdLCBbMjgsIDNdLCBbMSwgNV0sIFs1LCA1XSwgWzE2LCA1XSxcbiAgICAgICAgICAgICAgICAgICAgWzI2LCA1XSwgWzMsIDEwXSwgWzEsIDExXSwgWzI1LCAxMl0sIFsyNiwgMTJdXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbMSwgMV0sIFs2LCAxXSwgWzI1LCAzXSwgWzI4LCAzXSwgWzEsIDVdLCBbNSwgNV0sIFsxNiwgNV0sXG4gICAgICAgICAgICAgICAgWzI2LCA1XSwgWzMsIDEwXSwgWzEsIDExXSwgWzI1LCAxMl0sIFsyNiwgMTJdXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge2E6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGI6IHtfX2V2YWx1YXRlX186ICdcInRcIiArIFwiZXNcIiArIFwidFwiJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICBjOiB7X19ldmFsdWF0ZV9fOiAncmVtb3ZlUyhzZWxmLmEuYiknfVxuICAgICAgICAgICAgICAgICAgICB9fSxcbiAgICAgICAgICAgICAgICAgICAge3JlbW92ZVM6ICh2YWx1ZTpzdHJpbmcpOnN0cmluZyA9PiB2YWx1ZS5yZXBsYWNlKCdzJywgJycpfVxuICAgICAgICAgICAgICAgIF0sIHthOiB7YjogJ3Rlc3QnLCBjOiAndGV0J319XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgICAgICAgIGE6IHtfX2V2YWx1YXRlX186ICd0b1N0cmluZyhzZWxmLmIpJ30sXG4gICAgICAgICAgICAgICAgICAgIGI6IHtfX2V2YWx1YXRlX186IGAnYSdgfVxuICAgICAgICAgICAgICAgIH0sIHt0b1N0cmluZzogKHZhbHVlOmFueSk6c3RyaW5nID0+IHZhbHVlLnRvU3RyaW5nKCl9XSxcbiAgICAgICAgICAgICAgICB7YTogJ2EnLCBiOiAnYSd9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1t7XG4gICAgICAgICAgICAgICAgYToge19fZXZhbHVhdGVfXzogJ09iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNlbGYuYiknfSxcbiAgICAgICAgICAgICAgICBiOiB7X19ldmFsdWF0ZV9fOiAne2E6IDJ9J31cbiAgICAgICAgICAgIH1dLCB7YTogWydhJ10sIGI6IHthOiAyfX1dLFxuICAgICAgICAgICAgW1t7XG4gICAgICAgICAgICAgICAgYToge19fZXZhbHVhdGVfXzogJ1JlZmxlY3Qub3duS2V5cyhzZWxmLmIpJ30sXG4gICAgICAgICAgICAgICAgYjoge19fZXZhbHVhdGVfXzogJ3thOiAyfSd9XG4gICAgICAgICAgICB9XSwge2E6IFsnYSddLCBiOiB7YTogMn19XSxcbiAgICAgICAgICAgIFtbe1xuICAgICAgICAgICAgICAgIGE6IHtfX2V2YWx1YXRlX186ICdPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzZWxmLmIpJ30sXG4gICAgICAgICAgICAgICAgYjoge19fZXZhbHVhdGVfXzogJ3NlbGYuYyd9LFxuICAgICAgICAgICAgICAgIGM6IHtfX2V4ZWN1dGVfXzogJ3JldHVybiB7YTogMSwgYjogMn0nfVxuICAgICAgICAgICAgfV0sIHthOiBbJ2EnLCAnYiddLCBiOiB7YTogMSwgYjogMn0sIGM6IHthOiAxLCBiOiAyfX1dLFxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICBOT1RFOiBUaGlzIGRlc2NyaWJlcyBhIHdvcmthcm91bmQgdW50aWwgdGhlIFwib3duS2V5c1wiIHByb3h5XG4gICAgICAgICAgICAgICAgdHJhcCB3b3JrcyBmb3IgdGhpcyB1c2UgY2FzZXMuXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgW1t7XG4gICAgICAgICAgICAgICAgYToge19fZXZhbHVhdGVfXzogJ09iamVjdC5rZXlzKHJlc29sdmUoc2VsZi5iKSknfSxcbiAgICAgICAgICAgICAgICBiOiB7X19ldmFsdWF0ZV9fOiAne2E6IDJ9J31cbiAgICAgICAgICAgIH1dLCB7YTogWydhJ10sIGI6IHthOiAyfX1dLFxuICAgICAgICAgICAgW1t7XG4gICAgICAgICAgICAgICAgYToge19fZXZhbHVhdGVfXzogYCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHJlc29sdmUoc2VsZi5iKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGtleSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgICAgIH0pKClgfSxcbiAgICAgICAgICAgICAgICBiOiB7X19ldmFsdWF0ZV9fOiAne2E6IDEsIGI6IDIsIGM6IDN9J31cbiAgICAgICAgICAgIH1dLCB7YTogWydhJywgJ2InLCAnYyddLCBiOiB7YTogMSwgYjogMiwgYzogM319XVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmNvcHlMaW1pdGVkUmVjdXJzaXZlbHkoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5ldmFsdWF0ZUR5bmFtaWNEYXRhU3RydWN0dXJlKC4uLnRlc3RbMF0pLCAtMSxcbiAgICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICApLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBleHRlbmRPYmplY3QgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDphbnkgb2YgW1xuICAgICAgICAgICAgW1tbXV0sIFtdXSxcbiAgICAgICAgICAgIFtbe31dLCB7fV0sXG4gICAgICAgICAgICBbW3thOiAxfV0sIHthOiAxfV0sXG4gICAgICAgICAgICBbW3thOiAxfSwge2E6IDJ9XSwge2E6IDJ9XSxcbiAgICAgICAgICAgIFtbe30sIHthOiAxfSwge2E6IDJ9XSwge2E6IDJ9XSxcbiAgICAgICAgICAgIFtbe30sIHthOiAxfSwge2E6IDJ9XSwge2E6IDJ9XSxcbiAgICAgICAgICAgIFtbe2E6IDEsIGI6IHthOiAxfX0sIHthOiAyLCBiOiB7YjogMX19XSwge2E6IDIsIGI6IHtiOiAxfX1dLFxuICAgICAgICAgICAgW1tbMSwgMl0sIFsxXV0sIFsxXV0sXG4gICAgICAgICAgICBbW25ldyBNYXAoKV0sIG5ldyBNYXAoKV0sXG4gICAgICAgICAgICBbW25ldyBTZXQoKV0sIG5ldyBTZXQoKV0sXG4gICAgICAgICAgICBbW25ldyBNYXAoW1snYScsIDFdXSldLCBuZXcgTWFwKFtbJ2EnLCAxXV0pXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbbmV3IE1hcChbWydhJywgMV1dKSwgbmV3IE1hcChbWydhJywgMl1dKV0sXG4gICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgMl1dKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbbmV3IE1hcCgpLCBuZXcgTWFwKFtbJ2EnLCAxXV0pLCBuZXcgTWFwKFtbJ2EnLCAyXV0pXSxcbiAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCAyXV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtuZXcgTWFwKCksIG5ldyBNYXAoW1snYScsIDFdXSksIG5ldyBNYXAoW1snYScsIDJdXSldLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIDJdXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCAxXSwgWydiJywgbmV3IE1hcChbWydhJywgMV1dKV1dKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgMl0sIFsnYicsIG5ldyBNYXAoW1snYicsIDFdXSldXSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIDJdLCBbJ2InLCBuZXcgTWFwKFtbJ2InLCAxXV0pXV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1t0cnVlLCB7fV0sIHt9XSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbdHJ1ZSwge2E6IDEsIGI6IHthOiAxfX0sIHthOiAyLCBiOiB7YjogMX19XSxcbiAgICAgICAgICAgICAgICB7YTogMiwgYjoge2E6IDEsIGI6IDF9fVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbdHJ1ZSwge2E6IDEsIGI6IHthOiBbXX19LCB7YTogMiwgYjoge2I6IDF9fV0sXG4gICAgICAgICAgICAgICAge2E6IDIsIGI6IHthOiBbXSwgYjogMX19XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1t0cnVlLCB7YToge2E6IFsxLCAyXX19LCB7YToge2E6IFszLCA0XX19XSwge2E6IHthOiBbMywgNF19fV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3RydWUsIHthOiB7YTogWzEsIDJdfX0sIHthOiB7YTogbnVsbH19XSxcbiAgICAgICAgICAgICAgICB7YToge2E6IG51bGx9fVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbdHJ1ZSwge2E6IHthOiBbMSwgMl19fSwge2E6IHRydWV9XSwge2E6IHRydWV9XSxcbiAgICAgICAgICAgIFtbdHJ1ZSwge2E6IHtfYTogMX19LCB7YToge2I6IDJ9fV0sIHthOiB7X2E6IDEsIGI6IDJ9fV0sXG4gICAgICAgICAgICBbW2ZhbHNlLCB7X2E6IDF9LCB7YTogMn1dLCB7YTogMiwgX2E6IDF9XSxcbiAgICAgICAgICAgIFtbdHJ1ZSwge2E6IHthOiBbMSwgMl19fSwgZmFsc2VdLCBmYWxzZV0sXG4gICAgICAgICAgICBbW3RydWUsIHthOiB7YTogWzEsIDJdfX0sIHVuZGVmaW5lZF0sIHVuZGVmaW5lZF0sXG4gICAgICAgICAgICBbW3RydWUsIHthOiAxfSwge2E6IDJ9LCB7YTogM31dLCB7YTogM31dLFxuICAgICAgICAgICAgW1t0cnVlLCBbMV0sIFsxLCAyXV0sIFsxLCAyXV0sXG4gICAgICAgICAgICBbW3RydWUsIFsxLCAyXSwgWzFdXSwgWzFdXSxcbiAgICAgICAgICAgIFtbdHJ1ZSwgbmV3IE1hcCgpXSwgbmV3IE1hcCgpXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHRydWUsIG5ldyBNYXAoW1snYScsIDFdLCBbJ2InLCBuZXcgTWFwKFtbJ2EnLCAxXV0pXV0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCAyXSwgWydiJywgbmV3IE1hcChbWydiJywgMV1dKV1dKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgMl0sIFsnYicsIG5ldyBNYXAoW1snYScsIDFdLCBbJ2InLCAxXV0pXV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSwgbmV3IE1hcChbWydhJywgMV0sIFsnYicsIG5ldyBNYXAoW1snYScsIFtdXV0pXV0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCAyXSwgWydiJywgbmV3IE1hcChbWydiJywgMV1dKV1dKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgMl0sIFsnYicsIG5ldyBNYXAoW1snYScsIFtdXSwgWydiJywgMV1dKV1dKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHRydWUsIG5ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIFsxLCAyXV1dKV1dKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgbmV3IE1hcChbWydhJywgWzMsIDRdXV0pXV0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCBuZXcgTWFwKFtbJ2EnLCBbMywgNF1dXSldXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5leHRlbmRPYmplY3QoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuZXh0ZW5kT2JqZWN0KFsxLCAyXSwgdW5kZWZpbmVkKSwgdW5kZWZpbmVkKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5leHRlbmRPYmplY3QoWzEsIDJdLCBudWxsKSwgbnVsbClcbiAgICAgICAgY29uc3QgdGFyZ2V0Ok9iamVjdCA9IHthOiBbMSwgMl19XG4gICAgICAgICQuVG9vbHMuY2xhc3MuZXh0ZW5kT2JqZWN0KHRydWUsIHRhcmdldCwge2E6IFszLCA0XX0pXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwodGFyZ2V0LCB7YTogWzMsIDRdfSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgZm9yRWFjaFNvcnRlZCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdXG4gICAgICAgIGNvbnN0IHRlc3RlciA9IChpdGVtOkFycmF5PGFueT58T2JqZWN0KTpBcnJheTxhbnk+ID0+XG4gICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmZvckVhY2hTb3J0ZWQoXG4gICAgICAgICAgICAgICAgaXRlbSwgKHZhbHVlOmFueSwga2V5OnN0cmluZ3xudW1iZXIpOm51bWJlciA9PlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChba2V5LCB2YWx1ZV0pKVxuICAgICAgICB0ZXN0ZXIoe30pXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbXSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCh0ZXN0ZXIoe30pLCBbXSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCh0ZXN0ZXIoW10pLCBbXSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCh0ZXN0ZXIoe2E6IDJ9KSwgWydhJ10pXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwodGVzdGVyKHtiOiAxLCBhOiAyfSksIFsnYScsICdiJ10pXG4gICAgICAgIHJlc3VsdCA9IFtdXG4gICAgICAgIHRlc3Rlcih7YjogMSwgYTogMn0pXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbWydhJywgMl0sIFsnYicsIDFdXSlcbiAgICAgICAgcmVzdWx0ID0gW11cblxuICAgICAgICB0ZXN0ZXIoWzIsIDJdKVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW1swLCAyXSwgWzEsIDJdXSlcbiAgICAgICAgcmVzdWx0ID0gW11cbiAgICAgICAgdGVzdGVyKHsnNSc6IDIsICc2JzogMiwgJzInOiAzfSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFtbJzInLCAzXSwgWyc1JywgMl0sIFsnNicsIDJdXSlcbiAgICAgICAgcmVzdWx0ID0gW11cbiAgICAgICAgdGVzdGVyKHthOiAyLCBjOiAyLCB6OiAzfSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFtbJ2EnLCAyXSwgWydjJywgMl0sIFsneicsIDNdXSlcbiAgICAgICAgJC5Ub29scy5jbGFzcy5mb3JFYWNoU29ydGVkKFsxXSwgZnVuY3Rpb24oKTpudW1iZXIge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpc1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICB9LCAyKVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgMilcbiAgICB9KVxuICAgIHRoaXMudGVzdChgZ2V0UHJveHlIYW5kbGVyICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5pc1BsYWluT2JqZWN0KCQuVG9vbHMuY2xhc3MuZ2V0UHJveHlIYW5kbGVyKFxuICAgICAgICAgICAge30pKSlcbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuaXNQbGFpbk9iamVjdCgkLlRvb2xzLmNsYXNzLmdldFByb3h5SGFuZGxlcihcbiAgICAgICAgICAgIG5ldyBNYXAoKSwge2dldDogJ2dldCd9KSkpXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYG1vZGlmeU9iamVjdCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OmFueSBvZiBbXG4gICAgICAgICAgICBbW3t9LCB7fV0sIHt9LCB7fV0sXG4gICAgICAgICAgICBbW3thOiAyfSwge31dLCB7YTogMn0sIHt9XSxcbiAgICAgICAgICAgIFtbe2E6IDJ9LCB7YjogMX1dLCB7YTogMn0sIHtiOiAxfV0sXG4gICAgICAgICAgICBbW3thOiAyfSwge19fcmVtb3ZlX186ICdhJ31dLCB7fSwge31dLFxuICAgICAgICAgICAgW1t7YTogMn0sIHtfX3JlbW92ZV9fOiBbJ2EnXX1dLCB7fSwge31dLFxuICAgICAgICAgICAgW1t7YTogWzJdfSwge2E6IHtfX3ByZXBlbmRfXzogMX19XSwge2E6IFsxLCAyXX0sIHt9XSxcbiAgICAgICAgICAgIFtbe2E6IFsyXX0sIHthOiB7X19yZW1vdmVfXzogMX19XSwge2E6IFsyXX0sIHt9XSxcbiAgICAgICAgICAgIFtbe2E6IFsyLCAxXX0sIHthOiB7X19yZW1vdmVfXzogMX19XSwge2E6IFsyXX0sIHt9XSxcbiAgICAgICAgICAgIFtbe2E6IFsyLCAxXX0sIHthOiB7X19yZW1vdmVfXzogWzEsIDJdfX1dLCB7YTogW119LCB7fV0sXG4gICAgICAgICAgICBbW3thOiBbMV19LCB7YToge19fcmVtb3ZlX186IDF9fV0sIHthOiBbXX0sIHt9XSxcbiAgICAgICAgICAgIFtbe2E6IFsxXX0sIHthOiB7X19yZW1vdmVfXzogWzEsIDJdfX1dLCB7YTogW119LCB7fV0sXG4gICAgICAgICAgICBbW3thOiBbMl19LCB7YToge19fYXBwZW5kX186IDF9fV0sIHthOiBbMiwgMV19LCB7fV0sXG4gICAgICAgICAgICBbW3thOiBbMl19LCB7YToge19fYXBwZW5kX186IFsxLCAyXX19XSwge2E6IFsyLCAxLCAyXX0sIHt9XSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbe2E6IFsyXX0sIHthOiB7X19hcHBlbmRfXzogWzEsIDJdfSwgYjogMX1dLFxuICAgICAgICAgICAgICAgIHthOiBbMiwgMSwgMl19LCB7YjogMX1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3thOiBbMl19LCB7YToge2FkZDogWzEsIDJdfSwgYjogMX0sICdybScsICd1bnNoaWZ0JywgJ2FkZCddLFxuICAgICAgICAgICAgICAgIHthOiBbMiwgMSwgMl19LCB7YjogMX1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3thOiBbMl19LCB7YToge19fcHJlcGVuZF9fOiAxfX0sICdfcicsICdfcCddLFxuICAgICAgICAgICAgICAgIHthOiBbMl19LCB7YToge19fcHJlcGVuZF9fOiAxfX1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbW3thOiBbMl19LCB7YToge19fcHJlcGVuZF9fOiBbMSwgM119fV0sIHthOiBbMSwgMywgMl19LCB7fV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3thOiBbMl19LCB7YToge19fYXBwZW5kX186IFsxLCAyXSwgX19wcmVwZW5kX186ICdzJ319XSxcbiAgICAgICAgICAgICAgICB7YTogWydzJywgMiwgMSwgMl19LCB7fVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbe2E6IFsyLCAyXX0sIHthOiB7X19wcmVwZW5kX186ICdzJywgX19yZW1vdmVfXzogMn19XSxcbiAgICAgICAgICAgICAgICB7YTogWydzJywgMl19LCB7fVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbe2E6IFsyLCAyXX0sIHthOiB7X19wcmVwZW5kX186ICdzJywgX19yZW1vdmVfXzogWzIsIDJdfX1dLFxuICAgICAgICAgICAgICAgIHthOiBbJ3MnXX0sIHt9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1tcbiAgICAgICAgICAgICAgICB7YTogWzIsIDEsIDJdfSxcbiAgICAgICAgICAgICAgICB7YToge19fcHJlcGVuZF9fOiAncycsIF9fcmVtb3ZlX186IFsyLCAyXSwgX19hcHBlbmRfXzogJ2EnfX1cbiAgICAgICAgICAgIF0sIHthOiBbJ3MnLCAxLCAnYSddfSwge31dXG4gICAgICAgIF0pIHtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5tb2RpZnlPYmplY3QoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHRlc3RbMF1bMV0sIHRlc3RbMl0pXG4gICAgICAgIH1cbiAgICB9KVxuICAgIFFVbml0LnRlc3QoJ3JlcHJlc2VudE9iamVjdCcsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgY29uc3QgZXJyb3I6RXJyb3IgPSBuZXcgRXJyb3IoJ0EnKVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbe30sICd7fSddLFxuICAgICAgICAgICAgW25ldyBTZXQoKSwgJ0VtcHR5U2V0J10sXG4gICAgICAgICAgICBbbmV3IE1hcCgpLCAnRW1wdHlNYXAnXSxcbiAgICAgICAgICAgIFs1LCAnNSddLFxuICAgICAgICAgICAgWydhJywgJ1wiYVwiJ10sXG4gICAgICAgICAgICBbW10sICdbXSddLFxuICAgICAgICAgICAgW3thOiAyLCBiOiAzfSwgJ3tcXG4gYTogMixcXG4gYjogM1xcbn0nXSxcbiAgICAgICAgICAgIFtuZXcgTWFwKFtbJzMnLCAyXSwgWzIsIDNdXSksICdcIjNcIiAtPiAyLFxcbiAyIC0+IDMnXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJzMnLCAyXSwgWzIsIG5ldyBNYXAoW1szLCAzXSwgWzIsIDJdXSldXSksXG4gICAgICAgICAgICAgICAgJ1wiM1wiIC0+IDIsXFxuIDIgLT4gMyAtPiAzLFxcbiAgMiAtPiAyJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtuZXcgU2V0KFsnMycsIDIsIDIsIDNdKSwgJ3tcXG4gXCIzXCIsXFxuIDIsXFxuIDNcXG59J10sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgbmV3IFNldChbJzMnLCAyLCBuZXcgU2V0KFszLCAyXSldKSxcbiAgICAgICAgICAgICAgICAne1xcbiBcIjNcIixcXG4gMixcXG4ge1xcbiAgMyxcXG4gIDJcXG4gfVxcbn0nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHthOiBudWxsLCBiOiAzLCBjOiAnYScsIGQ6IHRydWV9LFxuICAgICAgICAgICAgICAgICd7XFxuIGE6IG51bGwsXFxuIGI6IDMsXFxuIGM6IFwiYVwiLFxcbiBkOiB0cnVlXFxufSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge2E6IHthOiBudWxsLCBiOiAzLCBjOiAnYScsIGQ6IHRydWV9fSxcbiAgICAgICAgICAgICAgICAne1xcbiBhOiB7XFxuICBhOiBudWxsLFxcbiAgYjogMyxcXG4gIGM6IFwiYVwiLFxcbiAgZDogdHJ1ZVxcbiB9XFxufSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge2E6IHthOiBudWxsLCBiOiAzLCBjOiAnYScsIGQ6IHt9fX0sXG4gICAgICAgICAgICAgICAgJ3tcXG4gYToge1xcbiAgYTogbnVsbCxcXG4gIGI6IDMsXFxuICBjOiBcImFcIixcXG4gIGQ6IHt9XFxuIH1cXG59J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICB7YToge2E6IHthOiBudWxsLCBiOiB7fX19fSxcbiAgICAgICAgICAgICAgICAne1xcbiBhOiB7XFxuICBhOiB7XFxuICAgYTogbnVsbCxcXG4gICBiOiB7fVxcbiAgfVxcbiB9XFxufSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge2E6IHthOiBlcnJvcn19LFxuICAgICAgICAgICAgICAgICd7XFxuIGE6IHtcXG4gIGE6IHtcXG4gICBtZXNzYWdlOiBcIkFcIixcXG4gICBzdGFjazogXCInICtcbiAgICAgICAgICAgICAgICBgJHtlcnJvci5zdGFjay5yZXBsYWNlKC9cXG4vZywgJ1xcbiAgICcpfVwiXFxuICB9XFxuIH1cXG59YFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbe2E6IDJ9XSwgJ1tcXG4ge1xcbiAgYTogMlxcbiB9XFxuXSddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5yZXByZXNlbnRPYmplY3QodGVzdFswXSwgJyAnKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc29ydCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tdLCBbXV0sXG4gICAgICAgICAgICBbe30sIFtdXSxcbiAgICAgICAgICAgIFtbMV0sIFswXV0sXG4gICAgICAgICAgICBbWzEsIDIsIDNdLCBbMCwgMSwgMl1dLFxuICAgICAgICAgICAgW1szLCAyLCAxXSwgWzAsIDEsIDJdXSxcbiAgICAgICAgICAgIFtbMiwgMywgMV0sIFswLCAxLCAyXV0sXG4gICAgICAgICAgICBbeycxJzogMiwgJzInOiA1LCAnMyc6ICdhJ30sIFsnMScsICcyJywgJzMnXV0sXG4gICAgICAgICAgICBbeycyJzogMiwgJzEnOiA1LCAnLTUnOiAnYSd9LCBbJy01JywgJzEnLCAnMiddXSxcbiAgICAgICAgICAgIFt7JzMnOiAyLCAnMic6IDUsICcxJzogJ2EnfSwgWycxJywgJzInLCAnMyddXSxcbiAgICAgICAgICAgIFt7YTogMiwgYjogNSwgYzogJ2EnfSwgWydhJywgJ2InLCAnYyddXSxcbiAgICAgICAgICAgIFt7YzogMiwgYjogNSwgYTogJ2EnfSwgWydhJywgJ2InLCAnYyddXSxcbiAgICAgICAgICAgIFt7YjogMiwgYzogNSwgejogJ2EnfSwgWydiJywgJ2MnLCAneiddXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLnNvcnQodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHVud3JhcFByb3h5ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbe30sIHt9XSxcbiAgICAgICAgICAgIFt7YTogJ2EnfSwge2E6ICdhJ31dLFxuICAgICAgICAgICAgW3thOiAnYWEnfSwge2E6ICdhYSd9XSxcbiAgICAgICAgICAgIFt7YToge19fdGFyZ2V0X186IDIsIF9fcmV2b2tlX186ICgpOnZvaWQgPT4ge319fSwge2E6IDJ9XVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLnVud3JhcFByb3h5KHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgLy8gLy8gZW5kcmVnaW9uXG4gICAgLy8gLy8gcmVnaW9uIGFycmF5XG4gICAgdGhpcy50ZXN0KGBhcnJheU1lcmdlICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbW10sIFtdLCBbXV0sXG4gICAgICAgICAgICBbWzFdLCBbXSwgWzFdXSxcbiAgICAgICAgICAgIFtbXSwgWzFdLCBbMV1dLFxuICAgICAgICAgICAgW1sxXSwgWzFdLCBbMSwgMV1dLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCAxXSwgWzEsIDIsIDNdLCBbMSwgMiwgMywgMSwgMSwgMiwgM11dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuYXJyYXlNZXJnZSh0ZXN0WzBdLCB0ZXN0WzFdKSwgdGVzdFsyXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgYXJyYXlNYWtlICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbW10sIFtdXSxcbiAgICAgICAgICAgIFtbMSwgMiwgM10sIFsxLCAyLCAzXV0sXG4gICAgICAgICAgICBbMSwgWzFdXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmFycmF5TWFrZSh0ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgYXJyYXlVbmlxdWUgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbMSwgMiwgMywgMV0sIFsxLCAyLCAzXV0sXG4gICAgICAgICAgICBbWzEsIDIsIDMsIDEsIDIsIDNdLCBbMSwgMiwgM11dLFxuICAgICAgICAgICAgW1tdLCBbXV0sXG4gICAgICAgICAgICBbWzEsIDIsIDNdLCBbMSwgMiwgM11dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYXJyYXlVbmlxdWUodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGFycmF5QWdncmVnYXRlUHJvcGVydHlJZkVxdWFsICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tbe2E6ICdiJ31dLCAnYSddLCAnYiddLFxuICAgICAgICAgICAgW1tbe2E6ICdiJ30sIHthOiAnYid9XSwgJ2EnXSwgJ2InXSxcbiAgICAgICAgICAgIFtbW3thOiAnYid9LCB7YTogJ2MnfV0sICdhJ10sICcnXSxcbiAgICAgICAgICAgIFtbW3thOiAnYid9LCB7YTogJ2MnfV0sICdhJywgZmFsc2VdLCBmYWxzZV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkLlRvb2xzLmNsYXNzLmFycmF5QWdncmVnYXRlUHJvcGVydHlJZkVxdWFsKFxuICAgICAgICAgICAgICAgIC4uLnRlc3RbMF1cbiAgICAgICAgICAgICksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGFycmF5RGVsZXRlRW1wdHlJdGVtcyAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tbe2E6IG51bGx9XV0sIFtdXSxcbiAgICAgICAgICAgIFtbW3thOiBudWxsLCBiOiAyfV1dLCBbe2E6IG51bGwsIGI6IDJ9XV0sXG4gICAgICAgICAgICBbW1t7YTogbnVsbCwgYjogMn1dLCBbJ2EnXV0sIFtdXSxcbiAgICAgICAgICAgIFtbW10sIFsnYSddXSwgW11dLFxuICAgICAgICAgICAgW1tbXV0sIFtdXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmFycmF5RGVsZXRlRW1wdHlJdGVtcyguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgYXJyYXlFeHRyYWN0ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbW1t7YTogJ2InLCBjOiAnZCd9XSwgWydhJ11dLCBbe2E6ICdiJ31dXSxcbiAgICAgICAgICAgIFtbW3thOiAnYicsIGM6ICdkJ31dLCBbJ2InXV0sIFt7fV1dLFxuICAgICAgICAgICAgW1tbe2E6ICdiJywgYzogJ2QnfV0sIFsnYyddXSwgW3tjOiAnZCd9XV0sXG4gICAgICAgICAgICBbW1t7YTogJ2InLCBjOiAnZCd9LCB7YTogM31dLCBbJ2MnXV0sIFt7YzogJ2QnfSwge31dXSxcbiAgICAgICAgICAgIFtbW3thOiAnYicsIGM6ICdkJ30sIHtjOiAzfV0sIFsnYyddXSwgW3tjOiAnZCd9LCB7YzogM31dXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmFycmF5RXh0cmFjdCguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgYXJyYXlFeHRyYWN0SWZNYXRjaGVzICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbWydiJ10sIC9iLywgWydiJ11dLFxuICAgICAgICAgICAgW1snYiddLCAnYicsIFsnYiddXSxcbiAgICAgICAgICAgIFtbJ2InXSwgJ2EnLCBbXV0sXG4gICAgICAgICAgICBbW10sICdhJywgW11dLFxuICAgICAgICAgICAgW1snYScsICdiJ10sICcnLCBbJ2EnLCAnYiddXSxcbiAgICAgICAgICAgIFtbJ2EnLCAnYiddLCAnXiQnLCBbXV0sXG4gICAgICAgICAgICBbWydhJywgJ2InXSwgJ2InLCBbJ2InXV0sXG4gICAgICAgICAgICBbWydhJywgJ2InXSwgJ1thYl0nLCBbJ2EnLCAnYiddXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmFycmF5RXh0cmFjdElmTWF0Y2hlcyhcbiAgICAgICAgICAgICAgICB0ZXN0WzBdLCB0ZXN0WzFdXG4gICAgICAgICAgICApLCB0ZXN0WzJdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBhcnJheUV4dHJhY3RJZlByb3BlcnR5RXhpc3RzICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1t7YTogMn1dLCAnYScsIFt7YTogMn1dXSxcbiAgICAgICAgICAgIFtbe2E6IDJ9XSwgJ2InLCBbXV0sXG4gICAgICAgICAgICBbW10sICdiJywgW11dLFxuICAgICAgICAgICAgW1t7YTogMn0sIHtiOiAzfV0sICdhJywgW3thOiAyfV1dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYXJyYXlFeHRyYWN0SWZQcm9wZXJ0eUV4aXN0cyhcbiAgICAgICAgICAgICAgICB0ZXN0WzBdLCB0ZXN0WzFdXG4gICAgICAgICAgICApLCB0ZXN0WzJdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBhcnJheUV4dHJhY3RJZlByb3BlcnR5TWF0Y2hlcyAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbe2E6ICdiJ31dLCB7YTogJ2InfSwgW3thOiAnYid9XV0sXG4gICAgICAgICAgICBbW3thOiAnYid9XSwge2E6ICcuJ30sIFt7YTogJ2InfV1dLFxuICAgICAgICAgICAgW1t7YTogJ2InfV0sIHthOiAnYSd9LCBbXV0sXG4gICAgICAgICAgICBbW10sIHthOiAnYSd9LCBbXV0sXG4gICAgICAgICAgICBbW3thOiAyfV0sIHtiOiAvYS99LCBbXV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3ttaW1lVHlwZTogJ3RleHQveC13ZWJtJ31dLFxuICAgICAgICAgICAgICAgIHttaW1lVHlwZTogbmV3IFJlZ0V4cCgnXnRleHQveC13ZWJtJCcpfSxcbiAgICAgICAgICAgICAgICBbe21pbWVUeXBlOiAndGV4dC94LXdlYm0nfV1cbiAgICAgICAgICAgIF1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5hcnJheUV4dHJhY3RJZlByb3BlcnR5TWF0Y2hlcyhcbiAgICAgICAgICAgICAgICB0ZXN0WzBdLCB0ZXN0WzFdXG4gICAgICAgICAgICApLCB0ZXN0WzJdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBhcnJheUludGVyc2VjdCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tbJ0EnXSwgWydBJ11dLCBbJ0EnXV0sXG4gICAgICAgICAgICBbW1snQScsICdCJ10sIFsnQSddXSwgWydBJ11dLFxuICAgICAgICAgICAgW1tbXSwgW11dLCBbXV0sXG4gICAgICAgICAgICBbW1s1XSwgW11dLCBbXV0sXG4gICAgICAgICAgICBbW1t7YTogMn1dLCBbe2E6IDJ9XV0sIFt7YTogMn1dXSxcbiAgICAgICAgICAgIFtbW3thOiAzfV0sIFt7YTogMn1dXSwgW11dLFxuICAgICAgICAgICAgW1tbe2E6IDN9XSwgW3tiOiAzfV1dLCBbXV0sXG4gICAgICAgICAgICBbW1t7YTogM31dLCBbe2I6IDN9XSwgWydiJ11dLCBbXV0sXG4gICAgICAgICAgICBbW1t7YTogM31dLCBbe2I6IDN9XSwgWydiJ10sIGZhbHNlXSwgW11dLFxuICAgICAgICAgICAgW1tbe2I6IG51bGx9XSwgW3tiOiBudWxsfV0sIFsnYiddXSwgW3tiOiBudWxsfV1dLFxuICAgICAgICAgICAgW1tbe2I6IG51bGx9XSwgW3tiOiB1bmRlZmluZWR9XSwgWydiJ11dLCBbXV0sXG4gICAgICAgICAgICBbW1t7YjogbnVsbH1dLCBbe2I6IHVuZGVmaW5lZH1dLCBbJ2InXSwgZmFsc2VdLCBbe2I6IG51bGx9XV0sXG4gICAgICAgICAgICBbW1t7YjogbnVsbH1dLCBbe31dLCBbJ2InXSwgZmFsc2VdLCBbe2I6IG51bGx9XV0sXG4gICAgICAgICAgICBbW1t7YjogdW5kZWZpbmVkfV0sIFt7fV0sIFsnYiddLCBmYWxzZV0sIFt7YjogdW5kZWZpbmVkfV1dLFxuICAgICAgICAgICAgW1tbe31dLCBbe31dLCBbJ2InXSwgZmFsc2VdLCBbe31dXSxcbiAgICAgICAgICAgIFtbW3tiOiBudWxsfV0sIFt7fV0sIFsnYiddXSwgW11dLFxuICAgICAgICAgICAgW1tbe2I6IHVuZGVmaW5lZH1dLCBbe31dLCBbJ2InXSwgdHJ1ZV0sIFt7YjogdW5kZWZpbmVkfV1dLFxuICAgICAgICAgICAgW1tbe2I6IDF9XSwgW3thOiAxfV0sIHtiOiAnYSd9LCB0cnVlXSwgW3tiOiAxfV1dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYXJyYXlJbnRlcnNlY3QoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGFycmF5TWFrZVJhbmdlICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbW1swXV0sIFswXV0sXG4gICAgICAgICAgICBbW1s1XV0sIFswLCAxLCAyLCAzLCA0LCA1XV0sXG4gICAgICAgICAgICBbW1tdXSwgW11dLFxuICAgICAgICAgICAgW1tbMiwgNV1dLCBbMiwgMywgNCwgNV1dLFxuICAgICAgICAgICAgW1tbMiwgMTBdLCAyXSwgWzIsIDQsIDYsIDgsIDEwXV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5hcnJheU1ha2VSYW5nZSguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgYXJyYXlTdW1VcFByb3BlcnR5ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbW1t7YTogMn0sIHthOiAzfV0sICdhJ10sIDVdLFxuICAgICAgICAgICAgW1tbe2E6IDJ9LCB7YjogM31dLCAnYSddLCAyXSxcbiAgICAgICAgICAgIFtbW3thOiAyfSwge2I6IDN9XSwgJ2MnXSwgMF1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmFycmF5U3VtVXBQcm9wZXJ0eSguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgYXJyYXlBcHBlbmRBZGQgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IHRlc3RPYmplY3Q6T2JqZWN0ID0ge31cbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1t7fSwge30sICdiJ10sIHtiOiBbe31dfV0sXG4gICAgICAgICAgICBbW3Rlc3RPYmplY3QsIHthOiAzfSwgJ2InXSwge2I6IFt7YTogM31dfV0sXG4gICAgICAgICAgICBbW3Rlc3RPYmplY3QsIHthOiAzfSwgJ2InXSwge2I6IFt7YTogM30sIHthOiAzfV19XSxcbiAgICAgICAgICAgIFtbe2I6IFsyXX0sIDIsICdiJywgZmFsc2VdLCB7YjogWzIsIDJdfV0sXG4gICAgICAgICAgICBbW3tiOiBbMl19LCAyLCAnYiddLCB7YjogWzJdfV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5hcnJheUFwcGVuZEFkZCguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgYXJyYXlSZW1vdmUgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbW10sIDJdLCBbXV0sXG4gICAgICAgICAgICBbW1syXSwgMl0sIFtdXSxcbiAgICAgICAgICAgIFtbWzJdLCAyLCB0cnVlXSwgW11dLFxuICAgICAgICAgICAgW1tbMSwgMl0sIDJdLCBbMV1dLFxuICAgICAgICAgICAgW1tbMSwgMl0sIDIsIHRydWVdLCBbMV1dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYXJyYXlSZW1vdmUoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgICAgIGFzc2VydC50aHJvd3MoKCk6P0FycmF5PGFueT4gPT4gJC5Ub29scy5jbGFzcy5hcnJheVJlbW92ZShcbiAgICAgICAgICAgIFtdLCAyLCB0cnVlXG4gICAgICAgICksIG5ldyBFcnJvcihgR2l2ZW4gdGFyZ2V0IGRvZXNuJ3QgZXhpc3RzIGluIGdpdmVuIGxpc3QuYCkpXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGFycmF5U29ydFRvcG9sb2dpY2FsICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbe30sIFtdXSxcbiAgICAgICAgICAgIFt7YTogW119LCBbJ2EnXV0sXG4gICAgICAgICAgICBbe2E6ICdiJ30sIFsnYicsICdhJ11dLFxuICAgICAgICAgICAgW3thOiBbXSwgYjogJ2EnfSwgWydhJywgJ2InXV0sXG4gICAgICAgICAgICBbe2E6IFtdLCBiOiBbJ2EnXX0sIFsnYScsICdiJ11dLFxuICAgICAgICAgICAgW3thOiBbJ2InXSwgYjogW119LCBbJ2InLCAnYSddXSxcbiAgICAgICAgICAgIFt7YzogJ2InLCBhOiBbXSwgYjogWydhJ119LCBbJ2EnLCAnYicsICdjJ11dLFxuICAgICAgICAgICAgW3tiOiBbJ2EnXSwgYTogW10sIGM6IFsnYScsICdiJ119LCBbJ2EnLCAnYicsICdjJ11dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuYXJyYXlTb3J0VG9wb2xvZ2ljYWwodGVzdFswXSksIHRlc3RbMV0pXG4gICAgICAgIGZvciAoY29uc3QgdGVzdDphbnkgb2YgW1xuICAgICAgICAgICAge2E6ICdhJ30sXG4gICAgICAgICAgICB7YTogJ2InLCBiOiAnYSd9LFxuICAgICAgICAgICAge2E6ICdiJywgYjogJ2MnLCBjOiAnYSd9XG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpOnZvaWQgPT4gJC5Ub29scy5jbGFzcy5hcnJheVNvcnRUb3BvbG9naWNhbCh0ZXN0KSlcbiAgICB9KVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBzdHJpbmdcbiAgICB0aGlzLnRlc3QoJ3N0cmluZ0VzY2FwZVJlZ3VsYXJFeHByZXNzaW9ucycsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbJyddLCAnJ10sXG4gICAgICAgICAgICBbW2B0aGF0J3Mgbm8gcmVnZXg6IC4qJGBdLCBgdGhhdCdzIG5vIHJlZ2V4OiBcXFxcLlxcXFwqXFxcXCRgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJy1cXFxcW10oKV4kKisufS0nLCAnfSddLFxuICAgICAgICAgICAgICAgICdcXFxcLVxcXFxcXFxcW1xcXFxdXFxcXChcXFxcKVxcXFxeXFxcXCRcXFxcKlxcXFwrXFxcXC59XFxcXC0nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1tcbiAgICAgICAgICAgICAgICAnLVxcXFxbXSgpXiQqKy57fS0nLFxuICAgICAgICAgICAgICAgIFsnWycsICddJywgJygnLCAnKScsICdeJywgJyQnLCAnKicsICcrJywgJy4nLCAneyddXG4gICAgICAgICAgICBdLCAnXFxcXC1cXFxcW10oKV4kKisue1xcXFx9XFxcXC0nXSxcbiAgICAgICAgICAgIFtbJy0nLCAnXFxcXCddLCAnXFxcXC0nXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nRXNjYXBlUmVndWxhckV4cHJlc3Npb25zKC4uLnRlc3RbMF0pLFxuICAgICAgICAgICAgICAgIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoJ3N0cmluZ0NvbnZlcnRUb1ZhbGlkVmFyaWFibGVOYW1lJywgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8c3RyaW5nPiBvZiBbXG4gICAgICAgICAgICBbJycsICcnXSxcbiAgICAgICAgICAgIFsnYScsICdhJ10sXG4gICAgICAgICAgICBbJ19hJywgJ19hJ10sXG4gICAgICAgICAgICBbJ19hX2EnLCAnX2FfYSddLFxuICAgICAgICAgICAgWydfYS1hJywgJ19hQSddLFxuICAgICAgICAgICAgWyctYS1hJywgJ2FBJ10sXG4gICAgICAgICAgICBbJy1hLS1hJywgJ2FBJ10sXG4gICAgICAgICAgICBbJy0tYS0tYScsICdhQSddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5zdHJpbmdDb252ZXJ0VG9WYWxpZFZhcmlhYmxlTmFtZShcbiAgICAgICAgICAgICAgICAgICAgdGVzdFswXVxuICAgICAgICAgICAgICAgICksIHRlc3RbMV0pXG4gICAgfSlcbiAgICAvLyAvLy8gcmVnaW9uIHVybCBoYW5kbGluZ1xuICAgIHRoaXMudGVzdChgc3RyaW5nRW5jb2RlVVJJQ29tcG9uZW50ICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1snJ10sICcnXSxcbiAgICAgICAgICAgIFtbJyAnXSwgJysnXSxcbiAgICAgICAgICAgIFtbJyAnLCB0cnVlXSwgJyUyMCddLFxuICAgICAgICAgICAgW1snQDokLCAnXSwgJ0A6JCwrJ10sXG4gICAgICAgICAgICBbWycrJ10sICclMkInXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nRW5jb2RlVVJJQ29tcG9uZW50KC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdBZGRTZXBhcmF0b3JUb1BhdGggKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbWycnXSwgJyddLFxuICAgICAgICAgICAgW1snLyddLCAnLyddLFxuICAgICAgICAgICAgW1snL2EnXSwgJy9hLyddLFxuICAgICAgICAgICAgW1snL2EvYmIvJ10sICcvYS9iYi8nXSxcbiAgICAgICAgICAgIFtbJy9hL2JiJ10sICcvYS9iYi8nXSxcbiAgICAgICAgICAgIFtbJy9hL2JiJywgJ3wnXSwgJy9hL2JifCddLFxuICAgICAgICAgICAgW1snL2EvYmIvJywgJ3wnXSwgJy9hL2JiL3wnXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nQWRkU2VwYXJhdG9yVG9QYXRoKC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdIYXNQYXRoUHJlZml4ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbJy9hZG1pbicsICcvYWRtaW4nXSxcbiAgICAgICAgICAgIFsndGVzdCcsICd0ZXN0J10sXG4gICAgICAgICAgICBbJycsICcnXSxcbiAgICAgICAgICAgIFsnYScsICdhL2InXSxcbiAgICAgICAgICAgIFsnYS8nLCAnYS9iJ10sXG4gICAgICAgICAgICBbJy9hZG1pbicsICcvYWRtaW4jdGVzdCcsICcjJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLnN0cmluZ0hhc1BhdGhQcmVmaXgoLi4udGVzdCkpXG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFsnYicsICdhL2InXSxcbiAgICAgICAgICAgIFsnYi8nLCAnYS9iJ10sXG4gICAgICAgICAgICBbJy9hZG1pbi8nLCAnL2FkbWluL3Rlc3QnLCAnIyddLFxuICAgICAgICAgICAgWycvYWRtaW4nLCAnL2FkbWluL3Rlc3QnLCAnIyddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQubm90T2soJC5Ub29scy5jbGFzcy5zdHJpbmdIYXNQYXRoUHJlZml4KC4uLnRlc3QpKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdHZXREb21haW5OYW1lICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWydodHRwczovL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJ10sXG4gICAgICAgICAgICAgICAgJ3d3dy50ZXN0LmRlJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbJ2EnLCB0cnVlXSwgdHJ1ZV0sXG4gICAgICAgICAgICBbWydodHRwOi8vd3d3LnRlc3QuZGUnXSwgJ3d3dy50ZXN0LmRlJ10sXG4gICAgICAgICAgICBbWydodHRwOi8vYS5kZSddLCAnYS5kZSddLFxuICAgICAgICAgICAgW1snaHR0cDovL2xvY2FsaG9zdCddLCAnbG9jYWxob3N0J10sXG4gICAgICAgICAgICBbWydsb2NhbGhvc3QnLCAnYSddLCAnYSddLFxuICAgICAgICAgICAgW1snYScsICQuZ2xvYmFsLmxvY2F0aW9uLmhvc3RuYW1lXSwgJC5nbG9iYWwubG9jYXRpb24uaG9zdG5hbWVdLFxuICAgICAgICAgICAgW1snLy9hJ10sICdhJ10sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnYS9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCcsXG4gICAgICAgICAgICAgICAgICAgICQuZ2xvYmFsLmxvY2F0aW9uLmhvc3RuYW1lXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAkLmdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICcvYS9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCcsXG4gICAgICAgICAgICAgICAgICAgICQuZ2xvYmFsLmxvY2F0aW9uLmhvc3RuYW1lXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAkLmdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJy8vYWx0ZXJuYXRlLmxvY2FsL2Evc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnXSxcbiAgICAgICAgICAgICAgICAnYWx0ZXJuYXRlLmxvY2FsJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbJy8vYWx0ZXJuYXRlLmxvY2FsLyddLCAnYWx0ZXJuYXRlLmxvY2FsJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0dldERvbWFpbk5hbWUoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ0dldFBvcnROdW1iZXIgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbJ2h0dHBzOi8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnXSwgNDQzXSxcbiAgICAgICAgICAgIFtbJ2h0dHA6Ly93d3cudGVzdC5kZSddLCA4MF0sXG4gICAgICAgICAgICBbWydodHRwOi8vd3d3LnRlc3QuZGUnLCB0cnVlXSwgdHJ1ZV0sXG4gICAgICAgICAgICBbWyd3d3cudGVzdC5kZScsIHRydWVdLCB0cnVlXSxcbiAgICAgICAgICAgIFtbJ2EnLCB0cnVlXSwgdHJ1ZV0sXG4gICAgICAgICAgICBbWydhJywgdHJ1ZV0sIHRydWVdLFxuICAgICAgICAgICAgW1snYTo4MCddLCA4MF0sXG4gICAgICAgICAgICBbWydhOjIwJ10sIDIwXSxcbiAgICAgICAgICAgIFtbJ2E6NDQ0J10sIDQ0NF0sXG4gICAgICAgICAgICBbWydodHRwOi8vbG9jYWxob3N0Ojg5J10sIDg5XSxcbiAgICAgICAgICAgIFtbJ2h0dHBzOi8vbG9jYWxob3N0Ojg5J10sIDg5XVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nR2V0UG9ydE51bWJlciguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nR2V0UHJvdG9jb2xOYW1lICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWydodHRwczovL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJ10sXG4gICAgICAgICAgICAgICAgJ2h0dHBzJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbJ2h0dHA6Ly93d3cudGVzdC5kZSddLCAnaHR0cCddLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFsnLy93d3cudGVzdC5kZScsICQuZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgMCwgJC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2wubGVuZ3RoIC0gMSldLFxuICAgICAgICAgICAgICAgICQuZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgMCwgJC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2wubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbWydodHRwOi8vYS5kZSddLCAnaHR0cCddLFxuICAgICAgICAgICAgW1snZnRwOi8vbG9jYWxob3N0J10sICdmdHAnXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJ2EnLCAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgIDAsICQuZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sLmxlbmd0aCAtIDEpXSxcbiAgICAgICAgICAgICAgICAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgIDAsICQuZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJ2Evc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICAgICAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICAwLCAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgJC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2wuc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAwLCAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5sZW5ndGggLSAxKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbJy9hL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJywgJ2EnXSwgJ2EnXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJ2FsdGVybmF0ZS5sb2NhbC9hL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJywgJ2InXSxcbiAgICAgICAgICAgICAgICAnYidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbWydhbHRlcm5hdGUubG9jYWwvJywgJ2MnXSwgJ2MnXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICcnLCAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICAwLCAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgJC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2wuc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAwLCAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5sZW5ndGggLSAxKVxuICAgICAgICAgICAgXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nR2V0UHJvdG9jb2xOYW1lKC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdHZXRVUkxWYXJpYWJsZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgYXNzZXJ0Lm9rKEFycmF5LmlzQXJyYXkoJC5Ub29scy5jbGFzcy5zdHJpbmdHZXRVUkxWYXJpYWJsZSgpKSlcbiAgICAgICAgYXNzZXJ0Lm9rKEFycmF5LmlzQXJyYXkoJC5Ub29scy5jbGFzcy5zdHJpbmdHZXRVUkxWYXJpYWJsZShudWxsLCAnJicpKSlcbiAgICAgICAgYXNzZXJ0Lm9rKEFycmF5LmlzQXJyYXkoJC5Ub29scy5jbGFzcy5zdHJpbmdHZXRVUkxWYXJpYWJsZShudWxsLCAnIycpKSlcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1snbm90RXhpc3RpbmcnXSwgdW5kZWZpbmVkXSxcbiAgICAgICAgICAgIFtbJ25vdEV4aXN0aW5nJywgJyYnXSwgdW5kZWZpbmVkXSxcbiAgICAgICAgICAgIFtbJ25vdEV4aXN0aW5nJywgJyMnXSwgdW5kZWZpbmVkXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnP3Rlc3Q9MiddLCAnMiddLFxuICAgICAgICAgICAgW1sndGVzdCcsICd0ZXN0PTInXSwgJzInXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAndGVzdD0yJmE9MiddLCAnMiddLFxuICAgICAgICAgICAgW1sndGVzdCcsICdiPTMmdGVzdD0yJmE9MiddLCAnMiddLFxuICAgICAgICAgICAgW1sndGVzdCcsICc/Yj0zJnRlc3Q9MiZhPTInXSwgJzInXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnP2I9MyZ0ZXN0PTImYT0yJ10sICcyJ10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJyYnLCAnJCcsICchJywgJycsICcjJHRlc3Q9MiddLCAnMiddLFxuICAgICAgICAgICAgW1sndGVzdCcsICcmJywgJyQnLCAnIScsICc/dGVzdD00JywgJyMkdGVzdD0zJ10sICc0J10sXG4gICAgICAgICAgICBbWydhJywgJyYnLCAnJCcsICchJywgJz90ZXN0PTQnLCAnIyR0ZXN0PTMnXSwgdW5kZWZpbmVkXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnIycsICckJywgJyEnLCAnP3Rlc3Q9NCcsICcjJHRlc3Q9MyddLCAnMyddLFxuICAgICAgICAgICAgW1sndGVzdCcsICcjJywgJyQnLCAnIScsICcnLCAnIyF0ZXN0IyR0ZXN0PTQnXSwgJzQnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnIycsICckJywgJyEnLCAnJywgJyMhL3Rlc3QvYSMkdGVzdD00J10sICc0J10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJyMnLCAnJCcsICchJywgJycsICcjIS90ZXN0L2EvIyR0ZXN0PTQnXSwgJzQnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnIycsICckJywgJyEnLCAnJywgJyMhdGVzdC9hLyMkdGVzdD00J10sICc0J10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJyMnLCAnJCcsICchJywgJycsICcjIS8jJHRlc3Q9NCddLCAnNCddLFxuICAgICAgICAgICAgW1sndGVzdCcsICcjJywgJyQnLCAnIScsICcnLCAnIyF0ZXN0P3Rlc3Q9MyMkdGVzdD00J10sICc0J10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJyYnLCAnPycsICchJywgbnVsbCwgJyMhYT90ZXN0PTMnXSwgJzMnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnJicsICckJywgJyEnLCBudWxsLCAnIyF0ZXN0IyR0ZXN0PTQnXSwgJzQnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnJicsICckJywgJyEnLCBudWxsLCAnIyF0ZXN0P3Rlc3Q9MyMkdGVzdD00J10sICc0J11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0dldFVSTFZhcmlhYmxlKC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdJc0ludGVybmFsVVJMICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICdodHRwczovL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnLy93d3cudGVzdC5kZS9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCcsXG4gICAgICAgICAgICAgICAgJy8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIGAkeyQuZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sfS8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlYCArXG4gICAgICAgICAgICAgICAgICAgICc/cGFyYW09dmFsdWUjaGFzaCcsXG4gICAgICAgICAgICAgICAgYCR7JC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2x9Ly93d3cudGVzdC5kZS9zaXRlL3N1YlNpdGVgICtcbiAgICAgICAgICAgICAgICAgICAgYD9wYXJhbT12YWx1ZSNoYXNoYFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly93d3cudGVzdC5kZTo0NDMvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICdodHRwczovL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnLy93d3cudGVzdC5kZTo4MC9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCcsXG4gICAgICAgICAgICAgICAgJy8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgWyQuZ2xvYmFsLmxvY2F0aW9uLmhyZWYsICQuZ2xvYmFsLmxvY2F0aW9uLmhyZWZdLFxuICAgICAgICAgICAgWycxJywgJC5nbG9iYWwubG9jYXRpb24uaHJlZl0sXG4gICAgICAgICAgICBbJyMxJywgJC5nbG9iYWwubG9jYXRpb24uaHJlZl0sXG4gICAgICAgICAgICBbJy9hJywgJC5nbG9iYWwubG9jYXRpb24uaHJlZl1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLnN0cmluZ0lzSW50ZXJuYWxVUkwoLi4udGVzdCkpXG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBgJHskLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbH0vL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZWAgK1xuICAgICAgICAgICAgICAgICAgICAnP3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICdmdHA6Ly93d3cudGVzdC5kZS9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICd0ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBgJHskLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbH0vL3d3dy50ZXN0LmRlOmAgK1xuICAgICAgICAgICAgICAgIGAkeyQuZ2xvYmFsLmxvY2F0aW9uLnBvcnR9L3NpdGUvc3ViU2l0ZWAgK1xuICAgICAgICAgICAgICAgICc/cGFyYW09dmFsdWUjaGFzaC9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgYGh0dHA6Ly93d3cudGVzdC5kZTokeyQuZ2xvYmFsLmxvY2F0aW9uLnBvcnR9L3NpdGUvc3ViU2l0ZT9gICtcbiAgICAgICAgICAgICAgICAgICAgJ3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICdodHRwczovL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJ1xuICAgICAgICAgICAgXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKCQuVG9vbHMuY2xhc3Muc3RyaW5nSXNJbnRlcm5hbFVSTCguLi50ZXN0KSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nTm9ybWFsaXplVVJMICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbJ3d3dy50ZXN0LmNvbScsICdodHRwOi8vd3d3LnRlc3QuY29tJ10sXG4gICAgICAgICAgICBbJ3Rlc3QnLCAnaHR0cDovL3Rlc3QnXSxcbiAgICAgICAgICAgIFsnaHR0cDovL3Rlc3QnLCAnaHR0cDovL3Rlc3QnXSxcbiAgICAgICAgICAgIFsnaHR0cHM6Ly90ZXN0JywgJ2h0dHBzOi8vdGVzdCddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5zdHJpbmdOb3JtYWxpemVVUkwodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ1JlcHJlc2VudFVSTCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgWydodHRwOi8vd3d3LnRlc3QuY29tJywgJ3d3dy50ZXN0LmNvbSddLFxuICAgICAgICAgICAgWydmdHA6Ly93d3cudGVzdC5jb20nLCAnZnRwOi8vd3d3LnRlc3QuY29tJ10sXG4gICAgICAgICAgICBbJ2h0dHBzOi8vd3d3LnRlc3QuY29tJywgJ3d3dy50ZXN0LmNvbSddLFxuICAgICAgICAgICAgW3VuZGVmaW5lZCwgJyddLFxuICAgICAgICAgICAgW251bGwsICcnXSxcbiAgICAgICAgICAgIFtmYWxzZSwgJyddLFxuICAgICAgICAgICAgW3RydWUsICcnXSxcbiAgICAgICAgICAgIFsnJywgJyddLFxuICAgICAgICAgICAgWycgJywgJyddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5zdHJpbmdSZXByZXNlbnRVUkwodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICAvLyAvLy8gZW5kcmVnaW9uXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdDb21wcmVzc1N0eWxlVmFsdWUgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbJycsICcnXSxcbiAgICAgICAgICAgIFsnIGJvcmRlcjogMXB4ICBzb2xpZCByZWQ7JywgJ2JvcmRlcjoxcHggc29saWQgcmVkJ10sXG4gICAgICAgICAgICBbJ2JvcmRlciA6IDFweCBzb2xpZCByZWQgJywgJ2JvcmRlcjoxcHggc29saWQgcmVkJ10sXG4gICAgICAgICAgICBbJ2JvcmRlciA6IDFweCAgc29saWQgcmVkIDsnLCAnYm9yZGVyOjFweCBzb2xpZCByZWQnXSxcbiAgICAgICAgICAgIFsnYm9yZGVyIDogMXB4ICBzb2xpZCByZWQgICA7ICcsICdib3JkZXI6MXB4IHNvbGlkIHJlZCddLFxuICAgICAgICAgICAgWydoZWlnaHQ6IDFweCA7IHdpZHRoOjJweCA7ICcsICdoZWlnaHQ6MXB4O3dpZHRoOjJweCddLFxuICAgICAgICAgICAgWyc7O2hlaWdodDogMXB4IDsgd2lkdGg6MnB4IDsgOycsICdoZWlnaHQ6MXB4O3dpZHRoOjJweCddLFxuICAgICAgICAgICAgWycgOztoZWlnaHQ6IDFweCA7IHdpZHRoOjJweCA7IDsnLCAnaGVpZ2h0OjFweDt3aWR0aDoycHgnXSxcbiAgICAgICAgICAgIFsnO2hlaWdodDogMXB4IDsgd2lkdGg6MnB4IDsgJywgJ2hlaWdodDoxcHg7d2lkdGg6MnB4J11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0NvbXByZXNzU3R5bGVWYWx1ZSh0ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nQ2FtZWxDYXNlVG9EZWxpbWl0ZWQgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbWydoYW5zUGV0ZXInXSwgJ2hhbnMtcGV0ZXInXSxcbiAgICAgICAgICAgIFtbJ2hhbnNQZXRlcicsICd8J10sICdoYW5zfHBldGVyJ10sXG4gICAgICAgICAgICBbWycnXSwgJyddLFxuICAgICAgICAgICAgW1snaCddLCAnaCddLFxuICAgICAgICAgICAgW1snaFAnLCAnJ10sICdocCddLFxuICAgICAgICAgICAgW1snaGFuc1BldGVyJ10sICdoYW5zLXBldGVyJ10sXG4gICAgICAgICAgICBbWydoYW5zLXBldGVyJ10sICdoYW5zLXBldGVyJ10sXG4gICAgICAgICAgICBbWydoYW5zUGV0ZXInLCAnXyddLCAnaGFuc19wZXRlciddLFxuICAgICAgICAgICAgW1snaGFuc1BldGVyJywgJysnXSwgJ2hhbnMrcGV0ZXInXSxcbiAgICAgICAgICAgIFtbJ0hhbnMnXSwgJ2hhbnMnXSxcbiAgICAgICAgICAgIFtbJ2hhbnNBUElVUkwnLCAnLScsIFsnYXBpJywgJ3VybCddXSwgJ2hhbnMtYXBpLXVybCddLFxuICAgICAgICAgICAgW1snaGFuc1BldGVyJywgJy0nLCBbXV0sICdoYW5zLXBldGVyJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0NhbWVsQ2FzZVRvRGVsaW1pdGVkKC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdDYXBpdGFsaXplICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbJ2hhbnNQZXRlcicsICdIYW5zUGV0ZXInXSxcbiAgICAgICAgICAgIFsnJywgJyddLFxuICAgICAgICAgICAgWydhJywgJ0EnXSxcbiAgICAgICAgICAgIFsnQScsICdBJ10sXG4gICAgICAgICAgICBbJ0FBJywgJ0FBJ10sXG4gICAgICAgICAgICBbJ0FhJywgJ0FhJ10sXG4gICAgICAgICAgICBbJ2FhJywgJ0FhJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0NhcGl0YWxpemUodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ0RlbGltaXRlZFRvQ2FtZWxDYXNlICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1snaGFucy1wZXRlciddLCAnaGFuc1BldGVyJ10sXG4gICAgICAgICAgICBbWydoYW5zfHBldGVyJywgJ3wnXSwgJ2hhbnNQZXRlciddLFxuICAgICAgICAgICAgW1snJ10sICcnXSxcbiAgICAgICAgICAgIFtbJ2gnXSwgJ2gnXSxcbiAgICAgICAgICAgIFtbJ2hhbnMtcGV0ZXInXSwgJ2hhbnNQZXRlciddLFxuICAgICAgICAgICAgW1snaGFucy0tcGV0ZXInXSwgJ2hhbnMtUGV0ZXInXSxcbiAgICAgICAgICAgIFtbJ0hhbnMtUGV0ZXInXSwgJ0hhbnNQZXRlciddLFxuICAgICAgICAgICAgW1snLUhhbnMtUGV0ZXInXSwgJy1IYW5zUGV0ZXInXSxcbiAgICAgICAgICAgIFtbJy0nXSwgJy0nXSxcbiAgICAgICAgICAgIFtbJ2hhbnMtcGV0ZXInLCAnXyddLCAnaGFucy1wZXRlciddLFxuICAgICAgICAgICAgW1snaGFuc19wZXRlcicsICdfJ10sICdoYW5zUGV0ZXInXSxcbiAgICAgICAgICAgIFtbJ2hhbnNfaWQnLCAnXyddLCAnaGFuc0lEJ10sXG4gICAgICAgICAgICBbWyd1cmxfaGFuc19pZCcsICdfJywgWydoYW5zJ11dLCAndXJsSEFOU0lkJ10sXG4gICAgICAgICAgICBbWyd1cmxfaGFuc18xJywgJ18nXSwgJ3VybEhhbnMxJ10sXG4gICAgICAgICAgICBbWydoYW5zVXJsMScsICctJywgWyd1cmwnXSwgdHJ1ZV0sICdoYW5zVXJsMSddLFxuICAgICAgICAgICAgW1snaGFucy11cmwnLCAnLScsIFsndXJsJ10sIHRydWVdLCAnaGFuc1VSTCddLFxuICAgICAgICAgICAgW1snaGFucy1VcmwnLCAnLScsIFsndXJsJ10sIHRydWVdLCAnaGFuc1VybCddLFxuICAgICAgICAgICAgW1snaGFucy1VcmwnLCAnLScsIFsndXJsJ10sIGZhbHNlXSwgJ2hhbnNVUkwnXSxcbiAgICAgICAgICAgIFtbJ2hhbnMtVXJsJywgJy0nLCBbXSwgZmFsc2VdLCAnaGFuc1VybCddLFxuICAgICAgICAgICAgW1snaGFucy0tVXJsJywgJy0nLCBbXSwgZmFsc2UsIHRydWVdLCAnaGFuc1VybCddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5zdHJpbmdEZWxpbWl0ZWRUb0NhbWVsQ2FzZSguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nRm9ybWF0ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbWyd7MX0nLCAndGVzdCddLCAndGVzdCddLFxuICAgICAgICAgICAgW1snJywgJ3Rlc3QnXSwgJyddLFxuICAgICAgICAgICAgW1snezF9J10sICd7MX0nXSxcbiAgICAgICAgICAgIFtbJ3sxfSB0ZXN0IHsyfSAtIHsyfScsIDEsIDJdLCAnMSB0ZXN0IDIgLSAyJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0Zvcm1hdCguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nR2V0UmVndWxhckV4cHJlc3Npb25WYWxpZGF0ZWQgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbYHRoYXQncyBubyByZWdleDogLiokYCwgYHRoYXQncyBubyByZWdleDogXFxcXC5cXFxcKlxcXFwkYF0sXG4gICAgICAgICAgICBbJycsICcnXSxcbiAgICAgICAgICAgIFsnLVtdKCleJCorLn0tXFxcXCcsICdcXFxcLVxcXFxbXFxcXF1cXFxcKFxcXFwpXFxcXF5cXFxcJFxcXFwqXFxcXCtcXFxcLlxcXFx9XFxcXC1cXFxcXFxcXCddLFxuICAgICAgICAgICAgWyctJywgJ1xcXFwtJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0dldFJlZ3VsYXJFeHByZXNzaW9uVmFsaWRhdGVkKHRlc3RbMF0pLFxuICAgICAgICAgICAgICAgIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ0xvd2VyQ2FzZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgWydIYW5zUGV0ZXInLCAnaGFuc1BldGVyJ10sXG4gICAgICAgICAgICBbJycsICcnXSxcbiAgICAgICAgICAgIFsnQScsICdhJ10sXG4gICAgICAgICAgICBbJ2EnLCAnYSddLFxuICAgICAgICAgICAgWydhYScsICdhYSddLFxuICAgICAgICAgICAgWydBYScsICdhYSddLFxuICAgICAgICAgICAgWydhYScsICdhYSddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5zdHJpbmdMb3dlckNhc2UodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ0ZpbmROb3JtYWxpemVkTWF0Y2hSYW5nZSAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbJycsICcnXSwgbnVsbF0sXG4gICAgICAgICAgICBbWydoYW5zJywgJyddLCBudWxsXSxcbiAgICAgICAgICAgIFtbJ2hhbnMnLCAnYSddLCBbMSwgMl1dLFxuICAgICAgICAgICAgW1snaGFucycsICdhbiddLCBbMSwgM11dLFxuICAgICAgICAgICAgW1snaGFucycsICdoYW4nXSwgWzAsIDNdXSxcbiAgICAgICAgICAgIFtbJ2hhbnMnLCAnaGFucyddLCBbMCwgNF1dLFxuICAgICAgICAgICAgW1snaGFucycsICdhbnMnXSwgWzEsIDRdXSxcbiAgICAgICAgICAgIFtbJ2hhbnMgaGFucycsICdhbnMnXSwgWzEsIDRdXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJyBoQW5zICcsICdhbnMnLCAodmFsdWU6YW55KTpzdHJpbmcgPT4gdmFsdWUudG9Mb3dlckNhc2UoKV0sXG4gICAgICAgICAgICAgICAgWzIsIDVdXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFsnYSBzdHJhw59lIGInLCAnc3RyYXNzZScsICh2YWx1ZTphbnkpOnN0cmluZyA9PlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5yZXBsYWNlKC/Dny9nLCAnc3MnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbMiwgOF1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWydhIHN0cmFzc2UgYicsICdzdHJhc3NlJywgKHZhbHVlOmFueSk6c3RyaW5nID0+XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnJlcGxhY2UoL8OfL2csICdzcycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFsyLCA5XVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJ2Egc3RyYXNzZSBiJywgJ3N0cmHDn2UnLCAodmFsdWU6YW55KTpzdHJpbmcgPT5cbiAgICAgICAgICAgICAgICAgICAgdmFsdWUucmVwbGFjZSgvw58vZywgJ3NzJykudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgWzIsIDldXG4gICAgICAgICAgICBdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3Muc3RyaW5nRmluZE5vcm1hbGl6ZWRNYXRjaFJhbmdlKFxuICAgICAgICAgICAgICAgIC4uLnRlc3RbMF1cbiAgICAgICAgICAgICksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ01hcmsgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbJyddLCAnJ10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJ2UnXSwgJ3Q8c3BhbiBjbGFzcz1cInRvb2xzLW1hcmtcIj5lPC9zcGFuPnN0J10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJ2VzJ10sICd0PHNwYW4gY2xhc3M9XCJ0b29scy1tYXJrXCI+ZXM8L3NwYW4+dCddLFxuICAgICAgICAgICAgW1sndGVzdCcsICd0ZXN0J10sICc8c3BhbiBjbGFzcz1cInRvb2xzLW1hcmtcIj50ZXN0PC9zcGFuPiddLFxuICAgICAgICAgICAgW1sndGVzdCcsICcnXSwgJ3Rlc3QnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAndGVzdHMnXSwgJ3Rlc3QnXSxcbiAgICAgICAgICAgIFtbJycsICd0ZXN0J10sICcnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnZScsICc8YT57MX08L2E+J10sICd0PGE+ZTwvYT5zdCddLFxuICAgICAgICAgICAgW1sndGVzdCcsIFsnZSddLCAnPGE+ezF9PC9hPiddLCAndDxhPmU8L2E+c3QnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnRScsICc8YT57MX08L2E+J10sICd0PGE+ZTwvYT5zdCddLFxuICAgICAgICAgICAgW1sndGVzdCcsICdFJywgJzxhPnsxfTwvYT4nXSwgJ3Q8YT5lPC9hPnN0J10sXG4gICAgICAgICAgICBbWyd0ZXNUJywgJ3QnLCAnPGE+ezF9PC9hPiddLCAnPGE+dDwvYT5lczxhPlQ8L2E+J10sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWyd0ZXNUJywgJ3QnLCAnPGE+ezF9IC0gezF9PC9hPiddLFxuICAgICAgICAgICAgICAgICc8YT50IC0gdDwvYT5lczxhPlQgLSBUPC9hPidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWyd0ZXN0JywgJ0UnLCAnPGE+ezF9PC9hPicsICh2YWx1ZTphbnkpOnN0cmluZyA9PiBgJHt2YWx1ZX1gXSxcbiAgICAgICAgICAgICAgICAndGVzdCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWydhYmNkJywgWydhJywgJ2MnXV0sXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwidG9vbHMtbWFya1wiPmE8L3NwYW4+YicgK1xuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInRvb2xzLW1hcmtcIj5jPC9zcGFuPmQnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFsnYWFiY2QnLCBbJ2EnLCAnYyddXSxcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ0b29scy1tYXJrXCI+YTwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ0b29scy1tYXJrXCI+YTwvc3Bhbj5iJyArXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwidG9vbHMtbWFya1wiPmM8L3NwYW4+ZCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWydhY2JjZCcsIFsnYScsICdjJywgJ2QnXV0sXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwidG9vbHMtbWFya1wiPmE8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwidG9vbHMtbWFya1wiPmM8L3NwYW4+YicgK1xuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInRvb2xzLW1hcmtcIj5jPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInRvb2xzLW1hcmtcIj5kPC9zcGFuPidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWydhIEVCaWtlcyBNw7xuY2hlbicsIFsnZWJpa2VzJywgJ23DvG5jaGVuJ10sICc8YT57MX08L2E+JywgKFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTphbnlcbiAgICAgICAgICAgICAgICApOnN0cmluZyA9PiBgJHt2YWx1ZX1gLnRvTG93ZXJDYXNlKCldLFxuICAgICAgICAgICAgICAgICdhIDxhPkVCaWtlczwvYT4gPGE+TcO8bmNoZW48L2E+J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJ2EgRS1CaWtlcyBNw7xuY2hlbicsIFsnZWJpa2VzJywgJ23DvG5jaGVuJ10sICc8YT57MX08L2E+JywgKFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTphbnlcbiAgICAgICAgICAgICAgICApOnN0cmluZyA9PiBgJHt2YWx1ZX1gLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnLScsICcnKV0sXG4gICAgICAgICAgICAgICAgJ2EgPGE+RS1CaWtlczwvYT4gPGE+TcO8bmNoZW48L2E+J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJ2Egc3RyLiAyJywgWydzdHJhw59lJywgJzInXSwgJzxhPnsxfTwvYT4nLCAoXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOmFueVxuICAgICAgICAgICAgICAgICk6c3RyaW5nID0+IGAke3ZhbHVlfWAudG9Mb3dlckNhc2UoKS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgICAnc3RyLicsICdzdHJhc3NlJ1xuICAgICAgICAgICAgICAgICkucmVwbGFjZSgnw58nLCAnc3MnKV0sXG4gICAgICAgICAgICAgICAgJ2EgPGE+c3RyLjwvYT4gPGE+MjwvYT4nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJ0VHTyBNb3ZlbWVudCBTdG9yZSBFLUJpa2VzIE3DvG5jaGVuJyxcbiAgICAgICAgICAgICAgICAgICAgWydlQmlrZXMnLCAnTcO8bmNoZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgJzxhPnsxfTwvYT4nLCAodmFsdWU6YW55KTpzdHJpbmcgPT4gYCR7dmFsdWV9YC50b0xvd2VyQ2FzZShcbiAgICAgICAgICAgICAgICAgICAgKS5yZXBsYWNlKC9bLV9dKy9nLCAnJykucmVwbGFjZSgvw58vZywgJ3NzJykucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgICAgIC8oXnwgKXN0clxcLi9nLCAnJDFzdHJhc3NlJ1xuICAgICAgICAgICAgICAgICAgICApLnJlcGxhY2UoL1smIF0rL2csICcgJylcbiAgICAgICAgICAgICAgICBdLCAnRUdPIE1vdmVtZW50IFN0b3JlIDxhPkUtQmlrZXM8L2E+IDxhPk3DvG5jaGVuPC9hPidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnc3RyLkEgc3RyYXNzZSBCIHN0cmHDn2UgQyBzdHIuIEQnLCBbJ3N0ci4nXSxcbiAgICAgICAgICAgICAgICAgICAgJzxhPnsxfTwvYT4nLCAodmFsdWU6YW55KTpzdHJpbmcgPT4gYCR7dmFsdWV9YC50b0xvd2VyQ2FzZShcbiAgICAgICAgICAgICAgICAgICAgKS5yZXBsYWNlKC9bLV9dKy9nLCAnJykucmVwbGFjZSgvw58vZywgJ3NzJykucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgICAgIC8oXnwgKXN0clxcLi9nLCAnJDFzdHJhc3NlJ1xuICAgICAgICAgICAgICAgICAgICApLnJlcGxhY2UoL1smIF0rL2csICcgJylcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICc8YT5zdHIuPC9hPkEgPGE+c3RyYXNzZTwvYT4gQiA8YT5zdHJhw59lPC9hPiBDIDxhPnN0ci48L2E+IEQnXG4gICAgICAgICAgICBdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5zdHJpbmdNYXJrKC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdNRDUgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbJyddLCAnZDQxZDhjZDk4ZjAwYjIwNGU5ODAwOTk4ZWNmODQyN2UnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnXSwgJzA5OGY2YmNkNDYyMWQzNzNjYWRlNGU4MzI2MjdiNGY2J10sXG4gICAgICAgICAgICBbWyfDpCddLCAnODQxOWI3MWM4N2EyMjVhMmM3MGI1MDQ4NmZiZWU1NDUnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCB0cnVlXSwgJzA5OGY2YmNkNDYyMWQzNzNjYWRlNGU4MzI2MjdiNGY2J10sXG4gICAgICAgICAgICBbWyfDpCcsIHRydWVdLCAnYzE1YmNjNTU3N2Y5ZmFkZTRiNGEzMjU2MTkwYTU5YjAnXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3Muc3RyaW5nTUQ1KC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdOb3JtYWxpemVQaG9uZU51bWJlciAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFsnMCcsICcwJ10sXG4gICAgICAgICAgICBbMCwgJzAnXSxcbiAgICAgICAgICAgIFsnKzQ5IDE3MiAoMCkgLyAwMjEyIC0gMycsICcwMDQ5MTcyMDAyMTIzJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ05vcm1hbGl6ZVBob25lTnVtYmVyKHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgaWYgKFRBUkdFVF9URUNITk9MT0dZID09PSAnbm9kZScpXG4gICAgICAgIHRoaXMudGVzdCgnc3RyaW5nUGFyc2VFbmNvZGVkT2JqZWN0JywgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgICAgIFtbJyddLCBudWxsXSxcbiAgICAgICAgICAgICAgICBbWydudWxsJ10sIG51bGxdLFxuICAgICAgICAgICAgICAgIFtbJ3thOiB1bmRlZmluZWR9J10sIHthOiB1bmRlZmluZWR9XSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIFtuZXcgQnVmZmVyKCd7YTogdW5kZWZpbmVkfScpLnRvU3RyaW5nKCdiYXNlNjQnKV0sXG4gICAgICAgICAgICAgICAgICAgIHthOiB1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbWyd7YTogMn0nXSwge2E6IDJ9XSxcbiAgICAgICAgICAgICAgICBbW25ldyBCdWZmZXIoJ3thOiAxfScpLnRvU3RyaW5nKCdiYXNlNjQnKV0sIHthOiAxfV0sXG4gICAgICAgICAgICAgICAgW1snbnVsbCddLCBudWxsXSxcbiAgICAgICAgICAgICAgICBbW25ldyBCdWZmZXIoJ251bGwnKS50b1N0cmluZygnYmFzZTY0JyldLCBudWxsXSxcbiAgICAgICAgICAgICAgICBbWyd7fSddLCB7fV0sXG4gICAgICAgICAgICAgICAgW1tuZXcgQnVmZmVyKCd7fScpLnRvU3RyaW5nKCdiYXNlNjQnKV0sIHt9XSxcbiAgICAgICAgICAgICAgICBbWyd7YTogYX0nXSwgbnVsbF0sXG4gICAgICAgICAgICAgICAgW1tuZXcgQnVmZmVyKCd7YTogYX0nKS50b1N0cmluZygnYmFzZTY0JyldLCBudWxsXSxcbiAgICAgICAgICAgICAgICBbWyd7YTogc2NvcGUuYX0nLCB7YTogMn1dLCB7YTogMn1dLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgW25ldyBCdWZmZXIoJ3thOiBzY29wZS5hfScpLnRvU3RyaW5nKCdiYXNlNjQnKSwge2E6IDJ9XSxcbiAgICAgICAgICAgICAgICAgICAge2E6IDJ9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ1BhcnNlRW5jb2RlZE9iamVjdCguLi50ZXN0WzBdKSwgdGVzdFsxXVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ1JlcHJlc2VudFBob25lTnVtYmVyICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgWycwJywgJzAnXSxcbiAgICAgICAgICAgIFsnMDE3Mi0xMjMyMS0xJywgJys0OSAoMCkgMTcyIC8gMTIzIDIxLTEnXSxcbiAgICAgICAgICAgIFsnMDE3Mi0xMjMyMTEnLCAnKzQ5ICgwKSAxNzIgLyAxMiAzMiAxMSddLFxuICAgICAgICAgICAgWycwMTcyLTEyMzIxMTEnLCAnKzQ5ICgwKSAxNzIgLyAxMjMgMjEgMTEnXSxcbiAgICAgICAgICAgIFt1bmRlZmluZWQsICcnXSxcbiAgICAgICAgICAgIFtudWxsLCAnJ10sXG4gICAgICAgICAgICBbZmFsc2UsICcnXSxcbiAgICAgICAgICAgIFt0cnVlLCAnJ10sXG4gICAgICAgICAgICBbJycsICcnXSxcbiAgICAgICAgICAgIFsnICcsICcnXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nUmVwcmVzZW50UGhvbmVOdW1iZXIodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ0RlY29kZUhUTUxFbnRpdGllcyAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxzdHJpbmc+IG9mIFtcbiAgICAgICAgICAgIFsnJywgJyddLFxuICAgICAgICAgICAgWyc8ZGl2PjwvZGl2PicsICc8ZGl2PjwvZGl2PiddLFxuICAgICAgICAgICAgWyc8ZGl2PiZhbXA7PC9kaXY+JywgJzxkaXY+JjwvZGl2PiddLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICc8ZGl2PiZhbXA7JmF1bWw7JkF1bWw7JnV1bWw7JlV1bWw7Jm91bWw7Jk91bWw7PC9kaXY+JyxcbiAgICAgICAgICAgICAgICAnPGRpdj4mw6TDhMO8w5zDtsOWPC9kaXY+J1xuICAgICAgICAgICAgXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nRGVjb2RlSFRNTEVudGl0aWVzKHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdOb3JtYWxpemVEb21Ob2RlU2VsZWN0b3IgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8c3RyaW5nPiBvZiBbXG4gICAgICAgICAgICBbJ2RpdicsICdib2R5IGRpdiddLFxuICAgICAgICAgICAgWydkaXYgcCcsICdib2R5IGRpdiBwJ10sXG4gICAgICAgICAgICBbJ2JvZHkgZGl2JywgJ2JvZHkgZGl2J10sXG4gICAgICAgICAgICBbJ2JvZHkgZGl2IHAnLCAnYm9keSBkaXYgcCddLFxuICAgICAgICAgICAgWycnLCAnYm9keSddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgdG9vbHMuc3RyaW5nTm9ybWFsaXplRG9tTm9kZVNlbGVjdG9yKHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6c3RyaW5nIG9mIFtcbiAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAnZGl2LCBwJ1xuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMoe1xuICAgICAgICAgICAgICAgIGRvbU5vZGVTZWxlY3RvclByZWZpeDogJydcbiAgICAgICAgICAgIH0pLnN0cmluZ05vcm1hbGl6ZURvbU5vZGVTZWxlY3Rvcih0ZXN0KSwgdGVzdClcbiAgICB9KVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBudW1iZXJcbiAgICB0aGlzLnRlc3QoYG51bWJlckdldFVUQ1RpbWVzdGFtcCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tuZXcgRGF0ZSgwKV0sIDBdLFxuICAgICAgICAgICAgW1tuZXcgRGF0ZSgxKV0sIDAuMDAxXSxcbiAgICAgICAgICAgIFtbbmV3IERhdGUoMCksIHRydWVdLCAwXSxcbiAgICAgICAgICAgIFtbbmV3IERhdGUoMTAwMCksIGZhbHNlXSwgMV0sXG4gICAgICAgICAgICBbW25ldyBEYXRlKDEwMDApLCB0cnVlXSwgMTAwMF0sXG4gICAgICAgICAgICBbW25ldyBEYXRlKDApLCBmYWxzZV0sIDBdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5udW1iZXJHZXRVVENUaW1lc3RhbXAoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYG51bWJlcklzTm90QU51bWJlciAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW05hTiwgdHJ1ZV0sXG4gICAgICAgICAgICBbe30sIGZhbHNlXSxcbiAgICAgICAgICAgIFt1bmRlZmluZWQsIGZhbHNlXSxcbiAgICAgICAgICAgIFtuZXcgRGF0ZSgpLnRvU3RyaW5nKCksIGZhbHNlXSxcbiAgICAgICAgICAgIFtudWxsLCBmYWxzZV0sXG4gICAgICAgICAgICBbZmFsc2UsIGZhbHNlXSxcbiAgICAgICAgICAgIFt0cnVlLCBmYWxzZV0sXG4gICAgICAgICAgICBbMCwgZmFsc2VdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5udW1iZXJJc05vdEFOdW1iZXIodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYG51bWJlclJvdW5kICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbWzEuNSwgMF0sIDJdLFxuICAgICAgICAgICAgW1sxLjQsIDBdLCAxXSxcbiAgICAgICAgICAgIFtbMS40LCAtMV0sIDBdLFxuICAgICAgICAgICAgW1sxMDAwLCAtMl0sIDEwMDBdLFxuICAgICAgICAgICAgW1s5OTksIC0yXSwgMTAwMF0sXG4gICAgICAgICAgICBbWzk1MCwgLTJdLCAxMDAwXSxcbiAgICAgICAgICAgIFtbOTQ5LCAtMl0sIDkwMF0sXG4gICAgICAgICAgICBbWzEuMjM0NV0sIDFdLFxuICAgICAgICAgICAgW1sxLjIzNDUsIDJdLCAxLjIzXSxcbiAgICAgICAgICAgIFtbMS4yMzQ1LCAzXSwgMS4yMzVdLFxuICAgICAgICAgICAgW1sxLjIzNDUsIDRdLCAxLjIzNDVdLFxuICAgICAgICAgICAgW1s2OTksIC0yXSwgNzAwXSxcbiAgICAgICAgICAgIFtbNjUwLCAtMl0sIDcwMF0sXG4gICAgICAgICAgICBbWzY0OSwgLTJdLCA2MDBdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5udW1iZXJSb3VuZCguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBkYXRhIHRyYW5zZmVyXG4gICAgdGhpcy50ZXN0KCdjaGVja1JlYWNoYWJpbGl0eScsIGFzeW5jIChhc3NlcnQ6T2JqZWN0KTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgY29uc3QgZG9uZTpGdW5jdGlvbiA9IGFzc2VydC5hc3luYygpXG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFsndW5rbm93blVSTCcsIGZhbHNlXSxcbiAgICAgICAgICAgIFsndW5rbm93blVSTCcsIGZhbHNlLCAzMDFdLFxuICAgICAgICAgICAgWydodHRwOi8vdW5rbm93bkhvc3ROYW1lJywgdHJ1ZSwgMjAwLCAwLjAyNV0sXG4gICAgICAgICAgICBbJ2h0dHA6Ly91bmtub3duSG9zdE5hbWUnLCB0cnVlLCBbMjAwXSwgMC4wMjVdLFxuICAgICAgICAgICAgWydodHRwOi8vdW5rbm93bkhvc3ROYW1lJywgdHJ1ZSwgWzIwMCwgMzAxXSwgMC4wMjVdXG4gICAgICAgIF0pXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0ICQuVG9vbHMuY2xhc3MuY2hlY2tSZWFjaGFiaWxpdHkoLi4udGVzdClcbiAgICAgICAgICAgICAgICBhc3NlcnQub2soZmFsc2UpXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGFzc2VydC5vayh0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICBkb25lKClcbiAgICB9KVxuICAgIHRoaXMudGVzdCgnY2hlY2tVbnJlYWNoYWJpbGl0eScsIGFzeW5jIChhc3NlcnQ6T2JqZWN0KTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgY29uc3QgZG9uZTpGdW5jdGlvbiA9IGFzc2VydC5hc3luYygpXG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFsndW5rbm93blVSTCcsIGZhbHNlLCAxMCwgMC4xLCAyMDBdLFxuICAgICAgICAgICAgWyd1bmtub3duVVJMJywgdHJ1ZSwgMTAsIDAuMSwgMjAwXSxcbiAgICAgICAgICAgIFsndW5rbm93blVSTCcsIHRydWUsIDEwLCAwLjEsIFsyMDBdXSxcbiAgICAgICAgICAgIFsndW5rbm93blVSTCcsIHRydWUsIDEwLCAwLjEsIFsyMDAsIDMwMV1dLFxuICAgICAgICAgICAgWydodHRwOi8vdW5rbm93bkhvc3ROYW1lJywgdHJ1ZV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgJC5Ub29scy5jbGFzcy5jaGVja1VucmVhY2hhYmlsaXR5KC4uLnRlc3QpXG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHRydWUpXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGFzc2VydC5vayhmYWxzZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgZG9uZSgpXG4gICAgfSlcbiAgICBpZiAoXG4gICAgICAgIHR5cGVvZiB0YXJnZXRUZWNobm9sb2d5ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0YXJnZXRUZWNobm9sb2d5ID09PSAnd2ViJyAmJiByb3VuZFR5cGUgPT09ICdmdWxsJ1xuICAgICkge1xuICAgICAgICB0aGlzLnRlc3QoYHNlbmRUb0lGcmFtZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlGcmFtZSA9ICQoJzxpZnJhbWU+JykuaGlkZSgpLmF0dHIoJ25hbWUnLCAndGVzdCcpXG4gICAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKGlGcmFtZSlcbiAgICAgICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLnNlbmRUb0lGcmFtZShcbiAgICAgICAgICAgICAgICBpRnJhbWUsIHdpbmRvdy5kb2N1bWVudC5VUkwsIHt0ZXN0OiA1fSwgJ2dldCcsIHRydWUpKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlc3QoYHNlbmRUb0V4dGVybmFsVVJMICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOnZvaWQgPT4gYXNzZXJ0Lm9rKHRvb2xzLnNlbmRUb0V4dGVybmFsVVJMKFxuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LlVSTCwge3Rlc3Q6IDV9KSkpXG4gICAgfVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBmaWxlXG4gICAgaWYgKFRBUkdFVF9URUNITk9MT0dZID09PSAnbm9kZScpIHtcbiAgICAgICAgdGhpcy50ZXN0KGBjb3B5RGlyZWN0b3J5UmVjdXJzaXZlICgke3JvdW5kVHlwZX0pYCwgYXN5bmMgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOlByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICAgICAgY29uc3QgZG9uZTpGdW5jdGlvbiA9IGFzc2VydC5hc3luYygpXG4gICAgICAgICAgICBsZXQgcmVzdWx0OnN0cmluZyA9ICcnXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0ICQuVG9vbHMuY2xhc3MuY29weURpcmVjdG9yeVJlY3Vyc2l2ZShcbiAgICAgICAgICAgICAgICAgICAgJy4vJywgJy4vdGVzdC5jb21waWxlZCcsICgpOm51bGwgPT4gbnVsbClcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFzc2VydC5vayhyZXN1bHQuZW5kc1dpdGgoJy90ZXN0LmNvbXBpbGVkJykpXG4gICAgICAgICAgICByZW1vdmVEaXJlY3RvcnlSZWN1cnNpdmVseVN5bmMoJy4vdGVzdC5jb21waWxlZCcpXG4gICAgICAgICAgICBkb25lKClcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy50ZXN0KGBjb3B5RGlyZWN0b3J5UmVjdXJzaXZlU3luYyAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgICAgIGFzc2VydDpPYmplY3RcbiAgICAgICAgKTp2b2lkID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmNvcHlEaXJlY3RvcnlSZWN1cnNpdmVTeW5jKFxuICAgICAgICAgICAgICAgICcuLycsICcuL3N5bmN0ZXN0LmNvbXBpbGVkJywgKCk6bnVsbCA9PiBudWxsXG4gICAgICAgICAgICApLmVuZHNXaXRoKCcvc3luY3Rlc3QuY29tcGlsZWQnKSlcbiAgICAgICAgICAgIHJlbW92ZURpcmVjdG9yeVJlY3Vyc2l2ZWx5U3luYygnLi9zeW5jdGVzdC5jb21waWxlZCcpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudGVzdChgY29weUZpbGUgKCR7cm91bmRUeXBlfSlgLCBhc3luYyAoXG4gICAgICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgICAgICk6UHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgICAgICBjb25zdCBkb25lOkZ1bmN0aW9uID0gYXNzZXJ0LmFzeW5jKClcbiAgICAgICAgICAgIGxldCByZXN1bHQ6c3RyaW5nID0gJydcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgJC5Ub29scy5jbGFzcy5jb3B5RmlsZShcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5yZXNvbHZlKCcuLycsIHBhdGguYmFzZW5hbWUoX19maWxlbmFtZSkpLFxuICAgICAgICAgICAgICAgICAgICAnLi90ZXN0LmNvbXBpbGVkLmpzJylcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFzc2VydC5vayhyZXN1bHQuZW5kc1dpdGgoJy90ZXN0LmNvbXBpbGVkLmpzJykpXG4gICAgICAgICAgICBmaWxlU3lzdGVtLnVubGlua1N5bmMoJy4vdGVzdC5jb21waWxlZC5qcycpXG4gICAgICAgICAgICBkb25lKClcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy50ZXN0KGBjb3B5RmlsZVN5bmMgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5jb3B5RmlsZVN5bmMoXG4gICAgICAgICAgICAgICAgcGF0aC5yZXNvbHZlKCcuLycsIHBhdGguYmFzZW5hbWUoX19maWxlbmFtZSkpLFxuICAgICAgICAgICAgICAgICcuL3N5bmN0ZXN0LmNvbXBpbGVkLmpzJ1xuICAgICAgICAgICAgKS5lbmRzV2l0aCgnL3N5bmN0ZXN0LmNvbXBpbGVkLmpzJykpXG4gICAgICAgICAgICBmaWxlU3lzdGVtLnVubGlua1N5bmMoJy4vc3luY3Rlc3QuY29tcGlsZWQuanMnKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlc3QoYGlzRGlyZWN0b3J5ICgke3JvdW5kVHlwZX0pYCwgYXN5bmMgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOlByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICAgICAgY29uc3QgZG9uZTpGdW5jdGlvbiA9IGFzc2VydC5hc3luYygpXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGVQYXRoOnN0cmluZyBvZiBbJy4vJywgJy4uLyddKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDpib29sZWFuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgJC5Ub29scy5jbGFzcy5pc0RpcmVjdG9yeShmaWxlUGF0aClcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhc3NlcnQub2socmVzdWx0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlUGF0aDpzdHJpbmcgb2YgW1xuICAgICAgICAgICAgICAgIHBhdGgucmVzb2x2ZSgnLi8nLCBwYXRoLmJhc2VuYW1lKF9fZmlsZW5hbWUpKVxuICAgICAgICAgICAgXSkge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6Ym9vbGVhblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0ICQuVG9vbHMuY2xhc3MuaXNEaXJlY3RvcnkoZmlsZVBhdGgpXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKHJlc3VsdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvbmUoKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlc3QoYGlzRGlyZWN0b3J5U3luYyAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZVBhdGg6c3RyaW5nIG9mIFsnLi8nLCAnLi4vJ10pXG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuaXNEaXJlY3RvcnlTeW5jKGZpbGVQYXRoKSlcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZVBhdGg6c3RyaW5nIG9mIFtcbiAgICAgICAgICAgICAgICBwYXRoLnJlc29sdmUoJy4vJywgcGF0aC5iYXNlbmFtZShfX2ZpbGVuYW1lKSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKCQuVG9vbHMuY2xhc3MuaXNEaXJlY3RvcnlTeW5jKGZpbGVQYXRoKSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy50ZXN0KGBpc0ZpbGUgKCR7cm91bmRUeXBlfSlgLCBhc3luYyAoXG4gICAgICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgICAgICk6UHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgICAgICBjb25zdCBkb25lOkZ1bmN0aW9uID0gYXNzZXJ0LmFzeW5jKClcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZVBhdGg6c3RyaW5nIG9mIFtcbiAgICAgICAgICAgICAgICBwYXRoLnJlc29sdmUoJy4vJywgcGF0aC5iYXNlbmFtZShfX2ZpbGVuYW1lKSlcbiAgICAgICAgICAgIF0pIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OmJvb2xlYW5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCAkLlRvb2xzLmNsYXNzLmlzRmlsZShmaWxlUGF0aClcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhc3NlcnQub2socmVzdWx0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlUGF0aDpzdHJpbmcgb2YgWycuLycsICcuLi8nXSkge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6Ym9vbGVhblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0ICQuVG9vbHMuY2xhc3MuaXNGaWxlKGZpbGVQYXRoKVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFzc2VydC5ub3RPayhyZXN1bHQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb25lKClcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy50ZXN0KGBpc0ZpbGVTeW5jICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlUGF0aDpzdHJpbmcgb2YgW1xuICAgICAgICAgICAgICAgIHBhdGgucmVzb2x2ZSgnLi8nLCBwYXRoLmJhc2VuYW1lKF9fZmlsZW5hbWUpKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5pc0ZpbGVTeW5jKGZpbGVQYXRoKSlcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZVBhdGg6c3RyaW5nIG9mIFsnLi8nLCAnLi4vJ10pXG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKCQuVG9vbHMuY2xhc3MuaXNGaWxlU3luYyhmaWxlUGF0aCkpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudGVzdChgd2Fsa0RpcmVjdG9yeVJlY3Vyc2l2ZWx5ICgke3JvdW5kVHlwZX0pYCwgYXN5bmMgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOlByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICAgICAgY29uc3QgZG9uZTpGdW5jdGlvbiA9IGFzc2VydC5hc3luYygpXG4gICAgICAgICAgICBjb25zdCBmaWxlUGF0aHM6QXJyYXk8c3RyaW5nPiA9IFtdXG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjazpGdW5jdGlvbiA9IChmaWxlUGF0aDpzdHJpbmcpOm51bGwgPT4ge1xuICAgICAgICAgICAgICAgIGZpbGVQYXRocy5wdXNoKGZpbGVQYXRoKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZmlsZXM6QXJyYXk8RmlsZT4gPSBbXVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmaWxlcyA9IGF3YWl0ICQuVG9vbHMuY2xhc3Mud2Fsa0RpcmVjdG9yeVJlY3Vyc2l2ZWx5KFxuICAgICAgICAgICAgICAgICAgICAnLi8nLCBjYWxsYmFjaylcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmaWxlcy5sZW5ndGgsIDEpXG4gICAgICAgICAgICBhc3NlcnQub2soZmlsZXNbMF0uaGFzT3duUHJvcGVydHkoJ3BhdGgnKSlcbiAgICAgICAgICAgIGFzc2VydC5vayhmaWxlc1swXS5oYXNPd25Qcm9wZXJ0eSgnc3RhdCcpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGZpbGVQYXRocy5sZW5ndGgsIDEpXG4gICAgICAgICAgICBkb25lKClcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy50ZXN0KGB3YWxrRGlyZWN0b3J5UmVjdXJzaXZlbHlTeW5jICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOnZvaWQgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlsZVBhdGhzOkFycmF5PHN0cmluZz4gPSBbXVxuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2s6RnVuY3Rpb24gPSAoZmlsZVBhdGg6c3RyaW5nKTpudWxsID0+IHtcbiAgICAgICAgICAgICAgICBmaWxlUGF0aHMucHVzaChmaWxlUGF0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZmlsZXM6QXJyYXk8RmlsZT4gPVxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Mud2Fsa0RpcmVjdG9yeVJlY3Vyc2l2ZWx5U3luYygnLi8nLCBjYWxsYmFjaylcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmaWxlcy5sZW5ndGgsIDEpXG4gICAgICAgICAgICBhc3NlcnQub2soZmlsZXNbMF0uaGFzT3duUHJvcGVydHkoJ3BhdGgnKSlcbiAgICAgICAgICAgIGFzc2VydC5vayhmaWxlc1swXS5oYXNPd25Qcm9wZXJ0eSgnc3RhdCcpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGZpbGVQYXRocy5sZW5ndGgsIDEpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBwcm9jZXNzIGhhbmRsZXJcbiAgICBpZiAoVEFSR0VUX1RFQ0hOT0xPR1kgPT09ICdub2RlJykge1xuICAgICAgICB0aGlzLnRlc3QoYGdldFByb2Nlc3NDbG9zZUhhbmRsZXIgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgICAgICk6dm9pZCA9PiBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICB0eXBlb2YgJC5Ub29scy5jbGFzcy5nZXRQcm9jZXNzQ2xvc2VIYW5kbGVyKFxuICAgICAgICAgICAgICAgICgpOnZvaWQgPT4ge30sICgpOnZvaWQgPT4ge31cbiAgICAgICAgICAgICksICdmdW5jdGlvbicpKVxuICAgICAgICB0aGlzLnRlc3QoYGhhbmRsZUNoaWxkUHJvY2VzcyAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgICAgIGFzc2VydDpPYmplY3RcbiAgICAgICAgKTp2b2lkID0+IHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSBtb2NrdXAgZHVwbGV4IHN0cmVhbSBmb3IgbW9ja2luZyBcInN0ZG91dFwiIGFuZCBcInN0cmRlcnJcIlxuICAgICAgICAgICAgICogcHJvY2VzcyBjb25uZWN0aW9ucy5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY2xhc3MgTW9ja3VwRHVwbGV4U3RyZWFtIGV4dGVuZHMgcmVxdWlyZSgnc3RyZWFtJykuRHVwbGV4IHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBUcmlnZ2VycyBpZiBjb250ZW50cyBmcm9tIGN1cnJlbnQgc3RyZWFtIHNob3VsZCBiZSByZWQuXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHNpemUgLSBOdW1iZXIgb2YgYnl0ZXMgdG8gcmVhZCBhc3luY2hyb25vdXNseS5cbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyBSZWQgZGF0YS5cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBfcmVhZChzaXplOm51bWJlcik6c3RyaW5nIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke3NpemV9YFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBUcmlnZ2VycyBpZiBjb250ZW50cyBzaG91bGQgYmUgd3JpdHRlbiBvbiBjdXJyZW50IHN0cmVhbS5cbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gY2h1bmsgLSBUaGUgY2h1bmsgdG8gYmUgd3JpdHRlbi4gV2lsbCBhbHdheXMgYmUgYVxuICAgICAgICAgICAgICAgICAqIGJ1ZmZlciB1bmxlc3MgdGhlIFwiZGVjb2RlU3RyaW5nc1wiIG9wdGlvbiB3YXMgc2V0IHRvIFwiZmFsc2VcIi5cbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gZW5jb2RpbmcgLSBTcGVjaWZpZXMgZW5jb2RpbmcgdG8gYmUgdXNlZCBhcyBpbnB1dFxuICAgICAgICAgICAgICAgICAqIGRhdGEuXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIC0gV2lsbCBiZSBjYWxsZWQgaWYgZGF0YSBoYXMgYmVlbiB3cml0dGVuLlxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIFJldHVybnMgXCJ0cnVlXCIgaWYgbW9yZSBkYXRhIGNvdWxkIGJlIHdyaXR0ZW4gYW5kXG4gICAgICAgICAgICAgICAgICogXCJmYWxzZVwiIG90aGVyd2lzZS5cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBfd3JpdGUoXG4gICAgICAgICAgICAgICAgICAgIGNodW5rOkJ1ZmZlcnxzdHJpbmcsIGVuY29kaW5nOnN0cmluZywgY2FsbGJhY2s6RnVuY3Rpb25cbiAgICAgICAgICAgICAgICApOmJvb2xlYW4ge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoJ3Rlc3QnKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzdGRvdXRNb2NrdXBEdXBsZXhTdHJlYW06TW9ja3VwRHVwbGV4U3RyZWFtID1cbiAgICAgICAgICAgICAgICBuZXcgTW9ja3VwRHVwbGV4U3RyZWFtKClcbiAgICAgICAgICAgIGNvbnN0IHN0ZGVyck1vY2t1cER1cGxleFN0cmVhbTpNb2NrdXBEdXBsZXhTdHJlYW0gPVxuICAgICAgICAgICAgICAgIG5ldyBNb2NrdXBEdXBsZXhTdHJlYW0oKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRQcm9jZXNzOkNoaWxkUHJvY2VzcyA9IG5ldyBDaGlsZFByb2Nlc3MoKVxuICAgICAgICAgICAgY2hpbGRQcm9jZXNzLnN0ZG91dCA9IHN0ZG91dE1vY2t1cER1cGxleFN0cmVhbVxuICAgICAgICAgICAgY2hpbGRQcm9jZXNzLnN0ZGVyciA9IHN0ZGVyck1vY2t1cER1cGxleFN0cmVhbVxuXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5oYW5kbGVDaGlsZFByb2Nlc3MoY2hpbGRQcm9jZXNzKSwgY2hpbGRQcm9jZXNzKVxuICAgICAgICB9KVxuICAgIH1cbiAgICAvLyAvLyBlbmRyZWdpb25cbiAgICAvLyAvIGVuZHJlZ2lvblxuICAgIC8vIC8gcmVnaW9uIHByb3RlY3RlZFxuICAgIGlmIChyb3VuZFR5cGUgPT09ICdmdWxsJylcbiAgICAgICAgdGhpcy50ZXN0KGBfYmluZEV2ZW50SGVscGVyICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOnZvaWQgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgICAgIFtbJ2JvZHknXV0sXG4gICAgICAgICAgICAgICAgW1snYm9keSddLCB0cnVlXSxcbiAgICAgICAgICAgICAgICBbWydib2R5J10sIGZhbHNlLCAnYmluZCddXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIGFzc2VydC5vayh0b29scy5fYmluZEV2ZW50SGVscGVyKC4uLnRlc3QpKVxuICAgICAgICB9KVxuICAgIC8vIC8gZW5kcmVnaW9uXG4gICAgLy8gZW5kcmVnaW9uXG59LCBjbG9zZVdpbmRvdzogZmFsc2UsIHJvdW5kVHlwZXM6IFtdfV1cbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIHRlc3QgcnVubmVyIChpbiBicm93c2VyQVBJKVxubGV0IHRlc3RSYW46Ym9vbGVhbiA9IGZhbHNlXG5icm93c2VyQVBJKChicm93c2VyQVBJOkJyb3dzZXJBUEkpOlByb21pc2U8Ym9vbGVhbj4gPT4gVG9vbHMudGltZW91dCgoXG4pOnZvaWQgPT4ge1xuICAgIGZvciAoY29uc3QgZG9tTm9kZVNwZWNpZmljYXRpb246UGxhaW5PYmplY3Qgb2YgW1xuICAgICAgICB7bGluazoge1xuICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgIGhyZWY6ICcvbm9kZV9tb2R1bGVzL3F1bml0anMvcXVuaXQvcXVuaXQuY3NzJyxcbiAgICAgICAgICAgICAgICByZWw6ICdzdHlsZXNoZWV0JyxcbiAgICAgICAgICAgICAgICB0eXBlOiAndGV4dC9jc3MnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5qZWN0OiB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXVxuICAgICAgICB9fSxcbiAgICAgICAge2Rpdjoge2F0dHJpYnV0ZXM6IHtpZDogJ3F1bml0J30sIGluamVjdDogd2luZG93LmRvY3VtZW50LmJvZHl9fSxcbiAgICAgICAge2Rpdjoge1xuICAgICAgICAgICAgYXR0cmlidXRlczoge2lkOiAncXVuaXQtZml4dHVyZSd9LCBpbmplY3Q6IHdpbmRvdy5kb2N1bWVudC5ib2R5XG4gICAgICAgIH19XG4gICAgXSkge1xuICAgICAgICBjb25zdCBkb21Ob2RlTmFtZTpzdHJpbmcgPSBPYmplY3Qua2V5cyhkb21Ob2RlU3BlY2lmaWNhdGlvbilbMF1cbiAgICAgICAgY29uc3QgZG9tTm9kZTpEb21Ob2RlID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZG9tTm9kZU5hbWUpXG4gICAgICAgIGZvciAoY29uc3QgbmFtZTpzdHJpbmcgaW4gZG9tTm9kZVNwZWNpZmljYXRpb25bZG9tTm9kZU5hbWVdLmF0dHJpYnV0ZXMpXG4gICAgICAgICAgICBpZiAoZG9tTm9kZVNwZWNpZmljYXRpb25bZG9tTm9kZU5hbWVdLmF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICAgICBkb21Ob2RlLnNldEF0dHJpYnV0ZShuYW1lLCBkb21Ob2RlU3BlY2lmaWNhdGlvbltcbiAgICAgICAgICAgICAgICAgICAgZG9tTm9kZU5hbWVcbiAgICAgICAgICAgICAgICBdLmF0dHJpYnV0ZXNbbmFtZV0pXG4gICAgICAgIGRvbU5vZGVTcGVjaWZpY2F0aW9uW2RvbU5vZGVOYW1lXS5pbmplY3QuYXBwZW5kQ2hpbGQoZG9tTm9kZSlcbiAgICB9XG4gICAgdGVzdFJhbiA9IHRydWVcbiAgICAvLyByZWdpb24gY29uZmlndXJhdGlvblxuICAgIFFVbml0LmNvbmZpZyA9IFRvb2xzLmV4dGVuZE9iamVjdChRVW5pdC5jb25maWcgfHwge30sIHtcbiAgICAgICAgLypcbiAgICAgICAgbm90cnljYXRjaDogdHJ1ZSxcbiAgICAgICAgbm9nbG9iYWxzOiB0cnVlLFxuICAgICAgICAqL1xuICAgICAgICB0ZXN0VGltZW91dDogMzAgKiAxMDAwLFxuICAgICAgICBzY3JvbGx0b3A6IGZhbHNlXG4gICAgfSlcbiAgICAvLyBlbmRyZWdpb25cbiAgICBjb25zdCB0ZXN0UHJvbWlzZXM6QXJyYXk8UHJvbWlzZTxhbnk+PiA9IFtdXG4gICAgbGV0IGNsb3NlV2luZG93OmJvb2xlYW4gPSBmYWxzZVxuICAgIGZvciAoY29uc3QgdGVzdDpUZXN0IG9mIHRlc3RzKSB7XG4gICAgICAgIGlmICh0ZXN0LmNsb3NlV2luZG93KVxuICAgICAgICAgICAgY2xvc2VXaW5kb3cgPSB0cnVlXG4gICAgICAgIGZvciAoY29uc3Qgcm91bmRUeXBlOnN0cmluZyBvZiBbJ3BsYWluJywgJ2RvY3VtZW50JywgJ2Z1bGwnXSlcbiAgICAgICAgICAgIGlmICh0ZXN0LnJvdW5kVHlwZXMubGVuZ3RoID09PSAwIHx8IHRlc3Qucm91bmRUeXBlcy5pbmNsdWRlcyhcbiAgICAgICAgICAgICAgICByb3VuZFR5cGVcbiAgICAgICAgICAgICkpIHtcbiAgICAgICAgICAgICAgICAvLyBOT1RFOiBFbmZvcmNlIHRvIHJlbG9hZCBtb2R1bGUgdG8gcmViaW5kIFwiJFwiLlxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZXF1aXJlLmNhY2hlW3JlcXVpcmUucmVzb2x2ZSgnY2xpZW50bm9kZScpXVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcmVxdWlyZS5jYWNoZVtyZXF1aXJlLnJlc29sdmUoJ2pxdWVyeScpXVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgIE5PVEU6IE1vZHVsZSBidW5kbGVyIGxpa2Ugd2VicGFjayB3cmFwcyBhIGNvbW1vbmpzXG4gICAgICAgICAgICAgICAgICAgIGVudmlyb25tZW50LiBTbyB3ZSBoYXZlIHRvIHRyeSB0byBjbGVhciB0aGUgdW5kZXJsaW5nXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlLlxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByZXF1ZXN0OnN0cmluZyBvZiBbXG4gICAgICAgICAgICAgICAgICAgICdjbGllbnRub2RlJywgJ2pxdWVyeScsICdqcXVlcnkvZGlzdC9qcXVlcnknLFxuICAgICAgICAgICAgICAgICAgICAnanF1ZXJ5L2Rpc3QvanF1ZXJ5LmpzJywgJ2pxdWVyeS9kaXN0L2pxdWVyeS5taW4nLFxuICAgICAgICAgICAgICAgICAgICAnanF1ZXJ5L2Rpc3QvanF1ZXJ5Lm1pbi5qcycsICdqcXVlcnkvZGlzdC9qcXVlcnkubWluJ1xuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmFsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBkZWxldGUgcmVxdWlyZS5jYWNoZVtyZXF1aXJlLnJlc29sdmUoJ2AgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAke3JlcXVlc3R9JyldYClcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgICAgICAgICAgICAgbGV0ICRib2R5RG9tTm9kZTokRG9tTm9kZVxuICAgICAgICAgICAgICAgIGxldCAkOmFueVxuICAgICAgICAgICAgICAgIGlmIChyb3VuZFR5cGUgPT09ICdwbGFpbicpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LiQgPSBudWxsXG4gICAgICAgICAgICAgICAgICAgICQgPSByZXF1aXJlKCdjbGllbnRub2RlJykuJFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3VuZFR5cGUgPT09ICdmdWxsJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBuYW1lOnN0cmluZyBvZiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RvY3VtZW50JywgJ0VsZW1lbnQnLCAnSFRNTEVsZW1lbnQnLCAnbWF0Y2hNZWRpYScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ05vZGUnXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKG5hbWUgaW4gZ2xvYmFsKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsW25hbWVdID0gd2luZG93W25hbWVdXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuJCA9IHJlcXVpcmUoJ2pxdWVyeScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgJCA9IHJlcXVpcmUoJ2NsaWVudG5vZGUnKS4kXG4gICAgICAgICAgICAgICAgICAgICQuY29udGV4dCA9IHdpbmRvdy5kb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAkYm9keURvbU5vZGUgPSAkKCdib2R5JylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgdG9vbHM6JC5Ub29scyA9IChyb3VuZFR5cGUgPT09ICdwbGFpbicpID8gJC5Ub29scyhcbiAgICAgICAgICAgICAgICApIDogJCgnYm9keScpLlRvb2xzKClcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXN0UHJvbWlzZTo/T2JqZWN0ID0gdGVzdC5jYWxsYmFjay5jYWxsKFxuICAgICAgICAgICAgICAgICAgICBRVW5pdCwgcm91bmRUeXBlLCAoXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgVEFSR0VUX1RFQ0hOT0xPR1kgPT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgICAgICkgPyBudWxsIDogVEFSR0VUX1RFQ0hOT0xPR1ksICQsIGJyb3dzZXJBUEksIHRvb2xzLFxuICAgICAgICAgICAgICAgICAgICAkYm9keURvbU5vZGUpXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgdGVzdFByb21pc2UgPT09ICdvYmplY3QnICYmIHRlc3RQcm9taXNlICYmXG4gICAgICAgICAgICAgICAgICAgICd0aGVuJyBpbiB0ZXN0UHJvbWlzZVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGVzdFByb21pc2VzLnB1c2godGVzdFByb21pc2UpXG4gICAgICAgICAgICB9XG4gICAgfVxuICAgIGlmIChcbiAgICAgICAgdHlwZW9mIFRBUkdFVF9URUNITk9MT0dZID09PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICBUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ25vZGUnXG4gICAgKVxuICAgICAgICBQcm9taXNlLmFsbCh0ZXN0UHJvbWlzZXMpLnRoZW4oKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICBpZiAoY2xvc2VXaW5kb3cpXG4gICAgICAgICAgICAgICAgYnJvd3NlckFQSS53aW5kb3cuY2xvc2UoKVxuICAgICAgICAgICAgUVVuaXQubG9hZCgpXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcjpFcnJvcik6dm9pZCA9PiB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvclxuICAgICAgICB9KVxuICAgIC8vIHJlZ2lvbiBob3QgbW9kdWxlIHJlcGxhY2VtZW50IGhhbmRsZXJcbiAgICAvKlxuICAgICAgICBOT1RFOiBob3QgbW9kdWxlIHJlcGxhY2VtZW50IGRvZXNuJ3Qgd29yayB3aXRoIGFzeW5jIHRlc3RzIHlldCBzaW5jZVxuICAgICAgICBxdW5pdCBpcyBub3QgcmVzZXRhYmxlIHlldDpcblxuICAgICAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgJ2hvdCcgaW4gbW9kdWxlICYmIG1vZHVsZS5ob3QpIHtcbiAgICAgICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICAgICAgICAgIC8vIElnbm9yZVR5cGVDaGVja1xuICAgICAgICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIFFVbml0LnJlc2V0KClcbiAgICAgICAgICAgICAgICBjb25zb2xlLmNsZWFyKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICovXG4gICAgLy8gZW5kcmVnaW9uXG59KSlcbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIGV4cG9ydCB0ZXN0IHJlZ2lzdGVyIGZ1bmN0aW9uXG5sZXQgdGVzdFJlZ2lzdGVyZWQ6Ym9vbGVhbiA9IGZhbHNlXG4vKipcbiAqIFJlZ2lzdGVycyBhIGNvbXBsZXRlIHRlc3Qgc2V0LlxuICogQHBhcmFtIGNhbGxiYWNrIC0gQSBmdW5jdGlvbiBjb250YWluaW5nIGFsbCB0ZXN0cyB0byBydW4uIFRoaXMgY2FsbGJhY2sgZ2V0c1xuICogc29tZSB1c2VmdWwgcGFyYW1ldGVycyBhbmQgd2lsbCBiZSBleGVjdXRlZCBpbiBjb250ZXh0IG9mIHF1bml0LlxuICogQHBhcmFtIHJvdW5kVHlwZXMgLSBBIGxpc3Qgb2Ygcm91bmQgdHlwZXMgd2hpY2ggc2hvdWxkIGJlIGF2b2lkZWQuXG4gKiBAcGFyYW0gY2xvc2VXaW5kb3cgLSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgd2luZG93IG9iamVjdCBzaG91bGQgYmUgY2xvc2VkXG4gKiBhZnRlciBmaW5pc2hpbmcgYWxsIHRlc3RzLlxuICogQHJldHVybnMgVGhlIGxpc3Qgb2YgY3VycmVudGx5IHJlZ2lzdGVyZWQgdGVzdHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKFxuICAgIGNhbGxiYWNrOigoXG4gICAgICAgIHJvdW5kVHlwZTpzdHJpbmcsIHRhcmdldFRlY2hub2xvZ3k6P3N0cmluZywgJDphbnksXG4gICAgICAgIGJyb3dzZXJBUEk6QnJvd3NlckFQSSwgdG9vbHM6T2JqZWN0LCAkYm9keURvbU5vZGU6JERvbU5vZGVcbiAgICApID0+IGFueSksIHJvdW5kVHlwZXM6QXJyYXk8c3RyaW5nPiA9IFtdLCBjbG9zZVdpbmRvdzpib29sZWFuID0gZmFsc2Vcbik6QXJyYXk8VGVzdD4ge1xuICAgIGlmICh0ZXN0UmFuKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnWW91IGhhdmUgdG8gcmVnaXN0ZXIgeW91ciB0ZXN0cyBpbW1lZGlhdGVseSBhZnRlciBpbXBvcnRpbmcgdGhlJyArXG4gICAgICAgICAgICAnIGxpYnJhcnkuJylcbiAgICBpZiAoIXRlc3RSZWdpc3RlcmVkKSB7XG4gICAgICAgIHRlc3RSZWdpc3RlcmVkID0gdHJ1ZVxuICAgICAgICB0ZXN0cyA9IFtdXG4gICAgfVxuICAgIHRlc3RzLnB1c2goe2NhbGxiYWNrLCBjbG9zZVdpbmRvdywgcm91bmRUeXBlc30pXG4gICAgcmV0dXJuIHRlc3RzXG59XG4vLyBlbmRyZWdpb25cbi8vIHJlZ2lvbiB2aW0gbW9kbGluZVxuLy8gdmltOiBzZXQgdGFic3RvcD00IHNoaWZ0d2lkdGg9NCBleHBhbmR0YWI6XG4vLyB2aW06IGZvbGRtZXRob2Q9bWFya2VyIGZvbGRtYXJrZXI9cmVnaW9uLGVuZHJlZ2lvbjpcbi8vIGVuZHJlZ2lvblxuIl19