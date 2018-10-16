export function buildQueryString(params: Object): string {
  return '?' + Object.keys(params)
    .map(param => `${param}=${params[param]}`)
    .join('&')
}