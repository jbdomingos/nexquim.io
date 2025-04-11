// Animação do Banner
class BannerAnimation {
    constructor() {
        this.canvas = document.getElementById('banner-animation');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.particleCount = 0;
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        this.resize();
        this.createParticles();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = 600;
        this.particleCount = Math.min(Math.floor(this.canvas.width * 0.05), 80);
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 4 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1,
                opacitySpeed: Math.random() * 0.01
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Atualizar posição
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Verificar bordas
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            
            // Efeito de pulsação na opacidade
            particle.opacity += particle.opacitySpeed;
            if (particle.opacity > 0.6 || particle.opacity < 0.1) {
                particle.opacitySpeed *= -1;
            }
            
            // Interação com o mouse
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;
            
            if (distance < maxDistance) {
                const angle = Math.atan2(dy, dx);
                const force = (maxDistance - distance) / maxDistance;
                particle.x -= Math.cos(angle) * force * 2;
                particle.y -= Math.sin(angle) * force * 2;
                particle.opacity = Math.min(0.8, particle.opacity + 0.2);
            }
            
            // Desenhar partícula
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(66, 184, 253, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // Desenhar linhas entre partículas próximas
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(66, 184, 253, ${0.15 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => this.init());
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }
}

// Animação de moléculas
function initMoleculeAnimation() {
    const canvas = document.getElementById('molecule-animation');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuração inicial
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = canvas.clientHeight;

    // Arrays para moléculas e ligações
    const molecules = [];
    const bonds = [];
    const mouse = { x: 0, y: 0 };

    // Criar moléculas aleatórias
    function createMolecules() {
        molecules.length = 0;
        bonds.length = 0;

        // Criar átomos - quantidade baseada no tamanho da tela
        const atomCount = Math.min(Math.floor((width * height) / 50000), 15);

        for (let i = 0; i < atomCount; i++) {
            molecules.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 6 + 8, // Tamanho reduzido
                color: i % 3 === 0 ? "rgb(0, 74, 152)" : i % 3 === 1 ? "rgb(0, 93, 191)" : "rgb(66, 184, 253)",
                vx: (Math.random() - 0.5) * 0.3, // Velocidade reduzida
                vy: (Math.random() - 0.5) * 0.3  // Velocidade reduzida
            });
        }

        // Criar ligações entre átomos
        for (let i = 0; i < molecules.length; i++) {
            const connections = Math.floor(Math.random() * 2) + 1;
            for (let j = 0; j < connections; j++) {
                const target = Math.floor(Math.random() * molecules.length);
                if (target !== i) {
                    bonds.push({ from: i, to: target });
                }
            }
        }
    }

    function handleMouseMove(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }

    function handleResize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = canvas.clientHeight;
        createMolecules();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Desenhar ligações com opacidade reduzida
        ctx.lineWidth = 1.5; // Linha mais fina
        bonds.forEach(bond => {
            const from = molecules[bond.from];
            const to = molecules[bond.to];

            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.strokeStyle = "rgba(66, 184, 253, 0.15)"; // Opacidade reduzida
            ctx.stroke();
        });

        // Atualizar e desenhar átomos
        molecules.forEach((molecule, index) => {
            // Movimento natural
            molecule.x += molecule.vx;
            molecule.y += molecule.vy;

            // Verificar bordas
            if (molecule.x < molecule.radius || molecule.x > width - molecule.radius) {
                molecule.vx *= -1;
            }

            if (molecule.y < molecule.radius || molecule.y > height - molecule.radius) {
                molecule.vy *= -1;
            }

            // Interação com o mouse
            const dx = mouse.x - molecule.x;
            const dy = mouse.y - molecule.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const angle = Math.atan2(dy, dx);
                const force = (150 - distance) / 150;
                molecule.vx -= Math.cos(angle) * force * 0.15; // Força reduzida
                molecule.vy -= Math.sin(angle) * force * 0.15; // Força reduzida
            }

            // Desenhar átomo com opacidade reduzida
            ctx.beginPath();
            ctx.arc(molecule.x, molecule.y, molecule.radius, 0, Math.PI * 2);

            // Extrair componentes RGB e aplicar opacidade reduzida
            let color = molecule.color;
            if (color.startsWith("rgb(")) {
                color = color.replace("rgb(", "").replace(")", "");
                const [r, g, b] = color.split(",").map(c => parseInt(c.trim()));
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.4)`; // Opacidade reduzida para 0.4
            } else {
                ctx.fillStyle = molecule.color;
            }

            ctx.fill();

            // Adicionar brilho com opacidade reduzida
            ctx.beginPath();
            ctx.arc(
                molecule.x - molecule.radius * 0.3,
                molecule.y - molecule.radius * 0.3,
                molecule.radius * 0.2,
                0,
                Math.PI * 2
            );
            ctx.fillStyle = "rgba(255, 255, 255, 0.3)"; // Opacidade reduzida
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    createMolecules();
    animate();
}

// Inicializar animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new BannerAnimation();
    initMoleculeAnimation();
}); 