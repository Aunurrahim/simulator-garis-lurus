document.addEventListener('DOMContentLoaded', function() {
    // Elemen DOM
    const canvas = document.getElementById('graph-canvas');
    const ctx = canvas.getContext('2d');
    const slopeInput = document.getElementById('slope');
    const slopeNumber = document.getElementById('slope-number');
    const interceptInput = document.getElementById('intercept');
    const interceptNumber = document.getElementById('intercept-number');
    const drawBtn = document.getElementById('draw-btn');
    const resetBtn = document.getElementById('reset-btn');
    const equationText = document.getElementById('equation-text');
    const xInterceptText = document.getElementById('x-intercept');
    const yInterceptText = document.getElementById('y-intercept');
    const slopeValueText = document.getElementById('slope-value');
    
    // Variabel grafik
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 50; // 50 piksel per unit
    let m = 1;
    let c = 0;
    
    // Inisialisasi
    init();
    
    // Event listeners
    slopeInput.addEventListener('input', function() {
        m = parseFloat(this.value);
        slopeNumber.value = m.toFixed(1);
        updateEquationText();
    });
    
    slopeNumber.addEventListener('input', function() {
        m = parseFloat(this.value);
        slopeInput.value = m;
        updateEquationText();
    });
    
    interceptInput.addEventListener('input', function() {
        c = parseFloat(this.value);
        interceptNumber.value = c.toFixed(1);
        updateEquationText();
    });
    
    interceptNumber.addEventListener('input', function() {
        c = parseFloat(this.value);
        interceptInput.value = c;
        updateEquationText();
    });
    
    drawBtn.addEventListener('click', function() {
        drawGraph();
    });
    
    resetBtn.addEventListener('click', function() {
        resetGraph();
    });
    
    // Fungsi inisialisasi
    function init() {
        drawGrid();
        drawGraph();
        updateEquationText();
    }
    
    // Fungsi menggambar grid
    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        
        // Garis vertikal
        for (let x = 0; x <= canvas.width; x += scale) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        // Garis horizontal
        for (let y = 0; y <= canvas.height; y += scale) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Sumbu X dan Y
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        
        // Sumbu X
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.stroke();
        
        // Sumbu Y
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvas.height);
        ctx.stroke();
        
        // Label sumbu
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        // Label sumbu X
        for (let x = -5; x <= 5; x++) {
            if (x === 0) continue;
            const canvasX = centerX + x * scale;
            ctx.fillText(x.toString(), canvasX, centerY + 15);
        }
        
        // Label sumbu Y
        ctx.textAlign = 'right';
        for (let y = -5; y <= 5; y++) {
            if (y === 0) continue;
            const canvasY = centerY - y * scale;
            ctx.fillText(y.toString(), centerX - 10, canvasY + 4);
        }
        
        // Label titik pusat
        ctx.fillText('0', centerX - 10, centerY + 15);
    }
    
    // Fungsi menggambar garis
    function drawGraph() {
        // Hapus garis sebelumnya
        drawGrid();
        
        // Hitung dua titik untuk menggambar garis
        const x1 = -5;
        const y1 = m * x1 + c;
        const x2 = 5;
        const y2 = m * x2 + c;
        
        // Konversi ke koordinat canvas
        const canvasX1 = centerX + x1 * scale;
        const canvasY1 = centerY - y1 * scale;
        const canvasX2 = centerX + x2 * scale;
        const canvasY2 = centerY - y2 * scale;
        
        // Gambar garis
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(canvasX1, canvasY1);
        ctx.lineTo(canvasX2, canvasY2);
        ctx.stroke();
        
        // Hitung dan tampilkan informasi garis
        calculateLineInfo();
    }
    
    // Fungsi menghitung informasi garis
    function calculateLineInfo() {
        // Titik potong sumbu X (y = 0)
        const xIntercept = c !== 0 ? (-c / m).toFixed(2) : 0;
        const xInterceptPoint = `(${xIntercept}, 0)`;
        
        // Titik potong sumbu Y (x = 0)
        const yInterceptPoint = `(0, ${c.toFixed(2)})`;
        
        // Update teks informasi
        xInterceptText.textContent = xInterceptPoint;
        yInterceptText.textContent = yInterceptPoint;
        slopeValueText.textContent = m.toFixed(2);
    }
    
    // Fungsi update teks persamaan
    function updateEquationText() {
        let equation;
        if (m === 0) {
            equation = `y = ${c.toFixed(1)}`;
        } else if (c === 0) {
            equation = `y = ${m.toFixed(1)}x`;
        } else if (c > 0) {
            equation = `y = ${m.toFixed(1)}x + ${c.toFixed(1)}`;
        } else {
            equation = `y = ${m.toFixed(1)}x - ${Math.abs(c).toFixed(1)}`;
        }
        equationText.textContent = equation;
    }
    
    // Fungsi reset grafik
    function resetGraph() {
        m = 1;
        c = 0;
        slopeInput.value = m;
        slopeNumber.value = m;
        interceptInput.value = c;
        interceptNumber.value = c;
        drawGraph();
        updateEquationText();
    }
});