import plotly.express as px
import numpy as np
import pandas as pd


df = pd.read_csv(
"public/data.csv",
encoding="cp1252", encoding_errors="replace"
)

'''
Making the initial tree map:
'''

df["Linear Feet Extent"] = pd.to_numeric(df["std_Width"], errors="coerce")

df = df.dropna(subset=["Linear Feet Extent"])

# Fill missing hierarchy values
df["MS/UA/Dept"] = df["MS/UA/Dept"].fillna("Unknown")
df["Title"] = df["Title"].fillna("Unknown")
#df["Container Type"] = df["Container Type"].fillna("Unknown")

fig = px.treemap(
df,
path=[
px.Constant("Cal Poly's Special Collections and Archives"),
"MS/UA/Dept",
"Title"
],
values="Linear Feet Extent",
title="Special Collections and Archives Sorted by Linear Feet",
color="Linear Feet Extent",
color_continuous_scale="Blues"
)

# fig.show()
fig.write_html("public/chart.html")