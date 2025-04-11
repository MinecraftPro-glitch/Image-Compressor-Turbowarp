# Image-Compressor-Turbowarp
A small TurboWarp extension that gets Data URI's for images and compresses them according to the user input

This Scratch extension allows you to **compress image data URIs** directly in environments like **TurboWarp**. Perfect for reducing image sizes to save bandwidth or storage while preserving reasonable quality.

---

## Features

- Compress images to a target size (in KB)
- Adjustable JPEG quality
- Rescale compressed images back to original resolution
- Built as a Scratch-compatible JavaScript extension

---

## Installation (TurboWarp)

1. Open [TurboWarp Editor](https://turbowarp.org).
2. Click the **Extensions** button (bottom right).
3. Click **"Custom Extension"**.
4. Add the code in any way you like (file or text copy and paste). MAKE SURE TO TICK **"RUN WITHOUT SANDBOX"** OR IT WILL NOT WORK!
5. You’re ready to go!

---

## Blocks

### `compress image [DATA] to [TARGET_KB] KB with quality [QUALITY]`

Compresses a base64 image (data URI) to a target file size using iterative quality reduction.

- **DATA:** base64 string (e.g., `data:image/png;base64,...`)
- **TARGET_KB:** target size in kilobytes (default: 10)
- **QUALITY:** initial JPEG quality between `0.1` and `1.0` (default: `0.7`)
- **Returns:** compressed image as a base64 string (`data:image/jpeg;base64,...`)

---

### `rescale compressed image [DATA] to original size`

Redraws a previously compressed image to its original resolution.

- **DATA:** base64 string (compressed image)
- **Returns:** base64 string of image in original resolution

---

## 🛑 Limitations

- Only works with data URIs (base64-encoded images)
- Compression is always in **JPEG** format
- Output size is approximate, not exact
- Cannot bypass CORS for external images
- Not supported in vanilla Scratch — use **TurboWarp**
- The process is **asynchronous** and returns a **Promise**, so expect a delay for large images.

---

## 🙋 Support & Contributions

Feel free to open issues or submit pull requests if you have ideas, bug fixes, or improvements!
