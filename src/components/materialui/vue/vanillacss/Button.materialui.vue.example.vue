<script setup lang="ts">
import Button from './Button.materialui.vue.vue'
</script>

<template>
  <div class="flex gap-3 flex-wrap">
    <Button>Click Me!</Button>
    <Button href="#">I am a Link</Button>
    <Button outlined>Outlined</Button>
    <Button text>Text</Button>
  </div>
</template>
