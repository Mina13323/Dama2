import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Media — DAMA Development",
  robots: { index: false, follow: true },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const redirectScript = `
  var lang = (navigator.language || navigator.userLanguage || "").toLowerCase();
  var prefix = ${JSON.stringify(basePath)};
  window.location.replace(prefix + (lang.indexOf("ar") === 0 ? "/ar/news/" : "/en/news/"));
`;

export default function NewsRedirectPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${basePath}/en/news/`} />
      </noscript>
      <p>
        Redirecting to <a href={`${basePath}/en/news/`}>News &amp; Media</a>...
      </p>
    </>
  );
}
