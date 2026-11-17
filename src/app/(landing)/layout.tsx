import type { ReactNode } from "react";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          margin: 0,
          backgroundColor: "#fbfbfa",
          color: "#14171a",
        }}
      >
        {children}
      </body>
    </html>
  );
}
