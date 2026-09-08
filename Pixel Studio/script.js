const canvas = document.getElementById("canvas");
const palette = document.getElementById("palette");

const colorPicker = document.getElementById("colorPicker");
const selectedColor = document.getElementById("selectedColor");

const gridToggle = document.getElementById("gridToggle");
const clearButton = document.getElementById("clearButton");

const canvasSize = document.getElementById("canvasSize");

const undoButton = document.getElementById("undoButton");
const redoButton = document.getElementById("redoButton");

const downloadButton =
    document.getElementById("downloadButton");

const toolButtons =
    document.querySelectorAll(".tool-button");

const sizeButtons =
    document.querySelectorAll(".size-button");


// ============================
// SETTINGS
// ============================

let currentSize = 32;

let currentColor = "#000000";

let currentTool = "brush";

let isDrawing = false;

let gridVisible = true;


// ============================
// HISTORY
// ============================

let undoStack = [];

let redoStack = [];

let currentAction = null;


// ============================
// COLORS
// ============================

const colors = [

    "#000000",
    "#ffffff",
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",

    "#14b8a6",
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#d946ef",

    "#ec4899",
    "#f43f5e",
    "#7f1d1d",
    "#9a3412",
    "#854d0e",
    "#365314",
    "#14532d",
    "#064e3b",

    "#164e63",
    "#1e3a8a",
    "#312e81",
    "#581c87",
    "#701a75",
    "#831843",
    "#475569",
    "#94a3b8"

];


// ============================
// CREATE COLOR PALETTE
// ============================

function createPalette() {

    colors.forEach(color => {

        const button =
            document.createElement("button");

        button.classList.add("color");

        button.style.backgroundColor = color;

        button.dataset.color = color;


        if (color === currentColor) {

            button.classList.add("active");

        }


        button.addEventListener("click", () => {

            currentColor = color;

            currentTool = "brush";

            updateToolButtons();

            updateSelectedColor();

            updatePalette();

        });


        palette.appendChild(button);

    });

}


function updatePalette() {

    document.querySelectorAll(".color")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.color === currentColor
            );

        });

}


function updateSelectedColor() {

    selectedColor.textContent =
        currentColor.toUpperCase();

    colorPicker.value =
        currentColor;

}


// ============================
// CREATE CANVAS
// ============================

function createCanvas(size = currentSize) {

    currentSize = size;

    canvas.innerHTML = "";


    canvas.style.gridTemplateColumns =
        `repeat(${size}, 1fr)`;


    canvas.style.gridTemplateRows =
        `repeat(${size}, 1fr)`;


    for (
        let i = 0;
        i < size * size;
        i++
    ) {

        const pixel =
            document.createElement("div");


        pixel.classList.add("pixel");


        pixel.dataset.index = i;


        pixel.addEventListener(
            "mousedown",
            startDrawing
        );


        pixel.addEventListener(
            "mouseenter",
            draw
        );


        pixel.addEventListener(
            "mouseup",
            stopDrawing
        );


        canvas.appendChild(pixel);

    }


    canvasSize.textContent =
        `${size} × ${size}`;


    updateHistoryButtons();

}


// ============================
// DRAWING
// ============================

function startDrawing(event) {

    isDrawing = true;


    currentAction = {
        before: getCanvasState()
    };


    paintPixel(event.target);

}


function draw(event) {

    if (!isDrawing) {

        return;

    }


    paintPixel(event.target);

}


function stopDrawing() {

    if (!isDrawing) {

        return;

    }


    isDrawing = false;


    if (currentAction) {

        const after =
            getCanvasState();


        if (
            JSON.stringify(
                currentAction.before
            ) !== JSON.stringify(after)
        ) {

            undoStack.push({

                before: currentAction.before,

                after: after

            });


            redoStack = [];

        }


        currentAction = null;

        updateHistoryButtons();

    }

}


function paintPixel(pixel) {

    if (
        !pixel ||
        !pixel.classList.contains("pixel")
    ) {

        return;

    }


    if (currentTool === "eraser") {

        pixel.style.backgroundColor =
            "#ffffff";

    } else {

        pixel.style.backgroundColor =
            currentColor;

    }

}


// Stop drawing when leaving canvas

canvas.addEventListener("mouseleave", () => {

    if (isDrawing) {

        stopDrawing();

    }

});


// Safety: stop drawing anywhere

document.addEventListener("mouseup", () => {

    if (isDrawing) {

        stopDrawing();

    }

});


// ============================
// CANVAS STATE
// ============================

function getCanvasState() {

    return Array.from(
        document.querySelectorAll(".pixel")
    ).map(pixel => {

        return pixel.style.backgroundColor ||
            "rgb(255, 255, 255)";

    });

}


function restoreCanvasState(state) {

    const pixels =
        document.querySelectorAll(".pixel");


    pixels.forEach((pixel, index) => {

        pixel.style.backgroundColor =
            state[index];

    });

}


// ============================
// UNDO
// ============================

function undo() {

    if (undoStack.length === 0) {

        return;

    }


    const action =
        undoStack.pop();


    redoStack.push(action);


    restoreCanvasState(
        action.before
    );


    updateHistoryButtons();

}


// ============================
// REDO
// ============================

function redo() {

    if (redoStack.length === 0) {

        return;

    }


    const action =
        redoStack.pop();


    undoStack.push(action);


    restoreCanvasState(
        action.after
    );


    updateHistoryButtons();

}


// ============================
// HISTORY BUTTONS
// ============================

undoButton.addEventListener(
    "click",
    undo
);


redoButton.addEventListener(
    "click",
    redo
);


function updateHistoryButtons() {

    undoButton.disabled =
        undoStack.length === 0;


    redoButton.disabled =
        redoStack.length === 0;

}


// ============================
// COLOR PICKER
// ============================

colorPicker.addEventListener(
    "input",
    event => {

        currentColor =
            event.target.value;

        currentTool = "brush";

        updateSelectedColor();

        updatePalette();

        updateToolButtons();

    }
);


// ============================
// TOOLS
// ============================

toolButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            currentTool =
                button.dataset.tool;


            updateToolButtons();

        }
    );

});


function updateToolButtons() {

    toolButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.tool === currentTool
        );

    });

}


// ============================
// CLEAR CANVAS
// ============================

clearButton.addEventListener(
    "click",
    () => {

        const before =
            getCanvasState();


        const isAlreadyClear =
            before.every(
                color =>
                    color ===
                    "rgb(255, 255, 255)"
            );


        if (isAlreadyClear) {

            return;

        }


        const pixels =
            document.querySelectorAll(".pixel");


        pixels.forEach(pixel => {

            pixel.style.backgroundColor =
                "#ffffff";

        });


        const after =
            getCanvasState();


        undoStack.push({

            before: before,

            after: after

        });


        redoStack = [];


        updateHistoryButtons();

    }
);


// ============================
// GRID TOGGLE
// ============================

gridToggle.addEventListener(
    "click",
    () => {

        gridVisible =
            !gridVisible;


        canvas.classList.toggle(
            "no-grid",
            !gridVisible
        );


        gridToggle.textContent =
            gridVisible
                ? "Hide Grid"
                : "Show Grid";

    }
);


// ============================
// CANVAS SIZE
// ============================

sizeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const size =
                Number(button.dataset.size);


            if (size === currentSize) {

                return;

            }


            sizeButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            createCanvas(size);


            // A new canvas starts
            // with a fresh history.

            undoStack = [];

            redoStack = [];

            updateHistoryButtons();

        }
    );

});


// ============================
// DOWNLOAD PNG
// ============================

downloadButton.addEventListener(
    "click",
    downloadPNG
);


function downloadPNG() {

    const pixels =
        document.querySelectorAll(".pixel");


    // Each pixel becomes 20x20 pixels
    // in the exported PNG.

    const pixelSize = 20;


    const imageSize =
        currentSize * pixelSize;


    const exportCanvas =
        document.createElement("canvas");


    exportCanvas.width =
        imageSize;


    exportCanvas.height =
        imageSize;


    const context =
        exportCanvas.getContext("2d");


    // Disable smoothing for sharp
    // pixel-art edges.

    context.imageSmoothingEnabled =
        false;


    pixels.forEach((pixel, index) => {

        const row =
            Math.floor(
                index / currentSize
            );


        const column =
            index % currentSize;


        const color =
            pixel.style.backgroundColor ||
            "#ffffff";


        context.fillStyle =
            color;


        context.fillRect(

            column * pixelSize,

            row * pixelSize,

            pixelSize,

            pixelSize

        );

    });


    exportCanvas.toBlob(blob => {

        if (!blob) {

            return;

        }


        const link =
            document.createElement("a");


        link.download = `pixel-studio-${currentSize}x${currentSize}.png`;


        link.href =
            URL.createObjectURL(blob);


        link.click();


        URL.revokeObjectURL(
            link.href
        );

    }, "image/png");

}


// ============================
// KEYBOARD SHORTCUTS
// ============================

document.addEventListener(
    "keydown",
    event => {

        // Ctrl + Z → Undo

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "z"
        ) {

            event.preventDefault();

            undo();

        }


        // Ctrl + Y → Redo

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "y"
        ) {

            event.preventDefault();

            redo();

        }

    }
);


// ============================
// INITIALIZE
// ============================

createPalette();

createCanvas();

updateSelectedColor();

updateToolButtons();

updateHistoryButtons();

