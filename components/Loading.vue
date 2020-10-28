<template>
  <div class="container">
    <div class="row no-gutters vh-100 loader-screen" v-show="loading">
      <div class="col align-self-center text-white text-center top-75">
        <!-- <img src="~/assets/img/logo.png" alt="logo"> -->
        <!-- <img class="logo-loading logoloader" :src="getThemeObject[2].img" alt="logo" /> -->
        <!-- <h1 class="mt-3"><span class="font-weight-light "></span>{{siteName}}</h1> -->
        <p
          class="text-mute text-uppercase small mt-4 text-white"
          style="letter-spacing: 2px;"
        >downloading..</p>
        <div class="progress">
          <div
            class="progress-bar progress-bar-striped progress-bar-animated bg-dark progressload"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo-loading {
  width: 20%;
  min-width: 150px;
}

.progress {
  margin: 0px 15%;
}
.progressload {
  left: 0;
  -webkit-animation-duration: 0.3s; /* Safari 4.0 - 8.0 */
  -webkit-animation: progressload 0.3s normal forwards ease-in-out;
  animation: progressload 0.3s normal forwards ease-in-out;
  animation-duration: 0.3s;
}
@keyframes progressload {
  0% {
    width: 10%;
  }
  100% {
    width: 100%;
  }
}
</style>


<script>
export default {
  data: () => ({
    loading: false,
    siteName: process.env.SITE_NAME
  }),

  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      setTimeout(() => {
        this.loading = false;
      }, 300);
    }
  },
  computed: {
    getThemeObject: function() {
      return this.$store.getters.getThemeObject;
    }
  }
};
</script>
