<template>
  <div class="all">
    <form class="card" @submit.prevent="submitForm">
      <div class="label">Авторизация</div>
      <div class="input"> <!-- username -->
        <img src="../assets/icons/phone.svg" height="25">
        <span class="placeholder" :class="{ 'error-color' : error }">Логин или Телефон</span>
        <input type="text" placeholder=" " v-model="username" @input="unsetError">
      </div>
      <div class="input"> <!-- password -->
        <img src="../assets/icons/lock.svg" height="25">
        <span class="placeholder" :class="{ 'error-color' : error }">Пароль</span>
        <input type="password" placeholder=" " v-model="password" @input="unsetError">
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {

  data() {
    return {
      username: '',
      password: '',
      error: null
    }
  },

  methods: {
    ...mapMutations(['setKey']),
    async submitForm() {
      try 
      {
        if (!this.username || !this.password) { this.error = 'Есть пустые поля'; return }
        this.$emit('loading')
        // Login POST Request
        const response = await axios.post('https://dev.moydomonline.ru/api/auth/login/', {
          username: this.username,
          password: this.password
        })
        // Setting the access token
        this.setKey(response.data.key)
        this.$emit('loading')
        this.$router.push('/')
      } 
      catch { this.error = 'Неверные данные' }
    },
    unsetError() { this.error = null }
  }
}
</script>

<style lang="scss" scoped>
$green: rgb(66, 177, 66);
$green-light: rgba(66, 177, 66, 0.3);
$red: rgb(222, 64, 64);

.all {
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  left: 0;
  top: 0; 
  background: url(../assets/bg.webp);
}

.card {
  margin: auto;
  background-color: white;
  width: 340px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  gap: 40px;
  padding: 24px;
  border-radius: 10px;

  .input {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 5px;
    border-bottom: 1px solid #bbb;

    img {
      flex: 1px;
    }

    input {
      flex: 10;
      border: none;
      background: none;
      height: 40px;

      &:focus {
        outline: none;
      }
    }

    $placeholder-offset: -52px;

    .error-color {
      color: $red !important;
    }

    .placeholder {
      position: absolute;
      margin-left: 38px;
      font-size: 15px;
      transition: all 100ms;
      pointer-events: none;
      color: #aaa;
    }

    &:has(input:not(:placeholder-shown)) .placeholder {
      margin-top: $placeholder-offset;
      color: $green;
    }

    &:has(input:focus) .placeholder {
      margin-top: $placeholder-offset;
      color: $green;
    }
  }
  
  .label {
    align-self: center;
    width: 100%;
    background-color: $green;
    border-radius: 6px;
    position: relative;
    top: -45px;
    padding: 20px 0;
    text-align: center;
    color: white;
    margin-bottom: -26px;
    font-size: 18px;
  }

  .error {
    text-align: center;
    background-color: $red;
    color: white;
    margin-top: -24px;
  }
}
</style>
