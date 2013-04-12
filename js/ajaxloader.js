/// <reference path="../index.html" />

// Constructor
function AjaxLoader(id, options) {
    // Convert color hex to rgb
    function getRGB(hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    var defaultOptions = {
        size: 32,       // Width and height of the spinner
        factor: 0.25,   // Factor of thickness, density, etc.
        color: '#000',  // Color #rgb or #rrggbb
        speed: 1,       // Rounds per second
        fps: 20,        // Frames per second to draw
        clockwise: true // Direction of rotation
    }

    var size = options.size || defaultOptions.size,
        factor = options.factor || defaultOptions.factor,
        color = getRGB(options.color || defaultOptions.color),
        speed = options.speed || defaultOptions.speed,
        fps = options.fps || defaultOptions.fps,
        clockwise = options.clockwise || defaultOptions.clockwise,
        canvas = document.getElementById(id),
        timer, rate = 0.0, deltaRate,
        segments = (size >= 32) ? ((size >= 256) ? 72 : 36) : 18,
        thickness = 0.5 * size * factor,
        deltaAngle = 2.0 * Math.PI / segments;
    if (clockwise) { deltaRate = -speed / fps; }
    else { deltaRate = speed / fps; }

    if (canvas == null) {
        console.log('AjaxLoader Error! Cannot find canvas element by id "' + id + '"');
        return null;
    }
    canvas.width = size;
    canvas.height = size;
    var context = canvas.getContext("2d");

    // Draw ajaxloader
    function Draw(rate) {
        var angle = 2.0 * Math.PI * rate;
        var cosA = Math.cos(angle),
            sinA = Math.sin(angle),
            x0 = 0.5 * size * (1 + cosA),
            y0 = 0.5 * size * (1 - sinA),
            x1 = x0 - thickness * cosA,
            y1 = y0 + thickness * sinA;
        context.clearRect(0, 0, size, size);
        for (var i = 0; i < segments; i++) {
            context.beginPath();
            if (clockwise) {
                context.fillStyle = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + (segments - 1 - i) / (segments - 1) + ')';
            } else {
                context.fillStyle = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + i / (segments - 1) + ')';
            }
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            angle += deltaAngle,
            cosA = Math.cos(angle);
            sinA = Math.sin(angle);
            x0 = 0.5 * size * (1 + cosA);
            y0 = 0.5 * size * (1 - sinA);
            x1 = x0 - thickness * cosA;
            y1 = y0 + thickness * sinA;
            context.lineTo(x1, y1);
            context.lineTo(x0, y0);
            context.closePath();
            context.fill();
        }
    }

    // Show and begin animation
    this.show = function () {
        canvas.removeAttribute('style');
        clearInterval(timer);
        timer = setInterval(function () {
            Draw(rate);
            rate += deltaRate;
            rate = rate - Math.floor(rate);
        }, 1000 / fps);
    }

    // Stop animation and hide indicator
    this.hide = function () {
        clearInterval(timer);
        canvas.style.display = 'none';
    }
}