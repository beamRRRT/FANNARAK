function openSurprise() {
    // 1. ซ่อนหน้า Intro
    const intro = document.getElementById('intro-screen');
    intro.style.opacity = '0';
    
    // รอให้ fade out จบก่อนค่อยซ่อน display
    setTimeout(() => {
        intro.style.display = 'none';
        
        // 2. แสดงเนื้อหาหลัก
        const content = document.getElementById('main-content');
        content.classList.remove('hidden');
        content.style.opacity = '0';
        
        // ค่อยๆ fade เนื้อหาเข้ามา
        let opacity = 0;
        const fadeInterval = setInterval(() => {
            if (opacity < 1) {
                opacity += 0.05;
                content.style.opacity = opacity;
            } else {
                clearInterval(fadeInterval);
            }
        }, 30);
        
        // 3. เริ่มโปรยดอกไม้
        createFlowers();

    }, 1000);
}

function createFlowers() {
    const container = document.getElementById('falling-flowers');
    const flowers = ['🌸', '🌹', '🌺', '🌷', '💗']; // อีโมจิที่จะใช้
    
    // สร้างดอกไม้ใหม่ทุกๆ 300ms
    setInterval(() => {
        const flower = document.createElement('div');
        flower.classList.add('petal');
        
        // สุ่มเลือกดอกไม้
        flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
        
        // สุ่มตำแหน่งเริ่มต้น (แนวนอน)
        flower.style.left = Math.random() * 100 + 'vw';
        
        // สุ่มขนาด
        flower.style.fontSize = (Math.random() * 20 + 10) + 'px';
        
        // สุ่มความเร็วในการตก
        flower.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        container.appendChild(flower);
        
        // ลบ element เมื่อตกถึงพื้นเพื่อไม่ให้หนักเครื่อง
        setTimeout(() => {
            flower.remove();
        }, 5000);
    }, 300);
}