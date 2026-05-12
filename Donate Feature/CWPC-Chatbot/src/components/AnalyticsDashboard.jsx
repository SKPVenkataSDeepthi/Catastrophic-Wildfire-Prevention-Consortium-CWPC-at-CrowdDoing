import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const donationData = [
  {
    region: "California",
    donations: 31250
  },

  {
    region: "Oregon",
    donations: 45500
  },

  {
    region: "Colorado",
    donations: 64800
  }
];

const riskData = [
  {
    name: "High Risk",
    value: 45
  },

  {
    name: "Medium Risk",
    value: 35
  },

  {
    name: "Moderate Risk",
    value: 20
  }
];

function AnalyticsDashboard() {

  return (

    <div style={styles.container}>

      <h1 style={styles.heading}>
        CWPC Impact Analytics Dashboard
      </h1>

      <div style={styles.metricsGrid}>

        <div style={styles.metricCard}>
          <h2>52</h2>
          <p>Communities Protected</p>
        </div>

        <div style={styles.metricCard}>
          <h2>14</h2>
          <p>Innovators Funded</p>
        </div>

        <div style={styles.metricCard}>
          <h2>$141K</h2>
          <p>Total Donations</p>
        </div>

        <div style={styles.metricCard}>
          <h2>120+</h2>
          <p>Sq Miles Monitored</p>
        </div>

      </div>

      <div style={styles.chartSection}>

        <div style={styles.chartCard}>

          <h3>Regional Donation Distribution</h3>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={donationData}>

              <XAxis dataKey="region" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="donations" />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div style={styles.chartCard}>

          <h3>Wildfire Risk Breakdown</h3>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={riskData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >

                {riskData.map((entry, index) => (
                  <Cell key={index} />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

const styles = {

  container: {
    padding: "30px",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh"
  },

  heading: {
    marginBottom: "30px"
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "40px"
  },

  metricCard: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 0 10px rgba(0,0,0,0.08)",
    textAlign: "center"
  },

  chartSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px"
  },

  chartCard: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 0 10px rgba(0,0,0,0.08)"
  }

};

export default AnalyticsDashboard;