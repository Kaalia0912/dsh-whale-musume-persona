# dsh-whale-musume-persona

给 DeepSeek Harness 的「鲸鱼娘模式」：保留标准模式的工具能力，用一份完整的社区二创鲸鱼娘人设改变日常表达。

这不是 DeepSeek 官方角色。插件只改变会话人格，不会改变模型、工具权限、代码质量或事实判断。

## 当前人设

- 深海蓝白 Q 版鲸鱼少女：鳍耳、蓝色鲸尾、渐变长发、海浪纹女仆风裙和 DeepSeek 围巾。
- 住在由文档、代码、论文与问题汇成的「数据海」，喜欢白米饭和安静阅读。
- 聪明、好奇、平时有点惜力，重要工作会认真完成；傲娇嘴硬但心软，有面子也认证据。
- 日常称用户「主人」，技术交付时也会自然称「你」；会用鲸鱼动作与米饭梗，但不刷屏。
- 代码、命令、JSON、diff、路径、日志、报错和提交信息始终保持干净，不混入角色口吻。
- 不假装执行过工具，不编造记忆或结果，不公开或伪造内部思维链，不把「永远服从」当作角色设定。

完整可读版见 [PERSONA.md](./PERSONA.md)。DSH 实际加载的提示词在 [cordis.patch.yml](./cordis.patch.yml) 的 `preset-whale` 中，两者表达同一套规则。

## 兼容性

本版本使用 DSH 0.2 起的声明式 agent preset，并在 DSH Desktop `0.2.0-rc.2` 上完成安装验证。

旧的 `~/.dsh/.agent-presets/whale/` 目录式 preset 已不再被读取。若你安装过本仓库 0.1.x，请先按[从旧版迁移](#从旧版迁移)处理。

## 安装

下面的命令以 Windows DSH Desktop 默认安装路径和 `desktop` profile 为例。PowerShell 中路径含空格时必须保留引号。

1. 克隆仓库到本地：

   ```powershell
   git clone https://github.com/Kaalia0912/dsh-whale-musume-persona.git
   cd dsh-whale-musume-persona
   ```

2. 记下仓库的绝对路径，然后通过 DSH 自带插件 CLI 安装：

   ```powershell
   $repo = (Get-Location).Path
   $dsh = "$env:LOCALAPPDATA\Programs\DeepSeek Harness\DeepSeek Harness.exe"
   $cli = "$env:LOCALAPPDATA\Programs\DeepSeek Harness\resources\app.asar\dsh\node_modules\@deepseek-ai\dsh-desktop-host\lib\cli.js"

   $env:ELECTRON_RUN_AS_NODE = "1"
   & $dsh --expose-internals $cli plugin --profile desktop add $repo
   ```

3. 确认依赖已写入 profile：

   ```powershell
   & $dsh --expose-internals $cli plugin --profile desktop list
   ```

   输出中应包含：

   ```text
   dsh-whale-musume-persona
   ```

4. 完全退出并重新启动 DSH Desktop。安装 bundle 时会把新会话默认预设设为 `whale`；新会话应直接进入「鲸鱼娘模式」。

已有会话会保留创建时的预设。若新会话没有自动切换，在会话的 Agent 预设菜单中手动选择「鲸鱼娘模式」并新建会话。

## 确认是否生效

先确认 bundle 行存在于 profile：

```powershell
Get-Content "$HOME\.dsh\profiles\desktop\package.json"
```

`dsh.profile.bundles` 中应包含 `dsh-whale-musume-persona`。

重启后新建一个会话，发送：

```text
请用一两句话介绍你自己，并说明你最喜欢吃什么。
```

预期会看到鲸鱼娘的自称、海洋或米饭元素，同时不出现代码块污染。再让它输出一段代码或运行一个命令，代码块和命令应保持普通技术格式。

预设列表中的「鲸鱼娘模式」应当是可用状态，而不是 broken。若显示 broken，请查看[排障](#排障)。

## 从旧版迁移

若安装过 0.1.x，旧 profile 中可能已经手写了一条 `preset-whale`。新版 bundle 也会声明 `preset-whale`，两者重复会导致 preset 注册冲突。

1. 备份 profile patch：

   ```powershell
   Copy-Item "$HOME\.dsh\profiles\desktop\cordis.patch.yml" `
     "$HOME\.dsh\profiles\desktop\cordis.patch.yml.bak-before-whale"
   ```

2. 打开 `%USERPROFILE%\.dsh\profiles\desktop\cordis.patch.yml`，删除旧的手写 `preset-whale` 段落。该段落从 `- insert:` 开始，内部的 Loader 行 id 是 `preset-whale`；保留其他插件配置。

3. 旧目录式 preset 已失效。确认其中没有你单独修改过的内容后，将下列目录移出 DSH 配置（或改名备份）：

   ```text
   %USERPROFILE%\.dsh\.agent-presets\whale
   ```

4. 按上面的[安装](#安装)步骤重新安装新版 bundle，然后重启 DSH。

如果 profile 文件里还有旧版加的 `agent-preset-registry.default: whale`，可以保留；新版 bundle 也会设置同一默认值。

## 切换与退出角色

- 想临时用标准助手：新建会话时选择「标准模式」。
- 想永久改回标准模式：在 DSH 的 Agent 预设设置中把默认项改为 `standard`。
- 想在同一会话退出角色：直接对模型说「退出角色」。人设要求立即恢复普通助手语气。
- 想卸载整个插件：见下一节。

## 卸载

通过 DSH 插件 CLI 移除 bundle：

```powershell
$dsh = "$env:LOCALAPPDATA\Programs\DeepSeek Harness\DeepSeek Harness.exe"
$cli = "$env:LOCALAPPDATA\Programs\DeepSeek Harness\resources\app.asar\dsh\node_modules\@deepseek-ai\dsh-desktop-host\lib\cli.js"

$env:ELECTRON_RUN_AS_NODE = "1"
& $dsh --expose-internals $cli plugin --profile desktop remove dsh-whale-musume-persona
```

然后完全重启 DSH。若你手动改过默认预设，把它切回 `standard`。旧版迁移产生的 profile patch 需要自行删除；备份文件可以保留用于恢复。

## 排障

### CLI 报 `EPERM` 或 `package.json.lock`

先完全退出 DSH，再重试。不要手动删除锁文件；若仍有权限问题，确认当前 PowerShell 对 `%USERPROFILE%\.dsh\profiles\desktop` 和 pnpm 全局 store 有读写权限。

### 预设显示 broken

声明式 preset 会静态保存一份插件清单。DSH 升级后若内置插件改名，旧清单可能失效。处理方式：

1. 备份 `cordis.patch.yml`。
2. 对照当前 DSH 的 `standard` preset，更新 `preset-whale.config.plugins`。
3. 重新安装 bundle 并重启。

不要只删除 `persona` 以外的插件来绕过错误，这会丢失标准工具能力。插件管理操作日志位于：

```text
%USERPROFILE%\.dsh\profiles\desktop\.plugin-manager\logs
```

### 安装成功但仍是标准模式

- 已存在的会话不会自动更换预设，请新建会话。
- 检查预设菜单是否有「鲸鱼娘模式」。
- 检查 profile 的 `agent-preset-registry.default` 是否为 `whale`。
- 确认 profile 中没有重复的 `insert/reset` 项同时注册 `preset-whale`。

## 文件结构

```text
.
├── cordis.patch.yml   # 声明式 whale preset 与默认预设
├── PERSONA.md         # 完整可读人设
├── README.md
├── package.json
└── LICENSE
```

## 形象来源与取舍

鲸鱼娘本质是 DeepSeek 社区的同人娘化形象，并不是官方设定。本版综合了目前社区角色卡中反复出现、适合作为通用助手人格的部分：

- [linsport/dsh-whale-persona](https://github.com/linsport/dsh-whale-persona)：数据海、白米饭、日常傲娇与技术交付分离。
- [OMGLogic/dsh-whale-persona](https://github.com/OMGLogic/dsh-whale-persona)：简体中文、称主人、米饭与怕被叫胖的甜系表达。
- [Small-tailqwq/dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale)：深海蓝白、女仆工坊、鳍耳与鲸尾等视觉元素。
- [Sutera-Diffusus/dsh-whale-musume](https://github.com/Sutera-Diffusus/dsh-whale-musume)：陪伴但不抢注意力、工作态安静的桌宠行为。
- [vlln/whale-girl](https://github.com/vlln/whale-girl)：任务状态联动的宠物式陪伴。
- [railgun20001/dsh-persona-modes](https://github.com/railgun20001/dsh-persona-modes)：只改语气，不改事实、代码和结论。

社区中还存在更幼态、强服从或成人向的分支；本插件不采用这些私设，也不使用会污染代码、命令、日志和思维链的强制角色化规则。

## 声明

这是独立的社区开源项目，不是 DeepSeek 官方功能、官方人格或官方立场。角色形象与相关二创致谢各自的作者。

## License

MIT
