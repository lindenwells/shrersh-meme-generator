import { crop, fetchURL, writeCanvas } from "image-js";

const imageUpload = document.getElementById("image-upload") as HTMLInputElement;
const flipCheckbox = document.getElementById("flip") as HTMLInputElement;
const flipPointSlider = document.getElementById(
  "flip-point",
) as HTMLInputElement;
const shrershifyButton = document.getElementById(
  "shrershify",
) as HTMLButtonElement;
const canvas = document.getElementById("output") as HTMLCanvasElement;
const preview = document.getElementById(
  "uploaded-image-preview",
) as HTMLDivElement;

const getFlipPoint = () => parseFloat(flipPointSlider.value);

const getFirstImage = () => imageUpload.files?.[0];

const getFlip = () => flipCheckbox.checked;

const clearCanvas = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  ctx?.clearRect(0, 0, canvas.width, canvas.height);
};

const updateImagePreview = (firstImage: File | undefined) => {
  if (!firstImage) return;

  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const img = document.createElement("img");
  img.src = URL.createObjectURL(firstImage);
  img.alt = img.title = firstImage.name;
  img.style.maxWidth = "30vw";

  if (getFlip()) {
    img.className = "flip-x";
  }

  preview.appendChild(img);
};

const writeFlippedImage = async (imageURL: string, flipPoint: number) => {
  let image = await fetchURL(imageURL);

  if (getFlip()) {
    image = image.flip({ axis: "horizontal" });
  }
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

const shrershify = (firstImage: File | undefined, flipPoint: number) => {
  if (!firstImage) return;

  writeFlippedImage(URL.createObjectURL(firstImage), flipPoint);
};

imageUpload.addEventListener("change", () =>
  updateImagePreview(getFirstImage()),
);

flipCheckbox.addEventListener("change", () =>
  updateImagePreview(getFirstImage()),
);

shrershifyButton.addEventListener("click", () =>
  shrershify(getFirstImage(), getFlipPoint()),
);

// Browsers can restore a file input's selection on reload, so render whatever is
// already there.
updateImagePreview(getFirstImage());
