# Public 目录说明

这个目录用于存放静态资源文件（图片、字体等）。

## 在前端 React 组件中使用本地图片

### 方式 1：放在 public 目录（推荐，最简单）

1. **将图片放在 `public/images/` 目录下**
   ```
   public/
     images/
       banner.png
       logo.png
   ```

2. **在 React 组件中直接使用绝对路径**（无需 import）

```tsx
// 在 JSX 中直接使用
<img src="/images/banner.png" alt="Banner" className="w-full" />

// 作为背景图片
<div style={{ backgroundImage: 'url(/images/banner.png)' }}>
  {/* 内容 */}
</div>

// 使用 Tailwind CSS 类
<div className="bg-[url('/images/banner.png')] bg-cover">
  {/* 内容 */}
</div>
```

**优点**：
- ✅ 最简单，无需 import
- ✅ 路径固定，不会改变
- ✅ 适合大图片或需要直接引用的资源

### 方式 2：通过 import 导入

1. **将图片放在组件目录或项目根目录**
   ```
   components/
     Layout.tsx
     assets/
       logo.png
   ```

2. **使用 import 导入**

```tsx
import logoImage from './assets/logo.png';
// 或
import logoImage from '../images/logo.png';

// 在 JSX 中使用
<img src={logoImage} alt="Logo" className="w-12 h-12" />
```

**优点**：
- ✅ Vite 会优化图片（压缩、hash 文件名等）
- ✅ 如果图片不存在，构建时会报错（更安全）
- ✅ 适合组件相关的资源

## 实际使用示例

### 在 Layout.tsx 中使用：

```tsx
// 方式 1：使用 public 目录
<img src="/images/marianne-logo.png" alt="Logo" className="w-12 h-12" />

// 方式 2：通过 import
import logoImage from '../images/logo.png';
<img src={logoImage} alt="Logo" className="w-12 h-12" />
```

### 在 TopicView.tsx 中显示图片：

```tsx
// 如果 content block 中有图片
{block.type === 'image' && (
  <img 
    src={`/images/${block.fr}`}  // 假设 block.fr 是图片文件名
    alt={block.cn} 
    className="w-full rounded-lg shadow"
  />
)}
```

## 注意事项

- `public` 目录中的文件会被直接复制到构建输出，路径保持不变
- 使用绝对路径时，路径以 `/` 开头（如 `/images/banner.png`）
- 通过 import 导入的图片会被 Vite 优化处理（压缩、hash 文件名）
- 建议将图片放在 `public/images/` 目录下，便于管理
