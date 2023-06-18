export const nitterInstances = ["farside.link/nitter", "nitter.privacydev.net"];

export function createNitterLink(usernames: string[], isNsfw: boolean): string {
  const instance = isNsfw ? nitterInstances[1] : nitterInstances[0];
  return `https://${instance}/${usernames.join(",")}`;
}
