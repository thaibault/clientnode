
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RGlCLEVBRXBCLE9BQU8saUJBQVAsS0FBNkIsV0FEZixHQUVkLElBRmMsR0FFUCxpQkFIYSxFQUdNLEVBSE4sRUFHUyxVQUhULEVBR3FCLE1BSHJCLEVBSXhCLGFBSndCLENBQTVCO0FBS0EsNEJBQ0ksUUFBTyxXQUFQLHVEQUFPLFdBQVAsT0FBdUIsUUFBdkIsSUFBbUMsV0FBbkMsSUFDQSxVQUFVLFdBRmQsRUFJSSxhQUFhLElBQWIsQ0FBa0IsV0FBbEI7QUFDUDtBQXZETDtBQXdESDtBQWxHSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQW1HTixZQUNJLE9BQU8saUJBQVAsS0FBNkIsV0FBN0IsSUFDQSxzQkFBc0IsTUFGMUIsRUFJSSxrQkFBUSxHQUFSLENBQVksWUFBWixFQUEwQixJQUExQixDQUErQixZQUFXO0FBQ3RDLGdCQUFJLFdBQUosRUFDSSxXQUFXLE1BQVgsQ0FBa0IsS0FBbEI7QUFDSixrQkFBTSxJQUFOO0FBQ0gsU0FKRCxFQUlHLEtBSkgsQ0FJUyxVQUFDLEtBQUQsRUFBc0I7QUFDM0Isa0JBQU0sS0FBTjtBQUNILFNBTkQ7QUFPSjtBQUNBOzs7Ozs7Ozs7Ozs7QUFhQTtBQUNILEtBOUhzRCxDQUE1QztBQUFBLENBQVg7QUErSEE7QUFDQTs7QUE0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQS9CQSxJQUFJLGlCQUF5QixLQUE3QjtBQUNBIiwiZmlsZSI6InRlc3QuY29tcGlsZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuLy8gIyEvdXNyL2Jpbi9lbnYgbm9kZVxuLy8gLSotIGNvZGluZzogdXRmLTggLSotXG4ndXNlIHN0cmljdCdcbi8qICFcbiAgICByZWdpb24gaGVhZGVyXG4gICAgQ29weXJpZ2h0IFRvcmJlbiBTaWNrZXJ0IChpbmZvW1wifmF0flwiXXRvcmJlbi53ZWJzaXRlKSAxNi4xMi4yMDEyXG5cbiAgICBMaWNlbnNlXG4gICAgLS0tLS0tLVxuXG4gICAgVGhpcyBsaWJyYXJ5IHdyaXR0ZW4gYnkgVG9yYmVuIFNpY2tlcnQgc3RhbmQgdW5kZXIgYSBjcmVhdGl2ZSBjb21tb25zXG4gICAgbmFtaW5nIDMuMCB1bnBvcnRlZCBsaWNlbnNlLlxuICAgIFNlZSBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS8zLjAvZGVlZC5kZVxuICAgIGVuZHJlZ2lvblxuKi9cbi8vIHJlZ2lvbiBpbXBvcnRzXG5pbXBvcnQgVG9vbHMgZnJvbSAnY2xpZW50bm9kZSdcbmltcG9ydCB0eXBlIHtEb21Ob2RlLCBGaWxlLCBQbGFpbk9iamVjdCwgJERvbU5vZGV9IGZyb20gJ2NsaWVudG5vZGUnXG5sZXQgQ2hpbGRQcm9jZXNzOkNoaWxkUHJvY2Vzc1xudHJ5IHtcbiAgICBDaGlsZFByb2Nlc3MgPSBldmFsKCdyZXF1aXJlJykoJ2NoaWxkX3Byb2Nlc3MnKS5DaGlsZFByb2Nlc3Ncbn0gY2F0Y2ggKGVycm9yKSB7fVxuLy8gTk9URTogT25seSBuZWVkZWQgZm9yIGRlYnVnZ2luZyB0aGlzIGZpbGUuXG50cnkge1xuICAgIG1vZHVsZS5yZXF1aXJlKCdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInKVxufSBjYXRjaCAoZXJyb3IpIHt9XG5pbXBvcnQgYnJvd3NlckFQSSBmcm9tICd3ZWJvcHRpbWl6ZXIvYnJvd3NlckFQSS5jb21waWxlZCdcbmltcG9ydCB0eXBlIHtCcm93c2VyQVBJfSBmcm9tICd3ZWJvcHRpbWl6ZXIvdHlwZSdcbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIHR5cGVzXG5leHBvcnQgdHlwZSBUZXN0ID0ge1xuICAgIGNhbGxiYWNrOkZ1bmN0aW9uO1xuICAgIGNsb3NlV2luZG93OmJvb2xlYW47XG4gICAgcm91bmRUeXBlczpBcnJheTxzdHJpbmc+XG59XG4vLyBlbmRyZWdpb25cbi8vIHJlZ2lvbiBkZWNsYXJhdGlvblxuZGVjbGFyZSB2YXIgVEFSR0VUX1RFQ0hOT0xPR1k6c3RyaW5nXG4vLyBlbmRyZWdpb25cbi8vIHJlZ2lvbiBkZXRlcm1pbmUgdGVjaG5vbG9neSBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbnNcbmxldCBmaWxlU3lzdGVtOk9iamVjdFxubGV0IHBhdGg6T2JqZWN0XG5sZXQgUVVuaXQ6T2JqZWN0XG5sZXQgcmVtb3ZlRGlyZWN0b3J5UmVjdXJzaXZlbHlTeW5jOkZ1bmN0aW9uXG5pZiAodHlwZW9mIFRBUkdFVF9URUNITk9MT0dZID09PSAndW5kZWZpbmVkJyB8fCBUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ25vZGUnKSB7XG4gICAgcmVxdWlyZSgnY29sb3JzJylcbiAgICBmaWxlU3lzdGVtID0gcmVxdWlyZSgnZnMnKVxuICAgIHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgICBRVW5pdCA9IHJlcXVpcmUoJ3F1bml0JylcbiAgICByZW1vdmVEaXJlY3RvcnlSZWN1cnNpdmVseVN5bmMgPSByZXF1aXJlKCdyaW1yYWYnKS5zeW5jXG4gICAgY29uc3QgZXJyb3JzOkFycmF5PFBsYWluT2JqZWN0PiA9IFtdXG4gICAgbGV0IGluZGVudGlvbjpzdHJpbmcgPSAnJ1xuICAgIGNvbnN0IHNlZW5UZXN0czpTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoKVxuICAgIFFVbml0Lm1vZHVsZVN0YXJ0KChtb2R1bGU6UGxhaW5PYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBpZiAobW9kdWxlLm5hbWUpIHtcbiAgICAgICAgICAgIGluZGVudGlvbiA9ICcgICAgJ1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKG1vZHVsZS5uYW1lLmJvbGQuYmx1ZSlcbiAgICAgICAgfVxuICAgIH0pXG4gICAgUVVuaXQubG9nKChkZXRhaWxzOlBsYWluT2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgaWYgKCFkZXRhaWxzLnJlc3VsdClcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKGRldGFpbHMpXG4gICAgfSlcbiAgICBRVW5pdC50ZXN0RG9uZSgoZGV0YWlsczpQbGFpbk9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGlmIChzZWVuVGVzdHMuaGFzKGRldGFpbHMubmFtZSkpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgc2VlblRlc3RzLmFkZChkZXRhaWxzLm5hbWUpXG4gICAgICAgIGlmIChkZXRhaWxzLmZhaWxlZCkge1xuICAgICAgICAgICAgLy8gSWdub3JlVHlwZUNoZWNrXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oYCR7aW5kZW50aW9ufeKcliAke2RldGFpbHMubmFtZX1gLnJlZClcbiAgICAgICAgICAgIGZvciAoY29uc3QgZXJyb3I6UGxhaW5PYmplY3Qgb2YgZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtpbmRlbnRpb259JHtlcnJvci5tZXNzYWdlLnJlZH1gKVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3IuYWN0dWFsICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKChcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElnbm9yZVR5cGVDaGVja1xuICAgICAgICAgICAgICAgICAgICAgICAgYCR7aW5kZW50aW9ufWFjdHVhbDogYCArIFRvb2xzLnJlcHJlc2VudE9iamVjdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvci5hY3R1YWwsICcgICAgJywgaW5kZW50aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICApICsgYCAoJHt0eXBlb2YgZXJyb3IuYWN0dWFsfSkgIT0gYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgZXhwZWN0ZWQ6IGAgKyBUb29scy5yZXByZXNlbnRPYmplY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IuZXhwZWN0ZWQsICcgICAgJywgaW5kZW50aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICApICsgYCAoJHt0eXBlb2YgZXJyb3IuZXhwZWN0ZWR9KWBcbiAgICAgICAgICAgICAgICAgICAgKS5yZWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlcnJvcnMubGVuZ3RoID0gMFxuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIC8vIElnbm9yZVR5cGVDaGVja1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKGAke2luZGVudGlvbn3inJQgJHtkZXRhaWxzLm5hbWV9YC5ncmVlbilcbiAgICB9KVxuICAgIGNvbnN0IGRvbmU6RnVuY3Rpb24gPSAoZGV0YWlsczpQbGFpbk9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhcbiAgICAgICAgICAgIC8vIElnbm9yZVR5cGVDaGVja1xuICAgICAgICAgICAgYFRlc3RzIGNvbXBsZXRlZCBpbiAke2RldGFpbHMucnVudGltZSAvIDEwMDB9IHNlY29uZHMuYC5ncmV5KVxuICAgICAgICBjb25zdCBtZXNzYWdlOnN0cmluZyA9XG4gICAgICAgICAgICBgJHtkZXRhaWxzLnBhc3NlZH0gdGVzdHMgb2YgJHtkZXRhaWxzLnRvdGFsfSBwYXNzZWQuYFxuICAgICAgICBpZiAoZGV0YWlscy5mYWlsZWQgPiAwKVxuICAgICAgICAgICAgLy8gSWdub3JlVHlwZUNoZWNrXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bWVzc2FnZX0sICR7ZGV0YWlscy5mYWlsZWR9IGZhaWxlZC5gLnJlZC5ib2xkKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICAvLyBJZ25vcmVUeXBlQ2hlY2tcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhgJHttZXNzYWdlfWAuZ3JlZW4uYm9sZClcbiAgICAgICAgcHJvY2Vzcy5vbmNlKCdleGl0JywgKCk6dm9pZCA9PiBwcm9jZXNzLmV4aXQoZGV0YWlscy5mYWlsZWQpKVxuICAgIH1cbiAgICAvLyBOT1RFOiBGaXhlcyBxdW5pdCdzIHVnbHkgbXVsdGkgXCJkb25lKClcIiBjYWxscy5cbiAgICBsZXQgZmluYWxEb25lVGltZW91dElEOj9udW1iZXIgPSBudWxsXG4gICAgUVVuaXQuZG9uZSgoLi4ucGFyYW1ldGVyOkFycmF5PGFueT4pOnZvaWQgPT4ge1xuICAgICAgICBpZiAoZmluYWxEb25lVGltZW91dElEKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoZmluYWxEb25lVGltZW91dElEKVxuICAgICAgICAgICAgZmluYWxEb25lVGltZW91dElEID0gbnVsbFxuICAgICAgICB9XG4gICAgICAgIGZpbmFsRG9uZVRpbWVvdXRJRCA9IHNldFRpbWVvdXQoKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICBmaW5hbERvbmVUaW1lb3V0SUQgPSBzZXRUaW1lb3V0KCgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIGRvbmUoLi4ucGFyYW1ldGVyKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxufSBlbHNlXG4gICAgUVVuaXQgPSByZXF1aXJlKCdzY3JpcHQhcXVuaXQnKSAmJiB3aW5kb3cuUVVuaXRcbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIGRlZmF1bHQgdGVzdCBzcGVjaWZpY2F0aW9uXG5sZXQgdGVzdHM6QXJyYXk8VGVzdD4gPSBbe2NhbGxiYWNrOiBmdW5jdGlvbihcbiAgICByb3VuZFR5cGU6c3RyaW5nLCB0YXJnZXRUZWNobm9sb2d5Oj9zdHJpbmcsICQ6YW55LCBicm93c2VyQVBJOkJyb3dzZXJBUEksXG4gICAgdG9vbHM6T2JqZWN0LCAkYm9keURvbU5vZGU6JERvbU5vZGVcbik6dm9pZCB7XG4gICAgdGhpcy5tb2R1bGUoYHRvb2xzICgke3JvdW5kVHlwZX0pYClcbiAgICAvLyByZWdpb24gdGVzdHNcbiAgICAvLyAvIHJlZ2lvbiBwdWJsaWMgbWV0aG9kc1xuICAgIC8vIC8vIHJlZ2lvbiBzcGVjaWFsXG4gICAgdGhpcy50ZXN0KGBjb25zdHJ1Y3RvciAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IGFzc2VydC5vayhcbiAgICAgICAgdG9vbHMpKVxuICAgIHRoaXMudGVzdChgZGVzdHJ1Y3RvciAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0b29scy5kZXN0cnVjdG9yKCksIHRvb2xzKSlcbiAgICB0aGlzLnRlc3QoYGluaXRpYWxpemUgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IHNlY29uZFRvb2xzSW5zdGFuY2UgPSAkLlRvb2xzKHtsb2dnaW5nOiB0cnVlfSlcbiAgICAgICAgY29uc3QgdGhpcmRUb29sc0luc3RhbmNlID0gJC5Ub29scyh7XG4gICAgICAgICAgICBkb21Ob2RlU2VsZWN0b3JQcmVmaXg6ICdib2R5LnsxfSBkaXYuezF9J30pXG5cbiAgICAgICAgYXNzZXJ0Lm5vdE9rKHRvb2xzLl9vcHRpb25zLmxvZ2dpbmcpXG4gICAgICAgIGFzc2VydC5vayhzZWNvbmRUb29sc0luc3RhbmNlLl9vcHRpb25zLmxvZ2dpbmcpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgIHRoaXJkVG9vbHNJbnN0YW5jZS5fb3B0aW9ucy5kb21Ob2RlU2VsZWN0b3JQcmVmaXgsXG4gICAgICAgICAgICAnYm9keS50b29scyBkaXYudG9vbHMnKVxuICAgIH0pXG4gICAgLy8gLy8gZW5kcmVnaW9uXG4gICAgLy8gLy8gcmVnaW9uIG9iamVjdCBvcmllbnRhdGlvblxuICAgIHRoaXMudGVzdChgY29udHJvbGxlciAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRvb2xzLmNvbnRyb2xsZXIodG9vbHMsIFtdKSwgdG9vbHMpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0b29scy5jb250cm9sbGVyKCQuVG9vbHMuY2xhc3MsIFtdLCAkKFxuICAgICAgICAgICAgJ2JvZHknXG4gICAgICAgICkpLmNvbnN0cnVjdG9yLm5hbWUsICQuVG9vbHMuY2xhc3MubmFtZSlcbiAgICB9KVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBtdXR1YWwgZXhjbHVzaW9uXG4gICAgdGhpcy50ZXN0KGBhY3F1aXJlTG9ja3xyZWxlYXNlTG9jayAoJHtyb3VuZFR5cGV9KWAsIGFzeW5jIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6UHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGNvbnN0IGRvbmU6RnVuY3Rpb24gPSBhc3NlcnQuYXN5bmMoKVxuICAgICAgICBsZXQgdGVzdFZhbHVlOmJvb2xlYW4gPSBmYWxzZVxuICAgICAgICBhd2FpdCB0b29scy5hY3F1aXJlTG9jaygndGVzdCcsICgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgdGVzdFZhbHVlID0gdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICBhc3NlcnQub2sodGVzdFZhbHVlKVxuICAgICAgICBhc3NlcnQub2sodG9vbHMuYWNxdWlyZUxvY2soJ3Rlc3QnLCAoKTp2b2lkID0+IHtcbiAgICAgICAgICAgIHRlc3RWYWx1ZSA9IGZhbHNlXG4gICAgICAgIH0pIGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXNzZXJ0Lm9rKHRlc3RWYWx1ZSlcbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMoKS5yZWxlYXNlTG9jaygndGVzdCcpIGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXNzZXJ0Lm9rKHRlc3RWYWx1ZSlcbiAgICAgICAgYXNzZXJ0Lm9rKHRvb2xzLnJlbGVhc2VMb2NrKCd0ZXN0JykgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICBhc3NlcnQubm90T2sodGVzdFZhbHVlKVxuICAgICAgICBhc3NlcnQub2sodG9vbHMucmVsZWFzZUxvY2soJ3Rlc3QnKSBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgIGFzc2VydC5ub3RPayh0ZXN0VmFsdWUpXG4gICAgICAgIGF3YWl0IHRvb2xzLmFjcXVpcmVMb2NrKCd0ZXN0JywgKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICB0ZXN0VmFsdWUgPSB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIGFzc2VydC5vayh0ZXN0VmFsdWUpXG4gICAgICAgIGFzc2VydC5vayh0b29scy5hY3F1aXJlTG9jaygndGVzdCcsICgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgdGVzdFZhbHVlID0gZmFsc2VcbiAgICAgICAgfSkgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICBhc3NlcnQub2sodGVzdFZhbHVlKVxuICAgICAgICBhc3NlcnQub2sodG9vbHMuYWNxdWlyZUxvY2soJ3Rlc3QnLCAoKTp2b2lkID0+IHtcbiAgICAgICAgICAgIHRlc3RWYWx1ZSA9IHRydWVcbiAgICAgICAgfSkgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICBhc3NlcnQub2sodGVzdFZhbHVlKVxuICAgICAgICB0b29scy5yZWxlYXNlTG9jaygndGVzdCcpXG4gICAgICAgIGFzc2VydC5ub3RPayh0ZXN0VmFsdWUpXG4gICAgICAgIHRvb2xzLnJlbGVhc2VMb2NrKCd0ZXN0JylcbiAgICAgICAgYXNzZXJ0Lm9rKHRlc3RWYWx1ZSlcbiAgICAgICAgdG9vbHMuYWNxdWlyZUxvY2soJ3Rlc3QnKS50aGVuKGFzeW5jIChyZXN1bHQ6c3RyaW5nKTpQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdCwgJ3Rlc3QnKVxuICAgICAgICAgICAgJC5Ub29scy5jbGFzcy50aW1lb3V0KCgpOnRvb2xzLmNvbnN0cnVjdG9yID0+IHRvb2xzLnJlbGVhc2VMb2NrKFxuICAgICAgICAgICAgICAgICd0ZXN0JykpXG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0b29scy5hY3F1aXJlTG9jaygndGVzdCcpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0LCAndGVzdCcpXG4gICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnRpbWVvdXQoKCk6dG9vbHMuY29uc3RydWN0b3IgPT4gdG9vbHMucmVsZWFzZUxvY2soXG4gICAgICAgICAgICAgICAgJ3Rlc3QnKSlcbiAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRvb2xzLmFjcXVpcmVMb2NrKCd0ZXN0JywgKCk6UHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlOkZ1bmN0aW9uKTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgJC5Ub29scy5jbGFzcy50aW1lb3V0KClcbiAgICAgICAgICAgICAgICAgICAgdGVzdFZhbHVlID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0ZXN0VmFsdWUpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBhc3NlcnQubm90T2sodGVzdFZhbHVlKVxuICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgIH0pXG4gICAgICAgIHRvb2xzLnJlbGVhc2VMb2NrKCd0ZXN0JylcbiAgICB9KVxuICAgIHRoaXMudGVzdChgZ2V0U2VtYXBob3JlICgke3JvdW5kVHlwZX0pYCwgYXN5bmMgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgY29uc3Qgc2VtYXBob3JlOk9iamVjdCA9ICQuVG9vbHMuY2xhc3MuZ2V0U2VtYXBob3JlKDIpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUucXVldWUubGVuZ3RoLCAwKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLm51bWJlck9mRnJlZVJlc291cmNlcywgMilcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5udW1iZXJPZlJlc291cmNlcywgMilcbiAgICAgICAgYXdhaXQgc2VtYXBob3JlLmFjcXVpcmUoKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLnF1ZXVlLmxlbmd0aCwgMClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5udW1iZXJPZkZyZWVSZXNvdXJjZXMsIDEpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUubnVtYmVyT2ZSZXNvdXJjZXMsIDIpXG4gICAgICAgIGF3YWl0IHNlbWFwaG9yZS5hY3F1aXJlKClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5xdWV1ZS5sZW5ndGgsIDApXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUubnVtYmVyT2ZGcmVlUmVzb3VyY2VzLCAwKVxuICAgICAgICBzZW1hcGhvcmUuYWNxdWlyZSgpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUucXVldWUubGVuZ3RoLCAxKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLm51bWJlck9mRnJlZVJlc291cmNlcywgMClcbiAgICAgICAgc2VtYXBob3JlLmFjcXVpcmUoKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLnF1ZXVlLmxlbmd0aCwgMilcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5udW1iZXJPZkZyZWVSZXNvdXJjZXMsIDApXG4gICAgICAgIHNlbWFwaG9yZS5yZWxlYXNlKClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5xdWV1ZS5sZW5ndGgsIDEpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUubnVtYmVyT2ZGcmVlUmVzb3VyY2VzLCAwKVxuICAgICAgICBzZW1hcGhvcmUucmVsZWFzZSgpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUucXVldWUubGVuZ3RoLCAwKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLm51bWJlck9mRnJlZVJlc291cmNlcywgMClcbiAgICAgICAgc2VtYXBob3JlLnJlbGVhc2UoKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLnF1ZXVlLmxlbmd0aCwgMClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5udW1iZXJPZkZyZWVSZXNvdXJjZXMsIDEpXG4gICAgICAgIHNlbWFwaG9yZS5yZWxlYXNlKClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlbWFwaG9yZS5xdWV1ZS5sZW5ndGgsIDApXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUubnVtYmVyT2ZGcmVlUmVzb3VyY2VzLCAyKVxuICAgICAgICBzZW1hcGhvcmUucmVsZWFzZSgpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZW1hcGhvcmUucXVldWUubGVuZ3RoLCAwKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VtYXBob3JlLm51bWJlck9mRnJlZVJlc291cmNlcywgMylcbiAgICB9KVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBib29sZWFuXG4gICAgdGhpcy50ZXN0KGBpc051bWVyaWMgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDphbnkgb2YgW1xuICAgICAgICAgICAgMCwgMSwgJy0xMCcsICcwJywgMHhGRiwgJzB4RkYnLCAnOGU1JywgJzMuMTQxNScsICsxMFxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuaXNOdW1lcmljKHRlc3QpKVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6YW55IG9mIFtcbiAgICAgICAgICAgIG51bGwsIHVuZGVmaW5lZCwgZmFsc2UsIHRydWUsICcnLCAnYScsIHt9LCAvYS8sICctMHg0MicsXG4gICAgICAgICAgICAnNy4yYWNkZ3MnLCBOYU4sIEluZmluaXR5XG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQubm90T2soJC5Ub29scy5jbGFzcy5pc051bWVyaWModGVzdCkpXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGlzV2luZG93ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5pc1dpbmRvdyhicm93c2VyQVBJLndpbmRvdykpXG4gICAgICAgIGZvciAoY29uc3QgdGVzdDphbnkgb2YgW251bGwsIHt9LCBicm93c2VyQVBJXSlcbiAgICAgICAgICAgIGFzc2VydC5ub3RPaygkLlRvb2xzLmNsYXNzLmlzV2luZG93KHRlc3QpKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBpc0FycmF5TGlrZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW10sIHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJylcbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmlzQXJyYXlMaWtlKHRlc3QpKVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6YW55IG9mIFt7fSwgbnVsbCwgdW5kZWZpbmVkLCBmYWxzZSwgdHJ1ZSwgL2EvXSlcbiAgICAgICAgICAgIGFzc2VydC5ub3RPaygkLlRvb2xzLmNsYXNzLmlzQXJyYXlMaWtlKHRlc3QpKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBpc0FueU1hdGNoaW5nICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbJycsIFsnJ11dLFxuICAgICAgICAgICAgWyd0ZXN0JywgWy90ZXN0L11dLFxuICAgICAgICAgICAgWyd0ZXN0JywgWy9hLywgL2IvLCAvZXMvXV0sXG4gICAgICAgICAgICBbJ3Rlc3QnLCBbJycsICd0ZXN0J11dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5pc0FueU1hdGNoaW5nKC4uLnRlc3QpKVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbJycsIFtdXSxcbiAgICAgICAgICAgIFsndGVzdCcsIFsvdGVzJC9dXSxcbiAgICAgICAgICAgIFsndGVzdCcsIFsvXmVzdC9dXSxcbiAgICAgICAgICAgIFsndGVzdCcsIFsvXmVzdCQvXV0sXG4gICAgICAgICAgICBbJ3Rlc3QnLCBbJ2EnXV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5ub3RPaygkLlRvb2xzLmNsYXNzLmlzQW55TWF0Y2hpbmcoLi4udGVzdCkpXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGlzUGxhaW5PYmplY3QgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3Qgb2tWYWx1ZTphbnkgb2YgW1xuICAgICAgICAgICAge30sXG4gICAgICAgICAgICB7YTogMX0sXG4gICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctb2JqZWN0ICovXG4gICAgICAgICAgICBuZXcgT2JqZWN0KClcbiAgICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tbmV3LW9iamVjdCAqL1xuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuaXNQbGFpbk9iamVjdChva1ZhbHVlKSlcbiAgICAgICAgZm9yIChjb25zdCBub3RPa1ZhbHVlOmFueSBvZiBbXG4gICAgICAgICAgICBuZXcgU3RyaW5nKCksIE9iamVjdCwgbnVsbCwgMCwgMSwgdHJ1ZSwgdW5kZWZpbmVkXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQubm90T2soJC5Ub29scy5jbGFzcy5pc1BsYWluT2JqZWN0KG5vdE9rVmFsdWUpKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBpc0Z1bmN0aW9uICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IG9rVmFsdWU6YW55IG9mIFtcbiAgICAgICAgICAgIE9iamVjdCwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gMScpLCBmdW5jdGlvbigpOnZvaWQge30sICgpOnZvaWQgPT4ge31cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmlzRnVuY3Rpb24ob2tWYWx1ZSkpXG4gICAgICAgIGZvciAoY29uc3Qgbm90T2tWYWx1ZTphbnkgb2YgW1xuICAgICAgICAgICAgbnVsbCwgZmFsc2UsIDAsIDEsIHVuZGVmaW5lZCwge30sIG5ldyBCb29sZWFuKClcbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5ub3RPaygkLlRvb2xzLmNsYXNzLmlzRnVuY3Rpb24obm90T2tWYWx1ZSkpXG4gICAgfSlcbiAgICAvLyAvLyBlbmRyZWdpb25cbiAgICAvLyAvLyByZWdpb24gbGFuZ3VhZ2UgZml4ZXNcbiAgICB0aGlzLnRlc3QoYG1vdXNlT3V0RXZlbnRIYW5kbGVyRml4ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT5cbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MubW91c2VPdXRFdmVudEhhbmRsZXJGaXgoKCk6dm9pZCA9PiB7fSkpKVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBsb2dnaW5nXG4gICAgdGhpcy50ZXN0KGBsb2cgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIHRvb2xzLmxvZygndGVzdCcpLCB0b29scykpXG4gICAgdGhpcy50ZXN0KGBpbmZvICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRvb2xzLmluZm8oJ3Rlc3QgezB9JyksIHRvb2xzKSlcbiAgICB0aGlzLnRlc3QoYGRlYnVnICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRvb2xzLmRlYnVnKCd0ZXN0JyksIHRvb2xzKSlcbiAgICAvLyBOT1RFOiBUaGlzIHRlc3QgYnJlYWtzIGphdmFTY3JpcHQgbW9kdWxlcyBpbiBzdHJpY3QgbW9kZS5cbiAgICB0aGlzLnNraXAoYCR7cm91bmRUeXBlfS1lcnJvcmAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgdG9vbHMuZXJyb3IoJ2lnbm9yZSB0aGlzIGVycm9yLCBpdCBpcyBvbmx5IGEgezF9JywgJ3Rlc3QnKSwgdG9vbHMpKVxuICAgIHRoaXMudGVzdChgd2FybiAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0b29scy53YXJuKCd0ZXN0JyksIHRvb2xzKSlcbiAgICB0aGlzLnRlc3QoYHNob3cgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFsxLCAnMSAoVHlwZTogXCJudW1iZXJcIiknXSxcbiAgICAgICAgICAgIFtudWxsLCAnbnVsbCAoVHlwZTogXCJudWxsXCIpJ10sXG4gICAgICAgICAgICBbL2EvLCAnL2EvIChUeXBlOiBcInJlZ2V4cFwiKSddLFxuICAgICAgICAgICAgWydoYW5zJywgJ2hhbnMgKFR5cGU6IFwic3RyaW5nXCIpJ10sXG4gICAgICAgICAgICBbe0E6ICdhJywgQjogJ2InfSwgJ0E6IGEgKFR5cGU6IFwic3RyaW5nXCIpXFxuQjogYiAoVHlwZTogXCJzdHJpbmdcIiknXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3Muc2hvdyh0ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICAgICAgYXNzZXJ0Lm9rKChuZXcgUmVnRXhwKFxuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29udHJvbC1yZWdleCAqL1xuICAgICAgICAgICAgJ14oLnxcXG58XFxyfFxcXFx1MjAyOHxcXFxcdTIwMjkpK1xcXFwoVHlwZTogXCJmdW5jdGlvblwiXFxcXCkkJ1xuICAgICAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1jb250cm9sLXJlZ2V4ICovXG4gICAgICAgICkpLnRlc3QoJC5Ub29scy5jbGFzcy5zaG93KCQuVG9vbHMpKSlcbiAgICB9KVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBkb20gbm9kZSBoYW5kbGluZ1xuICAgIGlmIChyb3VuZFR5cGUgPT09ICdmdWxsJykge1xuICAgICAgICAvLyByZWdpb24gZ2V0dGVyXG4gICAgICAgIHRoaXMudGVzdChgZ2V0IG5vcm1hbGl6ZWRDbGFzc05hbWVzICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOnZvaWQgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQoJzxkaXY+JykuVG9vbHMoXG4gICAgICAgICAgICAgICAgJ25vcm1hbGl6ZWRDbGFzc05hbWVzJ1xuICAgICAgICAgICAgKS4kZG9tTm9kZS5wcm9wKCdvdXRlckhUTUwnKSwgJCgnPGRpdj4nKS5wcm9wKCdvdXRlckhUTUwnKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkKCc8ZGl2IGNsYXNzPicpLlRvb2xzKFxuICAgICAgICAgICAgICAgICdub3JtYWxpemVkQ2xhc3NOYW1lcydcbiAgICAgICAgICAgICkuJGRvbU5vZGUuaHRtbCgpLCAkKCc8ZGl2PicpLmh0bWwoKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkKCc8ZGl2IGNsYXNzPVwiXCI+JykuVG9vbHMoXG4gICAgICAgICAgICAgICAgJ25vcm1hbGl6ZWRDbGFzc05hbWVzJ1xuICAgICAgICAgICAgKS4kZG9tTm9kZS5odG1sKCksICQoJzxkaXY+JykuaHRtbCgpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQoJzxkaXYgY2xhc3M9XCJhXCI+JykuVG9vbHMoXG4gICAgICAgICAgICAgICAgJ25vcm1hbGl6ZWRDbGFzc05hbWVzJ1xuICAgICAgICAgICAgKS4kZG9tTm9kZS5wcm9wKCdvdXRlckhUTUwnKSwgJCgnPGRpdiBjbGFzcz1cImFcIj4nKS5wcm9wKFxuICAgICAgICAgICAgICAgICdvdXRlckhUTUwnKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkKCc8ZGl2IGNsYXNzPVwiYiBhXCI+JykuVG9vbHMoXG4gICAgICAgICAgICAgICAgJ25vcm1hbGl6ZWRDbGFzc05hbWVzJ1xuICAgICAgICAgICAgKS4kZG9tTm9kZS5wcm9wKCdvdXRlckhUTUwnKSwgJCgnPGRpdiBjbGFzcz1cImEgYlwiPicpLnByb3AoXG4gICAgICAgICAgICAgICAgJ291dGVySFRNTCcpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQoXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiIGFcIj48cHJlIGNsYXNzPVwiYyBiIGFcIj48L3ByZT48L2Rpdj4nXG4gICAgICAgICAgICApLlRvb2xzKCdub3JtYWxpemVkQ2xhc3NOYW1lcycpLiRkb21Ob2RlLnByb3AoJ291dGVySFRNTCcpLFxuICAgICAgICAgICAgJCgnPGRpdiBjbGFzcz1cImEgYlwiPjxwcmUgY2xhc3M9XCJhIGIgY1wiPjwvcHJlPjwvZGl2PicpLnByb3AoXG4gICAgICAgICAgICAgICAgJ291dGVySFRNTCcpKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlc3QoYGdldCBub3JtYWxpemVkU3R5bGVzICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOnZvaWQgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQoJzxkaXY+JykuVG9vbHMoXG4gICAgICAgICAgICAgICAgJ25vcm1hbGl6ZWRTdHlsZXMnXG4gICAgICAgICAgICApLiRkb21Ob2RlLnByb3AoJ291dGVySFRNTCcpLCAkKCc8ZGl2PicpLnByb3AoJ291dGVySFRNTCcpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQoJzxkaXYgc3R5bGU+JykuVG9vbHMoXG4gICAgICAgICAgICAgICAgJ25vcm1hbGl6ZWRTdHlsZXMnXG4gICAgICAgICAgICApLiRkb21Ob2RlLmh0bWwoKSwgJCgnPGRpdj4nKS5odG1sKCkpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJCgnPGRpdiBzdHlsZT1cIlwiPicpLlRvb2xzKFxuICAgICAgICAgICAgICAgICdub3JtYWxpemVkU3R5bGVzJ1xuICAgICAgICAgICAgKS4kZG9tTm9kZS5odG1sKCksICQoJzxkaXY+JykuaHRtbCgpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQoXG4gICAgICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJib3JkZXI6IDFweCBzb2xpZCAgcmVkIDtcIj4nXG4gICAgICAgICAgICApLlRvb2xzKCdub3JtYWxpemVkU3R5bGVzJykuJGRvbU5vZGUucHJvcCgnb3V0ZXJIVE1MJyksICQoXG4gICAgICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJib3JkZXI6MXB4IHNvbGlkIHJlZFwiPidcbiAgICAgICAgICAgICkucHJvcCgnb3V0ZXJIVE1MJykpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJChcbiAgICAgICAgICAgICAgICAnPGRpdiBzdHlsZT1cIndpZHRoOiA1MHB4O2hlaWdodDogMTAwcHg7XCI+J1xuICAgICAgICAgICAgKS5Ub29scygnbm9ybWFsaXplZFN0eWxlcycpLiRkb21Ob2RlLnByb3AoJ291dGVySFRNTCcpLCAkKFxuICAgICAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiaGVpZ2h0OjEwMHB4O3dpZHRoOjUwcHhcIj4nXG4gICAgICAgICAgICApLnByb3AoJ291dGVySFRNTCcpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQoXG4gICAgICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCI7d2lkdGg6IDUwcHggOyBoZWlnaHQ6MTAwcHhcIj4nXG4gICAgICAgICAgICApLlRvb2xzKCdub3JtYWxpemVkU3R5bGVzJykuJGRvbU5vZGUucHJvcCgnb3V0ZXJIVE1MJyksICQoXG4gICAgICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJoZWlnaHQ6MTAwcHg7d2lkdGg6NTBweFwiPidcbiAgICAgICAgICAgICkucHJvcCgnb3V0ZXJIVE1MJykpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJChcbiAgICAgICAgICAgICAgICAnPGRpdiBzdHlsZT1cIndpZHRoOjEwcHg7aGVpZ2h0OjUwcHhcIj4nICtcbiAgICAgICAgICAgICAgICAnICAgIDxwcmUgc3R5bGU9XCI7O3dpZHRoOjJweDtoZWlnaHQ6MXB4OyBjb2xvcjogcmVkOyBcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvcHJlPicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nXG4gICAgICAgICAgICApLlRvb2xzKCdub3JtYWxpemVkU3R5bGVzJykuJGRvbU5vZGUucHJvcCgnb3V0ZXJIVE1MJyksXG4gICAgICAgICAgICAkKFxuICAgICAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiaGVpZ2h0OjUwcHg7d2lkdGg6MTBweFwiPicgK1xuICAgICAgICAgICAgICAgICcgICAgPHByZSBzdHlsZT1cImNvbG9yOnJlZDtoZWlnaHQ6MXB4O3dpZHRoOjJweFwiPjwvcHJlPicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nXG4gICAgICAgICAgICApLnByb3AoJ291dGVySFRNTCcpKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlc3QoYGdldCBzdHlsZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgICAgICBbJzxzcGFuPicsIHt9XSxcbiAgICAgICAgICAgICAgICBbJzxzcGFuPmhhbnM8L3NwYW4+Jywge31dLFxuICAgICAgICAgICAgICAgIFsnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmJsb2NrXCI+PC9zcGFuPicsIHtkaXNwbGF5OiAnYmxvY2snfV0sXG4gICAgICAgICAgICAgICAgWyc8c3BhbiBzdHlsZT1cImRpc3BsYXk6YmxvY2s7ZmxvYXQ6bGVmdFwiPjwvc3Bhbj4nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsIGZsb2F0OiAnbGVmdCdcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0ICRkb21Ob2RlOiREb21Ob2RlID0gJCh0ZXN0WzBdKVxuICAgICAgICAgICAgICAgICRib2R5RG9tTm9kZS5hcHBlbmQoJGRvbU5vZGUpXG4gICAgICAgICAgICAgICAgY29uc3Qgc3R5bGVzOlBsYWluT2JqZWN0ID0gJGRvbU5vZGUuVG9vbHMoJ3N0eWxlJylcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5TmFtZTpzdHJpbmcgaW4gdGVzdFsxXSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3RbMV0uaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHN0eWxlcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlc1twcm9wZXJ0eU5hbWVdLCB0ZXN0WzFdW3Byb3BlcnR5TmFtZV0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkZG9tTm9kZS5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlc3QoYGdldCB0ZXh0ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PHN0cmluZz4gb2YgW1xuICAgICAgICAgICAgICAgIFsnPGRpdj4nLCAnJ10sXG4gICAgICAgICAgICAgICAgWyc8ZGl2PmhhbnM8L2Rpdj4nLCAnaGFucyddLFxuICAgICAgICAgICAgICAgIFsnPGRpdj48ZGl2PmhhbnM8L2RpdjwvZGl2PicsICcnXSxcbiAgICAgICAgICAgICAgICBbJzxkaXY+aGFuczxkaXY+cGV0ZXI8L2Rpdj48L2Rpdj4nLCAnaGFucyddXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkKHRlc3RbMF0pLlRvb2xzKCd0ZXh0JyksIHRlc3RbMV0pXG4gICAgICAgIH0pXG4gICAgICAgIC8vIGVuZHJlZ2lvblxuICAgICAgICB0aGlzLnRlc3QoYGlzRXF1aXZhbGVudERPTSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgICAgICBbJ3Rlc3QnLCAndGVzdCddLFxuICAgICAgICAgICAgICAgIFsndGVzdCB0ZXN0JywgJ3Rlc3QgdGVzdCddLFxuICAgICAgICAgICAgICAgIFsnPGRpdj4nLCAnPGRpdj4nXSxcbiAgICAgICAgICAgICAgICBbJzxkaXYgY2xhc3M+JywgJzxkaXY+J10sXG4gICAgICAgICAgICAgICAgWyc8ZGl2IGNsYXNzPVwiXCI+JywgJzxkaXY+J10sXG4gICAgICAgICAgICAgICAgWyc8ZGl2IHN0eWxlPicsICc8ZGl2PiddLFxuICAgICAgICAgICAgICAgIFsnPGRpdiBzdHlsZT1cIlwiPicsICc8ZGl2PiddLFxuICAgICAgICAgICAgICAgIFsnPGRpdj48L2Rpdj4nLCAnPGRpdj4nXSxcbiAgICAgICAgICAgICAgICBbJzxkaXYgY2xhc3M9XCJhXCI+PC9kaXY+JywgJzxkaXYgY2xhc3M9XCJhXCI+PC9kaXY+J10sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAkKCc8YSB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImFcIj48L2E+JyksXG4gICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImFcIiB0YXJnZXQ9XCJfYmxhbmtcIj48L2E+J1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnPGEgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCJhXCI+PC9hPicsXG4gICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImFcIiB0YXJnZXQ9XCJfYmxhbmtcIj48L2E+J1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnPGEgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCJhXCI+PGRpdiBiPVwiM1wiIGE9XCIyXCI+PC9kaXY+PC9hPicsXG4gICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImFcIiB0YXJnZXQ9XCJfYmxhbmtcIj48ZGl2IGE9XCIyXCIgYj1cIjNcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PjwvYT4nXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICc8YSB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImIgYVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAnICAgPGRpdiBiPVwiM1wiIGE9XCIyXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICc8L2E+JyxcbiAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYSBiXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICcgICA8ZGl2IGE9XCIyXCIgYj1cIjNcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvYT4nXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbJzxkaXY+YTwvZGl2PjxkaXY+YjwvZGl2PicsICc8ZGl2PmE8L2Rpdj48ZGl2PmI8L2Rpdj4nXSxcbiAgICAgICAgICAgICAgICBbJzxkaXY+YTwvZGl2PmInLCAnPGRpdj5hPC9kaXY+YiddLFxuICAgICAgICAgICAgICAgIFsnPGJyPicsICc8YnIgLz4nXSxcbiAgICAgICAgICAgICAgICBbJzxkaXY+PGJyPjxiciAvPjwvZGl2PicsICc8ZGl2PjxiciAvPjxiciAvPjwvZGl2PiddLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJyA8ZGl2IHN0eWxlPVwiXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICdnZXJtYW48IS0tZGVERS0tPjwhLS1lblVTOiBlbmdsaXNoIC0tPiA8L2Rpdj4nLFxuICAgICAgICAgICAgICAgICAgICAnIDxkaXYgc3R5bGU9XCJcIj5nZXJtYW48IS0tZGVERS0tPjwhLS1lblVTOiBlbmdsaXNoIC0tPiAnICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PidcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFsnYTxicj4nLCAnYTxiciAvPicsIHRydWVdXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmlzRXF1aXZhbGVudERPTSguLi50ZXN0KSlcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgICAgICBbJ3Rlc3QnLCAnJ10sXG4gICAgICAgICAgICAgICAgWyd0ZXN0JywgJ2hhbnMnXSxcbiAgICAgICAgICAgICAgICBbJ3Rlc3QgdGVzdCcsICd0ZXN0dGVzdCddLFxuICAgICAgICAgICAgICAgIFsndGVzdCB0ZXN0OicsICcnXSxcbiAgICAgICAgICAgICAgICBbJzxkaXYgY2xhc3M9XCJhXCI+PC9kaXY+JywgJzxkaXY+J10sXG4gICAgICAgICAgICAgICAgWyQoJzxhIGNsYXNzPVwiYVwiPjwvYT4nKSwgJzxhIGNsYXNzPVwiYVwiIHRhcmdldD1cIl9ibGFua1wiPjwvYT4nXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICc8YSB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImFcIj48ZGl2IGE9XCIyXCI+PC9kaXY+PC9hPicsXG4gICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImFcIiB0YXJnZXQ9XCJfYmxhbmtcIj48L2E+J1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgWyc8ZGl2PmE8L2Rpdj5iJywgJzxkaXY+YTwvZGl2PmMnXSxcbiAgICAgICAgICAgICAgICBbJyA8ZGl2PmE8L2Rpdj4nLCAnPGRpdj5hPC9kaXY+J10sXG4gICAgICAgICAgICAgICAgWyc8ZGl2PmE8L2Rpdj48ZGl2PmJjPC9kaXY+JywgJzxkaXY+YTwvZGl2PjxkaXY+YjwvZGl2PiddLFxuICAgICAgICAgICAgICAgIFsndGV4dCcsICd0ZXh0IGEnXSxcbiAgICAgICAgICAgICAgICBbJ3RleHQnLCAndGV4dCBhJ10sXG4gICAgICAgICAgICAgICAgWyd0ZXh0JywgJ3RleHQgYSAmICsnXVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBhc3NlcnQubm90T2soJC5Ub29scy5jbGFzcy5pc0VxdWl2YWxlbnRET00oLi4udGVzdCkpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIGlmIChyb3VuZFR5cGUgPT09ICdmdWxsJylcbiAgICAgICAgdGhpcy50ZXN0KGBnZXRQb3NpdGlvblJlbGF0aXZlVG9WaWV3cG9ydCAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgICAgIGFzc2VydDpPYmplY3RcbiAgICAgICAgKTp2b2lkID0+IGFzc2VydC5vayhbXG4gICAgICAgICAgICAnYWJvdmUnLCAnbGVmdCcsICdyaWdodCcsICdiZWxvdycsICdpbidcbiAgICAgICAgXS5pbmNsdWRlcyh0b29scy5nZXRQb3NpdGlvblJlbGF0aXZlVG9WaWV3cG9ydCgpKSkpXG4gICAgdGhpcy50ZXN0KGBnZW5lcmF0ZURpcmVjdGl2ZVNlbGVjdG9yICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PHN0cmluZz4gb2YgW1xuICAgICAgICAgICAgWydhLWInLCAnYS1iLCAuYS1iLCBbYS1iXSwgW2RhdGEtYS1iXSwgW3gtYS1iXSwgW2FcXFxcOmJdLCBbYV9iXSddLFxuICAgICAgICAgICAgWydhQicsICdhLWIsIC5hLWIsIFthLWJdLCBbZGF0YS1hLWJdLCBbeC1hLWJdLCBbYVxcXFw6Yl0sIFthX2JdJ10sXG4gICAgICAgICAgICBbJ2EnLCAnYSwgLmEsIFthXSwgW2RhdGEtYV0sIFt4LWFdJ10sXG4gICAgICAgICAgICBbJ2FhJywgJ2FhLCAuYWEsIFthYV0sIFtkYXRhLWFhXSwgW3gtYWFdJ10sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJ2FhQkInLFxuICAgICAgICAgICAgICAgICdhYS1iYiwgLmFhLWJiLCBbYWEtYmJdLCBbZGF0YS1hYS1iYl0sIFt4LWFhLWJiXSwgW2FhXFxcXDpiYl0sJyArXG4gICAgICAgICAgICAgICAgJyBbYWFfYmJdJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnYWFCYkNjRGQnLFxuICAgICAgICAgICAgICAgICdhYS1iYi1jYy1kZCwgLmFhLWJiLWNjLWRkLCBbYWEtYmItY2MtZGRdLCAnICtcbiAgICAgICAgICAgICAgICAnW2RhdGEtYWEtYmItY2MtZGRdLCBbeC1hYS1iYi1jYy1kZF0sICcgK1xuICAgICAgICAgICAgICAgICdbYWFcXFxcOmJiXFxcXDpjY1xcXFw6ZGRdLCBbYWFfYmJfY2NfZGRdJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnbWNlSFJFRicsXG4gICAgICAgICAgICAgICAgJ21jZS1ocmVmLCAubWNlLWhyZWYsIFttY2UtaHJlZl0sIFtkYXRhLW1jZS1ocmVmXSwgJyArXG4gICAgICAgICAgICAgICAgJ1t4LW1jZS1ocmVmXSwgW21jZVxcXFw6aHJlZl0sIFttY2VfaHJlZl0nXG4gICAgICAgICAgICBdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5nZW5lcmF0ZURpcmVjdGl2ZVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIHRlc3RbMF1cbiAgICAgICAgICAgICksIHRlc3RbMV0pXG4gICAgfSlcbiAgICBpZiAocm91bmRUeXBlID09PSAnZnVsbCcpXG4gICAgICAgIHRoaXMudGVzdChgcmVtb3ZlRGlyZWN0aXZlICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGxvY2FsQm9keURvbU5vZGUgPSAkYm9keURvbU5vZGUuVG9vbHMoXG4gICAgICAgICAgICAgICAgJ3JlbW92ZURpcmVjdGl2ZScsICdhJylcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbCgkbG9jYWxCb2R5RG9tTm9kZS5Ub29scygpLnJlbW92ZURpcmVjdGl2ZShcbiAgICAgICAgICAgICAgICAnYSdcbiAgICAgICAgICAgICksICRsb2NhbEJvZHlEb21Ob2RlKVxuICAgICAgICB9KVxuICAgIHRoaXMudGVzdChgZ2V0Tm9ybWFsaXplZERpcmVjdGl2ZU5hbWUgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8c3RyaW5nPiBvZiBbXG4gICAgICAgICAgICBbJ2RhdGEtYScsICdhJ10sXG4gICAgICAgICAgICBbJ3gtYScsICdhJ10sXG4gICAgICAgICAgICBbJ2RhdGEtYS1iYicsICdhQmInXSxcbiAgICAgICAgICAgIFsneDphOmInLCAnYUInXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuZ2V0Tm9ybWFsaXplZERpcmVjdGl2ZU5hbWUodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICBpZiAocm91bmRUeXBlID09PSAnZnVsbCcpXG4gICAgICAgIHRoaXMudGVzdChgZ2V0RGlyZWN0aXZlVmFsdWUgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PlxuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKCQoJ2JvZHknKS5Ub29scygnZ2V0RGlyZWN0aXZlVmFsdWUnLCAnYScpLCBudWxsKSlcbiAgICB0aGlzLnRlc3QoYHNsaWNlRG9tTm9kZVNlbGVjdG9yUHJlZml4ICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRvb2xzLnNsaWNlRG9tTm9kZVNlbGVjdG9yUHJlZml4KCdib2R5IGRpdicpLCAnZGl2JylcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMoe1xuICAgICAgICAgICAgZG9tTm9kZVNlbGVjdG9yUHJlZml4OiAnYm9keSBkaXYnXG4gICAgICAgIH0pLnNsaWNlRG9tTm9kZVNlbGVjdG9yUHJlZml4KCdib2R5IGRpdicpLCAnJylcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMoe1xuICAgICAgICAgICAgZG9tTm9kZVNlbGVjdG9yUHJlZml4OiAnJ1xuICAgICAgICB9KS5zbGljZURvbU5vZGVTZWxlY3RvclByZWZpeCgnYm9keSBkaXYnKSwgJ2JvZHkgZGl2JylcbiAgICB9KVxuICAgIHRoaXMudGVzdChgZ2V0RG9tTm9kZU5hbWUgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxzdHJpbmc+IG9mIFtcbiAgICAgICAgICAgIFsnZGl2JywgJ2RpdiddLFxuICAgICAgICAgICAgWyc8ZGl2PicsICdkaXYnXSxcbiAgICAgICAgICAgIFsnPGRpdiAvPicsICdkaXYnXSxcbiAgICAgICAgICAgIFsnPGRpdj48L2Rpdj4nLCAnZGl2J10sXG4gICAgICAgICAgICBbJ2EnLCAnYSddLFxuICAgICAgICAgICAgWyc8YT4nLCAnYSddLFxuICAgICAgICAgICAgWyc8YSAvPicsICdhJ10sXG4gICAgICAgICAgICBbJzxhPjwvYT4nLCAnYSddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5nZXREb21Ob2RlTmFtZSh0ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIGlmIChyb3VuZFR5cGUgPT09ICdmdWxsJylcbiAgICAgICAgdGhpcy50ZXN0KGBncmFiRG9tTm9kZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdW5pdDogJ2JvZHkgZGl2I3F1bml0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1bml0Rml4dHVyZTogJ2JvZHkgZGl2I3F1bml0LWZpeHR1cmUnXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdW5pdDogJCgnYm9keSBkaXYjcXVuaXQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1bml0Rml4dHVyZTogJCgnYm9keSBkaXYjcXVuaXQtZml4dHVyZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiAkKCdib2R5JylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVuaXQ6ICdkaXYjcXVuaXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVuaXRGaXh0dXJlOiAnZGl2I3F1bml0LWZpeHR1cmUnXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6ICQoJ2JvZHknKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1bml0OiAkKCdib2R5IGRpdiNxdW5pdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVuaXRGaXh0dXJlOiAkKCdib2R5IGRpdiNxdW5pdC1maXh0dXJlJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVuaXQ6ICdkaXYjcXVuaXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1bml0Rml4dHVyZTogJ2RpdiNxdW5pdC1maXh0dXJlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdib2R5J1xuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6ICQoJ2JvZHknKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1bml0OiAkKCdib2R5JykuZmluZCgnZGl2I3F1bml0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBxdW5pdEZpeHR1cmU6ICQoJ2JvZHknKS5maW5kKCdkaXYjcXVuaXQtZml4dHVyZScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICBdKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgJGRvbU5vZGVzID0gdG9vbHMuZ3JhYkRvbU5vZGUoLi4udGVzdFswXSlcbiAgICAgICAgICAgICAgICBkZWxldGUgJGRvbU5vZGVzLndpbmRvd1xuICAgICAgICAgICAgICAgIGRlbGV0ZSAkZG9tTm9kZXMuZG9jdW1lbnRcbiAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCRkb21Ob2RlcywgdGVzdFsxXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAvLyAvLyBlbmRyZWdpb25cbiAgICAvLyAvLyByZWdpb24gc2NvcGVcbiAgICB0aGlzLnRlc3QoYGlzb2xhdGVTY29wZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmlzb2xhdGVTY29wZSh7fSksIHt9KVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuaXNvbGF0ZVNjb3BlKHthOiAyfSksIHthOiAyfSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmlzb2xhdGVTY29wZSh7XG4gICAgICAgICAgICBhOiAyLCBiOiB7YTogWzEsIDJdfVxuICAgICAgICB9KSwge2E6IDIsIGI6IHthOiBbMSwgMl19fSlcbiAgICAgICAgbGV0IHNjb3BlID0gZnVuY3Rpb24oKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuYSA9IDJcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5wcm90b3R5cGUgPSB7YjogMiwgX2E6IDV9XG4gICAgICAgIHNjb3BlID0gbmV3IHNjb3BlKClcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmlzb2xhdGVTY29wZShzY29wZSwgWydfJ10pLCB7XG4gICAgICAgICAgICBfYTogNSwgYTogMiwgYjogdW5kZWZpbmVkXG4gICAgICAgIH0pXG4gICAgICAgIHNjb3BlLmIgPSAzXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmlzb2xhdGVTY29wZShzY29wZSwgWydfJ10pLCB7X2E6IDUsIGE6IDIsIGI6IDN9KVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuaXNvbGF0ZVNjb3BlKHNjb3BlKSwge1xuICAgICAgICAgICAgX2E6IHVuZGVmaW5lZCwgYTogMiwgYjogM30pXG4gICAgICAgIHNjb3BlLl9hID0gNlxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5pc29sYXRlU2NvcGUoc2NvcGUsIFsnXyddKSwge19hOiA2LCBhOiAyLCBiOiAzfSlcbiAgICAgICAgc2NvcGUgPSBmdW5jdGlvbigpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5hID0gMlxuICAgICAgICB9XG4gICAgICAgIHNjb3BlLnByb3RvdHlwZSA9IHtiOiAzfVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuaXNvbGF0ZVNjb3BlKFxuICAgICAgICAgICAgbmV3IHNjb3BlKCksIFsnYiddXG4gICAgICAgICksIHthOiAyLCBiOiAzfSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmlzb2xhdGVTY29wZShuZXcgc2NvcGUoKSksIHtcbiAgICAgICAgICAgIGE6IDIsIGI6IHVuZGVmaW5lZFxuICAgICAgICB9KVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBkZXRlcm1pbmVVbmlxdWVTY29wZU5hbWUgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5kZXRlcm1pbmVVbmlxdWVTY29wZU5hbWUoKS5zdGFydHNXaXRoKFxuICAgICAgICAgICAgJ2NhbGxiYWNrJykpXG4gICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmRldGVybWluZVVuaXF1ZVNjb3BlTmFtZSgnaGFucycpLnN0YXJ0c1dpdGgoXG4gICAgICAgICAgICAnaGFucycpKVxuICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5kZXRlcm1pbmVVbmlxdWVTY29wZU5hbWUoXG4gICAgICAgICAgICAnaGFucycsICcnLCB7fVxuICAgICAgICApLnN0YXJ0c1dpdGgoJ2hhbnMnKSlcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3MuZGV0ZXJtaW5lVW5pcXVlU2NvcGVOYW1lKFxuICAgICAgICAgICAgJ2hhbnMnLCAnJywge30sICdwZXRlcidcbiAgICAgICAgKSwgJ3BldGVyJylcbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuZGV0ZXJtaW5lVW5pcXVlU2NvcGVOYW1lKFxuICAgICAgICAgICAgJ2hhbnMnLCAnJywge3BldGVyOiAyfSwgJ3BldGVyJ1xuICAgICAgICApLnN0YXJ0c1dpdGgoJ2hhbnMnKSlcbiAgICAgICAgY29uc3QgbmFtZTpzdHJpbmcgPSAkLlRvb2xzLmNsYXNzLmRldGVybWluZVVuaXF1ZVNjb3BlTmFtZShcbiAgICAgICAgICAgICdoYW5zJywgJ2tsYXVzJywge3BldGVyOiAyfSwgJ3BldGVyJylcbiAgICAgICAgYXNzZXJ0Lm9rKG5hbWUuc3RhcnRzV2l0aCgnaGFucycpKVxuICAgICAgICBhc3NlcnQub2sobmFtZS5lbmRzV2l0aCgna2xhdXMnKSlcbiAgICAgICAgYXNzZXJ0Lm9rKG5hbWUubGVuZ3RoID4gJ2hhbnMnLmxlbmd0aCArICdrbGF1cycubGVuZ3RoKVxuICAgIH0pXG4gICAgLy8gLy8gZW5kcmVnaW9uXG4gICAgLy8gLy8gcmVnaW9uIGZ1bmN0aW9uIGhhbmRsaW5nXG4gICAgdGhpcy50ZXN0KGBnZXRQYXJhbWV0ZXJOYW1lcyAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW2Z1bmN0aW9uKCk6dm9pZCB7fSwgW11dLFxuICAgICAgICAgICAgWydmdW5jdGlvbigpIHt9JywgW11dLFxuICAgICAgICAgICAgWydmdW5jdGlvbihhLCAvKiBhc2QqLyBiLCBjLyoqLykge30nLCBbJ2EnLCAnYicsICdjJ11dLFxuICAgICAgICAgICAgWycoYSwgLyphc2QqL2IsIGMvKiovKSA9PiB7fScsIFsnYScsICdiJywgJ2MnXV0sXG4gICAgICAgICAgICBbYChhLCAvKmFzZCovYiwgYy8qKi8pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMlxuICAgICAgICAgICAgfWAsIFsnYScsICdiJywgJ2MnXV0sXG4gICAgICAgICAgICBbJyhhLCAvKiBhc2QqL2IsIGMvKiAqLykgPT4gMicsIFsnYScsICdiJywgJ2MnXV0sXG4gICAgICAgICAgICBbJyhhLCAvKiBhc2QqL2IgPSAyLCBjLyogKi8pID0+IDInLCBbJ2EnLCAnYicsICdjJ11dLFxuICAgICAgICAgICAgWydhID0+IDInLCBbJ2EnXV0sXG4gICAgICAgICAgICBbYGNsYXNzIEEge1xuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKGEsIGIsIGMpIHt9XG4gICAgICAgICAgICAgICAgYSgpIHt9XG4gICAgICAgICAgICB9YCwgWydhJywgJ2InLCAnYyddXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmdldFBhcmFtZXRlck5hbWVzKHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBpZGVudGl0eSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgWzIsIDJdLFxuICAgICAgICAgICAgWycnLCAnJ10sXG4gICAgICAgICAgICBbdW5kZWZpbmVkLCB1bmRlZmluZWRdLFxuICAgICAgICAgICAgW251bGwsIG51bGxdLFxuICAgICAgICAgICAgWydoYW5zJywgJ2hhbnMnXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3MuaWRlbnRpdHkodGVzdFswXSksIHRlc3RbMV0pXG4gICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmlkZW50aXR5KHt9KSAhPT0ge30pXG4gICAgICAgIGNvbnN0IHRlc3RPYmplY3QgPSB7fVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5pZGVudGl0eSh0ZXN0T2JqZWN0KSwgdGVzdE9iamVjdClcbiAgICB9KVxuICAgIHRoaXMudGVzdChgaW52ZXJ0QXJyYXlGaWx0ZXIgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5pbnZlcnRBcnJheUZpbHRlcihcbiAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuYXJyYXlEZWxldGVFbXB0eUl0ZW1zXG4gICAgICAgICkoW3thOiBudWxsfV0pLCBbe2E6IG51bGx9XSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmludmVydEFycmF5RmlsdGVyKFxuICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5hcnJheUV4dHJhY3RJZk1hdGNoZXNcbiAgICAgICAgKShbJ2EnLCAnYiddLCAnXmEkJyksIFsnYiddKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGB0aW1lb3V0ICgke3JvdW5kVHlwZX0pYCwgYXN5bmMgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgY29uc3QgZG9uZTpGdW5jdGlvbiA9IGFzc2VydC5hc3luYygpXG4gICAgICAgIGFzc2VydC5ub3RPayhhd2FpdCAkLlRvb2xzLmNsYXNzLnRpbWVvdXQoKSlcbiAgICAgICAgYXNzZXJ0Lm5vdE9rKGF3YWl0ICQuVG9vbHMuY2xhc3MudGltZW91dCgwKSlcbiAgICAgICAgYXNzZXJ0Lm5vdE9rKGF3YWl0ICQuVG9vbHMuY2xhc3MudGltZW91dCgxKSlcbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MudGltZW91dCgpIGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MudGltZW91dCgpLmhhc093blByb3BlcnR5KCdjbGVhcicpKVxuICAgICAgICBsZXQgdGVzdDpib29sZWFuID0gZmFsc2VcbiAgICAgICAgY29uc3QgcmVzdWx0OlByb21pc2U8Ym9vbGVhbj4gPSAkLlRvb2xzLmNsYXNzLnRpbWVvdXQoMTAgKiogMjAsIHRydWUpXG4gICAgICAgIHJlc3VsdC5jYXRjaCgoKTp2b2lkID0+IHtcbiAgICAgICAgICAgIHRlc3QgPSB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIC8vIElnbm9yZVR5cGVDaGVja1xuICAgICAgICByZXN1bHQuY2xlYXIoKVxuICAgICAgICBsZXQgdGVzdDI6Ym9vbGVhbiA9IGZhbHNlXG4gICAgICAgIGFzc2VydC5ub3RPayhhd2FpdCAkLlRvb2xzLmNsYXNzLnRpbWVvdXQoKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICB0ZXN0MiA9IHRydWVcbiAgICAgICAgfSkpXG4gICAgICAgIGFzc2VydC5vayh0ZXN0KVxuICAgICAgICBhc3NlcnQub2sodGVzdDIpXG4gICAgICAgIGRvbmUoKVxuICAgIH0pXG4gICAgLy8gLy8gZW5kcmVnaW9uXG4gICAgLy8gLy8gcmVnaW9uIGV2ZW50XG4gICAgdGhpcy50ZXN0KGBkZWJvdW5jZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgbGV0IHRlc3RWYWx1ZSA9IGZhbHNlXG4gICAgICAgICQuVG9vbHMuY2xhc3MuZGVib3VuY2UoKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICB0ZXN0VmFsdWUgPSB0cnVlXG4gICAgICAgIH0pKClcbiAgICAgICAgYXNzZXJ0Lm9rKHRlc3RWYWx1ZSlcbiAgICAgICAgY29uc3QgY2FsbGJhY2s6RnVuY3Rpb24gPSAkLlRvb2xzLmNsYXNzLmRlYm91bmNlKCgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgdGVzdFZhbHVlID0gIXRlc3RWYWx1ZVxuICAgICAgICB9LCAxMDAwKVxuICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgYXNzZXJ0Lm5vdE9rKHRlc3RWYWx1ZSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgZmlyZUV2ZW50ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scyh7b25DbGljazogKCk6MiA9PiAyfSkuZmlyZUV2ZW50KFxuICAgICAgICAgICAgJ2NsaWNrJywgdHJ1ZVxuICAgICAgICApLCAyKVxuICAgICAgICBhc3NlcnQubm90T2soJC5Ub29scyh7b25DbGljazogKCk6ZmFsc2UgPT4gZmFsc2V9KS5maXJlRXZlbnQoXG4gICAgICAgICAgICAnY2xpY2snLCB0cnVlKSlcbiAgICAgICAgYXNzZXJ0Lm9rKHRvb2xzLmZpcmVFdmVudCgnY2xpY2snKSlcbiAgICAgICAgdG9vbHMub25DbGljayA9ICgpOjMgPT4gM1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodG9vbHMuZmlyZUV2ZW50KCdjbGljaycpLCB0cnVlKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodG9vbHMuZmlyZUV2ZW50KCdjbGljaycsIHRydWUpLCB0cnVlKVxuICAgIH0pXG4gICAgaWYgKHJvdW5kVHlwZSA9PT0gJ2Z1bGwnKSB7XG4gICAgICAgIHRoaXMudGVzdChgb24gKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgICAgICBsZXQgdGVzdFZhbHVlID0gZmFsc2VcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0b29scy5vbignYm9keScsICdjbGljaycsICgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRlc3RWYWx1ZSA9IHRydWVcbiAgICAgICAgICAgIH0pWzBdLCAkKCdib2R5JylbMF0pXG5cbiAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VyKCdjbGljaycpXG4gICAgICAgICAgICBhc3NlcnQub2sodGVzdFZhbHVlKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlc3QoYG9mZiAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgICAgIGxldCB0ZXN0VmFsdWUgPSBmYWxzZVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRvb2xzLm9uKCdib2R5JywgJ2NsaWNrJywgKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgdGVzdFZhbHVlID0gdHJ1ZVxuICAgICAgICAgICAgfSlbMF0sICQoJ2JvZHknKVswXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0b29scy5vZmYoJ2JvZHknLCAnY2xpY2snKVswXSwgJCgnYm9keScpWzBdKVxuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcignY2xpY2snKVxuICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKHRlc3RWYWx1ZSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8gLy8gZW5kcmVnaW9uXG4gICAgLy8gLy8gcmVnaW9uIG9iamVjdFxuICAgIHRoaXMudGVzdChgYWRkRHluYW1pY0dldHRlckFuZFNldHRlciAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkLlRvb2xzLmNsYXNzLmFkZER5bmFtaWNHZXR0ZXJBbmRTZXR0ZXIobnVsbCksIG51bGwpXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkLlRvb2xzLmNsYXNzLmFkZER5bmFtaWNHZXR0ZXJBbmRTZXR0ZXIodHJ1ZSksIHRydWUpXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmFkZER5bmFtaWNHZXR0ZXJBbmRTZXR0ZXIoe2E6IDJ9KSwge2E6IDJ9KVxuICAgICAgICBhc3NlcnQubm90T2soJC5Ub29scy5jbGFzcy5hZGREeW5hbWljR2V0dGVyQW5kU2V0dGVyKHtcbiAgICAgICAgfSkuX190YXJnZXRfXyBpbnN0YW5jZW9mIE9iamVjdClcbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuYWRkRHluYW1pY0dldHRlckFuZFNldHRlcih7fSwgKFxuICAgICAgICAgICAgdmFsdWU6YW55XG4gICAgICAgICk6YW55ID0+IHZhbHVlKS5fX3RhcmdldF9fIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgICAgICBjb25zdCBtb2NrdXAgPSB7fVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5hZGREeW5hbWljR2V0dGVyQW5kU2V0dGVyKFxuICAgICAgICAgICAgbW9ja3VwXG4gICAgICAgICksIG1vY2t1cClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3MuYWRkRHluYW1pY0dldHRlckFuZFNldHRlcihcbiAgICAgICAgICAgIG1vY2t1cCwgKHZhbHVlOmFueSk6YW55ID0+IHZhbHVlXG4gICAgICAgICkuX190YXJnZXRfXywgbW9ja3VwKVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYWRkRHluYW1pY0dldHRlckFuZFNldHRlcih7YTogMX0sIChcbiAgICAgICAgICAgIHZhbHVlOmFueVxuICAgICAgICApOmFueSA9PiB2YWx1ZSArIDIpLmEsIDMpXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5hZGREeW5hbWljR2V0dGVyQW5kU2V0dGVyKFxuICAgICAgICAgICAge2E6IHthOiAxfX0sICh2YWx1ZTphbnkpOmFueSA9PiAoXG4gICAgICAgICAgICAgICAgdmFsdWUgaW5zdGFuY2VvZiBPYmplY3RcbiAgICAgICAgICAgICkgPyB2YWx1ZSA6IHZhbHVlICsgMikuYS5hLCAzKVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYWRkRHluYW1pY0dldHRlckFuZFNldHRlcih7YToge2E6IFt7XG4gICAgICAgICAgICBhOiAxXG4gICAgICAgIH1dfX0sICh2YWx1ZTphbnkpOmFueSA9PiAoXG4gICAgICAgICAgICB2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdFxuICAgICAgICApID8gdmFsdWUgOiB2YWx1ZSArIDIpLmEuYVswXS5hLCAzKVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYWRkRHluYW1pY0dldHRlckFuZFNldHRlcihcbiAgICAgICAgICAgIHthOiB7YTogMX19LCAodmFsdWU6YW55KTphbnkgPT5cbiAgICAgICAgICAgICAgICAodmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpID8gdmFsdWUgOiB2YWx1ZSArIDIsXG4gICAgICAgICAgICBudWxsLCB7aGFzOiAnaGFzT3duUHJvcGVydHknfSwgZmFsc2VcbiAgICAgICAgKS5hLmEsIDEpXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5hZGREeW5hbWljR2V0dGVyQW5kU2V0dGVyKFxuICAgICAgICAgICAge2E6IDF9LCAodmFsdWU6YW55KTphbnkgPT5cbiAgICAgICAgICAgICAgICAodmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpID8gdmFsdWUgOiB2YWx1ZSArIDIsXG4gICAgICAgICAgICBudWxsLCB7aGFzOiAnaGFzT3duUHJvcGVydHknfSwgZmFsc2UsIFtdXG4gICAgICAgICkuYSwgMSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmFkZER5bmFtaWNHZXR0ZXJBbmRTZXR0ZXIoXG4gICAgICAgICAgICB7YTogbmV3IE1hcChbWydhJywgMV1dKX0sICh2YWx1ZTphbnkpOmFueSA9PlxuICAgICAgICAgICAgICAgICh2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgPyB2YWx1ZSA6IHZhbHVlICsgMixcbiAgICAgICAgICAgIG51bGwsIHtkZWxldGU6ICdkZWxldGUnLCBnZXQ6ICdnZXQnLCBzZXQ6ICdzZXQnLCBoYXM6ICdoYXMnfSwgdHJ1ZSxcbiAgICAgICAgICAgIFtNYXBdXG4gICAgICAgICkuYS5hLCAzKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBjb252ZXJ0Q2lyY3VsYXJPYmplY3RUb0pTT04gKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBsZXQgdGVzdE9iamVjdDE6T2JqZWN0ID0ge31cbiAgICAgICAgY29uc3QgdGVzdE9iamVjdDI6T2JqZWN0ID0ge2E6IHRlc3RPYmplY3QxfVxuICAgICAgICB0ZXN0T2JqZWN0MS5hID0gdGVzdE9iamVjdDJcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW3t9LCAne30nXSxcbiAgICAgICAgICAgIFt7YTogbnVsbH0sICd7XCJhXCI6bnVsbH0nXSxcbiAgICAgICAgICAgIFt7YToge2E6IDJ9fSwgJ3tcImFcIjp7XCJhXCI6Mn19J10sXG4gICAgICAgICAgICBbe2E6IHthOiBJbmZpbml0eX19LCAne1wiYVwiOntcImFcIjpudWxsfX0nXSxcbiAgICAgICAgICAgIFt0ZXN0T2JqZWN0MSwgJ3tcImFcIjp7XCJhXCI6XCJfX2NpcmN1bGFyUmVmZXJlbmNlX19cIn19J11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5jb252ZXJ0Q2lyY3VsYXJPYmplY3RUb0pTT04odGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGNvbnZlcnRNYXBUb1BsYWluT2JqZWN0ICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tudWxsXSwgbnVsbF0sXG4gICAgICAgICAgICBbW3RydWVdLCB0cnVlXSxcbiAgICAgICAgICAgIFtbMF0sIDBdLFxuICAgICAgICAgICAgW1syXSwgMl0sXG4gICAgICAgICAgICBbWydhJ10sICdhJ10sXG4gICAgICAgICAgICBbW25ldyBNYXAoKV0sIHt9XSxcbiAgICAgICAgICAgIFtbW25ldyBNYXAoKV1dLCBbe31dXSxcbiAgICAgICAgICAgIFtbW25ldyBNYXAoKV0sIGZhbHNlXSwgW25ldyBNYXAoKV1dLFxuICAgICAgICAgICAgW1tbbmV3IE1hcChbWydhJywgMl0sIFsyLCAyXV0pXV0sIFt7YTogMiwgJzInOiAyfV1dLFxuICAgICAgICAgICAgW1tbbmV3IE1hcChbWydhJywgbmV3IE1hcCgpXSwgWzIsIDJdXSldXSwgW3thOiB7fSwgJzInOiAyfV1dLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtbbmV3IE1hcChbWydhJywgbmV3IE1hcChbWydhJywgMl1dKV0sIFsyLCAyXV0pXV0sXG4gICAgICAgICAgICAgICAgW3thOiB7YTogMn0sICcyJzogMn1dXG4gICAgICAgICAgICBdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuY29udmVydE1hcFRvUGxhaW5PYmplY3QoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGNvbnZlcnRQbGFpbk9iamVjdFRvTWFwICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tudWxsXSwgbnVsbF0sXG4gICAgICAgICAgICBbW3RydWVdLCB0cnVlXSxcbiAgICAgICAgICAgIFtbMF0sIDBdLFxuICAgICAgICAgICAgW1syXSwgMl0sXG4gICAgICAgICAgICBbWydhJ10sICdhJ10sXG4gICAgICAgICAgICBbW3t9XSwgbmV3IE1hcCgpXSxcbiAgICAgICAgICAgIFtbW3t9XV0sIFtuZXcgTWFwKCldXSxcbiAgICAgICAgICAgIFtbW3t9XSwgZmFsc2VdLCBbe31dXSxcbiAgICAgICAgICAgIFtbW3thOiB7fSwgYjogMn1dXSwgW25ldyBNYXAoW1snYScsIG5ldyBNYXAoKV0sIFsnYicsIDJdXSldXSxcbiAgICAgICAgICAgIFtbW3tiOiAyLCBhOiB7fX1dXSwgW25ldyBNYXAoW1snYScsIG5ldyBNYXAoKV0sIFsnYicsIDJdXSldXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbW3tiOiAyLCBhOiBuZXcgTWFwKCl9XV0sXG4gICAgICAgICAgICAgICAgW25ldyBNYXAoW1snYScsIG5ldyBNYXAoKV0sIFsnYicsIDJdXSldXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtbe2I6IDIsIGE6IFt7fV19XV0sXG4gICAgICAgICAgICAgICAgW25ldyBNYXAoW1snYScsIFtuZXcgTWFwKCldXSwgWydiJywgMl1dKV1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1t7YjogMiwgYTogbmV3IFNldChbe31dKX1dXSxcbiAgICAgICAgICAgICAgICBbbmV3IE1hcChbWydhJywgbmV3IFNldChbbmV3IE1hcCgpXSldLCBbJ2InLCAyXV0pXVxuICAgICAgICAgICAgXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmNvbnZlcnRQbGFpbk9iamVjdFRvTWFwKC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBjb252ZXJ0U3Vic3RyaW5nSW5QbGFpbk9iamVjdCAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFt7fSwgL2EvLCAnJywge31dLFxuICAgICAgICAgICAgW3thOiAnYSd9LCAvYS8sICdiJywge2E6ICdiJ31dLFxuICAgICAgICAgICAgW3thOiAnYWEnfSwgL2EvLCAnYicsIHthOiAnYmEnfV0sXG4gICAgICAgICAgICBbe2E6ICdhYSd9LCAvYS9nLCAnYicsIHthOiAnYmInfV0sXG4gICAgICAgICAgICBbe2E6IHthOiAnYWEnfX0sIC9hL2csICdiJywge2E6IHthOiAnYmInfX1dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuY29udmVydFN1YnN0cmluZ0luUGxhaW5PYmplY3QoXG4gICAgICAgICAgICAgICAgdGVzdFswXSwgdGVzdFsxXSwgdGVzdFsyXVxuICAgICAgICAgICAgKSwgdGVzdFszXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgY29weUxpbWl0ZWRSZWN1cnNpdmVseSAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbMjFdLCAyMV0sXG4gICAgICAgICAgICBbWzAsIC0xXSwgMF0sXG4gICAgICAgICAgICBbWzAsIDFdLCAwXSxcbiAgICAgICAgICAgIFtbMCwgMTBdLCAwXSxcbiAgICAgICAgICAgIFtbbmV3IERhdGUoMCldLCBuZXcgRGF0ZSgwKV0sXG4gICAgICAgICAgICBbWy9hL10sIC9hL10sXG4gICAgICAgICAgICBbW3t9XSwge31dLFxuICAgICAgICAgICAgW1t7fSwgLTFdLCB7fV0sXG4gICAgICAgICAgICBbW1tdXSwgW11dLFxuICAgICAgICAgICAgW1tuZXcgTWFwKCksIC0xXSwgbmV3IE1hcCgpXSxcbiAgICAgICAgICAgIFtbbmV3IFNldCgpLCAtMV0sIG5ldyBTZXQoKV0sXG4gICAgICAgICAgICBbW3thOiAyfSwgMF0sIHthOiAyfV0sXG4gICAgICAgICAgICBbW3thOiB7YTogMn19LCAwXSwge2E6IG51bGx9XSxcbiAgICAgICAgICAgIFtbe2E6IHthOiAyfX0sIDFdLCB7YToge2E6IDJ9fV0sXG4gICAgICAgICAgICBbW3thOiB7YTogMn19LCAyXSwge2E6IHthOiAyfX1dLFxuICAgICAgICAgICAgW1t7YTogW3thOiAyfV19LCAxXSwge2E6IFtudWxsXX1dLFxuICAgICAgICAgICAgW1t7YTogW3thOiAyfV19LCAyXSwge2E6IFt7YTogMn1dfV0sXG4gICAgICAgICAgICBbW3thOiB7YTogMn19LCAxMF0sIHthOiB7YTogMn19XSxcbiAgICAgICAgICAgIFtbbmV3IE1hcChbWydhJywgMl1dKSwgMF0sIG5ldyBNYXAoW1snYScsIDJdXSldLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtuZXcgTWFwKFtbJ2EnLCBuZXcgTWFwKFtbJ2EnLCAyXV0pXV0pLCAwXSxcbiAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCBudWxsXV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtuZXcgTWFwKFtbJ2EnLCBuZXcgTWFwKFtbJ2EnLCAyXV0pXV0pLCAxXSxcbiAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCBuZXcgTWFwKFtbJ2EnLCAyXV0pXV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtuZXcgTWFwKFtbJ2EnLCBuZXcgTWFwKFtbJ2EnLCAyXV0pXV0pLCAyXSxcbiAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCBuZXcgTWFwKFtbJ2EnLCAyXV0pXV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtuZXcgTWFwKFtbJ2EnLCBbbmV3IE1hcChbWydhJywgMl1dKV1dXSksIDFdLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIFtudWxsXV1dKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbbmV3IE1hcChbWydhJywgW25ldyBNYXAoW1snYScsIDJdXSldXV0pLCAyXSxcbiAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCBbbmV3IE1hcChbWydhJywgMl1dKV1dXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW25ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIDJdXSldXSksIDEwXSxcbiAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCBuZXcgTWFwKFtbJ2EnLCAyXV0pXV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtuZXcgTWFwKFtbJ2EnLCBuZXcgTWFwKFtbJ2EnLCAyXV0pXV0pLCAxMF0sXG4gICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgbmV3IE1hcChbWydhJywgMl1dKV1dKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbbmV3IFNldChbJ2EnLCAyXSksIDBdLCBuZXcgU2V0KFsnYScsIDJdKV0sXG4gICAgICAgICAgICBbW25ldyBTZXQoWydhJywgbmV3IFNldChbJ2EnLCAyXSldKSwgMF0sIG5ldyBTZXQoWydhJywgbnVsbF0pXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbbmV3IFNldChbJ2EnLCBuZXcgU2V0KFsnYScsIDJdKV0pLCAxXSxcbiAgICAgICAgICAgICAgICBuZXcgU2V0KFsnYScsIG5ldyBTZXQoWydhJywgMl0pXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW25ldyBTZXQoWydhJywgbmV3IFNldChbJ2EnLCAyXSldKSwgMl0sXG4gICAgICAgICAgICAgICAgbmV3IFNldChbJ2EnLCBuZXcgU2V0KFsnYScsIDJdKV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1tuZXcgU2V0KFsnYScsIFtuZXcgU2V0KFsnYScsIDJdKV1dKSwgMV0sIG5ldyBTZXQoWydhJywgW251bGxdXSldLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtuZXcgU2V0KFsnYScsIFtuZXcgU2V0KFsnYScsIDJdKV1dKSwgMl0sXG4gICAgICAgICAgICAgICAgbmV3IFNldChbJ2EnLCBbbmV3IFNldChbJ2EnLCAyXSldXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW25ldyBTZXQoWydhJywgbmV3IFNldChbJ2EnLCAyXSldKSwgMTBdLFxuICAgICAgICAgICAgICAgIG5ldyBTZXQoWydhJywgbmV3IFNldChbJ2EnLCAyXSldKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbbmV3IFNldChbJ2EnLCBuZXcgU2V0KFsnYScsIDJdKV0pLCAxMF0sXG4gICAgICAgICAgICAgICAgbmV3IFNldChbJ2EnLCBuZXcgU2V0KFsnYScsIDJdKV0pXG4gICAgICAgICAgICBdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuY29weUxpbWl0ZWRSZWN1cnNpdmVseSguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgZGV0ZXJtaW5lVHlwZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3MuZGV0ZXJtaW5lVHlwZSgpLCAndW5kZWZpbmVkJylcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW3VuZGVmaW5lZCwgJ3VuZGVmaW5lZCddLFxuICAgICAgICAgICAgW3t9Lm5vdERlZmluZWQsICd1bmRlZmluZWQnXSxcbiAgICAgICAgICAgIFtudWxsLCAnbnVsbCddLFxuICAgICAgICAgICAgW3RydWUsICdib29sZWFuJ10sXG4gICAgICAgICAgICBbbmV3IEJvb2xlYW4oKSwgJ2Jvb2xlYW4nXSxcbiAgICAgICAgICAgIFszLCAnbnVtYmVyJ10sXG4gICAgICAgICAgICBbbmV3IE51bWJlcigzKSwgJ251bWJlciddLFxuICAgICAgICAgICAgWycnLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbbmV3IFN0cmluZygnJyksICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsndGVzdCcsICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFtuZXcgU3RyaW5nKCd0ZXN0JyksICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFtmdW5jdGlvbigpOnZvaWQge30sICdmdW5jdGlvbiddLFxuICAgICAgICAgICAgWygpOnZvaWQgPT4ge30sICdmdW5jdGlvbiddLFxuICAgICAgICAgICAgW1tdLCAnYXJyYXknXSxcbiAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWFycmF5LWNvbnN0cnVjdG9yICovXG4gICAgICAgICAgICAvLyBJZ25vcmVUeXBlQ2hlY2tcbiAgICAgICAgICAgIFtuZXcgQXJyYXkoKSwgJ2FycmF5J10sXG4gICAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWFycmF5LWNvbnN0cnVjdG9yICovXG4gICAgICAgICAgICBbbmV3IERhdGUoKSwgJ2RhdGUnXSxcbiAgICAgICAgICAgIFtuZXcgRXJyb3IoKSwgJ2Vycm9yJ10sXG4gICAgICAgICAgICBbbmV3IE1hcCgpLCAnbWFwJ10sXG4gICAgICAgICAgICBbbmV3IFNldCgpLCAnc2V0J10sXG4gICAgICAgICAgICBbL3Rlc3QvLCAncmVnZXhwJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkLlRvb2xzLmNsYXNzLmRldGVybWluZVR5cGUodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGVxdWFscyAoJHtyb3VuZFR5cGV9KWAsIGFzeW5jIChhc3NlcnQ6T2JqZWN0KTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgY29uc3QgZG9uZTpGdW5jdGlvbiA9IGFzc2VydC5hc3luYygpXG4gICAgICAgIGNvbnN0IHRlc3RGdW5jdGlvbjpGdW5jdGlvbiA9ICgpOnZvaWQgPT4ge31cbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgWzEsIDFdLFxuICAgICAgICAgICAgW25ldyBEYXRlKCksIG5ldyBEYXRlKCldLFxuICAgICAgICAgICAgW25ldyBEYXRlKDE5OTUsIDExLCAxNyksIG5ldyBEYXRlKDE5OTUsIDExLCAxNyldLFxuICAgICAgICAgICAgWy9hLywgL2EvXSxcbiAgICAgICAgICAgIFt7YTogMn0sIHthOiAyfV0sXG4gICAgICAgICAgICBbe2E6IDIsIGI6IDN9LCB7YTogMiwgYjogM31dLFxuICAgICAgICAgICAgW1sxLCAyLCAzXSwgWzEsIDIsIDNdXSxcbiAgICAgICAgICAgIFtbXSwgW11dLFxuICAgICAgICAgICAgW3t9LCB7fV0sXG4gICAgICAgICAgICBbbmV3IE1hcCgpLCBuZXcgTWFwKCldLFxuICAgICAgICAgICAgW25ldyBTZXQoKSwgbmV3IFNldCgpXSxcbiAgICAgICAgICAgIFtbMSwgMiwgMywge2E6IDJ9XSwgWzEsIDIsIDMsIHthOiAyfV1dLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCBuZXcgTWFwKFtbJ2EnLCAyXV0pXSwgWzEsIDIsIDMsIG5ldyBNYXAoW1snYScsIDJdXSldXSxcbiAgICAgICAgICAgIFtbMSwgMiwgMywgbmV3IFNldChbJ2EnLCAyXSldLCBbMSwgMiwgMywgbmV3IFNldChbJ2EnLCAyXSldXSxcbiAgICAgICAgICAgIFtbMSwgMiwgMywgWzEsIDJdXSwgWzEsIDIsIDMsIFsxLCAyXV1dLFxuICAgICAgICAgICAgW1t7YTogMX1dLCBbe2E6IDF9XV0sXG4gICAgICAgICAgICBbW3thOiAxLCBiOiAxfV0sIFt7YTogMX1dLCBbXV0sXG4gICAgICAgICAgICBbW3thOiAxLCBiOiAxfV0sIFt7YTogMX1dLCBbJ2EnXV0sXG4gICAgICAgICAgICBbMiwgMiwgMF0sXG4gICAgICAgICAgICBbW3thOiAxLCBiOiAxfV0sIFt7YTogMX1dLCBudWxsLCAwXSxcbiAgICAgICAgICAgIFtbe2E6IDF9LCB7YjogMX1dLCBbe2E6IDF9LCB7YjogMX1dLCBudWxsLCAxXSxcbiAgICAgICAgICAgIFtbe2E6IHtiOiAxfX0sIHtiOiAxfV0sIFt7YTogMX0sIHtiOiAxfV0sIG51bGwsIDFdLFxuICAgICAgICAgICAgW1t7YToge2I6IDF9fSwge2I6IDF9XSwgW3thOiB7YjogMX19LCB7YjogMX1dLCBudWxsLCAyXSxcbiAgICAgICAgICAgIFtbe2E6IHtiOiB7YzogMX19fSwge2I6IDF9XSwgW3thOiB7YjogMX19LCB7YjogMX1dLCBudWxsLCAyXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbe2E6IHtiOiB7YzogMX19fSwge2I6IDF9XSwgW3thOiB7YjogMX19LCB7YjogMX1dLCBudWxsLCAzLFxuICAgICAgICAgICAgICAgIFsnYiddXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW3Rlc3RGdW5jdGlvbiwgdGVzdEZ1bmN0aW9uXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuZXF1YWxzKC4uLnRlc3QpKVxuICAgICAgICBpZiAoVEFSR0VUX1RFQ0hOT0xPR1kgPT09ICdub2RlJylcbiAgICAgICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmVxdWFscyhcbiAgICAgICAgICAgICAgICBuZXcgQnVmZmVyKCdhJyksIG5ldyBCdWZmZXIoJ2EnKSxcbiAgICAgICAgICAgICAgICBudWxsLCAtMSwgW10sIHRydWUsIHRydWUpKVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBCbG9iKFsnYSddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBCbG9iKFsnYSddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgW25ldyBCbG9iKFsnYSddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSldLFxuICAgICAgICAgICAgICAgICAgICBbbmV3IEJsb2IoWydhJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KV1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge2E6IG5ldyBCbG9iKFsnYSddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSl9LFxuICAgICAgICAgICAgICAgICAgICB7YTogbmV3IEJsb2IoWydhJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KX1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgbmV3IEJsb2IoWydhJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KV1dKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgbmV3IEJsb2IoWydhJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KV1dKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBuZXcgU2V0KFtuZXcgQmxvYihbJ2EnXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pXSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBTZXQoW25ldyBCbG9iKFsnYSddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSldKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhOiBuZXcgU2V0KFtbbmV3IE1hcChbWydhJywgbmV3IEJsb2IoWydhJ10sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGV4dC9wbGFpbidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXV0pXV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgYjogMlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhOiBuZXcgU2V0KFtbbmV3IE1hcChbWydhJywgbmV3IEJsb2IoWydhJ10sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGV4dC9wbGFpbidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXV0pXV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgYjogMlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBhc3NlcnQub2soYXdhaXQgJC5Ub29scy5jbGFzcy5lcXVhbHMoXG4gICAgICAgICAgICAgICAgICAgIC4uLnRlc3QsIG51bGwsIC0xLCBbXSwgdHJ1ZSwgdHJ1ZSkpXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBuZXcgQmxvYihbJ2EnXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgQmxvYihbJ2InXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIFtuZXcgQmxvYihbJ2EnXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pXSxcbiAgICAgICAgICAgICAgICAgICAgW25ldyBCbG9iKFsnYiddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSldXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHthOiBuZXcgQmxvYihbJ2EnXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pfSxcbiAgICAgICAgICAgICAgICAgICAge2E6IG5ldyBCbG9iKFsnYiddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSl9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIG5ldyBCbG9iKFsnYSddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSldXSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIG5ldyBCbG9iKFsnYiddLCB7dHlwZTogJ3RleHQvcGxhaW4nfSldXSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFNldChbbmV3IEJsb2IoWydhJ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KV0pLFxuICAgICAgICAgICAgICAgICAgICBuZXcgU2V0KFtuZXcgQmxvYihbJ2InXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pXSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYTogbmV3IFNldChbW25ldyBNYXAoW1snYScsIG5ldyBCbG9iKFsnYSddLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQvcGxhaW4nXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV1dKV1dKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGI6IDJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYTogbmV3IFNldChbW25ldyBNYXAoW1snYScsIG5ldyBCbG9iKFsnYiddLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQvcGxhaW4nXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV1dKV1dKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGI6IDJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKGF3YWl0ICQuVG9vbHMuY2xhc3MuZXF1YWxzKFxuICAgICAgICAgICAgICAgICAgICAuLi50ZXN0LCBudWxsLCAtMSwgW10sIHRydWUsIHRydWUpKVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbe2E6IHtiOiAxfX0sIHtiOiAxfV0sIFt7YTogMX0sIHtiOiAxfV0sIG51bGwsIDJdLFxuICAgICAgICAgICAgW1t7YToge2I6IHtjOiAxfX19LCB7YjogMX1dLCBbe2E6IHtiOiAxfX0sIHtiOiAxfV0sIG51bGwsIDNdLFxuICAgICAgICAgICAgW25ldyBEYXRlKDE5OTUsIDExLCAxNyksIG5ldyBEYXRlKDE5OTUsIDExLCAxNildLFxuICAgICAgICAgICAgWy9hL2ksIC9hL10sXG4gICAgICAgICAgICBbMSwgMl0sXG4gICAgICAgICAgICBbe2E6IDIsIGI6IDN9LCB7YTogMn1dLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCA0XSwgWzEsIDIsIDMsIDVdXSxcbiAgICAgICAgICAgIFtbMSwgMiwgMywgNF0sIFsxLCAyLCAzXV0sXG4gICAgICAgICAgICBbWzEsIDIsIDMsIHthOiAyfV0sIFsxLCAyLCAzLCB7YjogMn1dXSxcbiAgICAgICAgICAgIFtbMSwgMiwgMywgbmV3IE1hcChbWydhJywgMl1dKV0sIFsxLCAyLCAzLCBuZXcgTWFwKFtbJ2InLCAyXV0pXV0sXG4gICAgICAgICAgICBbWzEsIDIsIDMsIG5ldyBTZXQoWydhJywgMl0pXSwgWzEsIDIsIDMsIG5ldyBTZXQoWydiJywgMl0pXV0sXG4gICAgICAgICAgICBbWzEsIDIsIDMsIFsxLCAyXV0sIFsxLCAyLCAzLCBbMSwgMiwgM11dXSxcbiAgICAgICAgICAgIFtbMSwgMiwgMywgWzEsIDIsIDNdXSwgWzEsIDIsIDMsIFsxLCAyXV1dLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCBbMSwgMiwgM11dLCBbMSwgMiwgMywgWzEsIDIsIHt9XV1dLFxuICAgICAgICAgICAgW1t7YTogMSwgYjogMX1dLCBbe2E6IDF9XV0sXG4gICAgICAgICAgICBbW3thOiAxLCBiOiAxfV0sIFt7YTogMX1dLCBbJ2EnLCAnYiddXSxcbiAgICAgICAgICAgIFsxLCAyLCAwXSxcbiAgICAgICAgICAgIFtbe2E6IDF9LCB7YjogMX1dLCBbe2E6IDF9XSwgbnVsbCwgMV0sXG4gICAgICAgICAgICBbKCk6dm9pZCA9PiB7fSwgKCk6dm9pZCA9PiB7fSwgbnVsbCwgLTEsIFtdLCBmYWxzZV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5ub3RPaygkLlRvb2xzLmNsYXNzLmVxdWFscyguLi50ZXN0KSlcbiAgICAgICAgY29uc3QgdGVzdCA9ICgpOnZvaWQgPT4ge31cbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuZXF1YWxzKHRlc3QsIHRlc3QsIG51bGwsIC0xLCBbXSwgZmFsc2UpKVxuICAgICAgICBkb25lKClcbiAgICB9KVxuICAgIHRoaXMudGVzdChgZXZhbHVhdGVEeW5hbWljRGF0YVN0cnVjdHVyZSAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbbnVsbF0sIG51bGxdLFxuICAgICAgICAgICAgW1tmYWxzZV0sIGZhbHNlXSxcbiAgICAgICAgICAgIFtbJzEnXSwgJzEnXSxcbiAgICAgICAgICAgIFtbM10sIDNdLFxuICAgICAgICAgICAgW1t7fV0sIHt9XSxcbiAgICAgICAgICAgIFtbe2E6IG51bGx9XSwge2E6IG51bGx9XSxcbiAgICAgICAgICAgIFtbe19fZXZhbHVhdGVfXzogJzEgKyAzJ31dLCA0XSxcbiAgICAgICAgICAgIFtbW3tfX2V2YWx1YXRlX186ICcxJ31dXSwgWzFdXSxcbiAgICAgICAgICAgIFtbW3tfX2V2YWx1YXRlX186IGAnMSdgfV1dLCBbJzEnXV0sXG4gICAgICAgICAgICBbW3thOiB7X19ldmFsdWF0ZV9fOiBgJ2EnYH19XSwge2E6ICdhJ31dLFxuICAgICAgICAgICAgW1t7YToge19fZXZhbHVhdGVfXzogJzEnfX1dLCB7YTogMX1dLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFt7YToge19fZXZhbHVhdGVfXzogJ3NlbGYuYid9LCBiOiAyfSwge30sICdzZWxmJywgJ19fcnVuX18nXSxcbiAgICAgICAgICAgICAgICB7YToge19fZXZhbHVhdGVfXzogJ3NlbGYuYid9LCBiOiAyfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbe2E6IHtfX3J1bjogJ18uYid9LCBiOiAxfSwge30sICdfJywgJ19fcnVuJ10sIHthOiAxLCBiOiAxfV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3thOiBbe19fcnVuOiAnc2VsZi5iJ31dLCBiOiAxfSwge30sICdzZWxmJywgJ19fcnVuJ10sXG4gICAgICAgICAgICAgICAge2E6IFsxXSwgYjogMX1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbW3thOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5iJ30sIGI6IDJ9XSwge2E6IDIsIGI6IDJ9XSxcbiAgICAgICAgICAgIFtbe2E6IHtfX2V2YWx1YXRlX186ICdjLmInfSwgYjogMn0sIHt9LCAnYyddLCB7YTogMiwgYjogMn1dLFxuICAgICAgICAgICAgW1t7XG4gICAgICAgICAgICAgICAgYToge19fZXZhbHVhdGVfXzogJ3NlbGYuYid9LFxuICAgICAgICAgICAgICAgIGI6IHtfX2V2YWx1YXRlX186ICdzZWxmLmMnfSxcbiAgICAgICAgICAgICAgICBjOiAyXG4gICAgICAgICAgICB9XSwge2E6IDIsIGI6IDIsIGM6IDJ9XSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbe1xuICAgICAgICAgICAgICAgICAgICBhOiB7X19leGVjdXRlX186ICdyZXR1cm4gc2VsZi5iJ30sXG4gICAgICAgICAgICAgICAgICAgIGI6IHtfX2V4ZWN1dGVfXzogJ3JldHVybiBzZWxmLmMnfSxcbiAgICAgICAgICAgICAgICAgICAgYzoge19fZXhlY3V0ZV9fOiAncmV0dXJuIHNlbGYuZCd9LFxuICAgICAgICAgICAgICAgICAgICBkOiB7X19leGVjdXRlX186ICdyZXR1cm4gc2VsZi5lJ30sXG4gICAgICAgICAgICAgICAgICAgIGU6IHtfX2V4ZWN1dGVfXzogJ3JldHVybiBzZWxmLmYnfSxcbiAgICAgICAgICAgICAgICAgICAgZjogM1xuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIHthOiAzLCBiOiAzLCBjOiAzLCBkOiAzLCBlOiAzLCBmOiAzfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbe1xuICAgICAgICAgICAgICAgIGE6IHtfX2V2YWx1YXRlX186ICdzZWxmLmIuZC5lJ30sXG4gICAgICAgICAgICAgICAgYjoge19fZXZhbHVhdGVfXzogJ3NlbGYuYyd9LFxuICAgICAgICAgICAgICAgIGM6IHtkOiB7ZTogM319XG4gICAgICAgICAgICB9XSwge2E6IDMsIGI6IHtkOiB7ZTogM319LCBjOiB7ZDoge2U6IDN9fX1dLFxuICAgICAgICAgICAgW1t7XG4gICAgICAgICAgICAgICAgbjoge19fZXZhbHVhdGVfXzogJ3thOiBbMSwgMiwgM119J30sXG4gICAgICAgICAgICAgICAgYjoge19fZXZhbHVhdGVfXzogJ3NlbGYuYyd9LFxuICAgICAgICAgICAgICAgIGY6IHtfX2V2YWx1YXRlX186ICdzZWxmLmcuaCd9LFxuICAgICAgICAgICAgICAgIGQ6IHtfX2V2YWx1YXRlX186ICdzZWxmLmUnfSxcbiAgICAgICAgICAgICAgICBhOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5iJ30sXG4gICAgICAgICAgICAgICAgZToge19fZXZhbHVhdGVfXzogJ3NlbGYuZi5pJ30sXG4gICAgICAgICAgICAgICAgazoge19fZXZhbHVhdGVfXzogJ2BrayA8LT4gXCIke3NlbGYubC5qb2luKFxcJ1wiLCBcIlxcJyl9XCJgJ30sXG4gICAgICAgICAgICAgICAgYzoge19fZXZhbHVhdGVfXzogJ3NlbGYuZCd9LFxuICAgICAgICAgICAgICAgIG86IFt7YTogMiwgYjogW1tbe19fZXZhbHVhdGVfXzogJzEwICoqIDInfV1dXX1dLFxuICAgICAgICAgICAgICAgIGw6IHtfX2V2YWx1YXRlX186ICdzZWxmLm0uYSd9LFxuICAgICAgICAgICAgICAgIGc6IHtoOiB7aToge19fZXZhbHVhdGVfXzogJ2Ake3NlbGYua30gPC0+ICR7c2VsZi5qfWAnfX19LFxuICAgICAgICAgICAgICAgIG06IHthOiBbMSwgMiwge19fZXZhbHVhdGVfXzogJzMnfV19LFxuICAgICAgICAgICAgICAgIGo6ICdqaidcbiAgICAgICAgICAgIH1dLCB7XG4gICAgICAgICAgICAgICAgYTogJ2trIDwtPiBcIjFcIiwgXCIyXCIsIFwiM1wiIDwtPiBqaicsXG4gICAgICAgICAgICAgICAgYjogJ2trIDwtPiBcIjFcIiwgXCIyXCIsIFwiM1wiIDwtPiBqaicsXG4gICAgICAgICAgICAgICAgYzogJ2trIDwtPiBcIjFcIiwgXCIyXCIsIFwiM1wiIDwtPiBqaicsXG4gICAgICAgICAgICAgICAgZDogJ2trIDwtPiBcIjFcIiwgXCIyXCIsIFwiM1wiIDwtPiBqaicsXG4gICAgICAgICAgICAgICAgZTogJ2trIDwtPiBcIjFcIiwgXCIyXCIsIFwiM1wiIDwtPiBqaicsXG4gICAgICAgICAgICAgICAgZjoge2k6ICdrayA8LT4gXCIxXCIsIFwiMlwiLCBcIjNcIiA8LT4gamonfSxcbiAgICAgICAgICAgICAgICBnOiB7aDoge2k6ICdrayA8LT4gXCIxXCIsIFwiMlwiLCBcIjNcIiA8LT4gamonfX0sXG4gICAgICAgICAgICAgICAgajogJ2pqJyxcbiAgICAgICAgICAgICAgICBrOiAna2sgPC0+IFwiMVwiLCBcIjJcIiwgXCIzXCInLFxuICAgICAgICAgICAgICAgIGw6IFsxLCAyLCAzXSxcbiAgICAgICAgICAgICAgICBtOiB7YTogWzEsIDIsIDNdfSxcbiAgICAgICAgICAgICAgICBuOiB7YTogWzEsIDIsIDNdfSxcbiAgICAgICAgICAgICAgICBvOiBbe2E6IDIsIGI6IFtbWzEwMF1dXX1dXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbe1xuICAgICAgICAgICAgICAgICAgICBhOiB7X19ldmFsdWF0ZV9fOiAnXy5iLmQuZSd9LFxuICAgICAgICAgICAgICAgICAgICBiOiB7X19ldmFsdWF0ZV9fOiAnXy5jJ30sXG4gICAgICAgICAgICAgICAgICAgIGM6IHtkOiB7ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgX19ldmFsdWF0ZV9fOiAndG9vbHMuY29weUxpbWl0ZWRSZWN1cnNpdmVseShbMl0pJ1xuICAgICAgICAgICAgICAgICAgICB9fX1cbiAgICAgICAgICAgICAgICB9LCB7dG9vbHM6ICQuVG9vbHMuY2xhc3N9LCAnXyddLFxuICAgICAgICAgICAgICAgIHthOiBbMl0sIGI6IHtkOiB7ZTogWzJdfX0sIGM6IHtkOiB7ZTogWzJdfX19XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1t7YToge1xuICAgICAgICAgICAgICAgIGI6IDEsXG4gICAgICAgICAgICAgICAgYzoge19fZXZhbHVhdGVfXzogJ3NlbGYuYS5iJ31cbiAgICAgICAgICAgIH19XSwge2E6IHtiOiAxLCBjOiAxfX1dLFxuICAgICAgICAgICAgW1t7YToge1xuICAgICAgICAgICAgICAgIGI6IG51bGwsXG4gICAgICAgICAgICAgICAgYzoge19fZXZhbHVhdGVfXzogJ3NlbGYuYS5iJ31cbiAgICAgICAgICAgIH19XSwge2E6IHtiOiBudWxsLCBjOiBudWxsfX1dLFxuICAgICAgICAgICAgW1t7YToge1xuICAgICAgICAgICAgICAgIGI6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBjOiB7X19ldmFsdWF0ZV9fOiAnc2VsZi5hLmInfVxuICAgICAgICAgICAgfX1dLCB7YToge2I6IHVuZGVmaW5lZCwgYzogdW5kZWZpbmVkfX1dLFxuICAgICAgICAgICAgW1t7YToge1xuICAgICAgICAgICAgICAgIGI6ICdqYXUnLFxuICAgICAgICAgICAgICAgIGM6IHtfX2V2YWx1YXRlX186ICdzZWxmLmEuYid9XG4gICAgICAgICAgICB9fV0sIHthOiB7YjogJ2phdScsIGM6ICdqYXUnfX1dLFxuICAgICAgICAgICAgW1t7YToge1xuICAgICAgICAgICAgICAgIGI6IHtcbiAgICAgICAgICAgICAgICAgICAgYzogJ2phdScsXG4gICAgICAgICAgICAgICAgICAgIGQ6IHtfX2V2YWx1YXRlX186ICdzZWxmLmEuYi5jJ31cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fV0sIHthOiB7Yjoge2M6ICdqYXUnLCBkOiAnamF1J319fV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBbMSwgMV0sIFs2LCAxXSwgWzI1LCAzXSwgWzI4LCAzXSwgWzEsIDVdLCBbNSwgNV0sIFsxNiwgNV0sXG4gICAgICAgICAgICAgICAgICAgIFsyNiwgNV0sIFszLCAxMF0sIFsxLCAxMV0sIFsyNSwgMTJdLCBbMjYsIDEyXVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgWzEsIDFdLCBbNiwgMV0sIFsyNSwgM10sIFsyOCwgM10sIFsxLCA1XSwgWzUsIDVdLCBbMTYsIDVdLFxuICAgICAgICAgICAgICAgIFsyNiwgNV0sIFszLCAxMF0sIFsxLCAxMV0sIFsyNSwgMTJdLCBbMjYsIDEyXVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHthOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiOiB7X19ldmFsdWF0ZV9fOiAnXCJ0XCIgKyBcImVzXCIgKyBcInRcIid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgYzoge19fZXZhbHVhdGVfXzogJ3JlbW92ZVMoc2VsZi5hLmIpJ31cbiAgICAgICAgICAgICAgICAgICAgfX0sXG4gICAgICAgICAgICAgICAgICAgIHtyZW1vdmVTOiAodmFsdWU6c3RyaW5nKTpzdHJpbmcgPT4gdmFsdWUucmVwbGFjZSgncycsICcnKX1cbiAgICAgICAgICAgICAgICBdLCB7YToge2I6ICd0ZXN0JywgYzogJ3RldCd9fVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbe1xuICAgICAgICAgICAgICAgICAgICBhOiB7X19ldmFsdWF0ZV9fOiAndG9TdHJpbmcoc2VsZi5iKSd9LFxuICAgICAgICAgICAgICAgICAgICBiOiB7X19ldmFsdWF0ZV9fOiBgJ2EnYH1cbiAgICAgICAgICAgICAgICB9LCB7dG9TdHJpbmc6ICh2YWx1ZTphbnkpOnN0cmluZyA9PiB2YWx1ZS50b1N0cmluZygpfV0sXG4gICAgICAgICAgICAgICAge2E6ICdhJywgYjogJ2EnfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbe1xuICAgICAgICAgICAgICAgIGE6IHtfX2V2YWx1YXRlX186ICdPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzZWxmLmIpJ30sXG4gICAgICAgICAgICAgICAgYjoge19fZXZhbHVhdGVfXzogJ3thOiAyfSd9XG4gICAgICAgICAgICB9XSwge2E6IFsnYSddLCBiOiB7YTogMn19XSxcbiAgICAgICAgICAgIFtbe1xuICAgICAgICAgICAgICAgIGE6IHtfX2V2YWx1YXRlX186ICdSZWZsZWN0Lm93bktleXMoc2VsZi5iKSd9LFxuICAgICAgICAgICAgICAgIGI6IHtfX2V2YWx1YXRlX186ICd7YTogMn0nfVxuICAgICAgICAgICAgfV0sIHthOiBbJ2EnXSwgYjoge2E6IDJ9fV0sXG4gICAgICAgICAgICBbW3tcbiAgICAgICAgICAgICAgICBhOiB7X19ldmFsdWF0ZV9fOiAnT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc2VsZi5iKSd9LFxuICAgICAgICAgICAgICAgIGI6IHtfX2V2YWx1YXRlX186ICdzZWxmLmMnfSxcbiAgICAgICAgICAgICAgICBjOiB7X19leGVjdXRlX186ICdyZXR1cm4ge2E6IDEsIGI6IDJ9J31cbiAgICAgICAgICAgIH1dLCB7YTogWydhJywgJ2InXSwgYjoge2E6IDEsIGI6IDJ9LCBjOiB7YTogMSwgYjogMn19XSxcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgTk9URTogVGhpcyBkZXNjcmliZXMgYSB3b3JrYXJvdW5kIHVudGlsIHRoZSBcIm93bktleXNcIiBwcm94eVxuICAgICAgICAgICAgICAgIHRyYXAgd29ya3MgZm9yIHRoaXMgdXNlIGNhc2VzLlxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIFtbe1xuICAgICAgICAgICAgICAgIGE6IHtfX2V2YWx1YXRlX186ICdPYmplY3Qua2V5cyhyZXNvbHZlKHNlbGYuYikpJ30sXG4gICAgICAgICAgICAgICAgYjoge19fZXZhbHVhdGVfXzogJ3thOiAyfSd9XG4gICAgICAgICAgICB9XSwge2E6IFsnYSddLCBiOiB7YTogMn19XSxcbiAgICAgICAgICAgIFtbe1xuICAgICAgICAgICAgICAgIGE6IHtfX2V2YWx1YXRlX186IGAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBbXVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiByZXNvbHZlKHNlbGYuYikpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChrZXkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgICAgICB9KSgpYH0sXG4gICAgICAgICAgICAgICAgYjoge19fZXZhbHVhdGVfXzogJ3thOiAxLCBiOiAyLCBjOiAzfSd9XG4gICAgICAgICAgICB9XSwge2E6IFsnYScsICdiJywgJ2MnXSwgYjoge2E6IDEsIGI6IDIsIGM6IDN9fV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5jb3B5TGltaXRlZFJlY3Vyc2l2ZWx5KFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuZXZhbHVhdGVEeW5hbWljRGF0YVN0cnVjdHVyZSguLi50ZXN0WzBdKSwgLTEsXG4gICAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgZXh0ZW5kT2JqZWN0ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6YW55IG9mIFtcbiAgICAgICAgICAgIFtbW11dLCBbXV0sXG4gICAgICAgICAgICBbW3t9XSwge31dLFxuICAgICAgICAgICAgW1t7YTogMX1dLCB7YTogMX1dLFxuICAgICAgICAgICAgW1t7YTogMX0sIHthOiAyfV0sIHthOiAyfV0sXG4gICAgICAgICAgICBbW3t9LCB7YTogMX0sIHthOiAyfV0sIHthOiAyfV0sXG4gICAgICAgICAgICBbW3t9LCB7YTogMX0sIHthOiAyfV0sIHthOiAyfV0sXG4gICAgICAgICAgICBbW3thOiAxLCBiOiB7YTogMX19LCB7YTogMiwgYjoge2I6IDF9fV0sIHthOiAyLCBiOiB7YjogMX19XSxcbiAgICAgICAgICAgIFtbWzEsIDJdLCBbMV1dLCBbMV1dLFxuICAgICAgICAgICAgW1tuZXcgTWFwKCldLCBuZXcgTWFwKCldLFxuICAgICAgICAgICAgW1tuZXcgU2V0KCldLCBuZXcgU2V0KCldLFxuICAgICAgICAgICAgW1tuZXcgTWFwKFtbJ2EnLCAxXV0pXSwgbmV3IE1hcChbWydhJywgMV1dKV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW25ldyBNYXAoW1snYScsIDFdXSksIG5ldyBNYXAoW1snYScsIDJdXSldLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIDJdXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW25ldyBNYXAoKSwgbmV3IE1hcChbWydhJywgMV1dKSwgbmV3IE1hcChbWydhJywgMl1dKV0sXG4gICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgMl1dKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbbmV3IE1hcCgpLCBuZXcgTWFwKFtbJ2EnLCAxXV0pLCBuZXcgTWFwKFtbJ2EnLCAyXV0pXSxcbiAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCAyXV0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgMV0sIFsnYicsIG5ldyBNYXAoW1snYScsIDFdXSldXSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIDJdLCBbJ2InLCBuZXcgTWFwKFtbJ2InLCAxXV0pXV0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBuZXcgTWFwKFtbJ2EnLCAyXSwgWydiJywgbmV3IE1hcChbWydiJywgMV1dKV1dKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbdHJ1ZSwge31dLCB7fV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3RydWUsIHthOiAxLCBiOiB7YTogMX19LCB7YTogMiwgYjoge2I6IDF9fV0sXG4gICAgICAgICAgICAgICAge2E6IDIsIGI6IHthOiAxLCBiOiAxfX1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3RydWUsIHthOiAxLCBiOiB7YTogW119fSwge2E6IDIsIGI6IHtiOiAxfX1dLFxuICAgICAgICAgICAgICAgIHthOiAyLCBiOiB7YTogW10sIGI6IDF9fVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbdHJ1ZSwge2E6IHthOiBbMSwgMl19fSwge2E6IHthOiBbMywgNF19fV0sIHthOiB7YTogWzMsIDRdfX1dLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFt0cnVlLCB7YToge2E6IFsxLCAyXX19LCB7YToge2E6IG51bGx9fV0sXG4gICAgICAgICAgICAgICAge2E6IHthOiBudWxsfX1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbW3RydWUsIHthOiB7YTogWzEsIDJdfX0sIHthOiB0cnVlfV0sIHthOiB0cnVlfV0sXG4gICAgICAgICAgICBbW3RydWUsIHthOiB7X2E6IDF9fSwge2E6IHtiOiAyfX1dLCB7YToge19hOiAxLCBiOiAyfX1dLFxuICAgICAgICAgICAgW1tmYWxzZSwge19hOiAxfSwge2E6IDJ9XSwge2E6IDIsIF9hOiAxfV0sXG4gICAgICAgICAgICBbW3RydWUsIHthOiB7YTogWzEsIDJdfX0sIGZhbHNlXSwgZmFsc2VdLFxuICAgICAgICAgICAgW1t0cnVlLCB7YToge2E6IFsxLCAyXX19LCB1bmRlZmluZWRdLCB1bmRlZmluZWRdLFxuICAgICAgICAgICAgW1t0cnVlLCB7YTogMX0sIHthOiAyfSwge2E6IDN9XSwge2E6IDN9XSxcbiAgICAgICAgICAgIFtbdHJ1ZSwgWzFdLCBbMSwgMl1dLCBbMSwgMl1dLFxuICAgICAgICAgICAgW1t0cnVlLCBbMSwgMl0sIFsxXV0sIFsxXV0sXG4gICAgICAgICAgICBbW3RydWUsIG5ldyBNYXAoKV0sIG5ldyBNYXAoKV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB0cnVlLCBuZXcgTWFwKFtbJ2EnLCAxXSwgWydiJywgbmV3IE1hcChbWydhJywgMV1dKV1dKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgMl0sIFsnYicsIG5ldyBNYXAoW1snYicsIDFdXSldXSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIDJdLCBbJ2InLCBuZXcgTWFwKFtbJ2EnLCAxXSwgWydiJywgMV1dKV1dKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHRydWUsIG5ldyBNYXAoW1snYScsIDFdLCBbJ2InLCBuZXcgTWFwKFtbJ2EnLCBbXV1dKV1dKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgMl0sIFsnYicsIG5ldyBNYXAoW1snYicsIDFdXSldXSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIDJdLCBbJ2InLCBuZXcgTWFwKFtbJ2EnLCBbXV0sIFsnYicsIDFdXSldXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB0cnVlLCBuZXcgTWFwKFtbJ2EnLCBuZXcgTWFwKFtbJ2EnLCBbMSwgMl1dXSldXSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBNYXAoW1snYScsIG5ldyBNYXAoW1snYScsIFszLCA0XV1dKV1dKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgbmV3IE1hcChbWydhJywgbmV3IE1hcChbWydhJywgWzMsIDRdXV0pXV0pXG4gICAgICAgICAgICBdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuZXh0ZW5kT2JqZWN0KC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmV4dGVuZE9iamVjdChbMSwgMl0sIHVuZGVmaW5lZCksIHVuZGVmaW5lZClcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3MuZXh0ZW5kT2JqZWN0KFsxLCAyXSwgbnVsbCksIG51bGwpXG4gICAgICAgIGNvbnN0IHRhcmdldDpPYmplY3QgPSB7YTogWzEsIDJdfVxuICAgICAgICAkLlRvb2xzLmNsYXNzLmV4dGVuZE9iamVjdCh0cnVlLCB0YXJnZXQsIHthOiBbMywgNF19KVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHRhcmdldCwge2E6IFszLCA0XX0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGZvckVhY2hTb3J0ZWQgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXVxuICAgICAgICBjb25zdCB0ZXN0ZXIgPSAoaXRlbTpBcnJheTxhbnk+fE9iamVjdCk6QXJyYXk8YW55PiA9PlxuICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5mb3JFYWNoU29ydGVkKFxuICAgICAgICAgICAgICAgIGl0ZW0sICh2YWx1ZTphbnksIGtleTpzdHJpbmd8bnVtYmVyKTpudW1iZXIgPT5cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goW2tleSwgdmFsdWVdKSlcbiAgICAgICAgdGVzdGVyKHt9KVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW10pXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwodGVzdGVyKHt9KSwgW10pXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwodGVzdGVyKFtdKSwgW10pXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwodGVzdGVyKHthOiAyfSksIFsnYSddKVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHRlc3Rlcih7YjogMSwgYTogMn0pLCBbJ2EnLCAnYiddKVxuICAgICAgICByZXN1bHQgPSBbXVxuICAgICAgICB0ZXN0ZXIoe2I6IDEsIGE6IDJ9KVxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW1snYScsIDJdLCBbJ2InLCAxXV0pXG4gICAgICAgIHJlc3VsdCA9IFtdXG5cbiAgICAgICAgdGVzdGVyKFsyLCAyXSlcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFtbMCwgMl0sIFsxLCAyXV0pXG4gICAgICAgIHJlc3VsdCA9IFtdXG4gICAgICAgIHRlc3Rlcih7JzUnOiAyLCAnNic6IDIsICcyJzogM30pXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbWycyJywgM10sIFsnNScsIDJdLCBbJzYnLCAyXV0pXG4gICAgICAgIHJlc3VsdCA9IFtdXG4gICAgICAgIHRlc3Rlcih7YTogMiwgYzogMiwgejogM30pXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbWydhJywgMl0sIFsnYycsIDJdLCBbJ3onLCAzXV0pXG4gICAgICAgICQuVG9vbHMuY2xhc3MuZm9yRWFjaFNvcnRlZChbMV0sIGZ1bmN0aW9uKCk6bnVtYmVyIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXNcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgfSwgMilcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIDIpXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGdldFByb3h5SGFuZGxlciAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuaXNQbGFpbk9iamVjdCgkLlRvb2xzLmNsYXNzLmdldFByb3h5SGFuZGxlcihcbiAgICAgICAgICAgIHt9KSkpXG4gICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmlzUGxhaW5PYmplY3QoJC5Ub29scy5jbGFzcy5nZXRQcm94eUhhbmRsZXIoXG4gICAgICAgICAgICBuZXcgTWFwKCksIHtnZXQ6ICdnZXQnfSkpKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBtb2RpZnlPYmplY3QgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDphbnkgb2YgW1xuICAgICAgICAgICAgW1t7fSwge31dLCB7fSwge31dLFxuICAgICAgICAgICAgW1t7YTogMn0sIHt9XSwge2E6IDJ9LCB7fV0sXG4gICAgICAgICAgICBbW3thOiAyfSwge2I6IDF9XSwge2E6IDJ9LCB7YjogMX1dLFxuICAgICAgICAgICAgW1t7YTogMn0sIHtfX3JlbW92ZV9fOiAnYSd9XSwge30sIHt9XSxcbiAgICAgICAgICAgIFtbe2E6IDJ9LCB7X19yZW1vdmVfXzogWydhJ119XSwge30sIHt9XSxcbiAgICAgICAgICAgIFtbe2E6IFsyXX0sIHthOiB7X19wcmVwZW5kX186IDF9fV0sIHthOiBbMSwgMl19LCB7fV0sXG4gICAgICAgICAgICBbW3thOiBbMl19LCB7YToge19fcmVtb3ZlX186IDF9fV0sIHthOiBbMl19LCB7fV0sXG4gICAgICAgICAgICBbW3thOiBbMiwgMV19LCB7YToge19fcmVtb3ZlX186IDF9fV0sIHthOiBbMl19LCB7fV0sXG4gICAgICAgICAgICBbW3thOiBbMiwgMV19LCB7YToge19fcmVtb3ZlX186IFsxLCAyXX19XSwge2E6IFtdfSwge31dLFxuICAgICAgICAgICAgW1t7YTogWzFdfSwge2E6IHtfX3JlbW92ZV9fOiAxfX1dLCB7YTogW119LCB7fV0sXG4gICAgICAgICAgICBbW3thOiBbMV19LCB7YToge19fcmVtb3ZlX186IFsxLCAyXX19XSwge2E6IFtdfSwge31dLFxuICAgICAgICAgICAgW1t7YTogWzJdfSwge2E6IHtfX2FwcGVuZF9fOiAxfX1dLCB7YTogWzIsIDFdfSwge31dLFxuICAgICAgICAgICAgW1t7YTogWzJdfSwge2E6IHtfX2FwcGVuZF9fOiBbMSwgMl19fV0sIHthOiBbMiwgMSwgMl19LCB7fV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3thOiBbMl19LCB7YToge19fYXBwZW5kX186IFsxLCAyXX0sIGI6IDF9XSxcbiAgICAgICAgICAgICAgICB7YTogWzIsIDEsIDJdfSwge2I6IDF9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFt7YTogWzJdfSwge2E6IHthZGQ6IFsxLCAyXX0sIGI6IDF9LCAncm0nLCAndW5zaGlmdCcsICdhZGQnXSxcbiAgICAgICAgICAgICAgICB7YTogWzIsIDEsIDJdfSwge2I6IDF9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFt7YTogWzJdfSwge2E6IHtfX3ByZXBlbmRfXzogMX19LCAnX3InLCAnX3AnXSxcbiAgICAgICAgICAgICAgICB7YTogWzJdfSwge2E6IHtfX3ByZXBlbmRfXzogMX19XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1t7YTogWzJdfSwge2E6IHtfX3ByZXBlbmRfXzogWzEsIDNdfX1dLCB7YTogWzEsIDMsIDJdfSwge31dLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFt7YTogWzJdfSwge2E6IHtfX2FwcGVuZF9fOiBbMSwgMl0sIF9fcHJlcGVuZF9fOiAncyd9fV0sXG4gICAgICAgICAgICAgICAge2E6IFsncycsIDIsIDEsIDJdfSwge31cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3thOiBbMiwgMl19LCB7YToge19fcHJlcGVuZF9fOiAncycsIF9fcmVtb3ZlX186IDJ9fV0sXG4gICAgICAgICAgICAgICAge2E6IFsncycsIDJdfSwge31cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW3thOiBbMiwgMl19LCB7YToge19fcHJlcGVuZF9fOiAncycsIF9fcmVtb3ZlX186IFsyLCAyXX19XSxcbiAgICAgICAgICAgICAgICB7YTogWydzJ119LCB7fVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbXG4gICAgICAgICAgICAgICAge2E6IFsyLCAxLCAyXX0sXG4gICAgICAgICAgICAgICAge2E6IHtfX3ByZXBlbmRfXzogJ3MnLCBfX3JlbW92ZV9fOiBbMiwgMl0sIF9fYXBwZW5kX186ICdhJ319XG4gICAgICAgICAgICBdLCB7YTogWydzJywgMSwgJ2EnXX0sIHt9XVxuICAgICAgICBdKSB7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MubW9kaWZ5T2JqZWN0KC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCh0ZXN0WzBdWzFdLCB0ZXN0WzJdKVxuICAgICAgICB9XG4gICAgfSlcbiAgICBRVW5pdC50ZXN0KCdyZXByZXNlbnRPYmplY3QnLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IGVycm9yOkVycm9yID0gbmV3IEVycm9yKCdBJylcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW3t9LCAne30nXSxcbiAgICAgICAgICAgIFtuZXcgU2V0KCksICdFbXB0eVNldCddLFxuICAgICAgICAgICAgW25ldyBNYXAoKSwgJ0VtcHR5TWFwJ10sXG4gICAgICAgICAgICBbNSwgJzUnXSxcbiAgICAgICAgICAgIFsnYScsICdcImFcIiddLFxuICAgICAgICAgICAgW1tdLCAnW10nXSxcbiAgICAgICAgICAgIFt7YTogMiwgYjogM30sICd7XFxuIGE6IDIsXFxuIGI6IDNcXG59J10sXG4gICAgICAgICAgICBbbmV3IE1hcChbWyczJywgMl0sIFsyLCAzXV0pLCAnXCIzXCIgLT4gMixcXG4gMiAtPiAzJ10sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgbmV3IE1hcChbWyczJywgMl0sIFsyLCBuZXcgTWFwKFtbMywgM10sIFsyLCAyXV0pXV0pLFxuICAgICAgICAgICAgICAgICdcIjNcIiAtPiAyLFxcbiAyIC0+IDMgLT4gMyxcXG4gIDIgLT4gMidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbbmV3IFNldChbJzMnLCAyLCAyLCAzXSksICd7XFxuIFwiM1wiLFxcbiAyLFxcbiAzXFxufSddLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIG5ldyBTZXQoWyczJywgMiwgbmV3IFNldChbMywgMl0pXSksXG4gICAgICAgICAgICAgICAgJ3tcXG4gXCIzXCIsXFxuIDIsXFxuIHtcXG4gIDMsXFxuICAyXFxuIH1cXG59J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICB7YTogbnVsbCwgYjogMywgYzogJ2EnLCBkOiB0cnVlfSxcbiAgICAgICAgICAgICAgICAne1xcbiBhOiBudWxsLFxcbiBiOiAzLFxcbiBjOiBcImFcIixcXG4gZDogdHJ1ZVxcbn0nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHthOiB7YTogbnVsbCwgYjogMywgYzogJ2EnLCBkOiB0cnVlfX0sXG4gICAgICAgICAgICAgICAgJ3tcXG4gYToge1xcbiAgYTogbnVsbCxcXG4gIGI6IDMsXFxuICBjOiBcImFcIixcXG4gIGQ6IHRydWVcXG4gfVxcbn0nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHthOiB7YTogbnVsbCwgYjogMywgYzogJ2EnLCBkOiB7fX19LFxuICAgICAgICAgICAgICAgICd7XFxuIGE6IHtcXG4gIGE6IG51bGwsXFxuICBiOiAzLFxcbiAgYzogXCJhXCIsXFxuICBkOiB7fVxcbiB9XFxufSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge2E6IHthOiB7YTogbnVsbCwgYjoge319fX0sXG4gICAgICAgICAgICAgICAgJ3tcXG4gYToge1xcbiAgYToge1xcbiAgIGE6IG51bGwsXFxuICAgYjoge31cXG4gIH1cXG4gfVxcbn0nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHthOiB7YTogZXJyb3J9fSxcbiAgICAgICAgICAgICAgICAne1xcbiBhOiB7XFxuICBhOiB7XFxuICAgbWVzc2FnZTogXCJBXCIsXFxuICAgc3RhY2s6IFwiJyArXG4gICAgICAgICAgICAgICAgYCR7ZXJyb3Iuc3RhY2sucmVwbGFjZSgvXFxuL2csICdcXG4gICAnKX1cIlxcbiAgfVxcbiB9XFxufWBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbW3thOiAyfV0sICdbXFxuIHtcXG4gIGE6IDJcXG4gfVxcbl0nXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3MucmVwcmVzZW50T2JqZWN0KHRlc3RbMF0sICcgJyksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHNvcnQgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbXSwgW11dLFxuICAgICAgICAgICAgW3t9LCBbXV0sXG4gICAgICAgICAgICBbWzFdLCBbMF1dLFxuICAgICAgICAgICAgW1sxLCAyLCAzXSwgWzAsIDEsIDJdXSxcbiAgICAgICAgICAgIFtbMywgMiwgMV0sIFswLCAxLCAyXV0sXG4gICAgICAgICAgICBbWzIsIDMsIDFdLCBbMCwgMSwgMl1dLFxuICAgICAgICAgICAgW3snMSc6IDIsICcyJzogNSwgJzMnOiAnYSd9LCBbJzEnLCAnMicsICczJ11dLFxuICAgICAgICAgICAgW3snMic6IDIsICcxJzogNSwgJy01JzogJ2EnfSwgWyctNScsICcxJywgJzInXV0sXG4gICAgICAgICAgICBbeyczJzogMiwgJzInOiA1LCAnMSc6ICdhJ30sIFsnMScsICcyJywgJzMnXV0sXG4gICAgICAgICAgICBbe2E6IDIsIGI6IDUsIGM6ICdhJ30sIFsnYScsICdiJywgJ2MnXV0sXG4gICAgICAgICAgICBbe2M6IDIsIGI6IDUsIGE6ICdhJ30sIFsnYScsICdiJywgJ2MnXV0sXG4gICAgICAgICAgICBbe2I6IDIsIGM6IDUsIHo6ICdhJ30sIFsnYicsICdjJywgJ3onXV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5zb3J0KHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGB1bndyYXBQcm94eSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW3t9LCB7fV0sXG4gICAgICAgICAgICBbe2E6ICdhJ30sIHthOiAnYSd9XSxcbiAgICAgICAgICAgIFt7YTogJ2FhJ30sIHthOiAnYWEnfV0sXG4gICAgICAgICAgICBbe2E6IHtfX3RhcmdldF9fOiAyLCBfX3Jldm9rZV9fOiAoKTp2b2lkID0+IHt9fX0sIHthOiAyfV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy51bndyYXBQcm94eSh0ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIC8vIC8vIGVuZHJlZ2lvblxuICAgIC8vIC8vIHJlZ2lvbiBhcnJheVxuICAgIHRoaXMudGVzdChgYXJyYXlNZXJnZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tdLCBbXSwgW11dLFxuICAgICAgICAgICAgW1sxXSwgW10sIFsxXV0sXG4gICAgICAgICAgICBbW10sIFsxXSwgWzFdXSxcbiAgICAgICAgICAgIFtbMV0sIFsxXSwgWzEsIDFdXSxcbiAgICAgICAgICAgIFtbMSwgMiwgMywgMV0sIFsxLCAyLCAzXSwgWzEsIDIsIDMsIDEsIDEsIDIsIDNdXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmFycmF5TWVyZ2UodGVzdFswXSwgdGVzdFsxXSksIHRlc3RbMl0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGFycmF5TWFrZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tdLCBbXV0sXG4gICAgICAgICAgICBbWzEsIDIsIDNdLCBbMSwgMiwgM11dLFxuICAgICAgICAgICAgWzEsIFsxXV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5hcnJheU1ha2UodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGFycmF5VW5pcXVlICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbWzEsIDIsIDMsIDFdLCBbMSwgMiwgM11dLFxuICAgICAgICAgICAgW1sxLCAyLCAzLCAxLCAyLCAzXSwgWzEsIDIsIDNdXSxcbiAgICAgICAgICAgIFtbXSwgW11dLFxuICAgICAgICAgICAgW1sxLCAyLCAzXSwgWzEsIDIsIDNdXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmFycmF5VW5pcXVlKHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBhcnJheUFnZ3JlZ2F0ZVByb3BlcnR5SWZFcXVhbCAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbW3thOiAnYid9XSwgJ2EnXSwgJ2InXSxcbiAgICAgICAgICAgIFtbW3thOiAnYid9LCB7YTogJ2InfV0sICdhJ10sICdiJ10sXG4gICAgICAgICAgICBbW1t7YTogJ2InfSwge2E6ICdjJ31dLCAnYSddLCAnJ10sXG4gICAgICAgICAgICBbW1t7YTogJ2InfSwge2E6ICdjJ31dLCAnYScsIGZhbHNlXSwgZmFsc2VdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoJC5Ub29scy5jbGFzcy5hcnJheUFnZ3JlZ2F0ZVByb3BlcnR5SWZFcXVhbChcbiAgICAgICAgICAgICAgICAuLi50ZXN0WzBdXG4gICAgICAgICAgICApLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBhcnJheURlbGV0ZUVtcHR5SXRlbXMgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbW3thOiBudWxsfV1dLCBbXV0sXG4gICAgICAgICAgICBbW1t7YTogbnVsbCwgYjogMn1dXSwgW3thOiBudWxsLCBiOiAyfV1dLFxuICAgICAgICAgICAgW1tbe2E6IG51bGwsIGI6IDJ9XSwgWydhJ11dLCBbXV0sXG4gICAgICAgICAgICBbW1tdLCBbJ2EnXV0sIFtdXSxcbiAgICAgICAgICAgIFtbW11dLCBbXV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5hcnJheURlbGV0ZUVtcHR5SXRlbXMoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGFycmF5RXh0cmFjdCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tbe2E6ICdiJywgYzogJ2QnfV0sIFsnYSddXSwgW3thOiAnYid9XV0sXG4gICAgICAgICAgICBbW1t7YTogJ2InLCBjOiAnZCd9XSwgWydiJ11dLCBbe31dXSxcbiAgICAgICAgICAgIFtbW3thOiAnYicsIGM6ICdkJ31dLCBbJ2MnXV0sIFt7YzogJ2QnfV1dLFxuICAgICAgICAgICAgW1tbe2E6ICdiJywgYzogJ2QnfSwge2E6IDN9XSwgWydjJ11dLCBbe2M6ICdkJ30sIHt9XV0sXG4gICAgICAgICAgICBbW1t7YTogJ2InLCBjOiAnZCd9LCB7YzogM31dLCBbJ2MnXV0sIFt7YzogJ2QnfSwge2M6IDN9XV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5hcnJheUV4dHJhY3QoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGFycmF5RXh0cmFjdElmTWF0Y2hlcyAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1snYiddLCAvYi8sIFsnYiddXSxcbiAgICAgICAgICAgIFtbJ2InXSwgJ2InLCBbJ2InXV0sXG4gICAgICAgICAgICBbWydiJ10sICdhJywgW11dLFxuICAgICAgICAgICAgW1tdLCAnYScsIFtdXSxcbiAgICAgICAgICAgIFtbJ2EnLCAnYiddLCAnJywgWydhJywgJ2InXV0sXG4gICAgICAgICAgICBbWydhJywgJ2InXSwgJ14kJywgW11dLFxuICAgICAgICAgICAgW1snYScsICdiJ10sICdiJywgWydiJ11dLFxuICAgICAgICAgICAgW1snYScsICdiJ10sICdbYWJdJywgWydhJywgJ2InXV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoJC5Ub29scy5jbGFzcy5hcnJheUV4dHJhY3RJZk1hdGNoZXMoXG4gICAgICAgICAgICAgICAgdGVzdFswXSwgdGVzdFsxXVxuICAgICAgICAgICAgKSwgdGVzdFsyXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgYXJyYXlFeHRyYWN0SWZQcm9wZXJ0eUV4aXN0cyAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbe2E6IDJ9XSwgJ2EnLCBbe2E6IDJ9XV0sXG4gICAgICAgICAgICBbW3thOiAyfV0sICdiJywgW11dLFxuICAgICAgICAgICAgW1tdLCAnYicsIFtdXSxcbiAgICAgICAgICAgIFtbe2E6IDJ9LCB7YjogM31dLCAnYScsIFt7YTogMn1dXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmFycmF5RXh0cmFjdElmUHJvcGVydHlFeGlzdHMoXG4gICAgICAgICAgICAgICAgdGVzdFswXSwgdGVzdFsxXVxuICAgICAgICAgICAgKSwgdGVzdFsyXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgYXJyYXlFeHRyYWN0SWZQcm9wZXJ0eU1hdGNoZXMgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbW3thOiAnYid9XSwge2E6ICdiJ30sIFt7YTogJ2InfV1dLFxuICAgICAgICAgICAgW1t7YTogJ2InfV0sIHthOiAnLid9LCBbe2E6ICdiJ31dXSxcbiAgICAgICAgICAgIFtbe2E6ICdiJ31dLCB7YTogJ2EnfSwgW11dLFxuICAgICAgICAgICAgW1tdLCB7YTogJ2EnfSwgW11dLFxuICAgICAgICAgICAgW1t7YTogMn1dLCB7YjogL2EvfSwgW11dLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFt7bWltZVR5cGU6ICd0ZXh0L3gtd2VibSd9XSxcbiAgICAgICAgICAgICAgICB7bWltZVR5cGU6IG5ldyBSZWdFeHAoJ150ZXh0L3gtd2VibSQnKX0sXG4gICAgICAgICAgICAgICAgW3ttaW1lVHlwZTogJ3RleHQveC13ZWJtJ31dXG4gICAgICAgICAgICBdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYXJyYXlFeHRyYWN0SWZQcm9wZXJ0eU1hdGNoZXMoXG4gICAgICAgICAgICAgICAgdGVzdFswXSwgdGVzdFsxXVxuICAgICAgICAgICAgKSwgdGVzdFsyXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgYXJyYXlJbnRlcnNlY3QgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbWydBJ10sIFsnQSddXSwgWydBJ11dLFxuICAgICAgICAgICAgW1tbJ0EnLCAnQiddLCBbJ0EnXV0sIFsnQSddXSxcbiAgICAgICAgICAgIFtbW10sIFtdXSwgW11dLFxuICAgICAgICAgICAgW1tbNV0sIFtdXSwgW11dLFxuICAgICAgICAgICAgW1tbe2E6IDJ9XSwgW3thOiAyfV1dLCBbe2E6IDJ9XV0sXG4gICAgICAgICAgICBbW1t7YTogM31dLCBbe2E6IDJ9XV0sIFtdXSxcbiAgICAgICAgICAgIFtbW3thOiAzfV0sIFt7YjogM31dXSwgW11dLFxuICAgICAgICAgICAgW1tbe2E6IDN9XSwgW3tiOiAzfV0sIFsnYiddXSwgW11dLFxuICAgICAgICAgICAgW1tbe2E6IDN9XSwgW3tiOiAzfV0sIFsnYiddLCBmYWxzZV0sIFtdXSxcbiAgICAgICAgICAgIFtbW3tiOiBudWxsfV0sIFt7YjogbnVsbH1dLCBbJ2InXV0sIFt7YjogbnVsbH1dXSxcbiAgICAgICAgICAgIFtbW3tiOiBudWxsfV0sIFt7YjogdW5kZWZpbmVkfV0sIFsnYiddXSwgW11dLFxuICAgICAgICAgICAgW1tbe2I6IG51bGx9XSwgW3tiOiB1bmRlZmluZWR9XSwgWydiJ10sIGZhbHNlXSwgW3tiOiBudWxsfV1dLFxuICAgICAgICAgICAgW1tbe2I6IG51bGx9XSwgW3t9XSwgWydiJ10sIGZhbHNlXSwgW3tiOiBudWxsfV1dLFxuICAgICAgICAgICAgW1tbe2I6IHVuZGVmaW5lZH1dLCBbe31dLCBbJ2InXSwgZmFsc2VdLCBbe2I6IHVuZGVmaW5lZH1dXSxcbiAgICAgICAgICAgIFtbW3t9XSwgW3t9XSwgWydiJ10sIGZhbHNlXSwgW3t9XV0sXG4gICAgICAgICAgICBbW1t7YjogbnVsbH1dLCBbe31dLCBbJ2InXV0sIFtdXSxcbiAgICAgICAgICAgIFtbW3tiOiB1bmRlZmluZWR9XSwgW3t9XSwgWydiJ10sIHRydWVdLCBbe2I6IHVuZGVmaW5lZH1dXSxcbiAgICAgICAgICAgIFtbW3tiOiAxfV0sIFt7YTogMX1dLCB7YjogJ2EnfSwgdHJ1ZV0sIFt7YjogMX1dXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmFycmF5SW50ZXJzZWN0KC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBhcnJheU1ha2VSYW5nZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tbMF1dLCBbMF1dLFxuICAgICAgICAgICAgW1tbNV1dLCBbMCwgMSwgMiwgMywgNCwgNV1dLFxuICAgICAgICAgICAgW1tbXV0sIFtdXSxcbiAgICAgICAgICAgIFtbWzIsIDVdXSwgWzIsIDMsIDQsIDVdXSxcbiAgICAgICAgICAgIFtbWzIsIDEwXSwgMl0sIFsyLCA0LCA2LCA4LCAxMF1dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYXJyYXlNYWtlUmFuZ2UoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGFycmF5U3VtVXBQcm9wZXJ0eSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1tbe2E6IDJ9LCB7YTogM31dLCAnYSddLCA1XSxcbiAgICAgICAgICAgIFtbW3thOiAyfSwge2I6IDN9XSwgJ2EnXSwgMl0sXG4gICAgICAgICAgICBbW1t7YTogMn0sIHtiOiAzfV0sICdjJ10sIDBdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5hcnJheVN1bVVwUHJvcGVydHkoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGFycmF5QXBwZW5kQWRkICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBjb25zdCB0ZXN0T2JqZWN0Ok9iamVjdCA9IHt9XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbe30sIHt9LCAnYiddLCB7YjogW3t9XX1dLFxuICAgICAgICAgICAgW1t0ZXN0T2JqZWN0LCB7YTogM30sICdiJ10sIHtiOiBbe2E6IDN9XX1dLFxuICAgICAgICAgICAgW1t0ZXN0T2JqZWN0LCB7YTogM30sICdiJ10sIHtiOiBbe2E6IDN9LCB7YTogM31dfV0sXG4gICAgICAgICAgICBbW3tiOiBbMl19LCAyLCAnYicsIGZhbHNlXSwge2I6IFsyLCAyXX1dLFxuICAgICAgICAgICAgW1t7YjogWzJdfSwgMiwgJ2InXSwge2I6IFsyXX1dXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKCQuVG9vbHMuY2xhc3MuYXJyYXlBcHBlbmRBZGQoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYGFycmF5UmVtb3ZlICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbW1tdLCAyXSwgW11dLFxuICAgICAgICAgICAgW1tbMl0sIDJdLCBbXV0sXG4gICAgICAgICAgICBbW1syXSwgMiwgdHJ1ZV0sIFtdXSxcbiAgICAgICAgICAgIFtbWzEsIDJdLCAyXSwgWzFdXSxcbiAgICAgICAgICAgIFtbWzEsIDJdLCAyLCB0cnVlXSwgWzFdXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLmFycmF5UmVtb3ZlKC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgICAgICBhc3NlcnQudGhyb3dzKCgpOj9BcnJheTxhbnk+ID0+ICQuVG9vbHMuY2xhc3MuYXJyYXlSZW1vdmUoXG4gICAgICAgICAgICBbXSwgMiwgdHJ1ZVxuICAgICAgICApLCBuZXcgRXJyb3IoYEdpdmVuIHRhcmdldCBkb2Vzbid0IGV4aXN0cyBpbiBnaXZlbiBsaXN0LmApKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBhcnJheVNvcnRUb3BvbG9naWNhbCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW3t9LCBbXV0sXG4gICAgICAgICAgICBbe2E6IFtdfSwgWydhJ11dLFxuICAgICAgICAgICAgW3thOiAnYid9LCBbJ2InLCAnYSddXSxcbiAgICAgICAgICAgIFt7YTogW10sIGI6ICdhJ30sIFsnYScsICdiJ11dLFxuICAgICAgICAgICAgW3thOiBbXSwgYjogWydhJ119LCBbJ2EnLCAnYiddXSxcbiAgICAgICAgICAgIFt7YTogWydiJ10sIGI6IFtdfSwgWydiJywgJ2EnXV0sXG4gICAgICAgICAgICBbe2M6ICdiJywgYTogW10sIGI6IFsnYSddfSwgWydhJywgJ2InLCAnYyddXSxcbiAgICAgICAgICAgIFt7YjogWydhJ10sIGE6IFtdLCBjOiBbJ2EnLCAnYiddfSwgWydhJywgJ2InLCAnYyddXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLmFycmF5U29ydFRvcG9sb2dpY2FsKHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6YW55IG9mIFtcbiAgICAgICAgICAgIHthOiAnYSd9LFxuICAgICAgICAgICAge2E6ICdiJywgYjogJ2EnfSxcbiAgICAgICAgICAgIHthOiAnYicsIGI6ICdjJywgYzogJ2EnfVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKTp2b2lkID0+ICQuVG9vbHMuY2xhc3MuYXJyYXlTb3J0VG9wb2xvZ2ljYWwodGVzdCkpXG4gICAgfSlcbiAgICAvLyAvLyBlbmRyZWdpb25cbiAgICAvLyAvLyByZWdpb24gc3RyaW5nXG4gICAgdGhpcy50ZXN0KCdzdHJpbmdFc2NhcGVSZWd1bGFyRXhwcmVzc2lvbnMnLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbWycnXSwgJyddLFxuICAgICAgICAgICAgW1tgdGhhdCdzIG5vIHJlZ2V4OiAuKiRgXSwgYHRoYXQncyBubyByZWdleDogXFxcXC5cXFxcKlxcXFwkYF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWyctXFxcXFtdKCleJCorLn0tJywgJ30nXSxcbiAgICAgICAgICAgICAgICAnXFxcXC1cXFxcXFxcXFtcXFxcXVxcXFwoXFxcXClcXFxcXlxcXFwkXFxcXCpcXFxcK1xcXFwufVxcXFwtJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtbXG4gICAgICAgICAgICAgICAgJy1cXFxcW10oKV4kKisue30tJyxcbiAgICAgICAgICAgICAgICBbJ1snLCAnXScsICcoJywgJyknLCAnXicsICckJywgJyonLCAnKycsICcuJywgJ3snXVxuICAgICAgICAgICAgXSwgJ1xcXFwtXFxcXFtdKCleJCorLntcXFxcfVxcXFwtJ10sXG4gICAgICAgICAgICBbWyctJywgJ1xcXFwnXSwgJ1xcXFwtJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0VzY2FwZVJlZ3VsYXJFeHByZXNzaW9ucyguLi50ZXN0WzBdKSxcbiAgICAgICAgICAgICAgICB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KCdzdHJpbmdDb252ZXJ0VG9WYWxpZFZhcmlhYmxlTmFtZScsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PHN0cmluZz4gb2YgW1xuICAgICAgICAgICAgWycnLCAnJ10sXG4gICAgICAgICAgICBbJ2EnLCAnYSddLFxuICAgICAgICAgICAgWydfYScsICdfYSddLFxuICAgICAgICAgICAgWydfYV9hJywgJ19hX2EnXSxcbiAgICAgICAgICAgIFsnX2EtYScsICdfYUEnXSxcbiAgICAgICAgICAgIFsnLWEtYScsICdhQSddLFxuICAgICAgICAgICAgWyctYS0tYScsICdhQSddLFxuICAgICAgICAgICAgWyctLWEtLWEnLCAnYUEnXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nQ29udmVydFRvVmFsaWRWYXJpYWJsZU5hbWUoXG4gICAgICAgICAgICAgICAgICAgIHRlc3RbMF1cbiAgICAgICAgICAgICAgICApLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgLy8gLy8vIHJlZ2lvbiB1cmwgaGFuZGxpbmdcbiAgICB0aGlzLnRlc3QoYHN0cmluZ0VuY29kZVVSSUNvbXBvbmVudCAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbJyddLCAnJ10sXG4gICAgICAgICAgICBbWycgJ10sICcrJ10sXG4gICAgICAgICAgICBbWycgJywgdHJ1ZV0sICclMjAnXSxcbiAgICAgICAgICAgIFtbJ0A6JCwgJ10sICdAOiQsKyddLFxuICAgICAgICAgICAgW1snKyddLCAnJTJCJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0VuY29kZVVSSUNvbXBvbmVudCguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nQWRkU2VwYXJhdG9yVG9QYXRoICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1snJ10sICcnXSxcbiAgICAgICAgICAgIFtbJy8nXSwgJy8nXSxcbiAgICAgICAgICAgIFtbJy9hJ10sICcvYS8nXSxcbiAgICAgICAgICAgIFtbJy9hL2JiLyddLCAnL2EvYmIvJ10sXG4gICAgICAgICAgICBbWycvYS9iYiddLCAnL2EvYmIvJ10sXG4gICAgICAgICAgICBbWycvYS9iYicsICd8J10sICcvYS9iYnwnXSxcbiAgICAgICAgICAgIFtbJy9hL2JiLycsICd8J10sICcvYS9iYi98J11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0FkZFNlcGFyYXRvclRvUGF0aCguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nSGFzUGF0aFByZWZpeCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgWycvYWRtaW4nLCAnL2FkbWluJ10sXG4gICAgICAgICAgICBbJ3Rlc3QnLCAndGVzdCddLFxuICAgICAgICAgICAgWycnLCAnJ10sXG4gICAgICAgICAgICBbJ2EnLCAnYS9iJ10sXG4gICAgICAgICAgICBbJ2EvJywgJ2EvYiddLFxuICAgICAgICAgICAgWycvYWRtaW4nLCAnL2FkbWluI3Rlc3QnLCAnIyddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5zdHJpbmdIYXNQYXRoUHJlZml4KC4uLnRlc3QpKVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbJ2InLCAnYS9iJ10sXG4gICAgICAgICAgICBbJ2IvJywgJ2EvYiddLFxuICAgICAgICAgICAgWycvYWRtaW4vJywgJy9hZG1pbi90ZXN0JywgJyMnXSxcbiAgICAgICAgICAgIFsnL2FkbWluJywgJy9hZG1pbi90ZXN0JywgJyMnXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKCQuVG9vbHMuY2xhc3Muc3RyaW5nSGFzUGF0aFByZWZpeCguLi50ZXN0KSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nR2V0RG9tYWluTmFtZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFsnaHR0cHM6Ly93d3cudGVzdC5kZS9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCddLFxuICAgICAgICAgICAgICAgICd3d3cudGVzdC5kZSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbWydhJywgdHJ1ZV0sIHRydWVdLFxuICAgICAgICAgICAgW1snaHR0cDovL3d3dy50ZXN0LmRlJ10sICd3d3cudGVzdC5kZSddLFxuICAgICAgICAgICAgW1snaHR0cDovL2EuZGUnXSwgJ2EuZGUnXSxcbiAgICAgICAgICAgIFtbJ2h0dHA6Ly9sb2NhbGhvc3QnXSwgJ2xvY2FsaG9zdCddLFxuICAgICAgICAgICAgW1snbG9jYWxob3N0JywgJ2EnXSwgJ2EnXSxcbiAgICAgICAgICAgIFtbJ2EnLCAkLmdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZV0sICQuZ2xvYmFsLmxvY2F0aW9uLmhvc3RuYW1lXSxcbiAgICAgICAgICAgIFtbJy8vYSddLCAnYSddLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJ2Evc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICAgICAkLmdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgJC5nbG9iYWwubG9jYXRpb24uaG9zdG5hbWVcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnL2Evc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICAgICAkLmdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgJC5nbG9iYWwubG9jYXRpb24uaG9zdG5hbWVcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWycvL2FsdGVybmF0ZS5sb2NhbC9hL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJ10sXG4gICAgICAgICAgICAgICAgJ2FsdGVybmF0ZS5sb2NhbCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbWycvL2FsdGVybmF0ZS5sb2NhbC8nXSwgJ2FsdGVybmF0ZS5sb2NhbCddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5zdHJpbmdHZXREb21haW5OYW1lKC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdHZXRQb3J0TnVtYmVyICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbWydodHRwczovL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJ10sIDQ0M10sXG4gICAgICAgICAgICBbWydodHRwOi8vd3d3LnRlc3QuZGUnXSwgODBdLFxuICAgICAgICAgICAgW1snaHR0cDovL3d3dy50ZXN0LmRlJywgdHJ1ZV0sIHRydWVdLFxuICAgICAgICAgICAgW1snd3d3LnRlc3QuZGUnLCB0cnVlXSwgdHJ1ZV0sXG4gICAgICAgICAgICBbWydhJywgdHJ1ZV0sIHRydWVdLFxuICAgICAgICAgICAgW1snYScsIHRydWVdLCB0cnVlXSxcbiAgICAgICAgICAgIFtbJ2E6ODAnXSwgODBdLFxuICAgICAgICAgICAgW1snYToyMCddLCAyMF0sXG4gICAgICAgICAgICBbWydhOjQ0NCddLCA0NDRdLFxuICAgICAgICAgICAgW1snaHR0cDovL2xvY2FsaG9zdDo4OSddLCA4OV0sXG4gICAgICAgICAgICBbWydodHRwczovL2xvY2FsaG9zdDo4OSddLCA4OV1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0dldFBvcnROdW1iZXIoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ0dldFByb3RvY29sTmFtZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFsnaHR0cHM6Ly93d3cudGVzdC5kZS9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCddLFxuICAgICAgICAgICAgICAgICdodHRwcydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbWydodHRwOi8vd3d3LnRlc3QuZGUnXSwgJ2h0dHAnXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJy8vd3d3LnRlc3QuZGUnLCAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgIDAsICQuZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sLmxlbmd0aCAtIDEpXSxcbiAgICAgICAgICAgICAgICAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgIDAsICQuZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1snaHR0cDovL2EuZGUnXSwgJ2h0dHAnXSxcbiAgICAgICAgICAgIFtbJ2Z0cDovL2xvY2FsaG9zdCddLCAnZnRwJ10sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWydhJywgJC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2wuc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAwLCAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5sZW5ndGggLSAxKV0sXG4gICAgICAgICAgICAgICAgJC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2wuc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAwLCAkLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5sZW5ndGggLSAxKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICdhL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJyxcbiAgICAgICAgICAgICAgICAgICAgJC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2wuc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgMCwgJC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2wubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICQuZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgMCwgJC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2wubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbWycvYS9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCcsICdhJ10sICdhJ10sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWydhbHRlcm5hdGUubG9jYWwvYS9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCcsICdiJ10sXG4gICAgICAgICAgICAgICAgJ2InXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1snYWx0ZXJuYXRlLmxvY2FsLycsICdjJ10sICdjJ10sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnJywgJC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2wuc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgMCwgJC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2wubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICQuZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgMCwgJC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2wubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0dldFByb3RvY29sTmFtZSguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nR2V0VVJMVmFyaWFibGUgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGFzc2VydC5vayhBcnJheS5pc0FycmF5KCQuVG9vbHMuY2xhc3Muc3RyaW5nR2V0VVJMVmFyaWFibGUoKSkpXG4gICAgICAgIGFzc2VydC5vayhBcnJheS5pc0FycmF5KCQuVG9vbHMuY2xhc3Muc3RyaW5nR2V0VVJMVmFyaWFibGUobnVsbCwgJyYnKSkpXG4gICAgICAgIGFzc2VydC5vayhBcnJheS5pc0FycmF5KCQuVG9vbHMuY2xhc3Muc3RyaW5nR2V0VVJMVmFyaWFibGUobnVsbCwgJyMnKSkpXG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbJ25vdEV4aXN0aW5nJ10sIHVuZGVmaW5lZF0sXG4gICAgICAgICAgICBbWydub3RFeGlzdGluZycsICcmJ10sIHVuZGVmaW5lZF0sXG4gICAgICAgICAgICBbWydub3RFeGlzdGluZycsICcjJ10sIHVuZGVmaW5lZF0sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJz90ZXN0PTInXSwgJzInXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAndGVzdD0yJ10sICcyJ10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJ3Rlc3Q9MiZhPTInXSwgJzInXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnYj0zJnRlc3Q9MiZhPTInXSwgJzInXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnP2I9MyZ0ZXN0PTImYT0yJ10sICcyJ10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJz9iPTMmdGVzdD0yJmE9MiddLCAnMiddLFxuICAgICAgICAgICAgW1sndGVzdCcsICcmJywgJyQnLCAnIScsICcnLCAnIyR0ZXN0PTInXSwgJzInXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnJicsICckJywgJyEnLCAnP3Rlc3Q9NCcsICcjJHRlc3Q9MyddLCAnNCddLFxuICAgICAgICAgICAgW1snYScsICcmJywgJyQnLCAnIScsICc/dGVzdD00JywgJyMkdGVzdD0zJ10sIHVuZGVmaW5lZF0sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJyMnLCAnJCcsICchJywgJz90ZXN0PTQnLCAnIyR0ZXN0PTMnXSwgJzMnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnIycsICckJywgJyEnLCAnJywgJyMhdGVzdCMkdGVzdD00J10sICc0J10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJyMnLCAnJCcsICchJywgJycsICcjIS90ZXN0L2EjJHRlc3Q9NCddLCAnNCddLFxuICAgICAgICAgICAgW1sndGVzdCcsICcjJywgJyQnLCAnIScsICcnLCAnIyEvdGVzdC9hLyMkdGVzdD00J10sICc0J10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJyMnLCAnJCcsICchJywgJycsICcjIXRlc3QvYS8jJHRlc3Q9NCddLCAnNCddLFxuICAgICAgICAgICAgW1sndGVzdCcsICcjJywgJyQnLCAnIScsICcnLCAnIyEvIyR0ZXN0PTQnXSwgJzQnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnIycsICckJywgJyEnLCAnJywgJyMhdGVzdD90ZXN0PTMjJHRlc3Q9NCddLCAnNCddLFxuICAgICAgICAgICAgW1sndGVzdCcsICcmJywgJz8nLCAnIScsIG51bGwsICcjIWE/dGVzdD0zJ10sICczJ10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJyYnLCAnJCcsICchJywgbnVsbCwgJyMhdGVzdCMkdGVzdD00J10sICc0J10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJyYnLCAnJCcsICchJywgbnVsbCwgJyMhdGVzdD90ZXN0PTMjJHRlc3Q9NCddLCAnNCddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5zdHJpbmdHZXRVUkxWYXJpYWJsZSguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nSXNJbnRlcm5hbFVSTCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICdodHRwczovL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJyxcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly93d3cudGVzdC5kZS9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJy8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICcvL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBgJHskLmdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbH0vL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZWAgK1xuICAgICAgICAgICAgICAgICAgICAnP3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgIGAkeyQuZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sfS8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlYCArXG4gICAgICAgICAgICAgICAgICAgIGA/cGFyYW09dmFsdWUjaGFzaGBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vd3d3LnRlc3QuZGU6NDQzL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJyxcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly93d3cudGVzdC5kZS9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJy8vd3d3LnRlc3QuZGU6ODAvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnLFxuICAgICAgICAgICAgICAgICcvL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFskLmdsb2JhbC5sb2NhdGlvbi5ocmVmLCAkLmdsb2JhbC5sb2NhdGlvbi5ocmVmXSxcbiAgICAgICAgICAgIFsnMScsICQuZ2xvYmFsLmxvY2F0aW9uLmhyZWZdLFxuICAgICAgICAgICAgWycjMScsICQuZ2xvYmFsLmxvY2F0aW9uLmhyZWZdLFxuICAgICAgICAgICAgWycvYScsICQuZ2xvYmFsLmxvY2F0aW9uLmhyZWZdXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5zdHJpbmdJc0ludGVybmFsVVJMKC4uLnRlc3QpKVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgYCR7JC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2x9Ly93d3cudGVzdC5kZS9zaXRlL3N1YlNpdGVgICtcbiAgICAgICAgICAgICAgICAgICAgJz9wYXJhbT12YWx1ZSNoYXNoJyxcbiAgICAgICAgICAgICAgICAnZnRwOi8vd3d3LnRlc3QuZGUvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICdodHRwczovL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJyxcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy50ZXN0LmRlL3NpdGUvc3ViU2l0ZT9wYXJhbT12YWx1ZSNoYXNoJyxcbiAgICAgICAgICAgICAgICAndGVzdC5kZS9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgYCR7JC5nbG9iYWwubG9jYXRpb24ucHJvdG9jb2x9Ly93d3cudGVzdC5kZTpgICtcbiAgICAgICAgICAgICAgICBgJHskLmdsb2JhbC5sb2NhdGlvbi5wb3J0fS9zaXRlL3N1YlNpdGVgICtcbiAgICAgICAgICAgICAgICAnP3BhcmFtPXZhbHVlI2hhc2gvc2l0ZS9zdWJTaXRlP3BhcmFtPXZhbHVlI2hhc2gnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIGBodHRwOi8vd3d3LnRlc3QuZGU6JHskLmdsb2JhbC5sb2NhdGlvbi5wb3J0fS9zaXRlL3N1YlNpdGU/YCArXG4gICAgICAgICAgICAgICAgICAgICdwYXJhbT12YWx1ZSNoYXNoJyxcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly93d3cudGVzdC5kZS9zaXRlL3N1YlNpdGU/cGFyYW09dmFsdWUjaGFzaCdcbiAgICAgICAgICAgIF1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5ub3RPaygkLlRvb2xzLmNsYXNzLnN0cmluZ0lzSW50ZXJuYWxVUkwoLi4udGVzdCkpXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ05vcm1hbGl6ZVVSTCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgWyd3d3cudGVzdC5jb20nLCAnaHR0cDovL3d3dy50ZXN0LmNvbSddLFxuICAgICAgICAgICAgWyd0ZXN0JywgJ2h0dHA6Ly90ZXN0J10sXG4gICAgICAgICAgICBbJ2h0dHA6Ly90ZXN0JywgJ2h0dHA6Ly90ZXN0J10sXG4gICAgICAgICAgICBbJ2h0dHBzOi8vdGVzdCcsICdodHRwczovL3Rlc3QnXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nTm9ybWFsaXplVVJMKHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdSZXByZXNlbnRVUkwgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFsnaHR0cDovL3d3dy50ZXN0LmNvbScsICd3d3cudGVzdC5jb20nXSxcbiAgICAgICAgICAgIFsnZnRwOi8vd3d3LnRlc3QuY29tJywgJ2Z0cDovL3d3dy50ZXN0LmNvbSddLFxuICAgICAgICAgICAgWydodHRwczovL3d3dy50ZXN0LmNvbScsICd3d3cudGVzdC5jb20nXSxcbiAgICAgICAgICAgIFt1bmRlZmluZWQsICcnXSxcbiAgICAgICAgICAgIFtudWxsLCAnJ10sXG4gICAgICAgICAgICBbZmFsc2UsICcnXSxcbiAgICAgICAgICAgIFt0cnVlLCAnJ10sXG4gICAgICAgICAgICBbJycsICcnXSxcbiAgICAgICAgICAgIFsnICcsICcnXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nUmVwcmVzZW50VVJMKHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgLy8gLy8vIGVuZHJlZ2lvblxuICAgIHRoaXMudGVzdChgc3RyaW5nQ29tcHJlc3NTdHlsZVZhbHVlICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgWycnLCAnJ10sXG4gICAgICAgICAgICBbJyBib3JkZXI6IDFweCAgc29saWQgcmVkOycsICdib3JkZXI6MXB4IHNvbGlkIHJlZCddLFxuICAgICAgICAgICAgWydib3JkZXIgOiAxcHggc29saWQgcmVkICcsICdib3JkZXI6MXB4IHNvbGlkIHJlZCddLFxuICAgICAgICAgICAgWydib3JkZXIgOiAxcHggIHNvbGlkIHJlZCA7JywgJ2JvcmRlcjoxcHggc29saWQgcmVkJ10sXG4gICAgICAgICAgICBbJ2JvcmRlciA6IDFweCAgc29saWQgcmVkICAgOyAnLCAnYm9yZGVyOjFweCBzb2xpZCByZWQnXSxcbiAgICAgICAgICAgIFsnaGVpZ2h0OiAxcHggOyB3aWR0aDoycHggOyAnLCAnaGVpZ2h0OjFweDt3aWR0aDoycHgnXSxcbiAgICAgICAgICAgIFsnOztoZWlnaHQ6IDFweCA7IHdpZHRoOjJweCA7IDsnLCAnaGVpZ2h0OjFweDt3aWR0aDoycHgnXSxcbiAgICAgICAgICAgIFsnIDs7aGVpZ2h0OiAxcHggOyB3aWR0aDoycHggOyA7JywgJ2hlaWdodDoxcHg7d2lkdGg6MnB4J10sXG4gICAgICAgICAgICBbJztoZWlnaHQ6IDFweCA7IHdpZHRoOjJweCA7ICcsICdoZWlnaHQ6MXB4O3dpZHRoOjJweCddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5zdHJpbmdDb21wcmVzc1N0eWxlVmFsdWUodGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ0NhbWVsQ2FzZVRvRGVsaW1pdGVkICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1snaGFuc1BldGVyJ10sICdoYW5zLXBldGVyJ10sXG4gICAgICAgICAgICBbWydoYW5zUGV0ZXInLCAnfCddLCAnaGFuc3xwZXRlciddLFxuICAgICAgICAgICAgW1snJ10sICcnXSxcbiAgICAgICAgICAgIFtbJ2gnXSwgJ2gnXSxcbiAgICAgICAgICAgIFtbJ2hQJywgJyddLCAnaHAnXSxcbiAgICAgICAgICAgIFtbJ2hhbnNQZXRlciddLCAnaGFucy1wZXRlciddLFxuICAgICAgICAgICAgW1snaGFucy1wZXRlciddLCAnaGFucy1wZXRlciddLFxuICAgICAgICAgICAgW1snaGFuc1BldGVyJywgJ18nXSwgJ2hhbnNfcGV0ZXInXSxcbiAgICAgICAgICAgIFtbJ2hhbnNQZXRlcicsICcrJ10sICdoYW5zK3BldGVyJ10sXG4gICAgICAgICAgICBbWydIYW5zJ10sICdoYW5zJ10sXG4gICAgICAgICAgICBbWydoYW5zQVBJVVJMJywgJy0nLCBbJ2FwaScsICd1cmwnXV0sICdoYW5zLWFwaS11cmwnXSxcbiAgICAgICAgICAgIFtbJ2hhbnNQZXRlcicsICctJywgW11dLCAnaGFucy1wZXRlciddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5zdHJpbmdDYW1lbENhc2VUb0RlbGltaXRlZCguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nQ2FwaXRhbGl6ZSAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgWydoYW5zUGV0ZXInLCAnSGFuc1BldGVyJ10sXG4gICAgICAgICAgICBbJycsICcnXSxcbiAgICAgICAgICAgIFsnYScsICdBJ10sXG4gICAgICAgICAgICBbJ0EnLCAnQSddLFxuICAgICAgICAgICAgWydBQScsICdBQSddLFxuICAgICAgICAgICAgWydBYScsICdBYSddLFxuICAgICAgICAgICAgWydhYScsICdBYSddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5zdHJpbmdDYXBpdGFsaXplKHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdEZWxpbWl0ZWRUb0NhbWVsQ2FzZSAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbJ2hhbnMtcGV0ZXInXSwgJ2hhbnNQZXRlciddLFxuICAgICAgICAgICAgW1snaGFuc3xwZXRlcicsICd8J10sICdoYW5zUGV0ZXInXSxcbiAgICAgICAgICAgIFtbJyddLCAnJ10sXG4gICAgICAgICAgICBbWydoJ10sICdoJ10sXG4gICAgICAgICAgICBbWydoYW5zLXBldGVyJ10sICdoYW5zUGV0ZXInXSxcbiAgICAgICAgICAgIFtbJ2hhbnMtLXBldGVyJ10sICdoYW5zLVBldGVyJ10sXG4gICAgICAgICAgICBbWydIYW5zLVBldGVyJ10sICdIYW5zUGV0ZXInXSxcbiAgICAgICAgICAgIFtbJy1IYW5zLVBldGVyJ10sICctSGFuc1BldGVyJ10sXG4gICAgICAgICAgICBbWyctJ10sICctJ10sXG4gICAgICAgICAgICBbWydoYW5zLXBldGVyJywgJ18nXSwgJ2hhbnMtcGV0ZXInXSxcbiAgICAgICAgICAgIFtbJ2hhbnNfcGV0ZXInLCAnXyddLCAnaGFuc1BldGVyJ10sXG4gICAgICAgICAgICBbWydoYW5zX2lkJywgJ18nXSwgJ2hhbnNJRCddLFxuICAgICAgICAgICAgW1sndXJsX2hhbnNfaWQnLCAnXycsIFsnaGFucyddXSwgJ3VybEhBTlNJZCddLFxuICAgICAgICAgICAgW1sndXJsX2hhbnNfMScsICdfJ10sICd1cmxIYW5zMSddLFxuICAgICAgICAgICAgW1snaGFuc1VybDEnLCAnLScsIFsndXJsJ10sIHRydWVdLCAnaGFuc1VybDEnXSxcbiAgICAgICAgICAgIFtbJ2hhbnMtdXJsJywgJy0nLCBbJ3VybCddLCB0cnVlXSwgJ2hhbnNVUkwnXSxcbiAgICAgICAgICAgIFtbJ2hhbnMtVXJsJywgJy0nLCBbJ3VybCddLCB0cnVlXSwgJ2hhbnNVcmwnXSxcbiAgICAgICAgICAgIFtbJ2hhbnMtVXJsJywgJy0nLCBbJ3VybCddLCBmYWxzZV0sICdoYW5zVVJMJ10sXG4gICAgICAgICAgICBbWydoYW5zLVVybCcsICctJywgW10sIGZhbHNlXSwgJ2hhbnNVcmwnXSxcbiAgICAgICAgICAgIFtbJ2hhbnMtLVVybCcsICctJywgW10sIGZhbHNlLCB0cnVlXSwgJ2hhbnNVcmwnXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3Muc3RyaW5nRGVsaW1pdGVkVG9DYW1lbENhc2UoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ0Zvcm1hdCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1snezF9JywgJ3Rlc3QnXSwgJ3Rlc3QnXSxcbiAgICAgICAgICAgIFtbJycsICd0ZXN0J10sICcnXSxcbiAgICAgICAgICAgIFtbJ3sxfSddLCAnezF9J10sXG4gICAgICAgICAgICBbWyd7MX0gdGVzdCB7Mn0gLSB7Mn0nLCAxLCAyXSwgJzEgdGVzdCAyIC0gMiddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5zdHJpbmdGb3JtYXQoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoYHN0cmluZ0dldFJlZ3VsYXJFeHByZXNzaW9uVmFsaWRhdGVkICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW2B0aGF0J3Mgbm8gcmVnZXg6IC4qJGAsIGB0aGF0J3Mgbm8gcmVnZXg6IFxcXFwuXFxcXCpcXFxcJGBdLFxuICAgICAgICAgICAgWycnLCAnJ10sXG4gICAgICAgICAgICBbJy1bXSgpXiQqKy59LVxcXFwnLCAnXFxcXC1cXFxcW1xcXFxdXFxcXChcXFxcKVxcXFxeXFxcXCRcXFxcKlxcXFwrXFxcXC5cXFxcfVxcXFwtXFxcXFxcXFwnXSxcbiAgICAgICAgICAgIFsnLScsICdcXFxcLSddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5zdHJpbmdHZXRSZWd1bGFyRXhwcmVzc2lvblZhbGlkYXRlZCh0ZXN0WzBdKSxcbiAgICAgICAgICAgICAgICB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdMb3dlckNhc2UgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFsnSGFuc1BldGVyJywgJ2hhbnNQZXRlciddLFxuICAgICAgICAgICAgWycnLCAnJ10sXG4gICAgICAgICAgICBbJ0EnLCAnYSddLFxuICAgICAgICAgICAgWydhJywgJ2EnXSxcbiAgICAgICAgICAgIFsnYWEnLCAnYWEnXSxcbiAgICAgICAgICAgIFsnQWEnLCAnYWEnXSxcbiAgICAgICAgICAgIFsnYWEnLCAnYWEnXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3Muc3RyaW5nTG93ZXJDYXNlKHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdGaW5kTm9ybWFsaXplZE1hdGNoUmFuZ2UgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbWycnLCAnJ10sIG51bGxdLFxuICAgICAgICAgICAgW1snaGFucycsICcnXSwgbnVsbF0sXG4gICAgICAgICAgICBbWydoYW5zJywgJ2EnXSwgWzEsIDJdXSxcbiAgICAgICAgICAgIFtbJ2hhbnMnLCAnYW4nXSwgWzEsIDNdXSxcbiAgICAgICAgICAgIFtbJ2hhbnMnLCAnaGFuJ10sIFswLCAzXV0sXG4gICAgICAgICAgICBbWydoYW5zJywgJ2hhbnMnXSwgWzAsIDRdXSxcbiAgICAgICAgICAgIFtbJ2hhbnMnLCAnYW5zJ10sIFsxLCA0XV0sXG4gICAgICAgICAgICBbWydoYW5zIGhhbnMnLCAnYW5zJ10sIFsxLCA0XV0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWycgaEFucyAnLCAnYW5zJywgKHZhbHVlOmFueSk6c3RyaW5nID0+IHZhbHVlLnRvTG93ZXJDYXNlKCldLFxuICAgICAgICAgICAgICAgIFsyLCA1XVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJ2Egc3RyYcOfZSBiJywgJ3N0cmFzc2UnLCAodmFsdWU6YW55KTpzdHJpbmcgPT5cbiAgICAgICAgICAgICAgICAgICAgdmFsdWUucmVwbGFjZSgvw58vZywgJ3NzJykudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgWzIsIDhdXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFsnYSBzdHJhc3NlIGInLCAnc3RyYXNzZScsICh2YWx1ZTphbnkpOnN0cmluZyA9PlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5yZXBsYWNlKC/Dny9nLCAnc3MnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbMiwgOV1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWydhIHN0cmFzc2UgYicsICdzdHJhw59lJywgKHZhbHVlOmFueSk6c3RyaW5nID0+XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnJlcGxhY2UoL8OfL2csICdzcycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFsyLCA5XVxuICAgICAgICAgICAgXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCgkLlRvb2xzLmNsYXNzLnN0cmluZ0ZpbmROb3JtYWxpemVkTWF0Y2hSYW5nZShcbiAgICAgICAgICAgICAgICAuLi50ZXN0WzBdXG4gICAgICAgICAgICApLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdNYXJrICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbWycnXSwgJyddLFxuICAgICAgICAgICAgW1sndGVzdCcsICdlJ10sICd0PHNwYW4gY2xhc3M9XCJ0b29scy1tYXJrXCI+ZTwvc3Bhbj5zdCddLFxuICAgICAgICAgICAgW1sndGVzdCcsICdlcyddLCAndDxzcGFuIGNsYXNzPVwidG9vbHMtbWFya1wiPmVzPC9zcGFuPnQnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAndGVzdCddLCAnPHNwYW4gY2xhc3M9XCJ0b29scy1tYXJrXCI+dGVzdDwvc3Bhbj4nXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnJ10sICd0ZXN0J10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJ3Rlc3RzJ10sICd0ZXN0J10sXG4gICAgICAgICAgICBbWycnLCAndGVzdCddLCAnJ10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJ2UnLCAnPGE+ezF9PC9hPiddLCAndDxhPmU8L2E+c3QnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCBbJ2UnXSwgJzxhPnsxfTwvYT4nXSwgJ3Q8YT5lPC9hPnN0J10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgJ0UnLCAnPGE+ezF9PC9hPiddLCAndDxhPmU8L2E+c3QnXSxcbiAgICAgICAgICAgIFtbJ3Rlc3QnLCAnRScsICc8YT57MX08L2E+J10sICd0PGE+ZTwvYT5zdCddLFxuICAgICAgICAgICAgW1sndGVzVCcsICd0JywgJzxhPnsxfTwvYT4nXSwgJzxhPnQ8L2E+ZXM8YT5UPC9hPiddLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFsndGVzVCcsICd0JywgJzxhPnsxfSAtIHsxfTwvYT4nXSxcbiAgICAgICAgICAgICAgICAnPGE+dCAtIHQ8L2E+ZXM8YT5UIC0gVDwvYT4nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFsndGVzdCcsICdFJywgJzxhPnsxfTwvYT4nLCAodmFsdWU6YW55KTpzdHJpbmcgPT4gYCR7dmFsdWV9YF0sXG4gICAgICAgICAgICAgICAgJ3Rlc3QnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFsnYWJjZCcsIFsnYScsICdjJ11dLFxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInRvb2xzLW1hcmtcIj5hPC9zcGFuPmInICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ0b29scy1tYXJrXCI+Yzwvc3Bhbj5kJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJ2FhYmNkJywgWydhJywgJ2MnXV0sXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwidG9vbHMtbWFya1wiPmE8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwidG9vbHMtbWFya1wiPmE8L3NwYW4+YicgK1xuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInRvb2xzLW1hcmtcIj5jPC9zcGFuPmQnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFsnYWNiY2QnLCBbJ2EnLCAnYycsICdkJ11dLFxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInRvb2xzLW1hcmtcIj5hPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInRvb2xzLW1hcmtcIj5jPC9zcGFuPmInICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ0b29scy1tYXJrXCI+Yzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ0b29scy1tYXJrXCI+ZDwvc3Bhbj4nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFsnYSBFQmlrZXMgTcO8bmNoZW4nLCBbJ2ViaWtlcycsICdtw7xuY2hlbiddLCAnPGE+ezF9PC9hPicsIChcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6YW55XG4gICAgICAgICAgICAgICAgKTpzdHJpbmcgPT4gYCR7dmFsdWV9YC50b0xvd2VyQ2FzZSgpXSxcbiAgICAgICAgICAgICAgICAnYSA8YT5FQmlrZXM8L2E+IDxhPk3DvG5jaGVuPC9hPidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWydhIEUtQmlrZXMgTcO8bmNoZW4nLCBbJ2ViaWtlcycsICdtw7xuY2hlbiddLCAnPGE+ezF9PC9hPicsIChcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6YW55XG4gICAgICAgICAgICAgICAgKTpzdHJpbmcgPT4gYCR7dmFsdWV9YC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJy0nLCAnJyldLFxuICAgICAgICAgICAgICAgICdhIDxhPkUtQmlrZXM8L2E+IDxhPk3DvG5jaGVuPC9hPidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWydhIHN0ci4gMicsIFsnc3RyYcOfZScsICcyJ10sICc8YT57MX08L2E+JywgKFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTphbnlcbiAgICAgICAgICAgICAgICApOnN0cmluZyA9PiBgJHt2YWx1ZX1gLnRvTG93ZXJDYXNlKCkucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgJ3N0ci4nLCAnc3RyYXNzZSdcbiAgICAgICAgICAgICAgICApLnJlcGxhY2UoJ8OfJywgJ3NzJyldLFxuICAgICAgICAgICAgICAgICdhIDxhPnN0ci48L2E+IDxhPjI8L2E+J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICdFR08gTW92ZW1lbnQgU3RvcmUgRS1CaWtlcyBNw7xuY2hlbicsXG4gICAgICAgICAgICAgICAgICAgIFsnZUJpa2VzJywgJ03DvG5jaGVuJ10sXG4gICAgICAgICAgICAgICAgICAgICc8YT57MX08L2E+JywgKHZhbHVlOmFueSk6c3RyaW5nID0+IGAke3ZhbHVlfWAudG9Mb3dlckNhc2UoXG4gICAgICAgICAgICAgICAgICAgICkucmVwbGFjZSgvWy1fXSsvZywgJycpLnJlcGxhY2UoL8OfL2csICdzcycpLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAvKF58IClzdHJcXC4vZywgJyQxc3RyYXNzZSdcbiAgICAgICAgICAgICAgICAgICAgKS5yZXBsYWNlKC9bJiBdKy9nLCAnICcpXG4gICAgICAgICAgICAgICAgXSwgJ0VHTyBNb3ZlbWVudCBTdG9yZSA8YT5FLUJpa2VzPC9hPiA8YT5Nw7xuY2hlbjwvYT4nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJ3N0ci5BIHN0cmFzc2UgQiBzdHJhw59lIEMgc3RyLiBEJywgWydzdHIuJ10sXG4gICAgICAgICAgICAgICAgICAgICc8YT57MX08L2E+JywgKHZhbHVlOmFueSk6c3RyaW5nID0+IGAke3ZhbHVlfWAudG9Mb3dlckNhc2UoXG4gICAgICAgICAgICAgICAgICAgICkucmVwbGFjZSgvWy1fXSsvZywgJycpLnJlcGxhY2UoL8OfL2csICdzcycpLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAvKF58IClzdHJcXC4vZywgJyQxc3RyYXNzZSdcbiAgICAgICAgICAgICAgICAgICAgKS5yZXBsYWNlKC9bJiBdKy9nLCAnICcpXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAnPGE+c3RyLjwvYT5BIDxhPnN0cmFzc2U8L2E+IEIgPGE+c3RyYcOfZTwvYT4gQyA8YT5zdHIuPC9hPiBEJ1xuICAgICAgICAgICAgXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3Muc3RyaW5nTWFyayguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nTUQ1ICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbWycnXSwgJ2Q0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlJ10sXG4gICAgICAgICAgICBbWyd0ZXN0J10sICcwOThmNmJjZDQ2MjFkMzczY2FkZTRlODMyNjI3YjRmNiddLFxuICAgICAgICAgICAgW1snw6QnXSwgJzg0MTliNzFjODdhMjI1YTJjNzBiNTA0ODZmYmVlNTQ1J10sXG4gICAgICAgICAgICBbWyd0ZXN0JywgdHJ1ZV0sICcwOThmNmJjZDQ2MjFkMzczY2FkZTRlODMyNjI3YjRmNiddLFxuICAgICAgICAgICAgW1snw6QnLCB0cnVlXSwgJ2MxNWJjYzU1NzdmOWZhZGU0YjRhMzI1NjE5MGE1OWIwJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkLlRvb2xzLmNsYXNzLnN0cmluZ01ENSguLi50ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nTm9ybWFsaXplUGhvbmVOdW1iZXIgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbJzAnLCAnMCddLFxuICAgICAgICAgICAgWzAsICcwJ10sXG4gICAgICAgICAgICBbJys0OSAxNzIgKDApIC8gMDIxMiAtIDMnLCAnMDA0OTE3MjAwMjEyMyddXG4gICAgICAgIF0pXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5zdHJpbmdOb3JtYWxpemVQaG9uZU51bWJlcih0ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIGlmIChUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ25vZGUnKVxuICAgICAgICB0aGlzLnRlc3QoJ3N0cmluZ1BhcnNlRW5jb2RlZE9iamVjdCcsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgICAgICBbWycnXSwgbnVsbF0sXG4gICAgICAgICAgICAgICAgW1snbnVsbCddLCBudWxsXSxcbiAgICAgICAgICAgICAgICBbWyd7YTogdW5kZWZpbmVkfSddLCB7YTogdW5kZWZpbmVkfV0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBbbmV3IEJ1ZmZlcigne2E6IHVuZGVmaW5lZH0nKS50b1N0cmluZygnYmFzZTY0JyldLFxuICAgICAgICAgICAgICAgICAgICB7YTogdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1sne2E6IDJ9J10sIHthOiAyfV0sXG4gICAgICAgICAgICAgICAgW1tuZXcgQnVmZmVyKCd7YTogMX0nKS50b1N0cmluZygnYmFzZTY0JyldLCB7YTogMX1dLFxuICAgICAgICAgICAgICAgIFtbJ251bGwnXSwgbnVsbF0sXG4gICAgICAgICAgICAgICAgW1tuZXcgQnVmZmVyKCdudWxsJykudG9TdHJpbmcoJ2Jhc2U2NCcpXSwgbnVsbF0sXG4gICAgICAgICAgICAgICAgW1sne30nXSwge31dLFxuICAgICAgICAgICAgICAgIFtbbmV3IEJ1ZmZlcigne30nKS50b1N0cmluZygnYmFzZTY0JyldLCB7fV0sXG4gICAgICAgICAgICAgICAgW1sne2E6IGF9J10sIG51bGxdLFxuICAgICAgICAgICAgICAgIFtbbmV3IEJ1ZmZlcigne2E6IGF9JykudG9TdHJpbmcoJ2Jhc2U2NCcpXSwgbnVsbF0sXG4gICAgICAgICAgICAgICAgW1sne2E6IHNjb3BlLmF9Jywge2E6IDJ9XSwge2E6IDJ9XSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIFtuZXcgQnVmZmVyKCd7YTogc2NvcGUuYX0nKS50b1N0cmluZygnYmFzZTY0JyksIHthOiAyfV0sXG4gICAgICAgICAgICAgICAgICAgIHthOiAyfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICAgICAgICAgICAgJC5Ub29scy5jbGFzcy5zdHJpbmdQYXJzZUVuY29kZWRPYmplY3QoLi4udGVzdFswXSksIHRlc3RbMV1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdSZXByZXNlbnRQaG9uZU51bWJlciAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFsnMCcsICcwJ10sXG4gICAgICAgICAgICBbJzAxNzItMTIzMjEtMScsICcrNDkgKDApIDE3MiAvIDEyMyAyMS0xJ10sXG4gICAgICAgICAgICBbJzAxNzItMTIzMjExJywgJys0OSAoMCkgMTcyIC8gMTIgMzIgMTEnXSxcbiAgICAgICAgICAgIFsnMDE3Mi0xMjMyMTExJywgJys0OSAoMCkgMTcyIC8gMTIzIDIxIDExJ10sXG4gICAgICAgICAgICBbdW5kZWZpbmVkLCAnJ10sXG4gICAgICAgICAgICBbbnVsbCwgJyddLFxuICAgICAgICAgICAgW2ZhbHNlLCAnJ10sXG4gICAgICAgICAgICBbdHJ1ZSwgJyddLFxuICAgICAgICAgICAgWycnLCAnJ10sXG4gICAgICAgICAgICBbJyAnLCAnJ11cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ1JlcHJlc2VudFBob25lTnVtYmVyKHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBzdHJpbmdEZWNvZGVIVE1MRW50aXRpZXMgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgIGFzc2VydDpPYmplY3RcbiAgICApOnZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8c3RyaW5nPiBvZiBbXG4gICAgICAgICAgICBbJycsICcnXSxcbiAgICAgICAgICAgIFsnPGRpdj48L2Rpdj4nLCAnPGRpdj48L2Rpdj4nXSxcbiAgICAgICAgICAgIFsnPGRpdj4mYW1wOzwvZGl2PicsICc8ZGl2PiY8L2Rpdj4nXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnPGRpdj4mYW1wOyZhdW1sOyZBdW1sOyZ1dW1sOyZVdW1sOyZvdW1sOyZPdW1sOzwvZGl2PicsXG4gICAgICAgICAgICAgICAgJzxkaXY+JsOkw4TDvMOcw7bDljwvZGl2PidcbiAgICAgICAgICAgIF1cbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChcbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLnN0cmluZ0RlY29kZUhUTUxFbnRpdGllcyh0ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICB9KVxuICAgIHRoaXMudGVzdChgc3RyaW5nTm9ybWFsaXplRG9tTm9kZVNlbGVjdG9yICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgKTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PHN0cmluZz4gb2YgW1xuICAgICAgICAgICAgWydkaXYnLCAnYm9keSBkaXYnXSxcbiAgICAgICAgICAgIFsnZGl2IHAnLCAnYm9keSBkaXYgcCddLFxuICAgICAgICAgICAgWydib2R5IGRpdicsICdib2R5IGRpdiddLFxuICAgICAgICAgICAgWydib2R5IGRpdiBwJywgJ2JvZHkgZGl2IHAnXSxcbiAgICAgICAgICAgIFsnJywgJ2JvZHknXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgIHRvb2xzLnN0cmluZ05vcm1hbGl6ZURvbU5vZGVTZWxlY3Rvcih0ZXN0WzBdKSwgdGVzdFsxXSlcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OnN0cmluZyBvZiBbXG4gICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgJ2RpdiwgcCdcbiAgICAgICAgXSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgkLlRvb2xzKHtcbiAgICAgICAgICAgICAgICBkb21Ob2RlU2VsZWN0b3JQcmVmaXg6ICcnXG4gICAgICAgICAgICB9KS5zdHJpbmdOb3JtYWxpemVEb21Ob2RlU2VsZWN0b3IodGVzdCksIHRlc3QpXG4gICAgfSlcbiAgICAvLyAvLyBlbmRyZWdpb25cbiAgICAvLyAvLyByZWdpb24gbnVtYmVyXG4gICAgdGhpcy50ZXN0KGBudW1iZXJHZXRVVENUaW1lc3RhbXAgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtbbmV3IERhdGUoMCldLCAwXSxcbiAgICAgICAgICAgIFtbbmV3IERhdGUoMSldLCAwLjAwMV0sXG4gICAgICAgICAgICBbW25ldyBEYXRlKDApLCB0cnVlXSwgMF0sXG4gICAgICAgICAgICBbW25ldyBEYXRlKDEwMDApLCBmYWxzZV0sIDFdLFxuICAgICAgICAgICAgW1tuZXcgRGF0ZSgxMDAwKSwgdHJ1ZV0sIDEwMDBdLFxuICAgICAgICAgICAgW1tuZXcgRGF0ZSgwKSwgZmFsc2VdLCAwXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3MubnVtYmVyR2V0VVRDVGltZXN0YW1wKC4uLnRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBudW1iZXJJc05vdEFOdW1iZXIgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgIFtOYU4sIHRydWVdLFxuICAgICAgICAgICAgW3t9LCBmYWxzZV0sXG4gICAgICAgICAgICBbdW5kZWZpbmVkLCBmYWxzZV0sXG4gICAgICAgICAgICBbbmV3IERhdGUoKS50b1N0cmluZygpLCBmYWxzZV0sXG4gICAgICAgICAgICBbbnVsbCwgZmFsc2VdLFxuICAgICAgICAgICAgW2ZhbHNlLCBmYWxzZV0sXG4gICAgICAgICAgICBbdHJ1ZSwgZmFsc2VdLFxuICAgICAgICAgICAgWzAsIGZhbHNlXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3MubnVtYmVySXNOb3RBTnVtYmVyKHRlc3RbMF0pLCB0ZXN0WzFdKVxuICAgIH0pXG4gICAgdGhpcy50ZXN0KGBudW1iZXJSb3VuZCAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB0ZXN0OkFycmF5PGFueT4gb2YgW1xuICAgICAgICAgICAgW1sxLjUsIDBdLCAyXSxcbiAgICAgICAgICAgIFtbMS40LCAwXSwgMV0sXG4gICAgICAgICAgICBbWzEuNCwgLTFdLCAwXSxcbiAgICAgICAgICAgIFtbMTAwMCwgLTJdLCAxMDAwXSxcbiAgICAgICAgICAgIFtbOTk5LCAtMl0sIDEwMDBdLFxuICAgICAgICAgICAgW1s5NTAsIC0yXSwgMTAwMF0sXG4gICAgICAgICAgICBbWzk0OSwgLTJdLCA5MDBdLFxuICAgICAgICAgICAgW1sxLjIzNDVdLCAxXSxcbiAgICAgICAgICAgIFtbMS4yMzQ1LCAyXSwgMS4yM10sXG4gICAgICAgICAgICBbWzEuMjM0NSwgM10sIDEuMjM1XSxcbiAgICAgICAgICAgIFtbMS4yMzQ1LCA0XSwgMS4yMzQ1XSxcbiAgICAgICAgICAgIFtbNjk5LCAtMl0sIDcwMF0sXG4gICAgICAgICAgICBbWzY1MCwgLTJdLCA3MDBdLFxuICAgICAgICAgICAgW1s2NDksIC0yXSwgNjAwXVxuICAgICAgICBdKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKCQuVG9vbHMuY2xhc3MubnVtYmVyUm91bmQoLi4udGVzdFswXSksIHRlc3RbMV0pXG4gICAgfSlcbiAgICAvLyAvLyBlbmRyZWdpb25cbiAgICAvLyAvLyByZWdpb24gZGF0YSB0cmFuc2ZlclxuICAgIHRoaXMudGVzdCgnY2hlY2tSZWFjaGFiaWxpdHknLCBhc3luYyAoYXNzZXJ0Ok9iamVjdCk6UHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGNvbnN0IGRvbmU6RnVuY3Rpb24gPSBhc3NlcnQuYXN5bmMoKVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbJ3Vua25vd25VUkwnLCBmYWxzZV0sXG4gICAgICAgICAgICBbJ3Vua25vd25VUkwnLCBmYWxzZSwgMzAxXSxcbiAgICAgICAgICAgIFsnaHR0cDovL3Vua25vd25Ib3N0TmFtZScsIHRydWUsIDIwMCwgMC4wMjVdLFxuICAgICAgICAgICAgWydodHRwOi8vdW5rbm93bkhvc3ROYW1lJywgdHJ1ZSwgWzIwMF0sIDAuMDI1XSxcbiAgICAgICAgICAgIFsnaHR0cDovL3Vua25vd25Ib3N0TmFtZScsIHRydWUsIFsyMDAsIDMwMV0sIDAuMDI1XVxuICAgICAgICBdKVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCAkLlRvb2xzLmNsYXNzLmNoZWNrUmVhY2hhYmlsaXR5KC4uLnRlc3QpXG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGZhbHNlKVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQub2sodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgZG9uZSgpXG4gICAgfSlcbiAgICB0aGlzLnRlc3QoJ2NoZWNrVW5yZWFjaGFiaWxpdHknLCBhc3luYyAoYXNzZXJ0Ok9iamVjdCk6UHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGNvbnN0IGRvbmU6RnVuY3Rpb24gPSBhc3NlcnQuYXN5bmMoKVxuICAgICAgICBmb3IgKGNvbnN0IHRlc3Q6QXJyYXk8YW55PiBvZiBbXG4gICAgICAgICAgICBbJ3Vua25vd25VUkwnLCBmYWxzZSwgMTAsIDAuMSwgMjAwXSxcbiAgICAgICAgICAgIFsndW5rbm93blVSTCcsIHRydWUsIDEwLCAwLjEsIDIwMF0sXG4gICAgICAgICAgICBbJ3Vua25vd25VUkwnLCB0cnVlLCAxMCwgMC4xLCBbMjAwXV0sXG4gICAgICAgICAgICBbJ3Vua25vd25VUkwnLCB0cnVlLCAxMCwgMC4xLCBbMjAwLCAzMDFdXSxcbiAgICAgICAgICAgIFsnaHR0cDovL3Vua25vd25Ib3N0TmFtZScsIHRydWVdXG4gICAgICAgIF0pXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0ICQuVG9vbHMuY2xhc3MuY2hlY2tVbnJlYWNoYWJpbGl0eSguLi50ZXN0KVxuICAgICAgICAgICAgICAgIGFzc2VydC5vayh0cnVlKVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQub2soZmFsc2UpXG4gICAgICAgICAgICB9XG4gICAgICAgIGRvbmUoKVxuICAgIH0pXG4gICAgaWYgKFxuICAgICAgICB0eXBlb2YgdGFyZ2V0VGVjaG5vbG9neSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdGFyZ2V0VGVjaG5vbG9neSA9PT0gJ3dlYicgJiYgcm91bmRUeXBlID09PSAnZnVsbCdcbiAgICApIHtcbiAgICAgICAgdGhpcy50ZXN0KGBzZW5kVG9JRnJhbWUgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpRnJhbWUgPSAkKCc8aWZyYW1lPicpLmhpZGUoKS5hdHRyKCduYW1lJywgJ3Rlc3QnKVxuICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZChpRnJhbWUpXG4gICAgICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5zZW5kVG9JRnJhbWUoXG4gICAgICAgICAgICAgICAgaUZyYW1lLCB3aW5kb3cuZG9jdW1lbnQuVVJMLCB7dGVzdDogNX0sICdnZXQnLCB0cnVlKSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy50ZXN0KGBzZW5kVG9FeHRlcm5hbFVSTCAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgICAgIGFzc2VydDpPYmplY3RcbiAgICAgICAgKTp2b2lkID0+IGFzc2VydC5vayh0b29scy5zZW5kVG9FeHRlcm5hbFVSTChcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5VUkwsIHt0ZXN0OiA1fSkpKVxuICAgIH1cbiAgICAvLyAvLyBlbmRyZWdpb25cbiAgICAvLyAvLyByZWdpb24gZmlsZVxuICAgIGlmIChUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ25vZGUnKSB7XG4gICAgICAgIHRoaXMudGVzdChgY29weURpcmVjdG9yeVJlY3Vyc2l2ZSAoJHtyb3VuZFR5cGV9KWAsIGFzeW5jIChcbiAgICAgICAgICAgIGFzc2VydDpPYmplY3RcbiAgICAgICAgKTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRvbmU6RnVuY3Rpb24gPSBhc3NlcnQuYXN5bmMoKVxuICAgICAgICAgICAgbGV0IHJlc3VsdDpzdHJpbmcgPSAnJ1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCAkLlRvb2xzLmNsYXNzLmNvcHlEaXJlY3RvcnlSZWN1cnNpdmUoXG4gICAgICAgICAgICAgICAgICAgICcuLycsICcuL3Rlc3QuY29tcGlsZWQnLCAoKTpudWxsID0+IG51bGwpXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhc3NlcnQub2socmVzdWx0LmVuZHNXaXRoKCcvdGVzdC5jb21waWxlZCcpKVxuICAgICAgICAgICAgcmVtb3ZlRGlyZWN0b3J5UmVjdXJzaXZlbHlTeW5jKCcuL3Rlc3QuY29tcGlsZWQnKVxuICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudGVzdChgY29weURpcmVjdG9yeVJlY3Vyc2l2ZVN5bmMgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgICAgICk6dm9pZCA9PiB7XG4gICAgICAgICAgICBhc3NlcnQub2soJC5Ub29scy5jbGFzcy5jb3B5RGlyZWN0b3J5UmVjdXJzaXZlU3luYyhcbiAgICAgICAgICAgICAgICAnLi8nLCAnLi9zeW5jdGVzdC5jb21waWxlZCcsICgpOm51bGwgPT4gbnVsbFxuICAgICAgICAgICAgKS5lbmRzV2l0aCgnL3N5bmN0ZXN0LmNvbXBpbGVkJykpXG4gICAgICAgICAgICByZW1vdmVEaXJlY3RvcnlSZWN1cnNpdmVseVN5bmMoJy4vc3luY3Rlc3QuY29tcGlsZWQnKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlc3QoYGNvcHlGaWxlICgke3JvdW5kVHlwZX0pYCwgYXN5bmMgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOlByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICAgICAgY29uc3QgZG9uZTpGdW5jdGlvbiA9IGFzc2VydC5hc3luYygpXG4gICAgICAgICAgICBsZXQgcmVzdWx0OnN0cmluZyA9ICcnXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0ICQuVG9vbHMuY2xhc3MuY29weUZpbGUoXG4gICAgICAgICAgICAgICAgICAgIHBhdGgucmVzb2x2ZSgnLi8nLCBwYXRoLmJhc2VuYW1lKF9fZmlsZW5hbWUpKSxcbiAgICAgICAgICAgICAgICAgICAgJy4vdGVzdC5jb21waWxlZC5qcycpXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhc3NlcnQub2socmVzdWx0LmVuZHNXaXRoKCcvdGVzdC5jb21waWxlZC5qcycpKVxuICAgICAgICAgICAgZmlsZVN5c3RlbS51bmxpbmtTeW5jKCcuL3Rlc3QuY29tcGlsZWQuanMnKVxuICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudGVzdChgY29weUZpbGVTeW5jICgke3JvdW5kVHlwZX0pYCwgKGFzc2VydDpPYmplY3QpOnZvaWQgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuY29weUZpbGVTeW5jKFxuICAgICAgICAgICAgICAgIHBhdGgucmVzb2x2ZSgnLi8nLCBwYXRoLmJhc2VuYW1lKF9fZmlsZW5hbWUpKSxcbiAgICAgICAgICAgICAgICAnLi9zeW5jdGVzdC5jb21waWxlZC5qcydcbiAgICAgICAgICAgICkuZW5kc1dpdGgoJy9zeW5jdGVzdC5jb21waWxlZC5qcycpKVxuICAgICAgICAgICAgZmlsZVN5c3RlbS51bmxpbmtTeW5jKCcuL3N5bmN0ZXN0LmNvbXBpbGVkLmpzJylcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy50ZXN0KGBpc0RpcmVjdG9yeSAoJHtyb3VuZFR5cGV9KWAsIGFzeW5jIChcbiAgICAgICAgICAgIGFzc2VydDpPYmplY3RcbiAgICAgICAgKTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRvbmU6RnVuY3Rpb24gPSBhc3NlcnQuYXN5bmMoKVxuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlUGF0aDpzdHJpbmcgb2YgWycuLycsICcuLi8nXSkge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6Ym9vbGVhblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0ICQuVG9vbHMuY2xhc3MuaXNEaXJlY3RvcnkoZmlsZVBhdGgpXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHJlc3VsdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZVBhdGg6c3RyaW5nIG9mIFtcbiAgICAgICAgICAgICAgICBwYXRoLnJlc29sdmUoJy4vJywgcGF0aC5iYXNlbmFtZShfX2ZpbGVuYW1lKSlcbiAgICAgICAgICAgIF0pIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OmJvb2xlYW5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCAkLlRvb2xzLmNsYXNzLmlzRGlyZWN0b3J5KGZpbGVQYXRoKVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFzc2VydC5ub3RPayhyZXN1bHQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb25lKClcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy50ZXN0KGBpc0RpcmVjdG9yeVN5bmMgKCR7cm91bmRUeXBlfSlgLCAoYXNzZXJ0Ok9iamVjdCk6dm9pZCA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGVQYXRoOnN0cmluZyBvZiBbJy4vJywgJy4uLyddKVxuICAgICAgICAgICAgICAgIGFzc2VydC5vaygkLlRvb2xzLmNsYXNzLmlzRGlyZWN0b3J5U3luYyhmaWxlUGF0aCkpXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGVQYXRoOnN0cmluZyBvZiBbXG4gICAgICAgICAgICAgICAgcGF0aC5yZXNvbHZlKCcuLycsIHBhdGguYmFzZW5hbWUoX19maWxlbmFtZSkpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIGFzc2VydC5ub3RPaygkLlRvb2xzLmNsYXNzLmlzRGlyZWN0b3J5U3luYyhmaWxlUGF0aCkpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudGVzdChgaXNGaWxlICgke3JvdW5kVHlwZX0pYCwgYXN5bmMgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOlByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICAgICAgY29uc3QgZG9uZTpGdW5jdGlvbiA9IGFzc2VydC5hc3luYygpXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGVQYXRoOnN0cmluZyBvZiBbXG4gICAgICAgICAgICAgICAgcGF0aC5yZXNvbHZlKCcuLycsIHBhdGguYmFzZW5hbWUoX19maWxlbmFtZSkpXG4gICAgICAgICAgICBdKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDpib29sZWFuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgJC5Ub29scy5jbGFzcy5pc0ZpbGUoZmlsZVBhdGgpXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHJlc3VsdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZVBhdGg6c3RyaW5nIG9mIFsnLi8nLCAnLi4vJ10pIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OmJvb2xlYW5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCAkLlRvb2xzLmNsYXNzLmlzRmlsZShmaWxlUGF0aClcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhc3NlcnQubm90T2socmVzdWx0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudGVzdChgaXNGaWxlU3luYyAoJHtyb3VuZFR5cGV9KWAsIChhc3NlcnQ6T2JqZWN0KTp2b2lkID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZVBhdGg6c3RyaW5nIG9mIFtcbiAgICAgICAgICAgICAgICBwYXRoLnJlc29sdmUoJy4vJywgcGF0aC5iYXNlbmFtZShfX2ZpbGVuYW1lKSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKCQuVG9vbHMuY2xhc3MuaXNGaWxlU3luYyhmaWxlUGF0aCkpXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGVQYXRoOnN0cmluZyBvZiBbJy4vJywgJy4uLyddKVxuICAgICAgICAgICAgICAgIGFzc2VydC5ub3RPaygkLlRvb2xzLmNsYXNzLmlzRmlsZVN5bmMoZmlsZVBhdGgpKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlc3QoYHdhbGtEaXJlY3RvcnlSZWN1cnNpdmVseSAoJHtyb3VuZFR5cGV9KWAsIGFzeW5jIChcbiAgICAgICAgICAgIGFzc2VydDpPYmplY3RcbiAgICAgICAgKTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRvbmU6RnVuY3Rpb24gPSBhc3NlcnQuYXN5bmMoKVxuICAgICAgICAgICAgY29uc3QgZmlsZVBhdGhzOkFycmF5PHN0cmluZz4gPSBbXVxuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2s6RnVuY3Rpb24gPSAoZmlsZVBhdGg6c3RyaW5nKTpudWxsID0+IHtcbiAgICAgICAgICAgICAgICBmaWxlUGF0aHMucHVzaChmaWxlUGF0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGZpbGVzOkFycmF5PEZpbGU+ID0gW11cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZmlsZXMgPSBhd2FpdCAkLlRvb2xzLmNsYXNzLndhbGtEaXJlY3RvcnlSZWN1cnNpdmVseShcbiAgICAgICAgICAgICAgICAgICAgJy4vJywgY2FsbGJhY2spXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZmlsZXMubGVuZ3RoLCAxKVxuICAgICAgICAgICAgYXNzZXJ0Lm9rKGZpbGVzWzBdLmhhc093blByb3BlcnR5KCdwYXRoJykpXG4gICAgICAgICAgICBhc3NlcnQub2soZmlsZXNbMF0uaGFzT3duUHJvcGVydHkoJ3N0YXQnKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmaWxlUGF0aHMubGVuZ3RoLCAxKVxuICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudGVzdChgd2Fsa0RpcmVjdG9yeVJlY3Vyc2l2ZWx5U3luYyAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgICAgIGFzc2VydDpPYmplY3RcbiAgICAgICAgKTp2b2lkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoczpBcnJheTxzdHJpbmc+ID0gW11cbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrOkZ1bmN0aW9uID0gKGZpbGVQYXRoOnN0cmluZyk6bnVsbCA9PiB7XG4gICAgICAgICAgICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGZpbGVzOkFycmF5PEZpbGU+ID1cbiAgICAgICAgICAgICAgICAkLlRvb2xzLmNsYXNzLndhbGtEaXJlY3RvcnlSZWN1cnNpdmVseVN5bmMoJy4vJywgY2FsbGJhY2spXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZmlsZXMubGVuZ3RoLCAxKVxuICAgICAgICAgICAgYXNzZXJ0Lm9rKGZpbGVzWzBdLmhhc093blByb3BlcnR5KCdwYXRoJykpXG4gICAgICAgICAgICBhc3NlcnQub2soZmlsZXNbMF0uaGFzT3duUHJvcGVydHkoJ3N0YXQnKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmaWxlUGF0aHMubGVuZ3RoLCAxKVxuICAgICAgICB9KVxuICAgIH1cbiAgICAvLyAvLyBlbmRyZWdpb25cbiAgICAvLyAvLyByZWdpb24gcHJvY2VzcyBoYW5kbGVyXG4gICAgaWYgKFRBUkdFVF9URUNITk9MT0dZID09PSAnbm9kZScpIHtcbiAgICAgICAgdGhpcy50ZXN0KGBnZXRQcm9jZXNzQ2xvc2VIYW5kbGVyICgke3JvdW5kVHlwZX0pYCwgKFxuICAgICAgICAgICAgYXNzZXJ0Ok9iamVjdFxuICAgICAgICApOnZvaWQgPT4gYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgdHlwZW9mICQuVG9vbHMuY2xhc3MuZ2V0UHJvY2Vzc0Nsb3NlSGFuZGxlcihcbiAgICAgICAgICAgICAgICAoKTp2b2lkID0+IHt9LCAoKTp2b2lkID0+IHt9XG4gICAgICAgICAgICApLCAnZnVuY3Rpb24nKSlcbiAgICAgICAgdGhpcy50ZXN0KGBoYW5kbGVDaGlsZFByb2Nlc3MgKCR7cm91bmRUeXBlfSlgLCAoXG4gICAgICAgICAgICBhc3NlcnQ6T2JqZWN0XG4gICAgICAgICk6dm9pZCA9PiB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEEgbW9ja3VwIGR1cGxleCBzdHJlYW0gZm9yIG1vY2tpbmcgXCJzdGRvdXRcIiBhbmQgXCJzdHJkZXJyXCJcbiAgICAgICAgICAgICAqIHByb2Nlc3MgY29ubmVjdGlvbnMuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNsYXNzIE1vY2t1cER1cGxleFN0cmVhbSBleHRlbmRzIHJlcXVpcmUoJ3N0cmVhbScpLkR1cGxleCB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogVHJpZ2dlcnMgaWYgY29udGVudHMgZnJvbSBjdXJyZW50IHN0cmVhbSBzaG91bGQgYmUgcmVkLlxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSBzaXplIC0gTnVtYmVyIG9mIGJ5dGVzIHRvIHJlYWQgYXN5bmNocm9ub3VzbHkuXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMgUmVkIGRhdGEuXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgX3JlYWQoc2l6ZTpudW1iZXIpOnN0cmluZyB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtzaXplfWBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogVHJpZ2dlcnMgaWYgY29udGVudHMgc2hvdWxkIGJlIHdyaXR0ZW4gb24gY3VycmVudCBzdHJlYW0uXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIGNodW5rIC0gVGhlIGNodW5rIHRvIGJlIHdyaXR0ZW4uIFdpbGwgYWx3YXlzIGJlIGFcbiAgICAgICAgICAgICAgICAgKiBidWZmZXIgdW5sZXNzIHRoZSBcImRlY29kZVN0cmluZ3NcIiBvcHRpb24gd2FzIHNldCB0byBcImZhbHNlXCIuXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIGVuY29kaW5nIC0gU3BlY2lmaWVzIGVuY29kaW5nIHRvIGJlIHVzZWQgYXMgaW5wdXRcbiAgICAgICAgICAgICAgICAgKiBkYXRhLlxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayAtIFdpbGwgYmUgY2FsbGVkIGlmIGRhdGEgaGFzIGJlZW4gd3JpdHRlbi5cbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyBSZXR1cm5zIFwidHJ1ZVwiIGlmIG1vcmUgZGF0YSBjb3VsZCBiZSB3cml0dGVuIGFuZFxuICAgICAgICAgICAgICAgICAqIFwiZmFsc2VcIiBvdGhlcndpc2UuXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgX3dyaXRlKFxuICAgICAgICAgICAgICAgICAgICBjaHVuazpCdWZmZXJ8c3RyaW5nLCBlbmNvZGluZzpzdHJpbmcsIGNhbGxiYWNrOkZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgKTpib29sZWFuIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKCd0ZXN0JykpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc3Rkb3V0TW9ja3VwRHVwbGV4U3RyZWFtOk1vY2t1cER1cGxleFN0cmVhbSA9XG4gICAgICAgICAgICAgICAgbmV3IE1vY2t1cER1cGxleFN0cmVhbSgpXG4gICAgICAgICAgICBjb25zdCBzdGRlcnJNb2NrdXBEdXBsZXhTdHJlYW06TW9ja3VwRHVwbGV4U3RyZWFtID1cbiAgICAgICAgICAgICAgICBuZXcgTW9ja3VwRHVwbGV4U3RyZWFtKClcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkUHJvY2VzczpDaGlsZFByb2Nlc3MgPSBuZXcgQ2hpbGRQcm9jZXNzKClcbiAgICAgICAgICAgIGNoaWxkUHJvY2Vzcy5zdGRvdXQgPSBzdGRvdXRNb2NrdXBEdXBsZXhTdHJlYW1cbiAgICAgICAgICAgIGNoaWxkUHJvY2Vzcy5zdGRlcnIgPSBzdGRlcnJNb2NrdXBEdXBsZXhTdHJlYW1cblxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgICQuVG9vbHMuY2xhc3MuaGFuZGxlQ2hpbGRQcm9jZXNzKGNoaWxkUHJvY2VzcyksIGNoaWxkUHJvY2VzcylcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8gLy8gZW5kcmVnaW9uXG4gICAgLy8gLyBlbmRyZWdpb25cbiAgICAvLyAvIHJlZ2lvbiBwcm90ZWN0ZWRcbiAgICBpZiAocm91bmRUeXBlID09PSAnZnVsbCcpXG4gICAgICAgIHRoaXMudGVzdChgX2JpbmRFdmVudEhlbHBlciAoJHtyb3VuZFR5cGV9KWAsIChcbiAgICAgICAgICAgIGFzc2VydDpPYmplY3RcbiAgICAgICAgKTp2b2lkID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGVzdDpBcnJheTxhbnk+IG9mIFtcbiAgICAgICAgICAgICAgICBbWydib2R5J11dLFxuICAgICAgICAgICAgICAgIFtbJ2JvZHknXSwgdHJ1ZV0sXG4gICAgICAgICAgICAgICAgW1snYm9keSddLCBmYWxzZSwgJ2JpbmQnXVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBhc3NlcnQub2sodG9vbHMuX2JpbmRFdmVudEhlbHBlciguLi50ZXN0KSlcbiAgICAgICAgfSlcbiAgICAvLyAvIGVuZHJlZ2lvblxuICAgIC8vIGVuZHJlZ2lvblxufSwgY2xvc2VXaW5kb3c6IGZhbHNlLCByb3VuZFR5cGVzOiBbXX1dXG4vLyBlbmRyZWdpb25cbi8vIHJlZ2lvbiB0ZXN0IHJ1bm5lciAoaW4gYnJvd3NlckFQSSlcbmxldCB0ZXN0UmFuOmJvb2xlYW4gPSBmYWxzZVxuYnJvd3NlckFQSSgoYnJvd3NlckFQSTpCcm93c2VyQVBJKTpQcm9taXNlPGJvb2xlYW4+ID0+IFRvb2xzLnRpbWVvdXQoKFxuKTp2b2lkID0+IHtcbiAgICBmb3IgKGNvbnN0IGRvbU5vZGVTcGVjaWZpY2F0aW9uOlBsYWluT2JqZWN0IG9mIFtcbiAgICAgICAge2xpbms6IHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICBocmVmOiAnL25vZGVfbW9kdWxlcy9xdW5pdC9xdW5pdC9xdW5pdC5jc3MnLFxuICAgICAgICAgICAgICAgIHJlbDogJ3N0eWxlc2hlZXQnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0L2NzcydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbmplY3Q6IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdXG4gICAgICAgIH19LFxuICAgICAgICB7ZGl2OiB7YXR0cmlidXRlczoge2lkOiAncXVuaXQnfSwgaW5qZWN0OiB3aW5kb3cuZG9jdW1lbnQuYm9keX19LFxuICAgICAgICB7ZGl2OiB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB7aWQ6ICdxdW5pdC1maXh0dXJlJ30sIGluamVjdDogd2luZG93LmRvY3VtZW50LmJvZHlcbiAgICAgICAgfX1cbiAgICBdKSB7XG4gICAgICAgIGNvbnN0IGRvbU5vZGVOYW1lOnN0cmluZyA9IE9iamVjdC5rZXlzKGRvbU5vZGVTcGVjaWZpY2F0aW9uKVswXVxuICAgICAgICBjb25zdCBkb21Ob2RlOkRvbU5vZGUgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChkb21Ob2RlTmFtZSlcbiAgICAgICAgZm9yIChjb25zdCBuYW1lOnN0cmluZyBpbiBkb21Ob2RlU3BlY2lmaWNhdGlvbltkb21Ob2RlTmFtZV0uYXR0cmlidXRlcylcbiAgICAgICAgICAgIGlmIChkb21Ob2RlU3BlY2lmaWNhdGlvbltkb21Ob2RlTmFtZV0uYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICApKVxuICAgICAgICAgICAgICAgIGRvbU5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIGRvbU5vZGVTcGVjaWZpY2F0aW9uW1xuICAgICAgICAgICAgICAgICAgICBkb21Ob2RlTmFtZVxuICAgICAgICAgICAgICAgIF0uYXR0cmlidXRlc1tuYW1lXSlcbiAgICAgICAgZG9tTm9kZVNwZWNpZmljYXRpb25bZG9tTm9kZU5hbWVdLmluamVjdC5hcHBlbmRDaGlsZChkb21Ob2RlKVxuICAgIH1cbiAgICB0ZXN0UmFuID0gdHJ1ZVxuICAgIC8vIHJlZ2lvbiBjb25maWd1cmF0aW9uXG4gICAgUVVuaXQuY29uZmlnID0gVG9vbHMuZXh0ZW5kT2JqZWN0KFFVbml0LmNvbmZpZyB8fCB7fSwge1xuICAgICAgICAvKlxuICAgICAgICBub3RyeWNhdGNoOiB0cnVlLFxuICAgICAgICBub2dsb2JhbHM6IHRydWUsXG4gICAgICAgICovXG4gICAgICAgIHRlc3RUaW1lb3V0OiAzMCAqIDEwMDAsXG4gICAgICAgIHNjcm9sbHRvcDogZmFsc2VcbiAgICB9KVxuICAgIC8vIGVuZHJlZ2lvblxuICAgIGNvbnN0IHRlc3RQcm9taXNlczpBcnJheTxQcm9taXNlPGFueT4+ID0gW11cbiAgICBsZXQgY2xvc2VXaW5kb3c6Ym9vbGVhbiA9IGZhbHNlXG4gICAgZm9yIChjb25zdCB0ZXN0OlRlc3Qgb2YgdGVzdHMpIHtcbiAgICAgICAgaWYgKHRlc3QuY2xvc2VXaW5kb3cpXG4gICAgICAgICAgICBjbG9zZVdpbmRvdyA9IHRydWVcbiAgICAgICAgZm9yIChjb25zdCByb3VuZFR5cGU6c3RyaW5nIG9mIFsncGxhaW4nLCAnZG9jdW1lbnQnLCAnZnVsbCddKVxuICAgICAgICAgICAgaWYgKHRlc3Qucm91bmRUeXBlcy5sZW5ndGggPT09IDAgfHwgdGVzdC5yb3VuZFR5cGVzLmluY2x1ZGVzKFxuICAgICAgICAgICAgICAgIHJvdW5kVHlwZVxuICAgICAgICAgICAgKSkge1xuICAgICAgICAgICAgICAgIC8vIE5PVEU6IEVuZm9yY2UgdG8gcmVsb2FkIG1vZHVsZSB0byByZWJpbmQgXCIkXCIuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHJlcXVpcmUuY2FjaGVbcmVxdWlyZS5yZXNvbHZlKCdjbGllbnRub2RlJyldXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZXF1aXJlLmNhY2hlW3JlcXVpcmUucmVzb2x2ZSgnanF1ZXJ5JyldXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgTk9URTogTW9kdWxlIGJ1bmRsZXIgbGlrZSB3ZWJwYWNrIHdyYXBzIGEgY29tbW9uanNcbiAgICAgICAgICAgICAgICAgICAgZW52aXJvbm1lbnQuIFNvIHdlIGhhdmUgdG8gdHJ5IHRvIGNsZWFyIHRoZSB1bmRlcmxpbmdcbiAgICAgICAgICAgICAgICAgICAgY2FjaGUuXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJlcXVlc3Q6c3RyaW5nIG9mIFtcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWVudG5vZGUnLCAnanF1ZXJ5JywgJ2pxdWVyeS9kaXN0L2pxdWVyeScsXG4gICAgICAgICAgICAgICAgICAgICdqcXVlcnkvZGlzdC9qcXVlcnkuanMnLCAnanF1ZXJ5L2Rpc3QvanF1ZXJ5Lm1pbicsXG4gICAgICAgICAgICAgICAgICAgICdqcXVlcnkvZGlzdC9qcXVlcnkubWluLmpzJywgJ2pxdWVyeS9kaXN0L2pxdWVyeS5taW4nXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2YWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYGRlbGV0ZSByZXF1aXJlLmNhY2hlW3JlcXVpcmUucmVzb2x2ZSgnYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYCR7cmVxdWVzdH0nKV1gKVxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge31cbiAgICAgICAgICAgICAgICBsZXQgJGJvZHlEb21Ob2RlOiREb21Ob2RlXG4gICAgICAgICAgICAgICAgbGV0ICQ6YW55XG4gICAgICAgICAgICAgICAgaWYgKHJvdW5kVHlwZSA9PT0gJ3BsYWluJykge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuJCA9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgJCA9IHJlcXVpcmUoJ2NsaWVudG5vZGUnKS4kXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdW5kVHlwZSA9PT0gJ2Z1bGwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5hbWU6c3RyaW5nIG9mIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZG9jdW1lbnQnLCAnRWxlbWVudCcsICdIVE1MRWxlbWVudCcsICdtYXRjaE1lZGlhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnTm9kZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEobmFtZSBpbiBnbG9iYWwpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxbbmFtZV0gPSB3aW5kb3dbbmFtZV1cbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy4kID0gcmVxdWlyZSgnanF1ZXJ5JylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAkID0gcmVxdWlyZSgnY2xpZW50bm9kZScpLiRcbiAgICAgICAgICAgICAgICAgICAgJC5jb250ZXh0ID0gd2luZG93LmRvY3VtZW50XG4gICAgICAgICAgICAgICAgICAgICRib2R5RG9tTm9kZSA9ICQoJ2JvZHknKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB0b29sczokLlRvb2xzID0gKHJvdW5kVHlwZSA9PT0gJ3BsYWluJykgPyAkLlRvb2xzKFxuICAgICAgICAgICAgICAgICkgOiAkKCdib2R5JykuVG9vbHMoKVxuICAgICAgICAgICAgICAgIGNvbnN0IHRlc3RQcm9taXNlOj9PYmplY3QgPSB0ZXN0LmNhbGxiYWNrLmNhbGwoXG4gICAgICAgICAgICAgICAgICAgIFFVbml0LCByb3VuZFR5cGUsIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgICAgICAgKSA/IG51bGwgOiBUQVJHRVRfVEVDSE5PTE9HWSwgJCwgYnJvd3NlckFQSSwgdG9vbHMsXG4gICAgICAgICAgICAgICAgICAgICRib2R5RG9tTm9kZSlcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiB0ZXN0UHJvbWlzZSA9PT0gJ29iamVjdCcgJiYgdGVzdFByb21pc2UgJiZcbiAgICAgICAgICAgICAgICAgICAgJ3RoZW4nIGluIHRlc3RQcm9taXNlXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0ZXN0UHJvbWlzZXMucHVzaCh0ZXN0UHJvbWlzZSlcbiAgICAgICAgICAgIH1cbiAgICB9XG4gICAgaWYgKFxuICAgICAgICB0eXBlb2YgVEFSR0VUX1RFQ0hOT0xPR1kgPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgIFRBUkdFVF9URUNITk9MT0dZID09PSAnbm9kZSdcbiAgICApXG4gICAgICAgIFByb21pc2UuYWxsKHRlc3RQcm9taXNlcykudGhlbigoKTp2b2lkID0+IHtcbiAgICAgICAgICAgIGlmIChjbG9zZVdpbmRvdylcbiAgICAgICAgICAgICAgICBicm93c2VyQVBJLndpbmRvdy5jbG9zZSgpXG4gICAgICAgICAgICBRVW5pdC5sb2FkKClcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yOkVycm9yKTp2b2lkID0+IHtcbiAgICAgICAgICAgIHRocm93IGVycm9yXG4gICAgICAgIH0pXG4gICAgLy8gcmVnaW9uIGhvdCBtb2R1bGUgcmVwbGFjZW1lbnQgaGFuZGxlclxuICAgIC8qXG4gICAgICAgIE5PVEU6IGhvdCBtb2R1bGUgcmVwbGFjZW1lbnQgZG9lc24ndCB3b3JrIHdpdGggYXN5bmMgdGVzdHMgeWV0IHNpbmNlXG4gICAgICAgIHF1bml0IGlzIG5vdCByZXNldGFibGUgeWV0OlxuXG4gICAgICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiAnaG90JyBpbiBtb2R1bGUgJiYgbW9kdWxlLmhvdCkge1xuICAgICAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgICAgICAgICAgLy8gSWdub3JlVHlwZUNoZWNrXG4gICAgICAgICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgUVVuaXQucmVzZXQoKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUuY2xlYXIoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKi9cbiAgICAvLyBlbmRyZWdpb25cbn0pKVxuLy8gZW5kcmVnaW9uXG4vLyByZWdpb24gZXhwb3J0IHRlc3QgcmVnaXN0ZXIgZnVuY3Rpb25cbmxldCB0ZXN0UmVnaXN0ZXJlZDpib29sZWFuID0gZmFsc2Vcbi8qKlxuICogUmVnaXN0ZXJzIGEgY29tcGxldGUgdGVzdCBzZXQuXG4gKiBAcGFyYW0gY2FsbGJhY2sgLSBBIGZ1bmN0aW9uIGNvbnRhaW5pbmcgYWxsIHRlc3RzIHRvIHJ1bi4gVGhpcyBjYWxsYmFjayBnZXRzXG4gKiBzb21lIHVzZWZ1bCBwYXJhbWV0ZXJzIGFuZCB3aWxsIGJlIGV4ZWN1dGVkIGluIGNvbnRleHQgb2YgcXVuaXQuXG4gKiBAcGFyYW0gcm91bmRUeXBlcyAtIEEgbGlzdCBvZiByb3VuZCB0eXBlcyB3aGljaCBzaG91bGQgYmUgYXZvaWRlZC5cbiAqIEBwYXJhbSBjbG9zZVdpbmRvdyAtIEluZGljYXRlcyB3aGV0aGVyIHRoZSB3aW5kb3cgb2JqZWN0IHNob3VsZCBiZSBjbG9zZWRcbiAqIGFmdGVyIGZpbmlzaGluZyBhbGwgdGVzdHMuXG4gKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBjdXJyZW50bHkgcmVnaXN0ZXJlZCB0ZXN0cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oXG4gICAgY2FsbGJhY2s6KChcbiAgICAgICAgcm91bmRUeXBlOnN0cmluZywgdGFyZ2V0VGVjaG5vbG9neTo/c3RyaW5nLCAkOmFueSxcbiAgICAgICAgYnJvd3NlckFQSTpCcm93c2VyQVBJLCB0b29sczpPYmplY3QsICRib2R5RG9tTm9kZTokRG9tTm9kZVxuICAgICkgPT4gYW55KSwgcm91bmRUeXBlczpBcnJheTxzdHJpbmc+ID0gW10sIGNsb3NlV2luZG93OmJvb2xlYW4gPSBmYWxzZVxuKTpBcnJheTxUZXN0PiB7XG4gICAgaWYgKHRlc3RSYW4pXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdZb3UgaGF2ZSB0byByZWdpc3RlciB5b3VyIHRlc3RzIGltbWVkaWF0ZWx5IGFmdGVyIGltcG9ydGluZyB0aGUnICtcbiAgICAgICAgICAgICcgbGlicmFyeS4nKVxuICAgIGlmICghdGVzdFJlZ2lzdGVyZWQpIHtcbiAgICAgICAgdGVzdFJlZ2lzdGVyZWQgPSB0cnVlXG4gICAgICAgIHRlc3RzID0gW11cbiAgICB9XG4gICAgdGVzdHMucHVzaCh7Y2FsbGJhY2ssIGNsb3NlV2luZG93LCByb3VuZFR5cGVzfSlcbiAgICByZXR1cm4gdGVzdHNcbn1cbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIHZpbSBtb2RsaW5lXG4vLyB2aW06IHNldCB0YWJzdG9wPTQgc2hpZnR3aWR0aD00IGV4cGFuZHRhYjpcbi8vIHZpbTogZm9sZG1ldGhvZD1tYXJrZXIgZm9sZG1hcmtlcj1yZWdpb24sZW5kcmVnaW9uOlxuLy8gZW5kcmVnaW9uXG4iXX0=