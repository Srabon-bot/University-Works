# 🏠 OpenGL Pentagon Shape Assignment

## 📌 Objective

Create an OpenGL program that displays:
- A **cyan background**
- A simple **house shape** made using **3 triangles**:
  - Two triangles forming the **square base**
  - One triangle forming the **roof**
- The house is filled with a **yellow color**
- The OpenGL window title is set to your **student ID**
- The window closes when the **`6` key** is pressed

✅ This repository contains:
- Fully working modern OpenGL C++ code using **GLFW + GLAD**
- Proper formatting and shader usage
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
- Displays a **yellow house** (square + roof) at the center of the screen
- Background is set to **cyan**
- Window closes when the **`6` key** is pressed
- Uses **modern OpenGL concepts**:
  - Vertex & Fragment shaders
  - VAO & VBO for vertex management

---

## 🛠 Requirements

- C++ Compiler (`g++`, `clang++`, or MSVC)
- [GLFW](https://www.glfw.org/) — for window/context handling
- [GLAD](https://glad.dav1d.de/) — for OpenGL function loading
- OpenGL 3.3+ installed on your system

---

## 📂 Files

| File        | Description                              |
|-------------|------------------------------------------|
| `main.cpp`  | Main OpenGL source code (house drawing)  |
| `README.md` | This documentation file                 |

---

## 🎨 Output Description

- **Background:** Cyan  
- **House Shape:**  
  - **Base:** Yellow square (made of 2 triangles)  
  - **Roof:** Yellow triangle on top  

---

## ▶️ How to Run

1. Install GLFW & GLAD on your system  
2. Compile the program:
   ```bash
   g++ main.cpp -o house -lglfw -ldl -lGL
