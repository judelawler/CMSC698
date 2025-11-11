import "./globals.css";
import  "bootstrap/dist/css/bootstrap.min.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>

        {children}

      </body>
    </html>
  );
}