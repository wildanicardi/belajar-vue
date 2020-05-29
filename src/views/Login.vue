<template>
  <div>
    <form @submit.prevent="login">
      <BaseInput
        label="Email"
        v-model="user.email"
        type="text"
        placeholder="email"
        class="field"
      />
      <BaseInput
        label="Password"
        v-model="user.password"
        type="password"
        placeholder="password"
        class="field"
      />
      <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>
      <router-link :to="{ name: 'register' }">
        Don't Have an account? Register
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("user/login", this.user);
        await this.$router.push({ name: "dashboard" });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
