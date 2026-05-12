function DonationModal({ onClose }) {

  return (

    <div style={styles.overlay}>

      <div style={styles.modal}>

        <h2>Support Wildfire Innovation</h2>

        <p>
          Your donation directly funds climate-tech
          innovators and wildfire prevention systems.
        </p>

        <div style={styles.amountGrid}>

          <button style={styles.amountButton}>$10</button>
          <button style={styles.amountButton}>$25</button>
          <button style={styles.amountButton}>$50</button>
          <button style={styles.amountButton}>$100</button>

        </div>

        <button style={styles.primaryButton}>
          Complete Donation
        </button>

        <button
          style={styles.closeButton}
          onClick={onClose}
        >
          Close
        </button>

      </div>

    </div>
  );
}

const styles = {

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },

  modal: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "18px",
    width: "400px"
  },

  amountGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginTop: "20px",
    marginBottom: "20px"
  },

  amountButton: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    cursor: "pointer"
  },

  primaryButton: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    fontWeight: "bold",
    marginBottom: "10px"
  },

  closeButton: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer"
  }

};

export default DonationModal;