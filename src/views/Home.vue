<template>
  <div class="home">
    <h1>Welcome to the App!</h1>
    <template v-if="!loggedIn">
      <div>
        To use the app, you'll need to
        <router-link :to="{ name: 'login' }">
          Login
        </router-link>
        or
        <router-link :to="{ name: 'register' }">
          Register
        </router-link>
      </div>
    </template>
  </div>
</template>

<script>
import { authComputed } from "../store/helpers";
export default {
  computed: {
    ...authComputed
  }
};
</script>
