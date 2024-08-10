<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Upload Food Image</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked">Select Image</ion-label>
        <ion-input type="file" accept="image/*" @change="handleFileChange"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Caption</ion-label>
        <ion-input v-model="caption" type="text"></ion-input>
      </ion-item>
      <ion-button expand="block" @click="uploadImage" :disabled="uploading" class="ion-margin-top">
        {{ uploading ? 'Uploading...' : 'Upload' }}
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue'
import { defineComponent, ref } from 'vue'
import { supabase } from '../supabase'

export default defineComponent({
  name: 'Upload',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton
  },
  setup() {
    const file = ref(null)
    const caption = ref('')
    const uploading = ref(false)

    const handleFileChange = (event) => {
      file.value = event.target.files[0]
    }

    const uploadImage = async () => {
      if (!file.value) {
        alert('Please select an image to upload')
        return
      }

      uploading.value = true
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError) throw userError
        if (!user) throw new Error('No user logged in')

        const fileExt = file.value.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${user.id}/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file.value)

        if (uploadError) throw uploadError

        const { data: imageData, error: urlError } = await supabase.storage
          .from('images')
          .getPublicUrl(filePath)

        if (urlError) throw urlError

        const { error: insertError } = await supabase
          .from('posts')
          .insert({
            image_url: imageData.publicUrl,
            caption: caption.value,
            user_id: user.id
          })

        if (insertError) throw insertError

        alert('Image uploaded successfully!')
        file.value = null
        caption.value = ''
      } catch (error) {
        console.error('Error uploading image:', error.message)
        alert(`Error uploading image: ${error.message}`)
      } finally {
        uploading.value = false
      }
    }

    return { file, caption, uploading, handleFileChange, uploadImage }
  }
})
</script>
