import { writeFileSync } from "node:fs";
import { ar } from "../src/content/ar";
import { en } from "../src/content/en";
import { careers } from "../src/content/careers";
import { news } from "../src/content/news";
import { pageCopy } from "../src/content/pages";
import { projects } from "../src/content/projects";
import * as rawasin from "../src/content/projects/rawasin/mall";
import * as site from "../src/content/site";

writeFileSync(
  "output/content-reference-data.json",
  JSON.stringify({ en, ar, projects, rawasin, pageCopy, careers, news, site }, null, 2),
  "utf8",
);
