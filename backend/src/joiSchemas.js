const Joi = require("joi");

const schemaRegister = Joi.object({
  nickname: Joi.string().min(4).max(32).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "fr", "synth"] },
    })
    .required(),
  password: Joi.string()
    .pattern(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
    .min(8)
    .max(255)
    .required(),
});

const schemaLoginNickname = Joi.object({
  credentials: Joi.string().min(4).max(32).required(),
  password: Joi.string()
    .pattern(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
    .min(8)
    .max(255)
    .required(),
});

const schemaLoginEmail = Joi.object({
  credentials: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "fr", "synth"] },
    })
    .required(),
  password: Joi.string()
    .pattern(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
    .min(8)
    .max(255)
    .required(),
});

module.exports = {
  schemaRegister,
  schemaLoginNickname,
  schemaLoginEmail,
};
