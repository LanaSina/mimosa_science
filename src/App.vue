<template>
    <div id="app">
        <navbar ></navbar>
        <main class="py-4">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import navbar from "./components/Navbar";
export default {
    components: {
        navbar
    }
};
</script>

<style lang="scss">
    
    // Import custom SASS variable overrides, or alternatively
    // define your variable overrides here instead
    // @import 'scss/custom.scss';

    // Import Bootstrap and BootstrapVue source SCSS files
    // @import '~bootstrap/scss/bootstrap.scss';
    // @import '~bootstrap-vue/src/index.scss';

    @import './assets/css/theme.css';


</style>

