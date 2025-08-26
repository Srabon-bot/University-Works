# 🔺 OpenGL Upside-Down Triangle Color Transition Assignment

## 📌 Objective

Create an OpenGL program that displays:
- A **black background**
- An **upside-down triangle** placed at the **center of the screen**
- The triangle starts with a **cyan color** and **gradually transitions to white** over time, then back to cyan repeatedly
- If the **`Escape` key** is pressed, the triangle’s color **immediately changes to red**
- The **OpenGL window title** should be set to your **student ID**

✅ This repository contains:
- Fully working modern OpenGL C++ code using **GLFW + GLAD**
- Proper comments and formatting
- A main file (`main.cpp`) implementing all required behavior

---

## 👨‍💻 Author

**Md. Shahriar Hossain Srabon**  
**ID: 0432310005101056**  
**Section: 6B1**  
**Batch: 53**

---

## What it does

- Opens an OpenGL window titled **`0432310005101056`**
- Displays an **upside-down triangle** at the center of the screen
- Uses **smooth color transition** between **cyan ↔ white**
- On pressing **`Escape`**, triangle color **instantly switches to red**
- Uses **modern OpenGL concepts**:
  - Shaders (Vertex + Fragment)
  - VAO & VBO for vertex management
  - Uniforms for runtime color updates

---

## 🛠 Requirements

- C++ Compiler (`g++`, `clang++`, or MSVC)
- [GLFW](https://www.glfw.org/) — for window/context handling
- [GLAD](https://glad.dav1d.de/) — for OpenGL function loading
- OpenGL 3.3+ installed on your system

---

## 📂 Files

| File        | Description                                   |
|-------------|-----------------------------------------------|
| `main.cpp`  | Main OpenGL source code (triangle rendering)  |
| `README.md` | This documentation file                      |

---

## 🎨 Output Description

- **Background:** Black  
- **Triangle:** Upside-down, centered  
- **Default Color Transition:** Cyan ↔ White (smooth, time-based oscillation)  
- **Special Key Action:** Pressing **Escape** changes triangle color to Red  

---

## ▶️ How to Run

1. Install GLFW & GLAD on your system
2. Compile the program:
   ```bash
   g++ main.cpp -o triangle -lglfw -ldl -lGL
