import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Developments — DAMA Development",
  robots: { index: false, follow: true },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const redirectScript = `
  var lang = (navigator.language || navigator.userLanguage || "").toLowerCase();
  var prefix = ${JSON.stringify(basePath)};
  window.location.replace(prefix + (lang.indexOf("ar") === 0 ? "/ar/projects/" : "/en/projects/"));
`;

export default function ProjectsRedirectPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${basePath}/en/projects/`} />
      </noscript>
      <p>
        Redirecting to <a href={`${basePath}/en/projects/`}>Our Developments</a>...
      </p>
    </>
  );
}
