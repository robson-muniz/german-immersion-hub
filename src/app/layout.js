import './globals.css';

export const metadata = {
  title: 'LumaLingua German | AI-powered fluency platform',
  description: 'Build German fluency with AI tutoring, immersive content, smart roadmaps, analytics, vocabulary review, and premium practice.',
};

export default function RootLayout({ children }) {
  return <html lang="en" className="h-full antialiased"><body className="min-h-full">{children}</body></html>;
}
