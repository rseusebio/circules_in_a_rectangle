const canvasId = "circules_canvas";

function setCanvasSize(id, h=250, w=250) {
    const params = new URLSearchParams(window.location.search);

    const height = parseFloat(params.get("h"));
    const width = parseFloat(params.get("w"));

    const canvas = document.getElementById(id);


    if (height > 0) {
        canvas.setAttribute("height", height);

        h = height;

        if (!width) {
            canvas.setAttribute("width", height);

            w = height;
        }
    }

    if (width > 0) {
        canvas.setAttribute("width", width);

        w = width;

        if (!height) {
            canvas.setAttribute("height", width);

            h = width;
        }
    }

    return [h, w];
}

function drawCanvasElements(id, ncircles) {

    const canvas = document.getElementById(id);

    let ctx = canvas.getContext("2d");

    const w = canvas.width;
    const h = canvas.height;
    const n = ncircles;

    const ratio = w / h;
    const cols = Math.sqrt(n * ratio);
    const rows = Math.ceil(n / cols);

    // Melhor opção ocupando toda altura
    {
        let _rows = Math.ceil(rows);
        let _cols = Math.ceil(n / _rows);

        if (_rows * ratio < _cols) {
            const rowsRatio = _cols / (_rows * ratio);
            _rows = Math.ceil(_rows * rowsRatio);
            _cols = Math.ceil(n / _rows);
        }

        var fullHeightSide = h / _rows;
    }

    // Melhor opção ocupando toda largura
    {
        let _cols = Math.ceil(cols);
        let _rows = Math.ceil(n / _cols);

        if (_rows * ratio > _cols) {
            const colsRatio = (_rows * ratio) / _cols;
            _cols = Math.ceil(_cols * colsRatio);
            _rows = Math.ceil(n / _cols);
        }

        var fullWidthSide = w / _cols;
    }

    // Finalmente 
    let squareSide = Math.max(fullHeightSide, fullWidthSide);

    $("#n_circles").html(`${ncircles}`);
    $("#row_cols").html(`(${Math.round(cols)}x${Math.round(rows)})`);

    // My solution is identical to the code below...
    let perRow = Math.floor(canvas.width / squareSide)
    let circleRadius = squareSide / 4;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.strokeStyle = "gray";
    for (let i = 0; i < ncircles; i++) {
        let row = Math.floor(i / perRow);
        let col = i % perRow;
        let x = circleRadius * 2 + circleRadius * 4 * col;
        let y = circleRadius * 2 + circleRadius * 4 * row;
        ctx.beginPath();
        ctx.arc(x, y, circleRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath();
        ctx.moveTo(x - squareSide / 2, y - squareSide / 2);
        ctx.lineTo(x - squareSide / 2, y + squareSide / 2);
        ctx.lineTo(x + squareSide / 2, y + squareSide / 2);
        ctx.lineTo(x + squareSide / 2, y - squareSide / 2);
        ctx.closePath();
        ctx.stroke()
    }

    return squareSide;
}

function setSliderValue(v) {
    const slider = document.getElementById("n");

    slider.value = v;
}

function slideHandler() {
    let slider = document.getElementById("n");

    // console.log("sliderValue: ", setCookie);

    setCookie("slidervalue", slider.value, 1);

    // console.log("cookie set: ", getCookie("slidervalue"));

    $("#range").html(`${slider.value}`);

    drawCanvasElements(canvasId, parseInt(slider.value));
}

function main() {
    const [h, w] = setCanvasSize(canvasId);
    $("#cv_ttl_1").html(`Canvas: (${w}x${h})`);
    $("#cv_ttl_2").html(`Aspect ratio: ${(w/h).toFixed(2)}`);

    const sliderValue = getCookie("slidervalue") ? getCookie("slidervalue") : "10";

    setSliderValue(sliderValue);
    drawCanvasElements(canvasId, sliderValue)
    dragAndSave("#" + canvasId);
}

main();