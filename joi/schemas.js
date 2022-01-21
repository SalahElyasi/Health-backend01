import Joi from "joi";

export const signUpBody = Joi.object().keys({
  name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  account_type: Joi.string().required(),
  // number: Joi.number().integer().optional().default(0),
});

export const postBody = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required(),
  // number: Joi.number().integer().optional().default(0),
});
