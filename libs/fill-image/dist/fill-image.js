/**
 * fill-image - An Angular directive that generate placeholder images from existing services like placehold.it, dummyimage.com, etc.
 * @version v0.1.0
 * @link https://github.com/arvindr21/fill-image#readme
 * @author Arvind Ravulavaru
 * @license MIT
 */

/*jslint node: true */
'use strict';
angular.module('FillImage', [])

.run(['$templateCache', function($templateCache) {
    $templateCache.put('fill-image.html', '<img ng-src=\'{{imgUrl}}\'>');
}])

.directive('fillImage', ['Utils', 'RulesEngine', function(utils, RulesEngine) {
    var url, service, format, size, text, bgColor, textColor, stdSize, category, effect;
    return {
        restrict: 'E',
        templateUrl: 'fill-image.html',
        scope: {
            service: '=',
            size: '@size',
            format: '=',
            text: '@text',
            bgColor: '@bgColor',
            textColor: '='
        },
        link: function(s, e, a) {
            service = a.service;
            size = a.size;
            format = a.format;
            text = a.text;
            bgColor = a.bgColor;
            textColor = a.textColor;
            stdSize = a.stdSize;
            category = a.category;
            effect = a.effect;

            if (!service) {
                service = utils.randomService();
            }

            url = RulesEngine.defineBaseUrl(service);

            if (RulesEngine.supportsEffect(service) && !RulesEngine.supportsEffectFullForm(service)) {
                if (!RulesEngine.isBeerholdit(service)) {
                    if (effect) {
                        if (effect == 'grayscale') {
                            url += 'g/';
                        }
                        if (RulesEngine.supportsCrayEffect(service)) {
                            if (effect == 'crazy') {
                                url += 'c/';
                            }
                        }
                        if (RulesEngine.supportsGifEffect(service)) {
                            if (effect == 'gif') {
                                url += 'gif/';
                            }
                        }
                        if (RulesEngine.supportsMustangEffect(service)) {
                            if (effect == 'mustang') {
                                url += '5.0/';
                            }
                        }
                    } else if (RulesEngine.isPlaceKitten(service)) {
                        // as of now all placekitten URLs need a g :/
                        url += 'g/';
                    }
                }
            }

            if (RulesEngine.supportsSizeParam(service)) {
                if (utils.isValidSize(size, service)) {
                    if (RulesEngine.isPipsum(service)) {
                        size = size.toLowerCase();
                        if (size.indexOf('x') > 0) {
                            url += size;
                        } else {
                            url += size + 'x' + size;
                        }
                    } else {
                        url += size;
                    }
                } else {
                    if (!stdSize) {
                        if (!text) {
                            if (RulesEngine.isPipsum(service)) {
                                url += '250x250';
                            } else {
                                url += 250;
                            }
                        } else {
                            url += '250x250';
                        }
                    }
                }
            } else {
                if (utils.isValidSize(size, service)) {
                    size = size.toLowerCase();
                    if (size.indexOf('x') > 0) {
                        url += size.replace('x', '/');
                    } else {
                        url += size + '/' + size;
                    }
                } else {
                    url += '250/250';
                }
            }

            if (bgColor || textColor) {
                var isBGColorValid = utils.isValidHexColor(bgColor);

                if (RulesEngine.supportsSkullColor(service)) {
                    url += '/' + bgColor.replace('#', '');
                } else {
                    if (RulesEngine.supportsBgColor(service)) {
                        if (isBGColorValid) {
                            url += '/' + bgColor.replace('#', '');
                        }
                    }

                    if (RulesEngine.supportsTextColor(service)) {
                        if (utils.isValidHexColor(textColor)) {
                            if (!isBGColorValid) {
                                url += '/333';
                            }
                            url += '/' + textColor.replace('#', '');
                        }
                    }
                }
            }



            if (RulesEngine.supportsFormat(service)) {
                if (utils.isFormatAllowed(format)) {
                    url += '.' + format;
                } else {
                    if (!stdSize) {
                        url += '.png';
                    }
                }
            }

            if (service === 'dummyimage' && stdSize) {
                url += '/' + stdSize;
            }

            if (RulesEngine.supportsCategory(service)) {
                if (category) {
                    if (utils.isNumeric(category)) {

                        if (!bgColor) {
                            url += '/03A9F4';
                        }

                        if (utils.isNumberInRange(category, 1, 45)) {
                            url += '/' + category;
                        } else {
                            url += '/9';
                        }
                    } else {
                        url += '/' + category;
                    }

                }
            }

            if (RulesEngine.supportsEffectFullForm(service)) {
                if (effect) {
                    if (!category) {
                        url += '/any';
                    }
                    url += '/' + effect + '/';
                }
            }

            if (RulesEngine.supportsText(service)) {
                if (text) {
                    if (RulesEngine.supportsQueryText(service)) {
                        text = utils.formatText(text, '+', true);
                        url += RulesEngine.needAmbersand(service) ? '&' : '?';
                        url += 'text=' + text;
                    } else {
                        text = utils.formatText(text, ' ', false);
                        if (!category) {
                            url += '/' + 'sports'; // <- params this? 
                        }
                        url += '/' + text;
                    }

                }
            }

            if (RulesEngine.isBeerholdit(service)) {
                if (effect) {
                    effect = effect.toLowerCase();
                    if (effect == 'grayscale') {
                        url += '/g';
                    } else if (effect == 'sepia') {
                        url += '/s';
                    } else if (effect == 'negate') {
                        url += '/n';
                    }
                } else {
                    // beerhold.it needs a trailing slash
                    url += '/';
                }
            }

            s.imgUrl = url;
        }
    };
}])

.factory('RulesEngine', [function() {

    var RulesAPI = {

        supportsBgColor: function(service) {
            var support = true;
            var notSupported = ['fpoimg', 'lorempixel', 'fillmurray', 'stevensegallery', 'placecage', 'placekitten', 'placebear', 'nicenicejpg', 'baconmockup', 'pipsum', 'placesheen'];
            if (notSupported.join('_').indexOf(service) >= 0) {
                return false;
            }
            return support;
        },

        supportsTextColor: function(service) {
            var support = true;
            var notSupported = ['fpoimg', 'lorempixel', 'fillmurray', 'stevensegallery', 'placecage', 'placekitten', 'placebear', 'nicenicejpg', 'baconmockup', 'pipsum', 'placesheen'];
            if (notSupported.join('_').indexOf(service) >= 0) {
                return false;
            }
            return support;
        },

        supportsFormat: function(service) {
            var support = true;
            var notSupported = ['fpoimg', 'lorempixel', 'placeimg', 'fillmurray', 'stevensegallery', 'placecage', 'placekitten', 'placebear', 'nicenicejpg', 'baconmockup', 'placesheen', 'placeskull', 'beerholdit', 'fakeimgpl'];
            if (notSupported.join('_').indexOf(service) >= 0) {
                return false;
            }
            return support;
        },

        supportsSizeParam: function(service) {
            var support = true;
            var notSupported = ['lorempixel', 'placeimg', 'fillmurray', 'stevensegallery', 'placecage', 'placekitten', 'placebear', 'nicenicejpg', 'baconmockup', 'placesheen', 'placeskull', 'beerholdit'];
            if (notSupported.join('_').indexOf(service) >= 0) {
                return false;
            }
            return support;
        },

        supportsText: function(service) {
            var support = true;
            var notSupported = ['fillmurray', 'stevensegallery', 'placecage', 'placekitten', 'placebear', 'nicenicejpg', 'baconmockup', 'pipsum', 'placesheen'];
            if (notSupported.join('_').indexOf(service) >= 0) {
                return false;
            }
            return support;
        },

        supportsQueryText: function(service) {
            var support = true;
            var notSupported = ['lorempixel', 'fillmurray', 'stevensegallery', 'placecage', 'placekitten', 'placebear', 'nicenicejpg', 'baconmockup', 'pipsum', 'placesheen'];
            if (notSupported.join('_').indexOf(service) >= 0) {
                return false;
            }
            return support;
        },

        supportsCategory: function(service) {
            var support = false;
            var notSupported = ['lorempixel', 'placeimg', 'fillmurray', 'stevensegallery', 'placecage', 'placekitten', 'placebear', 'nicenicejpg', 'placeskull', 'fakeimg'];
            if (notSupported.join('_').indexOf(service) >= 0) {
                return true;
            }
            return support;
        },

        supportsEffect: function(service) {
            var support = false;
            var notSupported = ['lorempixel', 'placeimg', 'fillmurray', 'stevensegallery', 'placecage', 'placekitten', 'placebear', 'nicenicejpg', 'beerholdit'];
            if (notSupported.join('_').indexOf(service) >= 0) {
                return true;
            }
            return support;
        },

        supportsCrayEffect: function(service) {
            var support = false;
            var notSupported = ['placecage'];
            if (notSupported.join('_').indexOf(service) >= 0) {
                return true;
            }
            return support;
        },

        supportsGifEffect: function(service) {
            var support = false;
            var notSupported = ['placecage'];
            if (notSupported.join('_').indexOf(service) >= 0) {
                return true;
            }
            return support;
        },

        supportsMustangEffect: function(service) {
            var support = false;
            var notSupported = ['nicenicejpg'];
            if (notSupported.join('_').indexOf(service) >= 0) {
                return true;
            }
            return support;
        },

        supportsEffectFullForm: function(service) {
            var support = false;
            var notSupported = ['placeimg'];
            if (notSupported.join('_').indexOf(service) >= 0) {
                return true;
            }
            return support;
        },

        supportsSkullColor: function(service) {
            var support = false;
            var notSupported = ['placeskull'];
            if (notSupported.join('_').indexOf(service) >= 0) {
                return true;
            }
            return support;
        },

        needAmbersand: function(service) {
            var need = true;
            var doesNotNeed = ['fpoimg', 'fakeimgpl'];
            if (doesNotNeed.join('_').indexOf(service) >= 0) {
                return false;
            }
            return need;
        },

        isPlaceKitten: function(service) {
            return (service == 'placekitten');
        },
        isPipsum: function(service) {
            return (service == 'pipsum');
        },
        isBeerholdit: function(service) {
            return (service == 'beerholdit');
        },

        defineBaseUrl: function(service) {
            var url = '//dummyimage.com/';
            if (service === 'placeholdit') {
                url = '//placehold.it/';
            } else if (service === 'lorempixel') {
                url = '//lorempixel.com/';
            } else if (service === 'fpoimg') {
                url = '//fpoimg.com/';
            } else if (service === 'placeimg') {
                url = '//placeimg.com/';
            } else if (service === 'fillmurray') {
                url = '//fillmurray.com/';
            } else if (service === 'placecage') {
                url = '//placecage.com/';
            } else if (service === 'placekitten') {
                url = '//placekitten.com/';
            } else if (service === 'stevensegallery') {
                url = '//stevensegallery.com/';
            } else if (service === 'nicenicejpg') {
                url = '//nicenicejpg.com/';
            } else if (service === 'placebear') {
                url = '//placebear.com/';
            } else if (service === 'baconmockup') {
                url = '//baconmockup.com/';
            } else if (service === 'placesheen') {
                url = '//placesheen.com/';
            } else if (service === 'placeskull') {
                url = '//placeskull.com/';
            } else if (service === 'pipsum') {
                url = '//pipsum.com/';
            } else if (service === 'beerholdit') {
                url = '//beerhold.it/';
            } else if (service === 'beerholdit') {
                url = '//beerhold.it/';
            } else if (service === 'fakeimgpl') {
                url = '//fakeimg.pl/';
            }

            return url;
        }
    };

    return RulesAPI;
}])

.factory('Utils', [function() {
    var utils = {

        services: ['dummyimage', 'placehold', 'lorempixel', 'fpoimg', 'placeimg', 'fillmurray', 'stevensegallery', 'placecage', 'placekitten', 'placebear', 'stevensegallery', 'nicenicejpg', 'placebear', 'baconmockup', 'pipsum', 'placesheen', 'placeskull', 'pipsum', 'beerhold', 'placeholdnet', 'fakeimg'],

        randomService: function() {
            return this.services[Math.floor(Math.random() * (this.services).length)];
        },

        formatText: function(text, char, allowSpecialChars) {
            if (!text) {
                return;
            }

            if (!char) {
                return;
            }

            text = text.trim();

            if (!allowSpecialChars) {
                var randomReplacer = Math.random().toString(36).substring(7);
                text = text.replace(new RegExp('-', 'g'), randomReplacer);
                text = text.replace(/[^a-zA-Z0-9 ]/g, "");
                text = text.replace(new RegExp(randomReplacer, 'g'), '-');
            }

            if (text.length > 0) {
                return this.encodeChars(text).replace(/ /g, char);
            } else {
                return '';
            }
        },

        encodeChars: function(text) {
            if (!text) {
                return;
            }

            text = text.replace(/\+/g, '0x2B');
            text = text.replace(/#/g, '0x23');
            text = text.replace(/%/g, '0x25');
            text = text.replace(/&/g, '0x26');
            return text;
        },

        isValidSize: function(size, service) {
            if (!size) {
                return;
            }

            if (size.indexOf('x') > 0) { // !=
                var dim = size.split('x');
                var h = dim[0];
                var w = dim[1];
                if (service === 'dummyimage') {
                    if (utils.isValidRatio(h) && this.isNumeric(w)) {
                        return true;
                    } else if (utils.isValidRatio(w) && this.isNumeric(h)) {
                        return true;
                    } else if (this.isNumeric(w) && this.isNumeric(h)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (this.isNumeric(w) && this.isNumeric(h)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                if (this.isNumeric(size)) {
                    return true;
                } else {
                    return false;
                }
            }
        },

        isValidRatio: function(ratio) {
            if (!ratio) {
                return;
            }

            ratio = ratio.split(':');
            var lhs = ratio[0];
            var rhs = ratio[1];

            if (this.isNumeric(lhs) && this.isNumeric(rhs)) {
                return true;
            } else {
                return false;
            }
        },

        isFormatAllowed: function(format) {
            if (!format) {
                return;
            }

            var allowedFormats = ['png', 'gif', 'jpg', 'jpeg'];
            return allowedFormats.join('').indexOf(format) > 0;
        },

        isValidHexColor: function(colorCode) {
            if (!colorCode) {
                return;
            }

            if (colorCode.indexOf('#') < 0) {
                colorCode = '#' + colorCode;
            }
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colorCode);
        },

        isNumeric: function(num) {
            if (!num) {
                return;
            }
            return !isNaN(num);
        },

        isNumberInRange: function(num, min, max) {
            if (this.isNumeric(num)) {
                if (num >= min && num <= max) {
                    return true;
                }
            }
            return false;
        }

    };

    return utils;
}]);
