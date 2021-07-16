<template>
  <section class="modal-container">
    <div class="modal">
      <div v-if="message.title === 'loading'">
        <h1 class="heading heading--super-main">
          Loading...
        </h1>
        <p class="paragraph">
          Please wait, your request is being processed.
        </p>
      </div>
      <div v-else>
        <h1 class="heading heading--super-main">Registration closed</h1>
        <p class="paragraph">
          Sorry registration has closed, thank you.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    message: {
      type: Object
    }
  }
}
</script>
