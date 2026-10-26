
import os

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from ollama import AsyncClient
from google import genai
from google.genai import types
from fastapi.middleware.cors import CORSMiddleware
from portfolio_data import PORTFOLIO_CONTEXT
from typing import Literal


app = FastAPI(title="Jarvis AI Backend")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://ananya-ai-portfolio-ten.vercel.app",
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


def get_system_prompt():
    return (
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
    )


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "message": "Jarvis backend is running",
    }


@app.post("/api/chat")
async def chat(request: ChatRequest):
    history = request.history[-8:]
    system_prompt = get_system_prompt()

    # Local development: continue using Ollama.
    provider = os.getenv("AI_PROVIDER", "ollama").lower()

    if provider == "ollama":
        messages = [
            {"role": "system", "content": system_prompt},
            *[
                {
                    "role": message.role,
                    "content": message.content,
                }
                for message in history
            ],
            {"role": "user", "content": request.question},
        ]

        response = await ollama_client.chat(
            model="llama3.2:3b",
            messages=messages,
        )

        return {"answer": response.message.content}

    # Deployed backend: use Gemini when AI_PROVIDER=gemini.
    if provider == "gemini":
        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise HTTPException(
                status_code=500,
                detail="Gemini API key is not configured.",
            )

        contents = [
            {
                "role": (
                    "model" if message.role == "assistant" else "user"
                ),
                "parts": [{"text": message.content}],
            }
            for message in history
        ]

        contents.append(
            {
                "role": "user",
                "parts": [{"text": request.question}],
            }
        )

        try:
            client = genai.Client(api_key=api_key)

            response = await client.aio.models.generate_content(
                model=os.getenv("GEMINI_MODEL", "gemini-2.5-flash"),
                contents=contents,
                config=types.GenerateContentConfig(
                    system_instruction=system_prompt,
                ),
            )

            if not response.text:
                raise HTTPException(
                    status_code=502,
                    detail="Gemini returned an empty response.",
                )

            return {"answer": response.text}

        except HTTPException:
            raise
        except Exception as exc:
            print(
                f"Gemini API error: {type(exc).__name__}: {exc}",
                flush=True,
            )
            raise HTTPException(
                status_code=502,
                detail=(
                    "Gemini could not generate a response. "
                    "Check the backend configuration and API usage limits."
                ),
            )

    raise HTTPException(
        status_code=500,
        detail="Invalid AI_PROVIDER configuration.",
    )