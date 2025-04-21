document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('graph-canvas');
    const ctx = canvas.getContext('2d');
    const x1Input = document.getElementById('input-x1');
    const y1Input = document.getElementById('input-y1');
    const x2Input = document.getElementById('input-x2');
    const y2Input = document.getElementById('input-y2');
    const drawBtn = document.getElementById('draw-btn');
    const resetBtn = document.getElementById('reset-btn');
    const equationText = document.getElementById('equation-text');
    const xInterceptText = document.getElementById('x-intercept');
    const yInterceptText = document.getElementById('y-intercept');
    const slopeValueText = document.getElementById('slope-value');

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 50;

    drawGrid();

    drawBtn.addEventListener('click', () => {
        const x1 = parseFloat(x1Input.value);
        const y1 = parseFloat(y1Input.value);
        const x2 = parseFloat(x2Input.value);
        const y2 = parseFloat(y2Input.value);

        if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || x1 === x2) {
            alert('Input tidak valid atau x1 = x2');
            return;
        }

        drawGrid();

        const m = (y2 - y1) / (x2 - x1);
        const c = y1 - m * x1;

        const xCanvas1 = centerX + x1 * scale;
        const yCanvas1 = centerY - y1 * scale;
        const xCanvas2 = centerX + x2 * scale;
        const yCanvas2 = centerY - y2 * scale;

        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(xCanvas1, yCanvas1);
        ctx.lineTo(xCanvas2, yCanvas2);
        ctx.stroke();

        updateInfo(m, c);
    });

    resetBtn.addEventListener('click', () => {
        x1Input.value = '';
        y1Input.value = '';
        x2Input.value = '';
        y2Input.value = '';
        drawGrid();
        equationText.textContent = 'y = mx + c';
        xInterceptText.textContent = '-';
        yInterceptText.textContent = '-';
        slopeValueText.textContent = '-';
    });

    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;

        for (let x = 0; x <= canvas.width; x += scale) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        for (let y = 0; y <= canvas.height; y += scale) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvas.height);
        ctx.stroke();
    }

    function updateInfo(m, c) {
        const eq = c === 0 ? `y = ${m.toFixed(2)}x` :
                   c < 0 ? `y = ${m.toFixed(2)}x - ${Math.abs(c).toFixed(2)}` :
                           `y = ${m.toFixed(2)}x + ${c.toFixed(2)}`;
        equationText.textContent = eq;
        slopeValueText.textContent = m.toFixed(2);
        xInterceptText.textContent = `(${(-c / m).toFixed(2)}, 0)`;
        yInterceptText.textContent = `(0, ${c.toFixed(2)})`;
    }
});