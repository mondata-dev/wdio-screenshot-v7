export default function hideElement(elem, flag = true) {
    if (flag) return elem.style.setProperty('opacity', '0.0', 'important');
    else return elem.style.setProperty('opacity', '1.0');
}
