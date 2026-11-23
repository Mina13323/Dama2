import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — DAMA Development",
  robots: { index: false, follow: true },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const redirectScript = `
  var lang = (navigator.language || navigator.userLanguage || "").toLowerCase();
  var prefix = ${JSON.stringify(basePath)};
  window.location.replace(prefix + (lang.indexOf("ar") === 0 ? "/ar/privacy-policy/" : "/en/privacy-policy/"));
`;

export default function PrivacyPolicyRedirectPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${basePath}/en/privacy-policy/`} />
      </noscript>
      <p>
        Redirecting to <a href={`${basePath}/en/privacy-policy/`}>Privacy Policy</a>...
      </p>
    </>
  );
}
