// Lists every "[ADD ...]" placeholder still in the site content.
// Run before deploying: npm run check:placeholders
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const roots = ['src/data', 'index.html']
const hits = []
const walk = (p) => {
  if (statSync(p).isDirectory()) return readdirSync(p).forEach((f) => walk(join(p, f)))
  readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
    if (/^\s*(\/\/|\*|<!--)/.test(line)) return // skip comments
    const m = line.match(/\[ADD[^\]]*\]/g)
    if (m) hits.push(`${p}:${i + 1}  ${m.join('  ')}`)
  })
}
roots.forEach(walk)
if (hits.length) {
  console.log(`\n${hits.length} line(s) still contain placeholders:\n`)
  console.log(hits.join('\n'))
  process.exitCode = 1
} else console.log('No placeholders left. Ready to deploy.')
