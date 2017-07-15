<template>
    <div class="nav">
        <div class="nav-center">
            <router-link to="/" class="nav-item is-tab">
                Blocked IPs
            </router-link>
            <router-link to="/blockip" class="nav-item is-tab ">
                Block a new IP
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'navbar'
    }
</script>