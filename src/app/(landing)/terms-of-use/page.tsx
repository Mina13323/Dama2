import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — DAMA Development",
  robots: { index: false, follow: true },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const redirectScript = `
  var lang = (navigator.language || navigator.userLanguage || "").toLowerCase();
  var prefix = ${JSON.stringify(basePath)};
  window.location.replace(prefix + (lang.indexOf("ar") === 0 ? "/ar/terms-of-use/" : "/en/terms-of-use/"));
`;

export default function TermsOfUseRedirectPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${basePath}/en/terms-of-use/`} />
      </noscript>
      <p>
        Redirecting to <a href={`${basePath}/en/terms-of-use/`}>Terms of Use</a>...
      </p>
    </>
  );
}
