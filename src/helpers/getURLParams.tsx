export default function getURLParams(data: any): string {
  return Object.keys(data).map((key, i, arr) => {
    // const questionMark = i ? '' : '?';
    const joinMark = i < arr.length - 1 ? '&' : '';
    return `${key}='${data[key]}'${joinMark}`;
  }).join("");
};