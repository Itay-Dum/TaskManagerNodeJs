import requests
from .base import BaseModel

class Task(BaseModel):
    def __init__(self, listId):
        super().__init__()
        self.tasksUrl = f"{self.listsUrl}/{listId}/tasks"
    
    @BaseModel.ensureResponseOk
    def getItems(self):
        req = requests.get(self.tasksUrl, headers = self.accessHeaders)
        tasks = req.content
        return [req, tasks]
    
    @BaseModel.ensureResponseOk
    def createItem(self, title: str):
        req = requests.post (
            url = self.tasksUrl,
            headers = self.accessHeader,
            json = {
                "title": title
            }
        )
        return [req]
    
    @BaseModel.ensureResponseOk
    def patchItem(self, taskId: str, taskTitle: str, taskComplete: bool):
        req = requests.patch (
            url = self.tasksUrl + f"/{taskId}",
            headers = self.accessHeader,
            json = {
                "title": taskTitle,
                "completed": taskComplete
            }
        )
        
        return [req]
    
    @BaseModel.ensureResponseOk
    def deleteItem(self, taskId):
        req = requests.delete (
            url = self.tasksUrl + f"/{taskId}",
            headers = self.accessHeader,
        )
        return [req]