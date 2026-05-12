import json
import random

from fastapi import APIRouter
from pydantic import BaseModel

from backend.rag.rag_pipeline import query_vector_store

router = APIRouter()

with open("backend/data/donation_projects.json", "r") as f:
    donation_projects = json.load(f)


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
async def chat(request: ChatRequest):

    question = request.question.lower()

    # =========================
    # INNOVATOR MAP FLOW
    # =========================
    if (
        "innovator map" in question
        or "map" in question
        or "show projects" in question
        or "show innovators" in question
    ):

        return {
            "response": (
                "Explore our Innovator Map to discover "
                "wildfire prevention startups, climate-tech "
                "projects, and high-risk regions currently "
                "receiving support."
            ),

            "buttons": [
                {
                    "label": "Open Innovator Map",
                    "url": "https://preventwildfire.world/"
                }
            ]
        }

    # =========================
    # DONATION FLOW
    # =========================
    elif "donate" in question:

        project = random.choice(donation_projects)

        return {
            "response": (
                "Thank you for supporting wildfire resilience. "
                "Here is a project your donation can directly support."
            ),

            "project": {
                "title": project["title"],
                "location": project["location"],
                "description": project["description"],
                "goal": project["goal"],
                "raised": project["raised"],
                "impact": project["impact"],
                "donate_url": project["donate_url"]
            },

            "buttons": [
                {
                    "label": "Explore Innovator Map",
                    "url": "https://preventwildfire.world/"
                }
            ]
        }

    # =========================
    # VOLUNTEER FLOW
    # =========================
    elif "volunteer" in question:

        return {
            "response": (
                "We are always looking for volunteers in engineering, "
                "product, operations, and climate-tech initiatives."
            ),

            "buttons": [
                {
                    "label": "Apply via CrowdDoing",
                    "url": "https://www.crowddoing.world/"
                }
            ]
        }

    # =========================
    # SCORECARD FLOW
    # =========================
    elif (
        "scorecard" in question
        or "risk" in question
        or "assessment" in question
    ):

        return {
            "response": (
                "The Community Wildfire Resilience Scorecard "
                "helps communities assess wildfire preparedness "
                "and identify prevention opportunities."
            ),

            "buttons": [
                {
                    "label": "Take Scorecard Assessment",
                    "url": "https://preventwildfire.world/"
                }
            ]
        }

    # =========================
    # RAG RETRIEVAL
    # =========================
    docs = query_vector_store(question)

    if docs:

        return {
            "response": docs[0]
        }

    # =========================
    # FALLBACK
    # =========================
    return {
        "response": (
            "I am specifically trained to help with CWPC "
            "and wildfire resilience topics."
        )
    }