import tkinter as tk

class HomePage(tk.Frame):
    def __init__(self, master):
        super().__init__(master)
        self.master = master
        self.create_widgets()

    def create_widgets(self):
        title_label = tk.Label(self, text="DSA Learning App", font=("Arial", 24, "bold"))
        title_label.pack(pady=20)

        category_buttons = [
            ("Sorting", "Sorting"),
            ("Searching", "Searching"),
            ("Graphs", "Graphs"),
            ("Trees", "Trees")
        ]

        for text, category in category_buttons:
            button = tk.Button(self, text=text, command=lambda c=category: self.open_settings_page(c), width=20, height=2)
            button.pack(pady=10)

    def open_settings_page(self, category):
        self.master.settings_page.set_category(category)
        self.master.settings_page.tkraise()
