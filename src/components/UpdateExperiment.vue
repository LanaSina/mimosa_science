<template>
	<div v-if="question" id="question">
		<b-container fluid>
			<b-form @submit.prevent="onUpdate" @reset.prevent="onReset">
				<b-form-group id="question_global" label="Question" label-cols-lg="3">

					<b-form-group id="question_title_group" label="Question summary*:" label-for="question_title" label-cols-sm="3">

						<b-form-textarea id="question_title" rows="2"
						max-rows="8" v-model='question.title' disabled
						></b-form-textarea>

					</b-form-group>

					<b-form-group id="question_title" label="Details:"
					label-for="question_summary" label-cols-sm="3"
					description="Add some details to explain your question if you want."
					>
						<b-form-textarea id="question_summary" rows="2"
						max-rows="8" v-model='question.summary' disabled
						></b-form-textarea>

					</b-form-group>

				</b-form-group>

				<b-form-group id="hypothesis_global" label="Hypothesis" label-cols-lg="3" v-if="hypothesis">

					<b-form-group id="hypothesis_title_group" label="Hypothesis*:" label-for="hypothesis_title" label-cols-sm="3">

						<b-form-textarea id="hypothesis_title" rows="2"
						max-rows="8" v-model='hypothesis.title' disabled
						></b-form-textarea>

					</b-form-group>

					<b-form-group id="hypothesis_summary_group" label="Details:"
					label-for="hypothesis_summary" label-cols-sm="3"
					description="Add some details to explain your hypothesis if you want."
					>
						<b-form-textarea id="hypothesis_summary" rows="2"
						max-rows="8" v-model='hypothesis.summary' disabled
						></b-form-textarea>

					</b-form-group>

				</b-form-group>

				<b-form-group id="experiment_global" label="Experiment" label-cols-lg="3" >

					<b-form-group id="methods" label="Methods:" label-for="experiment_methods"
					label-cols-sm="3" description="Describe how you performed the experiment to test this hypothesis." 
					>
					<wysiwyg id="experiment_methods" v-model='experiment.methods'/>
					</b-form-group>

					<b-form-group id="results" label="Results:" label-for="experiment_results"
					label-cols-sm="3" description="What were the results of the experiment, and did the results support / go against the hypothesis?" 
					>
					<wysiwyg id="experiment_results" v-model='experiment.results'/>
					</b-form-group>

				</b-form-group>

				<b-button type="submit" variant="primary">Update</b-button>
				<b-button type="reset" variant="danger">Reset</b-button>

			</b-form>

		</b-container>
	</div>
</template>

<script>
import {db} from '../main';


export default {
	data: () => ({
		question: null,
		hypothesis: null,
		experiment: null,
		q_id : null,   
		h_id: null,
		e_id: null
	}),

	created() {
		this.q_id = this.$route.params['q_id'];
		this.h_id = this.$route.params['h_id'];
		this.e_id = this.$route.params['e_id'];

		this.$bind(
			'question',
			db.collection('questions').doc(this.q_id)
		);

		this.$bind(
		'hypothesis',
		db.collection('questions')
			.doc(this.q_id)
			.collection('hypotheses')
			.doc(this.h_id)
		);

		this.$bind(
			'experiment',
			db.collection('questions')
				.doc(this.q_id)
				.collection('hypotheses')
				.doc(this.h_id)
				.collection('experiments')
				.doc(this.e_id)
		);
	},

	methods: {
		onUpdate() {
			db.collection('questions').doc(this.q_id)
				.collection('hypotheses').doc(this.h_id)
				.collection('experiments').doc(this.e_id)
				.update({...this.experiment})
			.then (function() {
				console.log("Successfully updated the document")
			})
			.catch(function(error) {
				console.log(" Error updating document", error)
			});
		},
		onReset() {
			console.log('reset');
		}
	}
}
</script>
