from fastapi import HTTPException

def validate_todo_title(title: str) -> str:
    """Validate todo title"""
    if not title or not title.strip():
        raise HTTPException(status_code=400, detail="Title cannot be empty")
    
    if len(title.strip()) > 200:
        raise HTTPException(status_code=400, detail="Title must be less than 200 characters")
    
    return title.strip()

def validate_todo_description(description: str) -> str:
    """Validate todo description"""
    if description and len(description) > 1000:
        raise HTTPException(status_code=400, detail="Description must be less than 1000 characters")
    
    return description or ""
