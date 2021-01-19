<template>
  <div v-if="loading" class="orbit-spinner">
    <div class="orbit"></div>
    <div class="orbit"></div>
    <div class="orbit"></div>
  </div>
</template>
<script>
import { type } from 'os'
export default {
  props: {
    loading: {
      required: false,
      type: Boolean,
      default: false
    } 
  }
}
</script>
<style scoped>
.orbit-spinner,
.orbit-spinner * {
  box-sizing: border-box;
}

.orbit-spinner {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  perspective: 800px;
  margin-right: 1rem;
}

.orbit-spinner .orbit {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.orbit-spinner .orbit:nth-child(1) {
  left: 0%;
  top: 0%;
  animation: orbit-spinner-orbit-one-animation 1200ms linear infinite;
  border-bottom: 3px solid #1565c0;
}

.orbit-spinner .orbit:nth-child(2) {
  right: 0%;
  top: 0%;
  animation: orbit-spinner-orbit-two-animation 1200ms linear infinite;
  border-right: 3px solid #1565c0;
}

.orbit-spinner .orbit:nth-child(3) {
  right: 0%;
  bottom: 0%;
  animation: orbit-spinner-orbit-three-animation 1200ms linear infinite;
  border-top: 3px solid #1565c0;
}

@keyframes orbit-spinner-orbit-one-animation {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }

  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-two-animation {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }

  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-three-animation {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }

  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>
