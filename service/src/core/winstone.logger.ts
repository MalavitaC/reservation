import { createLogger, format, transports } from 'winston';

const accessLogConfig = {
  format: format.combine(
    format.errors({
      stack: true,
    }),
    format.label({
      label: 'accessLog',
    }),
    format.align(),
    format.timestamp(),
    format.printf((info) => {
      if (info.level === 'error') {
        return `${info.timestamp} ${info.label} ${info.level} ${info.sessionId} ${info.requestId} ${info.stack}`;
      }
      return `${info.timestamp} ${info.label} ${info.level} ${info.sessionId} ${
        info.requestId
      } ${info.message} ${info.payload && JSON.stringify(info.payload)}`;
    }),
    format.prettyPrint(),
  ),
  transports: [new transports.Console()],
};

export const accessLog = createLogger(accessLogConfig);
