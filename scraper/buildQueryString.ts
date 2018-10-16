export function buildQueryString(params: {[key: string]: string|number}): string {
  return '?' + Object.keys(params)
    .map(param => `${param}=${params[param]}`)
    .join('&')
}
