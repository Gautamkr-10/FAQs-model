import express from 'express';
import { FAQ } from '../models/FAQ.js';
import { validateFAQ } from '../middleware/validation.js';

export const router = express.Router();


router.get('/', async (req, res) => {
  const { lang = 'en' } = req.query;
  const faqs = await FAQ.getAll(lang);
  res.json(faqs);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { lang = 'en' } = req.query;
  
  const faq = await FAQ.getById(id, lang);
  
  if (!faq) {
    return res.status(404).json({ error: 'FAQ not found' });
  }
  
  res.json(faq);
});


router.post('/', validateFAQ, async (req, res) => {
  const { question, answer } = req.body;
  const faq = await FAQ.create(question, answer);
  res.status(201).json(faq);
});