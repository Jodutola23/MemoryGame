const imgSrcInput = document.querySelector('#imageInput');
const topTextInput = document.querySelector('#topTextInput');
const botTextInput = document.querySelector('#bottomTextInput');
const submitBtn = document.querySelector('#submitBtn');
const memeContainer = document.querySelector('.meme-generator'); // Ensure this container exists in your HTML

submitBtn.addEventListener('click', () => {
    // Check if all inputs are filled
    if (!imgSrcInput.value || !topTextInput.value || !botTextInput.value) {
        alert('Please fill in all fields before submitting.');
        return; // Exit the function early if any input is empty
    } else{

    let image = new Image();
    image.src = imgSrcInput.value; // Use the image URL directly

    image.onload = () => {
        createMeme(image, topTextInput.value, botTextInput.value);
        // Clear input fields after creating the meme
        imgSrcInput.value = '';
        topTextInput.value = '';
        botTextInput.value = '';
    };

    image.onerror = () => {
        // Handle errors if the image can't be loaded (e.g., invalid URL)
        alert('Failed to load the image. Please check the URL and try again.');
    }
    };
});

function createMeme(image, topText, botText) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Keep the canvas size manageable to avoid scrolling
    const canvasSize = 400; // Fixed canvas size for both width and height
    canvas.width = canvas.height = canvasSize;

    // Determine the square crop dimensions for the image
    const cropDimension = Math.min(image.naturalWidth, image.naturalHeight);
    const offsetX = (image.naturalWidth - cropDimension) / 2;
    const offsetY = (image.naturalHeight - cropDimension) / 2;

    // Draw the cropped and scaled image
    context.drawImage(image, offsetX, offsetY, cropDimension, cropDimension, 0, 0, canvasSize, canvasSize);

    // Increase text size for better visibility
    const fontSize = 48; // Increased font size for larger text
    context.font = `${fontSize}px Arial`;
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.lineWidth = fontSize / 20;
    context.textAlign = 'center';
    context.textBaseline = 'top';

    // Adjust text margin for larger text
    const textMargin = fontSize; // Adjusted for larger text size
    const textWidth = canvasSize - textMargin * 2; // Ensure text fits within the image

    // Adding top text
    context.fillText(topText, canvasSize / 2, textMargin, textWidth);
    context.strokeText(topText, canvasSize / 2, textMargin, textWidth);

    // Adjust baseline for bottom text
    context.textBaseline = 'bottom';

    // Adding bottom text
    context.fillText(botText, canvasSize / 2, canvasSize - textMargin, textWidth);
    context.strokeText(botText, canvasSize / 2, canvasSize - textMargin, textWidth);

    // Append canvas to container and setup removal on click
    memeContainer.appendChild(canvas);
    canvas.addEventListener('click', function() {
        memeContainer.removeChild(this);
    });
}
