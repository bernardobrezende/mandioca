export type SearchParams = { [key: string]: string };

export function sanitizeUrl(url: string) : string {
  const [ sanitizedUrl ] = url!.split(/\?/);
  return sanitizedUrl;
}
