<template>
  <div class="box">
            <article class="media">
                <div class="media-content">
                <div class="content">
                    <p>
                    <strong>{{ip}}</strong>
                    </p>
                </div>
                </div>
            </article>
        </div>
</template>

<script>
export default {
  name: 'iplist',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: 
    ['ip']
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
