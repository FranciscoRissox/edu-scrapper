import * as Cheerio from "cheerio";

export function extractTextWithLinks(htmlString: string) {
    const $ = Cheerio.load(htmlString);
  
    function processNode(node) {
      let result = '';
  
      node.contents().each((_, el) => {
        if (el.type === 'text') {
          result += $(el).text();
        } else if (el.name === 'a') {
          const text = $(el).text().trim();
          const href = $(el).attr('href');
          result += `${text} [${href}]`;
        } else {
          result += processNode($(el));
          if (['p', 'li', 'ul', 'strong'].includes(el.name)) {
            result += '\n';
          }
        }
      });
  
      return result;
    }
  
    const cleanedText = processNode($.root())
      .replace(/\n{2,}/g, '\n') // Avoid duplicate newlines
      .replace(/[ \t]+\n/g, '\n') // Clean trailing spaces
      .trim();
  
    return cleanedText;
  }