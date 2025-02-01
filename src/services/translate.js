import { Translate } from '@google-cloud/translate/build/src/v2/index.js';

const translator = new Translate({
  projectId: process.env.GOOGLE_PROJECT_ID,
  key: process.env.GOOGLE_API_KEY
});

export async function translate(text, targetLang) {
  try {
    const [translation] = await translator.translate(text, targetLang);
    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    return text; 
  }
}