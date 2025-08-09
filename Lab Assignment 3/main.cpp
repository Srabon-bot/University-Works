#include "glad.h"  
#include "glfw3.h"  
  
#include <iostream>  
  
// Function declarations  
void framebuffer_size_callback(GLFWwindow* window, int width, int height);  
void processInput(GLFWwindow *window);  
  
// Settings for window size  
const unsigned int SCR_WIDTH = 800;  
const unsigned int SCR_HEIGHT = 600;  
  
// Vertex shader source code (simple pass-through)  
const char *vertexShaderSource = "#version 330 core\n"  
    "layout (location = 0) in vec2 aPos;\n"  
    "void main()\n"  
    "{\n"  
    "   gl_Position = vec4(aPos, 0.0, 1.0);\n"  
    "}\0";  
  
// Fragment shader source code (outputs color based on the triangle)  
const char *fragmentShaderSource = "#version 330 core\n"  
    "out vec4 FragColor;\n"  
    "uniform vec4 color;\n"  // Accept color uniform from the program  
    "void main()\n"  
    "{\n"  
    "   FragColor = color;\n"  
    "}\n\0";  
  
int main()  
{  
    // glfw: initialize and configure  
    glfwInit();  
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);  
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);  
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);  
#ifdef _APPLE_  
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);  
#endif  
  
    // Create GLFW window with title "Srabon"  
    GLFWwindow* window = glfwCreateWindow(SCR_WIDTH, SCR_HEIGHT, "Srabon", NULL, NULL);  
    if (window == NULL)  
    {  
        std::cout << "Failed to create GLFW window" << std::endl;  
        glfwTerminate();  
        return -1;  
    }  
    glfwMakeContextCurrent(window);  
    glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);  
  
    // Load OpenGL function pointers with GLAD  
    if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress))  
    {  
        std::cout << "Failed to initialize GLAD" << std::endl;  
        return -1;  
    }  
  
    // Vertex data: right-angled triangle, equilateral triangle, and isosceles triangle  
    float rightAngledVertices[] = {  
    -1.0f, -0.3f,  
    -0.4f, -0.3f,  
    -0.4f,  0.3f  
};

float equilateralVertices[] = {  
    -0.3f,  0.3f,  
     0.3f,  0.3f,  
     0.0f,   0.8f  
};

float isoscelesVertices[] = {  
     0.4f, -0.5f,  
     1.0f, -0.5f,  
     0.7f,  0.3f  
};

  
    // Generate and bind VAO, VBO for each triangle
    unsigned int VAO[3], VBO[3];  
    glGenVertexArrays(3, VAO);  
    glGenBuffers(3, VBO);  
  
    glBindVertexArray(VAO[0]);  
    glBindBuffer(GL_ARRAY_BUFFER, VBO[0]);  
    glBufferData(GL_ARRAY_BUFFER, sizeof(rightAngledVertices), rightAngledVertices, GL_STATIC_DRAW);  
    glVertexAttribPointer(0, 2, GL_FLOAT, GL_FALSE, 2 * sizeof(float), (void*)0);  
    glEnableVertexAttribArray(0);  

    glBindVertexArray(VAO[1]);  
    glBindBuffer(GL_ARRAY_BUFFER, VBO[1]);  
    glBufferData(GL_ARRAY_BUFFER, sizeof(equilateralVertices), equilateralVertices, GL_STATIC_DRAW);  
    glVertexAttribPointer(0, 2, GL_FLOAT, GL_FALSE, 2 * sizeof(float), (void*)0);  
    glEnableVertexAttribArray(0);  

    glBindVertexArray(VAO[2]);  
    glBindBuffer(GL_ARRAY_BUFFER, VBO[2]);  
    glBufferData(GL_ARRAY_BUFFER, sizeof(isoscelesVertices), isoscelesVertices, GL_STATIC_DRAW);  
    glVertexAttribPointer(0, 2, GL_FLOAT, GL_FALSE, 2 * sizeof(float), (void*)0);  
    glEnableVertexAttribArray(0);  
  
    // Unbind to prevent accidental modification  
    glBindBuffer(GL_ARRAY_BUFFER, 0);  
    glBindVertexArray(0);  
  
    // Build and compile vertex shader  
    unsigned int vertexShader = glCreateShader(GL_VERTEX_SHADER);  
    glShaderSource(vertexShader, 1, &vertexShaderSource, NULL);  
    glCompileShader(vertexShader);  
  
    // Check for vertex shader compile errors  
    int success;  
    char infoLog[512];  
    glGetShaderiv(vertexShader, GL_COMPILE_STATUS, &success);  
    if (!success)  
    {  
        glGetShaderInfoLog(vertexShader, 512, NULL, infoLog);  
        std::cout << "ERROR::VERTEX_SHADER::COMPILATION_FAILED\n" << infoLog << std::endl;  
    }  
  
    // Build and compile fragment shader  
    unsigned int fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);  
    glShaderSource(fragmentShader, 1, &fragmentShaderSource, NULL);  
    glCompileShader(fragmentShader);  
  
    // Check for fragment shader compile errors  
    glGetShaderiv(fragmentShader, GL_COMPILE_STATUS, &success);  
    if (!success)  
    {  
        glGetShaderInfoLog(fragmentShader, 512, NULL, infoLog);  
        std::cout << "ERROR::FRAGMENT_SHADER::COMPILATION_FAILED\n" << infoLog << std::endl;  
    }  
  
    // Link shaders into shader program  
    unsigned int shaderProgram = glCreateProgram();  
    glAttachShader(shaderProgram, vertexShader);  
    glAttachShader(shaderProgram, fragmentShader);  
    glLinkProgram(shaderProgram);  
  
    // Check for linking errors  
    glGetProgramiv(shaderProgram, GL_LINK_STATUS, &success);  
    if (!success)  
    {  
        glGetProgramInfoLog(shaderProgram, 512, NULL, infoLog);  
        std::cout << "ERROR::SHADER_PROGRAM::LINKING_FAILED\n" << infoLog << std::endl;  
    }  
  
    // Delete shaders as they're linked now  
    glDeleteShader(vertexShader);  
    glDeleteShader(fragmentShader);  
  
    // Render loop  
    while (!glfwWindowShouldClose(window))  
    {  
        // Process input keys  
        processInput(window);  
  
        // Clear screen with white background  
        glClearColor(1.0f, 1.0f, 1.0f, 1.0f);  
        glClear(GL_COLOR_BUFFER_BIT);  
  
        // Use shader program and draw the triangles with different colors  
        glUseProgram(shaderProgram);  
        
        // Right-angled triangle (Red color)
        glBindVertexArray(VAO[0]);
        glUniform4f(glGetUniformLocation(shaderProgram, "color"), 1.0f, 0.0f, 0.0f, 1.0f);  // Red
        glDrawArrays(GL_TRIANGLES, 0, 3);
        
        // Equilateral triangle (Green color)
        glBindVertexArray(VAO[1]);
        glUniform4f(glGetUniformLocation(shaderProgram, "color"), 0.0f, 1.0f, 0.0f, 1.0f);  // Green
        glDrawArrays(GL_TRIANGLES, 0, 3);
        
        // Isosceles triangle (Blue color)
        glBindVertexArray(VAO[2]);
        glUniform4f(glGetUniformLocation(shaderProgram, "color"), 0.0f, 0.0f, 1.0f, 1.0f);  // Blue
        glDrawArrays(GL_TRIANGLES, 0, 3);

        // Swap buffers and poll IO events  
        glfwSwapBuffers(window);  
        glfwPollEvents();  
    }  
  
    // Cleanup resources  
    glDeleteVertexArrays(3, VAO);  
    glDeleteBuffers(3, VBO);  
    glDeleteProgram(shaderProgram);  
  
    glfwTerminate();  
    return 0;  
}  
  
// Process keyboard input: close on 'S' or 's'  
void processInput(GLFWwindow *window)  
{  
    // GLFW treats 'S' keycode for both 's' and 'S', so just check GLFW_KEY_S  
    if (glfwGetKey(window, GLFW_KEY_S) == GLFW_PRESS)  
        glfwSetWindowShouldClose(window, true);  
}  
  
// Resize viewport callback  
void framebuffer_size_callback(GLFWwindow* window, int width, int height)  
{  
    glViewport(0, 0, width, height);  
}