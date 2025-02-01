import Joi from 'joi';

const faqSchema = Joi.object({
  question: Joi.string().required().min(10),
  answer: Joi.string().required().min(20)
});

export async function validateFAQ(req, res, next) {
  try {
    await faqSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.details[0].message });
  }
}