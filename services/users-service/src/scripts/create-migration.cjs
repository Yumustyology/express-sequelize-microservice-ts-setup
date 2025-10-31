const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('❌ Please provide a migration name');
  console.log('Usage: npm run migration:new <name>');
  process.exit(1);
}

console.log(`🔨 Creating migration: ${migrationName}`);
execSync(
  `npx sequelize-cli migration:generate --name ${migrationName} --migrations-path src/migrations`,
  { stdio: 'inherit' }
);

// __dirname points to src/scripts, so go up one level to src, then to migrations
const migrationsDir = path.join(__dirname, '..', 'migrations');
const files = fs.readdirSync(migrationsDir);
// Sequelize CLI creates .js files, which we'll rename to .cjs
const newFile = files.find(f => f.includes(migrationName) && f.endsWith('.js'));

if (newFile) {
  const oldPath = path.join(migrationsDir, newFile);
  const newPath = path.join(migrationsDir, newFile.replace('.js', '.cjs'));
  fs.renameSync(oldPath, newPath);
  console.log(`✅ Created: ${newFile.replace('.js', '.cjs')}`);
} else {
  console.log('✅ Migration created');
}