import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig(({ mode }) => {

  // mode 指定环境模式 如 development 或 production，process.cwd()返回当前工作目录的路径
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      VueSetupExtend(),   // setUp插件
    ],
    server: {
      port: 3000,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        // 将@设置为./src目录的别名，fileURLToPath方法以import.meta.url作为基准url，
        // 创建了一个指向./src目录的URL对象
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
  }
})
