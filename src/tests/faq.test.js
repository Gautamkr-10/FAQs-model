import { expect } from 'chai';
import { FAQ } from '../models/FAQ.js';

describe('FAQ Model', () => {
  let testFaq;

  beforeEach(async () => {
    testFaq = await FAQ.create(
      'What is this test about?',
      'This test is about creating a multilingual FAQ system.'
    );
  });

  it('should create a new FAQ with translations', () => {
    expect(testFaq).to.have.property('id');
    expect(testFaq).to.have.property('question');
    expect(testFaq).to.have.property('answer');
    expect(testFaq.translations).to.have.property('hi');
    expect(testFaq.translations).to.have.property('bn');
  });

  it('should retrieve FAQ in different languages', async () => {
    const hindiFaq = await FAQ.getById(testFaq.id, 'hi');
    expect(hindiFaq.question).to.not.equal(testFaq.question);
    
    const englishFaq = await FAQ.getById(testFaq.id, 'en');
    expect(englishFaq.question).to.equal(testFaq.question);
  });
});