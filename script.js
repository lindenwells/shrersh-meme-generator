import {
  crop,
  fetchURL,
  writeCanvas,
} from "https://cdn.jsdelivr.net/npm/image-js@latest/+esm";

const clearCanvas = (canvas) => {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const writeFlippedImage = async (imageURL) => {
  const image = await fetchURL(imageURL);
  const canvas = document.getElementById("output");
  clearCanvas(canvas);

  const flipPoint = 0.49; // between 0 and 1
  const flipX = Math.round(image.width * flipPoint);
  canvas.setAttribute("width", `${flipX * 2}`);
  canvas.setAttribute("height", `${image.height}`);

  const croppedImage = crop(image, { width: flipX });
  writeCanvas(croppedImage, canvas, {
    resizeCanvas: false,
  });
  writeCanvas(croppedImage.flip(), canvas, { dx: flipX, resizeCanvas: false });
};

window.shrershify = () => {
  const firstImage = document.getElementById("image-upload")?.files?.[0];

  if (!firstImage) return;

  writeFlippedImage(URL.createObjectURL(firstImage));
};
