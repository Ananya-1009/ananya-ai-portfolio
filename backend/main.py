from fastapi import FastAPI
from pydantic import BaseModel
from ollama import AsyncClient
from fastapi.middleware.cors import CORSMiddleware
from portfolio_data import PORTFOLIO_CONTEXT
from typing import Literal

app = FastAPI(title="Jarvis AI Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)
ollama_client = AsyncClient()



class HistoryMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    question: str
    history: list[HistoryMessage] = []



@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Jarvis backend is running"}



@app.post("/api/chat")
async def chat(request: ChatRequest):
    history = request.history[-8:]

    messages = [
        {
            "role": "system",
            "content": (
                "You are Jarvis, Ananya Soni's portfolio assistant.\n"
                "Answer questions using the portfolio information below.\n"
                "IMPORTANT RULES:\n"
                "1. Identify which project the user is asking about.\n"
                "2. Never transfer technologies or features from one "
                "project to another.\n"
                "3. For follow-up questions such as 'What technologies "
                "did she use for it?', resolve 'it' using the previous "
                "conversation messages.\n"
                "4. If the project is ambiguous, ask which project "
                "the user means instead of guessing.\n"
                "5. Do not invent details. If information is missing, "
                "say that it is not specified.\n"
                "6. Answer directly and concisely.\n\n"
                f"PORTFOLIO INFORMATION:\n{PORTFOLIO_CONTEXT}"
            ),
        },
        *[
            {
                "role": message.role,
                "content": message.content,
            }
            for message in history
        ],
        {
            "role": "user",
            "content": request.question,
        },
    ]

    response = await ollama_client.chat(
        model="llama3.2:3b",
        messages=messages,
    )

    return {"answer": response.message.content}