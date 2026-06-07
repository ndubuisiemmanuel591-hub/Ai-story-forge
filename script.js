const generateBtn = document.getElementById('generateBtn');
const storyPrompt = document.getElementById('storyPrompt');
const videoWrapper = document.getElementById('videoWrapper');
const videoPlayer = document.getElementById('videoPlayer');

// Enterprise GPU route key
const FAL_KEY = "A8b056c4-c5b7-4065-9cec-fcf00ad150c3:bfbc65ecff2599d7e03b3175f1ee5b17"; 

generateBtn.addEventListener('click', async () => {
    const userText = storyPrompt.value.trim();
    if (!userText) return alert("Please enter a scene description first!");

    generateBtn.innerText = "GENERATING CINEMATIC VIDEO...";
    generateBtn.disabled = true;
    videoWrapper.classList.add('hidden');

    try {
        // Advanced 3D styling prompts bundled directly into the text pipeline
        const stylizedPrompt = `${userText}, 3D character animation frame, cinematic game engine graphics, smooth stylized lighting, 9:16 vertical composition, premium render look`;
        
        const response = await fetch("https://queue.fal.run/fal-ai/wan/v2.1/text-to-video", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Key ${FAL_KEY}`
            },
            body: JSON.stringify({
                prompt: stylizedPrompt,
                aspect_ratio: "9:16"
            })
        });

        const data = await response.json();
        
        // Fal processes requests using an optimized queue. Let's pull the final file string.
        if (data.video && data.video.url) {
            videoPlayer.src = data.video.url;
            videoWrapper.classList.remove('hidden');
            videoPlayer.load();
        } else {
            throw new Error("Pipeline compilation delayed.");
        }

    } catch (error) {
        console.error(error);
        alert("System processing engine busy. Tap generate again to kickstart the visual compiler!");
    } finally {
        generateBtn.innerText = "GENERATE ANIMATION";
        generateBtn.disabled = false;
    }
});
