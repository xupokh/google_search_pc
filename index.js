// to scroll page from destination to departure
function scrollPage(to, from) {
  const destination = document.querySelector(to);
  const departure = document.querySelector(from);

  destination.classList.replace("hidden", "visible");

  var elementPosition = destination.getBoundingClientRect().top;
  var startPosition = window.pageYOffset;
  var distance = elementPosition - startPosition;
  var startTime = null;
  var duration = Math.round(window.innerHeight * 1.2);

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;

    var timeElapsed = currentTime - startTime;
    var scroll = ease(timeElapsed, startPosition, distance, duration);

    window.scrollTo(0, scroll);

    timeElapsed < duration
      ? requestAnimationFrame(animation)
      : departure.classList.replace("visible", "hidden");
  }
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
    t -= 2;
    return (c / 2) * (Math.sqrt(1 - t * t) + 1) + b;
  }
  requestAnimationFrame(animation);
}

// add/remove blur effect
function toggleBlur() {
  const sectionBlur = document.querySelector(".links-search-result");
  if (sectionBlur.classList.contains("blur")) return;
  sectionBlur.classList.add("blur");
  sectionBlur.addEventListener(
    "click",
    () => {
      sectionBlur.classList.remove("blur");
      changeResumeBlock(undefined);
    },
    { once: true }
  );
}

//add color to contacts or other elements
function highlight(className) {
  const element = document.querySelector(className);
  element.classList.add("sign");
}

//simulate click on link to remove blur effect
function simulateClick() {
  const element = document.querySelector(".link");
  element.click();
}

//to change resume blocks from visible to hidden and back
function changeResumeBlock(currentBlock) {
  const articles = document.querySelectorAll(".resume-info");
  articles.forEach((article) => {
    article.classList.replace("visible", "hidden");
  });
  if (currentBlock >= 0) {
    articles[currentBlock].classList.replace("hidden", "visible");
    toggleBlur();
  }
}

// to input content in text value
function enterSearchQuery(inputContent) {
  const input = document.querySelector(".search-input");
  input.value = "";
  input.focus();
  var i = 0;

  function showName() {
    if (i < inputContent.length) {
      input.value += inputContent[i];
      i++;
      let time = Math.random() * 200;
      input.focus();
      setTimeout(showName, time);
    }
  }
  setTimeout(showName, 1300);
}

document.addEventListener("DOMContentLoaded", () => {
  const inputContent = "Ксения Походяева резюме";
  enterSearchQuery(inputContent);
});
