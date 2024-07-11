/*!
 * purecounter.js - A simple yet configurable native javascript counter which you can count on.
 * Author: Stig Rex
 * Version: 1.5.0
 * Url: https://github.com/srexi/purecounterjs
 * License: MIT
 */
! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.PureCounter = t() : e.PureCounter = t()
}(self, (function() {
    return e = {
        638: function(e) {
            function t(e, t, r) {
                return t in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function r(e) {// This function creates the configuration with default values and merges provided configuration.
function setOptions(config, baseConfig = {}) {
    // Create a new configuration object.
    var newConfig = {};

    // Loop config items to set it value into the configuration.
    for (var key in config) {
        // If base config is set, only accept the base config property.
        if (baseConfig != {} && !baseConfig.hasOwnProperty(key)) continue;
        // Parse the config value.
        var val = parseValue(config[key]);
        // Set the new configuration property value.
        newConfig[key] = val;
        // Exclusive for 'duration' or 'pulse' property, recheck the value.
        // If it's not a boolean, just set it to milisecond unit.
        if (key.match(/duration|pulse/)) {
            newConfig[key] = typeof val != "boolean" ? val * 1000 : val;
        }
    }

    // Finally, we can just merge the base config (if any), with the new config.
    return Object.assign({}, baseConfig, newConfig);
}

// This is the counter method to do its job.
function startCounter(element, config) {
    // First, get the increments step.
    var incrementsPerStep =
        (config.end - config.start) / (config.duration / config.delay);
    // Next, set the counter mode (Increment or Decrement).
    var countMode = "inc";

    // Set mode to 'decrement' and 'increment step' to minus if start is larger than end.
    if (config.start > config.end) {
        countMode = "dec";
        incrementsPerStep *= -1;
    }

    // Next, determine the starting value.
    var currentCount = parseValue(config.start);
    // And then print its value to the page.
    element.innerHTML = formatNumber(currentCount, config);

    // If the config 'once' is true, then set the 'duration' to 0.
    if (config.once === true) {
        element.setAttribute("data-purecounter-duration", 0);
    }

    // Now start counting with counterWorker using the interval method based on delay.
    var counterWorker = setInterval(() => {
        // First determine the next value base on current value, increment value, and count mode.
        var nextNum = nextNumber(currentCount, incrementsPerStep, countMode);
        // Next, print that value to the page.
        element.innerHTML = formatNumber(nextNum, config);
        // Now set that value to the current value, because it's already printed.
        currentCount = nextNum;

        // If the value is larger or less than the 'end' (based on mode), then print the end value and stop the interval.
        if (
            (currentCount >= config.end && countMode == "inc") ||
            (currentCount <= config.end && countMode == "dec")
        ) {
            element.innerHTML = formatNumber(config.end, config);
            // If 'pulse' is set ignore the 'once' config.
            if (config.pulse) {
                // First set the 'duration' to zero.
                element.setAttribute("data-purecounter-duration", 0);
                // Next use timeout to reset it duration back based on 'pulse' config.
                setTimeout(() => {
                    element.setAttribute(
                        "data-purecounter-duration",
                        config.duration / 1000
                    );
                }, config.pulse);
            }
            clearInterval(counterWorker);
        }
    }, config.delay);
}

// This function is to get the next number in the counting order.
function nextNumber(number, steps, mode = "inc") {
    // First get the exact value from the number and step (int or float).
    number = parseValue(number);
    steps = parseValue(steps);

    // Last get the next number based on current number, increment step, and count mode.
    return parseFloat(mode === "inc" ? number + steps : number - steps);
}

// This function is to convert number into currency format.
function convertNumber(number, config) {
    // Use the converter if 'filesizing' or 'currency' is on.
    if (config.filesizing || config.currency) {
        number = Math.abs(Number(number)); // Get the absolute value of number.

        var baseNumber = 1000, // Base multiplying threshold.
            symbol =
                config.currency && typeof config.currency === "string"
                    ? config.currency
                    : "", // Set the currency symbol (if any).
            limit = config.decimals || 1, // Set the decimal limit (default is 1).
            unit = ["", "K", "M", "B", "T"], // Number unit based exponent threshold.
            value = ""; 

        // Changes base number and its unit for filesizing.
        if (config.filesizing) {
            baseNumber = 1024; // Use 1024 instead of 1000.
            unit = ["bytes", "KB", "MB", "GB", "TB"]; // Change to 'bytes' unit.
        }

        // Set the value based on the threshold.
        for (var i = 4; i >= 0; i--) {
            // If the exponent is 0.
            if (i === 0) value = `${number.toFixed(limit)} ${unit[i]}`;
            // If the exponent is above zero.
            if (number >= getFilesizeThreshold(baseNumber, i)) {
                value = `${(number / getFilesizeThreshold(baseNumber, i)).toFixed(
                    limit
                )} ${unit[i]}`;
                break;
            }
        }

        // Apply the symbol before the value and return it as string.
        return symbol + value;
    } else {
        // Return its value as float if not using filesizing or currency.
        return parseFloat(number);
    }
}

// This function will get the given filesize base.
function getFilesizeThreshold(baseNumber, index) {
    return Math.pow(baseNumber, index);
}

// This function is to get the last formated number.
function applySeparator(value, config) {
    // Get replaced value based on it's separator/symbol.
    function replacedValue(val, separator) {
        // Regex to determine the seperator configuration of the number.
        var separatorRegExp =
            /^(?:(\d{1,3},(?:\d{1,3},?)*)|(\d{1,3}\.(?:\d{1,3}\.?)*)|(\d{1,3}(?:\s\d{1,3})*))([\.,]?\d{0,2}?)$/gi;

        return val.replace(separatorRegExp, function (match, g1, g2, g3, g4) {
            var result = "",
                sep = "";
            if (g1 !== undefined) {
                // The number's format is using a comma as the thousand separator, and a period as the decimal separator.
                result = g1.replace(new RegExp(/,/gi, "gi"), separator);
                sep = ",";
            } else if (g2 !== undefined) {
                // The number's format is using a period as the thousand separator, and a comma as the decimal separator.
                result = g2.replace(new RegExp(/\./gi, "gi"), separator);
            } else if (g3 !== undefined) {
                // The number's format is using a space as the thousand separator, and a comma as the decimal separator.
                result = g3.replace(new RegExp(/ /gi, "gi"), separator);
            }
            if (g4 !== undefined) {
                var decimal = sep !== "," ? (separator !== "," ? "," : ".") : ".";
                result +=
                    g4 !== undefined
                        ? g4.replace(new RegExp(/\.|,/gi, "gi"), decimal)
                        : "";
            }
            
            return result;
        });
    }
    
    // If the config formater is not false, then apply the separator.
    if (config.formater) {
        // Now get the separator symbol.
        var symbol = config.separator // If config separator is set.
            ? typeof config.separator === "string"
                ? config.separator // If its type is a string, then apply its value.
                : "," // If it's not string (boolean), then apply comma (as a default separator).
            : "";
        // Special exception when locale is not 'en-US' but separator value is 'true' (use it's default locale thausands separator).
        if (config.formater !== "en-US" && config.separator === true) {
            return value;
        }
        // Return the replaced value based on its symbol.
        return replacedValue(value, symbol);
    }
    // If config formater is false, then return its default value.
    return value;
}

// This function is to get formated number to be printed in the page.
function formatNumber(number, config) {
    // This is the configuration for the 'toLocaleString' method.
    var strConfig = {
        minimumFractionDigits: config.decimals,
        maximumFractionDigits: config.decimals,
    };
    // Get the locale from config formater.
    var locale = typeof config.formater === "string" ? config.formater : undefined;

    // Set and convert the number based on its config.
    number = convertNumber(number, config);

    // Now format the number to string based on its locale.
    number = config.formater
        ? number.toLocaleString(locale, strConfig)
        : parseInt(number).toString();

    // Apply the number separator using the number as a string.
    return applySeparator(number, config);
}

// Parse the value with the correct data type.
function parseValue(data) {
    // If the value is a number with dot (.) -> it will be parsed as a float.
    if (/^[0-9]+\.[0-9]+$/.test(data)) {
        return parseFloat(data);
    }
    // If it's just a plain number, it will be parsed as integer.
    if (/^[0-9]+$/.test(data)) {
        return parseInt(data);
    }
    // If it's a boolean or a string, it will be parsed as boolean.
    if (/^true|false/i.test(data)) {
        return /^true/i.test(data);
    }
    // Just return the data, no need for ensuring the data type.
    return data;
}

// This function is to detect the element is in view or not.
function elementIsInView(element) {
    var top = element.offsetTop;
    var left = element.offsetLeft;
    var width = element.offsetWidth;
    var height = element.offsetHeight;

    while (element.offsetParent) {
        element = element.offsetParent;
        top += element.offsetTop;
        left += element.offsetLeft;
    }

    return (
        top >= window.pageYOffset &&
        left >= window.pageXOffset &&
        top + height <= window.pageYOffset + window.innerHeight &&
        left + width <= window.pageXOffset + window.innerWidth
    );
}

// Check if the browser supports the Intersection Observer.
function intersectionListenerSupported() {
    return (
        "IntersectionObserver" in window &&
        "IntersectionObserverEntry" in window &&
        "intersectionRatio" in window.IntersectionObserverEntry.prototype
    );
}

// Initialize PureCounter.
function PureCounter(options = {}) {
    var configs = {
        start: 0, // Starting number [uint]
        end: 100, // End number [uint]
        duration: 2000, // Count duration [milisecond]
        delay: 10, // Count delay [milisecond]
        once: true, // Counting at once or recount when scroll [boolean]
        pulse: false, // Pulse count for certain time [boolean|milisecond]
        decimals: 0, // Decimal places [uint]
        legacy: true, // If this is true it will use the scroll event listener on browsers
        filesizing: false, // Enable filesizing counting [boolean]
        currency: false, // Is it for currency? Use it for set the symbol too [boolean|char|string]
        separator: false, // Do you want to use thausands separator? use it for set the symbol too [boolean|char|string]
        formater: "us-US", // Number toLocaleString locale/formater, by default is "en-US" [string|boolean:false]
        selector: ".purecounter", // HTML query selector for spesific element
    };
    var configOptions = setOptions(options, configs);

    function registerEventListeners() {
        // Get all elements with the selector class (default: 'purecounter') 
        var elements = document.querySelectorAll(configOptions.selector);
        // Abort if there is no found elements.
        if (elements.length === 0) {
            return;
        }

        // Run animate elements based on Intersection Support 
        if (intersectionListenerSupported()) {
            var intersectObserver = new IntersectionObserver(animateElements.bind(this), {
                root: null,
                rootMargin: "20px",
                threshold: 0.5,
            });

            elements.forEach((element) => {
                intersectObserver.observe(element);
            });
        } else {
            if (window.addEventListener) {
                animateLegacy(elements);
                window.addEventListener(
                    "scroll",
                    function (e) {
                        animateLegacy(elements);
                    },
                    { passive: true }
                );
            }
        }
    }

    // Run animations for legacy browsers.
    function animateLegacy(elements) {
        elements.forEach((element) => {
            var config = parseConfig(element);
            if (config.legacy === true && elementIsInView(element)) {
                animateElements([element]);
            }
        });
    }

    // Run animations for modern browsers.
    function animateElements(elements, observer) {
        elements.forEach((element) => {
            var elm = element.target || element; // Just make sure which element will be used
            var elementConfig = parseConfig(elm); // Get config value on that element

            // If duration is less than or equal zero, just format the 'end' value
            if (elementConfig.duration <= 0) {
                return (elm.innerHTML = formatNumber(elementConfig.end, elementConfig));
            }

            if (
                (!observer && !elementIsInView(element)) ||
                (observer && element.intersectionRatio < 0.5)
            ) {
                var value =
                    elementConfig.start > elementConfig.end
                        ? elementConfig.end
                        : elementConfig.start;
                return (elm.innerHTML = formatNumber(value, elementConfig));
            }

            // If duration is more than 0, then start the counter
            setTimeout(() => {
                return startCounter(elm, elementConfig);
            }, elementConfig.delay);
        });
    }

    // This function is to generate the element config.
    function parseConfig(element) {
        // First, we need to declare the base Config
        // This config will be used if the element doesn't have config
        var baseConfig = configOptions;

        // Next, get all 'data-precounter-*' attributes value. Store to array
        var configValues = [].filter.call(element.attributes, function (attr) {
            return /^data-purecounter-/.test(attr.name);
        });

        // Now, we create element config as an object
        var elementConfig =
            configValues.length != 0
                ? Object.assign(
                      {},
                      ...configValues.map(({ name, value }) => {
                          var key = name.replace("data-purecounter-", "").toLowerCase(),
                              val = parseValue(value);

                          return { [key]: val };
                      })
                  )
                : {};

        // Last setOptions and return
        return setOptions(elementConfig, baseConfig);
    }

    // Run the initial function.
    registerEventListeners();
}

module.exports = PureCounter;
                return function(e) {
                    if (Array.isArray(e)) return n(e)
                }(e) || function(e) {
                    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                }(e) || function(e, t) {
                    if (e) {
                        if ("string" == typeof e) return n(e, t);
                        var r = Object.prototype.toString.call(e).slice(8, -1);
                        return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(e, t) : void 0
                    }
                }(e) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function n(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
                return n
            }

            function o(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    r = {};
                for (var n in e)
                    if (t == {} || t.hasOwnProperty(n)) {
                        var o = c(e[n]);
                        r[n] = o, n.match(/duration|pulse/) && (r[n] = "boolean" != typeof o ? 1e3 * o : o)
                    }
                return Object.assign({}, t, r)
            }

            function i(e, t) {
                var r = (t.end - t.start) / (t.duration / t.delay),
                    n = "inc";
                t.start > t.end && (n = "dec", r *= -1);
                var o = c(t.start);
                e.innerHTML = u(o, t), !0 === t.once && e.setAttribute("data-purecounter-duration", 0);
                var i = setInterval((function() {
                    var a = function(e, t) {
                        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "inc";
                        return e = c(e), t = c(t), parseFloat("inc" === r ? e + t : e - t)
                    }(o, r, n);
                    e.innerHTML = u(a, t), ((o = a) >= t.end && "inc" == n || o <= t.end && "dec" == n) && (e.innerHTML = u(t.end, t), t.pulse && (e.setAttribute("data-purecounter-duration", 0), setTimeout((function() {
                        e.setAttribute("data-purecounter-duration", t.duration / 1e3)
                    }), t.pulse)), clearInterval(i))
                }), t.delay)
            }

            function a(e, t) {
                return Math.pow(e, t)
            }

            function u(e, t) {
                var r = {
                        minimumFractionDigits: t.decimals,
                        maximumFractionDigits: t.decimals
                    },
                    n = "string" == typeof t.formater ? t.formater : void 0;
                return e = function(e, t) {
                        if (t.filesizing || t.currency) {
                            e = Math.abs(Number(e));
                            var r = 1e3,
                                n = t.currency && "string" == typeof t.currency ? t.currency : "",
                                o = t.decimals || 1,
                                i = ["", "K", "M", "B", "T"],
                                u = "";
                            t.filesizing && (r = 1024, i = ["bytes", "KB", "MB", "GB", "TB"]);
                            for (var c = 4; c >= 0; c--)
                                if (0 === c && (u = "".concat(e.toFixed(o), " ").concat(i[c])), e >= a(r, c)) {
                                    u = "".concat((e / a(r, c)).toFixed(o), " ").concat(i[c]);
                                    break
                                }
                            return n + u
                        }
                        return parseFloat(e)
                    }(e, t),
                    function(e, t) {
                        if (t.formater) {
                            var r = t.separator ? "string" == typeof t.separator ? t.separator : "," : "";
                            return "en-US" !== t.formater && !0 === t.separator ? e : (n = r, e.replace(/^(?:(\d{1,3},(?:\d{1,3},?)*)|(\d{1,3}\.(?:\d{1,3}\.?)*)|(\d{1,3}(?:\s\d{1,3})*))([\.,]?\d{0,2}?)$/gi, (function(e, t, r, o, i) {
                                var a = "",
                                    u = "";
                                if (void 0 !== t ? (a = t.replace(new RegExp(/,/gi, "gi"), n), u = ",") : void 0 !== r ? a = r.replace(new RegExp(/\./gi, "gi"), n) : void 0 !== o && (a = o.replace(new RegExp(/ /gi, "gi"), n)), void 0 !== i) {
                                    var c = "," !== u && "," !== n ? "," : ".";
                                    a += void 0 !== i ? i.replace(new RegExp(/\.|,/gi, "gi"), c) : ""
                                }
                                return a
                            })))
                        }
                        var n;
                        return e
                    }(e = t.formater ? e.toLocaleString(n, r) : parseInt(e).toString(), t)
            }

            function c(e) {
                return /^[0-9]+\.[0-9]+$/.test(e) ? parseFloat(e) : /^[0-9]+$/.test(e) ? parseInt(e) : /^true|false/i.test(e) ? /^true/i.test(e) : e
            }

            function f(e) {
                for (var t = e.offsetTop, r = e.offsetLeft, n = e.offsetWidth, o = e.offsetHeight; e.offsetParent;) t += (e = e.offsetParent).offsetTop, r += e.offsetLeft;
                return t >= window.pageYOffset && r >= window.pageXOffset && t + o <= window.pageYOffset + window.innerHeight && r + n <= window.pageXOffset + window.innerWidth
            }

            function s() {
                return "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype
            }
            e.exports = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    n = {
                        start: 0,
                        end: 100,
                        duration: 2e3,
                        delay: 10,
                        once: !0,
                        pulse: !1,
                        decimals: 0,
                        legacy: !0,
                        filesizing: !1,
                        currency: !1,
                        separator: !1,
                        formater: "us-US",
                        selector: ".purecounter"
                    },
                    a = o(e, n);

                function d() {
                    var e = document.querySelectorAll(a.selector);
                    if (0 !== e.length)
                        if (s()) {
                            var t = new IntersectionObserver(p.bind(this), {
                                root: null,
                                rootMargin: "20px",
                                threshold: .5
                            });
                            e.forEach((function(e) {
                                t.observe(e)
                            }))
                        } else window.addEventListener && (l(e), window.addEventListener("scroll", (function(t) {
                            l(e)
                        }), {
                            passive: !0
                        }))
                }

                function l(e) {
                    e.forEach((function(e) {
                        !0 === v(e).legacy && f(e) && p([e])
                    }))
                }

                function p(e, t) {
                    e.forEach((function(e) {
                        var r = e.target || e,
                            n = v(r);
                        if (n.duration <= 0) return r.innerHTML = u(n.end, n);
                        if (!t && !f(e) || t && e.intersectionRatio < .5) {
                            var o = n.start > n.end ? n.end : n.start;
                            return r.innerHTML = u(o, n)
                        }
                        setTimeout((function() {
                            return i(r, n)
                        }), n.delay)
                    }))
                }

                function v(e) {
                    var n = a,
                        i = [].filter.call(e.attributes, (function(e) {
                            return /^data-purecounter-/.test(e.name)
                        }));
                    return o(0 != i.length ? Object.assign.apply(Object, [{}].concat(r(i.map((function(e) {
                        var r = e.name,
                            n = e.value;
                        return t({}, r.replace("data-purecounter-", "").toLowerCase(), c(n))
                    }))))) : {}, n)
                }
                d()
            }
        }
    }, t = {}, r = function r(n) {
        var o = t[n];
        if (void 0 !== o) return o.exports;
        var i = t[n] = {
            exports: {}
        };
        return e[n](i, i.exports, r), i.exports
    }(638), r;
    var e, t, r
}));
//# sourceMappingURL=purecounter_vanilla.js.map