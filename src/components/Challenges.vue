<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Food Challenges</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="challenge in challenges" :key="challenge.id">
          <ion-label>
            <h2>{{ challenge.restaurant_name }}</h2>
            <p>{{ challenge.description }}</p>
            <p><strong>Deal:</strong> {{ challenge.deal_text }}</p>
            <p><strong>Valid:</strong> {{ formatDate(challenge.start_date) }} - {{ formatDate(challenge.end_date) }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="presentModal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
    <ion-modal :is-open="isModalOpen">
      <ion-header>
        <ion-toolbar>
          <ion-title>Create New Challenge</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="dismissModal">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="floating">Restaurant Name</ion-label>
          <ion-input v-model="newChallenge.restaurant_name" type="text"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Description</ion-label>
          <ion-textarea v-model="newChallenge.description"></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Deal</ion-label>
          <ion-input v-model="newChallenge.deal_text" type="text"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Start Date</ion-label>
          <ion-datetime v-model="newChallenge.start_date" display-format="MMM DD, YYYY"></ion-datetime>
        </ion-item>
        <ion-item>
          <ion-label position="floating">End Date</ion-label>
          <ion-datetime v-model="newChallenge.end_date" display-format="MMM DD, YYYY"></ion-datetime>
        </ion-item>
        <ion-button expand="block" @click="createChallenge" class="ion-margin-top">Create Challenge</ion-button>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonModal, IonButtons, IonButton, IonInput, IonTextarea, IonDatetime } from '@ionic/vue'
import { defineComponent, onMounted, ref } from 'vue'
import { add } from 'ionicons/icons'
import { supabase } from '../supabase'

export default defineComponent({
  name: 'Challenges',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonModal, IonButtons, IonButton, IonInput, IonTextarea, IonDatetime
  },
  setup() {
    const challenges = ref([])
    const isModalOpen = ref(false)
    const newChallenge = ref({
      restaurant_name: '',
      description: '',
      deal_text: '',
      start_date: '',
      end_date: ''
    })

    const fetchChallenges = async () => {
      try {
        const { data, error } = await supabase
          .from('challenges')
          .select('*')
          .order('start_date', { ascending: true })
        
        if (error) throw error
        challenges.value = data
      } catch (error) {
        console.error('Error fetching challenges:', error.message)
      }
    }

    const createChallenge = async () => {
      try {
        const { error } = await supabase
          .from('challenges')
          .insert(newChallenge.value)

        if (error) throw error

        alert('Challenge created successfully!')
        newChallenge.value = {
          restaurant_name: '',
          description: '',
          deal_text: '',
          start_date: '',
          end_date: ''
        }
        dismissModal()
        fetchChallenges()
      } catch (error) {
        console.error('Error creating challenge:', error.message)
        alert('Error creating challenge. Please try again.')
      }
    }

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const presentModal = () => {
      isModalOpen.value = true
    }

    const dismissModal = () => {
      isModalOpen.value = false
    }

    onMounted(fetchChallenges)

    return { 
      challenges, 
      newChallenge, 
      createChallenge, 
      formatDate, 
      isModalOpen, 
      presentModal, 
      dismissModal,
      add
    }
  }
})
</script>