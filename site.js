(function () {
  var nav = document.querySelector(".site-nav");
  var toggle = document.getElementById("nav-toggle");
  if (nav && toggle) {
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") toggle.checked = false;
    });
  }

  document.querySelectorAll("[data-carousel]").forEach(function (wrap) {
    var track = wrap.querySelector(".carousel-track");
    var prev = wrap.querySelector(".prev");
    var next = wrap.querySelector(".next");
    if (!track) return;
    function scrollByDir(dir) {
      var amount = Math.min(track.clientWidth * 0.8, 360);
      track.scrollBy({ left: dir * amount, behavior: "smooth" });
    }
    if (prev) prev.addEventListener("click", function () { scrollByDir(-1); });
    if (next) next.addEventListener("click", function () { scrollByDir(1); });
  });

  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  var box = document.getElementById("lightbox");
  if (!items.length || !box) return;
  var img = document.getElementById("lightbox-image");
  var cap = document.getElementById("lightbox-caption");
  var index = 0;

  function openAt(i) {
    index = (i + items.length) % items.length;
    var photo = items[index].querySelector("img");
    img.src = photo.src;
    img.alt = photo.alt;
    cap.textContent = photo.alt;
    box.hidden = false;
    document.body.classList.add("lightbox-open");
    box.querySelector(".lightbox-close").focus();
  }
  function close() {
    box.hidden = true;
    document.body.classList.remove("lightbox-open");
  }

  items.forEach(function (btn, i) {
    btn.addEventListener("click", function () { openAt(i); });
  });
  box.addEventListener("click", function (e) {
    if (e.target.getAttribute("data-close")) close();
  });
  var prevBtn = box.querySelector(".lightbox-prev");
  var nextBtn = box.querySelector(".lightbox-next");
  if (prevBtn) prevBtn.addEventListener("click", function () { openAt(index - 1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { openAt(index + 1); });
  document.addEventListener("keydown", function (e) {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") openAt(index - 1);
    if (e.key === "ArrowRight") openAt(index + 1);
  });
})();
