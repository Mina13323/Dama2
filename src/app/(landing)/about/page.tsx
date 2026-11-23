import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — DAMA Development",
  robots: { index: false, follow: true },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const redirectScript = `
  var lang = (navigator.language || navigator.userLanguage || "").toLowerCase();
  var prefix = ${JSON.stringify(basePath)};
  window.location.replace(prefix + (lang.indexOf("ar") === 0 ? "/ar/about/" : "/en/about/"));
`;

export default function AboutRedirectPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${basePath}/en/about/`} />
      </noscript>
      <p>
        Redirecting to <a href={`${basePath}/en/about/`}>About DAMA</a>...
      </p>
    </>
  );
}
