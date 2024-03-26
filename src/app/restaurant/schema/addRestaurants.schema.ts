import Joi = require("@hapi/joi");

const addRestaurantSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
  })
  .required();

export default addRestaurantSchema;
