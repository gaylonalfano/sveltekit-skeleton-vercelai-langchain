import type {
  RequestHandler,
  RequestEvent,
} from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import YahooFinanceTicker from "yahoo-finance-ticker";


const ticker = new YahooFinanceTicker();

export const GET = (({ request }) => {
  const ac = new AbortController();

  console.log("GET api: yahoo-finance-ticker")
  const stream = new ReadableStream({
    start(controller) {
      (async () => {
        const tickerListener = await ticker.subscribe(["BTC-USD"]);
        tickerListener.on("ticker", (ticker) => {
          console.log(ticker.price); // 28612.015625
          controller.enqueue(String(ticker.price));
        }, { signal: ac.signal });
      })().catch(err => console.error(err));
    },
    cancel() {
      console.log("cancel and abort");
      ticker.unsubscribe();
      ac.abort();
    },
  })

  return new Response(stream, {
    headers: {
      'content-type': 'text/event-stream',
    }
  });

}) satisfies RequestHandler;
