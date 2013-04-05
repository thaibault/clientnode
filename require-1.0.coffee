## require

# region header

###!
    Copyright

    Torben Sickert 16.12.2012

    License

    require von Torben Sickert steht unter einer Creative Commons
    Namensnennung 3.0 Unported Lizenz.

    see http://creativecommons.org/licenses/by/3.0/deed.de

    @author t.sickert@gmail.com (Torben Sickert)
    @version 1.0 stable
    @fileOverview
    This native javaScript module provides a full featured import mechanism
    like python, php, c++ etc..

    Conventions (rcX := require convention number x)

    - rc1 Capitalized variables are constant and shouldn't be mutable.
    - rc2 Properties with preceding underscores shouldn't be accessed from
          the outer scope. They could accessed in inherited objects
          (protected attributes).
    - rc3 Property with two preceding underscore shouldn't be accessed from
          any location then the object itself (private attributes).
    - rc4 Follow the javascript OOP conventions like camel-case class-names
          methods and property names.
    - rc5 Class-names have a leading upper case letter.
    - rc6 Methods and functions are starting with a lower case letter.
    - rc7 Do not use more chars then 79 in one line.
    - rc8 Use short and/or long description doc-strings for all definitions.
    - rc9 Write qunit tests for each unit it is possible and try to reach 100%
          path coverage.
    - rc10 Sorting imports as following:
               1. Import all standard modules and packages,
               2. then all from third party,
               3. now import your own modules or packages.
               4. Sort import names alphabetically and seperate the previous
                  defined parts with blank lines.
    - rc11 Import everthing by its whole name and reference path and use it by
           its full reference path (even builtin units).
    - rc12 Don't use any abbreviations.
    - rc13 Try to use small cyclomatice complexity in all units.
           (e.g. less than 20 or 30).
    - rc14 Use one of the plugin pattern described in "jQuery.Tools".
    - rc15 Use the area statement syntax to structure your code and make it
           possible to fold them in many IDE's
           (see Structure of meta documenting below).
    - rc16 Always think that code is more read than written.
    - rc17 By choosing witch quotes to use follow this priority.
               1. Single quote (')
               2. Double quote (")
    - rc18 Indent function parameter which doesn't match in one line like:

           function(
               parameter1, parameter2, parameter3,
               parameter4)

           instead of:

           function(parameter1,
                    parameter2,
                    parameter3,
                    parameter4)

Structure of meta documenting classes. (see rc15)

    // region header

    window.require([['ia', 'ia-1.0'], ['ib', 'ib-2.0']]), function(ia) {

    // endregion

    // region plugins

        var A = function() {

        // region (Public|Protected) (properties|methods)

            // region Property of method or property group

                // region Subproperty of method or property group

            ...

                // endregion

            // endregion

        // endregion

        };

    // endregion

    // region footer

    });

    // endregion

Structure of dependencies

    0. window
    1. window.require
    3. jQuery
    4. jQuery.Tools
    5. jQuery.*

    This means that a module in level "i" could only import a full module
    in its header in level "j" if "j < i" is valid.
###


###* @name window ###

# endregion

# region objects

###*
    This class can be used as function for defining dependencies for
    modules.
    Note that this function searches in the same ressource as the first
    javascript include tag in your markup if given dependency resource
    doesn't start with "http://".
    You can manually change this behavior by adding a search base via
    "window.require.basePath".
    @memberOf window
    @class

    @example
window.require([['jQuery', 'jquery-1.8.3']], function() {
    jQuery('div#id').show('slow');
});
###
class require
    ###
        These properties could be understand as static (or class instead of
        object) properties.
    ###

    # region public properties

    ###*
        If setted all ressources will be appended by a timestamp string to
        make each request unique.
        This is usefull to workaround some browsers caching mechanisms
        which aren't required.

        @property {Boolean}
    ###
    this.appendTimeStamp
    ###*
        Indicates if debugging is active.

        @property {Boolean}
    ###
    this.logging
    ###*
        Saves the base path for relative defined module locations.

        @property {Object}
    ###
    this.basePath
    ###*
        If the require scope should be deleted after serving all
        dependencies this property should be an array with a callback
        function and its arguments following. The function will be called
        after last dependency was solved. Simply define true is also
        valid.

        @property {Boolean}
    ###
    this.noConflict
    ###*
        Caches a reference to the head for injecting needed script tags.

        @property {DomNode}
    ###
    this.headNode
    ###*
        Saves all loaded script ressources to prevent double script
        loading.

        @property {String[]}
    ###
    this.initializedLoadings
    ###*
        Indicates if require should load ressource on its own.

        @property {Boolean}
    ###
    this.passiv
    ###*
        Saves the initially pointed target of global variable
        "window.require" to reset that reference in "noConflict" mode.

        @property {Mixed}
    ###
    this.referenceSafe
    ###*
        Describes all supported scripts with their needed properties to
        load them. A Mapping from file endings to their script node types.

        @property {Object}
    ###
    this.scriptTypes
    ###*
        Describes a mapping from regex pattern which detects all modules
        to load via ajax to their corresponding handler functions.

        @property {Object}
    ###
    this.asyncronModulePatternHandling
    ###*
        Defines in which scope the required dependencies have to be present.

        @property {Object}
    ###
    this.context

    # endregion

    # region protected properties

    ###*
        Saves function calls to require for running them in right order to
        guarantee dependencies. It consits of a list of tuples storing
        needed dependency as string and arguments to be given to callback
        function if dependency is determined.

        @property {Object[]}
    ###
    this._callQueue

    # endregion

    # region public methods

        # region special methods

    ###*
        @description This method is used as initializer. Class properties
                     will be initialized if its the first call to require.
                     This methods gets the same arguments as the global
                     "require" constructor.

        @param {Array[String[]]} modules A list of string array which describes
                                         needed modules. Every element is a
                                         tuple consisting of an object
                                         reference which has to be available
                                         after script was loading and the
                                         module name (basename of script file
                                         with or without file extension).
        @param {Function} onLoaded A callback function to load after all
                                   dependences are available.
        @param {Object} onLoadedArguments A various number of arguments given
                                          to the "onLoaded" callback function.

        @returns {require} Returns the current instance.
    ###
    constructor: (modules, onLoaded, onLoadedArguments) ->
        # Set class property default values.
        if not require.context?
            require.context = this
        if not require.referenceSafe?
            require.referenceSafe = this.require
        if not require.basePath?
            require.basePath = {}
            for scriptNode in document.getElementsByTagName 'script'
                if not require.basePath.default
                    require.basePath.default = scriptNode.src.substring(
                        0, scriptNode.src.lastIndexOf('/') + 1)
                extension = scriptNode.src.substring(
                    scriptNode.src.lastIndexOf('.') + 1)
                if extension and not require.basePath[extension]
                    require.basePath[extension] = scriptNode.src.substring(
                        0, scriptNode.src.lastIndexOf('/') + 1)
        for type, path of require.basePath
            if path.substring(path.length - 1) isnt '/'
                require.basePath[type] += '/'
        if not require.appendTimeStamp?
            require.appendTimeStamp = false
        if not require.passiv?
            require.passiv = false
        if not require.logging?
            require.logging = false
        if not require.noConflict?
            require.noConflict = false
        if not require.initializedLoadings?
            require.initializedLoadings = []
        if not require.headNode?
            require.headNode = document.getElementsByTagName('head')[0]
        if not require.scriptTypes?
            require.scriptTypes = '.js': 'text/javascript'
        if not require.asyncronModulePatternHandling?
            require.asyncronModulePatternHandling =
                '^.+\.css$': (cssContent) ->
                    styleNode = document.createElement 'style'
                    styleNode.type = 'text/css'
                    styleNode.appendChild document.createTextNode cssContent
                    require.headNode.appendChild styleNode
        if not require._callQueue?
            require._callQueue = []
        return require::_load.apply require, arguments

        # endregion

    # endregion

    # region protected methods

    ###*
        @description Loads needed modules and run the "onLoaded" callback
                     function. This methods gets the same arguments as the
                     global "require" constructor.

        @returns {require} Returns the current instance.
    ###
    _load: ->
        ###
            This method is alway working with arguments array for easy
            recursive calling itself with a dynamic number of arguments.
        ###
        ###
            Convert arguments object to an array.

            This following outcomment line would be responsible for a bug
            in yuicompressor.
            Because of declaration of arguments the parser things that
            arguments is a local variable and could be renamed.
            It doesn't care about that the magic arguments object is
            neccessary to generate the arguments array in this context.

            var arguments = Array.prototype.slice.call(arguments);
        ###
        parameter = Array.prototype.slice.call arguments
        ###
            Make sure that we have a copy of given array containing needed
            dependencies.
        ###
        if parameter[parameter.length - 1] isnt require
            # Save a copy if initially given dependencies.
            parameter.push parameter[0].slice 0
            # Mark array as initialized.
            parameter.push require
        if parameter[0].length
            # Grab first needed dependency from given queue.
            module = parameter[0].shift()
            if(typeof(module) is 'object' and
               require::_isModuleLoaded module)
                ###
                    If module is already there make a recursive call with
                    one module dependency less.
                ###
                require::_load.apply require, parameter
            else if (
                typeof(module) is 'string' or
                not require::_isLoadingInitialized module[0], parameter
            )
                ###
                    If module is currently not loading put current function
                    call initialize loading needed ressource.
                ###
                if typeof(module) is 'string'
                    module = ['', module]
                if require.passiv
                    require::_log(
                        'Prevent loading module "' + module[0] +
                        '" in passiv mode.')
                else
                    require::_initializeRessourceLoading module, parameter
        else
            ###
                Call a given event handler (if provided as second argument)
                when all dependencies are determined.
            ###
            if parameter.length > 3
                parameter[1].apply(
                    require.context, require::_generateLoadedHandlerArguments(
                        parameter))
            ###
                If other dependencies aren't determined yet try to
                determine it now after a new dependency was loaded.
            ###
            if(require._callQueue.length and require::_isModuleLoaded(
               require._callQueue[require._callQueue.length - 1]))
                require::_load.apply require, require._callQueue.pop()[1]
        if require and require._handleNoConflict
            return require::_handleNoConflict()
        return require
    ###*
        @description Initialize loading of needed ressources.

        @param {String[]} module A tuple (consisting of module indicator
                                 and module file path) which should be
                                 loaded.
        @param {Object[]} parameters Saves arguments indented to be given
                                     to the onload function.

        @returns {require} Returns the current instance.
    ###
    _initializeRessourceLoading: (module, parameter) ->
        isAsyncronRequest = false
        for asyncronModulePattern, callback of require.asyncronModulePatternHandling
            if new RegExp(asyncronModulePattern).test module[1]
                if window.XMLHttpRequest
                    ajaxObject = new XMLHttpRequest
                else
                    ajaxObject = new ActiveXObject(
                        'Microsoft.XMLHTTP')
                ajaxObject.open(
                    'GET', require::_getScriptFilePath module[1] , true)
                ajaxObject.onreadystatechange = ->
                    if ajaxObject.readyState is 4 and ajaxObject.status is 200
                        require.asyncronModulePatternHandling[asyncronModulePattern](
                            ajaxObject.responseText, module, parameter)
                        require::_scriptLoaded module, parameter
                        # Delete event after passing it once.
                        ajaxObject.onreadystatechange = null
                    else if ajaxObject.status isnt 200
                        require::_log(
                            'Loading ressource "' + module[1] +
                            '" failed via ajax with status "' +
                            ajaxObject.status + '" in state "' +
                            ajaxObject.readyState + '".')
                ajaxObject.send null
                isAsyncronRequest = true
                break
        if not isAsyncronRequest
            require::_appendRessourceDomNode(
                require::_createScriptLoadingNode(module[1]), module,
                parameter)
        type = 'header dom node'
        if isAsyncronRequest
            type = 'ajax'
        require::_log "Initialized loading of \"#{module[1]}\" via #{type}."
        return require
    ###*
        @description Generates an array of arguments from initially given
                     arguments to the require constructor. The generated
                     arguments are designed to give loaded handler a useful
                     scope

        @param {Object[]} parameters Initially given arguments.

        @returns {Object[]} Returns an array of arguments.
    ###
    _generateLoadedHandlerArguments: (parameters) ->
        additionalArguments = []
        for index in [0..parameters[parameters.length - 2].length - 1]
            if parameters[parameters.length - 2][index].length is 2
                moduleObjects =
                    parameters[parameters.length - 2][index][0].split '.'
                query = require.context
                for subIndex in [0..moduleObjects.length - 1]
                    query = query[moduleObjects[subIndex]]
                    additionalArguments.push query
        return parameters.slice(2, parameters.length - 2).concat(
            additionalArguments, parameters[parameters.length - 2])
    ###*
        @description Appends a given script loading tag inside the dom
                     tree.

        @param {DomNode} ScriptNode Dom node where to append script
                         loading node.
        @param {String[]} module A tuple (consisting of module indicator
                                 and module file path) which should be
                                 loaded.
        @param {Object[]} parameters Saves arguments indented to be given
                                     to the onload function.

        @returns {require} Returns the current instance.
    ###
    _appendRessourceDomNode: (scriptNode, module, parameters) ->
        ###
            Internet explorer workaround for capturing event when
            script is loaded.
        ###
        if scriptNode.readyState
            scriptNode.onreadystatechange = ->
                if(scriptNode.readyState is 'loaded' or
                   scriptNode.readyState is 'complete')
                    require::_scriptLoaded module, parameters
                    # Delete event after passing it once.
                    scriptNode.onreadystatechange = null
        else
            scriptNode.onload = ->
                require::_scriptLoaded module, parameters
                # Delete event after passing it once.
                scriptNode.onload = null
        require.headNode.appendChild scriptNode
        return require
    ###*
        @description Creates a new script loading tag.

        @param {String} scriptFilePath Path pointing to the file ressource.

        @returns {String} The absolute path to needed ressource.
    ###
    _getScriptFilePath: (scriptFilePath) ->
        if scriptFilePath.substring(0, 'http://'.length) is 'http://'
            return scriptFilePath
        extension = scriptFilePath.substring(
            scriptFilePath.lastIndexOf('.') + 1)
        if require.basePath[extension]
            return require.basePath[extension] + scriptFilePath
        return require.basePath.default + scriptFilePath
    ###*
        @description Creates a new script loading tag.

        @param {String} scriptFilePath Path pointing to the file ressource.

        @returns {DomNode} Returns script node needed to load given script
                           ressource.
    ###
    _createScriptLoadingNode: (scriptFilePath) ->
        scriptNode = document.createElement 'script'
        scriptNode.src = require::_getScriptFilePath scriptFilePath
        hasExtension = false
        for extension, scriptType of require.scriptTypes
            if scriptNode.src.substr(-extension.length) is extension
                hasExtension = true
                break
        if not hasExtension
            scriptNode.src += extension
        scriptNode.type = scriptType
        if require.appendTimeStamp
            scriptNode.src += '?timestamp=' + (new Date).getTime()
        return scriptNode
    ###*
        @description If script was loaded it will be deleted from the
                     "initializedLoading" array. If all dependencies for
                     this module are available the sequence could continue
                     oterwise the current sequence status
                     (the parameter array) will be saved in a queue for
                     continue later.

        @param {String[]} module A tuple of module name to indicate if a
                          module is presence and its file path ressource.
        @param {Object[]} parameters Saves arguments indented to be given
                                     to the onload function.

        @returns {require} Returns the current instance.
    ###
    _scriptLoaded: (module, parameters) ->
        for key, value in require.initializedLoadings
            if module[0] is value
                require.initializedLoadings.splice key, 1
                break
        if require::_isModuleLoaded module
            require::_load.apply require, parameters
        else
            require._callQueue.push [module[0], parameters]
        return require
    ###*
        @description If "noConflict" property is set it will be handled
                     by this method. It clear the called scope from the
                     "require" name and optionally runs a callback
                     function given by the "noConflict" property after all
                     dependencies are solved.

        @returns {require} Returns the current instance.
    ###
    _handleNoConflict: ->
        if (require._callQueue.length is 0 and require.initializedLoadings.length is 0)
            require::_log 'All ressources are loaded so far.'
            if require and require.noConflict
                if require.noConflict is true
                    ###
                        Restore previous setted value to the "require"
                        reference.
                    ###
                    require = require.referenceSafe
                else
                    # Workaround to not copy not only the reference.
                    callback = require.noConflict.slice()
                    require = undefined
                    callback[0].apply require.context, callback.slice 1
        return require
    ###*
        @description Determines if the given moduleObject is currently
                     loading. If the given module is currently loading
                     the current sequence status will be stored in the
                     "callQueue" for continuing later.

        @param {String} moduleName A module object to indicate if a module
                                   is presence.
        @param {Object[]} parameters The current status of solving the
                                     initially described arguments.

        @returns {Boolean} If given module object is currently loading
                           "true" will be given back and "false" otherwise.
    ###
    _isLoadingInitialized: (moduleName, parameters) ->
        for key, value in require.initializedLoadings
            if moduleName is value
                require._callQueue.push [moduleName, parameters]
                return true
        if moduleName
            require.initializedLoadings.push moduleName
        return false
    ###*
        @description Determines if the given moduleObject is present in the
                     global (window) scope.

        @param {String[]} module A tuple of module name to indicate if a
                                 module is presence and its file path.

        @returns {Boolean} If given module object is present this method
                           will return "true" and "false" otherwise.
    ###
    _isModuleLoaded: (module) ->
        query = require.context
        if module[0]
            moduleObjects = module[0].split '.'
            for index in [0..moduleObjects.length - 1]
                if query[moduleObjects[index]]
                    query = query[moduleObjects[index]]
                else
                    require::_log(
                        '"' + module[0] + '" isn\'t available because "' +
                        moduleObjects[index] + '" is missing in "' +
                        query.toString() + '".')
                    return false
            require::_log '"' + module[0] + '" is loaded complete.'
        else
            require::_log '"' + module[1] + '" is loaded complete.'
        return true
    ###*
        @description If logging is enabled. Method shows the given message
                     in the browsers console if possible or in a standalone
                     alert-window as fallback.

        @param {String} message A logging message.

        @returns {undefined|false} Returns the return value of
                                   "window.console.log()" or
                                   "window.alert()" or "false" if logging
                                   is disabled.
    ###
    _log: (message) ->
        if require.logging
            if window.console and window.console.log
                return window.console.log 'require: ' + message
            return window.alert 'require: ' + message
        return false

    # endregion

###* @ignore ###
this.require = require

# endregion
