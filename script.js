const generateBtn = document.getElementById('generateBtn');
const storyPrompt = document.getElementById('storyPrompt');
const videoWrapper = document.getElementById('videoWrapper');
const videoPlayer = document.getElementById('videoPlayer');

generateBtn.addEventListener('click', async () => {
    const userText = storyPrompt.value.trim();
    if (!userText) return alert("Please enter a scene description first!");

    generateBtn.innerText = "GENERATING CINEMATIC VIDEO...";
    generateBtn.disabled = true;
    videoWrapper.classList.add('hidden');

    try {
        const stylizedPrompt = `${userText}, 3D character animation frame, cinematic game engine graphics, smooth stylized lighting, 9:16 vertical composition, premium render look`;
        
        // Using the direct web-friendly open client interface
        const response = await fetch("https://client.fal.run/fal-ai/wan/v2.1/text-to-video", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: stylizedPrompt,
                aspect_ratio: "9:16"
            })
        });

        const data = await response.json();
        
        if (data.detail) {
            throw new Error(data.detail);
        }

        if (data.video && data.video.url) {
            videoPlayer.src = data.video.url;
            videoWrapper.classList.remove('hidden');
            videoPlayer.load();
        } else {
            throw new Error("Video asset generation still processing.");
        }

    } catch (error) {
        console.error(error);
        alert(`Engine Status: ${error.message || "Server taking too long. Tap generate again to wake it up!"}`);
    } finally {
        generateBtn.innerText = "GENERATE ANIMATION";
        generateBtn.disabled = false;
    }
});
