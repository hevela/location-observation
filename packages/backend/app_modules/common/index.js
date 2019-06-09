import { HTTP_CODES } from '../../constants';

/**
 * Attach to a response object a JSON payload and the specified HTTP code
 *
 * @function
 * @param {Object} data - The response to be server to the client.
 * @param {int} code - The HTTP code to attach to the response
 * @param {Object} res - The response object from express
 * @return {undefined}
 */
export const responseJSON = (data, code, res) => {
  try {
    res.status(code).json({ data });
  } catch (e) {
    console.error('Unknown error', e.message)
  }
};

/**
 * Logs an error and returns an error message as payload
 *
 * @function
 * @param {Object} res - The response object from express
 * @param {Error} e - The thrown error object
 * @return {undefined}
 */
export const handledError = (res, e) => {
  console.error(e.message);
  responseJSON({ error: e.message}, HTTP_CODES.INTERNAL_SERVER_ERROR, res);
};