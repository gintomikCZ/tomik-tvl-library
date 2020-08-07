<template>
  <transition
    name="tr-modal-overlay"
    @after-leave="$emit('hide')"
    @after-enter="showContent=true"
    @leave="onLeave"
    @enter="onEnter">
    <div
      v-if="showWrapper"
      ref="myModalOverlay"
      class="tvl-modal-overlay"
      @click="onScreenClick">
    <tvl-modal-content
      :show="showContent"
      @close="onClose"
      @ok="onOk"
      @hide="showWrapper=false"
      @show="$emit('show')">
      <template slot="header">
        <slot name="header"></slot>
      </template>
      <slot></slot>
      <template slot="footer">
        <slot name="footer"></slot>
      </template>
    </tvl-modal-content>
  </div>
  </transition>
</template>
<script>
import TvlModalContent from './TvlModalContent.vue'
import { generateZindex } from '../../helpers/helper.js'
export default {
  name: 'TvlModal',
  props: {
    okLabel: { type: String, default: 'OK' },
    closeLabel: { type: String, default: 'zavřít' },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    show: { type: Boolean, default: false },
    transition: { type: String, default: 'slidedown' }
  },
  data () {
    return {
      showContent: false,
      showWrapper: false
    }
  },
  watch: {
    show: {
      immediate: true,
      handler (nv) {
        if (nv) {
          this.showWrapper = true
          return
        }
        this.showContent = false
      }
    }
  },
  methods: {
    onEnter (el) {
      this.$wrap(this.$root, this.$refs.myModalOverlay)
      this.$refs.myModalOverlay.style.zIndex = generateZindex()
      document.body.style.overflow = 'hidden'
    },
    onLeave (el) {
      this.$unwrap(el)
      document.body.style.overflow = 'visible'
    },
    onScreenClick (e) {
      console.log('clicked')
        e.preventDefault()
        e.stopPropagation()
        this.$emit('screen-clicked', e)
    },
    onOk () {
      this.$emit('ok')
      this.showContent = false
    },
    onClose () {
      this.$emit('close')
      this.showContent = false
    }
  },
  components: { TvlModalContent }
}
</script>
<style lang="stylus">
@import '../../assets/styles/transitions.css'

.tvl-modal-overlay {
  background: #000;
  opacity: .6
  position: fixed;
  z-index: 1040;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.tvl-modal {
  background: #fff;
  border-radius: var(--border-radius);
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-height: 90vh;
  max-width: 90vw;
  min-height: 200px;
  min-width: 200px;
  overflow: hidden;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  opacity: 1;
}
.tvl-modal-header {
  flex-shrink: 0;
  border-bottom: 1px solid #afafaf;
  padding: .8rem 1.6rem;
}
.tvl-modal-title {
  font-weight: 700;
  font-size: 1.8rem;
}
.tvl-modal-subtitle {
  font-weight: 600;
  font-style: italic;
  font-size: 1.3rem;
}
.tvl-modal-body {
  padding: 0.8rem 1.6rem
  flex: 1 1 auto;
}
.tvl-modal-footer {
  padding: 0.8rem 1.6rem;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
}
.tr-modal-overlay-enter, .tr-modal-overlay-leave-to {
  opacity: 0;
}
.tr-modal-overlay-enter-to, .tr-modal-overlay-leave {
  opacity: .6;
}
.tr-modal-overlay-enter-active, .tr-modal-overlay-leave-active {
  transition: opacity .2s ease-in-out;
}
.tr-modal-content-enter, .tr-modal-content-leave-to {
  opacity: 0;
  transform: translate(0, -50vh);
}
.tr-modal-content-enter-to, .tr-modal-content-leave {
  opacity: 1;
  transform: translate(-50%, -50%);
}
.tr-modal-content-enter-active, .tr-modal-content-leave-active {
  transform-origin: top;
  transition: opacity .2s ease-in-out, transform var(--transition-duration) ease-in-out;
  transition-duration: .3s;

}

</style>
