---
title: 空間向量與分量表示 (Vectors)
category: 空間幾何與向量
tags: [向量, 純量, 分量, 模長, 單位向量, 標準基底, Math102A]
prerequisites:
  - ./coordinate-systems-3d.md
related:
  - ./dot-product.md
updated: 2026-03-30
---

# 空間向量與分量表示 (Vectors)

> **一句話核心定義**：向量是同時具有大小（Magnitude）與方向（Direction）的幾何與代數對象，在三維空間中以尖括號分量 $\langle v_1, v_2, v_3 \rangle$ 表示，遵循平行四邊形加法與純量積運算律。

## 核心概念與運作原理

- **純量 vs 向量**：純量（Scalar）僅有數值大小（如質量、長度、溫度）；向量（Vector）兼具大小與方向（如位移、速度、力、扭矩）。
- **等價向量（Equivalent Vectors）**：只要大小相等且方向相同，兩向量即為相等，起點位置不影響向量本身。
- **標準基底向量（Standard Basis Vectors）**：
  $$\mathbf{\hat{i}} = \langle 1, 0, 0 \rangle, \quad \mathbf{\hat{j}} = \langle 0, 1, 0 \rangle, \quad \mathbf{\hat{k}} = \langle 0, 0, 1 \rangle$$
  三維空間中任一向量皆可唯一表示為 $\mathbf{v} = v_1 \mathbf{\hat{i}} + v_2 \mathbf{\hat{j}} + v_3 \mathbf{\hat{k}}$。

| 符號形式 | 幾何意義 | 數學表示法 |
| :--- | :--- | :--- |
| **點 (Point)** | 空間中固定位置 | 圓括號 $(x, y, z)$ |
| **位置向量 (Position Vector)** | 原點 $O$ 指向點 $P$ 的有向線段 $\vec{OP}$ | 尖括號 $\langle x, y, z \rangle$ |
| **長度/模長 (Norm)** | 向量線段長度，非負純量 | $\|\mathbf{v}\|$ 或 $|\mathbf{v}|$ |
| **單位向量 (Unit Vector)** | 長度恰為 1 的方向向量 | $\mathbf{\hat{v}} = \frac{\mathbf{v}}{\|\mathbf{v}\|}$ |

## 公式與範例

### 1. 運算性質與長度公式
設 $\mathbf{u} = \langle u_1, u_2, u_3 \rangle$、$\mathbf{v} = \langle v_1, v_2, v_3 \rangle$、$c \in \mathbb{R}$：
- **加法與減法**：$\mathbf{u} \pm \mathbf{v} = \langle u_1 \pm v_1, u_2 \pm v_2, u_3 \pm v_3 \rangle$
- **純量乘法**：$c\mathbf{v} = \langle cv_1, cv_2, cv_3 \rangle$
- **向量模長（長度）**：
  $$\|\mathbf{v}\| = \sqrt{v_1^2 + v_2^2 + v_3^2}$$
- **正規化（單位向量）**：
  $$\mathbf{\hat{v}} = \frac{\mathbf{v}}{\|\mathbf{v}\|} = \left\langle \frac{v_1}{\|\mathbf{v}\|}, \frac{v_2}{\|\mathbf{v}\|}, \frac{v_3}{\|\mathbf{v}\|} \right\rangle$$

### 2. 典型範例（Worksheet 12.2 範例）
**題目**：若 $\mathbf{u} = \langle 8, 1, -4 \rangle$、$\mathbf{v} = \langle 5, -2, 1 \rangle$，計算 $\|\mathbf{u}\|$、單位向量 $\mathbf{\hat{u}}$ 以及 $\|\mathbf{u} - \mathbf{v}\|$。
**解答**：
1. $\|\mathbf{u}\| = \sqrt{8^2 + 1^2 + (-4)^2} = \sqrt{64 + 1 + 16} = \sqrt{81} = 9$。
2. 單位向量 $\mathbf{\hat{u}} = \frac{\mathbf{u}}{9} = \left\langle \frac{8}{9}, \frac{1}{9}, -\frac{4}{9} \right\rangle$。
3. 差向量 $\mathbf{u} - \mathbf{v} = \langle 8-5, 1-(-2), -4-1 \rangle = \langle 3, 3, -5 \rangle$。
4. 模長 $\|\mathbf{u} - \mathbf{v}\| = \sqrt{3^2 + 3^2 + (-5)^2} = \sqrt{9 + 9 + 25} = \sqrt{43}$。

## 常見誤區與重點提醒

- **括號混淆**：點坐標使用圓括號 $(x, y, z)$；向量分量必須使用尖括號 $\langle x, y, z \rangle$。
- **純量倍率長度**：$\|c\mathbf{u}\| = |c| \|\mathbf{u}\|$，負數純量倍率開出長度時必須取**絕對值**。

## 關聯筆記
- **前置知識**：[三維直角坐標系與基本曲面](./coordinate-systems-3d.md)
- **延伸概念**：[向量內積與正交投影](./dot-product.md)
