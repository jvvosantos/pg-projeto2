var numEval = 200;
var currentCurve;
var curveIndex = -1;
var curves = [];

var currentPoint;
var pointIndex = 0;

var showPoints = true;
var showLines = true;
var showCurves = true;

var manipulationMode = "add";

var enableMove = false;

/* ============================================== //

                BOTÕES CURVA

// ============================================== /*/

var addNewCurveButton = document.getElementById("add-curve");
addNewCurveButton.addEventListener('click', (evt) => {
    this.curves.push([]);
    this.curveIndex = this.curves.length - 1;
    this.currentCurve = this.curves[this.curveIndex];
    this.currentPoint = undefined;
    this.disableButtons();
    this.render();
});

var previousCurveButton = document.getElementById("previous-curve");
this.previousCurveButton.addEventListener('click', () => {
    this.curveIndex -= 1;
    this.currentCurve = this.curves[curveIndex];
    this.pointIndex = 0;
    this.currentPoint = this.currentCurve[0];
    this.disableButtons();
    this.render();

});

var nextCurveButton = document.getElementById("next-curve");
this.nextCurveButton.addEventListener('click', () => {
    this.curveIndex += 1;
    this.currentCurve = this.curves[this.curveIndex];
    this.pointIndex = 0;
    this.currentPoint = this.currentCurve[0];
    this.disableButtons();
    this.render();
});

var removeCurveButton = document.getElementById("remove-curve");
removeCurveButton.addEventListener('click', () => {
    this.curves.splice(curveIndex, 1);
    this.curveIndex -= 1;
    if (curveIndex < 0 && this.curves.length > 0) {
        curveIndex = 0;
    }
    this.currentCurve = this.curves[this.curveIndex];
    if (this.currentCurve) {
        this.pointIndex = 0;
        this.currentPoint = this.currentCurve[0];
    }
    else {
        this.currentPoint = undefined;
    }
    this.disableButtons();

    this.render();
});

function disableButtons() {
    previousCurveButton.disabled = false;
    nextCurveButton.disabled = false;
    removeCurveButton.disabled = false;
    previousPointButton.disabled = false;
    nextPointButton.disabled = false;
    removePointButton.disabled = false;
    dragModeRadioButton.disabled = false;

    if (this.currentCurve === undefined) {
        removeCurveButton.disabled = true;
    }

    if (this.curveIndex - 1 < 0) {
        previousCurveButton.disabled = true;
    }
    if (this.curveIndex + 1 >= this.curves.length) {
        nextCurveButton.disabled = true;
    }

    if (!this.currentPoint) {
        removePointButton.disabled = true;
        dragModeRadioButton.disabled = true;
        addModeRadioButton.checked = true;
        this.manipulationMode = addModeRadioButton.value;
    }

    if (!this.currentCurve || (this.pointIndex - 1 < 0)) {
        previousPointButton.disabled = true;
    }

    if (!this.currentCurve || (this.pointIndex + 1 >= this.currentCurve.length)) {
        nextPointButton.disabled = true;
    }

}

/* ============================================== //

                BOTÕES PONTOS

// ============================================== /*/

// var addNewPointButton = document.getElementById("add-curve");
// addNewCurveButton.addEventListener('click', (evt) => {
//     this.curves.push([]);
//     this.curveIndex = this.curves.length-1;
//     this.currentCurve = this.curves[this.curveIndex];
//     this.disableButtons();
//     this.render();
// });

var previousPointButton = document.getElementById("previous-point");
this.previousPointButton.addEventListener('click', () => {
    pointIndex -= 1;
    this.currentPoint = this.currentCurve[this.pointIndex];
    this.disableButtons();
    this.render();

});

var nextPointButton = document.getElementById("next-point");
this.nextPointButton.addEventListener('click', () => {
    this.pointIndex += 1;
    this.currentPoint = this.currentCurve[this.pointIndex];
    this.disableButtons();
    this.render();
});

var removePointButton = document.getElementById("remove-point");
removePointButton.addEventListener('click', () => {
    this.currentCurve.splice(pointIndex, 1);
    this.pointIndex -= 1;
    if (pointIndex < 0 && this.currentCurve.length > 0) {
        pointIndex = 0;
    }
    this.currentPoint = this.currentCurve[this.pointIndex];
    this.disableButtons();

    this.render();
});

var addModeRadioButton = document.getElementById("add-mode");
addModeRadioButton.addEventListener('change', (evt) => {
    this.manipulationMode = evt.target.value;
});

var dragModeRadioButton = document.getElementById("drag-mode");
dragModeRadioButton.addEventListener('change', (evt) => {
    this.manipulationMode = evt.target.value;
});


/* ============================================== //

            CHECKBOXES E NUM EVAL

// ============================================== /*/

var showPointsCheckbox = document.getElementById("show-points");
showPointsCheckbox.addEventListener('change', () => {
    this.showPoints = !this.showPoints;
    this.render();
});

var showLinesCheckbox = document.getElementById("show-lines");
showLinesCheckbox.addEventListener('change', () => {
    this.showLines = !this.showLines;
    this.render();
});

var showCurvesCheckbox = document.getElementById("show-curves");
showCurvesCheckbox.addEventListener('change', () => {
    this.showCurves = !this.showCurves;
    this.render();
});

var numEvalInput = document.getElementById("num-eval");
numEvalInput.addEventListener('change', (evt) => {
    if (evt.target.valueAsNumber < 3) {
        alert("Número de avaliações não pode ser menor que 3");
        evt.target.valueAsNumber = numEval;
        return;
    }

    if (evt.target.valueAsNumber > 10000) {
        let ok = confirm("Número de avaliações está muito grande, continuar?");
        if (!ok) {
            evt.target.valueAsNumber = numEval;
            return;
        }
    }

    this.numEval = evt.target.valueAsNumber;
    this.render();
    // this.showCurves = !this.showCurves;
    // console.log(this.showCurves);
});

/* ============================================== //

                BEZIER

// ============================================== /*/

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


function interpolation(A, B, t) {
    return new Point(A.x * (1 - t) + B.x * t, A.y * (1 - t) + B.y * t);
}

function deCasteljau(points, t) {
    let degree = points.length - 1;
    if (degree == 1) {
        return this.interpolation(points[0], points[1], t);
    }
    else {
        let aux = [];
        for (let i = 0; i < degree; i++) {
            aux.push(interpolation(points[i], points[i + 1], t));
        }

        return this.deCasteljau(aux, t);
    }
}

function getBezierCurve(points) {
    let bezierCurve = [];
    if (points.length > 2) {
        bezierCurve.push(points[0]);

        for (let i = 1; i < (this.numEval - 1); i++) {
            bezierCurve.push(this.deCasteljau(points, i / this.numEval));
        }

        bezierCurve.push(points[points.length - 1]);
    }

    return bezierCurve;
}
/* ============================================== //

                CANVAS

// ============================================== /*/

var canvas = document.getElementById("canvas");
const rect = canvas.getBoundingClientRect();
var ctx = canvas.getContext("2d");

canvas.addEventListener('click', (evt) => {
    if (!currentCurve) {
        alert("Você não adicionou nenhuma curva!");
        return;
    }

    if (this.manipulationMode == "add") {
        const x = evt.clientX - rect.left
        const y = evt.clientY - rect.top

        let P = new Point(x, y);

        this.addNewPoint(P);
        this.disableButtons();
        this.render();
    }
});

canvas.addEventListener('mousedown', (evt) => {
    if (this.manipulationMode == "drag") {
        this.enableMove = true;
    }
});

canvas.addEventListener('mouseup', (evt) => {
    if (this.manipulationMode == "drag") {
        this.enableMove = false;
    }
});

canvas.addEventListener('mousemove', (evt) => {
    if (this.manipulationMode == "drag" && this.enableMove) {
        setTimeout(() => {
            const x = evt.clientX - rect.left
            const y = evt.clientY - rect.top

            let P = new Point(x, y);

            this.currentCurve[this.pointIndex] = P;
            this.currentPoint = P;
            this.render();
        }, 30);
    }
});

function addNewPoint(P) {
    this.currentCurve.splice(this.pointIndex + 1, 0, P);
    this.currentPoint = P;
    this.pointIndex = this.currentCurve.indexOf(this.currentPoint);
    console.log(this.pointIndex);
}

function drawPoint(P, transparent) {
    this.ctx.strokeStyle = "#FFFFFF";
    this.ctx.fillStyle = P == this.currentPoint ? "#000000" : "#FFFFFF";
    this.ctx.globalAlpha = transparent ? 0.15 : 1.0;
    this.ctx.beginPath();
    this.ctx.arc(P.x, P.y, 6, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
}

function drawLine(A, B, color, transparent) {
    this.ctx.strokeStyle = color;
    this.ctx.strokeStyle = "3px";
    this.ctx.globalAlpha = transparent ? 0.15 : 1.0;
    this.ctx.beginPath();
    this.ctx.lineTo(A.x, A.y);
    this.ctx.lineTo(B.x, B.y);
    this.ctx.stroke();
}

function drawPoints(points, transparent) {
    for (let i = 0; this.showPoints && (i < points.length); i++) {
        this.drawPoint(points[i], transparent);
    }
}

function drawControlPolygon(points, color, transparent, render) {
    for (let i = 0; render && (i < (points.length - 1)); i++) {
        this.drawLine(points[i], points[i + 1], color, transparent);
    }
}

function render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.curves.forEach(curve => {
        this.drawPoints(curve, this.currentCurve != curve);
        this.drawControlPolygon(curve, "#FF0000", this.currentCurve != curve, this.showLines);
        let bezierCurve = getBezierCurve(curve);
        this.drawControlPolygon(bezierCurve, "#00FFFF", this.currentCurve != curve, this.showCurves);
    });
}