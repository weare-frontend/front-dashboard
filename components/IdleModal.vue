<template>
    <b-modal body-class="text-center bg-danger" no-fade hide-header hide-footer visible id="modal-footer-sm" centered   button-size="sm">
        <p class="my-2" v-if="this.time">เราทำการล็อคหน้าจอของท่านแล้ว ระบบกำลังพาท่านออกจากหน้านี้ภายใน {{this.time / 1000}} วินาที</p>
        <p class="my-2" v-if="!this.time">เราทำการล็อคหน้าจอของท่านแล้ว</p>
    </b-modal>
</template>
<script>
export default {
	data() {
		return {
			time: 10000
		}
	},
	created() {
    this.$cookies.set('lockscreen', true);
    let timerId = setInterval(() => {
      this.time -= 1000;
      if (!this.isAppIdle) clearInterval(timerId);

      if (this.time < 1) {
        clearInterval(timerId);
        this.$router.push({name : 'dashboard-lockscreen'});
        // Your logout function should be over here
      }
    }, 1000);
  }
};
</script>