export const nitterInstances = ["farside.link/nitter", "nitter.privacydev.net"];

export function createNitterLink(
  usernames: string[],
  instanceType?: string
): string {
  const instance =
    instanceType === "random" ? nitterInstances[0] : nitterInstances[1];
  return `https://${instance}/${usernames.join(",")}`;
}
