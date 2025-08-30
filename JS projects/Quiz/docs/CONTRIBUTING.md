# Contributing to Quiz Game

Thank you for your interest in contributing to the Quiz Game project! This document provides guidelines and information for contributors.

## 🎯 Getting Started

### Prerequisites
- Basic knowledge of HTML, CSS, and JavaScript
- Understanding of web accessibility principles
- Familiarity with Git and GitHub
- Modern web browser for testing

### Development Environment Setup
1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/JavaScript-main.git
   cd "JavaScript-main/JS projects/Quiz"
   ```

2. **Set up local server** (recommended)
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📋 Code Standards

### JavaScript Style Guide
- **Indentation**: 2 spaces (no tabs)
- **Semicolons**: Always use semicolons
- **Quotes**: Single quotes for strings
- **Functions**: Use arrow functions for callbacks, regular functions for main logic
- **Variables**: Use `const` by default, `let` when reassignment needed

```javascript
// ✅ Good
const questions = [];
let currentIndex = 0;

const handleClick = (event) => {
  event.preventDefault();
  processAnswer(event.target.textContent);
};

// ❌ Avoid
var questions = []
let currentIndex = 0

function handleClick(event) {
  event.preventDefault()
  processAnswer(event.target.textContent)
}
```

### HTML Guidelines
- **Semantic markup**: Use appropriate HTML5 elements
- **Accessibility**: Include ARIA attributes where needed
- **Validation**: Ensure valid HTML5
- **Comments**: Document complex sections

```html
<!-- ✅ Good -->
<button type="button" aria-label="Start Quiz" class="btn btn-primary">
  Start Quiz
</button>

<!-- ❌ Avoid -->
<div onclick="startQuiz()" class="button">Start Quiz</div>
```

### CSS Best Practices
- **Mobile-first**: Use `min-width` media queries
- **Custom properties**: Use CSS variables for theming
- **BEM methodology**: For complex components
- **Accessibility**: Respect `prefers-reduced-motion`

```css
/* ✅ Good */
.quiz-button {
  min-height: var(--touch-min);
  transition: background-color 0.2s ease;
}

@media (prefers-reduced-motion: reduce) {
  .quiz-button {
    transition: none;
  }
}

/* ❌ Avoid */
.btn {
  height: 30px; /* Too small for touch */
  transition: all 0.5s; /* Ignores user preferences */
}
```

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] **Desktop browsers**: Chrome, Firefox, Safari, Edge
- [ ] **Mobile devices**: iOS Safari, Android Chrome
- [ ] **Keyboard navigation**: Tab, Arrow keys, Enter, Space
- [ ] **Screen readers**: Test with NVDA/JAWS/VoiceOver
- [ ] **Theme switching**: Light/dark mode functionality
- [ ] **API failures**: Test with network disabled
- [ ] **Edge cases**: Empty responses, malformed data

### Testing Scenarios
```javascript
// Test API error handling
// 1. Disconnect internet during quiz start
// 2. Select obscure category/difficulty combination
// 3. Rapidly click start button
// 4. Leave quiz idle for extended time

// Test accessibility
// 1. Navigate entire app using only keyboard
// 2. Test with screen reader announcements
// 3. Verify focus management through quiz flow
// 4. Test with high contrast mode
```

### Performance Testing
- **Loading time**: Should start within 2 seconds
- **API response**: Handle delays gracefully
- **Memory usage**: No significant leaks during extended play
- **Animation performance**: 60fps on modern devices

## 🐛 Bug Reports

### Before Reporting
1. **Search existing issues** for duplicates
2. **Test in multiple browsers** to confirm
3. **Clear cache** and test again
4. **Check console** for JavaScript errors

### Bug Report Template
```markdown
**Bug Description**
Clear description of the issue

**Steps to Reproduce**
1. Go to quiz start screen
2. Select specific category/difficulty
3. Click start quiz
4. Observe error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- Browser: Chrome 115.0.5790.110
- OS: Windows 11
- Device: Desktop
- Screen size: 1920x1080

**Console Errors**
```
Paste any JavaScript errors here
```

**Screenshots**
Attach relevant screenshots
```

## ✨ Feature Requests

### Guidelines for New Features
- **User benefit**: Clear value proposition
- **Accessibility**: Must not break a11y features
- **Performance**: Minimal impact on load time
- **Compatibility**: Works across supported browsers
- **Maintainability**: Clean, documented code

### Feature Request Template
```markdown
**Feature Description**
Clear description of the proposed feature

**User Story**
As a [user type], I want [functionality] so that [benefit]

**Implementation Ideas**
Technical approach or suggestions

**Mockups/Examples**
Visual representation if applicable

**Considerations**
- Accessibility impact
- Performance implications
- Browser compatibility
- Security concerns
```

## 📝 Pull Request Process

### Before Submitting
1. **Create feature branch** from main
   ```bash
   git checkout -b feature/new-quiz-feature
   ```

2. **Test thoroughly** on multiple devices/browsers
3. **Update documentation** if needed
4. **Follow code style** guidelines
5. **Add comments** for complex logic

### Pull Request Template
```markdown
**Description**
Brief description of changes

**Type of Change**
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

**Testing**
- [ ] Tested on desktop browsers
- [ ] Tested on mobile devices
- [ ] Tested keyboard navigation
- [ ] Tested with screen reader
- [ ] Tested API error scenarios

**Screenshots**
Before and after screenshots if UI changes

**Checklist**
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors
- [ ] Accessibility maintained
```

### Review Process
1. **Automated checks**: Linting and basic validation
2. **Code review**: Maintainer review for quality
3. **Testing review**: Functional testing verification
4. **Accessibility review**: a11y compliance check
5. **Performance review**: Impact assessment

## 🎨 Design Guidelines

### UI/UX Principles
- **Simplicity**: Clean, uncluttered interface
- **Consistency**: Uniform styling and behavior
- **Feedback**: Clear visual/audio responses
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Fast, responsive interactions

### Visual Design
- **Color scheme**: Support for light/dark themes
- **Typography**: Readable, scalable fonts
- **Spacing**: Consistent rhythm and hierarchy
- **Icons**: Meaningful, universally understood
- **Animations**: Purposeful, respectful of motion preferences

### Responsive Design
```css
/* Mobile first approach */
.container { max-width: 460px; }

@media (min-width: 576px) {
  .container { max-width: 520px; }
}

@media (min-width: 768px) {
  .container { max-width: 640px; }
}
```

## 🔧 Development Workflow

### Branching Strategy
- **main**: Production-ready code
- **feature/**: New features (`feature/leaderboard-export`)
- **bugfix/**: Bug fixes (`bugfix/timer-reset-issue`)
- **docs/**: Documentation updates (`docs/api-examples`)

### Commit Messages
```bash
# ✅ Good commit messages
git commit -m "feat: add keyboard shortcuts for quiz navigation"
git commit -m "fix: resolve timer not resetting between questions"
git commit -m "docs: update API documentation with error codes"
git commit -m "style: improve mobile responsiveness for quiz options"

# ❌ Avoid
git commit -m "updates"
git commit -m "fix stuff"
git commit -m "WIP"
```

### Release Process
1. **Feature freeze**: No new features
2. **Testing phase**: Comprehensive testing
3. **Documentation update**: Ensure docs are current
4. **Version bump**: Update version numbers
5. **Tag release**: Create GitHub release
6. **Deploy**: Update live version

## 🤝 Community Guidelines

### Code of Conduct
- **Be respectful**: Treat all contributors with respect
- **Be inclusive**: Welcome developers of all skill levels
- **Be constructive**: Provide helpful feedback
- **Be patient**: Allow time for reviews and responses

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Pull Request Reviews**: Code-specific feedback
- **Email**: Direct contact for sensitive issues

### Recognition
Contributors will be:
- **Listed**: In project contributors section
- **Credited**: In release notes for significant contributions
- **Invited**: To join maintainer team for sustained contribution

## 📚 Resources

### Learning Materials
- [MDN Web Docs](https://developer.mozilla.org/): Web standards reference
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/): Accessibility standards
- [Bootstrap Docs](https://getbootstrap.com/docs/): UI framework reference
- [Open Trivia DB](https://opentdb.com/): API documentation

### Tools
- **Code Editor**: VS Code with extensions
- **Browser DevTools**: For debugging and testing
- **Screen Readers**: NVDA (Windows), VoiceOver (Mac)
- **Accessibility Checker**: axe DevTools extension

### Helpful Extensions (VS Code)
- ESLint: JavaScript linting
- Prettier: Code formatting
- Live Server: Local development server
- axe Accessibility Linter: A11y checking

---

## 🙋‍♀️ Questions?

If you have questions not covered in this guide:
1. **Check existing issues** and discussions
2. **Review the README** and API documentation
3. **Create a new discussion** on GitHub
4. **Contact maintainers** directly if needed

Thank you for contributing to make this quiz game better for everyone! 🎉

---

*Last updated: August 2025*
