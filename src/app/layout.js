import './globals.css';

export const metadata = {
  title: 'LumaLingua German | Visual language learning worlds',
  description: 'Explore German through interactive illustrated scenes, contextual audio, and premium immersion-based practice.',
};

export default function RootLayout({ children }) {
  return <html lang="en" className="h-full antialiased"><body className="min-h-full">{children}</body></html>;
}
