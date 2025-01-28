<script lang="ts">
	import '../app.css';
	import "@fontsource-variable/outfit";
	import "@fontsource-variable/roboto-slab"
	let { children } = $props();
</script>

<div class="w-screen h-screen bg-background text-white p-4">
{@render children()}
</div>
