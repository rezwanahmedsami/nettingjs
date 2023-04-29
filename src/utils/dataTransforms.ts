export function osToNumber(os: string) {
  switch (os) {
    case 'MacIntel':
      return 0.1;
    case 'Windows NT':
      return 0.2;
    case 'Linux x86_64':
      return 0.3;
    // add more cases as needed
    default:
      return 0;
  }
}

export function browserNameToNumber(browserName: string) {
  switch (browserName) {
    case 'Mozilla Firefox':
      return 0.1;
    case 'Google Chrome':
      return 0.2;
    case 'Safari':
      return 0.3;
    case 'Microsoft Edge':
      return 0.4;
    case 'Opera':
      return 0.5;
    // add more cases as needed
    default:
      return 0;
  }
}
