class ForgeStudio {
    constructor() {
        this.btn = document.getElementById('generateBtn');
        this.player = document.getElementById('videoPlayer');
        this.init();
    }

    init() {
        this.btn.addEventListener('click', () => this.startProduction());
    }

    async startProduction() {
        const data = {
            char: document.getElementById('char').value,
            env: document.getElementById('env').value,
            motion: document.getElementById('motion').value
        };

        if (!data.char || !data.env) return alert("Director: Essential fields missing!");

        this.setLoading(true);
        
        try {
            const prompt = encodeURIComponent(`Professional film shot, ${data.char}, in ${data.env}, ${data.motion}, 8k, cinematic lighting`);
            const url = `https://text-to-video.pollinations.ai/${prompt}?width=576&height=1024&seed=${Math.floor(Math.random()*9999)}`;
            
            // Validate the render response
            const response = await fetch(url, { method: 'HEAD' });
            if (response.ok) {
                this.player.src = url;
                this.player.load();
            } else {
                throw new Error("Render pipeline failed.");
            }
        } catch (err) {
            console.error("Production Error:", err);
            alert("The render farm is busy. Retrying...");
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(state) {
        this.btn.disabled = state;
        this.btn.innerText = state ? "RENDERING..." : "RENDER SCENE";
    }
}

// Instantiate the studio controller
new ForgeStudio();
