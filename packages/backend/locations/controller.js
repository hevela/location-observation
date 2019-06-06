import { HTTP_CODES } from '../constants';
import { Locations } from "../models";


const responseJSON = (data, code, res) => {
  res.status(code).json({ data });
};

const handledError = (res, e) => {
  console.error(e.message);
  responseJSON({ error: e.message}, HTTP_CODES.INTERNAL_SERVER_ERROR, res);
};

export default {
  async getAllLocations(req, res) {
    try {
      const locations = await Locations.findAll();
      responseJSON({ locations }, HTTP_CODES.OK, res)
    } catch (e) {
      handledError(res, e);
    }
  },
  async createLocation(req, res) {
    try {
      responseJSON('createLocation', HTTP_CODES.OK, res)
    } catch (e) {
      return handledError(res, e);
    }
  },
  async getLocation(req, res) {
    try {
      responseJSON('getLocation', HTTP_CODES.OK, res)
    } catch (e) {
      return handledError(res, e);
    }
  },
  async updateLocation(req, res) {
    try {
      responseJSON('updateLocation', HTTP_CODES.OK, res)
    } catch (e) {
      return handledError(res, e);
    }
  },
  async deleteLocation(req, res) {
    try {
      responseJSON('deleteLocation', HTTP_CODES.OK, res)
    } catch (e) {
      return handledError(res, e);
    }
  },
}