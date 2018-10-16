import axios from 'axios'
import { log } from '../lib/log'
import { Params } from './params/params';
import { NbaApiEndpoint } from './params/NbaApiEndpoint';
import { buildEndpoint } from './buildEndpoint';

export async function nbaApi(endpoint: NbaApiEndpoint, params: Params) {
  log.info('scraper()...', {endpoint, params})

  const url = buildEndpoint(endpoint, params)

  log.info('scraper:url', {url})

  const response = await axios.get(url)

  log.info('scraper:response', {response})

  return response
}
