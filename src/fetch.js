// Fetch photos from the API
export async function fetchPhotos(page) {
  try {
    const res = await fetch(`https://image-feed-api.vercel.app/api/images?page=${page}`);
    if (!res.ok) throw new Error("Failed to load photos");

    const json = await res.json();
    return json.data; // pick only "data" array
  } catch (error) {
    console.error("There was a problem fetching images:", error);
    app.innerHTML = `<p style="color:red;">Failed to load photos</p>`;
  }
}