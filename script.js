let stories = [];
let visibleStories = 2;

const storyInput = document.getElementById("storyInput");
const shareButton = document.getElementById("shareButton");
const storiesList = document.getElementById("storiesList");
const loadMoreButton = document.getElementById("loadMoreButton");
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {
  if (document.documentElement.scrollTop > 50) {
    scrollTopBtn.classList.add("show");
    console.log("Deneme");
  } else {
    scrollTopBtn.classList.remove("show");
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function shareStory() {
  const storyText = storyInput.value.trim();

  if (storyText) {
    stories.unshift({
      text: storyText,
      date: new Date(),
    });

    storyInput.value = "";

    updateStories();

    storiesList.firstChild.scrollIntoView({ behavior: "smooth" });
  }
}

function updateStories() {
  storiesList.innerHTML = "";

  const storiesToShow = stories.slice(0, visibleStories);

  storiesToShow.forEach((story) => {
    const storyCard = document.createElement("div");
    storyCard.className = "story-card";

    const formattedDate = new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(story.date);

    storyCard.innerHTML = `
            <p>${story.text}</p>
            <small style="color: #666; display: block; margin-top: 0.5rem;">
                ${formattedDate}
            </small>
        `;

    storiesList.appendChild(storyCard);
  });

  loadMoreButton.style.display =
    stories.length > visibleStories ? "block" : "none";
}

function loadMore() {
  visibleStories += 3;
  updateStories();
}

shareButton.addEventListener("click", shareStory);
loadMoreButton.addEventListener("click", loadMore);

storyInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    shareStory();
  }
});

function initKadesButton() {
  const kadesButton = document.getElementById("kadesButton");
  if (!kadesButton) return;

  kadesButton.addEventListener("click", (e) => {
    e.preventDefault();

    kadesButton.classList.add("downloading");

    setTimeout(() => {
      window.location.href =
        "https://play.google.com/store/apps/details?id=tr.gov.egm.kades";
    }, 1000);
  });
}

document.addEventListener("DOMContentLoaded", initKadesButton);

document.addEventListener("DOMContentLoaded", function () {
  const bookContainers = document.querySelectorAll(".book-container");

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  bookContainers.forEach((container) => {
    observer.observe(container);
  });
});

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const dots = document.querySelectorAll(".dot");
const slider = document.querySelector(".slider");

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots();
}

function updateDots() {
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentSlide].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  goToSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  goToSlide(currentSlide);
}

document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => goToSlide(index));
});

setInterval(nextSlide, 25000);

goToSlide(0);

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    // Sağ ok tuşuna basıldığında
    nextSlide();
  } else if (event.key === "ArrowLeft") {
    // Sol ok tuşuna basıldığında
    prevSlide();
  }
});

// Tüm video kartlarını seçiyoruz
const videoCards = document.querySelectorAll(".video-card");

// Her video kartı için tıklama işlemi ekliyoruz
videoCards.forEach((card) => {
  card.addEventListener("click", () => {
    // Eğer kartta bir link varsa, tıklanınca o linke gitmesini sağlıyoruz
    const videoUrl = card.querySelector("a")
      ? card.querySelector("a").href
      : card.getAttribute("data-video");

    // Videoyu yeni sekmede açıyoruz
    window.open(videoUrl, "_blank");
  });
});

document.getElementById('support-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const supportType = document.getElementById('support-type').value;
  
  if (!name || !email || !message || !supportType) {
    alert('Lütfen tüm alanları doldurun.');
    return;
  }
  
  alert('Destek başvurunuz başarıyla gönderildi!');
  document.getElementById('support-form').reset();
});

