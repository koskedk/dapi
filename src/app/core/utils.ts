export function extractPathFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname;
  } catch (error) {
    console.error('Invalid URL:', error);
    return '';
  }
}

export function getUrlParameter(param: string, url: string): string | null {
  const urlParams = new URL(url);
  const fragment = urlParams.hash.substring(1); // Remove the leading '#'
  const params = new URLSearchParams(fragment);
  return params.get(param);
}

