import { rgbToHex, getContrastRatio, getColorProperty } from '../helpers/color_helper.js'
import { getUniqueId } from '../helpers/helper.js'

const getRatio = (el) => {
  const obj = {
    headerColor: '#2c2c2c',
    bodyColor: '#efefef',
    header: '',
    message1: '',
    message2: ''
  }
  try {
    let bg = getColorProperty(el, 'background-color')
    if (!bg) throw new Error('unknown background')
    if (bg.startsWith('rgb')) bg = rgbToHex(bg)
    let color = getColorProperty(el, 'color')
    if (!color) throw new Error('unknown color')
    if (color.startsWith('rgb')) color = rgbToHex(color)
    const contr = getContrastRatio(bg, color)
    if (!contr || (typeof contr !== 'number')) throw new Error('')
    obj.message1 = 'contrast ratio: ' + contr
    obj.message2 = '(' + color + ' on ' + bg + ')'
    if (contr >= 7) {
      obj.headerColor = '#12432f'
      obj.header = 'OK - AAA level'
      obj.bodyColor = '#ddf6ec'
      return obj
    }
    if (contr >= 4.5) {
      obj.headerColor = '#e56717'
      obj.header = 'OK - AA level only'
      obj.bodyColor = '#f5deb3'
      return obj
    }
    obj.headerColor = '#b70023'
    obj.header = 'LOW CONTRAST'
    obj.bodyColor = '#ffe9ef'
    return obj
  }
  catch (err) {
    obj.message1 = err.message || 'unknown error'
    obj.header = 'error'
    return obj
  }
}
export const contrastDirective = {
  bind (el) {
    setTimeout(() => {
      const obj = getRatio(el)
      console.log(obj)
      const wrap = document.createElement('div')
      const header = document.createElement('div')
      const field = document.createElement('div')
      const wrapStyles = [
        'border-radius: 3px',
        'border: 1px solid #dadada',
        'box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'display: flex',
        'flex-direction: column',
        'font-family: inherit',
        'left: 0',
        'overflow: hidden',
        'position: absolute',
        'top: calc(100% + 2px)',
        'z-index: 9'
      ]
      const headerStyles = [
        'background: ' + obj.headerColor,
        'color: #ffffff',
        'font-size: 12px',
        'font-weight: 600',
        'line-height: 1',
        'padding: 4px',
        'text-transform: uppercase'
      ]
      const fieldStyles = [
        'background: ' + obj.bodyColor,
        'color: #161616',
        'display: flex',
        'flex-direction: column',
        'font-size: 12px',
        'font-weight: 400',
        'line-height: 1.2',
        'padding: 4px'
      ]
      const id = getUniqueId()
      wrap.setAttribute('id', id)
      el._tvlContrastId = id
      wrap.style.cssText = wrapStyles.join('; ')
      header.style.cssText = headerStyles.join('; ')
      field.style.cssText = fieldStyles.join('; ')
      const span1 = document.createElement('span')
      const span1Text = document.createTextNode(obj.message1)
      span1.appendChild(span1Text)
      field.appendChild(span1)
      if (obj.message2) {
        span1.style.marginBottom = '4px'
        const span2 = document.createElement('span')
        const span2Text = document.createTextNode(obj.message2)
        span2.appendChild(span2Text)
        field.appendChild(span2)
      }
      const headerText = document.createTextNode(obj.header)
      header.appendChild(headerText)
      wrap.appendChild(header)
      wrap.appendChild(field)
      const pos = window.getComputedStyle(el).getPropertyValue('position')
      if (!pos || pos === 'static') el.style.position = 'relative'
      el.appendChild(wrap)
    }, 700)
  },
  unbind (el) {
    if (!('_tvlContrastId' in el)) return
    const id = el._tvlContrastId
    const child = document.getElementById(id)
    if (!child) return
    document.body.removeChild(child)
  }


}