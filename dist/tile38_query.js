'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile38Query = function () {
    function Tile38Query(type, key, client) {
        _classCallCheck(this, Tile38Query);

        this.type = type;
        this.key = key;
        this.client = client;
        this.options = {};
    }

    _createClass(Tile38Query, [{
        key: 'cursor',
        value: function cursor(start) {
            this.options.cursor = start;
            return this;
        }
    }, {
        key: 'limit',
        value: function limit(count) {
            this.options.limit = count;
            return this;
        }
    }, {
        key: 'sparse',
        value: function sparse(spread) {
            this.options.sparse = spread;
            return this;
        }

        /*
         * set a matching query on the object ID. The value is a glob pattern.
         * Unlike other query methods in this class, match() may be called multiple times
         */

    }, {
        key: 'match',
        value: function match(value) {
            if (this.options.matches == undefined) {
                this.options.matches = [];
            }
            this.options.matches.push(value);
            return this;
        }

        // sort order for SCAN query, must be 'asc' or 'desc'

    }, {
        key: 'order',
        value: function order(val) {
            // TODO throw error if type != 'SCAN'
            this.options.order = val;
            return this;
        }
        // equivalent of order('asc')

    }, {
        key: 'asc',
        value: function asc() {
            return this.order('asc');
        }
        // equivalent of order('desc');

    }, {
        key: 'desc',
        value: function desc() {
            return this.order('desc');
        }

        // adds DISTANCE argument for nearby query. 

    }, {
        key: 'distance',
        value: function distance() {
            // TODO throw error if type != 'NEARBY'
            this.options.distance = true;
            return this;
        }

        /*
         * set a where search pattern. Like match, this method may be chained multiple times
         * as well. For example:
         * query.where('speed', 70, '+inf').where('age', '-inf', 24)
         */

    }, {
        key: 'where',
        value: function where(field) {
            if (this.options.where == undefined) {
                this.options.where = [];
            }

            for (var _len = arguments.length, criteria = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                criteria[_key - 1] = arguments[_key];
            }

            var arr = [field].concat(criteria);
            this.options.where.push(arr);
            return this;
        }

        /*
         * call nofields to exclude field values from search results
         */

    }, {
        key: 'nofields',
        value: function nofields() {
            this.options.nofields = true;
            return this;
        }

        /*
         * sets one or more detect values. For example:
         * query.detect('inside', 'outside');
         *   or
         * query.detect('inside,outside');
         *
         * whichever you prefer
         */

    }, {
        key: 'detect',
        value: function detect() {
            for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                values[_key2] = arguments[_key2];
            }

            this.options.detect = values.join(',');
            return this;
        }

        /**
         * sets commands to listen for. Expected values: del, drop and set
         * You may pass these as separate parameters,
         *   query.commands('del', 'drop', 'set');
         *
         * or as a single comma separated parameter
         *   query.commands('del,drop,set');
         */

    }, {
        key: 'commands',
        value: function commands() {
            for (var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                values[_key3] = arguments[_key3];
            }

            this.options.commands = values.join(',');
            return this;
        }

        /**
         * set output type. Allowed values:
         * count
         * ids
         * objects
         * points
         * bounds
         * hashes
         *
         * If 'hashes' is used a second parameter should specify the precision, ie
         *   query.output('hashes', 6);
         *
         * Note that all of these types, except for 'bounds' can be called using convenience methods as well,
         * so
         *   objects() instead of output('objects')
         * and
         *   hashes(6) instead of output('hashes', 6)
         *
         */

    }, {
        key: 'output',
        value: function output(type, precision) {
            type = type.toUpperCase();
            if (type == 'HASHES' && precision != undefined) {
                this.options.output = type + ' ' + precision;
            } else {
                this.options.output = type;
            }
            return this;
        }

        // shortcut for .output('ids')

    }, {
        key: 'ids',
        value: function ids() {
            return this.output('ids');
        }
        // shortcut for .output('count')

    }, {
        key: 'count',
        value: function count() {
            return this.output('count');
        }
        // shortcut for .output('objects')

    }, {
        key: 'objects',
        value: function objects() {
            return this.output('objects');
        }
        // shortcut for .output('points')

    }, {
        key: 'points',
        value: function points() {
            return this.output('points');
        }
        // shortcut for .output('points')

    }, {
        key: 'hashes',
        value: function hashes(precision) {
            return this.output('hashes', precision);
        }

        /**
         * conducts search with an object that's already in the database
         */

    }, {
        key: 'getObject',
        value: function getObject(key, id) {
            this.options.getObject = { key: key, id: id };
            return this;
        }

        /**
         * conducts search with bounds coordinates
         */

    }, {
        key: 'bounds',
        value: function bounds(minlat, minlon, maxlat, maxlon) {
            this.options.bounds = [minlat, minlon, maxlat, maxlon];
            return this;
        }

        /**
         * conducts search with geojson object
         */

    }, {
        key: 'object',
        value: function object(geojson) {
            this.options.geojson = geojson;
            return this;
        }
    }, {
        key: 'tile',
        value: function tile(x, y, z) {
            this.options.tile = { x: x, y: y, z: z };
            return this;
        }
    }, {
        key: 'quadKey',
        value: function quadKey(key) {
            this.options.quadKey = key;
            return this;
        }
    }, {
        key: 'hash',
        value: function hash(geohash) {
            this.options.hash = geohash;
            return this;
        }

        // adds POINT arguments to NEARBY query

    }, {
        key: 'point',
        value: function point(lat, lon, meters) {
            // TODO throw error if type != 'NEARBY'
            this.options.point = { lat: lat, lon: lon, meters: meters };
            return this;
        }

        // adds ROAM arguments to NEARBY query

    }, {
        key: 'roam',
        value: function roam(key, pattern, meters) {
            // TODO throw error if type != 'NEARBY'
            this.options.roam = { key: key, pattern: pattern, meters: meters };
            return this;
        }

        // return all the commands of the query chain, as a string, the way it will
        // be sent to Tile38

    }, {
        key: 'commandStr',
        value: function commandStr() {
            return this.type + " " + this.commandArr().join(' ');
        }

        // constructs an array of all arguments of the query. This does not
        // include the query type itself.

    }, {
        key: 'commandArr',
        value: function commandArr() {
            var cmd = [this.key];
            var o = this.options;
            if (o.cursor) {
                cmd.push('CURSOR');
                cmd.push(o.cursor);
            }
            if (o.limit) {
                cmd.push('LIMIT');
                cmd.push(o.limit);
            }
            if (o.sparse) {
                cmd.push('SPARSE');
                cmd.push(o.sparse);
            }
            if (o.matches) {
                // add one or more matches
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = o.matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var k = _step.value;

                        cmd.push('MATCH');
                        cmd.push(k);
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
            }
            if (o.order) {
                // add ASC or DESC to SCAN query
                cmd.push(o.order.toUpperCase());
            }

            if (o.distance) {
                cmd.push('DISTANCE');
            }
            if (o.where) {
                // add one or more where clauses
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = o.where[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _k = _step2.value;

                        cmd.push('WHERE');
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = _k[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var l = _step3.value;

                                cmd.push(l);
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
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
            }
            if (o.nofields) {
                cmd.push('NOFIELDS');
            }
            if (o.fence) {
                cmd.push('FENCE');
            }
            if (o.detect) {
                cmd.push('DETECT');
                cmd.push(o.detect);
            }
            if (o.commands) {
                cmd.push('COMMANDS');
                cmd.push(o.commands);
            }
            if (o.output) {
                cmd.push(o.output);
            }
            if (o.getObject) {
                cmd.push('GET');
                cmd.push(o.getObject.key);
                cmd.push(o.getObject.id);
            }
            if (o.bounds) {
                cmd.push('BOUNDS');
                cmd = cmd.concat(o.bounds);
            }
            if (o.geojson) {
                cmd.push('OBJECT');
                cmd.push(JSON.stringify(o.geojson));
            }
            if (o.tile) {
                cmd.push('TILE');
                cmd.push(o.tile.x);
                cmd.push(o.tile.y);
                cmd.push(o.tile.z);
            }
            if (o.quadKey) {
                cmd.push('QUADKEY');
                cmd.push(o.quadKey);
            }
            if (o.hash) {
                cmd.push('HASH');
                cmd.push(o.hash);
            }
            if (o.point) {
                cmd.push('POINT');
                cmd.push(o.point.lat);
                cmd.push(o.point.lon);
                cmd.push(o.point.meters);
            }
            if (o.roam) {
                cmd.push('ROAM');
                cmd.push(o.roam.key);
                cmd.push(o.roam.pattern);
                cmd.push(o.roam.meters);
            }

            return cmd;
        }

        /**
         * will execute the query and return a Promise to the result.
         * To use the live fence with streaming results, use fence() instead.
         */

    }, {
        key: 'execute',
        value: function execute() {
            return this.client.sendCommand(this.type, 1, this.commandArr());
        }

        /**
         * returns streaming results for a live geofence. This function will repeatedly call the specified callback
         * method when results are received.
         * This method returns an instance of LiveGeofence, which can be used to close the fence if necessary by calling
         * its close() method.
         */

    }, {
        key: 'executeFence',
        value: function executeFence(callback) {
            this.options.fence = true;
            return this.client.openLiveFence(this.type, this.commandArr(), callback);
        }

        /*
         * factory method to create a new Tile38Query object for an INTERSECTS search.
         * These factory methods are used in the test suite, but since these don't have
         * access to a Tile38 client object, they cannot be used to actually execute
         * a query on the server.
         * Use the Tile38.intersectsQuery() method instead.
         */

    }], [{
        key: 'intersects',
        value: function intersects(key) {
            return new Tile38Query('INTERSECTS', key);
        }

        // Use Tile38.searchQuery() method instead

    }, {
        key: 'search',
        value: function search(key) {
            return new Tile38Query('SEARCH', key);
        }

        // Use Tile38.nearbyQuery() method instead

    }, {
        key: 'nearby',
        value: function nearby(key) {
            return new Tile38Query('NEARBY', key);
        }

        // Use Tile38.scanQuery() method instead

    }, {
        key: 'scan',
        value: function scan(key) {
            return new Tile38Query('SCAN', key);
        }

        // Use Tile38.withinQuery() method instead

    }, {
        key: 'within',
        value: function within(key) {
            return new Tile38Query('WITHIN', key);
        }
    }]);

    return Tile38Query;
}();

module.exports = Tile38Query;