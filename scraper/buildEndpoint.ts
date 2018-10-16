import { NBA_API_URL } from './constants'
import { buildQueryString } from './buildQueryString'
import { NbaApiEndpoint } from './params/NbaApiEndpoint'

export function buildEndpoint(endpoint: NbaApiEndpoint, params: any) {
  return `${NBA_API_URL}/${endpoint}/${buildQueryString(params)}`
}
