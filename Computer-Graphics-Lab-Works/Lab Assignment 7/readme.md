# 🟩 OpenGL Green-to-Black Animated Rectangle

## 📌 Objective

Create an OpenGL program that displays:
- A **dark gray background**
- A **centered rectangle** formed by two triangles
- The rectangle color **smoothly transitions between green and black** over time
- The rectangle **moves diagonally** (up-right and down-left) in a loop based on time
- Pressing the **`Escape` key** closes the window

✅ This repository contains:
- Fully working **modern OpenGL (GLFW + GLAD + GLM)** code
- Properly commented and formatted C++ implementation
- A main source file (`main.cpp`) that performs all required rendering and animation

---

## 👨‍💻 Author

**Md. Shahriar Hossain Srabon**  
**ID:** 0432310005101056  
**Section:** 6B1  
**Batch:** 53  

---

## 💡 What It Does

- Opens an OpenGL window titled **“Green to Black Animated Rectangle”**
- Displays a **centered rectangle**
- Rectangle color **smoothly oscillates** between **green ↔ black**
- Rectangle position **moves diagonally** using a **time-based translation**
- Pressing **Escape (`ESC`)** exits the program safely

---

## 🧠 Key OpenGL Features Used

- **GLFW:** For creating the window and handling keyboard input  
- **GLAD:** For managing modern OpenGL function pointers  
- **GLM:** For matrix transformations (`translate`, `mat4`, etc.)  
- **Shaders:** 
  - **Vertex Shader** applies transformation
  - **Fragment Shader** controls color transition  

---

## 🧱 Technical Breakdown

| Feature | Description |
|----------|-------------|
| **Vertex Shader** | Applies a transformation matrix to move the rectangle diagonally |
| **Fragment Shader** | Uses a uniform color that changes over time between green and black |
| **Uniforms** | `transform` (mat4) and `ourColor` (vec4) |
| **Vertices** | Two triangles forming one rectangle |
| **Libraries Used** | GLAD, GLFW, GLM, stb_image.h |

---

## 🎨 Visual Output Description

- **Background:** Dark gray (`0.1, 0.1, 0.1`)  
- **Shape:** Rectangle (made from 2 triangles)  
- **Color Transition:** Smooth oscillation between **Green ↔ Black**  
- **Movement:** Diagonal motion (X and Y direction simultaneously)  

---

## ▶️ How to Run

1. **Install Required Libraries**
   - [GLFW](https://www.glfw.org/)
   - [GLAD](https://glad.dav1d.de/)
   - [GLM](https://github.com/g-truc/glm)
   - `stb_image.h` (included in the project)

2. **Compile the program:**
   ```bash
   g++ main.cpp -o rectangle -lglfw -ldl -lGL
