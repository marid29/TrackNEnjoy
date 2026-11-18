<template>
  <div>
    <input type="file" @change="onFileChange" />
    <img v-if="imageUrl" :src="imageUrl" alt="Profile Picture" />
  </div>
</template>

<script>
export default {
  name: 'subirFotoDePerfil',
  data() {
    return {
      imageUrl: null,
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      if (file && file.type.includes('image')) {
        this.imageUrl = URL.createObjectURL(file);
      } else {
        alert('Please select an image file.');
      }
    },
  },
};
</script>

<style scoped>
img {
  max-width: 200px;
  max-height: 200px;
  border-radius: 50%;
}
</style>