// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/validate-pw.js":[function(require,module,exports) {
// DOM Elements
var form = document.getElementById('pw-validator');
var submit = document.querySelector('.submit');
var password = document.querySelector('.password');
var checkpoints = document.querySelector('.checkpoints');
var charsmin = document.querySelector('#chars-min');
var charsmax = document.querySelector('#chars-max');
var digitsmin = document.querySelector('#digits-min');
var lowercasemin = document.querySelector('#lowercase-min');
var uppercasemin = document.querySelector('#uppercase-min');
var specialcharmin = document.querySelector('#special-char-min');
var pwlength = document.querySelector('.pw-length');
var inputFocus = document.querySelector('#pw-validator .wrapper'); // Password Variables

var passwordLengthMin = 8;
var passwordLengthMax = 32;
/**
 *  Password Requirements  
 * 
 *  1. 8 - 32 chars long
 *  2. 1 or more special char
 *  3. 1 or more uppercase letter
 *  4. 1 or more lowercase letter
 * 
 */

function validatePassword(str) {
  // Regex patterns
  var regexCharDigit = /[0-9]/g;
  var regexCharSpecial = /\W+/g;
  var regexCharUppercase = /[A-Z]/g;
  var regexCharLowercase = /[a-z]/g; // Test regex has patterns, true or false

  var hasCharDigit = regexCharDigit.test(str);
  var hasCharSpecial = regexCharSpecial.test(str);
  var hasCharUppercase = regexCharUppercase.test(str);
  var hasCharLowercase = regexCharLowercase.test(str); // Show regex patterns

  var showCharDigit = str.match(regexCharDigit);
  var showCharSpecial = str.match(regexCharSpecial);
  var showCharUppercase = str.match(regexCharUppercase);
  var showCharLowercase = str.match(regexCharLowercase); // Length criteria

  var passwordLength = str.length; // Length difference

  var passwordLengthGood = passwordLength - passwordLengthMax;
  var passwordLengthDiffShort = passwordLengthMin - passwordLength;
  var passwordLengthDiffLong = passwordLength - passwordLengthMax; // Password checks, set default values

  var passwordLengthIsGood = false;
  var passwordLengthIsShort = true;
  var passwordLengthIsLong = false; // Set password length status when good

  if (passwordLength >= passwordLengthMin && passwordLength <= passwordLengthMax) {
    passwordLengthIsGood = true;
    passwordLengthIsShort = false;
    passwordLengthIsLong = false;
  } // Set password length status when short


  if (passwordLength < passwordLengthMin) {
    passwordLengthIsGood = false;
    passwordLengthIsShort = true;
    passwordLengthIsLong = false;
  } // Set password length status when long


  if (passwordLength > passwordLengthMax) {
    passwordLengthIsGood = false;
    passwordLengthIsShort = false;
    passwordLengthIsLong = true;
  } // Validation Array of Objects for each Check


  var checklistArr = [{
    check: hasCharDigit,
    target: digitsmin
  }, {
    check: hasCharSpecial,
    target: specialcharmin
  }, {
    check: hasCharLowercase,
    target: lowercasemin
  }, {
    check: hasCharUppercase,
    target: uppercasemin
  }]; // Add classes if input has text

  if (passwordLength > 0) {
    // Checks for digits, lowercase, uppercase, and specialchar to be true
    checklistArr.forEach(function (obj) {
      if (obj.check) {
        if (obj.target === digitsmin || obj.target === lowercasemin) {
          obj.target.classList.add('pass');
        } else {
          obj.target.classList.add('pass-even');
        }
      } else {
        obj.target.classList.remove('pass');
        obj.target.classList.remove('pass-even');
      }
    }); // Remove Classes if input has no text
  } else {
    checklistArr.forEach(function (obj) {
      obj.target.classList.remove('pass');
      obj.target.classList.remove('pass-even');
    });
  } // Validate length


  if (passwordLength === 0) {
    charsmin.classList.remove('pass');
    charsmax.classList.remove('pass-even');
  } else if (passwordLength >= passwordLengthMin) {
    charsmin.classList.add('pass');
  } else if (passwordLength > 0) {
    charsmax.classList.add('pass-even');
  } // Remove max if greater than max chars allowed


  if (passwordLength > passwordLengthMax) {
    charsmax.classList.remove('pass-even');
  } // Display number of digits for user to see count


  if (passwordLength === 0) {
    pwlength.style.color = 'white';
  } else if (passwordLengthIsShort) {
    pwlength.style.color = 'var(--warning)';
    pwlength.innerHTML = "-".concat(passwordLengthDiffShort);
  } else if (passwordLengthIsGood) {
    pwlength.style.color = 'var(--pass)';
    pwlength.innerHTML = "".concat(passwordLength);
  } else if (passwordLengthIsLong) {
    pwlength.style.color = 'var(--warning)';
    pwlength.innerHTML = "+".concat(passwordLengthDiffLong);
  }
}

; // Validate onkeyup

function validateInput(str) {
  validatePassword(str);
}

; // Style Input Focus

function getfocus() {
  password.style.height = '60px';
  inputFocus.style.border = '3px solid var(--primary)';
}

function losefocus() {
  password.style.height = '64px';
  inputFocus.style.border = '1px solid var(--primary)';
  password.placeholder = 'Enter password';
}
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53188" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/validate-pw.js"], null)
//# sourceMappingURL=/validate-pw.d02b71c0.js.map