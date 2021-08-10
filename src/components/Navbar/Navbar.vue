<template>
  <div>
    <v-app-bar color="" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="is_login"></v-app-bar-nav-icon>

      <!-- <v-toolbar-title class="body-1 pl-1">Support Portal</v-toolbar-title> -->
      <v-spacer v-if="!is_login"></v-spacer>
      <router-link to="/">
        <v-img src="@/assets/LOGO-main-light@2x.png" class="infobeansLogo"></v-img>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-title class="body-1" v-if="is_login">{{ welcomeMessage }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary dark>
      <v-list>
        <v-list-item-group v-model="model">
          <v-list-item
            v-for="(item, i) in navItems"
            :key="i"
            router
            :to="{ name: item.text }"
            exact
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      drawer: false,
      model: 1,
    };
  },

  methods: {},
  computed: {
    ...mapGetters({ is_login: 'Auth/is_login', emp_name: 'Auth/emp_name', navItems: 'navItems' }),
    welcomeMessage() {
      return this.is_login ? `Welcome ${this.emp_name}` : null;
    },
  },
};
</script>

<style scoped>
.infobeansLogo {
  height: auto;
  max-width: 8rem;
}
</style>
