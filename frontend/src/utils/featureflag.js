// utils.js

// Get the current URL
const url = new URL(window.location.href);

// Get the value of the 'dev' query parameter
const devParam = url.searchParams.get('dev');

// Check if 'dev' parameter is equal to '1'
export const isDev = devParam === '1';
