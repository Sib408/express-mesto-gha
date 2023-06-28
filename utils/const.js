const http2 = require('node:http2');

const STATUS_OK = 200; // 200;
const STATUS_CREATED = 201; // 201;
const BAD_REQUEST_ERROR = http2.constants.HTTP_STATUS_BAD_REQUEST; // 400
//const BAD_REQUEST_ERROR = http2.constants.HTTP_STATUS_BAD_REQUEST; // 400
const NOT_FOUND_ERROR = http2.constants.HTTP_STATUS_NOT_FOUND; // 404
const ERROR_SERVER = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR; // 500


module.exports = {
  STATUS_OK,
  STATUS_CREATED,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  ERROR_SERVER
};
