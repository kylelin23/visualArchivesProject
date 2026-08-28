CHART_PATH = "public/chart.html"

MARKER_START = "<!-- SEARCH_ZOOM_LISTENER_START -->"
MARKER_END = "<!-- SEARCH_ZOOM_LISTENER_END -->"

LISTENER_SCRIPT = f"""{MARKER_START}
<script>
  window.addEventListener("message", function(event) {{
    if (!event.data || event.data.type !== "ZOOM_TO") return;

    var gd = document.getElementsByClassName("plotly-graph-div")[0]
      || document.getElementsByClassName("js-plotly-plot")[0];
    if (!gd) return;

    var label = event.data.label;
    var animConfig = {{
      transition: {{ duration: 500, easing: "cubic-in-out" }},
      frame: {{ duration: 500, redraw: true }}
    }};

    if (!label) {{
      Plotly.animate(gd, {{ data: [{{ level: "" }}] }}, animConfig);
      return;
    }}

    var ids = gd.data[0].ids || [];
    var match = ids.find(function(id) {{
      var segments = id.split("/");
      var lastSegment = segments[segments.length - 1];
      return lastSegment.toLowerCase() === label.toLowerCase();
    }});

    if (match) {{
      Plotly.animate(gd, {{ data: [{{ level: match }}] }}, animConfig);
    }} else {{
      window.parent.postMessage({{ type: "ZOOM_NOT_FOUND", label: label }}, "*");
    }}
  }});
</script>
{MARKER_END}
"""


def main():
    with open(CHART_PATH, "r", encoding="utf-8") as f:
        html = f.read()

    if MARKER_START in html:
        start = html.index(MARKER_START)
        end = html.index(MARKER_END) + len(MARKER_END)
        html = html[:start] + LISTENER_SCRIPT.strip() + html[end:]
        print("Existing search listener found — replaced with latest version.")
    else:
        if "</body>" not in html:
            raise RuntimeError(
                f"Could not find </body> in {CHART_PATH} — is this a valid "
                "Plotly HTML export?"
            )
        html = html.replace("</body>", LISTENER_SCRIPT + "\n</body>")
        print("Search listener injected.")

    with open(CHART_PATH, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"Done — {CHART_PATH} updated.")


if __name__ == "__main__":
    main()
