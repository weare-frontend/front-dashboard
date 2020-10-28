<template>
    <div>
        <div class="container">
            <div class="form-group">
              <select v-model="themeColor">
                <option disabled value="">Please select one</option>
                <option value="red-theme theme-dark">red-theme theme-dark</option>
                <option value="pink-theme theme-dark">pink-theme theme-dark</option>
                <option value="yellow-theme theme-dark">yellow-theme theme-dark</option>
                <option value="green-theme theme-dark">green-theme theme-dark</option>
                <option value="deeporange-theme theme-dark">deeporange-theme theme-dark</option>
                <option value="deeppurple-theme theme-dark">deeppurple-theme theme-dark</option>
                <option value="lightblue-theme theme-dark">lightblue-theme theme-dark</option>
                <option value="lime-theme theme-dark">lime-theme theme-dark</option>
                <option value="purple-theme theme-dark">purple-theme theme-dark</option>
                <option value="blue-theme theme-dark">blue-theme theme-dark</option>
                <option value="gray-theme theme-dark">gray-theme theme-dark</option>
                <option value="black-theme theme-dark">black-theme theme-dark</option>
                <option value="teal-theme theme-dark">teal-theme theme-dark</option>
                <option value="orange-theme theme-dark">orange-theme theme-dark</option>
                <option value="orange-theme ">orange-theme </option>
              </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data : () => ({
        themeColor : 'orange-theme theme-dark'
    }),
    head() {
    return {
         htmlAttrs: {
            class: this.themeColor,
         }
    }
  },
}
</script>