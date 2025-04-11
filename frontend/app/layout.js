import "./globals.css";

export const metadata = {
  title: "Chiti",
  description: "Financial peer to peer sharing application.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen">
        	{ children }
        </div>
      </body>
    </html>
  );
}