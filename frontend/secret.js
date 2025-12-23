const serverUrl = import.meta.env.VITE_BACKEND_URL;
const imagekitUrl = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const imagekitPublicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
const publishableKey = import.meta.env.VITE_PUBLISHABLE_KEY;

export {
  geminiApiKey,
  imagekitPublicKey,
  imagekitUrl,
  publishableKey,
  serverUrl,
};
