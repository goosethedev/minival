<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/outfit';
	import '@fontsource-variable/roboto-slab';
	let { children } = $props();
</script>

<div class="h-screen w-screen bg-background p-4 text-white">
	{@render children()}
</div>
