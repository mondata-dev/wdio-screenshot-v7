export default function getBoundingRect(elem) {
  const boundingRect = elem.getBoundingClientRect();
  return {
    top: boundingRect.top,
    right: boundingRect.right,
    bottom: boundingRect.bottom,
    left: boundingRect.left,
  };
}
