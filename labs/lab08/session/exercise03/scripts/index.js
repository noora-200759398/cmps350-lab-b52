let photos;
const db = new Localbase("gallery");
document.addEventListener("DOMContentLoaded", start);

async function start() {
  // await db.collection("photos").delete();

  photos = await db.collection("photos").get();
  photos = photos || [];
  photos.forEach((photo) => addDOMPhoto(photo));

  let upload = document.querySelector("#upload-input");
  upload.addEventListener("change", async () => {
    document.querySelector("#upload-label").style.display = "none";
    document.querySelector("#upload-spinner").style.display = "inline-block";

    [...upload.files].forEach((file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("loadend", async () => {
        let photo = {
          id:
            Date.now() +
            "-" +
            String(Math.trunc(Math.random() * 1e6)).padStart(6, "0"),
          blob: reader.result,
        };

        await db.collection("photos").add(photo);
        addDOMPhoto(photo);
      });
    });

    setTimeout(() => {
      document.querySelector("#upload-label").style.display = "inline-block";
      document.querySelector("#upload-spinner").style.display = "none";
    }, 1000);
    document.querySelector("#upload-input").value = "";
  });
}

function addDOMPhoto(photo) {
  let img = document.createElement("img");
  img.dataset.id = photo.id;
  img.src = photo.blob;
  img.addEventListener("click", async () => {
    img.remove();
    await db.collection("photos").doc({ id: photo.id }).delete();
  });
  document.querySelector("#gallery").appendChild(img);
}
