<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Food Feed</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="post in posts" :key="post.id">
          <ion-card>
            <img :src="post.image_url" :alt="post.caption" />
            <ion-card-content>
              <p>{{ post.caption }}</p>
            </ion-card-content>
          </ion-card>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonCard, IonCardContent } from '@ionic/vue'
import { defineComponent, onMounted, ref } from 'vue'
import { supabase } from '../supabase'

export default defineComponent({
  name: 'Home',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonCard, IonCardContent
  },
  setup() {
    const posts = ref([])

    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) throw error
        posts.value = data
      } catch (error) {
        console.error('Error fetching posts:', error.message)
      }
    }

    onMounted(fetchPosts)

    return { posts }
  }
})
</script>