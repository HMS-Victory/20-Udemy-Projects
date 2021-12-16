const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');
let photosArray=[];
//Unsplash ApplicationCache
const count=10;
const apiKey='K3rIC0wEDGbUNwRL2foYrA1Hxvpeg-1nbfdjHoJSEbY';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos(){
    loader.hidden=false
    //Run function for each object in photosArray
    photosArray.forEach((photo)=> {
        //Create <a> to link to Usplash
        const item=document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        //Create <IMG> for photo
        const img =document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        
        //Put <img> inside <a>, then put both inside imageContainer elment
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
    loader.hidden=true;
}
//Get photos from Unsplash API

async function getPhotos(){
    try{
    const response=await fetch(apiUrl);
    photosArray=await response.json();
    displayPhotos();}catch (error){
        //Catch error here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
      getPhotos();
      console.log('load more');
    }
  });
//On load
getPhotos();