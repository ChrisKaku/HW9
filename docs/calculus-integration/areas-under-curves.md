---
title: 曲線間面積與切片法 (Areas Under Curves)
category: 微積分積分應用
tags: [面積, 定積分, 垂直切片, 水平切片, Math102A]
prerequisites:
  - ../index.md
related:
  - ./disk-washer-method.md
updated: 2026-03-30
---

# 曲線間面積與切片法 (Areas Under Curves)

> **一句話核心定義**：切片法（Slice-Approximate-Integrate）透過將二維平面封閉區域切分為無數微小長條矩形，藉由「上減下」（垂直切片）或「右減左」（水平切片）求得曲線間的精確淨面積。

## 核心概念與運作原理

- **微積分基本幾何意涵**：定積分 $\int_a^b f(x)dx$ 代表曲線 $f(x)$ 與 $x$ 軸間的有號面積（Signed Area）。當計算兩曲線所夾區域時，必須確保被積函數恆為非負。
- **三步驟核心思維**：
  1. **切片（Slice）**：將圖形細分成寬度為 $\Delta x$ 或 $\Delta y$ 的微小長條。
  2. **估算（Approximate）**：長條面積近似為高乘寬，$\Delta A \approx [f(x^*) - g(x^*)] \Delta x$。
  3. **積分（Integrate）**：取極限並累加形成定積分 $A = \int_a^b [f(x) - g(x)] dx$。

| 切片方向 | 適用情況 | 積分變數 | 高度公式 (Height) | 微元面積 $dA$ |
| :--- | :--- | :--- | :--- | :--- |
| **垂直切片 (Vertical)** | 上下邊界各自單一函數 $y=f(x), y=g(x)$ | $x$ | $y_{\text{top}} - y_{\text{bottom}}$ | $[f(x) - g(x)] dx$ |
| **水平切片 (Horizontal)** | 左右邊界各自單一函數 $x=p(y), x=q(y)$ | $y$ | $x_{\text{right}} - x_{\text{left}}$ | $[p(y) - q(y)] dy$ |

## 公式與範例

### 1. 積分公式
- **垂直切片（$x$ 軸積分）**：
  $$A = \int_{a}^{b} [f(x) - g(x)] \, dx \quad \text{其中 } f(x) \ge g(x)$$
- **水平切片（$y$ 軸積分）**：
  $$A = \int_{c}^{d} [p(y) - q(y)] \, dy \quad \text{其中 } p(y) \ge q(y)$$

### 2. 典型範例（Worksheet 6.1 範例）
**題目**：求拋物線 $y^2 = 4x$ 與直線 $4x - 3y = 4$ 所圍成之區域面積。
**解法**：
1. 解聯立交點：$x = \frac{y^2}{4} = \frac{3y+4}{4} \implies y^2 - 3y - 4 = 0 \implies y = -1, 4$。
2. 比較切片策略：
   - 若用垂直切片，底部邊界在 $x < 0.25$ 為下半拋物線，在 $x \ge 0.25$ 為直線，必須拆分為兩個積分。
   - 若用水平切片，右界恆為直線 $x = \frac{4+3y}{4}$，左界恆為拋物線 $x = \frac{y^2}{4}$，僅需單一積分：
     $$A = \int_{-1}^{4} \left( \frac{4+3y}{4} - \frac{y^2}{4} \right) dy = \frac{125}{24}$$

## 常見誤區與重點提醒

- **交點未算全**：忘記解交點就直接盲目套用上下限，可能漏掉多個封閉迴圈區域。
- **正負抵消失誤**：曲線若在中途交叉（如 $y = x^3 - 3x$ 與 $y = x$），上下曲線位置會互換，必須分段積分並取絕對值。

## 關聯筆記
- **前置知識**：[知識庫首頁與學習地圖](../index.md)
- **延伸概念**：[旋轉體體積：圓盤與圓環法](./disk-washer-method.md)
