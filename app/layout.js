export const metadata = { title: 'Corner Shop (incident exercise)' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Arial, sans-serif', maxWidth: 720, margin: '40px auto', padding: '0 16px' }}>
        {children}
      </body>
    </html>
  );
}
