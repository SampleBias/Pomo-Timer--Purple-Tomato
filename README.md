# Zenith Timer: A Minimalist Pomodoro Companion

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/SampleBias/Pomo-Timer--Purple-Tomato)

Zenith Timer is a sophisticated, single-page web application designed to implement the Pomodoro Technique with visual excellence. It features a clean, minimalist interface centered around a large, animated circular progress indicator that provides clear visual feedback. Users can start, pause, and reset work sessions (25 minutes), short breaks (5 minutes), and long breaks (15 minutes). The application tracks completed work sessions and automatically transitions between modes, providing optional browser notifications and subtle audio cues to signal phase changes. The entire experience is crafted to be calming, intuitive, and distraction-free, helping users achieve a state of deep focus and enhanced productivity.

## ✨ Key Features

- **Pomodoro Technique Logic:** Implements the standard 25-minute work, 5-minute short break, and 15-minute long break cycle.
- **Minimalist UI:** A clean, distraction-free interface designed to keep you focused.
- **Animated Progress Indicator:** A large circular progress bar provides clear, at-a-glance feedback on your session.
- **Full Timer Controls:** Simple and intuitive controls to Start, Pause, and Reset the timer.
- **Automatic Transitions:** The timer automatically switches between work and break sessions.
- **Session Tracking:** Visually tracks your progress through a 4-session Pomodoro cycle.
- **Browser Notifications:** Get notified when a session ends, even if the app is in the background.
- **Audio Cues:** Subtle sound alerts to signal session transitions.
- **Responsive Design:** A fully responsive, mobile-first layout that looks great on any device.

## 🚀 Technology Stack

- **Framework:** [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Deployment:** [Cloudflare Workers](https://workers.cloudflare.com/)

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your system.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/zenith_timer.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd zenith_timer
    ```
3.  **Install dependencies:**
    ```bash
    bun install
    ```

## 💻 Development

To start the local development server, run the following command:

```bash
bun run dev
```

The application will be available at `http://localhost:3000`. The server will automatically reload when you make changes to the code.

### Available Scripts

-   `bun run dev`: Starts the development server.
-   `bun run build`: Builds the application for production.
-   `bun run lint`: Lints the codebase using ESLint.
-   `bun run deploy`: Deploys the application to Cloudflare Workers.

## ☁️ Deployment

This project is configured for seamless deployment to Cloudflare Pages.

1.  **Log in to Cloudflare:**
    If you haven't already, log in to your Cloudflare account using the Wrangler CLI.
    ```bash
    bunx wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script. This will build the project and deploy it to your Cloudflare account.
    ```bash
    bun run deploy
    ```

Alternatively, you can deploy directly from your GitHub repository with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/SampleBias/Pomo-Timer--Purple-Tomato)

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.