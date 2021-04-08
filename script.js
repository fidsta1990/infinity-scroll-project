// SELECTOR
const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");
let photosArray = [];
//when page first loads, set ready to false to begin with and initial images to be set to 0;
let ready = false;
let imgsLoaded = 0;
let totalImages = 0;
//Unsplash api
const count = 30;
const apiKey = "API KEY";
const base_URL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
const imageLoaded = () => {
  imgsLoaded++;
  if (imgsLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

//helper function
const setAttributes = (element, attributes) => {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

//Display elements for links & pohotos, then add to DOM.
const displayPhotos = () => {
  imgsLoaded = 0;

  totalImages = photosArray.length;
  //Run function for each obj in photosArray
  photosArray.forEach((photo) => {
    //create <a> element to link to img url
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //add img
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description || "Unknown",
    });

    // check when each img has finished loading
    img.addEventListener("load", imageLoaded);

    //place img inside <a>, then put both img and <a> into img container
    item.appendChild(img);
    imgContainer.appendChild(item);
  });
};

// GET PHOTOS from unsplash api

const fetchPhotos = async () => {
  try {
    const res = await fetch(base_URL);
    photosArray = await res.json();
    displayPhotos();
  } catch (error) {
    //CATCH ERROR
    console.log(error);
  }
};

// EVENT LISTENERS
window.addEventListener("scroll", () => {
  let boydHeight = document.body.offsetHeight - 1000;
  if (window.innerHeight + window.scrollY >= boydHeight && ready) {
    ready = false;
    fetchPhotos();
  }
});

fetchPhotos();
