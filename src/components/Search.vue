<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Search</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-searchbar placeholder="Search for food images..." v-model="searchQuery" @ionChange="performSearch"></ion-searchbar>
      <ion-list>
        <ion-item v-for="result in searchResults" :key="result.id">
          <ion-thumbnail slot="start">
            <img :src="result.image_url" :alt="result.caption" />
          </ion-thumbnail>
          <ion-label>{{ result.caption }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonList, IonItem, IonThumbnail, IonLabel } from '@ionic/vue'
import { defineComponent, ref } from 'vue'
import { supabase } from '../supabase'

export default defineComponent({
  name: 'Search',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonList, IonItem, IonThumbnail, IonLabel
  },
  setup() {
    const searchQuery = ref('')
    const searchResults = ref([])

    const performSearch = async () => {
      if (searchQuery.value.length < 3) {
        searchResults.value = []
        return
      }

      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .ilike('caption', `%${searchQuery.value}%`)
          .order('created_at', { ascending: false })
        
        if (error) throw error
        searchResults.value = data
      } catch (error) {
        console.error('Error performing search:', error.message)
      }
    }

    return { searchQuery, searchResults, performSearch }
  }
})
</script>