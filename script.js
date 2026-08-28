import {
  crop,
  fetchURL,
  writeCanvas,
} from "https://cdn.jsdelivr.net/npm/image-js@latest/+esm";

const clearCanvas = (canvas) => {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const writeFlippedImage = async (imageURL, flipPoint) => {
  const image = await fetchURL(imageURL);
  const canvas = document.getElementById("output");
  clearCanvas(canvas);

  const flipX = Math.round(image.width * flipPoint);
  canvas.setAttribute("width", `${flipX * 2}`);
  canvas.setAttribute("height", `${image.height}`);
  canvas.setAttribute("style", "width: 60vw;");

  const croppedImage = crop(image, { width: flipX });
  writeCanvas(croppedImage, canvas, {
    resizeCanvas: false,
  });
  writeCanvas(croppedImage.flip(), canvas, { dx: flipX, resizeCanvas: false });
};

window.getFlipPoint = () =>
  parseFloat(document.getElementById("flip-point").value);

window.getFirstImage = () =>
  document.getElementById("image-upload")?.files?.[0];

const sideForm = document.getElementById("side");
window.getSide = () => {
  const data = new FormData(sideForm);
  return data.get("side");
};

window.shrershify = (firstImage, flipPoint) => {
  if (!firstImage) return;

  writeFlippedImage(URL.createObjectURL(firstImage), flipPoint);
};
