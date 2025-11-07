// Fetch photos from the API
export function fetchPhotos(page) {
  return fetch(`https://image-feed-api.vercel.app/api/images?page=${page}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load photos"); //more info about how .ok works on: https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
      return res.json();
    })
    .then((json) => json.data)
    .catch((error) => {
      console.error("There was a problem fetching images:", error); //in the browser console we will see this message if there is an error.

      app.innerHTML = `<p style="color:red;">Failed to load photos</p>`; //display message in the app area
    });
}