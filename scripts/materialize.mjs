import { gunzipSync } from 'node:zlib';
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = process.cwd();
const parts = readdirSync(root)
  .filter((name) => name.startsWith('site.bundle.part-'))
  .sort();
if (!parts.length) throw new Error('No site.bundle.part-* files found');
const encoded = parts.map((name) => readFileSync(resolve(root, name), 'utf8')).join('').replace(/\s+/g, '');
const manifest = JSON.parse(gunzipSync(Buffer.from(encoded, 'base64')).toString('utf8'));
if (!manifest || manifest.version !== 1 || !Array.isArray(manifest.files)) {
  throw new Error('Invalid site bundle manifest');
}

const managed = [
  'src', 'scripts',
  '.env.example', '.gitignore',
  'AMAZON_CATALOG_AUDIT.csv', 'ARCHITECTURE.md', 'AUTHOR_IDENTITY_LEDGER.csv',
  'BOOK_CATALOG_GUIDE.md', 'BOOK_INVENTORY.csv', 'BOOK_REVIEW_QUEUE.csv',
  'CONTENT_UPDATE_GUIDE.md', 'DEPLOYMENT_RUNBOOK.md', 'DOMAIN_AND_DNS.md',
  'LAUNCH_CHECKLIST.md', 'PUBLISHER_IDENTITY_LEDGER.csv', 'QA_REPORT.md',
  'README.md', 'REDIRECT_MAP.md', 'RETAIL_LINK_LEDGER.csv', 'ROLLBACK_PLAN.md',
  'UNVERIFIED_AMAZON_MATCHES.csv', 'eslint.config.mjs', 'next-env.d.ts',
  'next.config.ts', 'package.json', 'postcss.config.mjs', 'tsconfig.json'
];
for (const item of managed) rmSync(resolve(root, item), { recursive: true, force: true });

for (const file of manifest.files) {
  if (typeof file.path !== 'string' || typeof file.content !== 'string') {
    throw new Error('Malformed file entry in bundle');
  }
  const target = resolve(root, file.path);
  if (!target.startsWith(root + '/')) throw new Error(`Unsafe path: ${file.path}`);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, Buffer.from(file.content, 'base64'));
}
console.log(`Materialized ${manifest.files.length} files from ${parts.length} bundle parts`);
