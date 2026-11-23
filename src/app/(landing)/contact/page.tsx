import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — DAMA Development",
  robots: { index: false, follow: true },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const redirectScript = `
  var lang = (navigator.language || navigator.userLanguage || "").toLowerCase();
  var prefix = ${JSON.stringify(basePath)};
  window.location.replace(prefix + (lang.indexOf("ar") === 0 ? "/ar/contact/" : "/en/contact/"));
`;

export default function ContactRedirectPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${basePath}/en/contact/`} />
      </noscript>
      <p>
        Redirecting to <a href={`${basePath}/en/contact/`}>Contact Us</a>...
      </p>
    </>
  );
}
