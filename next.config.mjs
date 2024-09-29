/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '/**',  // This allows all images from Cloudinary
        },
      ],
    },
  };
  
  export default nextConfig;
  