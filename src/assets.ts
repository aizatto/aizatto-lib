import { readFile } from "fs-extra";
import fetch from "node-fetch";

interface Assets {
  links: string,
  scripts: string,
}

async function fetchHTMLFromDevServer(devServer: string): Promise<string | null> {
  const response = await fetch(devServer);
  if (!response.ok) {
    return null;
  }

  return response.text();
}

function scrapeHTML(html: string): Assets {
  const scriptsArray = html.match(/<script.*<\/script>/g);
  const scripts = scriptsArray.join('');
  if (process.env.NODE_ENV !== "production") {
    return {
      scripts: scripts,
      links: '',
    }
  }

  const links = html.match(/<link\s+href="[^"]*"\s+rel="stylesheet">/g);
  return {
    scripts: scripts,
    links: links[0],
  };
}

export async function fetchAssets(
  devServer: string,
  buildFile: string,
): Promise<Assets> {
  let html = "";
  if (process.env.NODE_ENV === "production") {
    const buffer = await readFile(buildFile);
    html = buffer.toString();
  } else {
    html = await fetchHTMLFromDevServer(devServer);
  }

  const results = scrapeHTML(html);
  return results;
}
