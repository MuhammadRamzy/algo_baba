import tkinter as tk
from utils.visualization_helpers import visualize_array
from algorithms.sorting.bubble_sort import bubble_sort
from algorithms.sorting.merge_sort import merge_sort
from algorithms.sorting.quick_sort import quick_sort
from algorithms.searching.linear_search import linear_search
from algorithms.searching.binary_search import binary_search
from algorithms.graph.dfs import dfs
from algorithms.graph.bfs import bfs
from utils import data_generator


class VisualizationPage(tk.Frame):
    def __init__(self, master):
        super().__init__(master)
        self.master = master
        self.algorithm = None
        self.algorithm_function = None
        self.data = None
        self.is_playing = False
        self.create_widgets()

    def set_algorithm(self, category):
        self.algorithm = category
        self.update_title()
        self.set_algorithm_function()

    def update_title(self):
        if self.algorithm:
            title_text = f"{self.algorithm} Visualization"
        else:
            title_text = "Algorithm Visualization"
        self.title_label.config(text=title_text)

    def set_algorithm_function(self):
        if self.algorithm == "Sorting":
            self.algorithm_function = merge_sort
        elif self.algorithm == "Searching":
            self.algorithm_function = binary_search
        elif self.algorithm == "Graphs":
            self.algorithm_function = dfs
        else:
            self.algorithm_function = None

    def create_widgets(self):
        self.title_label = tk.Label(self, font=("Arial", 18, "bold"))
        self.title_label.pack(pady=20)

        self.canvas = tk.Canvas(self, width=600, height=400)
        self.canvas.pack(pady=20)

        self.control_frame = tk.Frame(self)
        self.control_frame.pack(pady=10)

        self.play_button = tk.Button(self.control_frame, text="Play", command=self.play_animation)
        self.play_button.pack(side=tk.LEFT, padx=10)

        self.pause_button = tk.Button(self.control_frame, text="Pause", command=self.pause_animation)
        self.pause_button.pack(side=tk.LEFT, padx=10)

        self.reset_button = tk.Button(self.control_frame, text="Reset", command=self.reset_animation)
        self.reset_button.pack(side=tk.LEFT, padx=10)

        self.step_button = tk.Button(self.control_frame, text="Step", command=self.step_animation)
        self.step_button.pack(side=tk.LEFT, padx=10)

        self.status_label = tk.Label(self, text="")
        self.status_label.pack(pady=10)

    def play_animation(self):
        if self.algorithm_function:
            # Use the preset data from SettingsPage if selected, otherwise generate a new array
            self.data = (
                self.master.settings_page.data
                if self.master.settings_page.input_type_var.get() == "preset"
                else data_generator.generate_array(20, 0, 100)
            )
            self.is_playing = True
            self.animate_algorithm()


    def pause_animation(self):
        self.is_playing = False

    def reset_animation(self):
        self.is_playing = False
        self.animate_algorithm()

    def step_animation(self):
        if self.is_playing:
            self.pause_animation()
        else:
            self.animate_algorithm(step_by_step=True)

    def animate_algorithm(self, step_by_step=False):
        if self.algorithm_function:
            # If the algorithm is binary_search, we need to provide a target value
            if self.algorithm == "Searching" and self.algorithm_function == binary_search:
                # Use a random element or a fixed value as the target
                target = self.data[0]  # example: searching for the first element
                self.algorithm_function(self.data, target, self.canvas)
            else:
                if step_by_step:
                    self.algorithm_function(self.data, self.canvas, step_by_step=True)
                else:
                    self.algorithm_function(self.data, self.canvas)

            self.after(int(1000 / self.master.settings_page.speed_var.get()), self.animate_algorithm)
        else:
            self.status_label.config(text="No algorithm selected.")

