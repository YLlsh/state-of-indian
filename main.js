document.addEventListener("DOMContentLoaded", () => {
  let state = document.getElementsByClassName("states");
  const Rajasthan_content = document.getElementsByClassName("text");
  let state_name = document.getElementsByClassName("state_name1");
  const state_map = document.getElementsByClassName("state_map");

  for (let j = 0; j < state_name.length; j++) {
    if (j % 2 == 0) {
      state_name[j].style.transform = "translate(50vw)";
    } else {
      state_name[j].style.transform = "translate(-50vw)";
    }
  }

  for (let i = 0; i < state.length; i++) {
    let timeout; // Declare globally in the scope of DOMContentLoaded
    let contentDelay; // To handle the delayed transform cleanly

    function showContent() {
      Rajasthan_content[i].style.opacity = "1";
      Rajasthan_content[i].style.pointerEvents = "auto";
    }

    function hideContent() {
      Rajasthan_content[i].style.opacity = "0";
      Rajasthan_content[i].style.pointerEvents = "none";
    }

    state[i].addEventListener("mouseenter", () => {
      clearTimeout(timeout);
      clearTimeout(contentDelay); // Cancel any pending transform

      showContent();

      contentDelay = setTimeout(() => {
        Rajasthan_content[i].style.transform = "translate(0, 0)";
        state_map[i].style.opacity = "1";
      }, 670); // Animate only after delay

      state_name[i].style.transform = "translate(0px)";
    });

    state[i].addEventListener("mouseleave", () => {
      timeout = setTimeout(hideContent, 100); // Wait before hiding

      clearTimeout(contentDelay); // Cancel any pending transform

      state_map[i].style.opacity = "0";

      Rajasthan_content[i].style.transform = "translate(0, 380px)";

      if (i % 2 === 0) {
        state_name[i].style.transform = "translate(50vw)";
      } else {
        state_name[i].style.transform = "translate(-50vw)";
      }
    });
  }
 const buttons = document.querySelectorAll(".nextpage");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const targetURL = button.getAttribute("data-href");
      document.body.style.transition = "opacity 1s";
      document.body.style.opacity = "0";

      setTimeout(() => {
        window.location.href = targetURL;
      }, 1000);
    });
  });
});



  window.addEventListener("load", function () {
    const colorThief = new ColorThief();

    function getGradientFromColor([r, g, b]) {
      const lighten = (x) => Math.min(255, x + 50);
      const darken = (x) => Math.max(0, x - 40);

      const colorLight = `rgb(${lighten(r)}, ${lighten(g)}, ${lighten(b)})`;
      const colorMid = `rgb(${r}, ${g}, ${b})`;
      const colorDark = `rgb(${darken(r)}, ${darken(g)}, ${darken(b)})`;

      return `linear-gradient(to left, ${colorLight}, ${colorMid}, ${colorLight})`;
    }

    document.querySelectorAll(".states").forEach((state) => {
      const bgDiv = state.querySelector(".state_image");
      const contentDiv = state.querySelector(".state_contant");
      const state_map = state.querySelector(".state_map");

      const bgImageStyle = getComputedStyle(bgDiv).backgroundImage;
      if (!bgImageStyle || bgImageStyle === 'none') return;

      const imageUrl = bgImageStyle.slice(5, -2);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;

      img.onload = function () {
        try {
          const dominantColor = colorThief.getColor(img);
          const gradient = getGradientFromColor(dominantColor);
          contentDiv.style.background = gradient;
          // state_map.style.backgroundColor = gradient;
        } catch (err) {
          console.warn("Color extraction failed:", err);
        }
      };
    });
  });

