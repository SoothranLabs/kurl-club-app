/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// Define common and sensitive variables
const envVariables = {
  common: {
    NEXT_PUBLIC_BASE_URL: 'http://localhost:3000',
  },
  sensitive: {
    AUTH_SECRET: '',
  },
};

// Function to generate the .env file
function generateEnvFile(fileName, variables) {
  const filePath = path.join(process.cwd(), fileName);

  if (fs.existsSync(filePath)) {
    console.log(`${fileName} already exists. Skipping.`);
    return;
  }

  const content = Object.entries(variables)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  fs.writeFileSync(filePath, content);
  console.log(`${fileName} has been created.`);
}

// Generate the .env and .env.local files
console.log('Creating .env and .env.local files...');

// Generate .env file with common variables
generateEnvFile('.env', { ...envVariables.common });

// Generate .env.local file with sensitive variables
generateEnvFile('.env.local', envVariables.sensitive);

console.log('Process complete!');
