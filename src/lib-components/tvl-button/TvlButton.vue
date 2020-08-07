<template>
  <div
    class="tvl-focusable-parent"
    ref="myWrap"
  >
    <component
      :is="component"
      :button-type="buttonType"
      :disabled="disabled"
      :plain="plain"
      :href="href"
      :size="size"
      @click="onClick"
    >
      <span>{{ label }}</span>
    </component>
  </div>
</template>

<script>
import TvlButtonButton from './TvlButtonButton.vue'
import TvlButtonAnchor from './TvlButtonAnchor.vue'
import { getColor, getTextColorToBg, isLight, darken, lighten } from '@/helpers/color_helper.js'
export default {
  name: 'TvlButton',
  props: {
    color: { type: String, default: 'grey450' },
    disabled: { type: Boolean, default: false },
    href: { type: String, default: '' },
    label: { type: String, default: '' },
    outline: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    size: { type: String, default: 'medium' },
    submit: { type: Boolean, default: false }
  },
  computed: {
    buttonType () {
      return this.submit ? 'submit' : 'button'
    },
    component () {
      return this.href && !this.disabled ? 'TvlButtonAnchor' : 'TvlButtonButton'
    }
  },
  mounted () {
    this.$nextTick(this.setCssCustomProperties)
  },
  methods: {
    setCssCustomProperties () {
      const el = this.$refs.myWrap
      const hex = this.disabled ? getColor('grey250') : getColor(this.color)
      let obj = {
        bg: (this.outline || this.plain) ? 'transparent' : hex,
        border: this.plain ? 'transparent' : hex,
        color: (this.outline || this.plain) ? hex : getTextColorToBg(hex, true, 7),
        hoverBg: null,
        hoverBorder: null,
        hoverColor: null,
        focusBorder: null,
        focusBg: null,
        focusColor: null
      }
      const light = isLight(hex)
      if (this.outline) {
        obj.hoverColor = light ? getColor('grey800') : getColor('white')
        obj.hoverBg = hex
        obj.hoverBorder = hex
        obj.focusBorder = hex
        obj.focusBg = hex
        obj.focusColor = light ? getColor('grey800') : getColor('white')
      } else if (this.plain) {
        const accent = light ? darken(hex, 20) : lighten(hex, 20)
        obj.hoverBg = 'transparent'
        obj.hoverBorder = 'transparent'
        obj.hoverColor = accent
        obj.focusBg = 'transparent'
        obj.focusBorder = 'transparent'
        obj.focusColor = accent
      } else {
        const acc = light ? darken(hex, 10) : lighten(hex, 10)
        const accText = getTextColorToBg(hex, true, 7)
        obj.hoverBg = acc
        obj.hoverBorder = acc
        obj.hoverColor = accText
        obj.focusBg = acc
        obj.focusBorder = acc
        obj.focusColor = accText
      }
      el.style.setProperty('--btn-background', obj.bg)
      el.style.setProperty('--btn-border', obj.border)
      el.style.setProperty('--btn-color', obj.color)
      el.style.setProperty('--btn-background-hover', obj.hoverBg)
      el.style.setProperty('--btn-border-hover', obj.hoverBorder)
      el.style.setProperty('--btn-color-hover', obj.hoverColor)
      el.style.setProperty('--btn-background-focus', obj.focusBg)
      el.style.setProperty('--btn-border-focus', obj.focusBorder)
      el.style.setProperty('--btn-color-focus', obj.focusColor)
      if (this.rounded) {
        el.style.setProperty('--border-radius', '25px')
      }
    },
    onClick (event) {
      this.$emit('click', event)
    }
  },
  components: { TvlButtonButton, TvlButtonAnchor }
}
</script>

<style>
a.tvl-button,
a.tvl-button:visited,
button.tvl-button {
  position: relative;
  background: var(--btn-background);
  color: var(--btn-color);
  border-style: solid;
  border-width: 1px;
  border-color: var(--btn-border);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0.4rem;
  border-radius: var(--border-radius);
  padding: 0.25em 0.75em;
  min-width: 10ch;
  text-align: center;
  line-height: 1.1;
  transition: 0.3s all ease;
  font-family: var(--font-family-headers);
  font-weight: 500;
}

a.tvl-button:hover,
a.tvl-button:active,
button.tvl-button:not(.tvl-button-disabled):hover,
button.tvl-button:not(.tvl-button-disabled):active {
  background: var(--btn-background-hover);
  color: var(--btn-color-hover);
  border-color: var(--btn-border-hover);
}
a.tvl-button:focus,
button.tvl-button:not(.tvl-button-disabled):focus {
  outline: none;
  box-shadow: var(--focus-shadow);
  background: var(--btn-background-focus);
  color: var(--btn-color-focus);
  border-color: var(--btn-border-focus);
}
a.tvl-button:active,
button.tvl-button:not(.tvl-button-disabled):active {
  outline: none;
  transform: scale(1.02) translateY(-1px);
}
.tvl-button-large {
  font-size: 1.8rem;
  min-height: 5.2rem;
}
.tvl-button-medium {
  font-size: 1.6rem;
  min-height: 4.4rem;
}
.tvl-button-small {
  font-size: 1.4rem;
  min-height: 3.2rem;
}
.tvl-button.tvl-button-disabled {
  cursor: not-allowed;
  position: relative;
}
.tvl-button:not(.tvl-button-disabled)::before {
  content: '';
  position: absolute;
  z-index: 1;
  min-height: calc(100% + 0.2rem);
  min-width: calc(100% + 0.2rem);
  border-radius: var(--border-radius);
  left: -0.1rem;
  top: -0.1rem;
  background: transparent;
  box-shadow: none;
  transition: box-shadow 0.3s ease;
}
.tvl-button:not(.tvl-button-disabled):focus::before {
  box-shadow: var(--focus-shadow);
}

.tvl-button-disabled::after {
  position: absolute;
  content: "";
  min-height: calc(100% + 0.2rem);
  min-width: calc(100% + 0.2rem);
  left: -0.1rem;
  top: -0.1rem;
  background: rgba(255, 255, 255, 0.5);
  z-index: 1;
}
</style>