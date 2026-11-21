import fs from 'node:fs';

const schema = fs.readFileSync('api/prisma/schema.prisma', 'utf8');
const seed = fs.readFileSync('api/prisma/seed.ts', 'utf8');
const service = fs.readFileSync('api/src/prisma/prisma.service.ts', 'utf8');
const envExample = fs.readFileSync('api/.env.example', 'utf8');
const readme = fs.readFileSync('README.md', 'utf8');

const checks = [
  ['Role enum contains PATRON and LIBRARIAN', /enum Role\s*{[^}]*PATRON[^}]*LIBRARIAN[^}]*}/s.test(schema)],
  ['User model uses Role', /model User\s*{[^}]*role\s+Role\b[^}]*}/s.test(schema)],
  ['Genre model exists', /model Genre\s*{/.test(schema)],
  ['Book model uses genreId and @relation', /model Book\s*{[^}]*genreId\s+Int[^}]*genre\s+Genre\s+@relation\(/s.test(schema)],
  ['Seed has at least 4 genres', (seed.match(/genreNames\s*=\s*\[([\s\S]*?)\];/)?.[1].match(/['"][^'"]+['"]/g)?.length ?? 0) >= 4],
  ['Seed has at least 15 book records', (seed.match(/const books\s*=\s*\[([\s\S]*?)\];/)?.[1].match(/\{ title:/g)?.length ?? 0) >= 15],
  ['PrismaService extends PrismaClient and implements OnModuleInit', /extends PrismaClient implements OnModuleInit/.test(service)],
  ['onModuleInit calls $connect', /onModuleInit\([^)]*\).*?\{\s*await this\.\$connect\(\)/s.test(service)],
  ['Environment example contains DATABASE_URL placeholder', /DATABASE_URL\s*=/.test(envExample) && /USER/.test(envExample) && /PASSWORD/.test(envExample) && /HOST/.test(envExample)],
  ['README includes Schema Decisions section', /^## Schema Decisions$/m.test(readme)],
];

for (const [name, passed] of checks) {
  console.log(`${passed ? 'PASS' : 'FAIL'}: ${name}`);
}

if (checks.some(([, passed]) => !passed)) {
  process.exit(1);
}
