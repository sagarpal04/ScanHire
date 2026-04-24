# 🚀 ScanHire AI – Ultimate ATS Optimizer

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**ScanHire AI** is a state-of-the-art, AI-powered Applicant Tracking System (ATS) optimization tool. It helps job seekers "beat the algorithm" by analyzing their resumes against specific job descriptions, providing a realistic ATS score, identifying keyword gaps, and offering actionable insights to improve their application success rate.

---

## ✨ Core Features

*   **🎯 AI-Powered ATS Scoring**: Get a realistic, strict compatibility score (0-100) based on enterprise-level ATS logic.
*   **📄 Smart Resume Extraction**: Upload PDF resumes to automatically extract and clean text using advanced NLP.
*   **🪄 AI Content Refinement**: Automatically fix formatting, remove extraction artifacts, and structure your resume text using **Puter AI**.
*   **🛠️ JD Optimization**: Paste complex job descriptions and let AI extract the core responsibilities and required skills.
*   **📊 Keyword Gap Analysis**: See exactly which skills you have and which ones you're missing compared to the job requirements.
*   **💡 Actionable Insights**: Receive detailed feedback on strengths, weaknesses, and specific improvement suggestions.
*   **🌈 Premium UI/UX**: A stunning, responsive interface with smooth animations, dark mode aesthetics, and micro-interactions.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [Vite](https://vitejs.dev/) + [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) (Shadcn/UI)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Integration**: [Puter.js](https://puter.com/) (Self-hosted/Browser AI)
- **Database & Storage**: [Supabase](https://supabase.com/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query) (React Query)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)
- A [Supabase](https://supabase.com/) project for file storage

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/ATS-FRONTEND.git
    cd ATS-FRONTEND
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    bun install
    ```

3.  **Configure local environment**:
    Create a `.env` file in the root directory and add the following:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    VITE_BACKEND_URL=your_backend_api_url
    ```

4.  **Start the development server**:
    ```bash
    npm run dev
    # or
    bun dev
    ```

5.  Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Testing

The project includes both unit and end-to-end testing suites:

- **Unit Tests (Vitest)**:
  ```bash
  npm run test
  # or
  npm run test:watch
  ```

- **E2E Tests (Playwright)**:
  ```bash
  npx playwright test
  ```

---

## 📂 Project Structure

```text
src/
├── components/   # UI components and layout logic
│   ├── ui/       # Shared Shadcn/UI primitive components
│   ├── Dashboard # Main application dashboard
│   └── Landing   # Hero section and features showcase
├── hooks/        # Custom React hooks
├── lib/          # External library configurations (Supabase, etc.)
├── pages/        # Application routes (Index, NotFound)
└── App.tsx       # Root component and routing setup
```

---

## 🤖 AI Integration Note

This project leverages **Puter AI** for on-device/low-latency AI processing. Ensure that the `puter.js` script is correctly loaded (typically via CDN in `index.html`) to enable features like resume refinement and ATS analysis.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by the ScanHire AI Team
</p>
