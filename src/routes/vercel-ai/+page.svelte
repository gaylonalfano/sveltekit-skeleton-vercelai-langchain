<script>
  // BROKEN at vercel ai version 2.1.13
	import { useCompletion } from 'ai/svelte';

	const { input, handleSubmit, completion } = useCompletion();
</script>

<div>
	<p>Completion result: {$completion}</p>
	<form on:submit={handleSubmit}>
		<input bind:value={$input} style="text-color: black"/>
		<button type="submit">Send</button>
	</form>
</div>
