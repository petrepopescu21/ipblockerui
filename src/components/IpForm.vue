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
                <p v-if="!ip.valid" class="help is-danger">This input is invalid. Enter either an IP address or IP class in the CIDR format.</p>
            </p>
           
        </div>
         <button v-on:click="addip" :disabled="ip.empty||!ip.valid" class="button is-success is-large">{{buttonText}}</button>
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
                    empty: true,
                    class: true
                },
                ipregex: new RegExp(/^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/),
                classregex: new RegExp(/^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))$/),
                output: ""
            }
        },
        props: ['ax','blockedips','blockedclasses'],
        watch: {
            addr() {
                this.ip.valid = this.ipregex.test(this.addr) || this.addr==""
                this.ip.class = this.classregex.test(this.addr)
                this.ip.empty = (this.addr=="")
            }
        },
        methods: {
            debounceInput: _.debounce(function () {
                this.addr = this.input
            }, 200),
            addip: function() {
                this.ax.post(this.endpoint,{
                    ip: this.addr
                }).then((res)=>{
                    if(this.endpoint=="/ip")
                        this.blockedips.push({"RowKey":this.addr,"PartitionKey":res.data})
                    if(this.endpoint=="/ipclass")
                        this.blockedclasses.push(this.addr)
                    this.addr=""
                    this.input=""
                    this.output=res.data
                }).catch((error)=>{
                    this.output=error
                    console.log(error)
                })
            }
        },
        computed: {
            buttonText: function() {
                if(this.ip.empty==true)
                    return "Type class or IP"
                if(this.ip.class==true)
                    return "Block IP class"
                else return "Block IP address"
            },
            endpoint: function() {
                if(this.ip.class==true)
                    return "/ipclass"
                else
                    return "/ip"
            }
        }
    }
</script>
