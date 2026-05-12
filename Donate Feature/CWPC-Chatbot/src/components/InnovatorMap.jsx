import Map from "react-map-gl";
import { Source, Layer, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const wildfireData = {

  type: "FeatureCollection",

  features: [

    {
      type: "Feature",

      properties: {

        name: "California",

        risk: "High",

        project: "AI Drone Fire Detection",

        funding: "$31,250 raised",

        impact:
          "Protecting 12 wildfire-prone communities.",

        technology:
          "AI + Drone Surveillance + Thermal Detection",

        volunteers:
          "14 active engineers and researchers",

        sponsor:
          "Climate Shield Partners"

      },

      geometry: {
        type: "Point",
        coordinates: [-118.2437, 34.0522]
      }
    },

    {
      type: "Feature",

      properties: {

        name: "Oregon",

        risk: "Medium",

        project: "Smart Forest Sensor Grid",

        funding: "$45,500 raised",

        impact:
          "Monitoring 40 square miles of vulnerable forests.",

        technology:
          "IoT Sensors + Forest Monitoring",

        volunteers:
          "21 climate-tech volunteers",

        sponsor:
          "GreenFuture Alliance"

      },

      geometry: {
        type: "Point",
        coordinates: [-121.3153, 44.0582]
      }
    },

    {
      type: "Feature",

      properties: {

        name: "Colorado",

        risk: "Moderate",

        project: "Satellite Heat Mapping",

        funding: "$64,800 raised",

        impact:
          "Reducing wildfire response time by 35%.",

        technology:
          "Satellite Imaging + Predictive AI",

        volunteers:
          "9 geospatial analysts",

        sponsor:
          "EarthVision Labs"

      },

      geometry: {
        type: "Point",
        coordinates: [-104.9903, 39.7392]
      }
    }

  ]
};

const layerStyle = {

  id: "wildfire-layer",

  type: "circle",

  paint: {

    "circle-radius": 30,

    "circle-color": [

      "match",

      ["get", "risk"],

      "High",
      "#dc2626",

      "Medium",
      "#f97316",

      "Moderate",
      "#eab308",

      "#3b82f6"
    ],

    "circle-opacity": 0.95,

    "circle-stroke-width": 3,

    "circle-stroke-color": "#ffffff"
  }
};

function InnovatorMap() {

  const [popupInfo, setPopupInfo] = useState(null);

  return (

    <div style={styles.container}>

      <div style={styles.header}>
        CWPC Wildfire Innovation Intelligence Map
      </div>

      <Map

        initialViewState={{
          longitude: -98.5795,
          latitude: 39.8283,
          zoom: 3.5
        }}

        mapStyle="mapbox://styles/mapbox/dark-v11"

        mapboxAccessToken={MAPBOX_TOKEN}

        style={styles.map}

        interactiveLayerIds={["wildfire-layer"]}

        onClick={(event) => {

          const features = event.features;

          if (
            features &&
            features.length > 0
          ) {

            const wildfireFeature = features.find(
              (f) => f.layer.id === "wildfire-layer"
            );

            if (wildfireFeature) {

              setPopupInfo(null);

              setTimeout(() => {
                setPopupInfo(wildfireFeature);
              }, 50);

            }

          }

        }}

      >

        <Source
          id="wildfire-data"
          type="geojson"
          data={wildfireData}
        >

          <Layer {...layerStyle} />

        </Source>

        {popupInfo && (

          <Popup

            longitude={
              popupInfo.geometry.coordinates[0]
            }

            latitude={
              popupInfo.geometry.coordinates[1]
            }

            anchor="top"

            closeOnClick={false}

            onClose={() => setPopupInfo(null)}

            maxWidth="420px"

          >

            <div style={styles.popupCard}>

              <div style={styles.riskBadge}>

                {popupInfo.properties.risk} Risk Zone

              </div>

              <h2 style={styles.projectTitle}>
                {popupInfo.properties.project}
              </h2>

              <div style={styles.infoSection}>

                <p>
                  <strong>Region:</strong>
                  {" "}
                  {popupInfo.properties.name}
                </p>

                <p>
                  <strong>Funding:</strong>
                  {" "}
                  {popupInfo.properties.funding}
                </p>

                <p>
                  <strong>Impact:</strong>
                  {" "}
                  {popupInfo.properties.impact}
                </p>

                <p>
                  <strong>Technology:</strong>
                  {" "}
                  {popupInfo.properties.technology}
                </p>

                <p>
                  <strong>Volunteer Support:</strong>
                  {" "}
                  {popupInfo.properties.volunteers}
                </p>

                <p>
                  <strong>Sponsor:</strong>
                  {" "}
                  {popupInfo.properties.sponsor}
                </p>

              </div>

              <div style={styles.metricsBox}>

                <div style={styles.metricCard}>
                  92%
                  <span>Direct Impact</span>
                </div>

                <div style={styles.metricCard}>
                  14
                  <span>Innovators</span>
                </div>

                <div style={styles.metricCard}>
                  52
                  <span>Communities</span>
                </div>

              </div>

              <div style={styles.buttonContainer}>

                <button style={styles.primaryButton}>
                  Donate to This Cause
                </button>

                <button style={styles.secondaryButton}>
                  Meet Innovators
                </button>

                <button style={styles.secondaryButton}>
                  Support Another Project
                </button>

              </div>

            </div>

          </Popup>

        )}

      </Map>

    </div>

  );
}

const styles = {

  container: {
    width: "100%",
    height: "100%"
  },

  header: {
    padding: "18px",
    backgroundColor: "#111827",
    color: "white",
    fontWeight: "bold",
    fontSize: "22px"
  },

  map: {
    width: "100%",
    height: "calc(100% - 70px)"
  },

  popupCard: {
    width: "360px",
    maxHeight: "500px",
    overflowY: "auto",
    padding: "8px"
  },

  riskBadge: {
    backgroundColor: "#dc2626",
    color: "white",
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    marginBottom: "12px",
    fontWeight: "bold"
  },

  projectTitle: {
    marginTop: "0px",
    marginBottom: "16px"
  },

  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  metricsBox: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    marginBottom: "20px",
    gap: "8px"
  },

  metricCard: {
    flex: 1,
    backgroundColor: "#111827",
    color: "white",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "bold",
    display: "flex",
    flexDirection: "column",
    fontSize: "18px"
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "16px"
  },

  primaryButton: {
    padding: "14px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  secondaryButton: {
    padding: "12px",
    backgroundColor: "#111827",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  }

};

export default InnovatorMap;