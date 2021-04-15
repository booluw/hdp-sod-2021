<template>
  <section :class="`accordion accordion--${data.type}`">
    <div class="accordion__header" @click="open = !open">{{data.title}}</div>
    <p class="accordion__paragraph" v-if="open">{{data.text}}</p>
  </section>
</template>

<script>
export default {
  name: 'Accordion',
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      open: false
    }
  }
}
</script>
