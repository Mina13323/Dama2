import type { Metadata } from "next";

export const metadata: Metadata = { title: "DAMA Developments" };

const redirectScript = `
  var lang = (navigator.language || navigator.userLanguage || "").toLowerCase();
  window.location.replace(lang.indexOf("ar") === 0 ? "./ar/" : "./en/");
`;

export default function LandingPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <meta httpEquiv="refresh" content="0; url=./en/" />
      </noscript>
      <p>
        Redirecting to <a href="./en/">DAMA Developments</a>...
      </p>
    </>
  );
}
