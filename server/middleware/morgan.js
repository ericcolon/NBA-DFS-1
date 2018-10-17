import morgan from 'morgan'

export default morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  JSON.stringify(req.body),
  '\n',
  tokens.res(req, res, 'content-length'),
  '-',
  tokens['response-time'](req,res),
  'ms'].join(' ')
)
