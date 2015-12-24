
/* region file: /home/torben/cloud/data/repository/jQuery-tools/documentationWebsite/javaScript/jQuery/jquery-2.1.1.js */

/*!
 * jQuery JavaScript Library v2.1.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android < 4.0, iOS < 6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	// Support: Windows Web Apps (WWA)
	// `name` and `type` need .setAttribute for WWA
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE9-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') in IE9, see #12537
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {
				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {
				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));


/* endregion */


/* region file: /home/torben/cloud/data/repository/jQuery-tools/documentationWebsite/javaScript/jQuery/jquery-observeHashChange-1.0.js */

/**
 *  jQuery.observeHashChange (Version: 1.0)
 *
 *  http://finnlabs.github.com/jquery.observehashchange/
 *
 *  Copyright (c) 2009, Gregor Schmidt, Finn GmbH
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a
 *  copy of this software and associated documentation files (the "Software"),
 *  to deal in the Software without restriction, including without limitation
 *  the rights to use, copy, modify, merge, publish, distribute, sublicense,
 *  and/or sell copies of the Software, and to permit persons to whom the
 *  Software is furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *  DEALINGS IN THE SOFTWARE.
 **/
(function($) {
  $.fn.hashchange = function(fn) {
    $(window).bind("jQuery.hashchange", fn);
    return this;
  };

  $.observeHashChange = function(options) {
    var opts = $.extend({}, $.observeHashChange.defaults, options);
    if (isHashChangeEventSupported()) {
      nativeVersion();
    }
    else {
      setIntervalVersion(opts);
    }
  };

  var locationHash = null;
  var functionStore = null;
  var interval = 0;

  $.observeHashChange.defaults = {
    interval : 500
  };

  function isHashChangeEventSupported() {
    return "onhashchange" in window;
  }

  function nativeVersion() {
    locationHash = document.location.hash;
    window.onhashchange = onhashchangeHandler;
  }

  function onhashchangeHandler(e, data) {
    var oldHash = locationHash;
    locationHash = document.location.hash;
    $(window).trigger("jQuery.hashchange", {before: oldHash, after: locationHash});
  }

  function setIntervalVersion(opts) {
    if (locationHash == null) {
      locationHash = document.location.hash;
    }
    if (functionStore != null) {
      clearInterval(functionStore);
    }
    if (interval != opts.interval) {
      functionStore = setInterval(checkLocationHash, opts.interval); 
      interval = opts.interval;
    }
  }

  function checkLocationHash() {
    if (locationHash != document.location.hash) {
      var oldHash = locationHash;
      locationHash = document.location.hash;
      $(window).trigger("jQuery.hashchange", {before: oldHash, after: locationHash});
    }
  }

  $.observeHashChange();
})(jQuery);


/* endregion */


/* region file: /home/torben/cloud/data/repository/jQuery-tools/documentationWebsite/javaScript/jQuery/jquery-scrollTo-2.1.0.js */

/*!
 * jQuery.scrollTo
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @projectDescription Easy element scrolling using jQuery.
 * @author Ariel Flesler
 * @version 2.1.0
 */
;(function(define) {
	'use strict';

	define(['jquery'], function($) {
		var $scrollTo = $.scrollTo = function(target, duration, settings) {
			return $(window).scrollTo(target, duration, settings);
		};

		$scrollTo.defaults = {
			axis:'xy',
			duration: 0,
			limit:true
		};

		function isWin(elem) {
			return !elem.nodeName ||
				$.inArray(elem.nodeName.toLowerCase(), ['iframe','#document','html','body']) !== -1;
		}

		$.fn.scrollTo = function(target, duration, settings) {
			if (typeof duration === 'object') {
				settings = duration;
				duration = 0;
			}
			if (typeof settings === 'function') {
				settings = { onAfter:settings };
			}
			if (target === 'max') {
				target = 9e9;
			}

			settings = $.extend({}, $scrollTo.defaults, settings);
			// Speed is still recognized for backwards compatibility
			duration = duration || settings.duration;
			// Make sure the settings are given right
			var queue = settings.queue && settings.axis.length > 1;
			if (queue) {
				// Let's keep the overall duration
				duration /= 2;
			}
			settings.offset = both(settings.offset);
			settings.over = both(settings.over);

			return this.each(function() {
				// Null target yields nothing, just like jQuery does
				if (target === null) return;

				var win = isWin(this),
					elem = win ? this.contentWindow || window : this,
					$elem = $(elem),
					targ = target,
					attr = {},
					toff;

				switch (typeof targ) {
					// A number will pass the regex
					case 'number':
					case 'string':
						if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
							targ = both(targ);
							// We are done
							break;
						}
						// Relative/Absolute selector
						targ = win ? $(targ) : $(targ, elem);
						if (!targ.length) return;
						/* falls through */
					case 'object':
						// DOMElement / jQuery
						if (targ.is || targ.style) {
							// Get the real position of the target
							toff = (targ = $(targ)).offset();
						}
				}

				var offset = $.isFunction(settings.offset) && settings.offset(elem, targ) || settings.offset;

				$.each(settings.axis.split(''), function(i, axis) {
					var Pos	= axis === 'x' ? 'Left' : 'Top',
						pos = Pos.toLowerCase(),
						key = 'scroll' + Pos,
						prev = $elem[key](),
						max = $scrollTo.max(elem, axis);

					if (toff) {// jQuery / DOMElement
						attr[key] = toff[pos] + (win ? 0 : prev - $elem.offset()[pos]);

						// If it's a dom element, reduce the margin
						if (settings.margin) {
							attr[key] -= parseInt(targ.css('margin'+Pos), 10) || 0;
							attr[key] -= parseInt(targ.css('border'+Pos+'Width'), 10) || 0;
						}

						attr[key] += offset[pos] || 0;

						if (settings.over[pos]) {
							// Scroll to a fraction of its width/height
							attr[key] += targ[axis === 'x'?'width':'height']() * settings.over[pos];
						}
					} else {
						var val = targ[pos];
						// Handle percentage values
						attr[key] = val.slice && val.slice(-1) === '%' ?
							parseFloat(val) / 100 * max
							: val;
					}

					// Number or 'number'
					if (settings.limit && /^\d+$/.test(attr[key])) {
						// Check the limits
						attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
					}

					// Don't waste time animating, if there's no need.
					if (!i && settings.axis.length > 1) {
						if (prev === attr[key]) {
							// No animation needed
							attr = {};
						} else if (queue) {
							// Intermediate animation
							animate(settings.onAfterFirst);
							// Don't animate this axis again in the next iteration.
							attr = {};
						}
					}
				});

				animate(settings.onAfter);

				function animate(callback) {
					var opts = $.extend({}, settings, {
						// The queue setting conflicts with animate()
						// Force it to always be true
						queue: true,
						duration: duration,
						complete: callback && function() {
							callback.call(elem, targ, settings);
						}
					});
					$elem.animate(attr, opts);
				}
			});
		};

		// Max scrolling position, works on quirks mode
		// It only fails (not too badly) on IE, quirks mode.
		$scrollTo.max = function(elem, axis) {
			var Dim = axis === 'x' ? 'Width' : 'Height',
				scroll = 'scroll'+Dim;

			if (!isWin(elem))
				return elem[scroll] - $(elem)[Dim.toLowerCase()]();

			var size = 'client' + Dim,
				doc = elem.ownerDocument || elem.document,
				html = doc.documentElement,
				body = doc.body;

			return Math.max(html[scroll], body[scroll]) - Math.min(html[size], body[size]);
		};

		function both(val) {
			return $.isFunction(val) || $.isPlainObject(val) ? val : { top:val, left:val };
		}

		// Add special hooks so that window scroll properties can be animated
		$.Tween.propHooks.scrollLeft =
		$.Tween.propHooks.scrollTop = {
			get: function(t) {
				return $(t.elem)[t.prop]();
			},
			set: function(t) {
				var curr = this.get(t);
				// If interrupt is true and user scrolled, stop animating
				if (t.options.interrupt && t._last && t._last !== curr) {
					return $(t.elem).stop();
				}
				var next = Math.round(t.now);
				// Don't waste CPU
				// Browsers don't render floating point scroll
				if (curr !== next) {
					$(t.elem)[t.prop](next);
					t._last = this.get(t);
				}
			}
		};

		// AMD requirement
		return $scrollTo;
	});
}(typeof define === 'function' && define.amd ? define : function(deps, factory) {
	'use strict';
	if (typeof module !== 'undefined' && module.exports) {
		// Node
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}));


/* endregion */


/* region file: /home/torben/cloud/data/repository/jQuery-tools/documentationWebsite/javaScript/jQuery/jquery-spin-2.0.1.js */

/**
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 */
(function(root, factory) {

  /* CommonJS */
  if (typeof exports == 'object')  module.exports = factory();

  /* AMD module */
  else if (typeof define == 'function' && define.amd) define(factory);

  /* Browser global */
  else root.Spinner = factory();
}
(this, function() {
  "use strict";

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations; /* Whether to use CSS animations or setTimeout */

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
      , n;

    for(n in prop) el[n] = prop[n];
    return el;
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++)
      parent.appendChild(arguments[i])

    return parent
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = (function() {
    var el = createEl('style', {type : 'text/css'})
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  }())

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')
      , start = 0.01 + i/lines * 100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-' + prefix + '-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }
    return name;
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor(el, prop) {
    var s = el.style
      , pp
      , i;
    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    for(i=0; i < prefixes.length; i++) {
      pp = prefixes[i]+prop;
      if(s[pp] !== undefined) return pp;
    }
    if(s[prop] !== undefined) return prop;
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop)
      el.style[vendor(el, n)||n] = prop[n]

    return el
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def)
        if (obj[n] === undefined) obj[n] = def[n]
    }
    return obj
  }

  /**
   * Returns the absolute page-offset of the given element.
   */
  function pos(el) {
    var o = { x:el.offsetLeft, y:el.offsetTop }
    while((el = el.offsetParent))
      o.x+=el.offsetLeft, o.y+=el.offsetTop

    return o
  }

  /**
   * Returns the line color from the given string or array.
   */
  function getColor(color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length]
  }

  // Built-in defaults

  var defaults = {
    lines: 12,            // The number of lines to draw
    length: 7,            // The length of each line
    width: 5,             // The line thickness
    radius: 10,           // The radius of the inner circle
    rotate: 0,            // Rotation offset
    corners: 1,           // Roundness (0..1)
    color: '#000',        // #rgb or #rrggbb
    direction: 1,         // 1: clockwise, -1: counterclockwise
    speed: 1,             // Rounds per second
    trail: 100,           // Afterglow percentage
    opacity: 1/4,         // Opacity of the lines
    fps: 20,              // Frames per second when using setTimeout()
    zIndex: 2e9,          // Use a high z-index by default
    className: 'spinner', // CSS class to assign to the element
    top: '50%',           // center vertically
    left: '50%',          // center horizontally
    position: 'absolute'  // element position
  }

  /** The constructor */
  function Spinner(o) {
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  // Global defaults that override the built-ins:
  Spinner.defaults = {}

  merge(Spinner.prototype, {

    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function(target) {
      this.stop()

      var self = this
        , o = self.opts
        , el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})
        , mid = o.radius+o.length+o.width

      css(el, {
        left: o.left,
        top: o.top
      })

      if (target) {
        target.insertBefore(el, target.firstChild||null)
      }

      el.setAttribute('role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , start = (o.lines - 1) * (1 - o.direction) / 2
          , alpha
          , fps = o.fps
          , f = fps/o.speed
          , ostep = (1-o.opacity) / (f*o.trail / 100)
          , astep = f/o.lines

        ;(function anim() {
          i++;
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

            self.opacity(el, j * o.direction + start, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps))
        })()
      }
      return self
    },

    /**
     * Stops and removes the Spinner.
     */
    stop: function() {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    },

    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
    lines: function(el, o) {
      var i = 0
        , start = (o.lines - 1) * (1 - o.direction) / 2
        , seg

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.corners * o.width>>1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}))
        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    },

    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
    opacity: function(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })


  function initVML() {

    /* Utility function to create a VML tag */
    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    // No CSS transforms but VML support, add a CSS rule for VML elements:
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

    Spinner.prototype.lines = function(el, o) {
      var r = o.length+o.width
        , s = 2*r

      function grp() {
        return css(
          vml('group', {
            coordsize: s + ' ' + s,
            coordorigin: -r + ' ' + -r
          }),
          { width: s, height: s }
        )
      }

      var margin = -(o.width+o.length)*2 + 'px'
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
        , i

      function seg(i, dx, filter) {
        ins(g,
          ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
            ins(css(vml('roundrect', {arcsize: o.corners}), {
                width: r,
                height: o.width,
                left: o.radius,
                top: -o.width>>1,
                filter: filter
              }),
              vml('fill', {color: getColor(o.color, i), opacity: o.opacity}),
              vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
            )
          )
        )
      }

      if (o.shadow)
        for (i = 1; i <= o.lines; i++)
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')

      for (i = 1; i <= o.lines; i++) seg(i)
      return ins(el, g)
    }

    Spinner.prototype.opacity = function(el, i, val, o) {
      var c = el.firstChild
      o = o.shadow && o.lines || 0
      if (c && i+o < c.childNodes.length) {
        c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild
        if (c) c.opacity = val
      }
    }
  }

  var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

  if (!vendor(probe, 'transform') && probe.adj) initVML()
  else useCssAnimations = vendor(probe, 'animation')

  return Spinner

}));

/**
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 */

/*

Basic Usage:
============

$('#el').spin(); // Creates a default Spinner using the text color of #el.
$('#el').spin({ ... }); // Creates a Spinner using the provided options.

$('#el').spin(false); // Stops and removes the spinner.

Using Presets:
==============

$('#el').spin('small'); // Creates a 'small' Spinner using the text color of #el.
$('#el').spin('large', '#fff'); // Creates a 'large' white Spinner.

Adding a custom preset:
=======================

$.fn.spin.presets.flower = {
  lines: 9
  length: 10
  width: 20
  radius: 0
}

$('#el').spin('flower', 'red');

*/

(function(factory) {

  if (typeof exports == 'object') {
    // CommonJS
    factory(require('jquery'), require('spin'))
  }
  else if (typeof define == 'function' && define.amd) {
    // AMD, register as anonymous module
    define(['jquery', 'spin'], factory)
  }
  else {
    // Browser globals
    if (!window.Spinner) throw new Error('Spin.js not present')
    factory(window.jQuery, window.Spinner)
  }

}(function($, Spinner) {

  $.fn.spin = function(opts, color) {

    return this.each(function() {
      var $this = $(this),
        data = $this.data();

      if (data.spinner) {
        data.spinner.stop();
        delete data.spinner;
      }
      if (opts !== false) {
        opts = $.extend(
          { color: color || $this.css('color') },
          $.fn.spin.presets[opts] || opts
        )
        data.spinner = new Spinner(opts).spin(this)
      }
    })
  }

  $.fn.spin.presets = {
    tiny: { lines: 8, length: 2, width: 2, radius: 3 },
    small: { lines: 8, length: 4, width: 3, radius: 5 },
    large: { lines: 10, length: 8, width: 4, radius: 8 }
  }

}));


/* endregion */


/* region file: /home/torben/cloud/data/repository/jQuery-tools/documentationWebsite/coffeeScript/jQuery/jquery-tools-1.0.js */


/*
[Project page](http://torben.website/jQuery-tools)

This module provides common reusable logic for every non trivial jQuery plugin.

Copyright Torben Sickert 16.12.2012

License
-------

This library written by Torben Sickert stand under a creative commons naming
3.0 unported license. see http://creativecommons.org/licenses/by/3.0/deed.de

Extending this module
---------------------

For conventions see require on https://github.com/thaibault/require

Author
------

t.sickert["~at~"]gmail.com (Torben Sickert)

Version
-------

1.0 stable
 */

(function() {
  var main,
    slice = [].slice,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  main = function($) {
    var Tools, nativePropFunction;
    Tools = (function() {

      /*
          This plugin provides such interface logic like generic controller
          logic for integrating plugins into $, mutual exclusion for
          depending gui elements, logging additional string, array or
          function handling. A set of helper functions to parse option
          objects dom trees or handle events is also provided.
       */

      /*
          **self {Tools}**
          Saves a reference to this class useful for introspection.
       */
      Tools.prototype.self = Tools;


      /*
          **keyCode {Object}**
          Saves a mapping from key codes to their corresponding name.
       */

      Tools.prototype.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
      };


      /*
          Lists all known abbreviation for proper camel case to delimited
          and back conversion.
       */

      Tools.prototype.abbreviations = ['html', 'id', 'url', 'us', 'de', 'api', 'href'];


      /*
          **transitionEndEventNames {String}**
          Saves a string with all css3 browser specific transition end event
          names.
       */

      Tools.prototype.transitionEndEventNames = 'transitionend webkitTransitionEnd oTransitionEnd ' + 'MSTransitionEnd';


      /*
          **animationEndEventNames {String}**
          Saves a string with all css3 browser specific animation end event
          names.
       */

      Tools.prototype.animationEndEventNames = 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd';


      /*
          **maximalsupportedinternetexplorerversion {String}**
          Saves currently minimal supported internet explorer version.
       */

      Tools.prototype.maximalSupportedInternetExplorerVersion = (function() {

        /*Returns zero if no internet explorer present. */
        var div, i, version;
        div = document.createElement('div');
        for (version = i = 0; i < 9; version = ++i) {
          div.innerHTML = '<!' + ("--[if gt IE " + version + "]><i></i><![e") + 'ndif]-' + '->';
          if (!div.getElementsByTagName('i').length) {
            break;
          }
        }
        if (!version) {
          if (window.navigator.appVersion.indexOf('MSIE 10') !== -1) {
            return 10;
          } else if (window.navigator.userAgent.indexOf('Trident') !== -1 && window.navigator.userAgent.indexOf('rv:11') !== -1) {
            return 11;
          }
        }
        return version;
      })();


      /*
          **_consoleMethods {String[]}**
          This variable contains a collection of methods usually binded to
          the console object.
       */

      Tools.prototype._consoleMethods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];


      /*
          **_javaScriptDependentContentHandled {Boolean}**
          Indicates weather javaScript dependent content where hide or shown.
       */

      Tools.prototype._javaScriptDependentContentHandled = false;


      /*
          **__tools__ {Boolean}**
          Indicates if an instance was derived from this class.
       */

      Tools.prototype.__tools__ = true;


      /*
          **__name__ {String}**
          Holds the class name to provide inspection features.
       */

      Tools.prototype.__name__ = 'Tools';

      function Tools($domNode1, _options, _defaultOptions, _locks) {
        var i, len, method, ref;
        this.$domNode = $domNode1 != null ? $domNode1 : null;
        this._options = _options != null ? _options : {};
        this._defaultOptions = _defaultOptions != null ? _defaultOptions : {
          logging: false,
          domNodeSelectorPrefix: 'body',
          domNode: {
            hideJavaScriptEnabled: '.tools-hidden-on-javascript-enabled',
            showJavaScriptEnabled: '.tools-visible-on-javascript-enabled'
          }
        };
        this._locks = _locks != null ? _locks : {};

        /*
            This method should be overwritten normally. It is triggered if
            current object is created via the "new" keyword.
        
            The dom node selector prefix enforces to not globally select
            any dom nodes which aren't in the expected scope of this
            plugin. "{1}" will be automatically replaced with this plugin
            name suffix ("incrementer"). You don't have to use "{1}" but it
            can help you to write code which is more reconcilable with the
            dry concept.
        
            **returns {$.Tools}** Returns the current instance.
         */
        ref = this._consoleMethods;
        for (i = 0, len = ref.length; i < len; i++) {
          method = ref[i];
          if (window.console == null) {
            window.console = {};
          }
          if (window.console[method] == null) {
            console[method] = $.noop();
          }
        }
        if (!this.self.prototype._javaScriptDependentContentHandled) {
          this.self.prototype._javaScriptDependentContentHandled = true;
          $(this._defaultOptions.domNodeSelectorPrefix + ' ' + this._defaultOptions.domNode.hideJavaScriptEnabled).filter(function() {
            return !$(this).data('javaScriptDependentContentHide');
          }).data('javaScriptDependentContentHide', true).hide();
          $(this._defaultOptions.domNodeSelectorPrefix + ' ' + this._defaultOptions.domNode.showJavaScriptEnabled).filter(function() {
            return !$(this).data('javaScriptDependentContentShow');
          }).data('javaScriptDependentContentShow', true).show();
        }
        return this;
      }

      Tools.prototype.destructor = function() {

        /*
            This method could be overwritten normally. It acts like a
            destructor.
        
            **returns {$.Tools}** - Returns the current instance.
         */
        this.off('*');
        return this;
      };

      Tools.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }

        /*
            This method should be overwritten normally. It is triggered if
            current object was created via the "new" keyword and is called
            now.
        
            **options {Object}**  - options An options object.
        
            **returns {$.Tools}** - Returns the current instance.
         */
        this._options = $.extend(true, {}, this._defaultOptions, this._options, options);
        this._options.domNodeSelectorPrefix = this.stringFormat(this._options.domNodeSelectorPrefix, this.stringCamelCaseToDelimited(this.__name__));
        return this;
      };

      Tools.prototype.controller = function(object, parameter, $domNode) {
        if ($domNode == null) {
          $domNode = null;
        }

        /*
            Defines a generic controller for $ plugins.
        
            **object {Object|String}** - The object or class to control. If
                                         "object" is a class an instance
                                         will be generated.
        
            **parameter {Arguments}**  - The initially given arguments
                                         object.
        
            **returns {Mixed}**        - Returns whatever the initializer
                                         method returns.
         */
        parameter = this.argumentsObjectToArray(parameter);
        if (object.__name__ == null) {
          object = new object($domNode);
          if (object.__tools__ == null) {
            object = $.extend(true, new Tools, object);
          }
        }
        if (($domNode != null) && !$domNode.data(object.__name__)) {
          $domNode.data(object.__name__, object);
        }
        if (object[parameter[0]] != null) {
          return object[parameter[0]].apply(object, parameter.slice(1));
        } else if (!parameter.length || $.type(parameter[0]) === 'object') {

          /*
              If an options object or no method name is given the
              initializer will be called.
           */
          return object.initialize.apply(object, parameter);
        }
        return $.error(("Method \"" + parameter[0] + "\" does not exist on $-extension ") + (object.__name__ + "\"."));
      };

      Tools.prototype.acquireLock = function(description, callbackFunction, autoRelease) {
        var wrappedCallbackFunction;
        if (autoRelease == null) {
          autoRelease = false;
        }

        /*
            Calling this method introduces a starting point for a critical
            area with potential race conditions. The area will be binded to
            given description string. So don't use same names for different
            areas.
        
            **description {String}**        - A short string describing the
                                              critical areas properties.
        
            **callbackFunction {Function}** - A procedure which should only
                                              be executed if the
                                              interpreter isn't in the
                                              given critical area. The lock
                                              description string will be
                                              given to the callback
                                              function.
        
            **autoRelease {Boolean}**       - Release the lock after
                                              execution of given callback.
        
            **returns {$.Tools}**           - Returns the current instance.
         */
        wrappedCallbackFunction = (function(_this) {
          return function(description) {
            callbackFunction(description);
            if (autoRelease) {
              return _this.releaseLock(description);
            }
          };
        })(this);
        if (this._locks[description] != null) {
          this._locks[description].push(wrappedCallbackFunction);
        } else {
          this._locks[description] = [];
          wrappedCallbackFunction(description);
        }
        return this;
      };

      Tools.prototype.releaseLock = function(description) {

        /*
            Calling this method  causes the given critical area to be
            finished and all functions given to "this.acquireLock()" will
            be executed in right order.
        
            **description {String}** - A short string describing the
                                       critical areas properties.
        
            **returns {$.Tools}**    - Returns the current instance.
         */
        if (this._locks[description] != null) {
          if (this._locks[description].length) {
            this._locks[description].shift()(description);
          } else {
            delete this._locks[description];
          }
        }
        return this;
      };

      Tools.prototype.mouseOutEventHandlerFix = function(eventHandler) {

        /*
            This method fixes an ugly javaScript bug. If you add a mouseout
            event listener to a dom node the given handler will be called
            each time any dom node inside the observed dom node triggers a
            mouseout event. This methods guarantees that the given event
            handler is only called if the observed dom node was leaved.
        
            **eventHandler {Function}** - The mouse out event handler.
        
            **returns {Function}**      - Returns the given function
                                          wrapped by the workaround logic.
         */
        var self;
        self = this;
        return function(event) {
          var relatedTarget;
          relatedTarget = event.toElement;
          if (event.relatedTarget) {
            relatedTarget = event.relatedTarget;
          }
          while (relatedTarget && relatedTarget.tagName !== 'BODY') {
            if (relatedTarget === this) {
              return;
            }
            relatedTarget = relatedTarget.parentNode;
          }
          return eventHandler.apply(self, arguments);
        };
      };

      Tools.prototype.log = function() {
        var additionalArguments, avoidAnnotation, force, level, message, object, ref;
        object = arguments[0], force = arguments[1], avoidAnnotation = arguments[2], level = arguments[3], additionalArguments = 5 <= arguments.length ? slice.call(arguments, 4) : [];
        if (force == null) {
          force = false;
        }
        if (avoidAnnotation == null) {
          avoidAnnotation = false;
        }
        if (level == null) {
          level = 'info';
        }

        /*
            Shows the given object's representation in the browsers
            console if possible or in a standalone alert-window as
            fallback.
        
            **object {Mixed}**            - Any object to print.
        
            **force {Boolean}**           - If set to "true" given input
                                            will be shown independently
                                            from current logging
                                            configuration or interpreter's
                                            console implementation.
        
            **avoidAnnotation {Boolean}** - If set to "true" given input
                                            has no module or log level
                                            specific annotations.
        
            **level {String}**            - Description of log messages
                                            importance.
        
            Additional arguments are used for string formating.
        
            **returns {$.Tools}**         - Returns the current instance.
         */
        if (this._options.logging || force || (level === 'error' || level === 'critical')) {
          if (avoidAnnotation) {
            message = object;
          } else if ($.type(object) === 'string') {
            additionalArguments.unshift(object);
            message = (this.__name__ + " (" + level + "): ") + this.stringFormat.apply(this, additionalArguments);
          } else if ($.isNumeric(object) || $.type(object) === 'boolean') {
            message = this.__name__ + " (" + level + "): " + (object.toString());
          } else {
            this.log(",--------------------------------------------,");
            this.log(object, force, true);
            this.log("'--------------------------------------------'");
          }
          if (message) {
            if ((((ref = window.console) != null ? ref[level] : void 0) == null) || window.console[level] === $.noop()) {
              window.alert(message);
            }
            window.console[level](message);
          }
        }
        return this;
      };

      Tools.prototype.info = function() {
        var additionalArguments, object;
        object = arguments[0], additionalArguments = 2 <= arguments.length ? slice.call(arguments, 1) : [];

        /*
            Wrapper method for the native console method usually provided
            by interpreter.
        
            **object {Mixed}**    - Any object to print.
        
            Additional arguments are used for string formating.
        
            **returns {$.Tools}** - Returns the current instance.
         */
        return this.log.apply(this, [object, false, false, 'info'].concat(additionalArguments));
      };

      Tools.prototype.debug = function() {
        var additionalArguments, object;
        object = arguments[0], additionalArguments = 2 <= arguments.length ? slice.call(arguments, 1) : [];

        /*
            Wrapper method for the native console method usually provided
            by interpreter.
        
            **param {Mixed}**     - Any object to print.
        
            Additional arguments are used for string formating.
        
            **returns {$.Tools}** - Returns the current instance.
         */
        return this.log.apply(this, [object, false, false, 'debug'].concat(additionalArguments));
      };

      Tools.prototype.error = function() {
        var additionalArguments, object;
        object = arguments[0], additionalArguments = 2 <= arguments.length ? slice.call(arguments, 1) : [];

        /*
            Wrapper method for the native console method usually provided
            by interpreter.
        
            **object {Mixed}**    - Any object to print.
        
            Additional arguments are used for string formating.
        
            **returns {$.Tools}** - Returns the current instance.
         */
        return this.log.apply(this, [object, true, false, 'error'].concat(additionalArguments));
      };

      Tools.prototype.critical = function() {
        var additionalArguments, object;
        object = arguments[0], additionalArguments = 2 <= arguments.length ? slice.call(arguments, 1) : [];

        /*
            Wrapper method for the native console method usually provided
            by interpreter.
        
            **object {Mixed}**    - Any object to print.
        
            Additional arguments are used for string formating.
        
            **returns {$.Tools}** - Returns the current instance.
         */
        return this.log.apply(this, [object, true, false, 'warn'].concat(additionalArguments));
      };

      Tools.prototype.warn = function() {
        var additionalArguments, object;
        object = arguments[0], additionalArguments = 2 <= arguments.length ? slice.call(arguments, 1) : [];

        /*
            Wrapper method for the native console method usually provided
            by interpreter.
        
            **object {Mixed}**    - Any object to print.
        
            Additional arguments are used for string formating.
        
            **returns {$.Tools}** - Returns the current instance.
         */
        return this.log.apply(this, [object, false, false, 'warn'].concat(additionalArguments));
      };

      Tools.prototype.show = function(object) {

        /*
            Dumps a given object in a human readable format.
        
            **object {Object}**  - Any object to show.
        
            **returns {String}** - Returns the serialized object.
         */
        var output;
        output = '';
        if ($.type(object) === 'string') {
          output = object;
        } else {
          $.each(object, function(key, value) {
            if (value === void 0) {
              value = 'undefined';
            } else if (value === null) {
              value = 'null';
            }
            return output += (key.toString()) + ": " + (value.toString()) + "\n";
          });
        }
        if (!output) {
          output = output.toString();
        }
        return ($.trim(output)) + "\n(Type: \"" + ($.type(object)) + "\")";
      };

      Tools.prototype.getPositionRelativeToViewport = function(delta) {
        var $window, rectangle;
        if (delta == null) {
          delta = {};
        }

        /*
            Determines where current dom node is relative to current view
            port position.
        
            **delta {Object}**   - Allows deltas for "top", "left",
                                   "bottom" and "right" for determining
                                   positions.
        
            **returns {String}** - Returns one of "above", "left", "below",
                                   "right" or "in".
         */
        delta = $.extend({
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }, delta);
        $window = $(window);
        rectangle = this.$domNode[0].getBoundingClientRect();
        if ((rectangle.top + delta.top) < 0) {
          return 'above';
        }
        if ((rectangle.left + delta.left) < 0) {
          return 'left';
        }
        if ($window.height() < (rectangle.bottom + delta.bottom)) {
          return 'below';
        }
        if ($window.width() < (rectangle.right + delta.right)) {
          return 'right';
        }
        return 'in';
      };

      Tools.prototype.generateDirectiveSelector = function(directiveName) {

        /*
            Generates a directive name corresponding selector string.
        
            **directiveName {String}** - The directive name
        
            **return {String}**        - Returns generated selector
         */
        var delimitedName;
        delimitedName = this.stringCamelCaseToDelimited(directiveName);
        return (delimitedName + ", ." + delimitedName + ", [" + delimitedName + "], ") + ("[data-" + delimitedName + "], [x-" + delimitedName + "]") + (delimitedName.indexOf('-') === -1 ? '' : (", [" + (delimitedName.replace(/-/g, '\\:')) + "], ") + ("[" + (delimitedName.replace(/-/g, '_')) + "]"));
      };

      Tools.prototype.removeDirective = function(directiveName) {

        /*
            Removes a directive name corresponding class or attribute.
        
            **directiveName {String}** - The directive name
        
            **return {DomNode}**       - Returns current dom node
         */
        var delimitedName;
        delimitedName = this.stringCamelCaseToDelimited(directiveName);
        return this.$domNode.removeClass(delimitedName).removeAttr(delimitedName).removeAttr("data-" + delimitedName).removeAttr("x-" + delimitedName).removeAttr(delimitedName.replace('-', ':')).removeAttr(delimitedName.replace('-', '_'));
      };

      Tools.prototype.getNormalizedDirectiveName = function(directiveName) {

        /*
            Determines a normalized camel case directive name
            representation.
        
            **directiveName {String}** - The directive name
        
            **return {String}**        - Returns the corresponding name
         */
        var delimiter, i, j, l, len, len1, len2, prefix, prefixFound, ref, ref1, ref2;
        ref = ['-', ':', '_'];
        for (i = 0, len = ref.length; i < len; i++) {
          delimiter = ref[i];
          prefixFound = false;
          ref1 = ['data' + delimiter, 'x' + delimiter];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            prefix = ref1[j];
            if (this.stringStartsWith(directiveName, prefix)) {
              directiveName = directiveName.substring(prefix.length);
              prefixFound = true;
              break;
            }
          }
          if (prefixFound) {
            break;
          }
        }
        ref2 = ['-', ':', '_'];
        for (l = 0, len2 = ref2.length; l < len2; l++) {
          delimiter = ref2[l];
          directiveName = this.stringDelimitedToCamelCase(directiveName, delimiter);
        }
        return directiveName;
      };

      Tools.prototype.getDirectiveValue = function(directiveName) {

        /*
            Determines a directive attribute value.
        
            **directiveName {String}** - The directive name
        
            **return {String|Null}**   - Returns the corresponding
                                         attribute value or "null" if no
                                         attribute value exists.
         */
        var attributeName, delimitedName, i, len, ref, value;
        delimitedName = this.stringCamelCaseToDelimited(directiveName);
        ref = [delimitedName, "data-" + delimitedName, "x-" + delimitedName, delimitedName.replace('-', '\\:')];
        for (i = 0, len = ref.length; i < len; i++) {
          attributeName = ref[i];
          value = this.$domNode.attr(attributeName);
          if (value != null) {
            return value;
          }
        }
      };

      Tools.prototype.sliceDomNodeSelectorPrefix = function(domNodeSelector) {

        /*
            Removes a selector prefix from a given selector. This methods
            searches in the options object for a given
            "domNodeSelectorPrefix".
        
            **domNodeSelector {String}** - The dom node selector to slice.
        
            **return {String}**          - Returns the sliced selector.
         */
        var ref;
        if ((((ref = this._options) != null ? ref.domNodeSelectorPrefix : void 0) != null) && this.stringStartsWith(domNodeSelector, this._options.domNodeSelectorPrefix)) {
          return $.trim(domNodeSelector.substring(this._options.domNodeSelectorPrefix.length));
        }
        return domNodeSelector;
      };

      Tools.prototype.getDomNodeName = function(domNodeSelector) {

        /*
            Determines the dom node name of a given dom node string.
        
            **domNodeSelector {String}** - A given to dom node selector to
                                           determine its name.
        
            **returns {String}**         - Returns the dom node name.
        
            **examples**
        
            >>> $.Tools.getDomNodeName('&lt;div&gt;');
            'div'
        
            >>> $.Tools.getDomNodeName('&lt;div&gt;&lt;/div&gt;');
            'div'
        
            >>> $.Tools.getDomNodeName('&lt;br/&gt;');
            'br'
         */
        return domNodeSelector.match(new RegExp('^<?([a-zA-Z]+).*>?.*'))[1];
      };

      Tools.prototype.grabDomNode = function(domNodeSelectors, wrapperDomNode) {

        /*
            Converts an object of dom selectors to an array of $ wrapped
            dom nodes. Note if selector description as one of "class" or
            "id" as suffix element will be ignored.
        
            **domNodeSelectors {Object}** - An object with dom node
                                            selectors.
        
            **wrapperDomNode {DomNode}**  - A dom node to be the parent or
                                            wrapper of all retrieved dom
                                            nodes.
        
            **returns {Object}**          - Returns all $ wrapped dom nodes
                                            corresponding to given
                                            selectors.
         */
        var domNodes;
        domNodes = {};
        if (domNodeSelectors != null) {
          if (wrapperDomNode != null) {
            wrapperDomNode = $(wrapperDomNode);
            $.each(domNodeSelectors, function(key, value) {
              return domNodes[key] = wrapperDomNode.find(value);
            });
          } else {
            $.each(domNodeSelectors, (function(_this) {
              return function(key, value) {
                var match;
                match = value.match(', *');
                if (match) {
                  $.each(value.split(match[0]), function(key, valuePart) {
                    if (key) {
                      return value += ', ' + _this._grabDomNodeHelper(key, valuePart, domNodeSelectors);
                    } else {
                      return value = valuePart;
                    }
                  });
                }
                return domNodes[key] = $(_this._grabDomNodeHelper(key, value, domNodeSelectors));
              };
            })(this));
          }
        }
        if (this._options.domNodeSelectorPrefix) {
          domNodes.parent = $(this._options.domNodeSelectorPrefix);
        }
        domNodes.window = $(window);
        domNodes.document = $(document);
        return domNodes;
      };

      Tools.prototype.isolateScope = function(scope, prefixesToIgnore) {
        var name, object;
        if (prefixesToIgnore == null) {
          prefixesToIgnore = ['$', '_'];
        }

        /*
            Overwrites all inherited variables from parent scope with
            "undefined".
        
            **scope {Object}**            - A scope where inherited names
                                            will be removed.
        
            **prefixesToIgnore String[]** - Name prefixes to ignore during
                                            deleting names in given scope.
        
            **returns {Object}**          - The isolated scope.
         */
        for (name in scope) {
          object = scope[name];
          if (prefixesToIgnore.indexOf(name.charAt(0)) === -1 && ['this', 'constructor'].indexOf(name) === -1 && !scope.hasOwnProperty(name)) {
            scope[name] = void 0;
          }
        }
        return scope;
      };

      Tools.prototype.determineUniqueScopeName = function(prefix, scope) {
        var uniqueName;
        if (prefix == null) {
          prefix = 'callback';
        }
        if (scope == null) {
          scope = window;
        }

        /*
            Generates a unique function name needed for jsonp requests.
        
            **scope {Object}**   - A scope where the name should be unique.
        
            **returns {String}** - The function name.
         */
        while (true) {
          uniqueName = prefix + window.parseInt(window.Math.random() * window.Math.pow(10, 10));
          if (scope[uniqueName] == null) {
            break;
          }
        }
        return uniqueName;
      };

      Tools.prototype.getMethod = function() {
        var additionalArguments, method, parameter, scope;
        method = arguments[0], scope = arguments[1], additionalArguments = 3 <= arguments.length ? slice.call(arguments, 2) : [];
        if (scope == null) {
          scope = this;
        }

        /*
            Methods given by this method has the plugin scope referenced
            with "this". Otherwise "this" usually points to the object the
            given method was attached to. If "method" doesn't match string
            arguments are passed through "$.proxy()" with "context" setted
            as "scope" or "this" if nothing is provided.
        
            **method {String|Function|Object}** - A method name of given
                                                  scope.
        
            **scope {Object|String}**           - A given scope.
        
            **returns {Mixed}**                 - Returns the given methods
                                                  return value.
         */

        /*
            This following outcomment line would be responsible for a
            bug in yuicompressor.
            Because of declaration of arguments the parser things that
            arguments is a local variable and could be renamed.
            It doesn't care about that the magic arguments object is
            necessary to generate the arguments array in this context.
        
            var arguments = this.argumentsObjectToArray(arguments);
        
            use something like this instead:
        
            var parameter = this.argumentsObjectToArray(arguments);
         */
        parameter = this.argumentsObjectToArray(arguments);
        if ($.type(method) === 'string' && $.type(scope) === 'object') {
          return function() {
            var thisFunction;
            if (!scope[method]) {
              $.error(("Method \"" + method + "\" doesn't exists in ") + ("\"" + scope + "\"."));
            }
            thisFunction = arguments.callee;
            parameter = $.Tools().argumentsObjectToArray(arguments);
            parameter.push(thisFunction);
            return scope[method].apply(scope, parameter.concat(additionalArguments));
          };
        }
        parameter.unshift(scope);
        parameter.unshift(method);
        return $.proxy.apply($, parameter);
      };

      Tools.prototype.identity = function(value) {

        /*
            Implements the identity function.
        
            **value {Object}**   - A value to return.
        
            **returns {Object}** - Returns the given value.
         */
        return value;
      };

      Tools.prototype.invertArrayFilter = function(filter) {

        /*
            Inverted filter helper to inverse each given filter.
        
            **filter {Function}**  - A function that filters an array.
        
            **returns {Function}** - The inverted filter.
         */
        return function(data) {
          var date, filteredData, i, len, result;
          if (data) {
            filteredData = filter.apply(this, arguments);
            result = [];
            if (filteredData.length) {
              for (i = 0, len = data.length; i < len; i++) {
                date = data[i];
                if (indexOf.call(filteredData, date) < 0) {
                  result.push(date);
                }
              }
            } else {
              result = data;
            }
            return result;
          }
          return data;
        };
      };

      Tools.prototype.debounce = function() {
        var additionalArguments, eventFunction, lock, self, thresholdInMilliseconds, timeoutID, waitingCallArguments;
        eventFunction = arguments[0], thresholdInMilliseconds = arguments[1], additionalArguments = 3 <= arguments.length ? slice.call(arguments, 2) : [];
        if (thresholdInMilliseconds == null) {
          thresholdInMilliseconds = 600;
        }

        /*
            Prevents event functions from triggering to often by defining a
            minimal span between each function call. Additional arguments
            given to this function will be forwarded to given event
            function call. The function wrapper returns null if current
            function will be omitted due to debounceing.
        
            **eventFunction** {Function}         - The function to call
                                                   debounced
        
            **thresholdInMilliseconds** {Number} - The minimum time span
                                                   between each function
                                                   call
        
            **returns {Function}**               - Returns the wrapped
                                                   method
         */
        lock = false;
        waitingCallArguments = null;
        self = this;
        timeoutID = null;
        return function() {
          var parameter;
          parameter = self.argumentsObjectToArray(arguments);
          if (lock) {
            waitingCallArguments = parameter.concat(additionalArguments || []);
            null;
          } else {
            lock = true;
            timeoutID = window.setTimeout(((function(_this) {
              return function() {
                lock = false;
                if (waitingCallArguments) {
                  eventFunction.apply(_this, waitingCallArguments);
                  return waitingCallArguments = null;
                }
              };
            })(this)), thresholdInMilliseconds);
            eventFunction.apply(this, parameter.concat(additionalArguments || []));
          }
          return timeoutID;
        };
      };

      Tools.prototype.fireEvent = function() {
        var additionalArguments, callOnlyOptionsMethod, eventHandlerName, eventName, scope;
        eventName = arguments[0], callOnlyOptionsMethod = arguments[1], scope = arguments[2], additionalArguments = 4 <= arguments.length ? slice.call(arguments, 3) : [];
        if (callOnlyOptionsMethod == null) {
          callOnlyOptionsMethod = false;
        }
        if (scope == null) {
          scope = this;
        }

        /*
            Searches for internal event handler methods and runs them by
            default. In addition this method searches for a given event
            method by the options object. Additional arguments are
            forwarded to respective event functions.
        
            **eventName {String}                - An event name.
        
            **callOnlyOptionsMethod {Boolean}** - Prevents from trying to
                                                  call an internal event
                                                  handler.
        
            **scope {Object}**                  - The scope from where the
                                                  given event handler
                                                  should be called.
        
            **returns {Boolean}**               - Returns "true" if an
                                                  event handler was called
                                                  and "false" otherwise.
         */
        if (!scope) {
          scope = this;
        }
        eventHandlerName = "on" + (this.stringCapitalize(eventName));
        if (!callOnlyOptionsMethod) {
          if (scope[eventHandlerName]) {
            scope[eventHandlerName].apply(scope, additionalArguments);
          } else if (scope["_" + eventHandlerName]) {
            scope["_" + eventHandlerName].apply(scope, additionalArguments);
          }
        }
        if (scope._options && scope._options[eventHandlerName]) {
          scope._options[eventHandlerName].apply(scope, additionalArguments);
          return true;
        }
        return false;
      };

      Tools.prototype.on = function() {

        /*
            A wrapper method for "$.on()". It sets current plugin name as
            event scope if no scope is given. Given arguments are modified
            and passed through "$.on()".
        
            **returns {$}** - Returns $'s grabbed dom node.
         */
        return this._bindHelper(arguments, false);
      };

      Tools.prototype.off = function() {

        /*
            A wrapper method fo "$.off()". It sets current plugin name as
            event scope if no scope is given. Given arguments are modified
            and passed through "$.off()".
        
            **returns {$}** - Returns $'s grabbed dom node.
         */
        return this._bindHelper(arguments, true, 'off');
      };

      Tools.prototype.forEachSorted = function(object, iterator, context) {

        /*
            Iterates given objects own properties in sorted fashion. For
            each key value pair given iterator function will be called with
            value and key as arguments.
        
            **object {Object}**     - Object to iterate.
        
            **iterator {Function}** - Function to execute for each key
                                      value pair. Value will be the first
                                      and key will be the second argument.
        
            **context {Object}**    - The "this" binding for given iterator
                                      function.
        
            **returns {Object[]}**  - List of given sorted keys.
         */
        var i, key, keys, len;
        keys = this.sort(object);
        for (i = 0, len = keys.length; i < len; i++) {
          key = keys[i];
          iterator.call(context, object[key], key);
        }
        return keys;
      };

      Tools.prototype.sort = function(object) {

        /*
            Sort given objects keys.
        
            **object {Object}**    - Object which keys should be sorted.
        
            **returns {Object[]}** - Sorted list of given keys.
         */
        var isArray, key, keys, value;
        isArray = $.isArray(object);
        keys = [];
        for (key in object) {
          value = object[key];
          if (isArray) {
            key = window.parseInt(key);
          }
          if (object.hasOwnProperty(key)) {
            keys.push(key);
          }
        }
        return keys.sort();
      };

      Tools.prototype.equals = function(firstValue, secondValue, properties, deep, exceptionPrefixes, ignoreFunctions) {
        var equal, first, firstIsArray, i, len, ref, ref1, second;
        if (properties == null) {
          properties = null;
        }
        if (deep == null) {
          deep = -1;
        }
        if (exceptionPrefixes == null) {
          exceptionPrefixes = ['$', '_'];
        }
        if (ignoreFunctions == null) {
          ignoreFunctions = true;
        }

        /*
            Returns true if given items are equal for given property list.
            If property list isn't set all properties will be checked. All
            keys which starts with one of the exception prefixes will be
            omitted.
        
            **firstValue {Mixed}**           - First object to compare.
        
            **secondValue {Mixed}**          - Second object to compare.
        
            **properties {String[]}**        - Property names to check.
                                               Check all if "null" is
                                               selected (default).
        
            **deep {Integer}**               - Recursion depth negative
                                               values means infinitely deep
                                               (default).
        
            **exceptionPrefixes {String[]}** - Property prefixes which
                                               indicates properties to
                                               ignore.
        
            **ignoreFunctions {Boolean}* *   - Indicates weather functions
                                               have to be identical to
                                               interpret is as equal.
                                               If set to "true" two
                                               functions will be assumed to
                                               be equal (default).
        
            **returns {Boolean}**            - "true" if both objects are
                                               equal and "false" otherwise.
         */
        if (ignoreFunctions && $.isFunction(firstValue) && $.isFunction(secondValue) || firstValue === secondValue || this.numberIsNotANumber(firstValue) && this.numberIsNotANumber(secondValue) || firstValue instanceof window.RegExp && secondValue instanceof window.RegExp && firstValue.toString() === secondValue.toString() || firstValue instanceof window.Date && secondValue instanceof window.Date && (window.isNaN(firstValue.getTime()) && window.isNaN(secondValue.getTime()) || !window.isNaN(firstValue.getTime()) && !window.isNaN(secondValue.getTime()) && firstValue.getTime() === secondValue.getTime())) {
          return true;
        }
        if ($.isPlainObject(firstValue) && $.isPlainObject(secondValue) && !(firstValue instanceof window.RegExp || secondValue instanceof window.RegExp) || $.isArray(firstValue) && $.isArray(secondValue)) {
          equal = true;
          ref = [[firstValue, secondValue], [secondValue, firstValue]];
          for (i = 0, len = ref.length; i < len; i++) {
            ref1 = ref[i], first = ref1[0], second = ref1[1];
            firstIsArray = $.isArray(first);
            if (firstIsArray && (!$.isArray(second)) || first.length !== second.length) {
              return false;
            }
            $.each(first, (function(_this) {
              return function(key, value) {
                var exceptionPrefix, j, len1;
                if (!firstIsArray) {
                  if (!equal || (properties != null) && indexOf.call(properties, key) < 0) {
                    return;
                  }
                  for (j = 0, len1 = exceptionPrefixes.length; j < len1; j++) {
                    exceptionPrefix = exceptionPrefixes[j];
                    if (_this.stringStartsWith(key.toString(), exceptionPrefix)) {
                      return;
                    }
                  }
                }
                if (deep !== 0 && !_this.equals(value, second[key], properties, deep - 1, exceptionPrefixes)) {
                  return equal = false;
                }
              };
            })(this));
          }
          return equal;
        }
        return false;
      };

      Tools.prototype.argumentsObjectToArray = function(argumentsObject) {

        /*
            Converts the interpreter given magic arguments object to a
            standard array object.
        
            **argumentsObject {Object}** - An argument object.
        
            **returns {Object[]}**       - Returns the array containing all
                                           elements in given arguments
                                           object.
         */
        return window.Array.prototype.slice.call(argumentsObject);
      };

      Tools.prototype.arrayUnique = function(data) {

        /*
            Makes all values in given iterable unique by removing
            duplicates (The first occurrences will be left).
        
            **data {Object}**    - Array like object.
        
            **returns {Object}** - Sliced version of given object.
         */
        var index, result, value;
        result = [];
        for (index in data) {
          value = data[index];
          if (indexOf.call(result, value) < 0) {
            result.push(value);
          }
        }
        return result;
      };

      Tools.prototype.arrayAggregatePropertyIfEqual = function(data, propertyName, defaultValue) {
        var i, item, len, result;
        if (defaultValue == null) {
          defaultValue = '';
        }

        /*
            Summarizes given property of given item list.
        
            **data {Object[]}**       - Array of objects with given
                                        property name.
        
            **propertyName {String}** - Property name to summarize.
        
            **defaultValue {Mixed}**  - Value to return if property values
                                        doesn't match.
         */
        result = defaultValue;
        if ((data != null ? data.length : void 0) && (data[0][propertyName] != null)) {
          result = data[0][propertyName];
          for (i = 0, len = data.length; i < len; i++) {
            item = data[i];
            if (item[propertyName] !== result) {
              return defaultValue;
            }
          }
        }
        return result;
      };

      Tools.prototype.arrayDeleteEmptyItems = function(data, propertyNames) {
        var empty, i, item, len, propertyName, result, value;
        if (propertyNames == null) {
          propertyNames = [];
        }

        /*
            Deletes every item witch has only empty attributes for given
            property names. If given property names are empty each
            attribute will be considered. The empty string, "null" and
            "undefined" will be interpreted as empty.
        
            **data {Object[]}**          - Data to filter.
        
            **propertyNames {String[]}** - Properties to consider.
        
            **returns {Object[]}**       - Given data without empty items.
         */
        if (data == null) {
          return data;
        }
        result = [];
        for (i = 0, len = data.length; i < len; i++) {
          item = data[i];
          empty = true;
          for (propertyName in item) {
            value = item[propertyName];
            if ((value !== '' && value !== null && value !== (void 0)) && (!propertyNames.length || indexOf.call(propertyNames, propertyName) >= 0)) {
              empty = false;
              break;
            }
          }
          if (!empty) {
            result.push(item);
          }
        }
        return result;
      };

      Tools.prototype.arrayExtract = function(data, propertyNames) {

        /*
            Extracts all properties from all items wich occur in given
            property names.
        
            **data {Object[]}**          - Data where each item should be
                                           sliced.
        
            **propertyNames {String[]}** - Property names to extract.
        
            **returns {Object[]}**       - Data with sliced items.
         */
        var attributeName, i, item, len;
        for (i = 0, len = data.length; i < len; i++) {
          item = data[i];
          for (attributeName in item) {
            if (indexOf.call(propertyNames, attributeName) < 0) {
              delete item[attributeName];
            }
          }
        }
        return data;
      };

      Tools.prototype.arrayExtractIfMatches = function(data, regularExpression) {

        /*
            Extracts all values which matches given regular expression.
        
            **data {String[]}**            - Data to filter.
        
            **regularExpression {String}** - Pattern to match for.
        
            **returns {String[]}**         - Filtered data.
         */
        var result;
        result = [];
        $.each(data, function(index, value) {
          if ((new window.RegExp(regularExpression)).test(value)) {
            return result.push(value);
          }
        });
        return result;
      };

      Tools.prototype.arrayExtractIfPropertyExists = function(data, propertyName) {

        /*
            Filters given data if given property is set or not.
        
            **data {Object[]}**       - Data to filter.
        
            **propertyName {String}** - Property name to check for
                                        existence.
        
            **returns {Object[]}**    - Given data without the items which
                                        doesn't have specified property.
         */
        var exists, i, item, key, len, result, value;
        if (data && propertyName) {
          result = [];
          for (i = 0, len = data.length; i < len; i++) {
            item = data[i];
            exists = false;
            for (key in item) {
              value = item[key];
              if (key === propertyName && (value != null)) {
                exists = true;
                break;
              }
            }
            if (exists) {
              result.push(item);
            }
          }
          return result;
        }
        return data;
      };

      Tools.prototype.arrayExtractIfPropertyMatches = function(data, propertyPattern) {

        /*
            Extract given data where specified property value matches given
            patterns.
        
            **data {Object[]}**          - Data to filter.
        
            **propertyPattern {Object}** - Mapping of property names to
                                           pattern.
        
            **returns {Object[]}**       - Filtered data.
         */
        var i, item, key, len, matches, pattern, result;
        if (data && propertyPattern) {
          result = [];
          for (i = 0, len = data.length; i < len; i++) {
            item = data[i];
            matches = true;
            for (key in propertyPattern) {
              pattern = propertyPattern[key];
              if (!window.RegExp(pattern).test(item[key])) {
                matches = false;
                break;
              }
            }
            if (matches) {
              result.push(item);
            }
          }
          return result;
        }
        return data;
      };

      Tools.prototype.arrayIntersect = function(firstSet, secondSet, keys, strict) {
        var containingData, exists, i, initialItem, iterateGivenKeys, j, len, len1, newItem;
        if (keys == null) {
          keys = [];
        }
        if (strict == null) {
          strict = true;
        }

        /*
            Determines all objects which exists in "firstSet" and in
            "secondSet". Object key which will be compared are given by
            "keys". If an empty array is given each key will be compared.
            If an object is given corresponding initial data key will be
            mapped to referenced new data key.
        
            **firstSet {Mixed[]}**     - Referenced data to check for.
        
            **secondSet {Mixed[]}**    - Data to check for existence.
        
            **keys {Object|String[]}** - Keys to define equality.
        
            **strict {Boolean}**       - The strict parameter indicates
                                         weather "null" and "undefined"
                                         should be interpreted as equal
                                         (takes only effect if given keys
                                         aren't empty).
        
            **returns {Mixed[]} **     - Data which does exit in given
                                         initial data.
         */
        containingData = [];
        for (i = 0, len = firstSet.length; i < len; i++) {
          initialItem = firstSet[i];
          if ($.isPlainObject(initialItem)) {
            exists = false;
            for (j = 0, len1 = secondSet.length; j < len1; j++) {
              newItem = secondSet[j];
              exists = true;
              iterateGivenKeys = $.isPlainObject(keys) || keys.length;
              if (!iterateGivenKeys) {
                keys = initialItem;
              }
              $.each(keys, function(firstSetKey, secondSetKey) {
                if ($.isArray(keys)) {
                  firstSetKey = secondSetKey;
                } else if (!iterateGivenKeys) {
                  secondSetKey = firstSetKey;
                }
                if (newItem[secondSetKey] !== initialItem[firstSetKey] && (strict || ([null, void 0].indexOf(newItem[secondSetKey]) === -1 || [null, void 0].indexOf(initialItem[firstSetKey]) === -1))) {
                  exists = false;
                  return false;
                }
              });
              if (exists) {
                break;
              }
            }
          } else {
            exists = secondSet.indexOf(initialItem) !== -1;
          }
          if (exists) {
            containingData.push(initialItem);
          }
        }
        return containingData;
      };

      Tools.prototype.arrayMakeRange = function(range, step) {
        var higherBound, index, result;
        if (step == null) {
          step = 1;
        }

        /*
            Creates a list of items within given range.
        
            **range {Integer[]}**   - Array of lower and upper bounds. If
                                      only one value is given lower bound
                                      will be assumed to be zero. Both
                                      integers have to be positive and will
                                      be contained in the resulting array.
        
            **step {Integer}**      - Space between two consecutive values.
        
            **returns {Integer[]}** - Produced array of integers.
         */
        if (range.length === 1) {
          index = 0;
          higherBound = window.parseInt(range[0]);
        } else if (range.length === 2) {
          index = window.parseInt(range[0]);
          higherBound = window.parseInt(range[1]);
        } else {
          return range;
        }
        result = [index];
        while (index <= higherBound - step) {
          index += step;
          result.push(index);
        }
        return result;
      };

      Tools.prototype.arraySumUpProperty = function(data, propertyName) {

        /*
            Sums up given property of given item list.
        
            **data {Object[]}**        - The objects to with the given
                                         property to sum up.
        
            **propertyNames {String}** - Property name to sum up its value.
        
            **returns {Number}**       - The aggregated value.
         */
        var i, item, len, result;
        result = 0;
        if (data != null ? data.length : void 0) {
          for (i = 0, len = data.length; i < len; i++) {
            item = data[i];
            result += window.parseFloat(item[propertyName] || 0);
          }
        }
        return result;
      };

      Tools.prototype.arrayAppendAdd = function(item, target, name, checkIfExists) {
        if (checkIfExists == null) {
          checkIfExists = true;
        }

        /*
            Adds an item to another item as array connection (many to one).
        
            **item {Object}**           - Item where the item should be
                                          appended to.
        
            **target {Object}**         - Target to add to given item.
        
            **name {String}**           - Name of the target connection.
        
            **checkIfExists {Boolean}** - Indicates if duplicates are
                                          allowed in resulting list (will
                                          result in linear runtime instead
                                          of constant one).
        
            **returns {Object}** - Item with the appended target.
         */
        if (item.hasOwnProperty(name)) {
          if (!(checkIfExists && indexOf.call(item[name], target) >= 0)) {
            item[name].push(target);
          }
        } else {
          item[name] = [target];
        }
        return item;
      };

      Tools.prototype.arrayRemove = function(list, target, strict) {
        var index;
        if (strict == null) {
          strict = false;
        }

        /*
            Removes given target on given list.
        
            **list {Object[]}**    - Array to splice.
        
            **target {Object}**    - Target to remove from given list.
        
            **strict {Boolean}**   - Indicates weather to fire an exception
                                     if given target doesn't exists given
                                     list.
        
            **returns {Object[]}** - Item with the appended target.
         */
        if ((list != null) || strict) {
          index = list.indexOf(target);
          if (index === -1) {
            if (strict) {
              throw window.Error("Given target doesn't exists in given list.");
            }
          } else {
            list.splice(index, 1);
          }
        }
        return list;
      };

      Tools.prototype.stringEncodeURIComponent = function(url, encodeSpaces) {

        /*
            This method is intended for encoding *key* or *value* parts of
            query component. We need a custom method because
            "window.encodeURIComponent()" is too aggressive and encodes
            stuff that doesn't have to be encoded per
            "http://tools.ietf.org/html/rfc3986:"
        
            **url {String}**           - URL to encode.
        
            **encodeSpaces {Boolean}** - Indicates weather given url should
                                         encode whitespaces as "+" or
                                         "%20".
        
            **return {String}**        - Encoded given url.
         */
        return window.encodeURIComponent(url).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, encodeSpaces ? '%20' : '+');
      };

      Tools.prototype.stringAddSeparatorToPath = function(path, pathSeparator) {
        if (pathSeparator == null) {
          pathSeparator = '/';
        }

        /*
            Appends a path selector to the given path if there isn't one
            yet.
        
            **path {String}**          - The path for appending a selector.
        
            **pathSeparator {String}** - The selector for appending to
                                         path.
        
            **returns {String}**       - The appended path.
         */
        path = $.trim(path);
        if (path.substr(-1) !== pathSeparator && path.length) {
          return path + pathSeparator;
        }
        return path;
      };

      Tools.prototype.stringHasPathPrefix = function(prefix, path, separator) {
        if (prefix == null) {
          prefix = '/admin';
        }
        if (path == null) {
          path = window.location.pathname;
        }
        if (separator == null) {
          separator = '/';
        }

        /*
            Checks if given path has given path prefix.
        
            **prefix {String}**    - Path prefix to search for.
        
            **path {String}**      - Path to search in.
        
            **separator {String}** - Delimiter to use in path (default is
                                     the posix conform slash).
        
            **returns {Boolean}**  - "true" if given prefix occur and
                                     "false" otherwise.
         */
        if (prefix == null) {
          return false;
        }
        if (!this.stringEndsWith(prefix, separator)) {
          prefix += separator;
        }
        return path === prefix.substring(0, prefix.length - separator.length) || this.stringStartsWith(path, prefix);
      };

      Tools.prototype.stringGetDomainName = function(url, fallback) {
        var result;
        if (url == null) {
          url = window.location.href;
        }
        if (fallback == null) {
          fallback = window.location.hostname;
        }

        /*
            Extracts domain name from given url. If no explicit domain name
            given current domain name will be assumed. If no parameter
            given current domain name will be determined.
        
            **url** {String}      - The url to extract domain from.
        
            **fallback** {String} - The fallback host name if no one exits
                                    in given url (default is current
                                    hostname)
        
            **returns {String}** - Extracted domain.
         */
        result = /^([a-z]*:?\/\/)?([^\/]+?)(?::[0-9]+)?(?:\/.*|$)/i.exec(url);
        if (((result != null ? result[2] : void 0) != null) && ((result != null ? result[1] : void 0) != null)) {
          return result[2];
        }
        return fallback;
      };

      Tools.prototype.stringGetPortNumber = function(url, fallback, parameter) {
        var result;
        if (url == null) {
          url = window.location.href;
        }
        if (fallback == null) {
          fallback = null;
        }
        if (parameter == null) {
          parameter = [];
        }

        /*
            Extracts port number from given url. If no explicit port number
            given and no fallback is defined current port number will be
            assumed for local links. For external links 80 will be assumed
            for http protocol or 443 for https.
        
            **url** {String}        - The url to extract port from.
        
            **fallback {String}**   - Fallback port number if no explicit
                                      one was found. Default is derived
                                      from current protocol name.
        
            **parameter {Object[]}** - Additional parameter for checking if
                                       given url is an internal url. Given
                                       url and this parameter will be
                                       forwarded to the
                                       "stringIsInternalURL()" method.
        
            **returns {Integer}** - Extracted port number.
         */
        result = /^(?:[a-z]*:?\/\/[^\/]+?)?(?:[^\/]+?):([0-9]+)/i.exec(url);
        if ((result != null ? result[1] : void 0) != null) {
          return window.parseInt(result[1]);
        }
        if (fallback !== null) {
          return fallback;
        }
        if (this.stringIsInternalURL.apply(this, [url].concat(parameter)) && window.location.port && window.parseInt(window.location.port)) {
          return window.parseInt(window.location.port);
        }
        if (this.stringGetProtocolName(url) === 'https') {
          return 443;
        } else {
          return 80;
        }
      };

      Tools.prototype.stringGetProtocolName = function(url, fallback) {
        var result;
        if (url == null) {
          url = window.location.href;
        }
        if (fallback == null) {
          fallback = window.location.protocol.substring(0, window.location.protocol.length - 1);
        }

        /*
            Extracts protocol name from given url. If no explicit url is
            given, current protocol will be assumed. If no parameter
            given current protocol number will be determined.
        
            **url** {String}      - The url to extract protocol from.
        
            **fallback** {String} - Fallback port to use if no protocol
                                    exists in given url (default is current
                                    protocol).
        
            **returns {String}**  - Extracted protocol.
         */
        result = /^([a-z]+):\/\//i.exec(url);
        if (result != null ? result[1] : void 0) {
          return result[1];
        }
        return fallback;
      };

      Tools.prototype.stringGetURLVariable = function(keyToGet, input, subDelimiter, hashedPathIndicator, search, hash) {
        var both, data, decodedHash, pathAndSearch, subDelimiterPosition, subHashStartIndex, subSearchStartIndex, variables;
        if (subDelimiter == null) {
          subDelimiter = '$';
        }
        if (hashedPathIndicator == null) {
          hashedPathIndicator = '!';
        }
        if (hash == null) {
          hash = window.location.hash;
        }

        /*
            Read a page's GET URL variables and return them as an
            associative array and preserves ordering.
        
            **keyToGet {String}**            - If key given the
                                               corresponding value is
                                               returned and full object
                                               otherwise.
        
            **input {String}**               - An alternative input to the
                                               url search parameter. If "#"
                                               is given the complete
                                               current hash tag will be
                                               interpreted as url and
                                               search parameter will be
                                               extracted from there. If "&"
                                               is given classical search
                                               parameter and hash parameter
                                               will be taken in account. If
                                               a search string is given
                                               this will be analyzed. The
                                               default is to take given
                                               search part into account.
        
            **subDelimiter {String}**        - Defines which sequence
                                               indicates the start of
                                               parameter in a hash part of
                                               the url.
        
            **hashedPathIndicator {String}** - If defined and given hash
                                               starts with this indicator
                                               given hash will be
                                               interpreted as path
                                               containing search and hash
                                               parts.
        
            **search {String}**              - Search part to take into
                                               account defaults to current
                                               url search part.
        
            **hash {String}**                - Hash part to take into
                                               account defaults to current
                                               url hash part.
        
            **returns {Mixed}**              - Returns the current get
                                               array or requested value. If
                                               requested key doesn't exist
                                               "undefined" is returned.
         */
        if (search == null) {
          if (!hash) {
            hash = '#';
          }
          hash = hash.substring('#'.length);
          if (hashedPathIndicator && this.stringStartsWith(hash, hashedPathIndicator)) {
            subHashStartIndex = hash.indexOf('#');
            if (subHashStartIndex === -1) {
              pathAndSearch = hash.substring(hashedPathIndicator.length);
              hash = '';
            } else {
              pathAndSearch = hash.substring(hashedPathIndicator.length, subHashStartIndex);
              hash = hash.substring(subHashStartIndex);
            }
            subSearchStartIndex = pathAndSearch.indexOf('?');
            if (subSearchStartIndex === -1) {
              search = '';
            } else {
              search = pathAndSearch.substring(subSearchStartIndex);
            }
          } else {
            search = window.location.search;
          }
        }
        if (!input) {
          input = search;
        }
        both = input === '&';
        if (both || input === '#') {
          decodedHash = decodeURIComponent(hash);
          subDelimiterPosition = decodedHash.indexOf(subDelimiter);
          if (subDelimiterPosition === -1) {
            input = '';
          } else {
            input = decodedHash.substring(subDelimiterPosition);
            if (this.stringStartsWith(input, subDelimiter)) {
              input = input.substring(subDelimiter.length);
            }
          }
        } else if (this.stringStartsWith(input, '?')) {
          input = input.substring('?'.length);
        }
        data = input ? input.split('&') : [];
        search = search.substring('?'.length);
        if (both && search) {
          data = data.concat(search.split('&'));
        }
        variables = [];
        $.each(data, function(key, value) {
          var keyValuePair;
          keyValuePair = value.split('=');
          key = window.decodeURIComponent(keyValuePair[0]);
          value = window.decodeURIComponent(keyValuePair[1]);
          variables.push(key);
          return variables[key] = value;
        });
        if (keyToGet != null) {
          return variables[keyToGet];
        }
        return variables;
      };

      Tools.prototype.stringIsInternalURL = function(firstURL, secondURL) {
        var explicitDomainName, explicitPortNumber, explicitProtocolName;
        if (secondURL == null) {
          secondURL = window.location.href;
        }

        /*
            Checks if given url points to another domain than second given
            url. If no second given url provided current url will be
            assumed.
        
            **firstURL {String}**  - URL to check against second url.
        
            **secondURL {String}** - URL to check against first url.
        
            **returns {Boolean}**  - Returns "true" if given first url has
                                     same domain as given second (or
                                     current) or.
         */
        explicitDomainName = this.stringGetDomainName(firstURL, false);
        explicitProtocolName = this.stringGetProtocolName(firstURL, false);
        explicitPortNumber = this.stringGetPortNumber(firstURL, false);
        return (!explicitDomainName || explicitDomainName === this.stringGetDomainName(secondURL)) && (!explicitProtocolName || explicitProtocolName === this.stringGetProtocolName(secondURL)) && (!explicitPortNumber || explicitPortNumber === this.stringGetPortNumber(secondURL));
      };

      Tools.prototype.stringNormalizeURL = function(url) {

        /*
            Normalized given website url.
        
            **url {String}**     - Uniform resource locator to normalize.
        
            **returns {String}** - Normalized result.
         */
        if (url) {
          url = $.trim(url.replace(/^:?\/+/, '').replace(/\/+$/, ''));
          if (this.stringStartsWith(url, 'http')) {
            return url;
          }
          return "http://" + url;
        }
        return '';
      };

      Tools.prototype.stringRepresentURL = function(url) {

        /*
            Represents given website url.
        
            **url {String}**     - Uniform resource locator to represent.
        
            **returns {String}** - Represented result.
         */
        if (url) {
          return $.trim(url.replace(/^(https?)?:?\/+/, '').replace(/\/+$/, ''));
        }
        return '';
      };

      Tools.prototype.stringCamelCaseToDelimited = function(string, delimiter, abbreviations) {
        var abbreviation, abbreviationPattern, escapedDelimiter, i, len;
        if (delimiter == null) {
          delimiter = '-';
        }
        if (abbreviations == null) {
          abbreviations = null;
        }

        /*
            Converts a camel cased string to its delimited string version.
        
            **string {String}**          - The string to format.
        
            **delimiter {String}**       - Delimiter string
        
            **abbreviations {String[]}** - Collection of shortcut words to
                                           represent upper cased.
        
            **returns {String}**         - The formatted string.
         */
        if (abbreviations == null) {
          abbreviations = this.abbreviations;
        }
        escapedDelimiter = this.stringGetRegularExpressionValidated(delimiter);
        if (abbreviations.length) {
          abbreviationPattern = '';
          for (i = 0, len = abbreviations.length; i < len; i++) {
            abbreviation = abbreviations[i];
            if (abbreviationPattern) {
              abbreviationPattern += '|';
            }
            abbreviationPattern += abbreviation.toUpperCase();
          }
          string = string.replace(new window.RegExp("(" + abbreviationPattern + ")(" + abbreviationPattern + ")", 'g'), "$1" + delimiter + "$2");
        }
        string = string.replace(new window.RegExp("([^" + escapedDelimiter + "])([A-Z][a-z]+)", 'g'), "$1" + delimiter + "$2");
        return string.replace(new window.RegExp('([a-z0-9])([A-Z])', 'g'), "$1" + delimiter + "$2").toLowerCase();
      };

      Tools.prototype.stringCapitalize = function(string) {

        /*
            Converts a string to its capitalize representation.
        
            **string {String}**  - The string to format.
        
            **returns {String}** - The formatted string.
         */
        return string.charAt(0).toUpperCase() + string.substring(1);
      };

      Tools.prototype.stringDelimitedToCamelCase = function(string, delimiter, abbreviations, preserveWrongFormattedAbbreviations) {
        var abbreviation, abbreviationPattern, escapedDelimiter, i, len, stringStartsWithDelimiter;
        if (delimiter == null) {
          delimiter = '-';
        }
        if (abbreviations == null) {
          abbreviations = null;
        }
        if (preserveWrongFormattedAbbreviations == null) {
          preserveWrongFormattedAbbreviations = false;
        }

        /*
            Converts a delimited string to its camel case representation.
        
            **string {String}**          - The string to format.
        
            **delimiter {String}**       - Delimiter string
        
            **abbreviations {String[]}** - Collection of shortcut words to
                                           represent upper cased.
        
            **preserveWrongFormattedAbbreviations {Boolean}**
                                         - If set to "True" wrong formatted
                                           camel case abbreviations will
                                           be ignored.
        
            **returns {String}**         - The formatted string.
         */
        escapedDelimiter = this.stringGetRegularExpressionValidated(delimiter);
        if (abbreviations == null) {
          abbreviations = this.abbreviations;
        }
        if (preserveWrongFormattedAbbreviations) {
          abbreviationPattern = abbreviations.join('|');
        } else {
          abbreviationPattern = '';
          for (i = 0, len = abbreviations.length; i < len; i++) {
            abbreviation = abbreviations[i];
            if (abbreviationPattern) {
              abbreviationPattern += '|';
            }
            abbreviationPattern += (this.stringCapitalize(abbreviation)) + "|" + abbreviation;
          }
        }
        stringStartsWithDelimiter = false;
        if (this.stringStartsWith(string, delimiter)) {
          string = string.substring(delimiter.length);
          stringStartsWithDelimiter = true;
        }
        string = string.replace(new window.RegExp(("(" + escapedDelimiter + ")(" + abbreviationPattern + ")") + ("(" + escapedDelimiter + "|$)"), 'g'), function(fullMatch, before, abbreviation, after) {
          if (fullMatch) {
            return before + abbreviation.toUpperCase() + after;
          }
          return fullMatch;
        });
        string = string.replace(new window.RegExp(escapedDelimiter + "([a-zA-Z0-9])", 'g'), function(fullMatch, firstLetter) {
          if (fullMatch) {
            return firstLetter.toUpperCase();
          }
          return fullMatch;
        });
        if (stringStartsWithDelimiter) {
          string = delimiter + string;
        }
        return string;
      };

      Tools.prototype.stringEndsWith = function(string, searchString) {

        /*
            Checks weather given string ends with given search string.
        
            **string {String}**        - String to search in.
        
            **searchString {String}**  - String to search for.
        
            **returns {String}**       - Returns "true" if given string
                                         ends with given search string
                                         and "false" otherwise.
         */
        return string.length >= searchString.length && string.lastIndexOf(searchString) === string.length - searchString.length;
      };

      Tools.prototype.stringFormat = function() {
        var additionalArguments, string;
        string = arguments[0], additionalArguments = 2 <= arguments.length ? slice.call(arguments, 1) : [];

        /*
            Performs a string formation. Replaces every placeholder "{i}"
            with the i'th argument.
        
            **string {String}**  - The string to format.
        
            Additional arguments are interpreted as replacements for string
            formating.
        
            **returns {String}** - The formatted string.
         */
        additionalArguments.unshift(string);
        $.each(additionalArguments, function(key, value) {
          return string = string.replace(new RegExp("\\{" + key + "\\}", 'gm'), value);
        });
        return string;
      };

      Tools.prototype.stringGetRegularExpressionValidated = function(string) {

        /*
            Validates the current string for using in a regular expression
            pattern. Special regular expression chars will be escaped.
        
            **string {String}**            - The string to format.
        
            **returns {String}**           - The formatted string.
         */
        return string.replace(/([\\|.*$^+[\]()?\-{}])/g, '\\$1');
      };

      Tools.prototype.stringLowerCase = function(string) {

        /*
            Converts a string to its lower case representation.
        
            **string {String}**  - The string to format.
        
            **returns {String}** - The formatted string.
         */
        return string.charAt(0).toLowerCase() + string.substring(1);
      };

      Tools.prototype.stringMark = function(target, mark, marker, caseSensitiv) {
        var index, offset, searchTarget;
        if (marker == null) {
          marker = '<span class="tools-mark">{1}</span>';
        }
        if (caseSensitiv == null) {
          caseSensitiv = false;
        }

        /*
            Wraps given mark strings in given target with given marker.
        
            **target {String}**         - String to search for marker.
        
            **mark {String}**           - String to search in target for.
        
            **marker {String}**         - HTML template string to mark.
        
            **caseSensitive {Boolean}** - Indicates weather case takes a
                                          role during searching.
        
            **returns {String}**        - Processed result.
         */
        target = $.trim(target);
        mark = $.trim(mark);
        if (target && mark) {
          offset = 0;
          searchTarget = target;
          if (!caseSensitiv) {
            searchTarget = searchTarget.toLowerCase();
          }
          if (!caseSensitiv) {
            mark = mark.toLowerCase();
          }
          while (true) {
            index = searchTarget.indexOf(mark, offset);
            if (index === -1) {
              break;
            } else {
              target = target.substring(0, index) + this.stringFormat(marker, target.substr(index, mark.length)) + target.substring(index + mark.length);
              if (!caseSensitiv) {
                searchTarget = target.toLowerCase();
              }
              offset = index + (marker.length - '{1}'.length) + mark.length;
            }
          }
        }
        return target;
      };

      Tools.prototype.stringMD5 = function(value) {

        /*
            Implements the md5 hash algorithm.
        
            **value {String}**   - Value to calculate md5 hash for.
        
            **returns {String}** - Calculated md5 hash value.
         */
        var AA, BB, CC, DD, S11, S12, S13, S14, S21, S22, S23, S24, S31, S32, S33, S34, S41, S42, S43, S44, _F, _FF, _G, _GG, _H, _HH, _I, _II, a, addUnsigned, b, c, convertToWordArray, d, k, rotateLeft, wordToHex, x, xl;
        rotateLeft = function(lValue, iShiftBits) {
          return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        };
        addUnsigned = function(lX, lY) {
          var lResult, lX4, lX8, lY4, lY8;
          lX8 = lX & 0x80000000;
          lY8 = lY & 0x80000000;
          lX4 = lX & 0x40000000;
          lY4 = lY & 0x40000000;
          lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
          if (lX4 & lY4) {
            return lResult ^ 0x80000000 ^ lX8 ^ lY8;
          }
          if (lX4 | lY4) {
            if (lResult & 0x40000000) {
              return lResult ^ 0xC0000000 ^ lX8 ^ lY8;
            } else {
              return lResult ^ 0x40000000 ^ lX8 ^ lY8;
            }
          } else {
            return lResult ^ lX8 ^ lY8;
          }
        };
        _F = function(x, y, z) {
          return (x & y) | ((~x) & z);
        };
        _G = function(x, y, z) {
          return (x & z) | (y & (~z));
        };
        _H = function(x, y, z) {
          return x ^ y ^ z;
        };
        _I = function(x, y, z) {
          return y ^ (x | (~z));
        };
        _FF = function(a, b, c, d, x, s, ac) {
          a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
          return addUnsigned(rotateLeft(a, s), b);
        };
        _GG = function(a, b, c, d, x, s, ac) {
          a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
          return addUnsigned(rotateLeft(a, s), b);
        };
        _HH = function(a, b, c, d, x, s, ac) {
          a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
          return addUnsigned(rotateLeft(a, s), b);
        };
        _II = function(a, b, c, d, x, s, ac) {
          a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
          return addUnsigned(rotateLeft(a, s), b);
        };
        convertToWordArray = function(value) {
          var lByteCount, lBytePosition, lMessageLength, lNumberOfWords, lNumberOfWords_temp1, lNumberOfWords_temp2, lWordArray, lWordCount;
          lMessageLength = value.length;
          lNumberOfWords_temp1 = lMessageLength + 8;
          lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
          lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
          lWordArray = new Array(lNumberOfWords - 1);
          lBytePosition = 0;
          lByteCount = 0;
          while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (value.charCodeAt(lByteCount) << lBytePosition);
            lByteCount += 1;
          }
          lWordCount = (lByteCount - (lByteCount % 4)) / 4;
          lBytePosition = (lByteCount % 4) * 8;
          lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
          lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
          lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
          return lWordArray;
        };
        wordToHex = function(lValue) {
          var lByte, lCount, wordToHexValue, wordToHexValueTemp;
          wordToHexValue = '';
          wordToHexValueTemp = '';
          lCount = 0;
          while (lCount <= 3) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            wordToHexValueTemp = "0" + lByte.toString(16);
            wordToHexValue = wordToHexValue + wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2);
            lCount += 1;
          }
          return wordToHexValue;
        };
        x = [];
        S11 = 7;
        S12 = 12;
        S13 = 17;
        S14 = 22;
        S21 = 5;
        S22 = 9;
        S23 = 14;
        S24 = 20;
        S31 = 4;
        S32 = 11;
        S33 = 16;
        S34 = 23;
        S41 = 6;
        S42 = 10;
        S43 = 15;
        S44 = 21;
        x = convertToWordArray(value);
        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;
        xl = x.length;
        k = 0;
        while (k < xl) {
          AA = a;
          BB = b;
          CC = c;
          DD = d;
          a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
          d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
          c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
          b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
          a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
          d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
          c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
          b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
          a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
          d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
          c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
          b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
          a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
          d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
          c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
          b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
          a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
          d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
          c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
          b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
          a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
          d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
          c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
          b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
          a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
          d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
          c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
          b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
          a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
          d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
          c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
          b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
          a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
          d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
          c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
          b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
          a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
          d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
          c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
          b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
          a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
          d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
          c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
          b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
          a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
          d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
          c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
          b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
          a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
          d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
          c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
          b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
          a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
          d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
          c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
          b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
          a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
          d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
          c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
          b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
          a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
          d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
          c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
          b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
          a = addUnsigned(a, AA);
          b = addUnsigned(b, BB);
          c = addUnsigned(c, CC);
          d = addUnsigned(d, DD);
          k += 16;
        }
        return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
      };

      Tools.prototype.stringNormalizePhoneNumber = function(phoneNumber) {

        /*
            Normalizes given phone number for automatic dialing mechanisms.
        
            **phoneNumber {String}** - Number to normalize.
        
            **returns {String}**     - Normalized number.
         */
        if (phoneNumber != null) {
          return ("" + phoneNumber).replace(/[^0-9]*\+/, '00').replace(/[^0-9]+/g, '');
        }
        return '';
      };

      Tools.prototype.stringRepresentPhoneNumber = function(phoneNumber) {

        /*
            Represents given phone number. NOTE: Currently only support
            German phone numbers.
        
            **phoneNumber {String}** - Number to format.
        
            **returns {String}**     - Formatted number.
         */
        if (phoneNumber) {
          phoneNumber = phoneNumber.replace(/^(00|\+)([0-9]+)-([0-9-]+)$/, '+$2 (0) $3');
          phoneNumber = phoneNumber.replace(/^0([1-9][0-9-]+)$/, '+49 (0) $1');
          phoneNumber = phoneNumber.replace(/^([^-]+)-([0-9-]+)$/, '$1 / $2');
          return phoneNumber.replace(/^(.*?)([0-9]+)(-?[0-9]*)$/, function(match, prefix, number, suffix) {
            return prefix + $.trim(number.length % 2 === 0 ? number.replace(/([0-9]{2})/g, '$1 ') : number.replace(/^([0-9]{3})([0-9]+)$/, function(match, triple, rest) {
              return triple + ' ' + $.trim(rest.replace(/([0-9]{2})/g, '$1 '));
            }) + suffix);
          });
        }
        return '';
      };

      Tools.prototype.stringStartsWith = function(string, searchString) {

        /*
            Checks weather given string starts with given search string.
        
            **string {String}**        - String to search in.
        
            **searchString {String}**  - String to search for.
        
            **returns {String}**       - Returns "true" if given string
                                         starts with given search string
                                         and "false" otherwise.
         */
        return string.indexOf(searchString) === 0;
      };

      Tools.prototype.stringDecodeHTMLEntities = function(htmlString) {

        /*
            Decodes all html symbols in text nodes in given html string.
        
            **htmlString {String}** - HTML string to decode.
        
            **returns {String}**    - Decoded html string.
         */
        var textareaDomNode;
        textareaDomNode = window.document.createElement('textarea');
        textareaDomNode.innerHTML = htmlString;
        return textareaDomNode.value;
      };

      Tools.prototype.numberIsNotANumber = function(object) {

        /*
            Checks if given object is java scripts native
            "window.Number.NaN" object.
        
            **object {Mixed}**    - Object to Check.
        
            **returns {Boolean}** - Returns weather given value is not a
                                    number or not.
         */
        return typeof object === 'number' && window.isNaN(object);
      };

      Tools.prototype.numberRound = function(number, digits) {
        if (digits == null) {
          digits = 0;
        }

        /*
            Rounds a given number accurate to given number of digits.
        
            **number {Float}**   - The number to round.
        
            **digits {Integer}** - The number of digits after comma.
        
            **returns {Float}**  - Returns the rounded number.
         */
        return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
      };

      Tools.prototype.sendToIFrame = function(target, url, data, requestType, removeAfterLoad) {
        var form, name, value;
        if (requestType == null) {
          requestType = 'post';
        }
        if (removeAfterLoad == null) {
          removeAfterLoad = false;
        }

        /*
            Send given data to a given iframe.
        
            **target {String|DomNode}**   - Name of the target iframe or
                                            the target iframe itself.
        
            **url {String}**              - URL to send to data to.
        
            **data {Object}**             - Data holding object to send
                                            data to.
        
            **requestType {String}**      - The forms action attribute
                                            value. If nothing is provided
                                            "post" will be used as default.
        
            **removeAfterLoad {Boolean}** - Indicates if created iframe
                                            should be removed right after
                                            load event. Only works if an
                                            iframe object is given instead
                                            of a simple target name.
        
            **returns {String|DomNode}**  - Returns the given target.
         */
        form = $('<form>').attr({
          action: url,
          method: requestType,
          target: $.type(target) === 'string' ? target : target.attr('name')
        });
        for (name in data) {
          value = data[name];
          form.append($('<input>').attr({
            type: 'hidden',
            name: name,
            value: value
          }));
        }
        form.submit().remove();
        return typeof target.on === "function" ? target.on('load', function() {
          if (removeAfterLoad) {
            return target.remove();
          }
        }) : void 0;
      };

      Tools.prototype.sendToExternalURL = function(url, data, requestType, removeAfterLoad) {
        var iFrame;
        if (requestType == null) {
          requestType = 'post';
        }
        if (removeAfterLoad == null) {
          removeAfterLoad = true;
        }

        /*
            Send given data to a temporary created iframe.
        
            **url {String}**              - URL to send to data to.
        
            **data {Object}**             - Data holding object to send
                                            data to.
        
            **requestType {String}**      - The forms action attribute
                                            value. If nothing is provided
                                            "post" will be used as default.
        
            **removeAfterLoad {Boolean}** - Indicates if created iframe
                                            should be removed right after
                                            load event.
        
            **returns {DomNode}**         - Returns the dynamically created
                                            iframe.
         */
        iFrame = $('<iframe>').attr({
          name: this.__name__.charAt(0).toLowerCase() + this.__name__.substring(1) + (new Date).getTime()
        }).hide();
        this.$domNode.after(iFrame);
        return this.sendToIFrame(iFrame, url, data, requestType, removeAfterLoad);
      };

      Tools.prototype._bindHelper = function(parameter, removeEvent, eventFunctionName) {
        var $domNode;
        if (removeEvent == null) {
          removeEvent = false;
        }
        if (eventFunctionName == null) {
          eventFunctionName = 'on';
        }

        /*
            Helper method for attach event handler methods and their event
            handler remove pendants.
        
            **parameter** {Object}**       - Arguments object given to
                                             methods like "bind()" or
                                             "unbind()".
        
            **removeEvent {Boolean}**      - Indicates if "unbind()" or
                                             "bind()" was given.
        
            **eventFunctionName {String}** - Name of function to wrap.
        
            **returns {$}**                - Returns $'s wrapped dom node.
         */
        $domNode = $(parameter[0]);
        if ($.type(parameter[1]) === 'object' && !removeEvent) {
          $.each(parameter[1], (function(_this) {
            return function(eventType, handler) {
              return _this[eventFunctionName]($domNode, eventType, handler);
            };
          })(this));
          return $domNode;
        }
        parameter = this.argumentsObjectToArray(parameter).slice(1);
        if (parameter.length === 0) {
          parameter.push('');
        }
        if (parameter[0].indexOf('.') === -1) {
          parameter[0] += "." + this.__name__;
        }
        if (removeEvent) {
          return $domNode[eventFunctionName].apply($domNode, parameter);
        }
        return $domNode[eventFunctionName].apply($domNode, parameter);
      };

      Tools.prototype._grabDomNodeHelper = function(key, selector, domNodeSelectors) {

        /*
            Converts a dom selector to a prefixed dom selector string.
        
            **key {Integer}**             - Current element in options
                                            array to
                                            grab.
        
            **selector {String}**         - A dom node selector.
        
            **domNodeSelectors {Object}** - An object with dom node
                                            selectors.
        
            **returns {Object}**          - Returns given selector
                                            prefixed.
         */
        var domNodeSelectorPrefix;
        domNodeSelectorPrefix = '';
        if (this._options.domNodeSelectorPrefix) {
          domNodeSelectorPrefix = this._options.domNodeSelectorPrefix + ' ';
        }
        if (!(this.stringStartsWith(selector, domNodeSelectorPrefix) || this.stringStartsWith($.trim(selector), '<'))) {
          domNodeSelectors[key] = domNodeSelectorPrefix + selector;
          return $.trim(domNodeSelectors[key]);
        }
        return $.trim(selector);
      };

      return Tools;

    })();
    $.fn.Tools = function() {
      return (new Tools).controller(Tools, arguments, this);
    };
    $.Tools = function() {
      return (new Tools).controller(Tools, arguments);
    };
    $.Tools["class"] = Tools;
    nativePropFunction = $.fn.prop;
    return $.fn.prop = function(key, value) {

      /*
          JQuery's native prop implementation ignores properties for text
          nodes, comments and attribute nodes.
       */
      var ref;
      if (arguments.length < 3 && ((ref = this[0].nodeName) === '#text' || ref === '#comment') && (this[0][key] != null)) {
        if (arguments.length === 1) {
          return this[0][key];
        }
        if (arguments.length === 2) {
          this[0][key] = value;
          return this;
        }
      }
      return nativePropFunction.apply(this, arguments);
    };
  };

  if (this.require != null) {
    this.require.scopeIndicator = 'jQuery.Tools';
    this.require([['jQuery', 'jquery-2.1.1']], main);
  } else {
    main(this.jQuery);
  }

}).call(this);


/* endregion */


/* region file: /home/torben/cloud/data/repository/jQuery-tools/documentationWebsite/coffeeScript/jQuery/jquery-lang-1.0.js */


/*
[Project page](http://torben.website/jQuery-lang)

This plugin provided client side internationalisation support for websites.

Copyright Torben Sickert 16.12.2012

License
-------

This library written by Torben Sickert stand under a creative commons naming
3.0 unported license. see http://creativecommons.org/licenses/by/3.0/deed.de

Extending this module
---------------------

For conventions see require on https://github.com/thaibault/require

Author
------

t.sickert["~at~"]gmail.com (Torben Sickert)

Version
-------

1.0 stable
 */

(function() {
  var main,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  main = function($) {
    var Lang;
    Lang = (function(superClass) {
      extend(Lang, superClass);

      function Lang() {
        return Lang.__super__.constructor.apply(this, arguments);
      }


      /*
          This plugin holds all needed methods to extend a website for
          internationalisation.
       */


      /*
          **__name__ {String}**
          Holds the class name to provide inspection features.
       */

      Lang.prototype.__name__ = 'Lang';

      Lang.prototype.initialize = function(options, currentLanguage1, knownLanguage, _$domNodeToFade, _replacements, _textNodesWithKnownLanguage) {
        var newLanguage;
        if (options == null) {
          options = {};
        }
        this.currentLanguage = currentLanguage1 != null ? currentLanguage1 : '';
        this.knownLanguage = knownLanguage != null ? knownLanguage : {};
        this._$domNodeToFade = _$domNodeToFade != null ? _$domNodeToFade : null;
        this._replacements = _replacements != null ? _replacements : [];
        this._textNodesWithKnownLanguage = _textNodesWithKnownLanguage != null ? _textNodesWithKnownLanguage : {};

        /*
            Initializes the plugin. Current language is set and later
            needed dom nodes are grabbed.
        
            **options {Object}** - An options object.
        
            **returns {$.Lang}** - Returns the current instance.
         */

        /*
            **_options {Object}**
            Saves default options for manipulating the Gui's behaviour.
         */
        this._options = {
          domNodeSelectorPrefix: 'body',
          "default": 'enUS',
          allowedLanguages: [],
          initial: null,
          domNodeClassPrefix: '',
          templateDelimiter: {
            pre: '{{',
            post: '}}'
          },
          fadeEffect: true,
          textNodeParent: {
            fadeIn: {
              duration: 'fast'
            },
            fadeOut: {
              duration: 'fast'
            }
          },
          preReplacementLanguagePattern: '^\\|({1})$',
          replacementLanguagePattern: '^([a-z]{2}[A-Z]{2}):((.|\\s)*)$',
          currentLanguagePattern: '^[a-z]{2}[A-Z]{2}$',
          replacementDomNodeName: ['#comment', 'langreplacement'],
          replaceDomNodeNames: ['#text', 'langreplace'],
          toolsLockDescription: '{1}Switch',
          languageHashPrefix: 'lang-',
          currentLanguageIndicatorClassName: 'current',
          sessionDescription: '{1}',
          languageMapping: {
            deDE: ['de', 'de_de', 'de-de', 'german', 'deutsch'],
            enUS: ['en', 'en_us', 'en-us'],
            enEN: ['en_en', 'en-en', 'english'],
            frFR: ['fr', 'fr_fr', 'fr-fr', 'french']
          },
          onSwitched: $.noop(),
          onEnsureded: $.noop(),
          onSwitch: $.noop(),
          onEnsure: $.noop(),
          domNode: {
            knownLanguage: 'div.toc'
          }
        };
        Lang.__super__.initialize.call(this, options);
        this._options.preReplacementLanguagePattern = this.stringFormat(this._options.preReplacementLanguagePattern, this._options.replacementLanguagePattern.substr(1, this._options.replacementLanguagePattern.length - 2));
        this._options.toolsLockDescription = this.stringFormat(this._options.toolsLockDescription, this.__name__);
        this._options.sessionDescription = this.stringFormat(this._options.sessionDescription, this.__name__);
        this.$domNodes = this.grabDomNode(this._options.domNode);
        this.$domNodes.switchLanguageButtons = $("a[href^=\"#" + this._options.languageHashPrefix + "\"]");
        this._movePreReplacementNodes();
        this.currentLanguage = this._normalizeLanguage(this._options["default"]);
        newLanguage = this._determineUsefulLanguage();
        if (this.currentLanguage === newLanguage) {
          this._switchCurrentLanguageIndicator(newLanguage);
        } else {
          this["switch"](newLanguage, true);
        }
        this.on(this.$domNodes.switchLanguageButtons, 'click', (function(_this) {
          return function(event) {
            event.preventDefault();
            return _this["switch"]($(event.target).attr('href').substr(_this._options.languageHashPrefix.length + 1));
          };
        })(this));
        return this;
      };

      Lang.prototype["switch"] = function(language, ensure) {
        if (ensure == null) {
          ensure = false;
        }

        /*
            Switches the current language to given language. This method is
            mutual synchronized.
        
            **language {String|Boolean}** - New language as string or
                                            "true". If set to "true" it
                                            indicates that the dom tree
                                            should be checked again current
                                            language to ensure every text
                                            node has right content.
        
            **ensure {Boolean}**          - Indicates if a switch effect
                                            should be avoided.
        
            **returns {$.Lang}**  - Returns the current instance.
         */
        if (language !== true && this._options.allowedLanguages.length && $.inArray(language, this._options.allowedLanguages) === -1) {
          this.debug('"{1}" isn\'t one of the allowed languages.', language);
          return this;
        }
        this.acquireLock(this._options.toolsLockDescription, (function(_this) {
          return function() {
            var $lastLanguageDomNode, $lastTextNodeToTranslate, actionDescription, ref;
            if (language === true) {
              ensure = true;
              language = _this.currentLanguage;
            } else {
              language = _this._normalizeLanguage(language);
            }
            if (ensure && language !== _this._options["default"] || _this.currentLanguage !== language) {
              actionDescription = 'Switch to';
              if (ensure) {
                actionDescription = 'Ensure';
              }
              _this.debug('{1} "{2}".', actionDescription, language);
              _this._switchCurrentLanguageIndicator(language);
              _this.fireEvent((ensure ? 'ensure' : 'switch'), true, _this, _this.currentLanguage, language);
              _this._$domNodeToFade = null;
              _this._replacements = [];
              ref = _this._collectTextNodesToReplace(language, ensure), $lastTextNodeToTranslate = ref[0], $lastLanguageDomNode = ref[1];
              _this._checkLastTextNodeHavingLanguageIndicator($lastTextNodeToTranslate, $lastLanguageDomNode, ensure);
              return _this._handleSwitchEffect(language, ensure);
            } else {
              _this.debug('"{1}" is already current selected language.', language);
              return _this.releaseLock(_this._options.toolsLockDescription);
            }
          };
        })(this));
        return this;
      };

      Lang.prototype.refresh = function() {

        /*
            Ensures current selected language.
        
            **returns {$.Lang}** - Returns the current instance.
         */
        return this._movePreReplacementNodes()["switch"](true);
      };

      Lang.prototype._movePreReplacementNodes = function() {

        /*
            Moves pre replacement dom nodes into next dom node behind
            translation text to use the same translation algorithm for
            both.
        
            **returns {$.Lang}** - Returns the current instance.
         */
        var self;
        self = this;
        this.$domNodes.parent.find(':not(iframe)').contents().each(function() {
          var $this, match, nodeName, regex, selfFound;
          $this = $(this);
          nodeName = $this.prop('nodeName').toLowerCase();
          if ($.inArray(nodeName, self._options.replacementDomNodeName) !== -1) {
            if ($.inArray(nodeName, ['#comment', '#text']) === -1) {
              $this.hide();
            }
            regex = new RegExp(self._options.preReplacementLanguagePattern);
            match = $this.prop('textContent').match(regex);
            if (match && match[0]) {
              $this.prop('textContent', $this.prop('textContent').replace(regex, match[1]));
              selfFound = false;
              return $this.parent().contents().each(function() {
                if (selfFound && $.trim($(this).text())) {
                  $this.appendTo(this);
                  return false;
                }
                if ($this[0] === this) {
                  selfFound = true;
                }
                return true;
              });
            }
          }
        });
        return this;
      };

      Lang.prototype._collectTextNodesToReplace = function(language, ensure) {

        /*
            Collects all text nodes which should be replaced later.
        
            **language {String}**   - New language.
        
            **ensure {Boolean}**    - Indicates if the whole dom should be
                                      checked again current language to
                                      ensure every text node has right
                                      content.
        
            **returns {domNode[]}** - Return a tuple of last text and
                                      language dom node to translate.
         */
        var $currentLanguageDomNode, $currentTextNodeToTranslate, $lastLanguageDomNode, $lastTextNodeToTranslate, self;
        $currentTextNodeToTranslate = null;
        $currentLanguageDomNode = null;
        $lastTextNodeToTranslate = null;
        $lastLanguageDomNode = null;
        this.knownLanguage = {};
        self = this;
        this.$domNodes.parent.find(':not(iframe)').contents().each(function() {
          var $currentDomNode, content, match, nodeName;
          $currentDomNode = $(this);
          nodeName = $currentDomNode.prop('nodeName').toLowerCase();
          if ($.inArray(nodeName.toLowerCase(), self._options.replaceDomNodeNames) !== -1) {
            if ($.trim($currentDomNode.text()) && $currentDomNode.parents(self._options.replaceDomNodeNames.join()).length === 0) {
              $lastLanguageDomNode = self._checkLastTextNodeHavingLanguageIndicator($lastTextNodeToTranslate, $lastLanguageDomNode, ensure);
              $currentTextNodeToTranslate = $currentDomNode;
            }
          } else if ($currentTextNodeToTranslate != null) {
            if ($.inArray(nodeName, self._options.replacementDomNodeName) !== -1) {
              content = $currentDomNode.prop('textContent');
              if (nodeName !== '#comment') {
                content = $currentDomNode.html();
              }
              match = content.match(new RegExp(self._options.replacementLanguagePattern));
              if (match && match[1] === language) {
                self.knownLanguage[$.trim($currentTextNodeToTranslate.text())] = $.trim(match[2]);
                self._registerTextNodeToChange($currentTextNodeToTranslate, $currentDomNode, match, $currentLanguageDomNode);
                $lastTextNodeToTranslate = $currentTextNodeToTranslate;
                $lastLanguageDomNode = $currentLanguageDomNode;
                $currentTextNodeToTranslate = null;
                $currentLanguageDomNode = null;
              } else if ($currentDomNode.prop('textContent').match(new RegExp(self._options.currentLanguagePattern))) {
                $currentLanguageDomNode = $currentDomNode;
              }
              return true;
            }
            $lastTextNodeToTranslate = null;
            $lastLanguageDomNode = null;
            $currentTextNodeToTranslate = null;
            $currentLanguageDomNode = null;
          }
          return true;
        });
        this._registerKnownTextNodes();
        return [$lastTextNodeToTranslate, $lastLanguageDomNode];
      };

      Lang.prototype._registerKnownTextNodes = function() {

        /*
            Iterates all text nodes in language known area with known
            translations.
        
            **returns {$.Lang}**  - Returns the current instance.
         */
        var self;
        this._textNodesWithKnownLanguage = {};
        self = this;
        this.$domNodes.knownLanguage.find(':not(iframe)').contents().each(function() {
          var $currentDomNode;
          $currentDomNode = $(this);
          if ($.inArray($currentDomNode.prop('nodeName').toLowerCase(), self._options.replaceDomNodeNames) !== -1 && $.trim($currentDomNode.text()) && $currentDomNode.parents(self._options.replaceDomNodeNames.join()).length === 0 && (self.knownLanguage[$.trim($currentDomNode.prop('textContent'))] != null)) {
            self._addTextNodeToFade($currentDomNode);
            if ((self._textNodesWithKnownLanguage[self.knownLanguage[$.trim($currentDomNode.prop('textContent'))]] != null)) {
              return self._textNodesWithKnownLanguage[self.knownLanguage[$.trim($currentDomNode.prop('textContent'))]].push($currentDomNode);
            } else {
              return self._textNodesWithKnownLanguage[self.knownLanguage[$.trim($currentDomNode.prop('textContent'))]] = [$currentDomNode];
            }
          }
        });
        return this;
      };

      Lang.prototype._normalizeLanguage = function(language) {

        /*
            Normalizes a given language string.
        
            **language {String}** - New language.
        
            *returns {String}**   - Returns the normalized version of given
                                    language.
         */
        var key, ref, value;
        ref = this._options.languageMapping;
        for (key in ref) {
          value = ref[key];
          if ($.inArray(key.toLowerCase(), value) === -1) {
            value.push(key.toLowerCase());
          }
          if ($.inArray(language.toLowerCase(), value) !== -1) {
            return key;
          }
        }
        return this._options["default"];
      };

      Lang.prototype._determineUsefulLanguage = function() {

        /*
            Determines a useful initial language depending on session and
            browser settings.
        
            **returns {String}** - Returns the determined language.
         */
        var ref, result;
        if (this._options.initial != null) {
          result = this._options.initial;
        } else if (((ref = window.localStorage) != null ? ref.getItem(this._options.sessionDescription) : void 0) != null) {
          result = window.localStorage.getItem(this._options.sessionDescription);
          this.debug('Determine "{1}", because of local storage information.', result);
        } else if (navigator.language != null) {
          result = navigator.language;
          this.debug('Determine "{1}", because of browser settings.', result);
        } else {
          result = this._options["default"];
          this.debug('Determine "{1}", because of default option.', result);
        }
        result = this._normalizeLanguage(result);
        if (this._options.allowedLanguages.length && $.inArray(result, this._options.allowedLanguages) === -1) {
          this.debug('"{1}" isn\'t one of the allowed languages. Set language' + ' to "{2}".', result, this._options.allowedLanguages[0]);
          result = this._options.allowedLanguages[0];
        }
        if (window.localStorage != null) {
          window.localStorage.setItem(this._options.sessionDescription, result);
        }
        return result;
      };

      Lang.prototype._handleSwitchEffect = function(language, ensure) {

        /*
            Depending an activated switching effect this method initialized
            the effect of replace all text string directly.
        
            **language {String}** - New language.
        
            **ensure {Boolean}**  - Indicates if current language should be
                                    ensured again every text node content.
        
            **returns {$.Lang}**  - Returns the current instance.
         */
        if (!ensure && this._options.fadeEffect && (this._$domNodeToFade != null)) {
          $.when(this._$domNodeToFade.fadeOut(this._options.textNodeParent.fadeOut).promise()).always(this.getMethod(this._handleLanguageSwitching, this, language, ensure));
        } else {
          this._handleLanguageSwitching(this._handleLanguageSwitching, this, language, ensure);
        }
        return this;
      };

      Lang.prototype._addTextNodeToFade = function($textNode) {

        /*
            Registers a text node to change its content with given
            replacement.
        
            **$textNode {$}**    - Text node with content to translate.
        
            **returns {$.Lang}** - Returns the current instance.
         */
        var $parent;
        $parent = $textNode.parent();
        if (this._$domNodeToFade === null) {
          this._$domNodeToFade = $parent;
        } else {
          this._$domNodeToFade = this._$domNodeToFade.add($parent);
        }
        return this;
      };

      Lang.prototype._registerTextNodeToChange = function($currentTextNodeToTranslate, $currentDomNode, match, $currentLanguageDomNode) {

        /*
            Registers a text node to change its content with given
            replacement.
        
            **$currentTextNodeToTranslate {$}**  - Text node with content
                                                   to translate.
        
            **$currentDomNode {$}**              - A comment node with
                                                   replacement content.
        
            **match {String[]}**                 - A matching array of
                                                   replacement's text
                                                   content.
        
            **$currentLanguageDomNode {$|null}** - A potential given text
                                                   node indicating the
                                                   language of given text
                                                   node.
        
            **returns {$.Lang}**                 - Returns the current
                                                   instance.
         */
        this._addTextNodeToFade($currentTextNodeToTranslate);
        if ($currentDomNode != null) {
          this._replacements.push({
            $textNodeToTranslate: $currentTextNodeToTranslate,
            $nodeToReplace: $currentDomNode,
            textToReplace: match[2],
            $currentLanguageDomNode: $currentLanguageDomNode
          });
        }
        return this;
      };

      Lang.prototype._checkLastTextNodeHavingLanguageIndicator = function($lastTextNodeToTranslate, $lastLanguageDomNode, ensure) {

        /*
            Checks if last text has a language indication comment node.
            This function is called after each parsed dom text node.
        
            **$lastTextNodeToTranslate {$|null}** - Last text to node to
                                                    check.
        
            **$lastLanguageDomNode {$|null}**     - A potential given
                                                    language indication
                                                    commend node.
        
            **ensure {Boolean}**                  - Indicates if current
                                                    language should be
                                                    ensured again every
                                                    text node content.
        
            **returns {$}**                       - Returns the retrieved
                                                    or newly created
                                                    language indicating
                                                    comment node.
         */
        var currentLocalLanguage;
        if (($lastTextNodeToTranslate != null) && ($lastLanguageDomNode == null)) {
          currentLocalLanguage = this.currentLanguage;
          if (ensure) {
            currentLocalLanguage = this._options["default"];
          }
          $lastLanguageDomNode = $("<!--" + currentLocalLanguage + "-->");
          $lastTextNodeToTranslate.after($lastLanguageDomNode);
        }
        return $lastLanguageDomNode;
      };

      Lang.prototype._handleLanguageSwitching = function(thisFunction, self, language, ensure) {

        /*
            Initialized the language switch and performs an effect if
            specified.
        
            **thisFunction {Function}** - The function itself.
        
            **self {$.Lang}**           - The current instance.
        
            **language {String}**       - The new language to switch to.
        
            **ensure {Boolean}**        - Indicates if current language
                                          should be ensured again every
                                          text node content.
        
            **returns {$.Lang}**        - Returns the current instance.
         */
        var oldLanguage;
        oldLanguage = this.currentLanguage;
        if (!ensure && this._options.fadeEffect && (this._$domNodeToFade != null)) {
          this._switchLanguage(language);
          $.when(this._$domNodeToFade.fadeIn(this._options.textNodeParent.fadeIn).promise()).always((function(_this) {
            return function() {
              _this.fireEvent((ensure ? 'ensured' : 'switched'), true, _this, oldLanguage, language);
              return _this.releaseLock(_this._options.toolsLockDescription);
            };
          })(this));
        } else {
          this._switchLanguage(language);
          this.fireEvent((ensure ? 'ensured' : 'switched'), true, this, oldLanguage, language);
          this.releaseLock(this._options.toolsLockDescription);
        }
        return this;
      };

      Lang.prototype._switchLanguage = function(language) {

        /*
            Performs the low level text replacements for switching to given
            language.
        
            **language {String}** - The new language to switch to.
        
            **returns {$.Lang}**  - Returns the current instance.
         */
        var currentDomNodeFound, currentLanguage, currentText, i, len, nodeName, ref, replacement, trimmedText;
        ref = this._replacements;
        for (i = 0, len = ref.length; i < len; i++) {
          replacement = ref[i];
          currentText = replacement.$textNodeToTranslate.html();
          if (replacement.$textNodeToTranslate.prop('nodeName') === '#text') {
            currentText = replacement.$textNodeToTranslate.prop('textContent');
          }
          trimmedText = $.trim(currentText);
          if (!this._options.templateDelimiter || !this.stringEndsWith(trimmedText, this._options.templateDelimiter.post) && this._options.templateDelimiter.post) {
            if (replacement.$currentLanguageDomNode == null) {
              currentDomNodeFound = false;
              replacement.$textNodeToTranslate.parent().contents().each(function() {
                if (currentDomNodeFound) {
                  replacement.$currentLanguageDomNode = $(this);
                  return false;
                }
                if (this === replacement.$textNodeToTranslate[0]) {
                  currentDomNodeFound = true;
                }
                return true;
              });
            }
            currentLanguage = replacement.$currentLanguageDomNode.prop('textContent');
            if (language === currentLanguage) {
              this.warn(("Text node \"" + replacement.textToReplace + "\" is ") + ("marked as \"" + currentLanguage + "\" and has same ") + 'translation language as it already is.');
            }
            nodeName = replacement.$nodeToReplace.prop('nodeName').toLowerCase();
            if (nodeName === '#comment') {
              replacement.$textNodeToTranslate.after($("<!--" + currentLanguage + ":" + currentText + "-->"));
            } else {
              replacement.$textNodeToTranslate.after($(("<" + nodeName + ">" + currentLanguage + ":" + currentText + "<") + ("/" + nodeName + ">")).hide());
            }
            replacement.$textNodeToTranslate.after($("<!--" + language + "-->"));
            if (replacement.$textNodeToTranslate.prop('nodeName') === '#text') {
              replacement.$textNodeToTranslate.prop('textContent', replacement.textToReplace);
            } else {
              replacement.$textNodeToTranslate.html(replacement.textToReplace);
            }
            replacement.$currentLanguageDomNode.remove();
            replacement.$nodeToReplace.remove();
          }
        }
        $.each(this._textNodesWithKnownLanguage, function(key, value) {
          return $.each(value, function(subKey, value) {
            return value.prop('textContent', key);
          });
        });
        if (window.localStorage != null) {
          window.localStorage.setItem(this._options.sessionDescription, language);
        }
        this.currentLanguage = language;
        return this;
      };

      Lang.prototype._switchCurrentLanguageIndicator = function(language) {

        /*
            Switches the current language indicator in language switch
            triggered dom nodes.
        
            **language {String}** - The new language to switch to.
        
            **returns {$.Lang}**  - Returns the current instance.
         */
        $(("a[href=\"#" + this._options.languageHashPrefix) + (this.currentLanguage + "\"].") + this._options.currentLanguageIndicatorClassName).removeClass(this._options.currentLanguageIndicatorClassName);
        $("a[href=\"#" + this._options.languageHashPrefix + language + "\"]").addClass(this._options.currentLanguageIndicatorClassName);
        return this;
      };

      return Lang;

    })($.Tools["class"]);
    $.Lang = function() {
      return $.Tools().controller(Lang, arguments);
    };
    return $.Lang["class"] = Lang;
  };

  if (this.require != null) {
    this.require.scopeIndicator = 'jQuery.Lang';
    this.require([['jQuery.Tools', 'jquery-tools-1.0.coffee']], main);
  } else {
    main(this.jQuery);
  }

}).call(this);


/* endregion */


/* region file: /home/torben/cloud/data/repository/jQuery-tools/documentationWebsite/coffeeScript/jQuery/jquery-website-1.0.js */


/*
[Project page](http://torben.website/jQuery-website)

This module provides common logic for the whole web page.

Copyright Torben Sickert 16.12.2012

License
-------

This library written by Torben Sickert stand under a creative commons naming
3.0 unported license. see http://creativecommons.org/licenses/by/3.0/deed.de

Extending this module
---------------------

For conventions see require on https://github.com/thaibault/require

Author
------

t.sickert["~at~"]gmail.com (Torben Sickert)

Version
-------

1.0 stable
 */

(function() {
  var main,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  main = function($) {
    var Website;
    Website = (function(superClass) {
      extend(Website, superClass);

      function Website() {
        return Website.__super__.constructor.apply(this, arguments);
      }


      /*This plugin holds all needed methods to extend a whole website. */


      /*
          **__name__ {String}**
          Holds the class name to provide inspection features.
       */

      Website.prototype.__name__ = 'Website';

      Website.prototype.initialize = function(options, _parentOptions, startUpAnimationIsComplete, _viewportIsOnTop, _currentMediaQueryMode, languageHandler, __analyticsCode) {
        var onLoaded;
        if (options == null) {
          options = {};
        }
        this._parentOptions = _parentOptions != null ? _parentOptions : {
          logging: false,
          domNodeSelectorPrefix: 'body.{1}',
          onViewportMovesToTop: $.noop(),
          onViewportMovesAwayFromTop: $.noop(),
          onChangeToLargeMode: $.noop(),
          onChangeToMediumMode: $.noop(),
          onChangeToSmallMode: $.noop(),
          onChangeToExtraSmallMode: $.noop(),
          onChangeMediaQueryMode: $.noop(),
          onSwitchSection: $.noop(),
          onStartUpAnimationComplete: $.noop(),
          knownScrollEventNames: 'scroll mousedown wheel DOMMouseScroll mousewheel keyup ' + 'touchmove',
          switchToManualScrollingIndicator: function(event) {
            return event.which > 0 || event.type === 'mousedown' || event.type === 'mousewheel' || event.type === 'touchmove';
          },
          additionalPageLoadingTimeInMilliseconds: 0,
          trackingCode: null,
          mediaQueryCssIndicator: [['extraSmall', 'xs'], ['small', 'sm'], ['medium', 'md'], ['large', 'lg']],
          domNode: {
            mediaQueryIndicator: '<div class="media-query-indicator">',
            top: '> div.navbar-wrapper',
            scrollToTopButton: 'a[href="#top"]',
            startUpAnimationClassPrefix: '.website-start-up-animation-number-',
            windowLoadingCover: 'div.website-window-loading-cover',
            windowLoadingSpinner: 'div.website-window-loading-cover > div'
          },
          startUpFadeIn: {
            easing: 'swing',
            duration: 'slow'
          },
          windowLoadingCoverFadeOut: {
            easing: 'swing',
            duration: 'slow'
          },
          startUpAnimationElementDelayInMiliseconds: 100,
          windowLoadingSpinner: {
            lines: 9,
            length: 23,
            width: 11,
            radius: 40,
            corners: 1,
            rotate: 75,
            color: '#000',
            speed: 1.1,
            trail: 58,
            shadow: false,
            hwaccel: false,
            className: 'spinner',
            zIndex: 2e9,
            top: 'auto',
            left: 'auto'
          },
          activateLanguageSupport: true,
          language: {},
          scrollToTop: {
            inLinearTime: true,
            options: {
              duration: 'normal'
            },
            button: {
              slideDistanceInPixel: 30,
              showAnimation: {
                duration: 'normal'
              },
              hideAnimation: {
                duration: 'normal'
              }
            }
          },
          domain: 'auto'
        };
        this.startUpAnimationIsComplete = startUpAnimationIsComplete != null ? startUpAnimationIsComplete : false;
        this._viewportIsOnTop = _viewportIsOnTop != null ? _viewportIsOnTop : false;
        this._currentMediaQueryMode = _currentMediaQueryMode != null ? _currentMediaQueryMode : '';
        this.languageHandler = languageHandler != null ? languageHandler : null;
        this.__analyticsCode = __analyticsCode != null ? __analyticsCode : '(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){\n(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new window.Date();\na=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;\nm.parentNode.insertBefore(a,m)})(\nwindow,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');\nga(\'create\', \'{1}\', \'{2}\');ga(\'set\',\'anonymizeIp\',true);\nga(\'send\', \'pageview\');';

        /*
            Initializes the interactive web application.
        
            **options {Object}**    - An options object.
        
            **returns {$.Website}** - Returns the current instance.
         */
        this._onViewportMovesToTop = this.debounce(this.getMethod(this._onViewportMovesToTop));
        this._onViewportMovesAwayFromTop = this.debounce(this.getMethod(this._onViewportMovesAwayFromTop));
        this._options = $.extend(true, {}, this._parentOptions, this._options);
        Website.__super__.initialize.call(this, options);
        this.$domNodes = this.grabDomNode(this._options.domNode);
        this.disableScrolling()._options.windowLoadingCoverFadeOut.always = this.getMethod(this._handleStartUpEffects);
        this.$domNodes.windowLoadingSpinner.spin(this._options.windowLoadingSpinner);
        this._bindScrollEvents().$domNodes.parent.show();
        onLoaded = (function(_this) {
          return function() {
            _this.windowLoaded = true;
            return _this._removeLoadingCover();
          };
        })(this);
        if (window.less != null) {
          window.less.pageLoadFinished.then(onLoaded);
        } else {
          this.on(this.$domNodes.window, 'load', onLoaded);
        }
        this._addNavigationEvents()._addMediaQueryChangeEvents()._triggerWindowResizeEvents()._handleAnalytics();
        if (this._options.language.logging == null) {
          this._options.language.logging = this._options.logging;
        }
        if (this._options.activateLanguageSupport) {
          this.languageHandler = $.Lang(this._options.language);
        }
        return this;
      };

      Website.prototype.disableScrolling = function() {

        /*
            This method disables scrolling on the given web view.
        
            **returns {$.Website}** - Returns the current instance.
         */
        this.$domNodes.parent.addClass('disable-scrolling').on('touchmove', function(event) {
          return event.preventDefault();
        });
        return this;
      };

      Website.prototype.enableScrolling = function() {

        /*
            This method disables scrolling on the given web view.
        
            **returns {$.Website}** - Returns the current instance.
         */
        this.off(this.$domNodes.parent.removeClass('disable-scrolling'), 'touchmove');
        return this;
      };

      Website.prototype._onViewportMovesToTop = function() {

        /*
            This method triggers if the viewport moves to top.
        
            **returns {$.Website}** - Returns the current instance.
         */
        if (this.$domNodes.scrollToTopButton.css('visibility') === 'hidden') {
          this.$domNodes.scrollToTopButton.css('opacity', 0);
        } else {
          this._options.scrollToTop.button.hideAnimation.always = (function(_this) {
            return function() {
              return _this.$domNodes.scrollToTopButton.css({
                bottom: '-=' + _this._options.scrollToTop.button.slideDistanceInPixel
              });
            };
          })(this);
          this.$domNodes.scrollToTopButton.finish().animate({
            bottom: '+=' + this._options.scrollToTop.button.slideDistanceInPixel,
            opacity: 0
          }, this._options.scrollToTop.button.hideAnimation);
        }
        return this;
      };

      Website.prototype._onViewportMovesAwayFromTop = function() {

        /*
            This method triggers if the viewport moves away from top.
        
            **returns {$.Website}** - Returns the current instance.
         */
        if (this.$domNodes.scrollToTopButton.css('visibility') === 'hidden') {
          this.$domNodes.scrollToTopButton.css('opacity', 1);
        } else {
          this.$domNodes.scrollToTopButton.finish().css({
            bottom: '+=' + this._options.scrollToTop.button.slideDistanceInPixel,
            display: 'block',
            opacity: 0
          }).animate({
            bottom: '-=' + this._options.scrollToTop.button.slideDistanceInPixel,
            queue: false,
            opacity: 1
          }, this._options.scrollToTop.button.showAnimation);
        }
        return this;
      };

      Website.prototype._onChangeMediaQueryMode = function(oldMode, newMode) {

        /*
            This method triggers if the responsive design switches to
            another mode.
        
            **oldMode {String}**    - Saves the previous mode.
        
            **newMode {String}**    - Saves the new mode.
        
            **returns {$.Website}** - Returns the current instance.
         */
        return this;
      };

      Website.prototype._onChangeToLargeMode = function(oldMode, newMode) {

        /*
            This method triggers if the responsive design switches to large
            mode.
        
            **oldMode {String}**    - Saves the previous mode.
        
            **newMode {String}**    - Saves the new mode.
        
            **returns {$.Website}** - Returns the current instance.
         */
        return this;
      };

      Website.prototype._onChangeToMediumMode = function(oldMode, newMode) {

        /*
            This method triggers if the responsive design switches to
            medium mode.
        
            **oldMode {String}**    - Saves the previous mode.
        
            **newMode {String}**    - Saves the new mode.
        
            **returns {$.Website}** - Returns the current instance.
         */
        return this;
      };

      Website.prototype._onChangeToSmallMode = function(oldMode, newMode) {

        /*
            This method triggers if the responsive design switches to small
            mode.
        
            **oldMode {String}**    - Saves the previous mode.
        
            **newMode {String}**    - Saves the new mode.
        
            **returns {$.Website}** - Returns the current instance.
         */
        return this;
      };

      Website.prototype._onChangeToExtraSmallMode = function(oldMode, newMode) {

        /*
            This method triggers if the responsive design switches to extra
            small mode.
        
            **oldMode {String}**    - Saves the previous mode.
        
            **newMode {String}**    - Saves the new mode.
        
            **returns {$.Website}** - Returns the current instance.
         */
        return this;
      };

      Website.prototype._onSwitchSection = function(sectionName) {

        /*
            This method triggers if we change the current section.
        
            **sectionName {String}** - Contains the new section name.
        
            **returns {$.Website}**  - Returns the current instance.
         */
        return this;
      };

      Website.prototype._onStartUpAnimationComplete = function() {

        /*
            This method is complete if last startup animation was
            initialized.
        
            **returns {$.Website}** - Returns the current instance.
         */
        this.startUpAnimationIsComplete = true;
        return this;
      };

      Website.prototype._addMediaQueryChangeEvents = function() {

        /*
            This method adds triggers for responsive design switches.
        
            **returns {$.Website}** - Returns the current instance.
         */
        this.on(this.$domNodes.window, 'resize', this.getMethod(this._triggerWindowResizeEvents));
        return this;
      };

      Website.prototype._triggerWindowResizeEvents = function() {

        /*
            This method triggers if the responsive design switches its
            mode.
        
            **returns {$.Website}** - Returns the current instance.
         */
        $.each(this._options.mediaQueryCssIndicator, (function(_this) {
          return function(key, value) {
            _this.$domNodes.mediaQueryIndicator.prependTo(_this.$domNodes.parent).addClass("hidden-" + value[1]);
            if (_this.$domNodes.mediaQueryIndicator.is(':hidden') && value[0] !== _this._currentMediaQueryMode) {
              _this.fireEvent.apply(_this, ['changeMediaQueryMode', false, _this, _this._currentMediaQueryMode, value[0]].concat(_this.argumentsObjectToArray(arguments)));
              _this.fireEvent.apply(_this, [_this.stringFormat('changeTo{1}Mode', _this.stringCapitalize(value[0])), false, _this, _this._currentMediaQueryMode, value[0]].concat(_this.argumentsObjectToArray(arguments)));
              _this._currentMediaQueryMode = value[0];
            }
            return _this.$domNodes.mediaQueryIndicator.removeClass("hidden-" + value[1]);
          };
        })(this));
        return this;
      };

      Website.prototype._bindScrollEvents = function() {

        /*
            This method triggers if view port arrives at special areas.
        
            **returns {$.Website}** - Returns the current instance.
         */
        var $scrollTarget;
        $scrollTarget = $('body, html').add(this.$domNodes.window);
        $scrollTarget.on(this._options.knownScrollEventNames, (function(_this) {
          return function(event) {
            if (_this._options.switchToManualScrollingIndicator(event)) {
              return $scrollTarget.stop(true);
            }
          };
        })(this));
        this.on(this.$domNodes.window, 'scroll', (function(_this) {
          return function() {
            if (_this.$domNodes.window.scrollTop()) {
              if (_this._viewportIsOnTop) {
                _this._viewportIsOnTop = false;
                return _this.fireEvent.apply(_this, ['viewportMovesAwayFromTop', false, _this].concat(_this.argumentsObjectToArray(arguments)));
              }
            } else if (!_this._viewportIsOnTop) {
              _this._viewportIsOnTop = true;
              return _this.fireEvent.apply(_this, ['viewportMovesToTop', false, _this].concat(_this.argumentsObjectToArray(arguments)));
            }
          };
        })(this));
        if (this.$domNodes.window.scrollTop()) {
          this._viewportIsOnTop = false;
          this.fireEvent.apply(this, ['viewportMovesAwayFromTop', false, this].concat(this.argumentsObjectToArray(arguments)));
        } else {
          this._viewportIsOnTop = true;
          this.fireEvent.apply(this, ['viewportMovesToTop', false, this].concat(this.argumentsObjectToArray(arguments)));
        }
        return this;
      };

      Website.prototype._removeLoadingCover = function() {

        /*
            This method triggers after window is loaded.
        
            **returns {$.Website}** - Returns the current instance.
         */
        window.setTimeout((function(_this) {
          return function() {
            $(_this.stringFormat('[class^="{1}"], [class*=" {1}"]', _this.sliceDomNodeSelectorPrefix(_this._options.domNode.startUpAnimationClassPrefix).substr(1))).hide();
            if (_this.$domNodes.windowLoadingCover.length) {
              return _this.enableScrolling().$domNodes.windowLoadingCover.fadeOut(_this._options.windowLoadingCoverFadeOut);
            } else {
              return _this._options.windowLoadingCoverFadeOut.always();
            }
          };
        })(this), this._options.additionalPageLoadingTimeInMilliseconds);
        return this;
      };

      Website.prototype._handleStartUpEffects = function(elementNumber) {

        /*
            This method handles the given start up effect step.
        
            **elementNumber {Number}** - The current start up step.
        
            **returns {$.Website}**    - Returns the current instance.
         */
        this.$domNodes.windowLoadingSpinner.spin(false);
        if (!$.isNumeric(elementNumber)) {
          elementNumber = 1;
        }
        if ($(this.stringFormat('[class^="{1}"], [class*=" {1}"]', this.sliceDomNodeSelectorPrefix(this._options.domNode.startUpAnimationClassPrefix).substr(1))).length) {
          window.setTimeout(((function(_this) {
            return function() {
              var lastElementTriggered;
              lastElementTriggered = false;
              _this._options.startUpFadeIn.always = function() {
                if (lastElementTriggered) {
                  return _this.fireEvent('startUpAnimationComplete');
                }
              };
              $(_this._options.domNode.startUpAnimationClassPrefix + elementNumber).fadeIn(_this._options.startUpFadeIn);
              if ($(_this._options.domNode.startUpAnimationClassPrefix + (elementNumber + 1)).length) {
                return _this._handleStartUpEffects(elementNumber + 1);
              } else {
                return lastElementTriggered = true;
              }
            };
          })(this)), this._options.startUpAnimationElementDelayInMiliseconds);
        } else {
          this.fireEvent('startUpAnimationComplete');
        }
        return this;
      };

      Website.prototype._addNavigationEvents = function() {

        /*
            This method adds triggers to switch section.
        
            **returns {$.Website}** - Returns the current instance.
         */
        this.$domNodes.window.hashchange((function(_this) {
          return function() {
            if (_this.startUpAnimationIsComplete) {
              return _this.fireEvent('switchSection', false, _this, window.location.hash);
            }
          };
        })(this));
        return this._handleScrollToTopButton();
      };

      Website.prototype._handleScrollToTopButton = function() {

        /*
            Adds trigger to scroll top buttons.
        
            **returns {$.Website}** - Returns the current instance.
         */
        this.on(this.$domNodes.scrollToTopButton, 'click', (function(_this) {
          return function(event) {
            event.preventDefault();
            return _this._scrollToTop();
          };
        })(this));
        return this;
      };

      Website.prototype._scrollToTop = function(onAfter) {
        var distanceToTopInPixel;
        if (onAfter == null) {
          onAfter = $.noop();
        }

        /*
            Scrolls to top of page. Runs the given function after viewport
            arrives.
        
            **onAfter {Function}**  - Callback to call after effect has
                                      finished.
        
            **returns {$.Website}** - Returns the current instance.
         */
        this._options.scrollToTop.options.onAfter = onAfter;
        window.document.body = $('body')[0];
        if (this._options.scrollToTop.inLinearTime) {
          distanceToTopInPixel = this.$domNodes.window.scrollTop();
          this._options.scrollToTop.options.duration = distanceToTopInPixel / 4;
          $(window).scrollTo({
            top: "-=" + distanceToTopInPixel,
            left: '+=0'
          }, this._options.scrollToTop.options);
        } else {
          $(window).scrollTo({
            top: 0,
            left: 0
          }, this._options.scrollToTop.options);
        }
        return this;
      };

      Website.prototype._handleAnalytics = function() {

        /*
            Executes the page tracking code.
        
            **returns {$.Website}** - Returns the current instance.
         */
        var error, exception;
        if ((this._options.trackingCode != null) && this._options.trackingCode !== '__none__' && window.location.hostname !== 'localhost') {
          this.debug("Run analytics code: \"" + this.__analyticsCode + "\"", this._options.trackingCode, this._options.domain);
          try {
            (new Function(this.stringFormat(this.__analyticsCode, this._options.trackingCode, this._options.domain)))();
          } catch (error) {
            exception = error;
            this.warn('Problem in google analytics code snippet: {1}', exception);
          }
        }
        return this;
      };

      return Website;

    })($.Tools["class"]);
    $.Website = function() {
      return $.Tools().controller(Website, arguments);
    };
    return $.Website["class"] = Website;
  };

  if (this.require != null) {
    this.require.scopeIndicator = 'jQuery.Website';
    this.require([['jQuery.Tools', 'jquery-tools-1.0.coffee'], ['jQuery.scrollTo', 'jquery-scrollTo-2.1.0'], ['jQuery.fn.spin', 'jquery-spin-2.0.1'], ['jQuery.fn.hashchange', 'jquery-observeHashChange-1.0'], ['jQuery.Lang', 'jquery-lang-1.0.coffee']], main);
  } else {
    main(this.jQuery);
  }

}).call(this);


/* endregion */


/* region file: /home/torben/cloud/data/repository/jQuery-tools/documentationWebsite/coffeeScript/jQuery/jquery-documentation-1.0.js */


/*
This plugin provides generic documentation page features.

Copyright Torben Sickert 16.12.2012

License
-------

This library written by Torben Sickert stand under a creative commons naming
3.0 unported license. see http://creativecommons.org/licenses/by/3.0/deed.de

Extending this module
---------------------

For conventions see require on https://github.com/thaibault/require

Author
------

t.sickert["~at~"]gmail.com (Torben Sickert)

Version
-------

1.0 stable
 */

(function() {
  var main,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  main = function($) {
    var Documentation;
    Documentation = (function(superClass) {
      extend(Documentation, superClass);

      function Documentation() {
        return Documentation.__super__.constructor.apply(this, arguments);
      }


      /*
          This plugin holds all needed methods to extend a whole
          documentation site.
       */


      /*
          **__name__ {String}**
          Holds the class name to provide inspection features.
       */

      Documentation.prototype.__name__ = 'Documentation';


      /*
          Initializes the interactive web application.
      
          **options {Object}**          - An options object.
      
          **returns {$.Documentation}** - Returns the current instance.
       */

      Documentation.prototype.initialize = function(options, startUpAnimationIsComplete, _activateLanguageSupport, _languageHandler) {
        if (options == null) {
          options = {};
        }
        this.startUpAnimationIsComplete = startUpAnimationIsComplete != null ? startUpAnimationIsComplete : false;
        this._activateLanguageSupport = _activateLanguageSupport != null ? _activateLanguageSupport : false;
        this._languageHandler = _languageHandler != null ? _languageHandler : null;
        this._options = {
          onExamplesLoaded: $.noop(),
          domNodeSelectorPrefix: 'body.{1}',
          codeTableWrapper: '<div class="table-responsive">',
          showExample: {
            pattern: '^ *showExample(: *([^ ]+))? *$',
            domNodeName: '#comment',
            htmlWrapper: '<div class="show-example-wrapper">\n    <h3>\n        Example:\n        <!--deDE:Beispiel:-->\n        <!--frFR:Exemple:-->\n    </h3>\n</div>'
          },
          domNode: {
            tableOfContentLinks: 'div.toc > ul > li a[href^="#"]',
            aboutThisWebsiteLink: 'a[href="#about-this-website"]',
            homeLink: 'a[href="#home"]',
            aboutThisWebsiteSection: 'section.about-this-website',
            mainSection: 'section.main-content',
            codeWrapper: 'div.codehilite',
            code: 'div.codehilite > pre, code'
          },
          section: {
            aboutThisWebsite: {
              fadeOut: {
                duration: 'fast'
              },
              fadeIn: {
                duration: 'fast'
              }
            },
            main: {
              fadeOut: {
                duration: 'fast'
              },
              fadeIn: {
                duration: 'fast'
              }
            }
          }
        };
        this._activateLanguageSupport = options.activateLanguageSupport;
        options.activateLanguageSupport = false;
        Documentation.__super__.initialize.call(this, options);
        if (this._activateLanguageSupport == null) {
          this._activateLanguageSupport = this._parentOptions.activateLanguageSupport;
        }
        if (!window.location.hash) {
          window.location.hash = this.$domNodes.homeLink.attr('href');
        }
        this.$domNodes.aboutThisWebsiteSection.hide();
        this._showExamples()._makeCodeEllipsis();
        this.on(this.$domNodes.tableOfContentLinks, 'click', function() {
          return $.scrollTo($(this).attr('href'), 'slow');
        });
        this._options.section.aboutThisWebsite.fadeOut.always = (function(_this) {
          return function() {
            return _this.$domNodes.mainSection.fadeIn(_this._options.section.main.fadeIn);
          };
        })(this);
        this._options.section.main.fadeOut.always = (function(_this) {
          return function() {
            return _this.$domNodes.aboutThisWebsiteSection.fadeIn(_this._options.section.aboutThisWebsite.fadeIn);
          };
        })(this);
        this.on(this.$domNodes.aboutThisWebsiteLink, 'click', (function(_this) {
          return function() {
            return _this._scrollToTop().$domNodes.mainSection.fadeOut(_this._options.section.main.fadeOut);
          };
        })(this));
        this.on(this.$domNodes.homeLink, 'click', (function(_this) {
          return function(event) {
            return _this._scrollToTop().$domNodes.aboutThisWebsiteSection.fadeOut(_this._options.section.aboutThisWebsite.fadeOut);
          };
        })(this));
        return this;
      };

      Documentation.prototype._onExamplesLoaded = function() {

        /*
            This method triggers if all examples loaded.
        
            **returns {$.Documentation}** - Returns the current instance.
         */
        this.$domNodes = this.grabDomNode(this._options.domNode);
        if (this.startUpAnimationIsComplete && this._activateLanguageSupport && (this._languageHandler == null)) {
          this._languageHandler = $.Lang(this._options.language);
        }
        return this;
      };

      Documentation.prototype._onSwitchSection = function(hash) {

        /*
            This method triggers if we change the current section.
        
            **returns {$.Documentation}** - Returns the current instance.
         */
        this.$domNodes.tableOfContentLinks.add(this.$domNodes.aboutThisWebsiteLink).add(this.$domNodes.homeLink).filter("a[href=\"" + hash + "\"]").trigger('click');
        return Documentation.__super__._onSwitchSection.call(this);
      };

      Documentation.prototype._onStartUpAnimationComplete = function() {

        /*
            This method triggers if all startup animations are ready.
        
            **returns {$.Documentation}** - Returns the current instance.
         */
        if (this._activateLanguageSupport && (this._languageHandler == null)) {
          this._languageHandler = $.Lang(this._options.language);
        }
        this.startUpAnimationIsComplete = true;
        this.$domNodes.tableOfContentLinks.add(this.$domNodes.aboutThisWebsiteLink).filter("a[href=\"" + (window.location.href.substr(window.location.href.indexOf('#'))) + "\"]").trigger('click');
        return Documentation.__super__._onStartUpAnimationComplete.call(this);
      };


      /*
          This method makes dotes after code lines which are too long. This
          prevents line wrapping.
      
          **returns {$.Documentation}** - Returns the current instance.
       */

      Documentation.prototype._makeCodeEllipsis = function() {
        var self;
        self = this;
        this.$domNodes.code.each(function() {
          var $this, codeLines, newContent, tableParent;
          $this = $(this);
          tableParent = $this.closest('table');
          if (tableParent.length) {
            tableParent.wrap(self._options.codeTableWrapper);
          }
          newContent = '';
          codeLines = $this.html().split('\n');
          $.each(codeLines, function(index, value) {
            var excess;
            excess = $("<div>" + value + "</div>").text().length - 79;
            if (excess > 0) {
              newContent += self._replaceExcessWithDots(value, excess);
            } else {
              newContent += value;
            }
            if (index + 1 !== codeLines.length) {
              return newContent += "\n";
            }
          });
          return $this.html(newContent);
        });
        return this;
      };

      Documentation.prototype._replaceExcessWithDots = function(content, excess) {

        /*
            Replaces given html content with a shorter version trimmed by
            given amount of excess.
        
            **content {String}** - String to trim.
            **excess {Number}**  - Amount of excess.
        
            **returns {String}** - Returns the trimmed content.
         */
        var $content, error, error1, newContent, wrapped;
        excess += 3;
        newContent = '';
        try {
          $content = $(content);
          if (!$content.length) {
            throw 'error';
          }
        } catch (error1) {
          error = error1;
          $content = $("<wrapper>" + content + "</wrapper>");
          wrapped = true;
        }
        $($content.get().reverse()).each(function() {
          var $wrapper, contentSnippet;
          if (wrapped) {
            $wrapper = $(this);
          } else {
            $wrapper = $(this).wrap('<wrapper>').parent();
          }
          contentSnippet = $wrapper.html();
          if (!contentSnippet) {
            contentSnippet = this.textContent;
          }
          if (excess) {
            if (this.textContent.length < excess) {
              excess -= this.textContent.length;
              contentSnippet = '';
            } else if (this.textContent.length >= excess) {
              this.textContent = this.textContent.substr(0, this.textContent.length - excess - 1) + '...';
              excess = 0;
              contentSnippet = $wrapper.html();
              if (!contentSnippet) {
                contentSnippet = this.textContent;
              }
            }
          }
          return newContent = contentSnippet + newContent;
        });
        return newContent;
      };

      Documentation.prototype._showExamples = function() {

        /*
            Shows marked example codes directly in browser.
        
            **returns {$.Documentation}** - Returns the current instance.
         */
        var self;
        self = this;
        this.$domNodes.parent.find(':not(iframe)').contents().each(function() {
          var $codeDomNode, code, match, ref;
          if (this.nodeName === self._options.showExample.domNodeName) {
            match = this.textContent.match(new RegExp(self._options.showExample.pattern));
            if (match) {
              $codeDomNode = $(this).next();
              code = $codeDomNode.find(self.$domNodes.codeWrapper).text();
              if (!code) {
                code = $codeDomNode.text();
              }
              if ($.inArray((ref = match[2]) != null ? ref.toLowerCase() : void 0, ['javascript', 'js']) !== -1) {
                return $codeDomNode.after($('<script>').attr('type', 'text/javascript').text(code));
              } else if ((match[2] != null) && $.inArray(match[2].toLowerCase(), ['css', 'cascadingstylesheets', 'stylesheets', 'sheets', 'style']) !== -1) {
                return $codeDomNode.after($('<style>').attr('type', 'text/css').text(code));
              } else if ((match[2] != null) && $.inArray(match[2].toLowerCase(), ['hidden']) !== -1) {
                return $codeDomNode.after(code);
              } else {
                return $codeDomNode.after($(self._options.showExample.htmlWrapper).append(code));
              }
            }
          }
        });
        this.fireEvent('examplesLoaded');
        return this;
      };

      return Documentation;

    })($.Website["class"]);
    $.Documentation = function() {
      return $.Tools().controller(Documentation, arguments);
    };
    return $.Documentation["class"] = Documentation;
  };

  if (this.require != null) {
    this.require.scopeIndicator = 'jQuery.Documentation';
    this.require([['jQuery.Website', 'jquery-website-1.0.coffee']], main);
  } else {
    main(this.jQuery);
  }

}).call(this);


/* endregion */


/* region file: /home/torben/cloud/data/repository/jQuery-tools/documentationWebsite/coffeeScript/main.js */

(function() {
  this.jQuery.noConflict()(function($) {
    return $.Documentation({
      trackingCode: 'UA-40192634-7',
      language: {
        allowedLanguages: ['deDE', 'enUS'],
        sessionDescription: 'documentationWebsite{1}'
      }
    });
  });

}).call(this);


/* endregion */
