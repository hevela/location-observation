import get from 'lodash.get';
import { HTTP_CODES, CHANNEL, CREATE_EVENT, DELETED_EVENT, UPDATED_EVENT } from '../../constants';
import { Locations } from "../../models";
import { responseJSON, handledError } from '../common'

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
    // Verify authentication
    if (!req.user) {
      responseJSON('Authentication Required', HTTP_CODES.UNAUTHORIZED, res);
      return;
    }
    const io = req.app.get('socket');
    const location = req.body;
    const hasRequiredKeys = requiredLocationFields.every(key => Object.keys(location).includes(key));
    if (!hasRequiredKeys) {
      responseJSON(`The keys ${requiredLocationFields} are required`, HTTP_CODES.BAD_REQUEST, res);
    } else {
      try {
        const newLocation = await Locations.create(location);
        // Emit message
        io.emit(CHANNEL, { event: CREATE_EVENT, location: newLocation });
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
  /**
   * Updates a location in the database. A JSON body can be a partial object. Only the included keys
   * will be updated in the existing object
   *
   * @function
   * @param {Object} req - The request object from express
   * @param {Object} res - The response object from express. The request must contain a JSON object in
   * its body and a param `id` for the object Id
   * @return {undefined}
   */
  async updateLocation(req, res) {
    // Verify authentication
    if (!req.user) {
      responseJSON('Authentication Required', HTTP_CODES.UNAUTHORIZED, res);
      return;
    }
    const io = req.app.get('socket');
    const locationId = get(req, 'params.id', 0);
    const locationBody = req.body;
    const hasRequiredKeys = requiredLocationFields.some(key => Object.keys(locationBody).includes(key));
    if (!hasRequiredKeys || locationId === 0) {
      responseJSON(
          `At least one of the keys: ${requiredLocationFields} are required, and the locationId must be provided`,
          HTTP_CODES.BAD_REQUEST,
          res
      );
    } else {
      try {
        const locationObject = await Locations.findByPk(locationId);
        if (locationObject) {
          const updatedLocation = await locationObject.update(
              locationBody,
              { fields: Object.keys(locationBody) }
              );
          // Emit message
          io.emit(CHANNEL, { event: UPDATED_EVENT, location: updatedLocation });
          responseJSON(updatedLocation, HTTP_CODES.OK, res);

        } else {
          responseJSON({ message: 'Location not found'}, HTTP_CODES.NOT_FOUND, res);
        }
      } catch (e) {
        return handledError(res, e);
      }
    }
  },
  /**
   * Deletes a location object given its Id
   *
   * @function
   * @param {Object} req - The request object from express
   * @param {Object} res - The response object from express. The request must contain a
   * param `id` for the object Id
   * @return {undefined}
   */
  async deleteLocation(req, res) {
    // Verify authentication
    if (!req.user) {
      responseJSON('Authentication Required', HTTP_CODES.UNAUTHORIZED, res);
      return;
    }
    const io = req.app.get('socket');
    const locationId = get(req, 'params.id', 0);
    try {
      const location = await Locations.findByPk(locationId);
      if (location) {
        await location.destroy();
        // Emit message
        io.emit(CHANNEL, { event: DELETED_EVENT, locationId });
        responseJSON(undefined, HTTP_CODES.NO_CONTENT, res);
      } else {
        responseJSON({ message: 'Location not found'}, HTTP_CODES.NOT_FOUND, res);
      }

    } catch (e) {
      return handledError(res, e);
    }
  },
}