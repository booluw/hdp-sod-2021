import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase'
import './firebase'
require("firebase/firestore")


Vue.use(Vuex)
var db = firebase.firestore()
window.db = db;

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    COMMIT_USER: (state, payload) => {
      state.user = payload
    }
  },
  actions: {
    sendToFirebase({commit}, payload) {
      return new Promise((resolve, reject) => {
        db.collection("users").add({
          fullname: payload.fullname,
          email: payload.email,
          dept: payload.dept,
          campus: payload.campus,
          gender: payload.gender,
          img: payload.image
        }).then(() => {
          commit('COMMIT_USER', payload)
          resolve('Data added')
        }).catch((error) => {
          reject(error)
        })
      });
    },
    sendToStore({commit}, payload) {
      return new Promise((resolve, reject) => {
        const storageRef = firebase.storage().ref(`${payload.name}`).put(payload);
        storageRef.on('state_changed', snapshot => {
          console.log(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error => {reject(error)},
        () => {
          console.log('Image uploaded');
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            resolve(url)
          })
        })
      })
    },
    checkCoupon({commit}, payload) {
      return new Promise((resolve, reject) => {
        db.collection("tokens").onSnapshot((querySnapshot) => {
          let tokens = [];
          querySnapshot.forEach((doc) => {
            if(doc.data().token === payload) {
              console.log(`${payload} is same as ${doc.data().token}`)
              if(doc.data().isUsed === false) {
                console.log(`${doc.data().token}'s isUsed returned ${doc.data().isUsed}`)
                //  Returns doc.id to use for updating token as used
                resolve(doc.id)
              } else {
                console.log(`${doc.data().token}'s isUsed returned ${doc.data().isUsed}`)
                reject('Token is already used')
              }
            } else {
              reject('Token does not exist')
            }
          })
        }, (error) => {
          reject(error)
        })
      })
    },
    updateToken({commit}, payload) {
      return new Promise((resolve, reject)=> {
        //  Update document with id of payload
        db.collection("tokens").doc(payload).update({
          isUsed: true
        }).then(() => {
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
})
