const generateBtn = document.getElementById('generateBtn');
const storyPrompt = document.getElementById('storyPrompt');
const videoWrapper = document.getElementById('videoWrapper');
const videoPlayer = document.getElementById('videoPlayer');

generateBtn.addEventListener('click', async () => {
    const userText = storyPrompt.value.trim();
    if (!userText) return alert("Please enter a scene description first!");

    generateBtn.innerText = "COMPILING 3D VIDEO STREAM...";
    generateBtn.disabled = true;
    videoWrapper.classList.add('hidden');

    try {
        // Encoding the prompt text cleanly to prevent web link breakages
        const cleanPrompt = encodeURIComponent(`${userText}, 3D character animation, cinematic lighting, 9:16 portrait composition, high fidelity render`);
        
        // Public open-access video engine route (Zero Auth Keys Required)
        const videoUrl = `https://text-to-video.pollinations.ai/${cleanPrompt}`;

        // Verify the stream is active by pinging the link header
        const checkStream = await fetch(videoUrl, { method: 'HEAD' });
        
        if (checkStream.ok) {
            videoPlayer.src = videoUrl;
            videoWrapper.classList.remove('hidden');
            videoPlayer.load();
        } else {
            throw new Error("Cluster compilation taking longer than expected.");
        }

    } catch (error) {
        console.error(error);
        alert("The public AI cluster is processing. Tap generate again to re-verify the animation stream!");
    } finally {
        generateBtn.innerText = "GENERATE ANIMATION";
        generateBtn.disabled = false;
    }
});
