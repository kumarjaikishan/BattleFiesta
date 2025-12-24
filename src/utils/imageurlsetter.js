export function cloudinaryUrl(URL, options = {}) {
  if (!URL) return null; // nothing to transform

  if(!URL.toLowerCase().includes('res.cloudinary.com')) return URL;

  const {
    width,
    height,
    crop = "fill",
    format = "webp",
    quality = "auto",
    blur,
  } = options;

  let transforms = [];

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);
  if (quality) transforms.push(`q_${quality}`);
  if (blur) transforms.push(`e_blur:${blur}`);
  if (format) transforms.push(`f_${format}`);

  const transformationString = transforms.join(",");
  const [prefix, suffix] = URL.split("upload/");

  return `${prefix}upload/${transformationString}/${suffix}`;
}
