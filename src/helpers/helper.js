export const getUniqueId = () => {
  const a = Date.now()
  return '_' + (Number(String(Math.random()).slice(2)) + a + Date.now()).toString(36)
}

export const absolutePosition = (element, target, topOffset = 0, leftOffset = 0) => {
  const elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : getHiddenElementDimensions(element)
  const elementOuterHeight = elementDimensions.height
  const elementOuterWidth = elementDimensions.width
  const targetOuterHeight = target.offsetHeight
  const targetOuterWidth = target.offsetWidth
  const targetOffset = target.getBoundingClientRect()
  const windowScrollTop = getWindowScrollTop()
  const windowScrollLeft = getWindowScrollLeft()
  const viewport = getViewport()
  let top
  let left
  let heightRatio = 1
  let widthRatio = 1
  if (elementOuterHeight > viewport.height) {
    heightRatio = viewport.height / elementOuterHeight
    top = 0
  } else if ((elementOuterHeight + topOffset) > viewport.height) top = Math.round((viewport.height - elementOuterHeight) / 2)
  else if ((targetOffset.bottom + elementOuterHeight + topOffset) <= viewport.height) top = targetOffset.bottom + topOffset
  else if (targetOffset.top > (elementOuterHeight + topOffset)) top = targetOffset.top - elementOuterHeight - topOffset
  else top = (targetOffset.top + (targetOuterHeight / 2)) - (elementOuterHeight / 2)
  if (elementOuterWidth > viewport.width) {
    widthRatio = viewport.width / elementOuterWidth
    left = 0
  } else if ((elementOuterWidth + leftOffset) > viewport.width) left = Math.round((viewport.width - elementOuterWidth) / 2)
  else if ((targetOffset.right + elementOuterWidth + leftOffset) <= viewport.width) left = targetOffset.right + leftOffset
  else if (targetOffset.left > (elementOuterWidth + leftOffset)) left = targetOffset.left - elementOuterWidth - leftOffset
  else left = (targetOffset.left + (targetOuterWidth / 2)) - (elementOuterWidth / 2)
  if (heightRatio !== 1 || widthRatio !== 1) {
    const ratio = Math.min(heightRatio, widthRatio)
    element.style.transform = 'scale(' + ratio + ')'
    element.style.transformOrigin = 'top left'
  }
  top += windowScrollTop
  left += windowScrollLeft
  element.style.top = top + 'px'
  element.style.left = left + 'px'
  element.style.display = 'block'
}

export const generateZindex = () => {
  const body = document.querySelector('body')
  if (Object.prototype.hasOwnProperty.call(body, 'highestZindex')) {
    body.highestZindex += 1
    return body.highestZindex
  }
  Object.defineProperty(body, 'highestZindex', { value: 99, writable: true })
  return 99
}