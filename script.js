const shrershify = () => {
    const firstImage = document.getElementById("image-upload")?.files?.[0];

    if (!firstImage) return;

    const outputElement = document.getElementById("output");
    const image = document.createElement("img");
    image.src = URL.createObjectURL(file)
    image.alt = image.title = file.name;
    
    outputElement.replaceChild(image)
}