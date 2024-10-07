<template>
  <div id="app">
    <div v-if="loading" id="loading-overlay"></div>
    <div v-if="message" id="message-box" class="fade-out" :class="{ 'warn' : warning, 'info' : !warning }">{{ message }}</div>
    <router-view @loading="loading=!loading" @message="displayMessage" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      message: '',
      warning: null,  
    }
  },
  methods: {
    displayMessage(msg) {
      this.message = msg.message
      this.warning = msg.warning
      setTimeout(() => {
        this.message = ''
      }, 3000)
    }
  }
}
</script>

<style lang="scss">
$green: rgb(66, 177, 66);
$green-light: rgba(66, 177, 66, 0.3);
$red: rgb(222, 64, 64);

#loading-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: wait;
  z-index: 100;
}

#message-box {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-50%);
  color: white;
  border-radius: 8px;
  padding: 25px;
  z-index: 100;
  animation: fadeIn 400ms ease-in-out;
}

.warn {
  background: $red;
}

.info {
  background: $green;
}

#app {
  font-family: "Manrope", sans-serif;
  color: #333;
}

button {
  border: none;
  background-color: $green;
  color: white;
  width: 100px;
  height: 36px;
  border-radius: 4px;
  align-self: center;
  box-shadow: 0 6px 6px -2px $green-light;
  transition: all 50ms;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from { 
    top: 0;
    opacity: 0;
  }
  to { 
    top: 20px;
    opacity: 1 
  }
}
</style>