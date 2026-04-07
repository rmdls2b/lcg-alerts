import "./globals.css"
import Header from "./Header"
import StructuredData from "./StructuredData"

export const metadata = {
  title: "Wallert — Turn a wallet into a silent alarm.",
  description: "Wallert monitors a dedicated wallet and silently alerts your trusted contacts if you're forced to transfer funds under duress. Open source.",
  metadataBase: new URL("https://wallert.app"),
  openGraph: {
    title: "Wallert — Turn a wallet into a silent alarm.",
    description: "Wallert monitors a dedicated wallet and silently alerts your trusted contacts if you're forced to transfer funds under duress. Open source.",
    url: "https://wallert.app",
    siteName: "Wallert",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wallert — Turn a wallet into a silent alarm.",
    description: "Wallert monitors a dedicated wallet and silently alerts your trusted contacts if you're forced to transfer funds under duress. Open source.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-[#e0e0e0] min-h-screen grain">
        <StructuredData />
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
