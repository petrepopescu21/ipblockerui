<template>
    <section class="hero is-light">
        <div class="hero-body">
        <div class="container">
        <div class="field">
            <h2 class="title">Enter IP address to begin</h2>
            <p class="control has-icons-right">
                <input class="input is-large" v-bind:class="{ 'is-danger': !ip.valid }" v-on:input="debounceInput" v-model="input" type="text" placeholder="127.0.0.1">
                
                <span v-if="!ip.valid" class="icon is-small is-right">
                <i class="fa fa-warning"></i>
                </span>
                <p v-if="!ip.valid" class="help is-danger">This IP is invalid</p>
            </p>
           
        </div>
         <a :disabled="ip.empty||!ip.valid" class="button is-success is-large">Click to begin</a>
        </div>
        </div>
    </section>
</template>

<script>
    import _ from 'lodash'
    import validator from 'validate-ip'
    export default {
        name: "ipform",
        data () {
            return {
                input: "",
                addr: "",
                ip: {
                    valid: true,
                    empty: true
                }
                
            }
        },
        watch: {
            addr() {
                this.ip.valid = validator(this.addr)
                this.ip.empty = (this.addr=="")
            }
        },
        methods: {
            debounceInput: _.debounce(function () {
                this.addr = this.input
            }, 500)
        }
    }
</script>
