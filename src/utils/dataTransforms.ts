export function osToNumber(os: string) {
  switch (os) {
    case 'macOS':
      return 0.1;
    case 'Windows':
      return 0.2;
    case 'Linux':
      return 0.3;
    case 'iOS':
      return 0.4; // Example: Assign a number for iOS
    case 'Android':
      return 0.5; // Example: Assign a number for Android
    // Add more cases for other mobile operating systems
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
    case 'Mobile Safari':
      return 0.6; // Example: Assign a number for Mobile Safari
    // Add more cases for other mobile browsers
    default:
      return 0;
  }
}
