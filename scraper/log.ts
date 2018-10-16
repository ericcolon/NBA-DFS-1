export type LogLevel = 'warn'|'log'|'error'|'info'

const log = (level: LogLevel) => (x: any, ...args: any[]): any {
  console[level](x, ...args)
  return x
}

export class Logger {
  warn = log('warn')
  log = log('log')
  error = log('error')
  info = log('info')
}
