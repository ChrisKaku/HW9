---
title: 旋轉體體積：柱殼法 (Cylindrical Shells)
category: 微積分積分應用
tags: [柱殼法, 旋轉體, 體積, 展開薄片, Math102A]
prerequisites:
  - ./areas-under-curves.md
  - ./disk-washer-method.md
related:
  - ../spatial-geometry-vectors/coordinate-systems-3d.md
updated: 2026-03-30
---

# 旋轉體體積：柱殼法 (Cylindrical Shells)

> **一句話核心定義**：柱殼法是將旋轉體透過「**平行於旋轉軸**」切割為一系列薄壁同心圓柱殼，藉由剪開展開成薄長方形紙片模型（長度 $2\pi r$、高度 $h$、厚度 $\Delta r$）累加積分求體積的方法。

## 核心概念與運作原理

- **為何需要柱殼法？**：在圓盤或圓環法中，需垂直於旋轉軸切割。但遇到曲線方程式難以反解（例如 $y = 3x^2 - 2x^5$ 反解 $x$ 極其繁瑣），或是邊界曲線會導致複雜分段時，平行於旋轉軸的柱殼法可大幅簡化計算。
- **展開幾何模型**：
  - 半徑 $r$ 的薄圓柱，圓周長為 $2\pi r$。
  - 沿母線剖開壓平後，為一薄長方體，體積微元為：
    $$\Delta V \approx 2\pi \cdot r \cdot h \cdot \Delta r$$
- **旋轉軸與積分變數關係**（與圓盤法相反！）：
  - **繞鉛直軸旋轉**（如 $y$ 軸）：柱殼半徑為水平方向，厚度為 $\Delta x$，對 **$x$ 積分**！
  - **繞水平軸旋轉**（如 $x$ 軸）：柱殼半徑為鉛直方向，厚度為 $\Delta y$，對 **$y$ 積分**！

| 方法比較 | 切片方向與旋轉軸關係 | 繞 $y$ 軸旋轉之積分變數 | 繞 $x$ 軸旋轉之積分變數 |
| :--- | :--- | :--- | :--- |
| **圓盤/圓環法 (Discs/Washers)** | **垂直** (Perpendicular) | $dy$ 積分 | $dx$ 積分 |
| **柱殼法 (Shells)** | **平行** (Parallel) | $dx$ 積分 | $dy$ 積分 |

## 公式與範例

### 1. 積分公式
- **繞 $y$ 軸（或鉛直軸 $x = a$）旋轉**：
  $$V = \int_{a}^{b} 2\pi \, (\text{radius}) \, (\text{height}) \, dx = 2\pi \int_{a}^{b} x \cdot [f(x) - g(x)] \, dx$$
- **繞 $x$ 軸（或水平軸 $y = b$）旋轉**：
  $$V = \int_{c}^{d} 2\pi \, (\text{radius}) \, (\text{height}) \, dy = 2\pi \int_{c}^{d} y \cdot [p(y) - q(y)] \, dy$$

### 2. 典型範例（Worksheet 6.3 範例）
**題目**：區域由 $y = 3x - 2, x = 0, y = 5$ 所圍成，繞 $y$ 軸旋轉，用柱殼法求體積。
**解法**：
1. 平行於 $y$ 軸切鉛直線，積分變數為 $x$。
2. 柱殼半徑為 $r(x) = x - 0 = x$。
3. 柱殼高度為 $h(x) = 5 - (3x - 2) = 7 - 3x$。
4. 解交點得 $x$ 範圍為 $0 \le x \le \frac{7}{3}$。
5. 建立積分式：
   $$V = 2\pi \int_{0}^{7/3} x (7 - 3x) \, dx = 2\pi \int_{0}^{7/3} (7x - 3x^2) \, dx$$

## 常見誤區與重點提醒

- **半徑公式寫錯**：若旋轉軸不是坐標軸（例如繞 $x = -2$ 旋轉），半徑為 $r = x - (-2) = x + 2$，萬勿直接寫 $x$。
- **混淆圓盤與柱殼之積分變數**：圓盤繞 $y$ 軸用 $dy$；柱殼繞 $y$ 軸用 $dx$。考前務必畫出切片直線再確認厚度變數。

## 關聯筆記
- **前置知識**：[旋轉體體積：圓盤與圓環法](./disk-washer-method.md)
- **延伸概念**：[三維直角坐標系與基本曲面](../spatial-geometry-vectors/coordinate-systems-3d.md)
