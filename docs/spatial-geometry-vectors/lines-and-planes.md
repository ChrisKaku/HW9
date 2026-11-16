---
title: 空間直線與平面方程式 (Lines & Planes)
category: 空間幾何與向量
tags: [空間直線, 參數式, 對稱式, 歪斜線, 平面方程式, 法向量, Math102A]
prerequisites:
  - ./vectors-basics.md
  - ./cross-product.md
related:
  - ../index.md
updated: 2026-03-30
---

# 空間直線與平面方程式 (Lines & Planes)

> **一句話核心定義**：空間直線由「上一固定點」與「方向向量」決定；空間平面則由「上一固定點」與「垂直法向量」透過內積為零唯一確定。

## 核心概念與運作原理

- **直線的幾何決定要素**：空間中通過定點 $P_0(x_0, y_0, z_0)$ 且平行於方向向量 $\mathbf{v} = \langle a, b, c \rangle$ 的所有點 $P$ 滿足 $\vec{OP} = \vec{OP_0} + t\mathbf{v}$。
- **平面的幾何決定要素**：空間中通過定點 $P_0(x_0, y_0, z_0)$ 且垂直於法向量 $\mathbf{n} = \langle a, b, c \rangle$ 的所有點 $P(x, y, z)$ 滿足：
  $$\mathbf{n} \cdot \vec{P_0P} = 0 \iff a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$$
- **空間兩直線關係判定**：
  1. **平行（Parallel）**：方向向量平行，但無交點。
  2. **相交（Intersecting）**：方向向量不平行，聯立存在唯一解交點。
  3. **歪斜（Skew）**：方向向量不平行，且無交點（既不平行也不相交）。

| 幾何對象 | 決定要素 | 標準代數形式 |
| :--- | :--- | :--- |
| **直線（向量式）** | 點 $P_0$ + 方向 $\mathbf{v}$ | $\mathbf{r}(t) = \mathbf{r}_0 + t\mathbf{v}$ |
| **直線（參數式）** | 點 $P_0$ + 方向 $\mathbf{v}$ | $x = x_0 + at, \; y = y_0 + bt, \; z = z_0 + ct$ |
| **直線（對稱式）** | 消除參數 $t$ | $\frac{x - x_0}{a} = \frac{y - y_0}{b} = \frac{z - z_0}{c}$ |
| **平面（點法式）** | 點 $P_0$ + 法向量 $\mathbf{n}$ | $a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$ |
| **平面（一般式）** | 展開點法式 | $ax + by + cz = d$ |

## 公式與範例

### 1. 兩平面夾角與交線求法
- **兩平面夾角 $\theta$**（銳角規定）：
  $$\cos\theta = \frac{|\mathbf{n}_1 \cdot \mathbf{n}_2|}{\|\mathbf{n}_1\| \|\mathbf{n}_2\|}$$
- **兩平面交線方向向量**：
  交線同時落在兩平面上，故必垂直於兩平面的法向量：
  $$\mathbf{v}_{\text{line}} = \mathbf{n}_1 \times \mathbf{n}_2$$

### 2. 典型範例（Worksheet 12.5 範例）
**題目**：求過相異三點 $P(2, 1, 1)$、$Q(0, 4, 1)$、$R(-2, 1, 4)$ 之平面方程式。
**解法**：
1. 建立兩平面向量：
   $\vec{PQ} = \langle 0-2, 4-1, 1-1 \rangle = \langle -2, 3, 0 \rangle$
   $\vec{PR} = \langle -2-2, 1-1, 4-1 \rangle = \langle -4, 0, 3 \rangle$
2. 求法向量（外積）：
   $$\mathbf{n} = \vec{PQ} \times \vec{PR} = \begin{vmatrix} \mathbf{\hat{i}} & \mathbf{\hat{j}} & \mathbf{\hat{k}} \\ -2 & 3 & 0 \\ -4 & 0 & 3 \end{vmatrix} = \langle 9, 6, 12 \rangle$$
3. 代入點 $P(2, 1, 1)$：
   $$9(x - 2) + 6(y - 1) + 12(z - 1) = 0 \iff 9x + 6y + 12z = 36 \iff 3x + 2y + 4z = 12$$

## 常見誤區與重點提醒

- **歪斜線忘記檢驗**：兩直線方向向量不平行時，並不保證一定相交！必須解聯立方程式檢驗是否有共同解，無解即為**歪斜線（Skew lines）**。
- **平面法向量與方向向量顛倒**：平面方程式係數 $\langle a, b, c \rangle$ 是平面的**垂直法向量**，切勿誤當成平面內的方向向量。

## 關聯筆記
- **前置知識**：[向量外積與行列式應用](./cross-product.md)
- **延伸概念**：[知識庫首頁與學習地圖](../index.md)
