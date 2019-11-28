<template>
	<div id="app">
		<navbar></navbar>
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

<style>
#app {
  font-family: 'Josefin Slab', serif;
}
#context {
  font-family: 'Garamond', serif;
  font-style: italic;
}
</style>
