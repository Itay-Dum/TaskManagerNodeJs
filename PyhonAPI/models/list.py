import requests
from .base import BaseModel

class List(BaseModel):
    def __init__(self):
        super().__init__()
    
    @BaseModel.ensureResponseOk
    def getItems(self):
        req = requests.get (
            self.listsUrl,
            headers = self.accessHeader
        )
        lists = req.content
        return req, lists
    
    @BaseModel.ensureResponseOk
    def createItem(self, title: str):
        req = requests.post (
            url = self.listsUrl ,
            headers = self.accessHeader,
            json = {
                "title": title
            }
        )
        return [req]
        
    def patchItem(self, listId: str, newTitle: str):
        req = requests.patch (
            url = f"{self.listsUrl}/{listId}",
            headers = self.accessHeader,
            json = {
                "title": newTitle
            }
        )
        return [req]
    
    def deleteItem(self, listId: str):
        req = requests.delete (
            url = f"{self.listsUrl}/{listId}",
            headers = self.accessHeader,
        ) 
        return [req] 
    
h = List()
print(h.getItems())
