<template>
  <a
    :href="href"
    ref="myAnchor"
    :class="['tvl-button', 'tvl-button-' + size]"
    @click="onClick">
    <slot></slot>
  </a>
</template>
<script>
export default {
  name: 'TvlButtonAnchor',
  props: {
    size: { type: String, default: 'medium' },
    href: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  },
  methods: {
    onClick (e) {
      e.preventDefault()
      e.stopPropagation()
      if (this.href.startsWith('mailto:') || this.href.startsWith('tel:')) {
        window.open(this.href)
        return
      }
      if (this.$router) {
        this.$router.push(this.href)
        return
      }
      window.location.href = this.href
    }
  }
}
</script>
