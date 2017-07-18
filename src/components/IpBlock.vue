<template>
<div>
    <ipform :blockedips="this.blockedips" :blockedclasses="this.blockedclasses" :ax="this.ax" ></ipform>
    <section class="section">
        <h3>Blocked IPs</h3>
        <!--<div class="container">
            <iplist v-for="(ip,index) in blockedips" v-bind:key="index"></iplist>
        </div>-->
        <div class="container">
            <div class="ipitem" v-for="(ip,index) in blockedips" v-bind:key="index"><span class="iptext">{{ip.RowKey}}</span><i class="fa fa-times remove-button" v-on:click="deleteip(ip,index)"></i></div>
            
        </div>
    </section>
    <section class="section">
        <h3>Blocked Classes</h3>
        <!--<div class="container">
            <iplist v-for="(ip,index) in blockedips" v-bind:key="index"></iplist>
        </div>-->
        <div class="container">
            <div class="ipitem" v-for="(clas,index) in blockedclasses" v-bind:key="index"><span class="iptext">{{clas}}</span><i class="fa fa-times remove-button" v-on:click="deleteclas(clas,index)"></i></div>
            
        </div>
    </section>
</div>
</template>

<script>
import ipform from '@/components/IpForm'
import iplist from '@/components/IpList'
import axios from 'axios'
export default {
    name: "ipblock",
    components: {ipform,iplist},
    data () {
        return {
            ax: axios.create({
                    baseURL: 'https://ipblockerapi.azurewebsites.net',
                    headers: {'secret':'123'}
            }),
            blockedips: [],
            blockedclasses: []
        }
    },
    mounted () {
        this.ax.get('/ip').then((res)=>{
            this.blockedips = res.data
        }).catch((err)=>{
            console.log(err)
        })

        this.ax.get('/ipclass').then((res)=>{
            this.blockedclasses = res.data
        }).catch((err)=>{
            console.log(err)
        })
    },
    methods: {
        deleteip: function(ip,index) { 
            this.ax.delete('/ip/'+encodeURIComponent(ip.PartitionKey)+'/'+encodeURIComponent(ip.RowKey)).then((res)=>{
                this.blockedips.splice(index,1)
            }).catch((err)=>{
                console.log(err)
            })
        },

        deleteclas: function(clas,index) {
            console.log(clas)
            this.ax.delete('/ipclass/'+clas).then((res)=>{
                this.blockedclasses.splice(index,1)
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>
    .center {
        display: flex;
        justify-content: center;
        flex-direction: column;
        
    }


    .remove-button {
        float: left;
        opacity: 0;
         transition: opacity .3s ease-in-out;
    }

    div.ipitem:hover>.remove-button {
        opacity: 1;
    }

    .remove-button:hover {
        color: #c00;
    }

    .iptext {
        font-size: 19px;
        margin-left: 10px;
    }
</style>
<style scoped>
    .section {
        width: 50%;
        float: left;
    }
</style>