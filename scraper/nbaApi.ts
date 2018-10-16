import { buildEndpoint } from "./params";
import axios from 'axios'
import { log } from "./log";

export async function nbaApi(endpoint: string, params: any) {
  log.info('scraper()...', {endpoint, params})

  const url = buildEndpoint(endpoint, params)

  log.info('scraper:url', {url})

  const response = await axios.get(url)

  log.info('scraper:response', {response})

  return response
}