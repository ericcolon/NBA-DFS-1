const morgan = require('morgan')

export default morgan((tokens: any, req: Express.Request, res: Express.Response) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  // @ts-ignore
  JSON.stringify(req.body),
  '\n',
  tokens.res(req, res, 'content-length'),
  '-',
  tokens['response-time'](req,res),
  'ms'].join(' ')
)