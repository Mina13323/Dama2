import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — DAMA Development",
  robots: { index: false, follow: true },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const redirectScript = `
  var lang = (navigator.language || navigator.userLanguage || "").toLowerCase();
  var prefix = ${JSON.stringify(basePath)};
  window.location.replace(prefix + (lang.indexOf("ar") === 0 ? "/ar/careers/" : "/en/careers/"));
`;

export default function CareersRedirectPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${basePath}/en/careers/`} />
      </noscript>
      <p>
        Redirecting to <a href={`${basePath}/en/careers/`}>Careers</a>...
      </p>
    </>
  );
}
