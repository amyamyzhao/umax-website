(function () {
  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector("[data-nav-links]");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "Close" : "Menu";
      document.body.classList.toggle("menu-open", isOpen);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
        document.body.classList.remove("menu-open");
      });
    });
  }

  var filterButtons = document.querySelectorAll("[data-filter]");
  var filterCards = document.querySelectorAll("[data-category]");

  if (filterButtons.length && filterCards.length) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var selected = button.getAttribute("data-filter");

        filterButtons.forEach(function (item) {
          item.classList.remove("is-active");
          item.setAttribute("aria-pressed", "false");
        });

        button.classList.add("is-active");
        button.setAttribute("aria-pressed", "true");

        filterCards.forEach(function (card) {
          var categories = card.getAttribute("data-category").split(" ");
          var visible = selected === "all" || categories.indexOf(selected) !== -1;
          card.classList.toggle("is-hidden", !visible);
        });
      });
    });
  }
})();
