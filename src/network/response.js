//respuestas de server
import chalk from 'chalk';

//success
export const success = (req, res, message, status) => {
  res.status(status || 200).send({
    error: '',
    body: message
  })
};

// request, response, message, status code, error details
export const error = (req, res, message, status, details) => {
  console.log(chalk.red('Details error'));
  console.error(chalk.yellow(details));
  res.status(status || 500).send({
    error: message,
    body: ''
  })
}

