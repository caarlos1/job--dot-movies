<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    default: "",
  },
  logoImage: {
    type: String,
    required: true,
  },
  uppercase: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="logo__container">
    <a :href="url" :title="title" :class="{ disabled: !url }" class="logo__url">
      <img
        v-if="logoImage"
        :src="logoImage"
        :alt="title"
        :title="title"
        class="logo__image"
      />
      <h1
        v-show="!logoImage"
        class="logo__title"
        :class="{ uppercase: uppercase }"
      >
        {{ title }}
      </h1>
    </a>
  </div>
</template>

<style scoped>
.logo__container {
  display: flex;
  width: 100%;
}
.logo__title {
  font-size: 3.5rem;
  line-height: 3.5rem;
  font-weight: 900;
}
.uppercase {
  text-transform: uppercase;
}

.logo__image {
  height: 3.5rem;
}

.disabled {
  pointer-events: none;
}
</style>
