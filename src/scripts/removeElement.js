export default function removeElement(elem, flag = true) {
    if (flag) return elem.style.setProperty('display', 'none', 'important');
    else return elem.style.setProperty('display', '');
}
