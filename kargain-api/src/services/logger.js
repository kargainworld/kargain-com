const Logger = require('logdna')
const config = require('../config')
const options = {
    app : 'Kargain API',
    env: 'Development'
}

let logger = {}

try {
    if(config.logDNA.apiKey){
        logger = Logger.createLogger(config.logDNA.apiKey, options)
    }
}
catch (err){
    throw new Error(err)
}

// logger.log('My Sample Log Line');
// logger.info('My Sample Log Line');
// logger.warn('My Sample Log Line');
// logger.debug('My Sample Log Line');
// logger.error('My Sample Log Line');
// logger.fatal('My Sample Log Line');
// logger.trace('My Sample Log Line');
// logger.log('My Sample Log Line', {
//     level: 'warn',
//     meta: {
//         foo: 'bar',
//         nested: {
//             nest1: 'nested text'
//         }
//     }
// });

module.exports = logger
