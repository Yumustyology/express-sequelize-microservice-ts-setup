import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

const PORT = Number(process.env.PORT || 4002);

async function main() {
  try {
    console.log('🚀 Starting Posts API server...');
    console.log('Connecting to posts database...');

    if ((app as any).connectDb) {
      await (app as any).connectDb();
      console.log('✅ Posts database connected and synced successfully.');
    }

    app.listen(PORT, () => {
      console.log(`✅ Posts server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start posts server:', err);
    process.exit(1);
  }
}

main();
