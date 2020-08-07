export const wrap = (root, el) => {
  let wrapper = document.getElementById('tvlModalWrapper')
  if(!wrapper) {
    if (!root) throw new Error('root element has not been found')
    wrapper = document.createElement('div')
    wrapper.setAttribute('id', 'tvlModalWrapper')
    wrapper.style.position = 'absolute'
    wrapper.style.zIndex = 98
    root.$el.appendChild(wrapper)
  }
  if (!el) throw new Error('element to be wrapped was not found')
  wrapper.appendChild(el)
}
export const unwrap = (el) => {
  const wrapper = document.getElementById('tvlModalWrapper')
  if (!wrapper) throw new Error('wrapper was not found')
  if (!el || !wrapper.contains(el)) throw new Error('document to be unwrapped was not found')
  wrapper.removeChild(el)
}
