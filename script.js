"use strict";

/* =========================================
   HANSI'S SWEET 16
   A BROTHER'S CUT
========================================= */

const $ = (selector) => document.querySelector(selector);

const introScreen = $("#introScreen");
const mainContent = $("#mainContent");

const music = $("#birthdayMusic");
const musicButton = $("#musicButton");
const musicLabel = $("#musicLabel");

const particleLayer = $("#particleLayer");
const confettiLayer = $("#confettiLayer");

const gallery = $("#memoryGallery");
const lightbox = $("#lightbox");
const lightboxImage = $("#lightboxImage");
const lightboxTitle = $("#lightboxTitle");
const lightboxDescription = $("#lightboxDescription");
const lightboxCounter = $("#lightboxCounter");

let musicPlaying = false;
let currentPhoto = 0;
let candlesBlown = false;
let giftOpened = false;
let letterOpened = false;

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


/* =========================================
   1. THE 16 BIRTHDAY MEMORIES
========================================= */

const memories = [
  {
    title: "The Beginning of Everything 💗",
    description: "The first chapter of a beautiful family story.",
    effect: "polaroid"
  },
  {
    title: "The Tiny Troublemaker 😂",
    description: "Some things never change, thankfully.",
    effect: "film"
  },
  {
    title: "Our Favourite Smile",
    description: "One smile capable of brightening an entire room.",
    effect: "glow"
  },
  {
    title: "The Gossip Department 👀",
    description: "Confidential information. Extremely important meetings.",
    effect: "film"
  },
  {
    title: "Chocolate Enthusiast 🍫",
    description: "A passion that deserves its own documentary.",
    effect: "glow"
  },
  {
    title: "The Family Star ✨",
    description: "The person who makes ordinary days extraordinary.",
    effect: "polaroid"
  },
  {
    title: "Little Adventures",
    description: "A thousand little moments worth remembering.",
    effect: "film"
  },
  {
    title: "The Iconic Expressions",
    description: "No caption can fully explain these expressions.",
    effect: "glow"
  },
  {
    title: "A Little Chaos",
    description: "The kind of chaos we wouldn't trade for anything.",
    effect: "polaroid"
  },
  {
    title: "Growing Up",
    description: "Sixteen years of becoming your own wonderful person.",
    effect: "film"
  },
  {
    title: "The Unstoppable Hansi",
    description: "Always bringing her own personality into every room.",
    effect: "glow"
  },
  {
    title: "A Moment Worth Keeping",
    description: "Some memories deserve a permanent place in our hearts.",
    effect: "polaroid"
  },
  {
    title: "Our Family, Our Story",
    description: "The people and moments that make life feel like home.",
    effect: "film"
  },
  {
    title: "Sixteen Candles",
    description: "A brand-new chapter begins today.",
    effect: "glow"
  },
  {
    title: "The Birthday Girl",
    description: "Today, the spotlight belongs entirely to you.",
    effect: "polaroid"
  },
  {
    title: "Forever Our Hansi ❤️",
    description: "The final frame of this chapter. The beginning of countless more.",
    effect: "glow"
  }
];


/* =========================================
   2. CINEMATIC INTRO
========================================= */

$("#enterButton").addEventListener("click", async () => {
  introScreen.classList.add("exit");

  mainContent.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: reducedMotion ? "instant" : "smooth"
  });

  createConfetti(70);
  createFireworks(3);

  // Browsers require a user interaction before audio can play.
  try {
    await music.play();
    musicPlaying = true;
    updateMusicButton();
  } catch (error) {
    musicPlaying = false;
    updateMusicButton();
  }

  setTimeout(() => {
    introScreen.style.display = "none";
  }, 1100);
});


/* =========================================
   3. MUSIC CONTROLS
========================================= */

function updateMusicButton() {
  musicLabel.textContent = musicPlaying ? "Music On" : "Music Off";

  $("#musicIcon").textContent = musicPlaying ? "♫" : "♪";

  musicButton.classList.toggle("playing", musicPlaying);
}

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicPlaying = true;
    } catch (error) {
      musicPlaying = false;
      alert("Please add your birthday music file to assets/birthday.mp3");
    }
  } else {
    music.pause();
    musicPlaying = false;
  }

  updateMusicButton();
});


/* =========================================
   4. HERO BUTTONS
========================================= */

$("#beginButton").addEventListener("click", () => {
  $("#memories").scrollIntoView({
    behavior: reducedMotion ? "instant" : "smooth"
  });

  createConfetti(35);
});

$("#teaseButton").addEventListener("click", () => {
  alert(
    "OFFICIAL BROTHER'S NOTICE 😂\n\n" +
    "Your birthday is today.\n" +
    "Your gossip privileges remain active.\n" +
    "Your chocolate tax is still pending.\n\n" +
    "Happy birthday, Hansi! 💗"
  );

  createHearts(15);
});


/* =========================================
   5. CREATE THE 16 PHOTO CARDS
========================================= */

memories.forEach((memory, index) => {
  const number = String(index + 1).padStart(2, "0");

  const card = document.createElement("article");
  card.className = "memory-card";
  card.dataset.index = index;

  const image = document.createElement("img");

  image.src = `photo${number}.jpg`;
  image.alt = memory.title;
  image.loading = "lazy";
  image.decoding = "async";

  image.addEventListener("error", () => {
    image.alt = "Add your birthday photo here";
    image.style.background =
      "linear-gradient(135deg, #f8d6e5, #ed9fbd)";
  });

  const caption = document.createElement("div");
  caption.className = "memory-caption";
  caption.textContent = memory.title;

  const memoryNumber = document.createElement("div");
  memoryNumber.className = "memory-number";
  memoryNumber.textContent = `MEMORY ${number} / 16`;

  card.append(image, caption, memoryNumber);

  card.addEventListener("click", () => {
    openPhoto(index);
  });

  gallery.appendChild(card);
});


/* =========================================
   6. GALLERY SCROLL ANIMATION
========================================= */

const galleryCards = document.querySelectorAll(".memory-card");

if ("IntersectionObserver" in window && !reducedMotion) {
  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Number(entry.target.dataset.index);

        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index % 4 * 100);

        galleryObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  galleryCards.forEach((card) => galleryObserver.observe(card));
} else {
  galleryCards.forEach((card) => card.classList.add("visible"));
}


/* =========================================
   7. PHOTO VIEWER
========================================= */

function openPhoto(index) {
  currentPhoto = index;

  updatePhoto();

  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  $("#closeLightbox").focus();
}

function updatePhoto() {
  const memory = memories[currentPhoto];

  const number = String(currentPhoto + 1).padStart(2, "0");

  lightboxImage.src = `assets/photos/photo${number}.jpg`;
  lightboxImage.alt = memory.title;

  lightboxTitle.textContent = memory.title;
  lightboxDescription.textContent = memory.description;

  lightboxCounter.textContent =
    `${number} / ${String(memories.length).padStart(2, "0")}`;

  $("#galleryCount").textContent =
    `${number} / 16`;

  // Replay the image reveal animation.
  lightboxImage.style.animation = "none";
  void lightboxImage.offsetWidth;
  lightboxImage.style.animation = "";
}

function nextPhoto() {
  currentPhoto = (currentPhoto + 1) % memories.length;
  updatePhoto();
}

function previousPhoto() {
  currentPhoto =
    (currentPhoto - 1 + memories.length) % memories.length;

  updatePhoto();
}

function closePhoto() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

$("#nextPhoto").addEventListener("click", nextPhoto);
$("#previousPhoto").addEventListener("click", previousPhoto);
$("#closeLightbox").addEventListener("click", closePhoto);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closePhoto();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) return;

  if (event.key === "ArrowRight") nextPhoto();
  if (event.key === "ArrowLeft") previousPhoto();

  if (event.key === "Escape") {
    closePhoto();
  }
});

// Touch swipe support for mobile.
let touchStartX = 0;

lightbox.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener("touchend", (event) => {
  const touchEndX = event.changedTouches[0].screenX;
  const difference = touchEndX - touchStartX;

  if (Math.abs(difference) < 50) return;

  if (difference < 0) nextPhoto();
  else previousPhoto();
}, { passive: true });


/* =========================================
   8. GOSSIP EASTER EGG
========================================= */

const gossipMessages = [
  "BREAKING NEWS: Hansi has officially turned 16. Sources confirm she still knows everyone's business. 😂",

  "CLASSIFIED: Chocolate supplies have mysteriously disappeared. The investigation is ongoing. 🍫",

  "EXCLUSIVE: Her brother has been annoying her for years. Experts predict no improvement. 💀",

  "URGENT: Birthday girl spotted being iconic. Family members refuse to comment."
];

let gossipIndex = 0;

$("#roastButton").addEventListener("click", () => {
  $("#roastResult").textContent = gossipMessages[gossipIndex];

  gossipIndex = (gossipIndex + 1) % gossipMessages.length;

  createHearts(8);
});


/* =========================================
   9. CAKE CEREMONY
========================================= */

$("#blowButton").addEventListener("click", () => {
  if (candlesBlown) {
    $("#cakeMessage").textContent =
      "Your birthday wish is already on its way. Keep dreaming big! 💗";
    return;
  }

  candlesBlown = true;

  $("#candles").classList.add("blown");

  $("#cakeMessage").textContent =
    "Wish made! May your next chapter be absolutely magical. ✨";

  $("#blowButton").textContent = "Wish Made! 💗";

  createConfetti(120);
  createFireworks(5);
  createHearts(20);
});


/* =========================================
   10. BROTHER'S LETTER
========================================= */

$("#openLetter").addEventListener("click", () => {
  const envelope = $("#openLetter");
  const letter = $("#letterContent");

  if (letterOpened) {
    letter.classList.toggle("show");
    return;
  }

  letterOpened = true;

  envelope.classList.add("open");

  setTimeout(() => {
    letter.classList.add("show");

    letter.scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
      block: "center"
    });

    createHearts(12);
  }, reducedMotion ? 0 : 700);
});


/* =========================================
   11. FINAL GIFT REVEAL
========================================= */

$("#giftButton").addEventListener("click", () => {
  if (giftOpened) return;

  giftOpened = true;

  $("#giftButton").classList.add("open");

  $("#finalReveal").classList.add("show");

  $(".gift-hint").textContent =
    "The most important gift is the love behind it. 💗";

  createConfetti(150);
  createFireworks(8);
  createHearts(35);

  setTimeout(() => {
    $("#finalReveal").scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
      block: "center"
    });
  }, reducedMotion ? 0 : 500);
});


/* =========================================
   12. CONFETTI
========================================= */

function createConfetti(amount = 100) {
  if (reducedMotion) return;

  const colors = [
    "#ed75a8",
    "#ffd166",
    "#b8a1ff",
    "#ffffff",
    "#f6a7c7",
    "#e8c58b"
  ];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("div");

    piece.className = "confetti";

    piece.style.left = Math.random() * 100 + "vw";

    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.animationDuration =
      (2.5 + Math.random() * 2.5) + "s";

    piece.style.animationDelay =
      Math.random() * 0.8 + "s";

    confettiLayer.appendChild(piece);

    piece.addEventListener("animationend", () => {
      piece.remove();
    }, { once: true });
  }
}


/* =========================================
   13. FLOATING HEARTS
========================================= */

function createHearts(amount = 10) {
  if (reducedMotion) return;

  const symbols = ["♡", "♥", "✦", "✧", "💗"];

  for (let i = 0; i < amount; i++) {
    const particle = document.createElement("span");

    particle.className = "particle";

    particle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    particle.style.left = Math.random() * 100 + "vw";

    particle.style.fontSize =
      (15 + Math.random() * 20) + "px";

    particle.style.animationDuration =
      (4 + Math.random() * 4) + "s";

    particleLayer.appendChild(particle);

    particle.addEventListener("animationend", () => {
      particle.remove();
    }, { once: true });
  }
}


/* =========================================
   14. FIREWORKS
========================================= */

function createFireworks(bursts = 5) {
  if (reducedMotion) return;

  const colors = [
    "#ff8db9",
    "#ffd166",
    "#ffffff",
    "#e8a2c3",
    "#c9a7ff"
  ];

  for (let burst = 0; burst < bursts; burst++) {
    setTimeout(() => {
      const centerX = 15 + Math.random() * 70;
      const centerY = 15 + Math.random() * 45;

      for (let i = 0; i < 22; i++) {
        const spark = document.createElement("div");

        spark.className = "firework";

        const angle = (Math.PI * 2 * i) / 22;
        const distance = 50 + Math.random() * 100;

        spark.style.left = centerX + "vw";
        spark.style.top = centerY + "vh";

        spark.style.color =
          colors[Math.floor(Math.random() * colors.length)];

        spark.style.backgroundColor = spark.style.color;

        spark.style.setProperty(
          "--dx",
          Math.cos(angle) * distance + "px"
        );

        spark.style.setProperty(
          "--dy",
          Math.sin(angle) * distance + "px"
        );

        document.body.appendChild(spark);

        spark.addEventListener("animationend", () => {
          spark.remove();
        }, { once: true });
      }
    }, burst * 250);
  }
}


/* =========================================
   15. CELEBRATION BUTTON
========================================= */

$("#celebrateButton").addEventListener("click", () => {
  createConfetti(180);
  createFireworks(10);
  createHearts(40);
});


/* =========================================
   16. BACK TO TOP
========================================= */

$("#backToTop").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: reducedMotion ? "instant" : "smooth"
  });
});


/* =========================================
   17. SECRET KEYBOARD EASTER EGG
========================================= */

// Type RAM to unlock a secret birthday message.

let secretInput = "";

document.addEventListener("keydown", (event) => {
  if (event.key.length !== 1) return;

  secretInput += event.key.toLowerCase();

  secretInput = secretInput.slice(-3);

  if (secretInput === "ram") {
    alert(
      "SECRET UNLOCKED 🎬\n\n" +
      "Hansi's favourite hero has officially approved this birthday celebration.\n\n" +
      "Happy Sweet 16, Hansi! 💗"
    );

    createConfetti(80);
    createFireworks(4);

    secretInput = "";
  }
});


/* =========================================
   18. GENTLE BACKGROUND PARTICLES
========================================= */

if (!reducedMotion) {
  setInterval(() => {
    if (!document.hidden && !mainContent.classList.contains("hidden")) {
      createHearts(1);
    }
  }, 3000);
}


/* =========================================
   END OF HANSI'S SWEET 16
========================================= */
