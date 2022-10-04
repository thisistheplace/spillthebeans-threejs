# AUTO GENERATED FILE - DO NOT EDIT

#' @export
spillthebeansThreejs <- function(id=NULL, beans=NULL, selected=NULL) {
    
    props <- list(id=id, beans=beans, selected=selected)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'SpillthebeansThreejs',
        namespace = 'spillthebeans_threejs',
        propNames = c('id', 'beans', 'selected'),
        package = 'spillthebeansThreejs'
        )

    structure(component, class = c('dash_component', 'list'))
}
