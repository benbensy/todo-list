import { $, useBash, usePowerShell } from 'zx'

if (process.platform === 'win32') {
  usePowerShell()
}

if (process.platform === 'linux' || process.platform === 'darwin') {
  useBash()
}

await $`git pull origin main`
await $`pnpm install --frozen-lockfile`
await $`pnpm run db:migrate deploy`
await $`pnpm build`
await $`pnpm run start`

console.log('✅ 部署完成！')
