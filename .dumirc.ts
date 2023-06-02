import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  apiParser: {},
  resolve: {
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: './src/index.ts',
  },
  themeConfig: {
    name: 'Panda',
    logo: '/favicon.png',
    nav: {
      mode: 'override',
      value: [{ title: '组件', link: '/components/pro-select' }],
    },
    socialLinks: {
      github: 'https://github.com/qianxingW/panda-design-pro.git',
    },
    rtl: true,
  },
});
