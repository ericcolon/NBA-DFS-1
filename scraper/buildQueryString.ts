export function buildQueryString(params: any /*TODO*/): string {
  return '?' + Object.keys(params)
    .map(param => `${param}=${params[param]}`)
    .join('&')
}