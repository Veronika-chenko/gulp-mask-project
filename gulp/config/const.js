export const isBuild = process.argv.includes('--build');
export const isDev = !process.argv.includes('--build');
