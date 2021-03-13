from abc import ABC, abstractmethod
from ..constants import Constants
from http import HTTPStatus
from .. import exceptions

class BaseModel(ABC, Constants):
    def __init__(self):
        super().__init__()
        self.loadToken()
        self.accessHeader = {"x-access-token": self.token}
        self.listsUrl = self.url + "/lists"
    
    @staticmethod
    def ensureResponseOk(foo):
        def recieveFunction(self, *args, **kwargs):
            req, *returnedValue = foo(self, *args, **kwargs)
            if req.status_code != HTTPStatus.OK.value:
                exceptions.HTTPError(f"Server responded with {req.status_code}.")
            return returnedValue
        return recieveFunction
    
        
    def loadToken(self):
        with open(f"{self.workingDirectory}\\{self.tokenFileName}", "r") as tokenFile:
            self.token = tokenFile.read()
     
    @abstractmethod
    def getItems(self):
        pass
    
    @abstractmethod
    def createItem(self):
        pass
        
    @abstractmethod
    def patchItem(self):
        pass
    
    @abstractmethod
    def deleteItem(self):
        pass