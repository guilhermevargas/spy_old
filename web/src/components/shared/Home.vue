<template>
	<div class="page home-page">
    <top-nav></top-nav>
		<v-container>
			<h1>container work@</h1>
		</v-container>
		<bottom-nav></bottom-nav>
	</div>
</template>

<script>
	import TopNav from './top-navigation/TopNav';
	import BottomNav from './bottom-navigation/BottomNav';

	export default {
		name: 'home',
		components: {
			TopNav,
			BottomNav
		}
	}
</script>