<template>
  <section class="section">
    <div class="row m-0 justify-content-center">
      <div class="col-md-5">
        <h1 class="heading heading--super-main">
          Congratulations! You've successfully registered for SOD'21
        </h1>
        <p class="paragraph">
          Below is your ID card, please do download and share on your social media profiles *wink* and encourage your friends to register too.
        </p>
        <br />
        <br />
        <div class="id-card">
          <img :src="user.image" class="id-card__img" alt="user's image" />
          <div class="id-card__content">
            <div class="id-card__name">
              {{user.fullname}}
            </div>
            <div class="id-card__matric">
              {{user.matric_number || 'Not Assigned'}}
            </div>
            <div class="id-card__dept">
              {{user.dept}}
            </div>
          </div>
          <div class="id-card__footer d-flex align-items-center justify-content-center pb-4">
            <img src="@/assets/FCS-logo.png" class="id-card__logo" alt="FCS logo" />
            <b>SOD'21</b>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CongratsPage',
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    if(this.user.fullname === null) {
      //  User is fraudent
      this.$router.push('/')
    }
  }
}
</script>
