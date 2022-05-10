<script setup lang="ts">
import { computed } from "vue";
import ButtonUI from "../../ui/button/ButtonUI.vue";
import { HeartIcon, StarIcon } from "../../icons";
import ImageBoxUI from "../../ui/image/ImageBoxUI.vue";

export interface ProductCardProps {
  id: number;
  title: string;
  cover?: string;
  date?: string;
  genre?: string;
  stars?: number;
  price?: number;
  liked?: boolean;
  disabled?: boolean;
  addButton?: string;
}

defineEmits(["card:add", "card:favorite"]);

const props = withDefaults(defineProps<ProductCardProps>(), {
  liked: false,
  disabled: false,
  addButton: "Adicionar",
});

const favoriteClass = computed(() => ({
  liked: props.liked,
}));

const dateClass = computed(() => ({
  "no-cover": !props.cover,
}));

const formatedPrice = computed(() =>
  props.price ? `R$ ${props.price.toFixed(2).replace(".", ",")}` : ""
);
</script>

<template>
  <div class="product-card__container">
    <div class="product-card__header">
      <div class="product-card__favorite" :class="favoriteClass">
        <HeartIcon
          class="heart-icon"
          @click="() => $emit('card:favorite', { ...props })"
        />
      </div>

      <ImageBoxUI
        :url="cover"
        :title="title"
        radius="10px 10px 0px 0px"
        minHeight="150px"
      />

      <span v-if="date" class="product-card__date" :class="dateClass">
        {{ date }}
      </span>
    </div>

    <div class="product-card__info">
      <div class="product-card__about">
        <h3 class="about__title">{{ title }}</h3>
        <div v-if="genre || stars" class="about__desc">
          <span v-if="stars" class="about__star">
            <StarIcon class="star-icon" />
            <span class="star__number">{{ stars }}</span>
          </span>
          <span v-if="genre" class="about__genre">{{ genre }}</span>
        </div>
        <span v-if="formatedPrice" class="product__price">
          {{ formatedPrice }}
        </span>
      </div>

      <div class="product-card__button">
        <ButtonUI
          :label="addButton || 'Adicionar'"
          size="lg"
          full
          radius
          :disabled="props.disabled"
          @click="() => $emit('card:add', { ...props })"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card__container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0px 4px 19px rgba(0, 0, 0, 0.1));
  text-align: center;
  border-radius: 10px;
}

@media (max-width: 600px) {
  .product-card__container {
    filter: none;
    border: 1px solid #dee4edca;
  }
}

.product-card__header {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 10px 10px 0 0;
  background: #dee4ed;
}
.product-card__favorite {
  z-index: 10;
  position: absolute;
  right: 20px;
  top: 20px;
}

.product-card__date {
  z-index: 15;
  width: 100%;
  position: absolute;
  bottom: 2rem;
  right: 0;
  left: 0;
  color: #fff;
  font-size: 2rem;
}

.no-cover {
  color: var(--color-text);
}

.product-card__favorite {
  z-index: 15;
}
.product-card__favorite .heart-icon {
  height: 3.5rem;
  fill: #fff;
  transition: all 100ms ease;
  cursor: pointer;
}

.product-card__favorite .heart-icon:hover {
  transform: scale(120%);
}

.product-card__favorite .heart-icon:active {
  transform: scale(110%);
}

.liked .heart-icon {
  fill: #e91e63;
}

.product-card__info {
  padding: 10px;
  display: flex;
  flex-direction: column;

  border-top: 0;
  border-radius: 0 0 10px 10px;
  gap: 10px;
  background: #fff;
}

.product-card__about {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
}

.about__title {
  width: 100%;
  font-size: 2.5rem;
  line-height: 2.5rem;
  font-weight: 700;
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.about__desc {
  font-size: 2rem;
  padding: 5px;
  display: flex;
  gap: 15px;
  align-items: center;
}

.about__star {
  font-weight: 700;
  font-size: 2.2rem;
  line-height: 2.2rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.about__star .star-icon {
  height: 2.2rem;
  fill: #fbc02d;
}

.product__price {
  padding: 5px;
  font-size: 2rem;
}
</style>
