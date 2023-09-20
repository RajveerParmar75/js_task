function set_data(params) {
  const main = document.getElementById("main");
  switch (params) {
    case "section1":
      main.innerHTML = `
            <section class="section1">
              <h1>this is section 1</h1>
            </section>`;
      break;

    case "section2":
      main.innerHTML = `
              <section class="section2">
                <h1>this is section 2</h1>
              </section>`;
      break;

    case "section3":
      main.innerHTML = `
              <section class="section3">
                <h1>this is section 3</h1>
              </section>`;
      break;
    default:
      break;
  }
}
