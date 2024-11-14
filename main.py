import tkinter as tk
from ui.home_page import HomePage
from ui.settings_page import SettingsPage
from ui.visualization_page import VisualizationPage
from ui.info_page import InfoPage

class DSALearningApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("DSA Learning App")
        self.geometry("800x600")

        self.home_page = HomePage(self)
        self.settings_page = SettingsPage(self)
        self.visualization_page = VisualizationPage(self)
        self.info_page = InfoPage(self)

        self.home_page.grid(row=0, column=0, sticky="nsew")
        self.settings_page.grid(row=0, column=0, sticky="nsew")
        self.visualization_page.grid(row=0, column=0, sticky="nsew")
        self.info_page.grid(row=0, column=0, sticky="nsew")

        self.home_page.tkraise()

if __name__ == '__main__':
    app = DSALearningApp()
    app.mainloop()