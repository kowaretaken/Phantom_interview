export function logMsg(...messages: any[]) {
  if (process.env.NODE_ENV === 'development') {
    console.log(...messages); // tslint:disable-line
  }
}
export function logErr(...messages: any[]) {
  if (process.env.NODE_ENV === 'development') {
    console.error(...messages); // tslint:disable-line
  }
}
export function assignToWindow(name: string, value: any) {
  if (process.env.NODE_ENV === 'development') {
    window[name as keyof object] = value;
  }
}
