import {
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
  writeCanvas(image.flip(), canvas);
};

window.shrershify = () => {
  const firstImage = document.getElementById("image-upload")?.files?.[0];

  if (!firstImage) return;

  writeFlippedImage(URL.createObjectURL(firstImage));
};
