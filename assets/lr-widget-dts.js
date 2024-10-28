document.addEventListener("DOMContentLoaded", function() {
    const typefaces = [0, 1, 2, 3, 4];
    let typefacesDynamic = [...typefaces];
    function randomNumberInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Select random typefaces and remove them from the array
    const typefaceForegroundIndex = randomNumberInRange(0, typefacesDynamic.length - 1);
    const typefaceNameForeground = typefacesDynamic.splice(typefaceForegroundIndex, 1)[0];

    const typefaceMiddlegroundIndex = randomNumberInRange(0, typefacesDynamic.length - 1);
    const typefaceNameMiddleground = typefacesDynamic.splice(typefaceMiddlegroundIndex, 1)[0];

    const typefaceBackgroundIndex = randomNumberInRange(0, typefacesDynamic.length - 1);
    const typefaceNameBackground = typefacesDynamic.splice(typefaceBackgroundIndex, 1)[0];

    // Randomly select colors
    const colorForeground = randomNumberInRange(0, 4);
    const colorMiddleground = randomNumberInRange(0, 4);
    const colorBackground = randomNumberInRange(0, 4);

    // Randomly decide the layers amount
    const layersAmount = randomNumberInRange(0, 2);

    // Get the elements
    const foregroundElement = document.getElementById('foreground');
    const middlegroundElement = document.getElementById('middleground');
    const backgroundElement = document.getElementById('background');

    // Apply classes to foreground element
    foregroundElement.classList.add(`widget-dts-typeface-${typefaceNameForeground}`);
    foregroundElement.classList.add(`widget-dts-color-foreground-${colorForeground}`);

    // Apply classes to middleground element
    middlegroundElement.classList.add(`widget-dts-typeface-${typefaceNameMiddleground}`);
    middlegroundElement.classList.add(`widget-dts-color-middleground-${colorMiddleground}`);

    // Apply classes to background element
    backgroundElement.classList.add(`widget-dts-typeface-${typefaceNameBackground}`);
    backgroundElement.classList.add(`widget-dts-color-background-${colorBackground}`);

    // Conditionally hide elements based on layersAmount
    if (layersAmount < 2) {
        middlegroundElement.classList.add('widget-dts-text-hidden');
    }
    if (layersAmount < 1) {
        backgroundElement.classList.add('widget-dts-text-hidden');
    }
});