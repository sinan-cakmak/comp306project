import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fitness World",
  description: "Generated by Hikmet Sinan CAKMAK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={inter.className}
          style={{ backgroundColor: "#000000" }}
        >
          <div
            style={{
              margin: "20px",
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 20px",
                backgroundColor: "#f8f9fa",
                borderBottom: "1px solid #e0e0e0",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <Link href="/clubs" legacyBehavior>
                  <a
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#00539C",
                      color: "white",
                      borderRadius: "5px",
                      textDecoration: "none",
                    }}
                  >
                    Clubs
                  </a>
                </Link>
                <Link href="/my-bookings" legacyBehavior>
                  <a
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#00539C",
                      color: "white",
                      borderRadius: "5px",
                      textDecoration: "none",
                    }}
                  >
                    My Bookings
                  </a>
                </Link>
                <Link href="/popular-events" legacyBehavior>
                  <a
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#00539C",
                      color: "white",
                      borderRadius: "5px",
                      textDecoration: "none",
                    }}
                  >
                    Popular Events
                  </a>
                </Link>
                <Link href="/users" legacyBehavior>
                  <a
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#00539C",
                      color: "white",
                      borderRadius: "5px",
                      textDecoration: "none",
                    }}
                  >
                    Users
                  </a>
                </Link>
              </div>
              <SignedIn>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <UserButton showName />
                </div>
              </SignedIn>
            </header>
            <main>{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
