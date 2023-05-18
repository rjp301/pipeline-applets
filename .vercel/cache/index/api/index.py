from api.routes import _centerline, _convert, _topcon

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

api = APIRouter(prefix="/api")
api.include_router(_centerline.router)
api.include_router(_topcon.router)
api.include_router(_convert.router)


@api.get("/")
def read_root():
    return {"version": "1.0.0"}


@api.get("/url-list")
def get_all_urls():
    url_list = [{"path": route.path, "name": route.name} for route in app.routes]
    return url_list


app = FastAPI(
    # debug=True,
    title="Pipeline Applets",
    description="Collection of functions and data, useful for constructing pipelines",
)
app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
