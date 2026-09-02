import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  metadataBase: new URL('https://umajalogistics.online'),
  title: 'Umaja Logistics | Precision Freight & Expedited Trucking',
  description:
    'Commercial 26ft dock-high straight box transport with heavy-duty Maxon liftgate. Expedited operations all over USA, with dedicated daily JFK Airport corridors. MC# 1508261.',
  openGraph: {
    title: 'Umaja Logistics LLC',
    description: 'Driven By Honor. Delivered With Pride.',
    url: 'https://umajalogistics.online',
    siteName: 'Umaja Logistics',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/models/truck.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
