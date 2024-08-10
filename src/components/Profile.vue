<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>User Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card v-if="user">
        <ion-card-header>
          <ion-card-title>{{ user.email }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>User ID: {{ user.id }}</p>
          <p>Last Sign In: {{ formatDate(user.last_sign_in_at) }}</p>
        </ion-card-content>
      </ion-card>
      <ion-button expand="block" @click="signOut">Sign Out</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/vue'
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'

export default defineComponent({
  name: 'Profile',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
  },
  setup() {
    const user = ref(null)
    const router = useRouter()

    onMounted(async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      user.value = authUser
    })

    const signOut = async () => {
      try {
        await supabase.auth.signOut()
        router.push('/')
      } catch (error) {
        console.error('Error signing out:', error.message)
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return { user, signOut, formatDate }
  }
})
</script>