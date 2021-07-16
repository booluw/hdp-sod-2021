<template>
  <section class="row m-3">
    <div class="col-12">
      <h1 class="heading heading--super-main">ID Card generator</h1>
      <p class="paragraph">
        Please wait for the Passport to load before clicking to download.
        Once you click, there is no need to click again, download would start almost immediately.
      </p>
      <download-excel :data="users" name="SoD-Data.xls" class="btn btn--submit">
        Download Data
      </download-excel>
    </div>
    <template v-for="(user, index) in users">
      <div
        v-if="user.campus === 'Online'"
        :key="index"
        class="col-md-4 p-1"
      >
        <div class="id-card">
          <div class="id-card__content">
            <div class="id-card__name">
              {{user.fullname}}
            </div>
            <div class="id-card__matric">
              {{user.phone}}
            </div>
            <div class="id-card__dept">
              {{user.dept}}
            </div>
          </div>
          <div class="id-card__footer d-flex align-items-center justify-content-center pb-4">
            <img src="@/assets/FCS-logo.png" class="id-card__logo" alt="FCS logo" />
            <div>
            <b>SOD'21</b><br />
            <small>{{user.campus}}</small>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
//  import FileSaver from 'file-saver';
//  import { saveAs } from 'file-saver';
//  import * as htmlToImage from 'html-to-image';
//  import { toBlob } from 'html-to-image';

import { mapActions, mapState } from 'vuex';

export default {
  name: 'IDCard',
  computed: {
    ...mapState(['users'])
  },
  data() {
    return {
      jsonUser: {}
    }
  },
  methods: {
    ...mapActions(['fetchUser']),
    /*printCard(username) {
      let node = document.getElementById(`${username}`)

      htmlToImage.toBlob(node).then(function (blob) {
        FileSaver.saveAs(blob, `${username}-IDCard.png`)
      }).catch(function (error) {
        alert(`Something went wrong ${error}`)
      })
    } */
  },
  mounted() {
    this.fetchUser()
    this.jsonUser = JSON.stringify(this.users)
  }
}
</script>
