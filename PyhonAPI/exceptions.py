class ConnectionUnavailable(Exception):
    pass

class IncorrectLoginDetails(Exception):
    pass

class UserAlreadyExists(Exception):
    pass

class HTTPError(Exception):
    pass

class NoJWTTokenFound(Exception):
    pass