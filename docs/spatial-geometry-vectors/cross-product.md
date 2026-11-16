---
title: 向量外積與行列式應用 (Cross Product)
category: 空間幾何與向量
tags: [外積, 行列式, 右手定則, 法向量, 扭矩, Math102A]
prerequisites:
  - ./vectors-basics.md
  - ./dot-product.md
related:
  - ./lines-and-planes.md
updated: 2026-03-30
---

# 向量外積與行列式應用 (Cross Product)

> **一句話核心定義**：向量外積（又稱叉積或向量積）僅定義於三維空間中，將兩個向量運算得出一個**同時垂直於兩原向量**的新向量，其大小等於兩向量張開之平行四邊形面積。

## 核心概念與運作原理

- **純量積 vs 向量積**：內積（$\mathbf{u} \cdot \mathbf{v}$）運算結果為**純量**；外積（$\mathbf{u} \times \mathbf{v}$）運算結果為**三維空間向量**。
- **反交換律（Anti-commutative）**：順序互換會反向，即：
  $$\mathbf{u} \times \mathbf{v} = -(\mathbf{v} \times \mathbf{u})$$
- **幾何特徵三要素**：
  1. **方向正交**：$\mathbf{u} \times \mathbf{v} \perp \mathbf{u}$ 且 $\mathbf{u} \times \mathbf{v} \perp \mathbf{v}$。
  2. **大小意涵**：$\|\mathbf{u} \times \mathbf{v}\| = \|\mathbf{u}\|\|\mathbf{v}\|\sin\theta$，即兩向量所夾平行四邊形面積。
  3. **右手定則（Right-hand Rule）**：右手四指由 $\mathbf{u}$ 順夾角彎向 $\mathbf{v}$，大拇指指向即為外積方向。

| 性質比較 | 內積 $\mathbf{u} \cdot \mathbf{v}$ | 外積 $\mathbf{u} \times \mathbf{v}$ |
| :--- | :--- | :--- |
| **運算結果** | 純量（Scalar） | 三維向量（Vector in $\mathbb{R}^3$） |
| **自身運算** | $\mathbf{u} \cdot \mathbf{u} = \|\mathbf{u}\|^2$ | $\mathbf{u} \times \mathbf{u} = \mathbf{0}$ |
| **交換律** | $\mathbf{u} \cdot \mathbf{v} = \mathbf{v} \cdot \mathbf{u}$ | $\mathbf{u} \times \mathbf{v} = -\mathbf{v} \times \mathbf{u}$ |
| **幾何判別** | $\mathbf{u} \cdot \mathbf{v} = 0 \iff$ 兩向量正交 ($\theta = \frac{\pi}{2}$) | $\mathbf{u} \times \mathbf{v} = \mathbf{0} \iff$ 兩向量平行或共線 ($\theta = 0, \pi$) |

## 公式與範例

### 1. 三階行列式符號計算公式
設 $\mathbf{u} = \langle u_1, u_2, u_3 \rangle$、$\mathbf{v} = \langle v_1, v_2, v_3 \rangle$：

$$\mathbf{u} \times \mathbf{v} = \begin{vmatrix} \mathbf{\hat{i}} & \mathbf{\hat{j}} & \mathbf{\hat{k}} \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{vmatrix} = \begin{vmatrix} u_2 & u_3 \\ v_2 & v_3 \end{vmatrix} \mathbf{\hat{i}} - \begin{vmatrix} u_1 & u_3 \\ v_1 & v_3 \end{vmatrix} \mathbf{\hat{j}} + \begin{vmatrix} u_1 & u_2 \\ v_1 & v_2 \end{vmatrix} \mathbf{\hat{k}}$$

### 2. 純量三重積（Scalar Triple Product）與平行六面體體積
三個向量 $\mathbf{u}, \mathbf{v}, \mathbf{w}$ 所張開之平行六面體體積 $V$ 為：

$$V = |\mathbf{u} \cdot (\mathbf{v} \times \mathbf{w})| = \left| \det \begin{pmatrix} u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \\ w_1 & w_2 & w_3 \end{pmatrix} \right|$$

### 3. 典型範例（Worksheet 12.4 範例）
**題目**：若 $\mathbf{u} = \langle 3, 1, -2 \rangle$、$\mathbf{v} = \langle 1, -2, 1 \rangle$，計算 $\mathbf{u} \times \mathbf{v}$。
**解法**：
$$\mathbf{u} \times \mathbf{v} = \begin{vmatrix} 1 & -2 \\ -2 & 1 \end{vmatrix}\mathbf{\hat{i}} - \begin{vmatrix} 3 & -2 \\ 1 & 1 \end{vmatrix}\mathbf{\hat{j}} + \begin{vmatrix} 3 & 1 \\ 1 & -2 \end{vmatrix}\mathbf{\hat{k}}$$
$$= (1 - 4)\mathbf{\hat{i}} - (3 - (-2))\mathbf{\hat{j}} + (-6 - 1)\mathbf{\hat{k}} = \langle -3, -5, -7 \rangle$$

## 常見誤區與重點提醒

- **維度限制**：外積**僅存在於三維空間**，二維平面無外積（或僅視為純量 $z$ 軸分量）。
- **符號失誤**：中項 $\mathbf{\hat{j}}$ 前面帶有**負號**（$- \begin{vmatrix} u_1 & u_3 \\ v_1 & v_3 \end{vmatrix}\mathbf{\hat{j}}$），極易在此處漏乘負號。
- **無結合律**：$(\mathbf{u} \times \mathbf{v}) \times \mathbf{w} \neq \mathbf{u} \times (\mathbf{v} \times \mathbf{w})$，切勿隨意調整運算括號。

## 關聯筆記
- **前置知識**：[空間向量基礎運算](./vectors-basics.md)、[向量內積與投影](./dot-product.md)
- **延伸概念**：[空間平面法向量與方程式](./lines-and-planes.md)
