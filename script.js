/* =========================================================
   Hotel West24 — vanilla JS
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Sticky nav on scroll ---------- */
  var nav = document.getElementById("siteNav");
  var toTop = document.getElementById("toTop");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (y > 40) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
    if (y > 700) {
      toTop.classList.add("is-visible");
    } else {
      toTop.classList.remove("is-visible");
    }
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("burgerBtn");
  var mobileMenu = document.getElementById("mobileMenu");

  function closeMobile() {
    mobileMenu.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  function toggleMobile() {
    var open = mobileMenu.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", toggleMobile);
  mobileMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMobile);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMobile();
  });

  /* ---------- Testimonials slider ---------- */
  var testimonials = [
    {
      quote: "We landed at Dr. Babasaheb Ambedkar Airport past midnight after a delay, and the dining room still sent up a full thali. Nobody blinked. That's the whole point of this place.",
      name: "Priya Nair",
      role: "Stayed in the Executive Suite",
      initial: "P"
    },
    {
      quote: "Twenty-four rooms means the person at the desk remembers your name by the second morning. In a city like Nagpur, that kind of attention is rare.",
      name: "Rohan Deshmukh",
      role: "Stayed in Suite 24",
      initial: "R"
    },
    {
      quote: "Had an early meeting near MIHAN and the valet already had the car pulled around by 6am. I didn't ask twice — I don't think I needed to.",
      name: "Ananya Kulkarni",
      role: "Stayed in the Skyline Suite",
      initial: "A"
    },
    {
      quote: "The rooftop at 1am on a Tuesday, half-empty, the Nagpur skyline lit up past Sitabuldi — that's the memory I keep from the trip, more than anything on the itinerary.",
      name: "Kabir Shah",
      role: "Stayed in the Classic King",
      initial: "K"
    }
  ];

  var tIndex = 0;
  var quoteEl = document.getElementById("testiQuote");
  var nameEl = document.getElementById("testiName");
  var roleEl = document.getElementById("testiRole");
  var initialEl = document.getElementById("testiInitial");
  var dotsWrap = document.getElementById("testiDots");
  var prevBtn = document.getElementById("testiPrev");
  var nextBtn = document.getElementById("testiNext");
  var testiTimer = null;

  function buildDots() {
    dotsWrap.innerHTML = "";
    testimonials.forEach(function (t, i) {
      var b = document.createElement("button");
      b.setAttribute("aria-label", "Show testimonial " + (i + 1));
      if (i === tIndex) b.classList.add("active");
      b.addEventListener("click", function () {
        showTesti(i);
        restartAutoplay();
      });
      dotsWrap.appendChild(b);
    });
  }

  function showTesti(i) {
    tIndex = (i + testimonials.length) % testimonials.length;
    var t = testimonials[tIndex];
    quoteEl.style.opacity = 0;
    setTimeout(function () {
      quoteEl.textContent = "\u201C" + t.quote + "\u201D";
      nameEl.textContent = t.name;
      roleEl.textContent = t.role;
      initialEl.textContent = t.initial;
      quoteEl.style.transition = "opacity .35s ease";
      quoteEl.style.opacity = 1;
    }, 120);

    dotsWrap.querySelectorAll("button").forEach(function (b, idx) {
      b.classList.toggle("active", idx === tIndex);
    });
  }

  function restartAutoplay() {
    if (testiTimer) clearInterval(testiTimer);
    testiTimer = setInterval(function () {
      showTesti(tIndex + 1);
    }, 7000);
  }

  if (quoteEl) {
    buildDots();
    showTesti(0);
    restartAutoplay();
    prevBtn.addEventListener("click", function () {
      showTesti(tIndex - 1);
      restartAutoplay();
    });
    nextBtn.addEventListener("click", function () {
      showTesti(tIndex + 1);
      restartAutoplay();
    });
  }

  /* ---------- Gallery lightbox ---------- */
  // var lightbox = document.getElementById("lightbox");
  // var lightboxArt = document.getElementById("lightboxArt");
  // var lightboxCap = document.getElementById("lightboxCap");
  // var lightboxClose = document.getElementById("lightboxClose");

  // document.querySelectorAll(".gtile").forEach(function (tile) {
  //   tile.addEventListener("click", function () {
  //     var svg = tile.querySelector("svg");
  //     lightboxArt.innerHTML = svg ? svg.outerHTML : "";
  //     lightboxCap.textContent =
  //       (tile.getAttribute("data-title") || "") +
  //       (tile.getAttribute("data-caption") ? " — " + tile.getAttribute("data-caption") : "");
  //     lightbox.classList.add("is-open");
  //     document.body.style.overflow = "hidden";
  //   });
  // });

  // function closeLightbox() {
  //   lightbox.classList.remove("is-open");
  //   document.body.style.overflow = "";
  // }
  // lightboxClose.addEventListener("click", closeLightbox);
  // lightbox.addEventListener("click", function (e) {
  //   if (e.target === lightbox) closeLightbox();
  // });
  // document.addEventListener("keydown", function (e) {
  //   if (e.key === "Escape") closeLightbox();
  // });

  /* ---------- Booking form ---------- */
  var bookingForm = document.getElementById("bookingForm");
  var checkin = document.getElementById("checkin");
  var checkout = document.getElementById("checkout");
  var bookingConfirm = document.getElementById("bookingConfirm");

  function todayISO() {
    var d = new Date();
    return d.toISOString().split("T")[0];
  }
  if (checkin && checkout) {
    var t = todayISO();
    checkin.min = t;
    checkout.min = t;
    checkin.addEventListener("change", function () {
      checkout.min = checkin.value;
      if (checkout.value && checkout.value <= checkin.value) {
        var next = new Date(checkin.value);
        next.setDate(next.getDate() + 1);
        checkout.value = next.toISOString().split("T")[0];
      }
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!checkin.value || !checkout.value) {
        bookingConfirm.textContent = "Please choose both a check-in and check-out date.";
        bookingConfirm.classList.add("is-visible");
        return;
      }
      if (checkout.value <= checkin.value) {
        bookingConfirm.textContent = "Check-out should be after your check-in date.";
        bookingConfirm.classList.add("is-visible");
        return;
      }

      var room = document.getElementById("roomtype").value;
      var guests = document.getElementById("guests").value;
      var nights = Math.round(
        (new Date(checkout.value) - new Date(checkin.value)) / (1000 * 60 * 60 * 24)
      );

      bookingConfirm.textContent =
        "Checking " + room + " for " + guests + ", " + nights +
        (nights === 1 ? " night" : " nights") +
        " from " + checkin.value + " to " + checkout.value +
        ". Our desk will confirm shortly \u2014 any hour, day or night.";
      bookingConfirm.classList.add("is-visible");
    });
  }

  /* ---------- Newsletter (footer) ---------- */
  var newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = newsletterForm.querySelector("input");
      var btn = newsletterForm.querySelector("button");
      if (input.value) {
        btn.textContent = "Joined";
        input.value = "";
        setTimeout(function () {
          btn.textContent = "Join";
        }, 2500);
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
