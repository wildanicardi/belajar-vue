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
    login() {}
  }
};
</script>

<style></style>
