export function getCustomProperty(elem, prop) {
  //get the element and its property return the computed style of the element.  CSS varables  and the value of the prop which is a string so converting to a float .  In no value default it to 0
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

export function setCustomProperty(elem, prop, value) {
  // need the element , property and value we want to set
  // call setProperty methond and pass prop and value
  elem.style.setProperty(prop, value);
}

export function incrementCustomProperty(elem, prop, inc) {
  // will call this the most
  // combines the set and get  and increments it
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc);
}
