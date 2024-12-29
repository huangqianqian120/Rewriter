# AI编辑室

一个简单的AI文章生成工具。

## 功能
- 输入关键词生成文章
- 一键复制生成内容
- 响应式设计

## 部署
1. 配置OSS环境变量：
   ```bash
   export OSS_ACCESS_KEY_ID='your_key_id'
   export OSS_ACCESS_KEY_SECRET='your_key_secret'
   export OSS_BUCKET_NAME='your_bucket'
   export OSS_ENDPOINT='your_endpoint'
   ```

2. 运行部署脚本：
   ```bash
   cd deploy
   python deploy_oss.py
   ```

## 开发
1. 克隆仓库
2. 在浏览器中打开 src/index.html
3. 修改代码并测试 