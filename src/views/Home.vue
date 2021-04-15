<template>
  <section>
    <header class="header">
      <div class="d-flex align-items-center">
        <img src="@/assets/FCS-logo.png" class="header__logo" alt="FCS logo" />
        <span class="header__text">SOD'21</span>
      </div>
      <a href="#register" class="btn btn--link btn--cta">
        Register
      </a>
    </header>
    <app-hero />
    <section class="section">
      <h3 class="section__heading heading">theme</h3>
      <h1 class="heading heading--super-main">
        Influencing global systems
      </h1>
      <div class="d-flex">
        <span class="pills">Isaiah 11:1-9</span>
        <span class="pills">Obadiah 1:21</span>
        <span class="pills">Matthew 5:14-16</span>
        <span class="pills">Mark 16:15-16</span>
      </div>
    </section>
    <section class="section">
      <h3 class="section__heading heading">objectives</h3>
      <div class="row m-0 mt-md-5">
        <div class="col-md-3 py-3 px-0 py-md-0 px-md-3">
          <div class="card">
            <p class="card__paragraph">
              To raise believers who will be intimate with God and will have sound Biblical knowledge to accomplish destiny.
            </p>
          </div>
        </div>
        <div class="col-md-3 py-3 px-0 py-md-0 px-md-3">
          <div class="card">
            <p class="card__paragraph">
              To raise believers who will mar the kingdom of darkness by salvaging men from it into the kingdom of God.
            </p>
          </div>
        </div>
        <div class="col-md-3 py-3 px-0 py-md-0 px-md-3">
          <div class="card">
            <p class="card__paragraph">
              To equip believers with the requisite knowledge and skill for kingdom dominance.
            </p>
          </div>
        </div>
        <div class="col-md-3 py-3 px-0 py-md-0 px-md-3">
          <div class="card">
            <p class="card__paragraph">
              To raise generals who will infiltrate all mountains of influence and exalt Jesus as Lord.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <h3 class="section__heading heading">departments</h3>
      <div class="row m-0 align-items-start">
        <div class="col-md-4 p-0 p-md-2" v-for="data in depts" :key="data.title">
          <app-accordion :data="data" />
        </div>
      </div>
    </section>
    <a name="register" id="register"></a>
    <section class="section section-bg">
      <form class="form" @submit.prevent="payWithCoupon()">
        <h2 class="heading heading--main mb-4">Register an account</h2>
        <label for="image" v-if="user.image == null">
          <input id="image" type="file" @change="uploadImage" accept="image/*" style="display: none"/>
          <img src="@/assets/placeholder.jpg" class="form__img"/>
        </label>
        <img v-else :src="user.image" class="form__img"/>
        <p v-if="uploading" style="margin: 1rem;padding: 1rem;background-color: white;color: crimson; text-align: center;">
          Image is being uploaded!!!
        </p>
        <label for="name" class="input-group">
          <span class="input-group__label">fullname</span>
          <input type="text" v-model.lazy="user.fullname" class="input-group__input" required />
        </label>
        <label for="email" class="input-group">
          <span class="input-group__label">email</span>
          <input type="email" v-model.lazy="user.email" class="input-group__input" required />
        </label>
        <div class="input-group input-group--checkbox">
          <span class="input-group__label">gender</span>
          <div class="d-flex justify-content-between justify-content-lg-start">
            <label for="male" class="input-group__checkbox">
              <input type="radio" name="gender" value="male" id="male" v-model="user.gender" />
              <span class="__checkbox"></span>
              <span class="__label">male</span>
            </label>
            <label for="female" class="input-group__checkbox">
              <input type="radio" name="gender" value="female" id="female" v-model="user.gender" />
              <span class="__checkbox"></span>
              <span class="__label">female</span>
            </label>
          </div>
        </div>
        <div class="input-group input-group--checkbox">
          <span class="input-group__label">campus</span>
          <div class="d-flex justify-content-between justify-content-lg-start">
            <label for="bosso" class="input-group__checkbox">
              <input type="radio" name="campus" value="Bosso" id="bosso" v-model="user.campus" />
              <span class="__checkbox"></span>
              <span class="__label">bosso</span>
            </label>
            <label for="gk" class="input-group__checkbox">
              <input type="radio" name="campus" value="Gidan Kwano" id="gk" v-model="user.campus" />
              <span class="__checkbox"></span>
              <span class="__label">gidan kwano</span>
            </label>
          </div>
        </div>
        <label for="department" class="input-group">
          <span class="input-group__label">department</span>
          <select id="department" v-model="user.dept" class="input-group__select">
            <option v-for="dept in  depts" :key="dept.title" :value="dept.title">{{dept.title}}</option>
          </select>
        </label>
        <div class="d-md-flex align-items-center">
          <button class="btn btn--submit" type="submit" :disabled="clicked">PAY WITH COUPON</button>
          <button class="btn btn--paystack" :disabled="clicked">PAY WITH CARD</button>
        </div>
      </form>
    </section>
    <footer class="footer">
      <div class="row align-items-center justify-content-center m-0">
        <img src="@/assets/FCS-logo.png" class="footer__logo" alt="FCS logo" />
        <span class="footer__text">SOD'21</span>
      </div>
      <div class="footer__attribution">
        &copy; 2021, FCS HDP
      </div>
    </footer>
  </section>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import AppAccordionVue from '../components/AppAccordion.vue'

import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    'app-hero': HelloWorld,
    'app-accordion': AppAccordionVue
  },
  data() {
    return {
      depts: [
        {
          title: 'Contemporary Leadership and Influence',
          type: 'cli',
          text: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vel? Aut veniam iste facilis reprehenderit ratione fugiat dolorum non laboriosam odit porro, blanditiis quibusdam possimus nesciunt officia quae beatae reiciendis!
          `
        },
        {
          title: 'Missiology and End-Time Revival',
          type: 'mer',
          text: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vel? Aut veniam iste facilis reprehenderit ratione fugiat dolorum non laboriosam odit porro, blanditiis quibusdam possimus nesciunt officia quae beatae reiciendis!
          `
        },
        {
          title: 'Kingdom Arts and Entertainment',
          type: 'kae',
          text: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vel? Aut veniam iste facilis reprehenderit ratione fugiat dolorum non laboriosam odit porro, blanditiis quibusdam possimus nesciunt officia quae beatae reiciendis!
          `
        },
        {
          title: 'Divinity and the Supernatural',
          type: 'dvs',
          text: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vel? Aut veniam iste facilis reprehenderit ratione fugiat dolorum non laboriosam odit porro, blanditiis quibusdam possimus nesciunt officia quae beatae reiciendis!
          `
        },
        {
          title: 'Ecclesiology and Doctrinal Studies',
          type: 'eds',
          text: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vel? Aut veniam iste facilis reprehenderit ratione fugiat dolorum non laboriosam odit porro, blanditiis quibusdam possimus nesciunt officia quae beatae reiciendis!
          `
        },
        {
          title: 'Kingdom Wealth Creation',
          type: 'kwc',
          text: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vel? Aut veniam iste facilis reprehenderit ratione fugiat dolorum non laboriosam odit porro, blanditiis quibusdam possimus nesciunt officia quae beatae reiciendis!
          `
        },
        {
          title: 'Model Marriage and Relationship',
          type: 'mmr',
          text: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vel? Aut veniam iste facilis reprehenderit ratione fugiat dolorum non laboriosam odit porro, blanditiis quibusdam possimus nesciunt officia quae beatae reiciendis!
          `
        },
        {
          title: 'Kingdom Identity and Relevance',
          type: 'kir',
          text: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vel? Aut veniam iste facilis reprehenderit ratione fugiat dolorum non laboriosam odit porro, blanditiis quibusdam possimus nesciunt officia quae beatae reiciendis!
          `
        },
        {
          title: 'General Discussion and Life Talk',
          type: 'glt',
          text: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vel? Aut veniam iste facilis reprehenderit ratione fugiat dolorum non laboriosam odit porro, blanditiis quibusdam possimus nesciunt officia quae beatae reiciendis!
          `
        }
      ],
      user: {
        fullname: '',
        email: '',
        dept: '',
        image: null,
        campus: '',
        gender: ''
      },
      clicked: false,
      uploading: false,
      token: ''
    }
  },
  methods: {
    ...mapActions(['sendToFirebase','sendToStore','checkCoupon','updateToken']),
    uploadImage(event) {
      let imageData = event.target.files[0]
      this.uploading = true
      this.sendToStore(imageData).then((response) => {
        this.user.image = response
        this.uploading = false
      }).catch(error => {
        alert(error.message)
      })
    },
    payWithCoupon() {
      this.clicked = true
      let token = prompt('Please input token')

      //  Checks if token.isUsed if false, else returns that coupon has been used.
      this.checkCoupon(token).then((tokenID) => {
        console.log('Checked Token')
        this.sendToFirebase(this.user).then(() => {
          console.log('Registered User')
          this.updateToken(tokenID).then(()=> {
            console.log('Updated Token')
            //  Update token then send to congrate-page
            this.$router.push('/congrate-page')
          }).catch(error => {
            alert(error.message)
          })
        })
      }).catch(error => {
        alert(error||error.message)
      })
    },
    payWithCard() {
      this.sendToFirebase(this.user).then(()=> {
        console.log('Registered User')
        this.$router.push('/congrate-page')
      })
    },
    cardError() {
      alert('Error paying with card')
    }
  }
}
</script>
