import './globals.css';

export const metadata = {
  metadataBase: new URL('https://umajalogistics.online'),
  title: 'Ajamu Umaja Logistics | Precision Freight & Expedited Trucking',
  description: 'Commercial 26ft dock-high straight box transport with heavy-duty Maxon liftgate. Expedited operations all over USA, with dedicated daily JFK Airport corridors. MC# 1508261.',
  openGraph: {
    title: 'Ajamu Umaja Logistics LLC',
    description: 'Precision Expedited Freight • Driven By Honor. Delivered With Pride.',
    url: 'https://umajalogistics.online',
    siteName: 'Umaja Logistics',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
