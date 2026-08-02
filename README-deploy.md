# UMAX Sports 独立站 — 部署说明

域名目标：`umaxsports.com`  
技术架构：GitHub + Vercel + Cloudflare + Namecheap

---

## 目录结构

```
umax-website/
├── index.html                  # 首页
├── get-a-quote.html            # 询盘页（RFQ表单）
├── custom-branding.html        # 定制服务页（待生成）
├── ready-to-ship.html          # 现货页（待生成）
├── factory-quality.html        # 工厂品控页（待生成）
├── about.html                  # 关于页（待生成）
├── products/
│   ├── custom-gym-turf.html    # 草坪产品页
│   ├── functional-equipment.html # 功能器材页
│   ├── rubber-flooring.html    # 橡胶地板页
│   └── golf-baseball-mats.html # 高尔夫/棒球垫（待生成）
├── solutions/
│   ├── commercial-gyms.html    # 解决方案（待生成）
│   ├── fitness-studios.html
│   └── distributors.html
├── assets/
│   ├── css/style.css           # 全站样式
│   ├── js/main.js              # 全站脚本
│   └── img/                   # 放置你的产品图片
└── README-deploy.md            # 本文件
```

---

## 第一步：上传到 GitHub

1. 登录 https://github.com 并新建仓库，命名为 `umax-website`（设为 **Public**）
2. 将整个 `umax-website/` 文件夹内的所有文件拖拽上传，或使用命令：
   ```bash
   git init
   git add .
   git commit -m "Initial UMAX website"
   git remote add origin https://github.com/你的用户名/umax-website.git
   git push -u origin main
   ```

---

## 第二步：Vercel 部署

1. 登录 https://vercel.com（用 GitHub 账号登录）
2. 点击 **"Add New Project"** → 导入刚才的 `umax-website` 仓库
3. Framework Preset 选 **"Other"**（因为是纯静态 HTML）
4. Root Directory 保持默认（不用改）
5. 点击 **Deploy** → 等待 1 分钟 → 得到 `*.vercel.app` 临时链接，先确认网站能正常访问

---

## 第三步：购买域名（Namecheap）

1. 登录 https://www.namecheap.com
2. 搜索 `umaxsports.com`，加入购物车，结账（约 $10–13/年）
3. 购买完成后，进入 **Domain List → Manage → Advanced DNS**

---

## 第四步：Cloudflare 接管 DNS（推荐）

1. 登录 https://www.cloudflare.com → **Add a Site** → 输入 `umaxsports.com`
2. 选免费 Free 套餐 → Cloudflare 会扫描并显示原有 DNS 记录
3. Cloudflare 会给你 **2个 Nameserver**（格式如 `xxx.ns.cloudflare.com`）
4. 回到 Namecheap → Domain List → Nameservers → 选 **"Custom DNS"** → 填入 Cloudflare 的 Nameserver
5. 等待 1–24 小时生效

---

## 第五步：绑定自定义域名到 Vercel

1. 回到 Vercel → 你的项目 → **Settings → Domains**
2. 添加 `umaxsports.com` 和 `www.umaxsports.com`
3. Vercel 会显示需要添加的 **DNS 记录**（A记录或CNAME）
4. 在 Cloudflare DNS 中添加这些记录（记得开 Proxy 橙色云朵）
5. 等待生效后，访问 `umaxsports.com` 即可看到网站

---

## 第六步：询盘表单对接（上线前必做）

当前表单提交是前端模拟，实际发邮件需要接入第三方服务：

### 方案A：Formspree（推荐，免费版够用）
1. 注册 https://formspree.io → 创建一个 Form
2. 得到 endpoint 如 `https://formspree.io/f/xxxxx`
3. 在 `get-a-quote.html` 中修改 form 标签：
   ```html
   <form action="https://formspree.io/f/xxxxx" method="POST" id="rfq-form">
   ```
4. 在 `main.js` 中移除 `e.preventDefault()` 和表单劫持逻辑，改为普通 POST 提交

### 方案B：EmailJS（支持发到指定邮箱）
- 注册 https://www.emailjs.com → 连接你的 Gmail（zoey@umaxsporting.com）
- 官方文档：https://www.emailjs.com/docs/

---

## 图片替换说明

当前产品图片区域为占位符（灰色色块），上线前替换步骤：

1. 从 `优迈独立站资料.zip` 中选取高清产品图
2. 建议命名规范：`turf-hero.jpg`、`flooring-01.jpg` 等
3. 放入 `assets/img/` 文件夹
4. 在各 HTML 页面中将：
   ```html
   <div class="img-placeholder">Custom Gym Turf</div>
   ```
   替换为：
   ```html
   <img src="../assets/img/turf-hero.jpg" alt="Custom gym turf with branded lane markings" loading="lazy" />
   ```

---

## SEO 检查清单（上线前）

- [ ] 每页都有唯一 `<title>` 和 `<meta description>`
- [ ] `<link rel="canonical">` 指向正确 URL
- [ ] 所有图片有 `alt` 属性
- [ ] 添加 `sitemap.xml`（可用 https://www.xml-sitemaps.com 生成）
- [ ] 在 Google Search Console 提交域名和 sitemap
- [ ] Cloudflare 开启 Auto Minify（CSS/JS/HTML）

---

## 联系方式确认

| 字段 | 内容 |
|------|------|
| WhatsApp | +86 183 5833 8643 |
| Email | zoey@umaxsporting.com |
| Alibaba | https://hzumax.en.alibaba.com/ |
| Company | Hangzhou Umax Sports Co., Ltd. |

---

## 待补充页面（后续优先级）

| 页面 | 优先级 | 说明 |
|------|--------|------|
| factory-quality.html | 高 | 8步质检、100%检验、工厂视频 |
| about.html | 高 | 10年经验、200+员工 |
| custom-branding.html | 高 | OEM/ODM流程 |
| ready-to-ship.html | 中 | 现货产品+发货时间（需业务确认库存） |
| solutions/commercial-gyms.html | 中 | 商业健身房解决方案 |
| solutions/fitness-studios.html | 中 | 工作室解决方案 |
| solutions/distributors.html | 中 | 经销商解决方案 |
| products/golf-baseball-mats.html | 低 | 次级品类 |

告诉 Accio Work 你想继续生成哪个页面，直接说"帮我生成工厂品控页"即可。
