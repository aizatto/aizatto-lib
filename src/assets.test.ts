import { readFile } from "fs-extra";
import { scrapeHTML, scrapeProduction } from "./assets";

describe("should parse", () => {
  it("readFile", async () => {
    const html = await readFile(__dirname + "/assets.stub.html");
    const { links, scripts } = scrapeProduction(html.toString());
    expect(links).toHaveLength(2);
    expect(scripts).toHaveLength(3);
  });
});
