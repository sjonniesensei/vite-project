<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Sign Up</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <form @submit.prevent="signUp">
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="email" type="email" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="password" type="password" required></ion-input>
        </ion-item>
        <ion-button expand="block" type="submit" class="ion-margin-top">Sign Up</ion-button>
      </form>
      <ion-button expand="block" fill="clear" @click="goToLogin">Already have an account? Log in</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'

export default defineComponent({
  name: 'Signup',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton
  },
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')

    const signUp = async () => {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
        })

        if (error) throw error

        if (data.user) {
          // Insert the user into the users table
          const { error: insertError } = await supabase
            .from('users')
            .insert({ id: data.user.id, email: data.user.email })

          if (insertError) throw insertError

          alert('Signup successful! Please check your email to confirm your account.')
          router.push('/login')
        }
      } catch (error) {
        alert(error.message)
      }
    }

    const goToLogin = () => {
      router.push('/login')
    }

    return {
      email,
      password,
      signUp,
      goToLogin
    }
  }
})
</script>