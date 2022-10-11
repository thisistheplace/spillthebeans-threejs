# AUTO GENERATED FILE - DO NOT EDIT

#' @export
spillthebeansThreejs <- function(id=NULL) {
    
    props <- list(id=id)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'SpillthebeansThreejs',
        namespace = 'spillthebeans_threejs',
        propNames = c('id'),
        package = 'spillthebeansThreejs'
        )

    structure(component, class = c('dash_component', 'list'))
}
