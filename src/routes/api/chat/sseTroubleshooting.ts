
// Another example of ReadableStream:
// REF: https://twitter.com/isaiah_p_taylor/status/1638224818435919872
const encoder = new TextEncoder();
const readable = new ReadableStream({
  start(controller) {
    controller.enqueue(encoder.encode('Basic Streaming Test'))
    controller.close()
  }
})
return new Response(readable, {
  headers: {
    'Content-Type': 'text/html; charset=utf-8'
  }
})


// U: For SK, I'm 99% sure I need to return a Response that passes
// a ReadableStream in the body, based on what I've read.
// NOTE: load() cannot be used since their responses are JS/JSON serialized.
// However, can use endpoint to return Response object, which can be constructed
// from a ReadableStream.
// REF: https://github.com/sveltejs/kit/issues/5344
// REF: https://stackoverflow.com/questions/74330190/how-to-respond-with-a-stream-in-a-sveltekit-server-load-function#74336207
const ac = new AbortController();

const stream = new ReadableStream({
  start(controller) {
    // Q: How to 'listen' for a new event? Is there an 'onmessage' event?
    // Connected to handleLLMNewToken() at all?
    // Q: Can I call the handleLLMNewToken()?
    // controller.enqueue(`data: ${model.callbackManager.handleLLMNewToken(token)}\n\n`)
    CallbackManager.fromHandlers({
      async handleLLMNewToken(token) {
        controller.enqueue(`data: ${token}\n\n`)
      }
    }),
      { signal: ac.signal }
  },
  cancel() {
    console.log("cancel and abort");
    ac.abort();
  },
})

return new Response(stream, {
  headers: {
    'Content-Type': 'text/event-stream',
  }
})

