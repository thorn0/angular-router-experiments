export function dbg(message: string, color = 'blue', bold = true) {
  console.log(
    '%c' + message,
    `color: ${color}; ${bold ? 'font-weight:bold' : ''}`
  );
}
