# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class SpillthebeansThreejs(Component):
    """A SpillthebeansThreejs component.


Keyword arguments:

- id (optional):
    The ID used to identify this component in Dash callbacks.

- beans (optional):
    The beans!.

- selected (optional):
    The selected bean."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'spillthebeans_threejs'
    _type = 'SpillthebeansThreejs'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, beans=Component.UNDEFINED, selected=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'beans', 'selected']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'beans', 'selected']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(SpillthebeansThreejs, self).__init__(**args)
