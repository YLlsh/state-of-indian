document.addEventListener("DOMContentLoaded", () => {
  let state = document.getElementsByClassName("states");
  const Rajasthan_content = document.getElementsByClassName("text");
  let state_name = document.getElementsByClassName("state_name1");
  const state_map = document.getElementsByClassName("state_map");

  for (let j = 0; j < state_name.length; j++){

    if( j % 2 == 0){
      state_name[j].style.transform = "translate(50vw)";
      
    }
    else{
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

      if(i % 2 === 0){
        state_name[i].style.transform = "translate(50vw)";
      }
      else{
        state_name[i].style.transform = "translate(-50vw)";
      }
    });
  }
});
