import { parse } from "node-html-parser";

async function getHolidays(day?: string) {
  const kalbiResponse = await fetch(`https://www.kalbi.pl/${day || ""}`);
  const html = await kalbiResponse.text();
  const parsedHtml = parse(html);

  const holidayElements = parsedHtml.querySelectorAll(
    "section.calCard-ententa a"
  );
  const result = holidayElements.map((el) => {
    return {
      name: el.innerText.trim(),
      url: el.attributes.href,
    };
  });
  return result;
}

export default getHolidays;
