/// <reference types="vite/client" />
/// <reference types="vite-imagetools/client" />

// Imagetools query parameters for optimized image imports
// Usage: import img from './image.png?w=800&format=webp'
declare module '*&imagetools' {
  const src: string;
  export default src;
}

declare module '*?format=webp' {
  const src: string;
  export default src;
}

declare module '*?w=*' {
  const src: string;
  export default src;
}