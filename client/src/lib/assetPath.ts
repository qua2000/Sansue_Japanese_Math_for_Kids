/**
 * GitHub Pages build only: serve copied /manus-storage assets from the repository
 * subdirectory instead of relying on the Manus development storage proxy.
 */
export function assetPath(src: string) {
  if (import.meta.env.VITE_DEPLOY_TARGET === "github-pages" && src.startsWith("/manus-storage/")) {
    return `${import.meta.env.BASE_URL}${src.slice(1)}`;
  }
  return src;
}
