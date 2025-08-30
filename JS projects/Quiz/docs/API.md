# API Documentation

## Overview
The Quiz Game integrates with the Open Trivia Database (OpenTDB) API to fetch trivia questions. This document details the API usage, error handling, and data flow.

## Base Configuration

### Endpoints
- **Questions API**: `https://opentdb.com/api.php`
- **Categories API**: `https://opentdb.com/api_category.php`
- **Session Token**: `https://opentdb.com/api_token.php` (not currently used)

### Rate Limiting
- **Limit**: 1 request per 5 seconds per IP
- **Handling**: Built-in retry logic with exponential backoff
- **Status**: Monitored via response codes

## API Methods

### 1. Fetch Quiz Questions

```javascript
async function fetchQuizQuestions(amount, category, difficulty)
```

**Purpose**: Retrieves trivia questions based on user preferences

**Parameters**:
- `amount` (number): Number of questions (1-50)
- `category` (string): Category ID or 'any'
- `difficulty` (string): 'easy', 'medium', 'hard', or 'any'

**Request URL Structure**:
```
https://opentdb.com/api.php?amount=20&category=9&difficulty=medium&type=multiple
```

**Response Format**:
```json
{
  "response_code": 0,
  "results": [
    {
      "category": "General Knowledge",
      "type": "multiple",
      "difficulty": "medium",
      "question": "What is the capital of France?",
      "correct_answer": "Paris",
      "incorrect_answers": ["London", "Berlin", "Madrid"]
    }
  ]
}
```

**Error Handling**:
```javascript
// Response codes and their meanings
const API_RESPONSES = {
  0: 'Success',
  1: 'No Results - API doesn\'t have enough questions',
  2: 'Invalid Parameter - Contains invalid parameter',
  3: 'Token Not Found - Session Token does not exist',
  4: 'Token Empty - Session Token has returned all questions',
  5: 'Rate Limit - Too many requests'
};
```

### 2. Fetch Categories

```javascript
async function pickSurpriseCategoryNotInList()
```

**Purpose**: Retrieves available categories for "Surprise Me" feature

**Request URL**:
```
https://opentdb.com/api_category.php
```

**Response Format**:
```json
{
  "trivia_categories": [
    {"id": 9, "name": "General Knowledge"},
    {"id": 10, "name": "Entertainment: Books"},
    {"id": 11, "name": "Entertainment: Film"}
  ]
}
```

## Data Processing

### HTML Entity Decoding
All API responses contain HTML entities that must be decoded:

```javascript
function decodeHtml(str) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}
```

**Examples**:
- `&quot;` → `"`
- `&#039;` → `'`
- `&amp;` → `&`
- `&lt;` → `<`
- `&gt;` → `>`

### Question Processing Pipeline

1. **Fetch Raw Data**: API call with parameters
2. **Validate Response**: Check response_code and results array
3. **Decode Entities**: Process all text fields
4. **Shuffle Options**: Randomize answer order
5. **Structure Data**: Transform to internal format

```javascript
// Internal question format
{
  question: "Decoded question text",
  options: ["Option 1", "Option 2", "Option 3", "Option 4"], // shuffled
  answer: "Correct answer text"
}
```

## Error Recovery Strategies

### Network Failures
```javascript
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Network error: ${response.status}`);
  // Process response...
} catch (error) {
  // Show user-friendly error message
  // Provide retry option
  // Log error for debugging
}
```

### API Response Errors
```javascript
if (data.response_code !== 0) {
  switch (data.response_code) {
    case 1:
      // Try with different parameters
      return await fetchWithFallback(amount, 'any', 'any');
    case 5:
      // Rate limited - wait and retry
      await delay(5000);
      return await fetchQuizQuestions(amount, category, difficulty);
    default:
      // Other errors - return empty array
      return [];
  }
}
```

### Fallback Strategies

1. **Category Fallback**: If specific category fails, try "any category"
2. **Difficulty Fallback**: If specific difficulty fails, try "any difficulty"
3. **Amount Fallback**: If requested amount fails, try smaller amounts
4. **Cache Strategy**: Store successful responses for offline use (future enhancement)

## Performance Optimizations

### Request Optimization
- **Parameter Validation**: Ensure valid values before API call
- **Debouncing**: Prevent rapid successive calls
- **Caching**: Store category list to reduce API calls

### Response Optimization
- **Lazy Processing**: Decode entities only when needed
- **Batch Processing**: Process all questions in single operation
- **Memory Management**: Clear unused question data

## Security Considerations

### Input Sanitization
```javascript
// Validate category parameter
if (category && category !== 'any' &&
    !Number.isNaN(Number(category)) &&
    Number(category) > 0) {
  params.set('category', String(category));
}
```

### XSS Prevention
```javascript
// Always decode HTML entities from API
const safeText = decodeHtml(apiResponse.question);

// Use textContent instead of innerHTML when possible
element.textContent = safeText;
```

### API Key Management
- **No API Key Required**: OpenTDB is free and open
- **Rate Limiting**: Respect API limits to maintain access
- **Error Logging**: Monitor for abuse patterns

## Monitoring & Analytics

### Success Metrics
- **API Response Time**: Track request duration
- **Success Rate**: Monitor successful vs. failed requests
- **Question Quality**: Track user engagement with different categories

### Error Tracking
```javascript
function logAPIError(error, context) {
  console.error('API Error:', {
    message: error.message,
    url: context.url,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  });
}
```

### Usage Statistics
- **Popular Categories**: Track most requested categories
- **Difficulty Distribution**: Monitor difficulty preferences
- **Peak Usage Times**: Identify high-traffic periods

## Future Enhancements

### Session Management
- **Token System**: Implement session tokens to prevent duplicate questions
- **Question History**: Track shown questions to avoid repeats
- **Custom Sessions**: Allow users to create custom question sets

### Advanced Features
- **Offline Mode**: Cache questions for offline play
- **Custom Categories**: Allow user-generated questions
- **Multiplayer**: Real-time question synchronization
- **Question Reporting**: Allow users to report incorrect questions

## Testing the API

### Manual Testing
```bash
# Test basic question fetch
curl "https://opentdb.com/api.php?amount=1&type=multiple"

# Test category list
curl "https://opentdb.com/api_category.php"

# Test with specific parameters
curl "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
```

### Automated Testing
```javascript
// Test API availability
async function testAPIHealth() {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=1');
    const data = await response.json();
    return data.response_code === 0;
  } catch {
    return false;
  }
}
```

## Troubleshooting Common Issues

### "No questions available" Error
- **Cause**: Rare category/difficulty combination
- **Solution**: Implement fallback to broader parameters

### Rate Limiting Issues
- **Cause**: Too many requests in short time
- **Solution**: Implement request queuing with delays

### Malformed Questions
- **Cause**: HTML entities or special characters
- **Solution**: Robust HTML decoding and validation

---

*Last updated: August 2025*
