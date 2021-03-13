import os

class Constants():
    def __init__(self):
        self.url = "http://localhost:3000"
        self.workingDirectory = os.getenv("LOCALAPPDATA") + "\\TASKPYAPI"
        self.tokenFileName = "Jwt.txt"
        self.tokenPath = f"{self.workingDirectory}\\{self.tokenFileName}"