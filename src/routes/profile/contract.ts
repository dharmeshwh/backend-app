import Joi from "joi";
import CustomValidation from "../../utils/customValidation";

const loginContract = Joi.object({
  password: CustomValidation.passwordValidation("Password"),
  username: Joi.string().required(),
});

const signupContract = Joi.object({
  username: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export { loginContract, signupContract };
