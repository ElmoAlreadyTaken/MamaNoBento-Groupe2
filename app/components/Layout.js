import { useState, useEffect } from 'react';
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'

export default function Layout({ children }) {
  const [theme, setTheme] = useState('light');  // 'dark'

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);

  }, [theme]);

  return (
    <div>
      <Header theme={theme} setTheme={setTheme} />
      <main className="py-10 min-h-screen max-w-full md:max-w-2xl md:mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
