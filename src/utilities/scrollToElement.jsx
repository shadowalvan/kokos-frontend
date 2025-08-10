// src/utils/scrollToElement.js
export function scrollToElement(refOrId, behavior = 'auto') {
  const element = typeof refOrId === 'string' ? document.getElementById(refOrId) : refOrId?.current;
  if (element) {
    const navbarHeight = document.querySelector('.navBar')?.offsetHeight || 80;
    const custOffset = 0;
    const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight + custOffset;
    window.scrollTo({ top, behavior });
  } else {
    console.warn(`Element not found: ${refOrId}`);
  }
}