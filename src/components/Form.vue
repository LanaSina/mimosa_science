<template>

	<b-container fluid>

		<b-form @submit="onSubmit" @reset="onReset" v-if="show && signed_in">

			<!-- <b-form-group id="question_global" label="Question" > -->
				<h4>Question</h4>
				<b-form-group id="question_title_group" label="Question summary*:" label-for="question_title" label-cols-sm="3">

					<b-form-input v-if='question' id="question_title" type="text" :disabled=true v-model='this.question.title'></b-form-input>
					<b-form-input v-else id="question_title" type="text" placeholder="required" v-model='question_data.title' required></b-form-input>

				</b-form-group>

				<b-form-group id="question_title" label="Details:"
					label-for="question_summary" label-cols-sm="3"
					description="Add some details to explain your question if you want."
				>

					<b-form-input v-if='question' id="question_summary" type="text" :disabled=true v-model='this.question.summary'></b-form-input>
					<b-form-input v-else id="f_question_summary" type="text" v-model='question_data.summary'></b-form-input>

				</b-form-group>

			<!-- </b-form-group> -->


			<!-- <b-form-group id="hypothesis-global" label="Hypothesis" > -->
				<h4>Hypothesis</h4>
				<b-form-group id="hypothesis_title_group" label="Hypothesis*:" label-for="hypothesis_title" label-cols-sm="3">

					<b-form-input v-if='hypothesis' id='hypothesis_title' type="text" :disabled=true v-model='this.hypothesis.title'></b-form-input>
					<b-form-input v-else id='hypothesis_title' type="text" placeholder="required" v-model='hypothesis_data.title' required></b-form-input>

				</b-form-group>

				<b-form-group id="hypothesis_summary_group" label="Details:"  
						label-for="hypothesis_summary" label-cols-sm="3"
						description="Add some details to explain your hypothesis if you want."
					>
						<b-form-input v-if='hypothesis' id='hypothesis_summary' type="text" :disabled=true v-model='this.hypothesis.summary'></b-form-input>
						<b-form-input v-else id='hypothesis_summary' type="text" v-model='hypothesis_data.summary' ></b-form-input>

				</b-form-group>

			<!-- </b-form-group> -->


			<!-- <b-form-group id="experiment_global" label="Experiment" > -->
				<h4>Experiment</h4>
				<b-form-group id="methods" label="Methods:" label-for="experiment_methods"
				 label-cols-sm="3" description="Describe how you performed the experiment to test this hypothesis." 
				 >
					<wysiwyg id="experiment_methods" v-model='experiment_data.methods'/>
				</b-form-group>

				<b-form-group id="results" label="Results:" label-for="experiment_results"
				 label-cols-sm="3" description="What were the results of the experiment, and did the results support / go against the hypothesis?" 
				 >
					 <wysiwyg id="experiment_results" v-model='experiment_data.results'/>
				</b-form-group>

			<!-- </b-form-group> -->

				<b-button type="submit" variant="primary">Submit</b-button>
				<b-button type="reset" variant="danger">Reset</b-button>

			</b-form>

		</b-container>

</template>

<script>
import {db} from '../main';
import { firestore } from 'firebase';
const firebase = require('firebase/app');
require('firebase/auth');

export default {
	name: 'InputForm',
	props: {
		question: {
				type: Object
		},
		hypothesis: {
				type: Object
		},
	},
	data: () => ({
			signed_in: false,
			//not quite sure why but this var is recommended in the doc
			show: true,
			hypothesis_data: {
				title: '',
				summary: '',
				parent: '',
				createdAt: '',
				userId: '',
			},
			question_data: {
				title: '',
				summary: '',
				hidden: false,
				createdAt: '',
				userId: '',
				likes: 0,
				n_comments: 0,
			},
			experiment_data: {
				methods: '',
				results: '',
				createdAt: '',
				userId: '',
			},
	}),
	mounted: function() {
		firebase.auth().onAuthStateChanged( this.onUserLogin );
	},
	methods: {
		onUserLogin: function( user ) {
			if (user) {
				//display form
				this.signed_in = true;
			} else {
				// User is signed out.
				this.signed_in = false;
			}
		},
		onSubmit(evt) {
			evt.preventDefault()
			var navigate = this.$router;

			if(this.question != null){
				//the question already exists
				if(this.hypothesis != null){
					//the hyp also exists
					//add experiment
					if(this.experiment_data.methods){
						this.experiment_data.userId = firebase.auth().currentUser.uid;
						this.experiment_data.createdAt = firestore.FieldValue.serverTimestamp();
						this.addExperimentToHypothesis(this.question.id, this.hypothesis.id, this.experiment_data);
					}
				} else if(this.hypothesis_data.title) {
					this.hypothesis_data.userId = firebase.auth().currentUser.uid;
					this.hypothesis_data.createdAt = firestore.FieldValue.serverTimestamp();
					this.addHypothesisToQuestion(this.question.id, this.hypothesis_data, this.experiment_data)
				}
				
			} else {
				this.question_data.createdAt = firestore.FieldValue.serverTimestamp();
				this.question_data.userId = firebase.auth().currentUser.uid;
				let add_question = db.collection('questions').add(this.question_data)
					.then(ref => {
						console.log('Added question with ID: ', ref.id);
						let q_id = ref.id;
						// Initialize the number of views, comments, and participants to 0 after creating a new question
						db.collection('questions').doc(q_id).set({
							n_comments: 0,
							n_views: 0,
							n_participants: 0,
						})

						//add hypothesis
						if(this.hypothesis_data.title){
							this.hypothesis_data.userId = firebase.auth().currentUser.uid;
              				this.experiment_data.userId = firebase.auth().currentUser.uid;
							this.hypothesis_data.createdAt = firestore.FieldValue.serverTimestamp();
							this.experiment_data.createdAt = firestore.FieldValue.serverTimestamp();
							this.addHypothesisToQuestion(q_id, this.hypothesis_data, this.experiment_data)
						} else {
							navigate.push('/');
						}
					});
			}    
		},
		addHypothesisToQuestion(q_id, h_data, e_data){
			let add_hypothesis = db.collection('questions').doc(q_id).collection('hypotheses').add(h_data)
				.then(ref => {
					console.log('Added hypothesis with ID: ', ref.id);

					// Increment the number of items of this question
					this.incrementNumberOfComments(q_id);		

					let h_id = ref.id;
					//add experiment
					if(e_data.methods){
						this.addExperimentToHypothesis(q_id, h_id, e_data);
					} else {
						this.$router.push('/');
					}
				});
		},
		addExperimentToHypothesis(q_id, h_id, e_data){
			let add_experiment = db.collection('questions').doc(q_id)
										.collection('hypotheses').doc(h_id)
										.collection('experiments').add(e_data)
				.then(ref => {
					console.log('Added experiment with ID: ', ref.id);
					// Increment the number of items of this question
					this.incrementNumberOfComments(q_id);
					this.$router.push('/');
				});
		},

		incrementNumberOfComments(question_id) {
			db.collection('questions').doc(question_id).get().then(doc => {
				let n_comments = doc.data().n_comments

				db.collection('questions').doc(question_id).update({
					n_comments: n_comments + 1
				}).then(() => {

				}).catch(err => {
					console.log(err)
				})
			}).catch(err => {
				console.log(err)
			})
		},

		onReset(evt) {
			evt.preventDefault()
			// Reset form values
			this.question_data.title = ''
			//this.form.f_hypothesis = ''
			// Trick to reset/clear native browser form validation state
			this.show = false
			this.$nextTick(() => {
				this.show = true
			})
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
textarea {
	rows: 3
}
</style>
