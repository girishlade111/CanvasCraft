# 🎨 CanvasCraft - Visual Website Builder

CanvasCraft is a powerful, no-code website builder developed with **Next.js** and **Firebase Studio**. It provides an intuitive, visually-driven experience for designing and launching modern websites. With a drag-and-drop editor, real-time style customization, and AI-powered template generation, CanvasCraft empowers you to bring your ideas to life without writing any code.

This project was bootstrapped and is being actively developed with [Firebase Studio](https://firebase.google.com/studio).

## ✨ Key Features

- **Visual Drag & Drop Editor**: Intuitively build your website by dragging components from the library and dropping them onto the canvas.
- **Rich Component Library**: A versatile set of pre-built components including:
  - Text, Buttons, Images
  - Navbar and Footer sections
  - User input Forms
  - Image Carousels
  - Raw HTML for custom code embedding
- **Real-time Style Panel**: A context-aware panel that allows you to customize every aspect of your selected component—from spacing and typography to background colors.
- **AI-Powered Template Generation**: Kickstart your project by describing the website you envision. Our Genkit-powered AI will generate a foundational template for you.
- **Firebase Integration**:
  - **Authentication**: Secure user sign-up and login functionality using Firebase Authentication (Email/Password).
  - **Firestore (Coming Soon)**: Foundation in place to save user projects and data to a Firestore database.
- **Responsive Design Previews**: (Coming Soon) Tools to preview how your site looks on desktop, tablet, and mobile devices.
- **Code Export**: (Coming Soon) Generate and download the clean, production-ready HTML and CSS for your projects.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI/Generative**: [Genkit (Google's Generative AI Toolkit)](https://firebase.google.com/docs/genkit)
- **Backend & Auth**: [Firebase](https://firebase.google.com/) (Authentication & Firestore)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Geist](https://vercel.com/font)

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en) (v20 or later recommended)
- [npm](https://www.npmjs.com/) (or your preferred package manager)

### Installation & Running Locally

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-repo/canvascraft.git
    cd canvascraft
    ```

2.  **Install dependencies**:
    All dependencies listed in `package.json` will be automatically installed. If you need to do it manually:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env` file in the root of the project. The Firebase configuration is handled by Firebase App Hosting integrations, but you may need to add other keys for local development.

4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    This will start the Next.js development server, typically on `http://localhost:9002`.

## 📂 Project Structure

```
.
├── src
│   ├── app                 # Next.js App Router pages
│   │   ├── editor          # The main website builder UI
│   │   └── page.tsx        # The public landing page
│   ├── ai                  # Genkit flows for AI features
│   │   ├── flows           # AI flow definitions
│   │   └── genkit.ts       # Genkit initialization
│   ├── components          # Shared React components
│   │   ├── editor          # Components specific to the editor interface
│   │   └── ui              # Reusable ShadCN UI components
│   ├── contexts            # React context providers (e.g., EditorContext)
│   ├── firebase            # Firebase configuration, providers, and hooks
│   │   ├── firestore       # Firestore-specific hooks (useCollection, useDoc)
│   │   └── ...
│   ├── hooks               # Custom React hooks (e.g., useToast, useIsMobile)
│   └── lib                 # Utility functions, type definitions, and constants
├── docs
│   └── backend.json        # Schema definition for Firebase entities and Firestore structure
├── public                  # Static assets
└── ...                     # Config files (tailwind, next, etc.) 
```

## 📜 Available Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack.
- `npm run build`: Creates a production build of the application.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
- `npm run genkit:dev`: Starts the Genkit development server for testing AI flows.

## 🔥 Firebase Integration

This project is configured to use Firebase for backend services.

- **Authentication**: `firebase/auth` is used for user management. The UI for this is in `src/components/editor/auth-dialog.tsx`.
- **Firestore**: The project is set up to use Firestore for data storage. Hooks like `useCollection` and `useDoc` are available for real-time data fetching.
- **Error Handling**: A custom error handling system (`src/firebase/errors.ts`, `src/firebase/error-emitter.ts`) is in place to provide detailed, contextual errors for easier debugging of Firestore Security Rules.
- **Configuration**: The Firebase configuration is managed automatically by Firebase App Hosting. For local development, the configuration is stored in `src/firebase/config.ts`.

## 部署 (Deployment)

This application is optimized for deployment on **Firebase App Hosting**. Simply connect your repository to a Firebase project to enable continuous deployment. The `apphosting.yaml` file contains basic configuration for the App Hosting backend.
