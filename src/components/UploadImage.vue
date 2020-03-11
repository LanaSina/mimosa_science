<template>
  <div>
    <!-- Styled -->
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      accept=".jpg, .png"
    ></b-form-file>
    <div class="mt-2"></div>
    <!-- <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
    <b-button @click="uploadImage">Submit</b-button> -->
  </div>
</template>

<script>
    import firebase from "firebase"
    import {db} from '../main'
    
    export default {
    name: 'UploadImage',

    data() {
      return {
        file: null
      }
    },

    methods: {
        getMetadata() {
            console.log(this.file)
            console.log(this.file.type)
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
        }
    }
  }
</script>