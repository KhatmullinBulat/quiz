export const foo = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <header>
      <div class="container flex">
        <div class="flex items-center gap-[65px]">
          <img src="" alt="logo" />
          <p>mail@blanko.com</p>
        </div>

        <nav>
          <ul>
            <li>
              <a href=""> Landing </a>
            </li>
            <li>
              <a href=""> All pages </a>
            </li>
            <li>
              <a href=""> Template </a>
            </li>
          </ul>
        </nav>

        <button>Purchase template</button>
      </div>
    </header>

    <main>
      <!-- тут бэкраунд в сектион -->
      <section>
        <div class="container">
          <h1>Blanko template</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio mauris
            porttitor amet volutpat.
          </p>
          <div>
            <button>Purchase template</button>
            <button>Other templates</button>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <!-- так как в макете нет и h3 не может быть до h2 -->
          <h2 class="hidden"></h2>
          <div>
            <img src="" alt="" />
            <div>
              <h3>Speed</h3>
              <p>Open a commercial-grade current account from anywhere</p>
            </div>
          </div>
          <div>
            <img src="" alt="" />
            <div>
              <h3>Speed</h3>
              <p>Open a commercial-grade current account from anywhere</p>
            </div>
          </div>
          <div>
            <img src="" alt="" />
            <div>
              <h3>Speed</h3>
              <p>Open a commercial-grade current account from anywhere</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <h2>Landing pages</h2>

          <div class="flex flex-wrap gap-[10px]">
            <div>
              <img src="" alt="" />
              <h3>Типо блок</h3>
            </div>
            <div>
              <img src="" alt="" />
              <h3>Типо блок</h3>
            </div>
            <div>
              <img src="" alt="" />
              <h3>Типо блок</h3>
            </div>
            <div>
              <img src="" alt="" />
              <h3>Типо блок</h3>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="black">
      <div class="container flex justify-beetwen">
        <div class="flex flex-col justify-beetwen">
          <h3>blanko</h3>
          <p>чето там</p>
          <p>чето там</p>
        </div>

        <div class="flex flex-col justify-beetwen">
          <button>Get on Webflow</button>
          <div>
            <button>Иконка</button>
            <button>Иконка</button>
            <button>Иконка</button>
          </div>
          <p>Contact</p>
        </div>
      </div>
    </footer>
  </body>
</html>
`