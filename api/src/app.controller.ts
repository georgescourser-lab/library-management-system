import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Header('Content-Type', 'text/html')
  getHome() {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Library Management System</title>
    <style>
      body { margin: 0; font-family: Arial, sans-serif; background: #f4f7fb; color: #17233c; }
      main { max-width: 760px; margin: 64px auto; padding: 32px; background: white; border-radius: 16px; box-shadow: 0 12px 36px rgba(23,35,60,.10); }
      h1 { margin-top: 0; }
      .status { display: inline-block; padding: 8px 12px; border-radius: 999px; background: #dcfce7; color: #166534; font-weight: bold; }
      code { background: #eef2f7; padding: 3px 6px; border-radius: 4px; }
    </style>
  </head>
  <body>
    <main>
      <span class="status">Server running</span>
      <h1>Library Management System</h1>
      <p>The local application server is ready.</p>
      <p>Health endpoint: <a href="/api/health"><code>/api/health</code></a></p>
    </main>
  </body>
</html>`;
  }

  @Get('api/health')
  getHealth() {
    return { status: 'ok', service: 'library-management-system' };
  }
}
