import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // permite probar el servidor de desarrollo desde la red local
  allowedDevOrigins: ["192.168.1.11"],
};

export default nextConfig;
