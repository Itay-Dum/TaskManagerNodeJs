from http import HTTPStatus
import os
import requests
from . import exceptions
from .constants import Constants

class CheckValid():
    def ensureWorkingDirecoryExists(self):
        if not os.path.exists(self.workingDirectory):
            os.mkdir(self.workingDirectory)
        
    def ensureServerRunning(self):
        req = requests.get(self.url)
        status_code = req.status_code
        if status_code != HTTPStatus.OK.value:
            raise exceptions.ConnectionUnavailable(f"Server responded with HTTP code: {status_code}")

class User(Constants, CheckValid):
    def __init__(self, username = None, password = None):
        super().__init__()
        self.username = username
        self.password = password
        self.loginUrl = self.url + "/login"
        self.registerUrl = self.url + "/register"
        self.ensureWorkingDirecoryExists()
        self.ensureServerRunning()
    
    def registerUser(self):
        req = requests.post(self.registerUrl, json = {
            "username": self.username,
            "password": self.password
        })
        
        if req.status_code == HTTPStatus.CONFLICT.value:
            raise exceptions.UserAlreadyExists(f"Username: {self.username} is taken. Each username must be unique.")
    
    def loginWithToken(self):
        if not os.path.exists(self.tokenPath):
            raise exceptions.NoJWTTokenFound(f"Path {self.tokenPath}, does not exist") 

    def loginAndSaveToken(self):
        req = requests.post(self.loginUrl, json = {
            "username": self.username,
            "password": self.password
        })
        if req.status_code == HTTPStatus.FORBIDDEN.value:
            raise exceptions.IncorrectLoginDetails("The username or password you entered is incorrect.")
        recievedToken = req.content.decode()
        recievedToken = recievedToken.replace('"', '')
        
        with open(self.tokenPath, "w") as tokenFile:
            tokenFile.write(f"Bearer {recievedToken}")
            
            
u = User("dumay", "fdf")
u.loginAndSaveToken()
            