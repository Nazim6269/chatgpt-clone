const clerkPublishableKey = process.env.CLERK_PUBLISHABLE_KEY;
const clerkSecretKey = process.env.CLERK_SECRET_KEY;
const mongoUrl = process.env.MONGODB_URI;
const clientUrl = process.env.CLIENT_URL;
const prodClientUrl = process.env.CLIENT_URL_PROD;
const imagekitPrivateKey = process.env.IMAGE_KIT_PRIVATE_KEY;

export {
  clerkPublishableKey,
  clerkSecretKey,
  clientUrl,
  imagekitPrivateKey,
  mongoUrl,
  prodClientUrl,
};
