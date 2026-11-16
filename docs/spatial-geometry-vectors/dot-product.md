---
title: 向量內積與正交投影 (Dot Product)
category: 空間幾何與向量
tags: [內積, 純量積, 夾角, 正交, 投影, 分解, Math102A]
prerequisites:
  - ./vectors-basics.md
related:
  - ./cross-product.md
updated: 2026-03-30
---

# 向量內積與正交投影 (Dot Product)

> **一句話核心定義**：向量內積（又稱點積或純量積）是將兩向量對應分量相乘後加總的代數運算，其結果為純量，幾何上連繫了兩向量夾角餘弦值，是判斷垂直與計算投影的基礎工具。

## 核心概念與運作原理

- **代數定義 vs 幾何定義**：
  - 代數：$\mathbf{u} \cdot \mathbf{v} = u_1 v_1 + u_2 v_2 + u_3 v_3$
  - 幾何：$\mathbf{u} \cdot \mathbf{v} = \|\mathbf{u}\| \|\mathbf{v}\| \cos\theta$（夾角規定 $0 \le \theta \le \pi$）
  - 兩定義由餘弦定理（Law of Cosines）嚴格等價證明。
- **正交性（Orthogonality）判別**：
  - 非零向量 $\mathbf{u} \perp \mathbf{v} \iff \mathbf{u} \cdot \mathbf{v} = 0$
  - 銳角（Acute）：$\mathbf{u} \cdot \mathbf{v} > 0$
  - 鈍角（Obtuse）：$\mathbf{u} \cdot \mathbf{v} < 0$
- **正交分解（Orthogonal Decomposition）**：
  任意向量 $\mathbf{u}$ 相對非零向量 $\mathbf{v}$ 可唯一拆分為「平行分量」與「垂直分量」：
  $$\mathbf{u} = \mathbf{u}_{\parallel \mathbf{v}} + \mathbf{u}_{\perp \mathbf{v}}$$

| 投影類型 | 定義與意義 | 數學表示式 | 輸出類型 |
| :--- | :--- | :--- | :--- |
| **純量投影 (Scalar Component)** | $\mathbf{u}$ 落在 $\mathbf{v}$ 方向上的有號長度 | $\text{comp}_{\mathbf{v}} \mathbf{u} = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{v}\|}$ | 純量（可正可負） |
| **向量投影 (Vector Projection)** | $\mathbf{u}$ 落在 $\mathbf{v}$ 方向上的投影向量 | $\text{proj}_{\mathbf{v}} \mathbf{u} = \left( \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{v}\|^2} \right) \mathbf{v}$ | 向量（平行於 $\mathbf{v}$） |

## 公式與範例

### 1. 夾角餘弦與向量投影公式
- **夾角公式**：
  $$\cos\theta = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\| \|\mathbf{v}\|}, \quad \theta = \arccos\left(\frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\| \|\mathbf{v}\|}\right)$$
- **垂直分量求法**：
  $$\mathbf{u}_{\perp \mathbf{v}} = \mathbf{u} - \text{proj}_{\mathbf{v}} \mathbf{u}$$

### 2. 典型範例（Worksheet 12.3 範例）
**題目**：若 $\mathbf{u} = \langle 1, 1, -1 \rangle$、$\mathbf{v} = \langle 3, 0, 1 \rangle$，求 $\mathbf{u}$ 沿 $\mathbf{v}$ 的向量投影與正交分解。
**解答**：
1. 計算內積與模長平方：
   $\mathbf{u} \cdot \mathbf{v} = (1)(3) + (1)(0) + (-1)(1) = 2$
   $\|\mathbf{v}\|^2 = 3^2 + 0^2 + 1^2 = 10$
2. 向量投影：
   $$\mathbf{u}_{\parallel \mathbf{v}} = \frac{2}{10} \langle 3, 0, 1 \rangle = \frac{1}{5} \langle 3, 0, 1 \rangle = \left\langle \frac{3}{5}, 0, \frac{1}{5} \right\rangle$$
3. 垂直分量：
   $$\mathbf{u}_{\perp \mathbf{v}} = \mathbf{u} - \mathbf{u}_{\parallel \mathbf{v}} = \langle 1, 1, -1 \rangle - \left\langle \frac{3}{5}, 0, \frac{1}{5} \right\rangle = \left\langle \frac{2}{5}, 1, -\frac{6}{5} \right\rangle$$

## 常見誤區與重點提醒

- **分母平方遺漏**：計算 $\text{proj}_{\mathbf{v}} \mathbf{u}$ 時，分母為 $\|\mathbf{v}\|^2$，若寫成 $\|\mathbf{v}\|$ 則算成了純量投影乘以向量，單位與長度全錯。
- **內積結果不是向量**：$\mathbf{u} \cdot \mathbf{v}$ 是純量數字，絕無括號分量。

## 關聯筆記
- **前置知識**：[空間向量與分量表示](./vectors-basics.md)
- **延伸概念**：[向量外積與行列式應用](./cross-product.md)
