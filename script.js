const generateBtn = document.getElementById('generateBtn');
const storyPrompt = document.getElementById('storyPrompt');
const videoWrapper = document.getElementById('videoWrapper');
const videoPlayer = document.getElementById('videoPlayer');

// Authenticated private line to skip the public queues
const HF_TOKEN = "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"; 

generateBtn.addEventListener('click', async () => {
    const userText = storyPrompt.value.trim();
    if (!userText) return alert("Please enter a scene description first!");

    generateBtn.innerText = "STAGE 1: GENERATING 3D IMAGE...";
    generateBtn.disabled = true;
    videoWrapper.classList.add('hidden');

    try {
        const styleMod = "3D character model animation frame, cinematic game engine graphics, smooth stylized lighting, 9:16 vertical composition, clean render asset";
        const imgRes = await fetch("https://multimodalart-wan2-1-fast.hf.space/api/predict", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                ...(HF_TOKEN && { "Authorization": `Bearer ${HF_TOKEN}` })
            },
            body: JSON.stringify({ data: [`${userText}, ${styleMod}`, "9:16", Math.floor(Math.random() * 100000)] })
        });
        
        const imgData = await imgRes.json();
        if (!imgData.data || !imgData.data[0]) throw new Error("Image server busy");
        const generatedStillUrl = imgData.data[0].url;

        generateBtn.innerText = "STAGE 2: APPLYING SMOOTH MOTION...";

        const videoRes = await fetch("https://wan-ai-wan2-1.hf.space/api/predict", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                ...(HF_TOKEN && { "Authorization": `Bearer ${HF_TOKEN}` })
            },
            body: JSON.stringify({
                data: [
                    { path: generatedStillUrl },
                    "Cinematic camera glide, subtle natural eyes blinking, lifelike smooth breathing, high frame rate animation look, flawless camera physics",
                    10
                ]
            })
        });

        const videoData = await videoRes.json();
        if (!videoData.data || !videoData.data[0]?.video?.url) throw new Error("Video server busy");
        const finalVideoUrl = videoData.data[0].video.url;

        videoPlayer.src = finalVideoUrl;
        videoWrapper.classList.remove('hidden');
        videoPlayer.load();

    } catch (error) {
        console.error(error);
        alert("The backend endpoint is currently queued. Tap generate again to re-verify the transaction pipeline!");
    } finally {
        generateBtn.innerText = "GENERATE ANIMATION";
        generateBtn.disabled = false;
    }
});
