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
          <div class="col-6">
            <button
              type="button"
              class="btn text-white py-2 px-4 bg-button-cc"
              @click="onClose"
            >
              {{cancelText}}
            </button>
          </div>
          <div class="col-6">
            <button
              type="button"
              @click="onSubmit"
              class="btn btn-block py-2 px-4 btn-outline-secondary bg-button-cf"
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
  name: "confirm-dialog",
  props: {
    title: {
      trpe: String,
    },
    acceptText: {
      trpe: String,
      default: "ตกลง",
    },
    cancelText: {
      trpe: String,
      default: "ยกเลิก",
    },
    active: {
      trpe: Boolean,
      required: true,
    },
  },
  computed: {},
  methods: {
    onClose() {
      this.$emit("hide", false);
    },
    onSubmit() {
      this.$emit("submit");
    },
  },
};
</script>

<style>
</style>