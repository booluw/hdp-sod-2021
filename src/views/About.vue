<template>
  <section class="section">
    <div class="row m-0 justify-content-center">
      <div class="col-md-5">
        <h1 class="heading heading--super-main">
          Congratulations! You've successfully registered for SOD'21
        </h1>
        <p class="paragraph">
          Below is your ID card, please do <b>screenshot</b> and share on your social media profiles *wink* and encourage your friends to register too.
        </p>
        <br />
        <br />
        <div class="id-card" ref="idCard">
          <!--- div class="id-card__img" :style="`background-color:white;background-image: url(${user.image});background-size: 100% 100%;background-position: center;background-repeat: no-repeat;`"></div -->
          <div class="id-card__content">
            <div class="id-card__name">
              {{user.fullname}}
            </div>
            <div class="id-card__matric">
              {{user.matric || 'Not Assigned'}}
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
        <div v-if="user.campus === 'Online'" class="row m-0 justify-content-center">
          <a href="https://chat.whatsapp.com/HoMqf8yusrGCPU0lrbSwJn" class="btn btn--paystack" target="_blank">Join Online Class Now</a>
        </div>
        <!--- button class="btn btn--submit" @click="download()">Download</button --->
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import html2canvas from 'html2canvas';

export default {
  name: 'CongratsPage',
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    if(!this.user) {
      //  User is fraudent
      this.$router.push('/')
    }
  },
  methods: {
    download() {
      let vc = this.$refs.idCard
      html2canvas(vc).then(canvas => {
        console.log('Worked')
        document.body.appendChild(canvas)
      }).catch(error => {
        console.log(error)
        alert('Error encountered')
      })
    }
  },
  metaInfo: {
    title: 'Registration successful'
  }
}
</script>
