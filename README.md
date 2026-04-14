# Evolve AI - The Smart Quiz Organizer

**Evalve AI** is a premium, high-performance web application designed to revolutionize how quizzes are created, shared, and analyzed. Powered by the **Google Gemini 1.5 Flash** large language model, Evalve AI allows anyone to generate complex, multi-topic quizzes in seconds.

![App Preview](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## ✨ Core Features

- **🧠 AI Question Engine**: Generate high-quality multiple choice questions instantly using Gemini 1.5 Flash.
- **🛠️ Manual Creation "Slabs"**: Design custom quizzes with a structured, intuitive interface.
- **🕒 Interactive Quiz Experience**: Live timer, real-time progress tracking, and instant feedback.
- **📊 Advanced Analytics**: Visual performance trends and accuracy breakdown powered by Recharts.
- **🏆 Global Leaderboards**: Compete with friends and peers in real-time.
- **🔒 Active Controls**: Creators can activate/deactivate quizzes instantly to manage access.

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express, Google Generative AI SDK
- **Charts**: Recharts
- **Icons**: Lucide React
- **Authentication**: JWT-based session management

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sarthak00C/Evalve-ai-quizzes.git
   cd Evalve-ai-quizzes
   ```

2. **Setup Environment**
   Create a `.env` file in the root and `server/` directories:
   ```env
   GOOGLE_API_KEY=your_api_key_here
   JWT_SECRET=your_secret_here
   ```

3. **Install & Run**
   ```bash
   # Root / Frontend
   npm install
   npm run dev

   # Backend
   cd server
   npm install
   npm start
   ```

## 🤝 Contributing
Feel free to fork this project and submit pull requests for any features or improvements.

## 📄 License
This project is licensed under the MIT License.
