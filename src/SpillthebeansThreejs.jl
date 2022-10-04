
module SpillthebeansThreejs
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.1"

include("jl/spillthebeansthreejs.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "spillthebeans_threejs",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "spillthebeans_threejs.min.js",
    external_url = "https://unpkg.com/spillthebeans_threejs@0.0.1/spillthebeans_threejs/spillthebeans_threejs.min.js",
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "spillthebeans_threejs.min.js.map",
    external_url = "https://unpkg.com/spillthebeans_threejs@0.0.1/spillthebeans_threejs/spillthebeans_threejs.min.js.map",
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
