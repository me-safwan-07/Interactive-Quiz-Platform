# Interactive Quiz Platform

A modern, interactive quiz application built with React, TypeScript, and Tailwind CSS. Test your knowledge across various topics with instant feedback, timed questions, and detailed performance tracking.

![Quiz Platform Screenshot](https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&q=80&w=2070)

## ✨ Features

### Core Functionality
- **Dynamic Quiz Experience**
  - Multiple choice and numerical questions
  - Randomized question order for each attempt
  - 30-second timer per question
  - Instant feedback on answers

### User Interface
- **Modern, Responsive Design**
  - Clean, intuitive interface
  - Mobile-friendly layout
  - Smooth animations and transitions
  - Progress tracking during quiz

### Performance Tracking
- **Comprehensive Analytics**
  - Detailed score breakdown
  - Visual performance charts
  - Historical attempt tracking
  - Question-by-question review

### Data Persistence
- **Local Storage Solution**
  - Quiz attempts saved using IndexedDB
  - Persistent progress tracking
  - Historical performance data

### Special Effects
- **Celebratory Animations**
  - Confetti effects on quiz completion
  - Interactive visual feedback
  - Engaging success celebrations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/me-safwan-07/Interactive-Quiz-Platform.git
```

2. Navigate to the project directory:
```bash
cd interactive-quiz-platform
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

## 🛠️ Built With

- **React** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Vite** - Build Tool
- **Zustand** - State Management
- **Chart.js** - Data Visualization
- **IndexedDB** - Local Storage
- **Canvas Confetti** - Celebration Effects

## 📱 Features in Detail

### Quiz Flow
1. **Home Screen**
   - Start quiz button
   - View previous attempts
   - Feature highlights

2. **Quiz Interface**
   - Clear question display
   - Timer countdown
   - Progress indicator
   - Navigation controls

3. **Results Page**
   - Final score display
   - Performance charts
   - Detailed answer review
   - Retry option

### Data Storage
- Quiz attempts stored locally
- Persistent progress tracking
- Historical performance data
- Secure data handling

## 🎯 Usage

1. **Starting a Quiz**
   - Click "Start Quiz" on the home screen
   - Review the instructions
   - Begin answering questions

2. **During the Quiz**
   - Select answers within the time limit
   - Use navigation buttons to move between questions
   - Track your progress with the question counter

3. **Completing the Quiz**
   - Review your final score
   - Check correct and incorrect answers
   - View performance charts
   - Start a new attempt if desired

## 🔧 Development

### Project Structure
```
src/
├── components/     # React components
├── store/         # State management
├── types/         # TypeScript definitions
├── data/          # Quiz questions
└── styles/        # CSS styles
```

### Key Components
- `QuestionCard.tsx` - Question display and interaction
- `QuizTimer.tsx` - Countdown timer
- `QuizResults.tsx` - Results and analytics
- `HomeScreen.tsx` - Landing page

## 📈 Performance

The application is optimized for:
- Fast loading times
- Smooth animations
- Efficient state management
- Responsive design
- Local data persistence

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons by Lucide React
- UI inspiration from modern quiz platforms
- Community feedback and contributions
