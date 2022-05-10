<script setup lang="ts">
import { ImageIcon } from "../../icons";

export interface ImageUIProps {
  title: string;
  url: string;
  radius?: string;
  minHeight?: string;
}

withDefaults(defineProps<ImageUIProps>(), {
  title: "",
  url: "",
  radius: "0px",
  minHeight: "inherit",
});
</script>

<template>
  <div
    class="image-ui__container"
    :title="title"
    :style="{ borderRadius: radius }"
  >
    <div
      class="image-ui__bg"
      :style="{
        backgroundImage: `url(${url})`,
        borderRadius: radius,
        minHeight: minHeight,
      }"
    ></div>

    <ImageIcon class="image-ui__icon" />
  </div>
</template>

<style scoped>
.image-ui__container {
  background: #dee4ed;
  width: 100%;
}
.image-ui__image {
  width: 100%;
  z-index: 10;
}
.image-ui__bg {
  z-index: 10;
  display: flex;
  width: 100%;
  padding: 0;
  margin: 0;
  aspect-ratio: 1/1;
  background-size: 100%;
  background-position: center center;
  transition: all 300ms ease-in-out;
}

.image-ui__bg:hover {
  background-size: 110%;
}

.image-ui__default {
  width: 100%;
  display: flex;
  aspect-ratio: 1/1;
}

.image-ui__icon {
  width: 100%;
  z-index: 5;
  height: 25%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  fill: #9eadba;
}
</style>
