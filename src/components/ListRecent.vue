<template>

    <q-list bordered separator>
      <!-- <q-item-label overline class="text-center">Your Feed</q-item-label> -->
      <q-item-label header>Feed</q-item-label>
      <q-separator/>

      <q-item v-for="(q, idx) in questionsPerPage" :key="q.id" id="allQuestions" class="q-my-sm" :to="{ name: 'question', params: {id: q.id} }">
      <!-- <div class="card" v-for="(q, idx) in questionsPerPage" :key="q.id" id="allQuestions"> -->
            <q-item-section top avatar>
             <q-avatar rounded color="primary" text-color="white">H</q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="3">
                  {{q.title}}
              </q-item-label>

              <q-item-label caption lines="3">{{q.summary}}</q-item-label>
            </q-item-section>

            <q-item-section thumbnail>
              <img v-if="q.img" :src="q.img">
              <q-item-label caption>
                <span v-if="q.modifiedOn" class="text-small">{{q.modifiedOn | formatDate}} </span>
                <span v-else class="text-small">{{q.createdAt | formatDate}}</span>
              </q-item-label>
            </q-item-section>
        </q-item>
    
    </q-list>


</template>

<script>
import firebase from "firebase"
import { mapGetters } from "vuex"
import {db} from '../main';
import HypothesesList from '@/components/HypothesesList.vue'
import moment from "moment";
require('firebase/functions');

export default {
  name: 'ListRecent',
  props: {
    showMyItems: {
      type: Boolean
    }
  },

  components: {
    HypothesesList
  },
  data: () => ({
    questions: [],
    show_update: [],
    perPage: 10,
    currentPage: 1,
    favorites: [],
    participants: [],
    name: '',
    photoUrl: '',
    img: "https://placekitten.com/120/120"
  }),
  firestore: {

  },

  filters: {
    formatDate(val) {
      if (!val) {
        return '-'
      }
      return moment(val.toDate()).fromNow()
    }
  },

  computed: {
    // map the state of this user
    ...mapGetters({
      user: "user"
    }),
  
    questionsPerPage() {
      // Return a sub-array containing `perPage` questions
      return this.questions.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      )
    },

    rows() {
      // Return the total number of questions.
      return this.questions.length
    }
  },

  created(){
    var questionsRef = db.collection('questions');
    
    //console.log(user.uid);
    if (this.showMyItems) {
      let user = firebase.auth().currentUser;
      questionsRef = questionsRef.where('hidden', '==', false)
        .where('userId', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          } 
          snapshot.forEach(doc => {
            let question = doc.data();
            question.id = doc.id;
            this.questions.push(question);
            if (user) {
              this.show_update.push(user.uid == question.userId);
            }

          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    } else {
      questionsRef = questionsRef.where('hidden', '==', false)
        .orderBy('createdAt', 'desc')
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          } 
          snapshot.forEach(doc => {
            let question = doc.data();
            question.id = doc.id;
            this.questions.push(question);
            this.participants.push([question.id, this.getProfileParticipants(question.id)]);
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    }

    db.collection('favorites').get().then(snapshot => {
      snapshot.forEach(doc => {
        let fav = doc.data();
        fav.id = doc.id;
        this.favorites.push(fav.id);
      });
    }).catch(err => {

    });
  },

  methods: {
    updateQuestion: function (question_id) {
      this.$router.push("/updateQuestion/" +question_id);
    },

    addToFavoriteQuestions: function (question_id, n_likes) {
      let currentUser = firebase.auth().currentUser
      let docId = `${currentUser.uid}_${question_id}`
      db.collection('favorites').doc(docId).get().then(doc => {
        if (doc.exists) {
          console.log("You already liked this question")
          return
        }

        db.collection('favorites').doc(docId).set({
          questionId: question_id,
          userId: currentUser.uid
        }).then(() => {
          // Update the number of likes of the question
          db.collection('questions').doc(question_id).update({
            likes: n_likes + 1
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },

    removeFromFavoriteQuestions: function (question_id, n_likes) {
      let currentUser = firebase.auth().currentUser
      let docId = `${currentUser.uid}_${question_id}`
      db.collection('favorites').doc(docId).delete();
      db.collection('questions').doc(question_id).update({
        likes: n_likes - 1
      })
    },

    checkFavoriteQuestion(question_id) {
      return this.favorites.includes(`${firebase.auth().currentUser.uid}_${question_id}`);
    },

    getAverageVote: function () {
      return Math.floor(Math.random() * 100);
    },

     getProfileParticipants: function (question_id) {
      var p = []
      let currentUser = firebase.auth().currentUser
      //let docId = `${currentUser.uid}_${this.id}`
      db.collection('participants').get().then(snapshot => {
        snapshot.forEach(doc => {
          let participation = doc.data()
          participation.id = doc.id
          if (participation.questionId === question_id) {
            // console.log(doc.id, '=>', participation)
            p.push(participation.userId)
          }
        });
      }).catch(err => {
        console.log(err)
      })
      return p;
    },

    getProfileParticipantsPerQuestion: function (q_id) {
      let idx = this.participants.indexOf(q_id)
      return this.participants[idx][1]
    },

    // getParticipantName: function (user_id) {
    //   db.collection('Users').doc(user_id).get().then(doc => {
    //     if (doc.exists) {
    //       let user = doc.data()
    //       user.id = doc.id
    //       console.log(user_id, '=>', user)
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   });
    //   return `${user_id}_${Math.random()}`
    // },

    getParticipantNameCF: async function (user_id) {
      //var name = '';
      var getUserInfo = firebase.functions().httpsCallable('getUserInfo');
      // getUserInfo({uid:user_id}).then(function(result) {
      //   console.log('Cloud function', result.data);
      //   name = result.data[0];
      //   console.log('name', '=>', name)
      // });
      var result = await getUserInfo({uid:user_id});
      //console.log(name);
      return result.data;
    },

    getParticipantName: function (user_id) {
      this.getParticipantNameCF(user_id).then((data) => {
        this.name = data[0];
      });
      return `${this.name}_${Math.random()}`;
    },

    getParticipantAvatar: function (user_id) {
      this.getParticipantNameCF(user_id).then((data) => {
        this.photoUrl = data[1];
      });
      return `${this.photoUrl}_${Math.random()}`;
    },

    getImageQuestion: function(q_id) {
      var storageRef = firebase.storage().ref();
      var imgRef = storageRef.child('images/' + q_id);
      // Get the download URL
      imgRef.getDownloadURL().then(function(url) {
        var img = url
        console.log('Image', img)
      }).catch(function(error) {
        console.log(error)
      });
    }


  },

  mounted () {
    console.log(this.participants)
    this.getImageQuestion('mr4ltAB1oy71SNs6ymkH')
  }
}

</script>