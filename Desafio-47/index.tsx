/*
 * deno run --allow-net --allow-read servest.ts
 * OR
 * deno run --allow-net --allow-read https://raw.githubusercontent.com/tomanagle/deno-http-servers/master/servest.ts
 * Docs: https://github.com/keroxp/servest
 */
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();
const colorList: Array<string> = [];

app.post("/api/color/:color", (req: object | null, res)=>{
  const { color } = req.params
  colorList.push(color)
  res.send(colorList)
})

app.handle("/", async (req, res) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body>
          <form action="/api/color" method="post">
            <input type="text" name="color" id="color"/>
            <button type="submit">Send Color</button>
          </form>
          <ul>
            {
              res.map((color)=>{
                return (
                  <li>{color}</li>
                )
              })
            }
          </ul>
        </body>
      </html>,
    ),
  });
});

app.listen({ port: 8899 });