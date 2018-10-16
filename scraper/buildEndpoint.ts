import { NBA_API_URL } from "./constants"
import { buildQueryString } from "./buildQueryString"
import { EndPoint } from "./params"

export function buildEndpoint(endpoint: EndPoint, params: any) {
  return `${NBA_API_URL}/${endpoint}/${buildQueryString(params)}`
}
