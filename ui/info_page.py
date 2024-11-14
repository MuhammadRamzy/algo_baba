import tkinter as tk

class InfoPage(tk.Frame):
    def __init__(self, master):
        super().__init__(master)
        self.master = master
        self.create_widgets()

    def create_widgets(self):
        title_label = tk.Label(self, text="Algorithm Information", font=("Arial", 18, "bold"))
        title_label.pack(pady=20)

        self.algorithm_label = tk.Label(self, font=("Arial", 16))
        self.algorithm_label.pack(pady=10)

        self.explanation_label = tk.Label(self, justify=tk.LEFT)
        self.explanation_label.pack(pady=20)

        self.pseudocode_label = tk.Label(self, justify=tk.LEFT, font=("Courier", 12))
        self.pseudocode_label.pack(pady=20)

        self.back_button = tk.Button(self, text="Back to Home", command=self.open_home_page)
        self.back_button.pack(pady=10)

    def set_algorithm_info(self, algorithm_name, explanation, pseudocode):
        self.algorithm_label.config(text=f"Algorithm: {algorithm_name}")
        self.explanation_label.config(text=explanation)
        self.pseudocode_label.config(text=pseudocode)

    def open_home_page(self):
        self.master.home_page.tkraise()