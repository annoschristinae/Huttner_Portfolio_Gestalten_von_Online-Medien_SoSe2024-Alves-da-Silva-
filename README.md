# Huttner_Portfolio_Gestalten_von_Online-Medien_SoSe2024-Alves-da-Silva-
Fractal Animation Project

Algorithm Description
The core algorithm used in this project is the Mandelbrot set generation algorithm. The Mandelbrot set is a set of complex numbers for which the function f(z) = z^2 + c does not diverge when iterated from z = 0.

For each pixel on the canvas, the corresponding complex number c is computed. Starting from z = 0, the function f(z) = z^2 + c is iteratively applied. If the magnitude of z exceeds 2 before reaching a maximum number of iterations, the point is considered to be outside the Mandelbrot set, and its color is determined based on the number of iterations it took to escape.

Technology Used
HTML5 Canvas: Used to render the fractal visualization.
JavaScript: Implements the fractal generation, color computation, and animation logic.
CSS: Basic styling for the HTML elements.
End Result
The final result is a dynamic fractal animation that continuously zooms into the Mandelbrot set while cycling through colors. The animation starts automatically when the page loads and can be controlled using JavaScript functions.

Code Breakdown
Initialization
Variables: The script initializes several variables, such as animationId, colorOffset, zoom, zoomSpeed, centerX, and centerY, which control the state and animation of the fractal.
Event Listener: An event listener is added to call generateFractal() when the DOM content is fully loaded.
Functions:
startAnimation()
Begins the animation by calling animateFractal() and ensuring any previous animation is canceled.

animateFractal()
Increases colorOffset and zoom values to create the zooming and color-changing effect.
Calls generateFractal(false) to update the fractal visualization without resetting.
Uses requestAnimationFrame to recursively call itself, creating a smooth animation loop.

stopAnimation()
Cancels the current animation frame, stopping the animation.

generateFractal(resetAnimation = true)
Resets animation parameters if resetAnimation is true.
Retrieves the number of iterations from an input element and prepares the canvas context.
Computes the fractal by iterating over each pixel, determining whether it belongs to the Mandelbrot set, and coloring it accordingly.
Uses hslToRgb() to convert hue values to RGB for colorization.
hslToRgb(h, s, l)

Converts HSL color values to RGB.
Handles the transformation from the HSL color space to the RGB color space using the provided algorithm.
