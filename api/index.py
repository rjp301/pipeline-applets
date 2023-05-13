from api.routes import _centerline, _convert, _topcon

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI(
    # debug=True,
    title="Pipeline Applets",
    description="Collection of functions and data, useful for constructing pipelines",
)
app.include_router(_centerline.router)
app.include_router(_topcon.router)
app.include_router(_convert.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"version": "1.0.0"}


@app.get("/url-list")
def get_all_urls():
    url_list = [{"path": route.path, "name": route.name} for route in app.routes]
    return url_list


def app_handler(request, response):
    if request.method == "OPTIONS":
        return response

    response.json = lambda data: JSONResponse(content=data)
    return app(request.scope)(request, response)
