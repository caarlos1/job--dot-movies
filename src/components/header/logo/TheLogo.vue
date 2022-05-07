<script setup lang="ts">
export interface LogoProps {
  title: string;
  url?: string;
  logoImage?: string;
  uppercase?: boolean;
}

withDefaults(defineProps<LogoProps>(), {
  url: "",
  uppercase: false,
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
