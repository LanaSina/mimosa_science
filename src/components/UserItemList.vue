<template>
  <div class="container">
    <b-tabs content-class="mt-3">
      <!-- Start questions -->
      <b-tab title="Questions" active>
        <div class="card" v-for="(q, idx) in questions">
          <!-- Begin: rating -->
          <div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width:80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
            <!-- End rating -->

            <div class="row no-gutters"> 
              <div v-if="q.img">
                <!-- <b-img :src="q.img" fluid></b-img> -->
                <div class="card bg-dark text-white">
                  <img class="card-img" :src="q.img" alt="Card image">
                  <div class="card-img-overlay">
                    <!-- <h5 class="card-title">Card title</h5> -->
                    <b-button v-b-modal="q.id">Update banner</b-button>
                    <b-modal 
                      :id="q.id" 
                      title="Update the banner"
                      @ok="handleOk"
                    >
                        <!-- <b-form-file v-model="file" class="mt-3" plain></b-form-file> -->
                        <!-- <UploadImage ref="reuploader"/> -->
                        <b-form-file
                          v-model="file"
                          :state="Boolean(file)"
                          placeholder="Choose a file or drop it here..."
                          drop-placeholder="Drop file here..."
                          accept=".jpg, .png"
                        ></b-form-file>
                    </b-modal>
                  </div>
                </div>
              </div>

              <div class="col-md-4" v-else>
                <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-label="Placeholder: Image" preserveAspectRatio="xMidYMid slice" role="img"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"/><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image</text></svg>
              </div>

              <div class="card-body">
                <div class="card-title">
                  <router-link :to="{ name: 'question', params: {id: q.id} }">
                    <h5>{{ q.title }} </h5>
                  </router-link>
                </div>
                
                <!-- Card Optional menu -->
                <b-navbar-nav class="ml-auto card-options">
                  <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                      <i class="btn-options material-icons">more_vert</i>
                    </template>
                    <b-dropdown-item :to="{ name: 'updateQuestion', params: {id: q.id} }">Edit</b-dropdown-item>
                    <b-dropdown-item to="#">Invite people</b-dropdown-item>
                    <b-dropdown-item to="#">Make public</b-dropdown-item>
                    <b-dropdown-item to="#" v-b-modal="'share_'+ q.id">Share</b-dropdown-item>
                    <b-dropdown-item to="#">Archive</b-dropdown-item>
                  </b-nav-item-dropdown>
                </b-navbar-nav>

                <b-modal :id="'share_'+ q.id">
                  <social-sharing :url="'https://mimoza-441ee.web.app/question/' + q.id"
                    :title="q.title"
                    :description="q.summary"
                    quote="Vue is a progressive framework for building user interfaces."
                    hashtags="vuejs,javascript,framework"
                    twitter-user="mimosa"
                    inline-template
                  >
                    <div>
                        <network network="email">
                            <i class="fa fa-envelope"></i> Email
                        </network>
                        <network network="facebook">
                          <i class="fa fa-facebook"></i> Facebook
                        </network>
                        <network network="googleplus">
                          <i class="fa fa-google-plus"></i> Google +
                        </network>
                        <network network="line">
                          <i class="fa fa-line"></i> Line
                        </network>
                        <network network="linkedin">
                          <i class="fa fa-linkedin"></i> LinkedIn
                        </network>
                        <network network="odnoklassniki">
                          <i class="fa fa-odnoklassniki"></i> Odnoklassniki
                        </network>
                        <network network="pinterest">
                          <i class="fa fa-pinterest"></i> Pinterest
                        </network>
                        <network network="reddit">
                          <i class="fa fa-reddit"></i> Reddit
                        </network>
                        <network network="skype">
                          <i class="fa fa-skype"></i> Skype
                        </network>
                        <network network="sms">
                          <i class="fa fa-commenting-o"></i> SMS
                        </network>
                        <network network="telegram">
                          <i class="fa fa-telegram"></i> Telegram
                        </network>
                        <network network="twitter">
                          <i class="fa fa-twitter"></i> Twitter
                        </network>
                        <network network="vk">
                          <i class="fa fa-vk"></i> VKontakte
                        </network>
                        <network network="weibo">
                          <i class="fa fa-weibo"></i> Weibo
                        </network> 
                        <network network="whatsapp">
                          <i class="fa fa-whatsapp"></i> Whatsapp
                        </network>
                    </div>
                  </social-sharing>
                </b-modal>
                <!-- End optional menu -->
                
                <div class="card-text" v-if="q.summary.length < 600">
                    {{q.summary}}
                </div>
                <div class="card-text" v-else>
                  {{q.summary.substring(0, 600)+ "..."}}
                </div>
                <div class="card-meta d-flex justify-content-between">
                  <div class="d-flex align-items-center">
                    <i class="material-icons mr-1" title="Number of comments">comment</i>
                    <span class="text-small">{{q.n_comments}}</span> <span>&nbsp;</span>
                    <i class="material-icons mr-1" title="Number of views">remove_red_eye</i>
                    <span class="text-small">{{q.n_views}}</span><span>&nbsp;</span>
                    <i class="material-icons mr-1" title="Number of participants">group</i>
                    <span class="text-small">{{q.n_participants}}</span><span>&nbsp;</span>
                    <i class="material-icons mr-1" title="Number of likes">favorite</i>
                    <span class="text-small">{{q.likes}}</span><span>&nbsp;</span>
                  </div>
                  <span v-if="q.modifiedOn" class="text-small">Last modified: {{q.modifiedOn | formatDate}} </span>
                  <span v-else class="text-small">Last modified: {{q.createdAt | formatDate}}</span>
                </div>
            </div>
          </div>
        </div>
        </b-tab>
      <!-- End questions -->

      <!-- Start Hypotheses -->
      <b-tab title="Hypotheses">
        <div class="card" v-for="(h, idx) in hypotheses">
          <!-- Begin: rating -->
          <!-- <div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width:80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
          </div> -->
            <!-- End rating -->
          <div class="card-body">
            <div class="card-title">
              <router-link :to="{ name: 'question', params: {id: questions_id[idx]} }">
                <h5>{{ h.title }} </h5>
              </router-link>
            </div>
            
            <!-- Card Optional menu -->
            <div class="card-options">
              <b-button href="#" class="btn-options" @click="updateHypothesis(questions_id[idx], h.id)"><i class="btn-options material-icons">edit</i></b-button>
            </div>
            
            <!-- End optional menu -->
            
            <div class="card-text" v-if="h.summary.length < 600">
                {{h.summary}}
            </div>
            <div class="card-text" v-else>
              {{h.summary.substring(0, 600)+ "..."}}
            </div>
            <div class="card-meta d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <i class="material-icons mr-1" title="Number of comments">comment</i>
              <span class="text-small">120</span> <span>&nbsp;</span>
              <i class="material-icons mr-1" title="Number of views">remove_red_eye</i>
              <span class="text-small">1k</span><span>&nbsp;</span>
              <i class="material-icons mr-1" title="Number of participants">group</i>
              <span class="text-small">15</span><span>&nbsp;</span>
            </div>
            <span v-if="h.modifiedOn" class="text-small">Last modified: {{h.modifiedOn | formatDate}} </span>
            <span v-else class="text-small">Last modified: {{h.createdAt | formatDate}}</span>
          </div>
              
            </div>
          </div>
      </b-tab>
      <!-- End Hypotheses -->

      <!-- Start Experiments -->
      <b-tab title="Experiments">
        <div class="card" v-for="(e, idx) in experiments">
          <!-- Begin: rating -->
          <!-- <div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width:80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
          </div> -->
            <!-- End rating -->
          <div class="card-body">
            <div class="card-title">
              <router-link :to="{ name: 'question', params: {id: questions_id_exp[idx]} }">
                <h5>Title of the experiment </h5>
              </router-link>
            </div>
           
            <!-- Card Optional menu -->
            <div class="card-options">
              <b-button href="#" class="btn-options" @click="updateExperiment(questions_id_exp[idx], hypotheses_id_exp[idx], e.id)"><i class="btn-options material-icons">edit</i></b-button>
            </div>
            
            <!-- End optional menu -->
            
            <h5>Methods: </h5>
              <span v-html="e.methods"/>
              <h5>Results: </h5>
              <span v-html="e.results"/>
            <div class="card-meta d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <i class="material-icons mr-1" title="Number of comments">comment</i>
              <span class="text-small">120</span> <span>&nbsp;</span>
              <i class="material-icons mr-1" title="Number of views">remove_red_eye</i>
              <span class="text-small">1k</span><span>&nbsp;</span>
              <i class="material-icons mr-1" title="Number of participants">group</i>
              <span class="text-small">15</span><span>&nbsp;</span>
            </div>
            <span v-if="e.modifiedOn" class="text-small">Last modified: {{e.modifiedOn | formatDate}} </span>
            <span v-else class="text-small">Last modified: Yesterday</span>
            <!-- <span class="text-small">Last modified: {{h.createdAt | formatDate}}</span> -->
          </div>
              
            </div>
          </div>
      </b-tab>
      <!-- End Experiments -->
    </b-tabs>
  </div>
</template>

<script>
import firebase from "firebase"
import { mapGetters } from "vuex"
import moment from "moment"
import { db } from '../main'
export default {
  name: 'userItemList2',

  computed: {
    ...mapGetters({
      user: "user"
    })

  },

  data: () => ({
    file: null,
    questions: [],
    hypotheses: [],
    experiments: [],
    questions_id: [], // Id of questions containing hypotheses of a user
    questions_id_exp: [], // Id of questions containing experiments of a user
    hypotheses_id_exp: [], // Id of hypotheses containing experiments of a user 
  }),

  filters: {
    formatDate(val) {
      if (!val) {
        return '-'
      }
      return moment(val.toDate()).fromNow()
    }
  },

  created() {
    let qRef = db.collection('questions')
      .orderBy('createdAt', 'desc')
      //.where('hidden', '==', false)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching questions.');
          return;
        } 
        snapshot.forEach(doc => {
          let question = doc.data();
          question.id = doc.id;
          if(question.userId == firebase.auth().currentUser.uid){
            this.questions.push(question);
          }
          let hypRef = db.collection('questions').doc(doc.id).collection('hypotheses').where('parent', '==', '').get().then(snapshot => {
            snapshot.forEach(doc => {
              let hyp = doc.data();
              hyp.id = doc.id;
              if(hyp.userId == firebase.auth().currentUser.uid){
                this.hypotheses.push(hyp);
                this.questions_id.push(question.id);
              }
              let expRef = db.collection('questions').doc(question.id).
              collection('hypotheses').doc(doc.id).collection('experiments').get().then(snapshot => {
                snapshot.forEach(doc => {
                  let exp = doc.data();
                  exp.id = doc.id;
                  if(exp.userId === firebase.auth().currentUser.uid) {
                    this.experiments.push(exp);
                    this.questions_id_exp.push(question.id);
                    this.hypotheses_id_exp.push(hyp.id);
                  }
                });
              }).catch(err => {
                console.log('Error getting the experiment', err);
              })
            });
          }).catch(err => {
            console.log("Error getting hypothesis", err);
          })
        });
      }).catch(err => {
        console.log('Error getting documents', err);
      });
  },

  methods: {
    readQuestion: function (question_id) {
      this.$router.push("/question/" +question_id);
    },
    updateQuestion: function (question_id) {
      this.$router.push("/updateQuestion/" +question_id);
    },
    updateHypothesis: function (q_id, hyp_id) {
      this.$router.push("/updateHypothesis/" + q_id + "/hypothesis/" + hyp_id);
    },
    updateExperiment: function (q_id, hyp_id, e_id) {
      this.$router.push("/updateExperiment/" + q_id + "/hypothesis/" + hyp_id + '/experiment/' + e_id) ;
    },

    uploadImage(name) {
        var storageRef = firebase.storage().ref();
        // File or Blob named abcd.jpg
        var file = this.file

        // Create the file metadata
        var metadata = {
        contentType: file.type
        };

        // Upload file and metadata to the object 'images/abcd.jpg'
        var uploadTask = storageRef.child('images/' + name).put(file, metadata);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

            case 'storage/canceled':
            // User canceled the upload
            break;

            case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
        }, function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                db.collection('questions').doc(name).update({
                    img: downloadURL
                }).then(() => {

                }).catch(err => {
                    console.log(err)
                })
                console.log('File available at', downloadURL);
            });
        });
    },

    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()

      this.uploadImage('mr4ltAB1oy71SNs6ymkH') // Save the image

      this.$nextTick(() => {
        this.$bvModal.hide('mr4ltAB1oy71SNs6ymkH')
      })
    }

  }
}
</script>
