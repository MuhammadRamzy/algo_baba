import tkinter as tk
import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

def visualize_array(arr, canvas):
    print(f"Visualizing array: {arr}")  # Debugging line to check the input
    canvas.delete("bar")
    for i, value in enumerate(arr):
        canvas.create_rectangle(i * 20, 400 - value * 4, (i + 1) * 20, 400, fill="blue", tags="bar")

def visualize_graph(graph, canvas, visited=None):
    canvas.delete("node", "edge")
    num_nodes = len(graph)
    radius = 20
    for node in graph:
        x = (node % int(num_nodes ** 0.5)) * 100 + 50
        y = (node // int(num_nodes ** 0.5)) * 100 + 50
        if visited and node in visited:
            fill_color = "green"
        else:
            fill_color = "blue"
        canvas.create_oval(x - radius, y - radius, x + radius, y + radius, fill=fill_color, tags="node")
        canvas.create_text(x, y, text=str(node))
        for neighbor in graph[node]:
            neighbor_x = (neighbor % int(num_nodes ** 0.5)) * 100 + 50
            neighbor_y = (neighbor // int(num_nodes ** 0.5)) * 100 + 50
            canvas.create_line(x, y, neighbor_x, neighbor_y, fill="black", tags="edge")