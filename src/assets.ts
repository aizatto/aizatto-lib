import { readFile } from "fs-extra";
import fetch from "node-fetch";

/**
 * All of this is really bad code
 */
interface Results {
  links: string;
  scripts: string;
}

interface Assets {
  links: string[];
  scripts: string[];
}

async function fetchHTMLFromDevServer(
  devServer: string
): Promise<string | null> {
  const response = await fetch(devServer);
  if (!response.ok) {
    return null;
  }

  return response.text();
}

export function scrapeHTML(html: string): Assets {
  const scripts = html.match(/<script.*<\/script>/g);
  return {
    scripts,
    links: [],
  };
}

/**
 * We don't use an `if` condition so tha we can test this function in isolation
 */
export function scrapeProduction(html: string): Assets {
  const scripts = html.match(/<script.*<\/script>/g);
  const links = html.match(/<link\s+href="[^"]*"\s+rel="stylesheet">/g);

  return {
    scripts,
    links,
  };
}

export async function fetchAssets(
  devServer: string,
  buildFile: string
): Promise<Results> {
  if (process.env.NODE_ENV === "production") {
    const buffer = await readFile(buildFile);
    const html = buffer.toString();
    const assets = scrapeProduction(html);
    return {
      scripts: assets.scripts.join(""),
      links: assets.links.join(""),
    };
  } else {
    const html = await fetchHTMLFromDevServer(devServer);
    const assets = scrapeHTML(html);
    return {
      scripts: assets.scripts.join(""),
      links: assets.links.join(""),
    };
  }
}
