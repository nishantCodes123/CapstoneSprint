import winston from 'winston';//logging library

export const logger = winston.createLogger({//logger object creation
  level: 'info',//allowed are info,warn and error

  format: winston.format.combine(
    winston.format.timestamp(),//timestamp free
    winston.format.json()//json structure
  ),

  transports: [
    
    new winston.transports.File({
      filename: 'logs/framework.log'
    })
  ]
});

//winston hierarchy:
// error
// warn
// info
// http
// verbose
// debug
// silly