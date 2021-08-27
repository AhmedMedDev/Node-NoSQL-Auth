const NodeCache = require( "node-cache" );

const Cache = new NodeCache({ stdTTL: 100, checkperiod: 60*60*24 });

module.exports = Cache;