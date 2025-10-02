<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { Movie } from '../models/movies';
import { getMovies } from '../services/movie.services';
import { BASE_URL } from '../services/services.config';
import { useAuth } from 'vue-auth3';

const allMovies: Ref<Array<Movie>> = ref([]);

getMovies()
  .then(response => allMovies.value = response)
  .catch(error => console.error("Error when getting movies: ", error))

const auth = useAuth();

const makeLogout = ()=>{
  auth.logout();
}
</script>

<template>
  <button @click="makeLogout">BOTÃO LOGOUT</button>
  <main class="w-screen h-auto min-h-screen flex flex-column align-items-center justify-content-start">
    <section class="banner w-screen flex flex-row align-items-center justify-content-center">
      <div class="banner-info flex flex-row align-items-center justify-content-center">
        <div class="info-content flex flex-column align-items-start justify-content-center">
          <img class="fadeClass"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Daredevil_Logo.svg/1280px-Daredevil_Logo.svg.png"
            alt="Movie Logo" />
          <div class="fadeClass rating flex flex-row align-items-center justify-content-start">
            <i class="m-1 w-auto pi pi-star-fill"></i>
            <i class="m-1 w-auto pi pi-star-fill"></i>
            <i class="m-1 w-auto pi pi-star-fill"></i>
            <i class="m-1 w-auto pi pi-star-fill"></i>
            <i class="m-1 w-auto pi pi-star-fill"></i>
            <span>2016 2 temporadas</span>
          </div>
          <p class="fadeClass">
            Matt Murdock foi vítima de um acidente que o deixou cego quando adolescente, mas que também o dotou de
            superpoderes sensoriais.
          </p>
        </div>
      </div>

      <img class="logoManflix fadeClass" src="/manflix.png" alt="Logo" />

      <div class="banner-image">
        <img class="fadeClass" src="https://files.tecnoblog.net/wp-content/uploads/2022/02/demolidor-edited.jpeg"
          alt="Movie" />
      </div>
    </section>

    <section class="movies w-screen h-auto flex flex-column align-items-start justify-content-center">
      <div class="categories">

        <div class="movies-category">
          <section id="section">            
            <div v-for="(movie, id) in allMovies" :key="id" class="item">
              <img :src="movie.photo" alt="movie" />
            </div>
          </section>
        </div>
      </div>
    </section>    
  </main>

</template>

<style scoped lang="scss">
$height-banner: 52vh;
$width-banner-image: 55vw;

main {
  background-color: var(--background-banner);
  color: var(--placeholder-field-color);

  .banner {
    height: $height-banner;
    background-color: var(--background-banner);

    .logoManflix {
      position: absolute;
      top: 10px;
      right: 50vw;
      width: 105px;
      height: 65px;
      z-index: 100;
    }

    .banner-info {
      height: 100%;
      width: calc(100vw - $width-banner-image);

      .info-content {
        width: 80%;
        height: 80%;

        img {
          width: 150px;
          height: 80px;
        }

        i {
          color: var(--background-btn-color);
        }
      }
    }

    .banner-image {
      height: 100%;
      width: $width-banner-image;

      img {
        width: 100%;
        height: 100%;
        -webkit-mask-image: linear-gradient(to right,
            transparent 0%,
            black 11%);
        mask-image: linear-gradient(to right, transparent 0%, black 11%);
      }
    }
  }

  .movies {
    $itemGrow: 1.2;
    $duration: 250ms;

    min-height: calc(100vh - $height-banner);
    scroll-behavior: smooth;

    .movies-category {
      display: grid;
      grid-template-columns: repeat(3, 100%);
      overflow: hidden;
      scroll-behavior: smooth;

      section {
        width: 100%;
        position: relative;
        display: grid;
        grid-template-columns: repeat(5, auto);
        margin: 20px 0;

        .item {
          cursor: pointer;
          padding: 0 2px;
          transition: $duration all;

          &:hover {
            margin: 0 40px;
            transform: scale($itemGrow);
          }

          img {
            height: 250px;
          }
        }

        a {
          position: absolute;
          color: white;
          text-decoration: none;
          font-size: 5rem;
          background-color: black;
          width: 80px;
          height: 330px;
          padding: 20px;
          text-align: center;
          z-index: 1;

          &:nth-of-type(1) {
            top: 0;
            bottom: 0;
            left: 0;
            background: linear-gradient(-90deg,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 1) 100%);
          }

          &:nth-of-type(2) {
            top: 0;
            bottom: 0;
            right: 0;
            background: linear-gradient(90deg,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 1) 100%);
          }

          .arrowContainer {
            /* background-color: red; */
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
}

.fadeClass {
  animation: fadeIn 5s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.fav {
  /* position: absolute; */
  bottom: 20px;
  /* bottom: 0;
  right: 0;
  left: 0; */
  width: 50px;
  height: 50px;
}
</style>
