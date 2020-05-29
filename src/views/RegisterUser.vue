<template>
  <div>
    <form @submit.prevent="register">
      <BaseInput
        label="Name"
        v-model="user.name"
        type="text"
        placeholder="Add a Name"
        class="field"
      />
      <BaseInput
        label="Email"
        v-model="user.email"
        type="text"
        placeholder="Add a email"
        class="field"
      />
      <BaseInput
        label="Password"
        v-model="user.password"
        type="password"
        placeholder="Add a password"
        class="field"
      />
      <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>
      <router-link :to="{ name: 'login' }" style="margin-top:8px">
        Already Have an account? Login.
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("user/register", this.user)
        .then(() => {
          this.$router.push({ name: "dashboard" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
