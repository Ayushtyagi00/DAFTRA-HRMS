const { z } = require("zod");

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const newUserRegsiterSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required" }),
  company: z.string().min(1, { message: "Company name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const validateLoginMiddleware = (req, res, next) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.issues,
    });
  }

  next();
};

const validateRegisterMiddleware = (req, res, next) => {
  const result = newUserRegsiterSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.issues,
    });
  }

  next();
};

module.exports = {
  validateLoginMiddleware,
  validateRegisterMiddleware,
};
