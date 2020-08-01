import colors from '../assets/styles/colors.js'

export const getColor = (key) => {
  return colors[key] || null
}

export const getTextColor = (darkness = 'regular') => {
  if (darkness === 'light') return colors.grey500
  if (darkness === 'dark') return colors.grey800
  return colors.grey650
}

export const hexToRgb = (col) => {
  const color = col.charAt(0) === '#' ? col.substr(1) : col
  return color.match(/.{1,2}/g).map(item => parseInt(item, 16))
}
export const luminance = (col) => {
  const rgb = hexToRgb(col)
  const ar = rgb.map(v => {
     v /= 255
     return v <= 0.03928 ? v / 12.92 : Math.pow( (v + 0.055) / 1.055, 2.4)
  })
  return ar[0] * 0.2126 + ar[1] * 0.7152 + ar[2] * 0.0722
}
export const contrast = (col1, col2) => {
  const lum1 = luminance(col1)
  const lum2 = luminance(col2)
  const result =  lum1 > lum2 ? (lum1 + 0.05) / (lum2 + 0.05) : (lum2 + 0.05) / (lum1 + 0.05)
  return Math.round(100 * result) / 100
}
export const lighten = (color, percent) => {
  const col = color.charAt(0) === '#' ? color.substr(1) : color
  const num = parseInt(col, 16)
  const abs = Math.abs(percent)
  let amt = Math.round(2.55 * abs)
  if (percent < 0) amt = -1 * amt
  let R = (num >> 16) + amt
  if (R > 255) R = 255
  else if (R < 0) R = 0
  let B = ((num >> 8) & 0x00FF) + amt
  if (B > 255) B = 255
  else if (B < 0) B = 0
  let G = (num & 0x0000FF) + amt;
  if (G > 255) G = 255
  else if (G < 0) G = 0

  return "#" + (0x1000000 + R * 0x10000 + B * 0x100 + G).toString(16).slice(1);
}
export const darken = (color, percent) => {
  const perc = -1 * percent
  return lighten(color, perc)
}
export const isLight = (color) => {
  const rgb = hexToRgb(color)
  const hsp = Math.sqrt(
    0.299 * (rgb[0] * rgb[0]) +
    0.587 * (rgb[1] * rgb[1]) +
    0.114 * (rgb[2] * rgb[2])
  )
  return hsp > 127.5
}
export const getTextColorToBg = (bg, bolder = false, criterion = 4.5) => {
  /* 5 text colors are available:
      white,
      text-light
      text
      text-dark
      black
    for dark colors - the first color of 'text', 'light', 'white' matching the contrast criterion will be returned.
    for light colors - the first color of 'text', 'dark', 'black' matching the contrast criterion will be returned.
    if bolder is set to true, the 'text' value is not examined. The first of two remaining colors matching the criterion is returned.
    criterion - height of the minimal ciotrast ratio */
  if (!bolder) {
    const text = getTextColor()
    if (contrast(bg, text) >= criterion) return text
  }
  if (isLight(bg)) {
    const dark = getTextColor('dark')
    return contrast(bg, dark) >= criterion ? dark : getColor('black')
  }
  const light = getTextColor('light')
  return contrast(bg, light) >= criterion ? light : getColor('white')
}
