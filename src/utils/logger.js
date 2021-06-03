import { format, createLogger, transports, addColors } from 'winston';

import { NODE_ENV } from '../config';

const { printf, combine, timestamp, colorize, errors, json, label } = format;

// TODO: store the error log files in database like MongoDB

// REF: youtube (Node winston logging) - https://youtu.be/A5YiqaQbsyI
// REVIEW: probably make a logger folder and create various loggers

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

const buildDevLogger = () => {
  const logFormat = printf(({ level, message, timestamp, stack, label }) => {
    return `${timestamp} [${label}] ${level}: ${stack || message}`;
  });

  addColors(colors);

  return createLogger({
    level: 'debug',
    format: combine(
      // colorize({ all: true }), // makes the entire line colored
      colorize(),
      label({ label: 'dev' }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new transports.Console()],
  });
};

const buildProdLogger = () => {
  return createLogger({
    level: 'http',
    format: combine(
      label({ label: 'prod' }),
      timestamp(),
      errors({ stack: true }),
      json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [new transports.Console()],
  });
};

let logger = null;

if (NODE_ENV === 'development') {
  logger = buildDevLogger();
} else {
  logger = buildProdLogger();
}

export default logger;
