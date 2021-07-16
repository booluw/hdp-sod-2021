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
    user: {},
    users: []
  },
  mutations: {
    COMMIT_USER: (state, payload) => {
      state.user = payload
    },
    COMMIT_USERS: (state, payload) => {
      state.users = payload
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
          img: payload.image,
          matric: payload.matric
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
        db.collectionGroup('tokens').where('token', '==', `${payload}`).get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
              resolve(doc.id)
          });
        }).catch(error => {
          reject(error)
        });
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
    },
    generateMatric({commit}) {
      return new Promise((resolve, reject) => {
        let index
        db.collection('count').doc('count').get().then( querySnapshot => {
          index = querySnapshot.data().number
          index = index + 1
          db.collection('count').doc('count').update({
            number: index
          }).then(() => {
            resolve(index)
          }).catch(error => {
            reject(error)
          })
        })
      })
    },
    fetchUser({commit}) {
      return new Promise((resolve, reject) => {
        let users = [];
        db.collection("users").onSnapshot( querySnapshot => {
          querySnapshot.forEach((doc) => {
            users.push(doc.data())
          })
        })

        commit('COMMIT_USERS', users)
      })
    }
  }
})
