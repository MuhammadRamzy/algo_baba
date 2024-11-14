import tkinter as tk
import utils.data_generator  # Make sure data_generator is correctly imported

class SettingsPage(tk.Frame):
    def __init__(self, master):
        super().__init__(master)
        self.master = master
        self.category = None
        self.data = []  # Initialize self.data as an empty list
        self.create_widgets()

    def set_category(self, category):
        self.category = category
        self.update_title()

    def update_title(self):
        if self.category:
            title_text = f"{self.category} Settings"
        else:
            title_text = "Algorithm Settings"
        self.title_label.config(text=title_text)

    def create_widgets(self):
        self.title_label = tk.Label(self, font=("Arial", 18, "bold"))
        self.title_label.pack(pady=20)

        self.input_options_frame = tk.LabelFrame(self, text="Input Options")
        self.input_options_frame.pack(fill="x", padx=20, pady=10)

        self.input_type_var = tk.StringVar()
        self.input_type_var.set("manual")

        manual_input_radio = tk.Radiobutton(self.input_options_frame, text="Manual Input", variable=self.input_type_var, value="manual")
        manual_input_radio.pack(side=tk.LEFT, padx=10)

        preset_input_radio = tk.Radiobutton(self.input_options_frame, text="Preset Data", variable=self.input_type_var, value="preset", command=self.set_preset_data)
        preset_input_radio.pack(side=tk.LEFT, padx=10)

        self.visualization_options_frame = tk.LabelFrame(self, text="Visualization Options")
        self.visualization_options_frame.pack(fill="x", padx=20, pady=10)

        self.speed_var = tk.IntVar()
        self.speed_var.set(3)

        speed_label = tk.Label(self.visualization_options_frame, text="Animation Speed:")
        speed_label.pack(side=tk.LEFT, padx=10)

        speed_slider = tk.Scale(self.visualization_options_frame, variable=self.speed_var, from_=1, to=5, orient=tk.HORIZONTAL)
        speed_slider.pack(side=tk.LEFT, padx=10)

        self.mode_var = tk.StringVar()
        self.mode_var.set("continuous")

        mode_label = tk.Label(self.visualization_options_frame, text="Playback Mode:")
        mode_label.pack(side=tk.LEFT, padx=10)

        continuous_radio = tk.Radiobutton(self.visualization_options_frame, text="Continuous", variable=self.mode_var, value="continuous")
        continuous_radio.pack(side=tk.LEFT, padx=10)

        step_by_step_radio = tk.Radiobutton(self.visualization_options_frame, text="Step-by-Step", variable=self.mode_var, value="step_by_step")
        step_by_step_radio.pack(side=tk.LEFT, padx=10)

        self.start_button = tk.Button(self, text="Start Visualization", command=self.open_visualization_page)
        self.start_button.pack(pady=20)

    def set_preset_data(self):
        """Generate preset data when 'Preset Data' option is selected."""
        self.data = utils.data_generator.generate_array(20, 0, 100)  # Generate a sample array

    def open_visualization_page(self):
        self.master.visualization_page.set_algorithm(self.category)
        self.master.visualization_page.tkraise()
