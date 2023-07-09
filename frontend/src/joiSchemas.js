import Joi from "joi";

const schemaRegister = Joi.object({
  nickname: Joi.string().min(4).max(32).required().messages({
    "string.min": "Your nickname must be at least 4 characters long.",
    "string.max": "Your nickname cannot exceed 32 characters.",
    "string.empty": "You must provide a nickname.",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "fr", "bite"] },
    })
    .required(),
  password: Joi.string()
    .pattern(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
    .min(8)
    .max(64)
    .required()
    .messages({
      "string.pattern.base":
        "Your password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      "string.min": "Your password must be at least 8 characters long.",
      "string.max": "Your password cannot exceed 64 characters.",
      "string.empty": "You must provide a password.",
    }),
});

const schemaLoginNickname = Joi.object({
  credentials: Joi.string().min(4).max(32).required().messages({
    "string.min": "Your nickname must be at least 4 characters long.",
    "string.max": "Your nickname cannot exceed 32 characters.",
    "string.empty": "You must provide a nickname.",
  }),
  password: Joi.string()
    .pattern(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
    .min(8)
    .max(64)
    .required()
    .messages({
      "string.pattern.base":
        "Your password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      "string.min": "Your password must be at least 8 characters long.",
      "string.max": "Your password cannot exceed 64 characters.",
      "string.empty": "You must provide a password.",
    }),
});

const schemaLoginEmail = Joi.object({
  credentials: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "fr", "bite"] },
    })
    .required(),
  password: Joi.string()
    .pattern(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
    .min(8)
    .max(64)
    .required()
    .messages({
      "string.pattern.base":
        "Your password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      "string.min": "Your password must be at least 8 characters long.",
      "string.max": "Your password cannot exceed 64 characters.",
      "string.empty": "You must provide a password.",
    }),
});

export { schemaRegister, schemaLoginNickname, schemaLoginEmail };
