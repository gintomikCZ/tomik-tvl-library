<template>
  <div class="tvl-focusable-parent" ref="myWrap">
    <button :type="buttonType" class="tvl-button">{{ label }}</button>
  </div>
</template>

<script>
  import { getColor, getTextColorToBg, isLight, darken, lighten } from '../helpers/color_helper.js'
  export default {
    name: 'TvlButton',
    props: {
      submit: { type: Boolean, default: false },
      color: { type: String, default: 'grey450' },
      label: { type: String, default: '' }
    },
    computed: {
      buttonType () {
        return this.submit ? 'submit' : 'button'
      }
    },
    mounted () {
      this.$nextTick(this.setCssCustomProperties)
    },
    methods: {
      setCssCustomProperties () {
        const el = this.$refs.myWrap
        let bg = getColor(this.color)
        if (!bg) bg = getColor('grey450')
        const textColor = getTextColorToBg(bg, true, 7)
        el.style.setProperty('--btn-background', bg)
        el.style.setProperty('--btn-color', textColor)
        const hoverBg = isLight(bg) ? darken(bg, 10) : lighten(bg, 10)
        el.style.setProperty('--btn-background-hover', hoverBg)
        el.style.setProperty('--btn-color-hover', getTextColorToBg(hoverBg, true, 7))
      }
    }
  }
</script>

<style>
  a.tvl-button,
  button.tvl-button {
    background: var(--btn-background);
    color: var(--btn-color);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.18);
    padding: 0.25em 0.75em;
    min-width: 10ch;
    min-height: 44px;
    text-align: center;
    line-height: 1.1;
    transition: 0.3s all ease-in-out
  }
  a.tvl-button:hover,
  button.tvl-button:hover {
    background: var(--btn-background-hover);
    color: var(--btn-color-hover);
  }
  a.tvl-button:focus,
  button.tvl-button:focus {
    outline-style: solid;
    outline-color: transparent;
    box-shadow: var(--focus-shadow)
  }
  a.tvl-button:active,
  button.tvl-button:active {
    transform: scale(1.02) translateY(-1px);
  }

</style>