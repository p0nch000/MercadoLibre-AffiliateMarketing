import sharp from 'sharp';
import axios from 'axios';

// Helper function to fetch and upscale an image
export const fetchAndUpscaleImage = async (url, outputPath) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        await sharp(response.data)
            .resize({ width: 300 })
            .sharpen() 
            .toFile(outputPath);

        return outputPath;
    } catch (error) {
        console.error('Error processing image:', error);
        return null;
    }
}

