import log from 'loglevel'


if (process.env.HEROKU) {
  log.setLevel('error');
} else {
  log.setLevel('info')
}

// uncomment me if you are trying to debug EVERYTHING
// logger.setLevel('debug');

// if you want it to log in produciton
// logger.error('i am a console log');

// if you want it to always log even when you aren't debugging
// logger.info(' i am a console log')

// if you want it to only log when you are trying to debug
// logger.debug('something went wrong')

export default log;
