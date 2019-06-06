import get from 'lodash.get'
import { HTTP_CODES } from '../constants';
import { Locations } from "../models";


/**
 * Attach to a response object a JSON payload and the specified HTTP code
 *
 * @function
 * @param {Object} data - The response to be server to the client.
 * @param {int} code - The HTTP code to attach to the response
 * @param {Object} res - The response object from express
 * @return {undefined}
 */
const responseJSON = (data, code, res) => {
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
const handledError = (res, e) => {
  console.error(e.message);
  responseJSON({ error: e.message}, HTTP_CODES.INTERNAL_SERVER_ERROR, res);
};

const requiredLocationFields = [
  'name',
  'latitude',
  'longitude',
  'open',
];
export default {
  /**
   * Gets a list of all the locations in the database
   *
   * @function
   * @param {Object} req - The request object from express
   * @param {Object} res - The response object from express
   * @return {undefined}
   */
  async getAllLocations(req, res) {
    try {
      const locations = await Locations.findAll();
      responseJSON({ locations }, HTTP_CODES.OK, res);
    } catch (e) {
      handledError(res, e);
    }
  },
  /**
   * Inserts a new location in the database
   *
   * @function
   * @param {Object} req - The request object from express
   * @param {Object} res - The response object from express. The request must contain a JSON object in its body
   * @return {undefined}
   */
  async createLocation(req, res) {
    // TODO: Authenticate request
    const location = req.body;
    const hasRequiredKeys = requiredLocationFields.every(key => Object.keys(location).includes(key));
    if (!hasRequiredKeys) {
      responseJSON(`The keys ${requiredLocationFields} are required`, HTTP_CODES.BAD_REQUEST, res);
    } else {
      try {
        const newLocation = await Locations.create(location);
        // TODO: Emit message
        responseJSON(newLocation, HTTP_CODES.CREATED, res);
      } catch (e) {
        return handledError(res, e);
      }
    }
  },
  /**
   * Gets a single location by its Id
   *
   * @function
   * @param {Object} req - The request object from express
   * @param {Object} res - The response object from express
   * @return {undefined}
   */
  async getLocation(req, res) {
    const locationId = get(req, 'params.id', 0);
    try {
      const location = await Locations.findByPk(locationId);
      if (location) {
        responseJSON(location, HTTP_CODES.OK, res);
      } else {
        responseJSON({ message: 'Location not found'}, HTTP_CODES.NOT_FOUND, res);
      }

    } catch (e) {
      return handledError(res, e);
    }
  },
  async updateLocation(req, res) {
    try {
      responseJSON('updateLocation', HTTP_CODES.OK, res);
    } catch (e) {
      return handledError(res, e);
    }
  },
  async deleteLocation(req, res) {
    try {
      responseJSON('deleteLocation', HTTP_CODES.OK, res);
    } catch (e) {
      return handledError(res, e);
    }
  },
}