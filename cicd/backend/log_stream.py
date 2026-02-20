import json

def sse_event(message: str):
    return f"data: {json.dumps({'message': message})}\n\n"