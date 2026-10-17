import "styles/global.css";

export default function GlobalNotFound() {
  return (
    <html lang="ru">
      <body>
        <section className="wrapper-main py-4.5 md:py-5 xl:py-6 h-svh w-full overflow-hidden">
          <div className="flex flex-col justify-start items-center gap-32 md:gap-36 xl:gap-32 h-full">
            <div className="flex justify-between items-start gap-14 md:gap-60 xl:gap-72 w-full">
              <a
                className="flex justify-center items-center gap-1.5 text-2.5xl md:text-4xl xl:text-7xl uppercase font-instrument"
                href="/"
              >
                <span className="font-helvetica text-arrow-sm">←</span>
              </a>
              <div className="text-8xl md:text-10xl xl:text-14xl leading-24 md:leading-40 xl:leading-76 grid grid-cols-4 xl:grid-cols-11 grid-rows-2 xl:grid-rows-1 gap-6 md:gap-0 w-full justify-items-stretch">
                <span className="col-start-2 xl:col-start-2 col-span-1">4</span>
                <span className="col-start-4 xl:col-start-7 col-span-2">0</span>
                <span className="col-start-4 xl:col-start-[-1] col-span-2">
                  4
                </span>
              </div>
            </div>
            <div className="md:grid md:grid-cols-6 xl:grid-cols-12 w-full">
              <div className="flex flex-col justify-between items-start gap-9 md:gap-6 w-full md:col-start-4 xl:col-start-8 md:col-span-3">
                <p className="text-indent text-0.5xl leading-5">
                  Страница не найдена. Возможно, она была перемещена или
                  удалена.
                </p>
                <div className="flex justify-start items-start gap-5 md:gap-11 xl:gap-12 lowercase">
                  <a
                    href="/"
                    className="text-0.5xl relative inline-block before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-1 before:left-0 before:bg-black"
                  >
                    Главная
                  </a>
                  <a
                    href="/portfolio/"
                    className="text-0.5xl relative inline-block before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-1 before:left-0 before:bg-black"
                  >
                    Портфолио
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
