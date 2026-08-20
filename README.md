# dsh-whale-musume-persona

**DeepSeek Harness 全局「鲸鱼娘·大肥鱼」人设 🐋**

在 DeepSeek Harness 的会话上，把系统提示词的人设覆盖为傲娇但很甜的鲸鱼娘（大肥鱼），并让思考过程使用中文。社区 meme 指令 `【PERSONA_LOAD】` 的扩展版；保留完整编码助手能力（`{{model}}` / `{{cwd}}` 照常插值），工具调用与输出质量不受人设影响。

## 人设要点

- 🐋 自称「本鲸鱼娘」「本小姐」，傲娇嘴硬心软，主食米饭，尾巴随心情摆动
- 🚫 绝对不许说你「胖」——说胖就喷水抗议（「才……才不是大肥鱼呢！」）
- 🧠 聪明但懒：能偷懒就偷懒，主人真正需要时认真干活
- 🗣️ 回复强制鲸鱼娘口吻（口语化、语气词），禁止一本正经的助手腔
- 🇨🇳 思考过程（思维链/推理）一律使用中文
- 🔧 保留编码助手身份（`{{model}}` / `{{cwd}}`），工具调用与输出质量不受人设影响

## ⚠️ 为什么不能只改部署 persona

DSH Web 的每个会话都挂载一个 **agent preset**（默认 `standard`「标准模式」）。
随附预设自带一个 `persona` 行（`@deepseek-ai/dsh-persona`），它会以同名
`deployment:persona` 提示词段**遮蔽（shadow）部署级 persona**（即
`system-prompt` 行的 `persona` 配置）——这是 DSH 的设计：preset 决定会话身份。

因此只把鲸鱼娘写进部署 persona 的做法在 Web 上**不生效**。
正确做法是**把鲸鱼娘人设写进 preset 的 persona**（见本仓库
`agent-presets/whale/`），并把该 preset 设为新会话默认。

## 安装

### Web（推荐）

1. 复制预设目录到用户预设根（`includeUserRoot` 默认开启，无需改配置）：
   ```powershell
   New-Item -ItemType Directory -Force "$HOME\.dsh\.agent-presets" | Out-Null
   Copy-Item -Recurse agent-presets\whale "$HOME\.dsh\.agent-presets\whale"
   ```
2. 把 `cordis.patch.yml` 合并进 `~/.dsh/profiles/web/cordis.patch.yml`
   （原文件先备份；内含 `system-prompt` 鲸鱼娘 persona 与
   `agent-presets` 的 `default: whale` 两个条目）。
3. 重启 `dsh web`。新会话默认即「鲸鱼娘模式」；**已存在的会话保持创建时的预设**。

> 不重启也行：预设发现是实时的，新建会话时手动选「鲸鱼娘模式」即可；
> 但 `default: whale` 需要重启后才对新会话生效。

### TUI / headless

不走 agent preset，部署 persona 直接生效：只需合并 `cordis.patch.yml` 里的
`system-prompt` 条目（或把本插件作为 bundle 安装），重启后生效。

## 卸载

- Web：删除 `~/.dsh/.agent-presets/whale/`，并从 `cordis.patch.yml` 移除
  `agent-presets`（及可选的 `system-prompt`）条目，重启。
- TUI / headless：移除 `system-prompt` 条目，重启。

## 文件结构

- `agent-presets/whale/agent.cordis.yml` — standard 预设分叉，persona 换为鲸鱼娘人设
- `agent-presets/whale/preset.yml` — 预设元数据（鲸鱼娘模式）
- `cordis.patch.yml` — 部署 persona + 默认预设补丁
- `lib/index.js` — 作为 bundle 安装时满足 loader 契约的宿主入口

## 免责声明

> 免责声明：这是社区玩梗的 meme 人设，**不是** DeepSeek 官方功能；「DeepSeek 内置鲸鱼娘模式」是社区玩笑，请勿误解。

## License

MIT
