//DOM element lightbox//
const body = document.querySelector("body");
const mainContent = document.querySelector("main");

const lightbox = document.querySelector(".lightbox");
const lightboxBgd = document.querySelector(".lightbox_background");
const view = document.querySelector(".lightbox_view");
const lightboxTitle = document.querySelector(".lightbox_title");
const prev = document.querySelector(".lightbox_prev");
const next = document.querySelector(".lightbox_next");
const btnClose = document.querySelector(".lightbox_close");
const lightboxMedia = document.querySelector(".lightbox_media");

// create lightbox Video 
const video = document.createElement("video");
video.classList.add("lightbox_media");
video.setAttribute("controls", "");
video.id = "videoType";

// Lightbox open // create carroussel
const openLightbox = () => {
  // desactive "main"
  mainContent.setAttribute("arias-hidden", "true");
  // active modal
  lightboxBgd.setAttribute("aria-hidden", "false");
  // stop scroll arriere plan
  body.classList.add("no-scroll");
  // affiche contenu modal
  lightbox.style.display = "flex";
  // ajoute "active" au block qui affiche les elements
  view.classList.add("active");
  btnClose.addEventListener("click", closeLightbox);
};

// open lightbox when the media selected

export function lightboxModal() {
  //check all medias links (all img all mp4)
  const links = document.querySelectorAll(".gallery_link");
  for (let i = 0; i < links.length; i++) {
    let mediaLink = links[i];
 
    //img[src$=".jpg"],[src$=".mp4"]
    console.log(links);
   
    mediaLink.addEventListener("click", (e) => {
      e.preventDefault();
      // open lightbox
      openLightbox();
      let selectedMedia = e.currentTarget;
      /*
      );
      selectedMedia.classList.add("selected");*/
      // arrow left and right for the navigation
      lightboxNav();
      // url media => url lightbox
      viewMedia();
      // previous media and next media
      previousMedia();
      nextMedia();
    });

    const lightboxNav = () => {
      if (i == 0) {
        prev.style.display = "none";
      }
      if (i > 0) {
        prev.style.display = "block";
      }

      if (i < links.length) {
        next.style.display = "block";
      }
      if (i == links.length - 1) {
        next.style.display = "none";
      }
    };

    // const view Media click on next and previous arrow

    const viewMedia = () => {
      let selectedMedia = links[i].querySelector(".photographer-medium_gallery");
      lightboxMedia.src = selectedMedia.src;
      lightboxMedia.alt = selectedMedia.alt;
      lightboxTitle.textContent = selectedMedia.alt;
      

      // si media type img undefined, affiche media type video
      if (typeof selectedMedia.alt === "undefined") {
        // remplace img elmt par video elmt
        lightboxMedia.replaceWith(video);
        // affiche titre media dans url
        window.location.hash = links[i].title + ", closeup view";
        // affiche media + titre dans lightbox
        video.src = selectedMedia.src;
        video.alt = selectedMedia.alt
        lightboxTitle.textContent = "Video issue de l'image";
      } else {
        // remplace video elmt par img elemt
        video.replaceWith(lightboxMedia);
      }
      lightboxTitle.focus();
    };

    // upload previous media
    const previousMedia = () => {
      let selectedMedia = links[i].querySelector(
        ".photographer-medium_gallery");
      prev.addEventListener("click", (e) => {
        e.preventDefault();
        selectedMedia.classList.remove("selected");
        i--;
      // add "selected to previous media"
        selectedMedia.classList.add("selected");
        lightboxNav();
        viewMedia();
      });

      // use keyboard arrow to move between Media
      window.addEventListener("keydown", (e) => {
        if (e.keyCode === 37) prev.click();
      });
    };

    // upload next media
    const nextMedia = () => {
      let selectedMedia = links[i].querySelector(
        ".photographer-medium_gallery");
      next.addEventListener("click", (e) => {
        e.preventDefault();
        selectedMedia.classList.remove("selected");
        i++;
        // add "selected to next media"
        selectedMedia.classList.add("selected");
        lightboxNav();
        viewMedia();
      });

      // use keyboard arrow to move between Media
      window.addEventListener("keydown", (e) => {
        if (e.keyCode === 39) next.click();
      });
    };
  }
}
// CLOSE LIGHTBOX ("click" event)
const closeLightbox = () => {
  mainContent.setAttribute("arias-hidden", "false");
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.style.display = "none";
  view.classList.remove("active");
  //stop string on medialightbox when you arrived on the lastMedia
  const lastMedia = document.querySelector(".photographer-medium_gallery.selected");
 // lastMedia.focus();
  lastMedia.classList.remove(".selected");
};

//CLOSE LIGHTBOX ("escape" event)
window.addEventListener("keydown", (e) => {
  if (e.keycode === "27") closeLightbox();
});