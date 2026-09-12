(function () {
  const root = document.documentElement;
  const storageKey = "blender-study-theme";

  function scriptDir() {
    const current = document.querySelector("script[src$='site.js']");
    if (!current) {
      return "./";
    }
    return current.getAttribute("src").replace(/site\.js$/, "");
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(storageKey, theme);
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.textContent = theme === "dark" ? "浅色" : "深色";
      btn.setAttribute("aria-label", theme === "dark" ? "切换到浅色" : "切换到深色");
    });
  }

  function initTheme() {
    const saved = localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    });
  }

  function slugify(text, index) {
    const compact = text.replace(/\s+/g, "-").replace(/[^\w\u4e00-\u9fff-]+/g, "").slice(0, 32);
    return compact || ("section-" + (index + 1));
  }

  function headings() {
    return Array.prototype.slice.call(document.querySelectorAll("main.content h2"));
  }

  function setActive(id) {
    document.querySelectorAll("[data-page-toc] a, [data-chapters] a").forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
    });
    document.querySelectorAll("main.content .panel[id], main.content .entry[id]").forEach(function (block) {
      block.classList.toggle("is-focus", block.id === id);
    });
  }

  function initChapters() {
    const toc = document.querySelector("[data-page-toc]");
    const rail = document.querySelector("[data-chapters]");
    const items = headings();
    if (!items.length) {
      if (rail) {
        rail.hidden = true;
      }
      return;
    }

    items.forEach(function (heading, index) {
      if (!heading.id) {
        heading.id = slugify(heading.textContent, index);
      }
      const panel = heading.closest(".panel, .entry, section");
      if (panel && !panel.id) {
        panel.id = heading.id + "-block";
      }
      const href = "#" + heading.id;
      if (toc) {
        const a = document.createElement("a");
        a.href = href;
        a.textContent = heading.textContent;
        toc.appendChild(a);
      }
      if (rail) {
        const a = document.createElement("a");
        a.href = href;
        a.textContent = heading.textContent;
        rail.appendChild(a);
      }
    });

    function onScroll() {
      const marker = 140;
      let current = items[0];
      items.forEach(function (heading) {
        if (heading.getBoundingClientRect().top - marker <= 0) {
          current = heading;
        }
      });
      if (current) {
        setActive(current.id);
      }
    }

    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initSearch() {
    const input = document.querySelector("[data-search]");
    const box = document.querySelector("[data-search-results]");
    if (!input || !box) {
      return;
    }

    const local = headings().map(function (heading) {
      return {
        title: heading.textContent,
        path: "#" + heading.id,
        keywords: heading.textContent,
        local: true,
      };
    });

    let remote = [];
    fetch(scriptDir() + "search-index.json")
      .then(function (res) {
        return res.ok ? res.json() : [];
      })
      .then(function (rows) {
        remote = rows;
      })
      .catch(function () {
        remote = [];
      });

    function render(q) {
      const query = q.trim().toLowerCase();
      if (!query) {
        box.hidden = true;
        box.innerHTML = "";
        return;
      }
      const hits = local.concat(remote).filter(function (row) {
        const hay = (row.title + " " + (row.keywords || "") + " " + (row.path || "")).toLowerCase();
        return hay.indexOf(query) !== -1;
      }).slice(0, 12);
      box.innerHTML = hits.length
        ? hits
            .map(function (row) {
              const href = row.local ? row.path : scriptDir() + row.path;
              return (
                '<a href="' +
                href +
                '"><strong>' +
                row.title +
                "</strong><small>" +
                (row.local ? "本页 · " + row.path : row.path) +
                "</small></a>"
              );
            })
            .join("")
        : '<a><strong>没有匹配</strong><small>换个符号或中文词再试</small></a>';
      box.hidden = false;
    }

    input.addEventListener("input", function () {
      render(input.value);
    });
    input.addEventListener("focus", function () {
      if (input.value.trim()) {
        render(input.value);
      }
    });
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".search")) {
        box.hidden = true;
      }
    });
  }

  initTheme();
  initChapters();
  initSearch();
})();
