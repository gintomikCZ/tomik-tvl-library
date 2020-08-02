<script>
import { contrast, lighten, darken, isLight, hexToRgb } from '../helpers/color_helper.js'
export default {
  name: 'TomikTvlLibrarySample', // vue component name
  data () {
    return {
      shadows: [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900],
      colors: ['green', 'pink', 'grey', 'blue']
    }
  }
};
</script>

<template>
  <div style="text-align: center; padding: 20px 0; overflow:  auto">
    <h1>tvl-button</h1>
    <p>This is a text ...</p>
    <div style="display: flex; justify-content: center;">
      <tvl-button color="green650" disabled label="disabled anchor" size="small" href="https://www.google.com"/>
      <tvl-button color="pink750" disabled label="disabled button" size="small" />
     <tvl-button color="blue500" size="large" plain label="blue500 plain large"/>
    </div>

    <div style="display: flex; margin: 20px 0; justify-content: center;">
      <div
        v-for="color in colors"
        style="display: flex; flex-direction: column; margin: 0 5px;"
        :key="color"
      >
        <template v-for="shadow in shadows">
          <tvl-button
            size="medium"
            :color="color + shadow"
            :key="color + shadow"
            :label="color + shadow"
            href="https://www.google.com"
          />
          <tvl-button
            size="small"
            :color="color + shadow"
            :key="color + shadow + 'outline'"
            :label="color + shadow + ' outline'"
            outline
          />
        </template>

      </div>
    </div>
  </div>
</template>

<style>
</style>
