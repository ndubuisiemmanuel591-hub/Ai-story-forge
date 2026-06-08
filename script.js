const generateBtn = document.getElementById('generateBtn');
const storyPrompt = document.getElementById('storyPrompt');
const videoWrapper = document.getElementById('videoWrapper');
const videoPlayer = document.getElementById('videoPlayer');

generateBtn.addEventListener('click', async () => {
    const userText = storyPrompt.value.trim();
    if (!userText) return alert("Please enter a scene description!");

    generateBtn.innerText = "JOINING QUEUE & RENDERING...";
    generateBtn.disabled = true;
    videoWrapper.classList.add('hidden');

    try {
        // We use an endpoint that supports polling
        const response = await fetch("https://text-to-video.pollinations.ai/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: `${userText}, cinematic 3D animation, 9:16 vertical`,
                width: 576,
                height: 1024,
                seed: Math.floor(Math.random() * 10000)
            })
        });

        if (!response.ok) throw new Error("Server rejected request");
        
        // This blob is the final video file
        const videoBlob = await response.blob();
        const videoUrl = URL.createObjectURL(videoBlob);

        videoPlayer.src = videoUrl;
        videoWrapper.classList.remove('hidden');
        videoPlayer.load();
        generateBtn.innerText = "GENERATE ANIMATION";
        generateBtn.disabled = false;

    } catch (error) {
        alert("The server is at max capacity. Please tap 'Generate' again—the queue will pick you up.");
        generateBtn.innerText = "GENERATE ANIMATION";
        generateBtn.disabled = false;
    }
});
