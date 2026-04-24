import streamlit as st
import pandas as pd
import plotly.express as px
import base64

st.set_page_config(layout="wide")

# -----------------------------
# LOAD DATA
df = pd.read_csv("wildfire_news_final.csv")
df.columns = df.columns.str.lower()

# -----------------------------
# STATE FIX
state_mapping = {
    "California": "CA", "Texas": "TX", "Washington": "WA",
    "Arizona": "AZ", "Montana": "MT", "Oregon": "OR",
    "Florida": "FL", "Nevada": "NV", "Idaho": "ID"
}

df['state'] = df['state'].map(state_mapping)
df = df.dropna(subset=['state'])

# -----------------------------
# BACKGROUND IMAGE
def get_base64(img_path):
    with open(img_path, "rb") as f:
        return base64.b64encode(f.read()).decode()

bg_img = get_base64("wildfire_bg.jpg")

# -----------------------------
# CSS
st.markdown(f"""
<style>

.stApp {{
    background-image: url("data:image/jpg;base64,{bg_img}");
    background-size: cover;
    background-position: center;
}}

.block-container {{
    max-width: 1150px;
    margin: auto;
    padding-top: 30px;
}}

.title {{
    text-align: center;
    font-size: 42px;
    font-weight: bold;
    color: white;
    text-shadow: 0px 0px 25px rgba(255,120,0,0.9);
}}

.top-strip {{
    text-align: center;
    color: orange;
    margin-bottom: 25px;
    background: rgba(20,25,35,0.85);
    padding: 10px;
    border-radius: 25px;
}}

.metric-card {{
    background: rgba(20,25,35,0.9);
    padding: 22px;
    border-radius: 16px;
    border: 1px solid rgba(255,140,0,0.2);
    margin-bottom: 20px;
}}

.chart-card {{
    background: rgba(40,45,55,0.9);
    padding: 20px;
    border-radius: 16px;
    margin-bottom: 20px;
}}

.card-title {{
    font-size: 18px;
    margin-bottom: 10px;
    color: white;
    font-weight: 600;
}}

.section-pill {{
    background: rgba(20,25,35,0.85);
    padding: 12px 20px;
    border-radius: 25px;
    text-align: center;
    color: white;
    font-weight: 600;
    margin: 25px auto;
    width: 70%;
    border: 1px solid rgba(255,140,0,0.2);
    box-shadow: 0 0 10px rgba(255,140,0,0.3);
}}

</style>
""", unsafe_allow_html=True)

# -----------------------------
# METRICS
total_articles = len(df)
negative_ratio = (df['sentiment'] == 'negative').mean()
top_state = df['state'].mode()[0]

# -----------------------------
# CHARTS

sentiment_counts = df['sentiment'].value_counts()
pie = px.pie(
    values=sentiment_counts.values,
    names=sentiment_counts.index,
    color=sentiment_counts.index,
    color_discrete_map={
        "negative": "#ff3b3b",
        "positive": "#ff9f1c",
        "neutral": "#2ecc71"
    }
)
pie.update_layout(paper_bgcolor="rgba(0,0,0,0)", font=dict(color="white"))

state_counts = df['state'].value_counts().head(7)
bar = px.bar(
    x=state_counts.index,
    y=state_counts.values,
    color_discrete_sequence=["#ff8c00"]
)
bar.update_layout(paper_bgcolor="rgba(0,0,0,0)", font=dict(color="white"))

df['date'] = pd.to_datetime(df['date'])
trend = df.groupby([df['date'].dt.to_period("M"), 'sentiment']).size().unstack().fillna(0)
trend.index = trend.index.astype(str)

line = px.line(trend)
line.update_layout(paper_bgcolor="rgba(0,0,0,0)", font=dict(color="white"))

state_map = df['state'].value_counts().reset_index()
state_map.columns = ['state', 'count']

map_fig = px.choropleth(
    state_map,
    locations="state",
    locationmode="USA-states",
    color="count",
    scope="usa",
    color_continuous_scale="Reds"
)

map_fig.update_layout(
    paper_bgcolor="rgba(25,30,40,1)",
    geo=dict(bgcolor="rgba(25,30,40,1)"),
    font=dict(color="white")
)

# -----------------------------
# HEADER
st.markdown('<div class="title">🔥 Wildfire Intelligence Dashboard</div>', unsafe_allow_html=True)

st.markdown(f'''
<div class="top-strip">
🔴 HIGH • Top State: {top_state} • Articles: {total_articles} • Neg Ratio: {round(negative_ratio,2)}
</div>
''', unsafe_allow_html=True)

# -----------------------------
# METRICS
c1, c2 = st.columns(2)

with c1:
    st.markdown(f"""
    <div class="metric-card">
        <div class="card-title">Total Articles</div>
        <h1>{total_articles}</h1>
    </div>
    """, unsafe_allow_html=True)

with c2:
    st.markdown(f"""
    <div class="metric-card">
        <div class="card-title">Risk Level</div>
        <h1>{round(negative_ratio*100,1)}%</h1>
    </div>
    """, unsafe_allow_html=True)

# -----------------------------
# SENTIMENT & STATE
st.markdown("""
<div class="section-pill">📈 Sentiment & State Analysis</div>
""", unsafe_allow_html=True)

c3, c4 = st.columns(2)

with c3:
    st.markdown('<div class="card-title">Sentiment Distribution</div>', unsafe_allow_html=True)
    st.plotly_chart(pie, use_container_width=True)

with c4:
    st.markdown('<div class="card-title">Top States</div>', unsafe_allow_html=True)
    st.plotly_chart(bar, use_container_width=True)

# -----------------------------
# TREND
st.markdown("""
<div class="section-pill">📉 Sentiment Trend</div>
""", unsafe_allow_html=True)

st.markdown('<div class="card-title">Monthly Trend</div>', unsafe_allow_html=True)
st.plotly_chart(line, use_container_width=True)

# -----------------------------
# MAP
st.markdown("""
<div class="section-pill">🗺️ Wildfire Activity by State</div>
""", unsafe_allow_html=True)

st.markdown('<div class="card-title">Geographic Distribution</div>', unsafe_allow_html=True)
st.plotly_chart(map_fig, use_container_width=True)