#Name - Image Compressor
#Author - Maxolain2010
#Version - 1.0

class ImageCompressor {
  getInfo() {
    return {
      id: 'imageCompressor',
      name: 'Data URI Compressor (For Images)',
      blocks: [
        {
          opcode: 'compressImage',
          blockType: Scratch.BlockType.REPORTER,
          text: 'compress image [DATA] to [TARGET_KB] KB with quality [QUALITY]',
          arguments: {
            DATA: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'data:image/png;base64,...'
            },
            TARGET_KB: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 10
            },
            QUALITY: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0.7
            }
          }
        },
        {
          opcode: 'rescaleImage',
          blockType: Scratch.BlockType.REPORTER,
          text: 'rescale compressed image [DATA] to original size',
          arguments: {
            DATA: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'data:image/png;base64,...'
            }
          }
        }
      ]
    };
  }

  compressImage(args) {
    const dataURI = args.DATA;
    const targetKB = parseInt(args.TARGET_KB, 10);
    const quality = parseFloat(args.QUALITY);
    return this.compressToTargetSize(dataURI, targetKB, quality);
  }

  rescaleImage(args) {
    const dataURI = args.DATA;
    return this.rescaleToOriginalSize(dataURI);
  }

  compressToTargetSize(dataURI, targetKB = 10, quality = 0.7, maxAttempts = 10) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        let attempt = 0;
        let result = '';
        let sizeKB = 0;

        // Add a maximum size limit check to avoid an infinite loop
        const minQuality = 0.1;  // Preventing quality from going too low
        const maxQuality = 1.0;  // The highest possible quality
        const minSizeKB = 0.1;  // Safety threshold to avoid crazy small targets

        while (attempt < maxAttempts) {
          result = canvas.toDataURL('image/jpeg', quality);
          sizeKB = (result.length * 0.75) / 1024;

          // If we are close enough to the target size, break the loop
          if (sizeKB <= targetKB || quality <= minQuality || sizeKB < minSizeKB) break;

          // Gradually reduce the quality, but ensure it doesn't go below the min quality threshold
          quality -= 0.05;
          if (quality < minQuality) quality = minQuality;
          attempt++;
        }

        console.log(`[COMPRESS] Final size: ~${Math.round(sizeKB)}KB with quality ${quality.toFixed(2)}`);
        resolve(result);
      };
      img.onerror = () => resolve('');
      img.src = dataURI;
    });
  }

  rescaleToOriginalSize(dataURI) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;  // Original width
        canvas.height = img.height;  // Original height
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const rescaledURI = canvas.toDataURL('image/jpeg');
        resolve(rescaledURI);  // Return the image scaled back to original size
      };
      img.onerror = () => resolve('');
      img.src = dataURI;
    });
  }
}

Scratch.extensions.register(new ImageCompressor());
