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
						max-rows="8" v-model='hypothesis.title'
						></b-form-textarea>

					</b-form-group>

					<b-form-group id="hypothesis_summary_group" label="Details:"
					label-for="hypothesis_summary" label-cols-sm="3"
					description="Add some details to explain your hypothesis if you want."
					>
						<b-form-textarea id="hypothesis_summary" rows="2"
						max-rows="8" v-model='hypothesis.summary'
						></b-form-textarea>

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
		question:null,
		hypothesis: null,
		q_id : null,   
		h_id: null 
	}),

	created() {
		this.q_id = this.$route.params['q_id'];
		this.h_id = this.$route.params['h_id']

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
	},

		methods: {
			onUpdate() {
				db.collection('questions').doc(this.q_id)
					.collection('hypotheses').doc(this.h_id)
					.update({...this.hypothesis})
				.then (function() {
					console.log("Successfully updated the document")
				})
				.catch(function(error) {
					console.log(" Error updating document", error)
				});
			},
			onReset() {
				this.$bind(
				'hypothesis',
				db.collection('questions')
					.doc(this.q_id)
					.collection('hypotheses')
					.doc(this.h_id)
				);
			}
		}
}
</script>
