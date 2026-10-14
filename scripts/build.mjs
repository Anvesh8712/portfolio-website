import { cp, mkdir, rm } from 'node:fs/promises';
await rm('build', { recursive: true, force: true });
await mkdir('build', { recursive: true });
for (const path of ['index.html', 'styles.css', 'script.js', 'public']) await cp(path, `build/${path}`, { recursive: true });
console.log('Built static portfolio in build/');
