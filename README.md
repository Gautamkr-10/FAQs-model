# Multilingual FAQ Management System

A robust backend API for managing FAQs with multi-language support, WYSIWYG content, and caching.

## Features

- Multi-language support (English, Hindi, Bengali)
- Automatic translation using Google Translate API
- Redis caching for improved performance
- RESTful API endpoints
- Input validation
- Rate limiting
- Error handling
- Unit tests

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```
   GOOGLE_PROJECT_ID=your_project_id
   GOOGLE_API_KEY=your_api_key
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=your_password
   ```
4. Start Redis server
5. Run the application:
   ```bash
   npm run dev
   ```

## API Endpoints

### Get all FAQs
```
GET /api/faqs?lang=en
```

### Get single FAQ
```
GET /api/faqs/:id?lang=en
```

### Create new FAQ
```
POST /api/faqs
{
  "question": "What is this?",
  "answer": "This is a multilingual FAQ system"
}
```

## Testing

Run tests using:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT