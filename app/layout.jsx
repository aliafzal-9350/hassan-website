import './globals.css';

export const metadata = {
  title: 'Ajamu Umaja Logistics | Precision Freight & Expedited Trucking',
  description: 'Nationwide reliable freight, dry van, expedited logistics, and dedicated fleet solutions. MC# 1508261.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
