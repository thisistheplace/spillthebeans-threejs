import spillthebeans_threejs
from dash import Dash, callback, html, Input, Output

app = Dash(__name__)

app.layout = html.Div([
    spillthebeans_threejs.SpillthebeansThreejs(
        id='input',
        beans={"id": "test"}
    ),
])

if __name__ == '__main__':
    app.run_server(debug=True)
