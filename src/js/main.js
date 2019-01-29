const teste = function () {

    const d = document.createElement("div");
    d.className = "github-box";

    const a = document.createElement("a");
    a.href = "https://github.com/gnutzmann/html5-gulp-boilerplate.git";
    a.innerText = "Diogo Gnutzmann Santos";

    const s = document.createElement("div")
    s.innerHTML = 'Copyleft <span class="copyleft-symbol">&copy;</span>';

    d.appendChild(a);
    d.appendChild(s);

    const e = document.querySelector(".footer").appendChild(d);
}

teste()
