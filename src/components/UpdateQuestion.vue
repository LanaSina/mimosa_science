<template>
    <div v-if="question" id="question" class="container">
        <b-container fluid>
            <b-form @submit.prevent="onUpdate" @reset.prevent="onReset">
                <!-- <b-form-group id="question_global" label="Question" label-cols-lg="3"> -->
                    <h4>Question</h4>

                    <b-form-group id="question_title_group" label="Question summary*:" label-for="question_title" label-cols-sm="3">

                        <!-- <b-form-input id="question_title" type="text" v-model='this.question.title'></b-form-input> -->
                        <b-form-textarea id="question_title" rows="2"
                        max-rows="8" v-model='question.title'
                        ></b-form-textarea>

                    </b-form-group>

                    <b-form-group id="question_title" label="Details:"
                    label-for="question_summary" label-cols-sm="3"
                    description="Add some details to explain your question if you want."
                    >
                        <!-- <b-form-input id="question_summary" type="text" v-model='this.question.summary'></b-form-input> -->
                        <b-form-textarea id="question_summary" rows="2"
                        max-rows="8" v-model='question.summary'
                        ></b-form-textarea>

                    </b-form-group>

                <!-- </b-form-group> -->

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
    id : null,    
  }),
  created() {
    this.id = this.$route.params['id'];

    this.$bind('question',
        db.collection('questions')
        .doc(this.id));

//     this.$bind(
//       'hypotheses',
//       db.collection('questions')
//         .doc(this.$route.params['id'])
//         .collection('hypotheses'));
  },

    methods: {
        onUpdate() {
            this.question.modifiedOn = new Date()
            db.collection('questions').doc(this.id).update({...this.question})
            .then (function() {
                console.log("Successfully updated the document")
            })
            .catch(function(error) {
                console.log(" Error updating document", error)
            });
        },
        onReset() {
            this.$bind('question',
            db.collection('questions')
            .doc(this.id));
        }
    }
}
</script>
