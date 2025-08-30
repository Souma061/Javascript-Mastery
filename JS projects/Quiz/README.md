# 🎯 Quiz Game

A modern, accessible, and feature-rich trivia quiz application built with vanilla JavaScript and Bootstrap 5. Features include multiple categories, difficulty levels, lifelines, leaderboards, and comprehensive accessibility support.

![Quiz Game Screenshot](./docs/quiz-preview.png)

## ✨ Features

### 🎮 Core Gameplay
- **Multiple Choice Questions**: Powered by the Open Trivia Database API
- **15+ Categories**: General Knowledge, Computer Science, Sports, History, and more
- **3 Difficulty Levels**: Easy, Medium, Hard
- **Customizable Quiz Length**: 10, 15, or 20 questions
- **15-Second Timer**: Per question with visual countdown
- **Lifelines**: 50/50 and Skip Question (single use per game)

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark/Light Theme**: Toggle with persistence across sessions
- **Keyboard Navigation**: 1-4 keys for answers, Enter for next question
- **Visual Feedback**: Floating score animations, color-coded results
- **Loading States**: Smooth overlays during API requests

### ♿ Accessibility
- **Screen Reader Support**: ARIA live regions, proper labeling
- **Focus Management**: Automatic focus progression through quiz flow
- **Reduced Motion**: Respects user's motion preferences
- **High Contrast**: Clear visual indicators for correct/incorrect answers
- **Keyboard Only**: Complete functionality without mouse

### 📊 Progress & Scoring
- **Live Score Tracking**: Real-time score updates
- **Progress Indicators**: Visual progress bar and question counter
- **Review System**: Complete answer review after quiz completion
- **Leaderboards**: Universal and category-specific top 5 scores
- **Score Persistence**: Local storage with timestamps

## 🚀 Quick Start

### Prerequisites
- Modern web browser with JavaScript enabled
- Internet connection (for fetching questions from API)

### Installation
1. Clone or download the repository:
   ```bash
   git clone https://github.com/Souma061/JavaScript-main.git
   cd "JavaScript-main/JS projects/Quiz"
   ```

2. Open `index.html` in your web browser:
   ```bash
   # Using Python's built-in server
   python -m http.server 8000

   # Using Node.js serve
   npx serve .

   # Or simply open index.html in your browser
   ```

3. Start playing! No additional setup required.

## 📁 Project Structure

```
Quiz/
├── index.html          # Main HTML file with embedded CSS
├── quiz.js            # Core quiz logic and API integration
├── ui.js              # UI helpers and visual updates
├── leaderboard.js     # Leaderboard management and persistence
├── script.js          # Deprecated (kept for compatibility)
├── README.md          # This documentation
└── docs/
    ├── API.md         # API documentation
    └── CONTRIBUTING.md # Development guidelines
```

## 🎯 How to Play

### Starting a Quiz
1. **Select Category**: Choose from 15+ available categories or use "Surprise Me" for random selection
2. **Choose Difficulty**: Easy, Medium, or Hard
3. **Set Question Count**: 10, 15, or 20 questions
4. **Start Quiz**: Click "Start Quiz" button

### During the Quiz
- **Answer Questions**: Click on options or use keyboard (1-4 keys)
- **Use Lifelines**:
  - **50/50**: Removes two incorrect answers (5 points instead of 10)
  - **Skip**: Skip current question without penalty
- **Track Progress**: Monitor score and progress in real-time
- **Beat the Timer**: 15 seconds per question

### After Completion
- **Review Answers**: See all questions with your answers vs. correct answers
- **Save Score**: Enter your name to save to leaderboard
- **View Leaderboards**: Check universal and category-specific rankings
- **Play Again**: Restart with new settings

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup with accessibility attributes
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript ES6+**: Async/await, arrow functions, destructuring
- **Bootstrap 5.3**: Responsive framework and components
- **Open Trivia Database API**: Question source

### Browser Support
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

### Performance Features
- **Lazy Loading**: Questions fetched on-demand
- **Efficient DOM Manipulation**: Minimal reflows and repaints
- **Local Storage**: Client-side data persistence
- **Debounced API Calls**: Prevents excessive requests

### Security Measures
- **HTML Entity Decoding**: Prevents XSS from API responses
- **Input Sanitization**: User names are trimmed and validated
- **Error Boundaries**: Graceful handling of API failures
- **Safe Local Storage**: JSON parsing with fallbacks

## 🔧 Configuration

### Customizing Timer Duration
```javascript
// In quiz.js, modify the timeLeft variable
let timeLeft = 15; // Change to desired seconds
```

### Adding New Categories
```javascript
// In index.html, add to the category select
<option value="NEW_ID">New Category Name</option>
```

### Modifying Scoring System
```javascript
// In quiz.js, selectAnswer function
score += fiftyUsedOnQuestion ? 5 : 10; // Modify point values
```

## 📖 API Reference

### Open Trivia Database
- **Base URL**: `https://opentdb.com/api.php`
- **Categories**: `https://opentdb.com/api_category.php`
- **Rate Limit**: 1 request per 5 seconds (handled automatically)

### Supported Parameters
- `amount`: Number of questions (1-50)
- `category`: Category ID (9-32)
- `difficulty`: easy, medium, hard
- `type`: multiple (only multiple choice supported)

## 🐛 Troubleshooting

### Common Issues

**"Failed to fetch questions" Error**
- Check internet connection
- Verify API is accessible: https://opentdb.com/api.php?amount=1
- Try different category/difficulty combination

**Leaderboard Not Saving**
- Ensure local storage is enabled in browser
- Check if storage quota is exceeded
- Clear browser data and try again

**Questions Not Loading**
- Wait 5 seconds between requests (API rate limit)
- Try refreshing the page
- Check browser console for specific errors

**Mobile Display Issues**
- Ensure viewport meta tag is present
- Clear browser cache
- Update to latest browser version

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes with proper documentation
4. Test across different browsers and devices
5. Submit a pull request

### Code Style Guidelines
- Use 2-space indentation
- Follow JavaScript Standard Style
- Add JSDoc comments for functions
- Maintain accessibility standards
- Test with keyboard navigation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for providing free trivia questions
- [Bootstrap](https://getbootstrap.com/) for the responsive framework
- [MDN Web Docs](https://developer.mozilla.org/) for web standards reference

## 📞 Support

For support, questions, or feature requests:
- Open an issue on GitHub
- Contact: [sumabrataghosh57@gmail.com]
- Documentation: [Project Wiki](./docs/)

---

**Made with ❤️ by [Souma061](https://github.com/Souma061)**

*Version 1.0.0 - Last updated: August 2025*
