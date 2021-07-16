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
        <!-- label for="image" v-if="user.image == null">
          <input id="image" type="file" @change="uploadImage" accept="image/*" style="display: none"/>
          <img src="@/assets/placeholder.jpg" class="form__img"/>
          <p style="margin: 1rem;padding: 1rem;background-color: white;color: crimson; text-align: center;">
            Click Here to upload your passport.
          </p>
        </label --->
        <!--- img v-else :src="user.image" class="form__img"/>
        <p v-if="uploading" style="margin: 1rem;padding: 1rem;background-color: white;color: crimson; text-align: center;">
          Image is being uploaded!!!
        </p -->
        <label for="name" class="input-group">
          <span class="input-group__label">fullname</span>
          <input type="text" v-model.lazy="user.fullname" class="input-group__input" required />
        </label>
        <label for="email" class="input-group">
          <span class="input-group__label">email</span>
          <input type="email" v-model.lazy="user.email" class="input-group__input" required />
        </label>
        <label for="tel" class="input-group">
          <span class="input-group__label">WhatsApp Number</span>
          <input type="tel" v-model.lazy="user.phone" class="input-group__input" required />
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
            <label for="online" class="input-group__checkbox">
              <input type="radio" name="campus" value="Online" id="online" v-model="user.campus" />
              <span class="__checkbox"></span>
              <span class="__label">online</span>
            </label>
          </div>
        </div>
        <label for="department" class="input-group">
          <span class="input-group__label">department</span>
          <select id="department" v-model="user.dept" class="input-group__select" @change="findSurfix()" required>
            <template v-for="dept in  depts">
              <option v-if="dept.surfix"  :key="dept.title" :value="dept.title">
                {{dept.title}}
              </option>
            </template>
          </select>
        </label>
        <div class="d-md-flex align-items-center" v-if="!user.image">
          <button class="btn btn--submit" type="submit" :disabled="clicked">PAY WITH COUPON</button>
          <paystack
            class="btn btn--paystack"
            :disabled="clicked"
            type="button"
            :amount="amount"
            :email="user.email"
            :paystackkey="paystackKey"
            :reference="reference"
            :callback="payWithCard"
            :close="cardError"
            :embed="false"
            :channels="card"
          >
            PAY WITH CARD
          </paystack>
        </div>
        <p v-else style="margin: 1rem;padding: 1rem;background-color: white;color: crimson; text-align: center;">
          Please upload your photo first.
        </p>
      </form>
    </section>
    <app-modal v-if="clicked" :message="loadingMessage"/>
    <!--- app-modal :message="loadingMege" / --->
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
import paystack from 'vue-paystack'
import AppModalVue from '../components/AppModal.vue'

export default {
  name: 'Home',
  components: {
    'app-hero': HelloWorld,
    'app-accordion': AppAccordionVue,
    'app-modal': AppModalVue,
    paystack
  },
  data() {
    return {
      depts: [
        {
          title: 'Contemporary Leadership and Influence',
          type: 'cli',
          text: `
            Leadership is key in any society or community, it is a platform of influence, majority of what we suffer in the world today are sequel to failure in leadership. The world is progressive in nature, with lots of innovations and developments. Our society is in dying need of good leaders who are contemporary in approach and diplomatic in reasoning. This class will focus on raising leaders who are aligned to the Spirit of God and called to proffer solutions to global problems. 
          `,
          surfix: 'CI'
        },
        {
          title: 'Missiology and End-Time Revival',
          type: 'mer',
          text: `
            The Church is saddled with the responsibility of making disciples of all nations, nonetheless we find few denominations and believers who are obsessed about soul winning. The frontiers of the kingdom of God cannot be extended without people who are passionate for souls. We talk about the second coming of Christ but there are millions of people who haven’t heard about the first. (Romans 10:10-15). The revival of the last days is not one oriented with a myriad of miracles but a great cloud of saints who are captured for the Lord Jesus.  The class focuses on strategic missions and discipleship and encourages believers to remain fused on the Lord even in perilous times.
          `,
          surfix: 'MR'
        },
        {
          title: 'Kingdom Arts and Entertainment',
          type: 'kae',
          text: `
            Arts and Entertainment are making waves globally; this sphere of influence seem to capture the hearts of young people easily. It is therefore pertinent that believers understand how to represent God effectively via platforms offered by music and others forms of performing arts/entertainment such as poetry, spoken words, dancing, drawing etc. The class will focus on building and grooming aspiring artist and entertainers for kingdom exploits, those who will be rooted in God’s word, not compromising their call for treasures.
          `,
          surfix: 'KE'
        },
        {
          title: 'Divinity and the Supernatural',
          type: 'dvs',
          text: `
            Significant epochs in church history characterized by a demonstration of the spirit’s power (I Corinthians 4:20), one can’t dispute the fact that the early church was characterized by an overwhelming presence of the Holy Spirit and an extraordinary outplay of power, miracles and healings. We are in the days of his power. However, liberalist today negate the power of the spirit and proclaim that the days of miracles are gone, forgetting that Jesus Christ is the same yesterday today and forever. (Hebrews 13:8). The church today cannot influence cosmos by just logic and intellect but via a demonstration of power will the church continue to advance over the gates of hell and the kingdom of darkness.
          `,
          surfix: 'DS'
        },
        {
          title: 'Ecclesiology and Doctrinal Studies',
          type: 'eds',
          text: `
            The level of errors and fallacies in the body of Christ is in a steady increase, with lots of false prophets, teachers and pastors who bring up dogmas without biblical basis or accurate interpretation. The world is in great need of teachers who are accurate in handling the scriptures and have deep understanding on doctrines (2Timothy 2:15). This class shall focus on church building, its origin, its relationship to Jesus, its role in salvation, its disciplines and destiny and also addresses some vital biblical doctrines that are becoming controversial in today’s world such as eternal security, tithing, rapture and so on and also teach how to stand firm while defending the faith amidst believers.
          `,
          surfix: 'ES'
        },
        {
          title: 'Kingdom Wealth Creation',
          type: 'kwc',
          text: `
            The concept of kingdom prosperity and wealth has become a subject of contention in today’s world. We have lots of doctrine and ideologies that either promotes or conflicts individual opinions on finance. Nevertheless, the word of God remains supreme, it is God’s will that we prosper and be in good health (3John 1:2), God delights in the prosperity of his servants not otherwise! This class seeks to strike a balance between the twine, that the believer has all it takes to be holy and wealthy and ought to handle wealth as a tool for kingdom influence and not a god to be worshipped.
          `,
          surfix: 'KC'
        },
        {
          title: 'Model Marriage and Relationship',
          type: 'mmr',
          text: `
            Relationships are integral to our life’s success, without good interactions between human there would be hitches. Relationships amongst same and opposite sex is relevant for one’s growth and value building, today we see lots of failed relationships among opposite sex and we find countless cases of marital abuse and crisis. This decadence in marriage value contributes immensely to psychological disorder and emotional imbalance amongst youths. This class explicitly handles the subject matter and clearly shows God’s model for every relationship and marriage.
          `,
          surfix: 'MM'
        },
        {
          title: 'Kingdom Identity and Relevance',
          type: 'kir',
          text: `
            The quest for relevance has led many astray, the human logic cannot understand God’s modus operandi. God has a peculiar purpose for everyman, except the purpose of a thing is known, otherwise abuse is inevitable. This class focuses on making believers understand their true identity in Christ and their purpose in life.
          `,
          surfix: 'KI'
        },
        {
          title: 'General Discussion and Life Talk',
          type: 'glt',
          text: `
            This class is chiefly going to address issues that pertains to education, academic excellence and career. General life issues that affects our basic living such as character, human comportments, ethics, etiquette, hygiene and exercise will also be covered under the general discussion class.
          `
        }
      ],
      user: {
        fullname: '',
        email: '',
        dept: '',
        image: null,
        campus: '',
        gender: '',
        matric: '',
        surfix: '',
        phone: ''
      },
      clicked: false,
      uploading: false,
      token: '',
      paystackKey: 'pk_live_af4bed74f8f5ac7a6b15a07994651b62683cd54f',
      amount: 550 * 100,
      card: ['card'],
      loadingMessage: {
        title: 'loading'
      },
      loadingMege: {}
    }
  },
  computed: {
    reference(){
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( let i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }
  },
  methods: {
    ...mapActions(['sendToFirebase','sendToStore','checkCoupon','updateToken','generateMatric']),
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
        this.updateToken(tokenID).then(()=> {
          this.generateMatric().then((index) => {
            let numb = index.toString().padStart(5, '0');
            console.log(numb)
            this.user.matric = `SOD/21/${numb}${this.user.surfix}`
            this.sendToFirebase(this.user).then(() => {
              this.$router.push('/congrate-page')  
            }).catch(error => {
              alert(error.message)
            })
          }).catch(error => {
            alert(error.message)
          })
        }).catch(error => {
          alert(error.message)
        })
      }).catch(error => {
        alert(error.message)
      this.clicked = false
      })
    },
    payWithCard(response) {
      console.log(response)
      this.generateMatric().then((index) => {
        let numb = index.toString().padStart(3,'0')
        console.log(numb) 
        this.user.matric = `SOD/21/${numb}${this.user.surfix}`
        this.sendToFirebase(this.user).then(() => {
          this.$router.push('/congrate-page')  
        })    
      })
    },
    cardError() {
      alert('Error paying with card')
    },
    findSurfix() {
      this.depts.forEach(dept => {
        if (dept.title === this.user.dept) {
          this.user.surfix = dept.surfix
        }
      })
    }
  },
  metaInfo: {
    title: "SOD'21 registration portal"
  },
}
</script>
