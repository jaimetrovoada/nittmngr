export const nitterInstances = ["nitter.net", "nitter.privacydev.net"];

function getRandomNitterInstance() {
  return nitterInstances[Math.floor(Math.random() * nitterInstances.length)];
}

export function createNitterLink(
  usernames: string[],
  customInstance?: string
): string {
  const instance = customInstance || getRandomNitterInstance();
  return `https://${instance}/${usernames.join(",")}`;
}
