import axios from 'axios'
import fs from 'fs'
import log from './logger'

const eric = true;
const kyle = false;

log.info('starting scraper...');

const DOMAIN = `https://api.stackexchange.com`;
const QUESTION = 'questions';
const ANSWER = 'answers';

const createQuery = (type, fromdate, todate) => {
  return `${DOMAIN}/2.2/${type}?fromdate=${fromdate}&todate=${todate}&order=asc&sort=creation&site=stackoverflow`;
}

const todate = (fromdate) => fromdate + 600000

let scrapedFiles = 0;

let name = 'will'

let start = 1480550400;
if (eric) {
  start += 500000;
  name = 'eric'
} else if (kyle) {
  start += 1000000;
  name = 'kyle'
}

let questionFrom = start;
let answerFrom = start;



const calculateNewStartDate = (json, type) => {
  json = JSON.parse(json);

  const lastDateScraped = json[json.length - 1]['creation_date'];
  log.info('lastDateScraped', lastDateScraped);
  if (type === QUESTION) {
    questionFrom = lastDateScraped + 1;
  } else {
    answerFrom = lastDateScraped + 1;
  }
};

const scrapeStackOverflow = async () => {

  let type;
  log.info('starting new loop...')
  log.info('scraped files', scrapedFiles);

  log.info('calculating from date and to date along with type...');
  let fromDate;
  if (questionFrom <= answerFrom) {
    fromDate = questionFrom;
    type = QUESTION;
  } else {
    fromDate = answerFrom;
    type = ANSWER;
  }

  log.info('fromDate', fromDate, 'type', type)
  log.info('starting query...');

  let query = createQuery(type, fromDate, todate(fromDate));
  let json;

  log.info('starting axios request...');
  try {
    json = await axios(query);
    log.info('got new data', json.data);
    json = JSON.stringify(json.data.items);
  } catch(err) {
    return log.info('\n\n\nerror on axios request', '\n\n\ntype', type, '\n\n\nfromDate', fromDate, '\n\n\nerr: ', err);
  }

  log.info('calculating new start date...');
  calculateNewStartDate(json, type);

  log.info('writing data to disk...');
  try {
    fs.writeFileSync(`./src/server/utils/fakeStackOverflowData/${type}2${scrapedFiles}${name}.json`, json);
  } catch(err) {
    log.info('error writing file', err);
    return;
  }
  log.info('new json written!');
  scrapedFiles++;
}

setInterval(() => scrapeStackOverflow().catch(err => log.info(err)), 5000);

