let animationId;
let colorOffset = 0;
let zoom = 1;
const zoomSpeed = 1.02;
let centerX = -1.415;
let centerY = 0;

function startAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    animateFractal();
}

function animateFractal() {
    colorOffset += 0.01;
    zoom *= zoomSpeed;

    generateFractal(false);

    animationId = requestAnimationFrame(animateFractal);
}

function stopAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

function generateFractal(resetAnimation = true) {
    if (resetAnimation) {
        stopAnimation();
        colorOffset = 0;
        zoom = 1;
        centerX = -1.415;
        centerY = 0;
    }
    
    const iterations = parseInt(document.getElementById('iterations').value);
    const canvas = document.getElementById('fractalCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 800;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    const xMin = centerX - (2.5 / zoom);
    const xMax = centerX + (1.5 / zoom);
    const yMin = centerY - (2 / zoom);
    const yMax = centerY + (2 / zoom);

    for (let px = 0; px < width; px++) {
        for (let py = 0; py < height; py++) {
            const x0 = xMin + (xMax - xMin) * px / width;
            const y0 = yMin + (yMax - yMin) * py / height;
            
            let x = 0;
            let y = 0;
            let iteration = 0;

            while (x * x + y * y <= 4 && iteration < iterations) {
                const xtemp = x * x - y * y + x0;
                y = 2 * x * y + y0;
                x = xtemp;
                iteration++;
            }

            const pixelIndex = (px + py * width) * 4;
            if (iteration < iterations) {
                const hue = (Math.sqrt(iteration / iterations) * 360 + colorOffset * 360) % 360;
                const [r, g, b] = hslToRgb(hue / 360, 1, 0.5);
                data[pixelIndex] = r;
                data[pixelIndex + 1] = g;
                data[pixelIndex + 2] = b;
                data[pixelIndex + 3] = 255;
            } else {
                data[pixelIndex] = 0;
                data[pixelIndex + 1] = 0;
                data[pixelIndex + 2] = 0;
                data[pixelIndex + 3] = 255;
            }
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

function hslToRgb(h, s, l) {
    let r, g, b;

    if (s == 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

document.addEventListener('DOMContentLoaded', () => {
    generateFractal();
});
