export type LogLevel = 'warn'|'log'|'error'|'info'

const _log = (level: LogLevel) => (x: any, ...args: any[]): any => {
  console[level](x, ...args)
  return x
}

export class Logger {
  warn = _log('warn')
  log = _log('log')
  error = _log('error')
  info = _log('info')
}

export const log = new Logger()
