import "./globals.css";

export const metadata = {
  title: "Chiti",
  description: "Financial peer to peer sharing application.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-gradient-to-t from-[var(--bg-bottom)] via-[var(--bg-mid)] to-[var(--bg-top)] bg-fixed">
        {children}
      </body>
    </html>
  );
}