<template>
  <div id="app">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            IP Blocker
          </h1>
          <h2 class="subtitle">
            Wixstars
          </h2>
        </div>
      </div>
    </section>
    <!--<navbar></navbar>-->
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'app',
  components: {Navbar},
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
  '$route' (to, from) {
    const toDepth = to.path.length
    const fromDepth = from.path.length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
}
</script>

<style>
  body {
    font-family: 'Yantramanav', sans-serif;
  }
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.child-view {
  width: 100%;
  position: absolute;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
