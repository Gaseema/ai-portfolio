# 🤖 AI-Powered Developer Portfolio

An interactive, AI-powered portfolio built with Next.js, React, and Tailwind CSS. Instead of traditional static content, visitors can chat with an AI assistant to learn about your experience, projects, and skills in real-time.

## ✨ Features

- **Interactive AI Chat**: Chat with an AI assistant powered by Groq API
- **Modern UI/UX**: Beautiful animations with Framer Motion
- **Mobile Responsive**: Optimized for all device sizes
- **Project Showcase**: Interactive project gallery with modals
- **Contact Integration**: Professional contact card component
- **Real-time Animations**: Smooth, performant animations throughout

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Gaseema/ai-portfolio.git
cd ai-portfolio
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add your Groq API key to `.env.local`:

```env
GROQ_API_KEY=your_groq_api_key_here
```

**Get your free Groq API key:**

1. Visit [Groq Console](https://console.groq.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste it into your `.env.local` file

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio in action!

## 🎨 Customization Guide

### Personal Information

#### 1. Update AI Assistant Personality (`lib/groq.ts`)

Edit the `SYSTEM_PROMPT` to reflect your background:

```typescript
export const SYSTEM_PROMPT = {
  role: "system",
  content: `
# Character: [Your Name]

You're [Your Name] — a [your title] with [X]+ years of experience in [your expertise].

## Key Value Props to Highlight
- [X]+ years [your tech stack] experience
- [Your achievements]
- [Your specializations]
- [Specific metrics/results]
  `,
};
```

#### 2. Landing Page Content (`app/page.tsx`)

Update the greeting and suggested questions:

```typescript
// Line ~330 - Update the greeting
<motion.h1>
  {getCurrentTimeGreeting()}, I'm [Your Name]
</motion.h1>

<motion.p>
  and I can tell you anything about [your expertise]
</motion.p>

// Line ~387 - Update suggested questions
const suggestedQuestions = [
  {
    text: "Tell me about your [specific] experience",
    icon: "👨‍💼",
    short: false,
  },
  // Add your own questions...
];
```

#### 3. Contact Information

**ContactCard Component (`components/ContactCard.tsx`):**

```typescript
// Update contact methods around line 30
const contactMethods = [
  {
    icon: "📧",
    label: "Email",
    value: "your.email@example.com",
    href: "mailto:your.email@example.com",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "your-github",
    href: "https://github.com/your-github",
  },
  // Add more contact methods...
];
```

**Page Contact Links (`app/page.tsx`):**

```typescript
// Search for "mailto:" and update email addresses
href = "mailto:your.email@example.com?subject=Contact - AI Portfolio";
```

#### 4. GitHub Repository Info (`app/page.tsx`)

Update the GitHub repository reference around line 231:

```typescript
const { stars, loading } = useGitHubStars("YourGitHubUsername", "your-repo-name");

// And the link around line 295
<motion.a
  href="https://github.com/YourGitHubUsername/your-repo-name"
  // ...
```

### Projects & Portfolio Content

#### 1. Project Data (`components/ProjectShowcase.tsx`)

Add your projects to the projects array:

```typescript
const projects = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Brief project description",
    longDescription: "Detailed project description...",
    image: "/path-to-your-image.jpg",
    technologies: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://your-project.com",
    githubUrl: "https://github.com/you/project",
    featured: true,
  },
  // Add more projects...
];
```

#### 2. Add Project Images

Place your project images in the `public/` directory and reference them in your project data.

### Styling & Branding

#### 1. Color Scheme

The portfolio uses a blue color scheme. To change colors, search and replace in relevant files:

- `from-blue-500 to-blue-600` (gradients)
- `text-blue-600` (text colors)
- `border-blue-300` (borders)

#### 2. Fonts

Update Google Fonts in `app/page.tsx` around line 165:

```typescript
<link
  href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.4.5, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **AI**: Groq API for chat functionality
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
ai-portfolio/
├── app/
│   ├── page.tsx              # Main landing page
│   ├── layout.tsx            # Root layout
│   └── api/
│       └── ask/
│           └── route.ts      # AI chat API endpoint
├── components/
│   ├── AIAssistant.tsx       # Main chat interface
│   ├── ProjectShowcase.tsx   # Projects gallery
│   ├── ContactCard.tsx       # Contact information
│   └── ...
├── lib/
│   ├── groq.ts              # AI configuration & prompts
│   └── bio.ts               # Additional bio data
├── public/                   # Static assets
└── styles/                   # Global styles
```

## 🚀 Deployment

### Option 1: Deploy to Vercel (Recommended for beginners)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add your `GROQ_API_KEY` in Environment Variables
5. Deploy!

### Option 2: Deploy to AWS Lightsail (Self-hosted)

For automatic deployment to your Lightsail server when pushing to main:

#### 1. Server Setup

Run this on your Lightsail instance:

```bash
# Download and run the setup script
wget https://raw.githubusercontent.com/Gaseema/ai-portfolio/main/deployment/setup-server.sh
chmod +x setup-server.sh
./setup-server.sh
```

#### 2. Clone and Initial Setup

```bash
# Clone your repository
cd /opt/bitnami/apache/htdocs/
git clone https://github.com/Gaseema/ai-portfolio.git
cd ai-portfolio

# Install dependencies and build
npm install
npm run build

# Start with PM2
pm2 start npm --name "ai-portfolio" -- start
pm2 save
```

#### 3. Configure GitHub Secrets

In your GitHub repository settings, add these secrets:

- `LIGHTSAIL_HOST`: Your Lightsail public IP
- `LIGHTSAIL_USERNAME`: `bitnami` (or your SSH username)
- `LIGHTSAIL_SSH_KEY`: Your private SSH key content
- `LIGHTSAIL_PORT`: `22` (or your SSH port)

#### 4. Deploy with One Command

```bash
# Use the deployment script
./deploy.sh "Your commit message"
```

This will automatically:

- Commit your changes
- Push to main branch
- Trigger GitHub Actions deployment
- Update your Lightsail server

### Environment Variables for Production

Create `.env.production` on your server:

```env
GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
PORT=3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Need Help?

- Check the [Issues](https://github.com/Gaseema/ai-portfolio/issues) for common problems
- Create a new issue if you find a bug
- Join the discussion in [Discussions](https://github.com/Gaseema/ai-portfolio/discussions)

---

Built with ❤️ by [Gaseema](https://github.com/Gaseema)
