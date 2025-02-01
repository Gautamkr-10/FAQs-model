import Redis from 'ioredis';
import { translate } from '../services/translate.js';

const redis = new Redis();

export class FAQ {
  constructor(id, question, answer, translations = {}) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.translations = translations;
  }

  static async create(question, answer) {
    const id = Date.now().toString();
    const faq = new FAQ(id, question, answer);
    
    
    const supportedLanguages = ['hi', 'bn'];
    const translations = {};
    
    for (const lang of supportedLanguages) {
      translations[lang] = {
        question: await translate(question, lang),
        answer: await translate(answer, lang)
      };
    }
    
    faq.translations = translations;
  

    await redis.hset(`faq:${id}`, {
      question,
      answer,
      translations: JSON.stringify(translations)
    });
    
    return faq;
  }

  static async getById(id, lang = 'en') {
    const cached = await redis.hgetall(`faq:${id}`);
    
    if (!cached.question) {
      return null;
    }
    
    const translations = JSON.parse(cached.translations);
    
    if (lang === 'en') {
      return new FAQ(id, cached.question, cached.answer, translations);
    }
    
    const translation = translations[lang] || {
      question: cached.question,
      answer: cached.answer
    };
    
    return new FAQ(
      id,
      translation.question,
      translation.answer,
      translations
    );
  }

  static async getAll(lang = 'en') {
    const keys = await redis.keys('faq:*');
    const faqs = [];
    
    for (const key of keys) {
      const id = key.split(':')[1];
      const faq = await FAQ.getById(id, lang);
      if (faq) {
        faqs.push(faq);
      }
    }
    
    return faqs;
  }
}