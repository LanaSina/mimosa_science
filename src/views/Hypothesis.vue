<template>
	<div class="home">
		<b-breadcrumb class="bg-white">
			<b-breadcrumb-item> 
				<router-link to="/">Home</router-link> 
			</b-breadcrumb-item>
			<b-breadcrumb-item>
				<router-link :to="{ name: 'question', params: {id: q_id} }" 		   v-if="question"> Question: {{ question.title }}
				</router-link>
			</b-breadcrumb-item>
		</b-breadcrumb>

		<div class="container">
			<h1 v-if="hypothesis">
						Hypothesis: {{ hypothesis.title }}
			</h1>

			<p v-if="hypothesis" v-html="hypothesis.summary"> </p>
			<p>
				<b-button class="btn btn-light" @click="changeShowSub()" >Show/Hide sub-hypotheses</b-button>
			</p>
			<div v-if="show_sub">
				<span v-if="sub_contents.length>0">
					Sub-hypotheses:
				</span>
				<span v-else>
					No sub-hypotheses.
				</span>
				<div id="sub_hypothesis" v-for="(sh, idx) in sub_contents">
					<router-link :to="{ name: 'hypothesis', params: {id: sh.id, q_id:q_id} }">
						{{ sh.title }}
					</router-link>
				</div>
			</div>

			<ExperimentsList v-if="hypothesis && question" v-bind:question='question' v-bind:hypothesis='hypothesis'/>
			<h2>blabla</h2>
			
			<b-button v-b-modal="'my-modal'">Add your hypothesis (Modal)</b-button>

			<b-modal id="my-modal" size="xl" title="Add your hypothesis">
				<Form v-bind:question='question' v-bind:hypothesis='hypothesis'/>
			</b-modal>
			
			<br/><b-button v-b-toggle.collapse>Add your hypothesis (Toggle Collapse)</b-button>

			<b-collapse id="collapse">
				<Form v-bind:question='question' v-bind:hypothesis='hypothesis'/>
			</b-collapse>

			<!-- <Form v-bind:question='question' v-bind:hypothesis='hypothesis'/> -->
		</div>
	</div>
</template>

<script>
import Form from '@/components/Form.vue'
import {db} from '../main';
import ExperimentsList from '@/components/ExperimentsList.vue'

export default {
	name: 'home',
	components: {
		Form,
		ExperimentsList,
	},
	data: () => ({
		h_id : null,
		q_id : null,
		question: null,
		hypothesis: null,
		show_sub: false,
		sub_contents: [],
	}),
	created() {
		this.setVariables();
	},
	watch: {
		'$route' (to, from) {
			if (to.params.h_id !== from.params.h_id) {

				//clear variables
				this.clearVariables();

				//update
				this.setVariables();
			}
	 }
	},
	methods: {
		clearVariables () {
			this.question = null;
			this.hypothesis = null;
			this.show_sub = false;
			this.sub_contents = [];
		},
		setVariables () {
			this.h_id = this.$route.params['h_id'];
			this.q_id = this.$route.params['q_id']

			this.$bind('hypothesis',
				db.collection('questions')
				.doc(this.q_id)
				.collection('hypotheses')
				.doc(this.h_id));

			this.$bind('question',
				db.collection('questions')
				.doc(this.q_id));
		},
		changeShowSub: function () {
			//get the sub-hypotheses titles
		let subRef = db.collection('questions')
			.doc(this.q_id)
			.collection('hypotheses');
		subRef.where('parent', '==', this.h_id).get()
			.then(snapshot => {
					if (snapshot.empty) {
						console.log('No matching documents.');
						return;
					} 
					let sub_hypotheses = []
					snapshot.forEach(doc => {
						let hyp = doc.data();
						hyp.id = doc.id;
						sub_hypotheses.push(hyp);
					});
					
					this.sub_contents = sub_hypotheses;

				})
				.catch(err => {
					console.log('Error getting documents', err);
				});

				this.show_sub = !this.show_sub;
		}
	},
}
</script>

