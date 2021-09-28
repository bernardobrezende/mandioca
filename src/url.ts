export type SearchParams = { [key: string]: string };

export function removeQueryParams(url: string) : string {
  if (!url) {
    return url;
  }
  const [ sanitizedUrl ] = url.split(/\?/);
  return sanitizedUrl;
}
