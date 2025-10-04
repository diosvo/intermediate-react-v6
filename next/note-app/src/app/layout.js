import 'doodle.css/doodle.css';
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Note Passer',
  description: 'RSCs with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="doodle">
        <nav>
          <h1>
            <Link href="/">Note Passer</Link>
          </h1>
        </nav>
        {children}
      </body>
    </html>
  );
}
