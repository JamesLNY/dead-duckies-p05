export default function renderWrappedText(ctx, text, xStart, yStart, width, lineHeight) {
  let words = text.split(" ");
  let currentLine = "";
  let lines = [];
  words.forEach(word => {
    if (ctx.measureText((currentLine + " " + word).trim()).width > width) {
      lines.push(currentLine);
      currentLine = word;
    }
    else {
      currentLine += " " + word;
    }
  });
  lines.push(currentLine);
  lines[0] = lines[0].trim()

  lines.forEach((line, i) => {
    ctx.fillText(line, xStart, yStart + i * lineHeight)
  });
}