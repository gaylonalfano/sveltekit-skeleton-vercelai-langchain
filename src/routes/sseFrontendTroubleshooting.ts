	// // U: WORKS: Yahoo Example: /api/ticker
	// let result = "";
	// async function getTickerStream() {
	//   const response = await fetch("/api/ticker");
	//   const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
	//   // console.log("reader.read(): ", await reader?.read())
	//   // { value: '<!DOCTYPE html...', done: false }
	//   while (true) {
	//     const { value, done } = await reader?.read();
	//     console.log("resp", done, value);
	//     if (done) break;
	//     result += `${value}<br>`;
	//   }
	// }

	// U: Testing out custom getStream() handler
	// REF: https://github.com/sveltejs/kit/issues/5344#issuecomment-1305711591
	const abortController = new AbortController();

	async function getChatStream() {
		const response = await fetch('/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				question,
				history: $messageStateStore.history
			}),
			signal: abortController.signal,
		});
		console.log('getStream::response: ', response);
		const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
		console.log('reader.read(): ', await reader?.read());

		// while (true) {
		//   const { value, done } = await reader?.read();
		//   console.log('read()::value,done: ', value, done);
		//   if (done) break;
		//   result += `${value}<br>`;
		// }
	}


