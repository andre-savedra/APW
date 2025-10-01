<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuth } from 'vue-auth3';
const auth = useAuth()

const user = reactive({
    username: '',
    password: '',
})

const errorMessage = ref("");

const login = ()=> {
  console.log("trying to login... ", user);
  auth.login({
    data: {
      email: user.username,
      password: user.password
    }, 
    
  }).catch(error=>{
    errorMessage.value = "Login inválido!"
    console.error("error: ", error);

    setTimeout(()=>{
    errorMessage.value = "";
    },5000);
  });
}
</script>

<template>
  <main>
    <header>
      <img class="manflixLogo" src="/manflix.png" alt="ManFlix" />
    </header>
    <div class="loginContainer manflix-flexcolumn">
      <form v-on:submit.prevent="login" class="login pl-4 pr-4 w-8 md:w-3">
        <h2 class="mb-3 sm:mb-4">Login</h2>
        <input
          type="email"
          class="loginField w-full pl-3 mb-3 h-2rem"
          required
          placeholder="Email"
          v-model="user.username"
          v-on:input=""          
        />
        <input
          type="password"
          class="loginField w-full pl-3 mb-3 h-2rem"
          required
          placeholder="Password"
          v-model="user.password"
          v-on:input=""          
        />
        <p v-if="errorMessage !== ''" class="error-message text-center">{{ errorMessage }}</p>        
        <button class="loginField buttonLogin mb-2 mt-5 h-2rem sm:h-3rem">
          Entrar
        </button>
        <div class="remember manflix-flexrow justify-content-between">
          <div>
            <input type="checkbox" checked id="check" />
            <label for="check"> Lembre-se de mim</label>
          </div>
          <a href="#">Precisa de Ajuda?</a>
        </div>
      </form>
    </div>
    <footer></footer>
  </main>
  
</template>

<style lang="scss" scoped>
$header-height: 10vh;
$footer-height: 16vh;

.error-message{
  color: red;
}

main {
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  max-width: 100vw;

  background-image: url("/login_background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  header {
    width: 100vw;
    height: $header-height;
    min-height: 60px;

    .manflixLogo {
      height: 90%;
      width: 150px;
      margin-left: 10px;
    }
  }

  .loginContainer {
    width: 100vw;
    height: calc(100vh - $footer-height - $header-height);

    .login {
      width: 25vw;
      height: 90%;
      background-color: var(--dark-transparent-color);
      color: white;
      padding-top: 35px;
      padding-bottom: 35px;

      .loginField {
        border: none;
        border-radius: 3px;
        color: white;
        outline: 0;
        background-color: var(--background-field-color);

        &::placeholder {
          color: var(--placeholder-field-color);
          font-size: 14px;
          font-family: "NetflixSansRegular";
        }
      }

      .buttonLogin {
        background-color: var(--background-btn-color);
        cursor: pointer;
        &:hover {
          background-color: var(--background-btn-color-hover);
        }
      }

      .remember {
        font-size: 11px;        
        input {
          margin-left: 5px;
          width: auto;
          color: var(--placeholder-field-color);
        }
        label {
          width: auto;
          color: var(--placeholder-field-color);
        }
        a {
          margin-right: 5px;
          width: auto;
          text-decoration: none;
          color: var(--placeholder-field-color);
        }
      }

      .errorMessage{
        color: var(--background-btn-color);
        font-size: 12px;        
        width: 100%;
        text-align: center;
        margin-top: 10px;
      }
    }
  }

  footer {
    width: 100vw;
    height: $footer-height;
    background-color: var(--dark-transparent-color);
  }
}



@media screen and (max-width: 265px) {
  header {
    background-color: var(--dark-transparent-color) !important;
  }
  .loginContainer {
    height: calc(100vh - $header-height) !important;
  }
  .login {
    width: 100vw !important;
    height: 100vh !important;
  }
  h2 {
    color: white !important;
  }

  footer {
    display: none !important;
  }
}
</style>
