<script>
import { contrast, lighten, darken, isLight, hexToRgb } from '../helpers/color_helper.js'
export default {
  name: 'TomikTvlLibrarySample', // vue component name
  data() {
    return {
      counter: 5,
      initCounter: 5,
      message: {
        action: null,
        amount: null,
      },
      colors: [
        'green100',
        'green150',
        'green200',
        'green250',
        'green300',
        'green350',
        'green400',
        'green450', 
        'green500',
        'green550',
        'green600',
        'green650',
        'green700',
        'green750',
        'green800',
        'green850',
        'green900'
      ]
    };
  },
  computed: {
    colorsObject () {
      return this.colors.map(color => {
        let ar = hexToRgb(color)
        return {
          main: color,
          lighten: lighten(color, 15),
          darken: darken(color, 15),
          isLight: isLight(color) ? 'light' : 'dark',
          rgb: '' + ar[0] + '|' + ar[1] + '|' + ar[2]
        }
      })
    },
    changedBy () {
      const { message } = this;
      if (!message.action) return 'initialized';
      return `${message.action} ${message.amount ?? ''}`.trim();
    },
    toWhite () {
      return this.colors.map(color => contrast(color, '#ffffff'))
    },
    toBlack () {
      return  this.colors.map(color => contrast(color, '#000000'))
    }
  },
  methods: {
    increment(arg) {
      const amount = (typeof arg !== 'number') ? 1 : arg;
      this.counter += amount;
      this.message.action = 'incremented by';
      this.message.amount = amount;
    },
    decrement(arg) {
      const amount = (typeof arg !== 'number') ? 1 : arg;
      this.counter -= amount;
      this.message.action = 'decremented by';
      this.message.amount = amount;
    },
    reset() {
      this.counter = this.initCounter;
      this.message.action = 'reset';
      this.message.amount = null;
    },
  },
};
</script>

<template>
  <div class="tomik-tvl-library-sample">
    <template v-for="color in colors">
      <tvl-button :color="color" :key="color" :label="color"/>
    </template>
  </div>

  </div>
</template>

<style lang="stylus">
  $color=#ff91ff
  body
    background: var(--grey450)
  .tomik-tvl-library-sample {
    display: block;
    width: 400px;
    margin: 25px auto;
    border: 1px solid #ccc;
    background: #eaeaea;
    text-align: center;
    padding: 25px;
  }
  .tomik-tvl-library-sample p {
    margin: 0 0 1em;
  }
  .btn-group
    display: flex
    margin-top: 2px
  .btn-group > button
    padding: 4px 8px
    border-radius: 5px
</style>
