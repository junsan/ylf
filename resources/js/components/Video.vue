<template>
  <div>
    <Modal v-model="isShow" :close="closeModal">
        <div>
            <iframe id="ytplayer" type="text/html" width="1280" height="720" autoplay
                :src="videoUrl" frameborder="0" allowfullscreen></iframe>
        </div>
        <button @click="closeModal">close</button>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const isShow = ref(false)

    function showModal () {      
      isShow.value = true
    }
    function closeModal () {
      isShow.value = false
    }
    return {
      isShow,
      showModal,
      closeModal
    }
  },
  props: {
    videoUrl: String
  }
})
</script>
