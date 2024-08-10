<template>
  <ion-app>
    <ion-content v-if="!user">
      <ion-header>
        <ion-toolbar>
          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <form @submit.prevent="login">
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input v-model="email" type="email" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input v-model="password" type="password" required></ion-input>
          </ion-item>
          <ion-button expand="block" type="submit" class="ion-margin-top"
            >Login</ion-button
          >
        </form>
      </ion-content>
    </ion-content>
    <ion-tabs v-else>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="homeOutline"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="search" href="/search">
          <ion-icon :icon="searchOutline"></ion-icon>
          <ion-label>Search</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="upload" href="/upload">
          <ion-icon :icon="addCircleOutline"></ion-icon>
          <ion-label>Upload</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="challenges" href="/challenges">
          <ion-icon :icon="trophyOutline"></ion-icon>
          <ion-label>Challenges</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="profile" href="/profile">
          <ion-icon :icon="personOutline"></ion-icon>
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-app>
</template>

<script lang="ts">
import {
  IonApp,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonRouterOutlet,
} from "@ionic/vue";
import { defineComponent, ref, onMounted } from "vue";
import {
  homeOutline,
  searchOutline,
  addCircleOutline,
  trophyOutline,
  personOutline,
} from "ionicons/icons";
import { auth } from "./supabase";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonRouterOutlet,
  },
  setup() {
    const user = ref(null);
    const email = ref("");
    const password = ref("");

    const login = async () => {
      try {
        const { data, error } = await auth.signInWithPassword({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
        user.value = data.user;
      } catch (error) {
        console.error("Error logging in:", error.message);
      }
    };

    onMounted(async () => {
      const { data } = await auth.getUser();
      user.value = data.user;
    });

    return {
      user,
      email,
      password,
      login,
      homeOutline,
      searchOutline,
      addCircleOutline,
      trophyOutline,
      personOutline,
    };
  },
});
</script>
