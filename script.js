const generateBtn = document.getElementById('generateBtn');
const storyPrompt = document.getElementById('storyPrompt');
const videoWrapper = document.getElementById('videoWrapper');
const videoPlayer = document.getElementById('videoPlayer');

generateBtn.addEventListener('click', async () => {
    const userText = storyPrompt.value.trim();
    if (!userText) return alert("Please enter a scene description first!");

    generateBtn.innerText = "STAGE 1: GENERATING 3D IMAGE...";
    generateBtn.disabled = true;
    videoWrapper.classList.add('hidden');

    try {
        // Step 1: Render the high-end 3D visual scene still asset
        const styleMod = "3D character model animation frame, cinematic game engine graphics, smooth stylized lighting, 9:16 vertical composition, clean render asset";
        const imgRes = await fetch("https://multimodalart-wan2-1-fast.hf.space/api/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: [`${userText}, ${styleMod}`, "9:16", Math.floor(Math.random() * 100000)] })
        });
        
        const imgData = await imgRes.json();
        if (!imgData.data || !imgData.data[0]) throw new Error("Image server busy");
        const generatedStillUrl = imgData.data[0].url;

        generateBtn.innerText = "STAGE 2: APPLYING SMOOTH MOTION...";

        // Step 2: Pass still directly to the heavy motion compilation matrix
        const videoRes = await fetch("https://wan-ai-wan2-1.hf.space/api/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: [
                    { path: generatedStillUrl },
                    "Cinematic camera glide, subtle natural eyes blinking, lifelike smooth breathing, high frame rate animation look, flawless camera physics",
                    10
                ]
            })
        });

        const videoData = await videoRes.json();
        const finalVideoUrl = videoData.data[0].video.url;

        // Reveal the premium vertical presentation layout
        videoPlayer.src = finalVideoUrl;
        videoWrapper.classList.remove('hidden');
        videoPlayer.load();

    } catch (error) {
        console.error(error);
        alert("The global server cluster is processing high traffic. Let's force a retry—tap generate again!");
    } finally {
        generateBtn.innerText = "GENERATE ANIMATION";
        generateBtn.disabled = false;
    }
});
