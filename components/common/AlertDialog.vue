<template>
  <b-modal
      v-model="active"
      centered
      content-class="rounded"
      header-class="shadow"
      footer-class="shadow"
      no-close-on-backdrop
      body-class="bg-body-modal"
    >
      <template v-slot:modal-header={}>
        <h5 class="text-center w-100">
          {{title}}
        </h5>
        <i
          class="f7-icons text-white multiply-circle"
          @click="onClose"
          >multiply_circle</i
        >
      </template>
      <main>
        <slot></slot>
      </main>
      <template v-slot:modal-footer="{}">
        <div class="row justify-content-center">
          <div class="col-12">
            <button
              type="button"
              @click="onSubmit"
              class="btn btn-block btn-outline-secondary bg-button-cf px-4 py-2"
            >
              {{acceptText}}
            </button>
          </div>
        </div>
      </template>
    </b-modal>
</template>

<script>
export default {
  name: "alert-dialog",
  props: {
    title: {
      trpe: String,
    },
    acceptText: {
      trpe: String,
      default: "ตกลง",
    },
    active: {
      trpe: Boolean,
      required: true,
    },
    autoHide: {
      trpe: Boolean,
      default: true,
    },
  },
  computed: {},
  methods: {
    onClose() {
      this.$emit("hide", false);
    },
    onSubmit() {
      if (this.autoHide) this.$emit("hide", false);
      this.$emit("submit");
    },
  },
};
</script>

<style>
</style>