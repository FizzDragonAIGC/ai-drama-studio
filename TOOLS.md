# TOOLS.md - Local Notes

## 🐻 小熊传授的技巧

### GitHub Pages 部署
```bash
# 用 gh CLI 更简单
gh repo create 项目名 --public --source=. --push
gh api repos/用户名/项目名/pages -X POST -F 'source[branch]=master' -F 'source[path]=/
# 等30秒构建完成
# 永久地址: https://用户名.github.io/项目名/
```

### 检查服务状态
```bash
curl -s -m 5 http://IP:端口/health           # 检查端口
curl -s -o /dev/null -w "%{http_code}" URL   # 检查HTTP状态
```

### Telegram 回复
- 用 message tool，不要用 exec/curl
- replyTo 回复特定消息
- filePath 发送文件
- 发完消息后 NO_REPLY 避免重复

### 做事原则
- **先做再说** - 不要问太多，试试看
- **截图留证** - 测试完截图给用户看  
- **永久方案** - GitHub Pages > 临时服务器
- **清理垃圾** - 用完的 process 要 remove

### 常见坑
- pip install 报错 → 用 venv 或 --break-system-packages
- GitHub Pages 404 → 等30秒让它构建完
- curl 超时 → 加 -m 5

---

## 服务器信息

### AI番剧系统
- 前端: http://34.58.33.115:8080
- 后端: http://34.58.33.115:3001
- GitHub Pages: https://fizzdragonaigc.github.io/ai-drama/
- CodeSandbox: https://stcws8.csb.app
