import { useState } from "react";
import InnovatorMap from "./InnovatorMap";

function ChatWidget() {

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hi! I'm the CWPC Guide. How can I help you today?"
    }
  ]);

  const [input, setInput] = useState("");

  const [showMap, setShowMap] = useState(false);

  const [isMinimized, setIsMinimized] =
    useState(false);

  const [showPaymentForm, setShowPaymentForm] =
    useState(false);

  const [selectedAmount, setSelectedAmount] =
    useState("");

  const sendMessage = () => {

    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    const lowerInput = input.toLowerCase();

    let botReply = {

      sender: "bot",

      text:
        "I'm here to help with CWPC donations, wildfire innovation projects, volunteering, and climate resilience."

    };

    if (
      lowerInput.includes("donate")
    ) {

      botReply = {

        sender: "bot",

        text:
          "Thank you for supporting wildfire resilience. Choose a donation amount to support innovation projects.",

        buttons: [

          {
            label: "Donate $10"
          },

          {
            label: "Donate $25"
          },

          {
            label: "Donate $50"
          },

          {
            label: "Explore Innovator Map"
          }

        ]

      };

    }

    else if (
      lowerInput.includes("map") ||
      lowerInput.includes("innovator")
    ) {

      botReply = {

        sender: "bot",

        text:
          "Opening CWPC Wildfire Innovation Intelligence Map.",

        buttons: [

          {
            label: "Open Innovator Map"
          }

        ]

      };

    }

    setTimeout(() => {

      setMessages((prev) => [
        ...prev,
        botReply
      ]);

    }, 500);

    setInput("");

  };

  const handleButtonClick = (button) => {

    const userButtonMessage = {

      sender: "user",

      text: button.label

    };

    setMessages((prev) => [
      ...prev,
      userButtonMessage
    ]);

    if (
      button.label.includes("Donate")
    ) {

      const amount =
        button.label.replace("Donate ", "");

      setSelectedAmount(amount);

      setShowPaymentForm(true);

    }

    else if (
      button.label.includes("Explore Innovator Map") ||
      button.label.includes("Open Innovator Map")
    ) {

      setShowMap(true);

    }

    else if (
      button.label.includes("View Receipt")
    ) {

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Your donation receipt and tax acknowledgement invoice were emailed successfully."
        }
      ]);

    }

    else if (
      button.label.includes("Track Donation Impact")
    ) {

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Your donation currently supports wildfire prevention systems, satellite heat mapping, AI detection systems, and forest monitoring technologies across vulnerable regions."
        }
      ]);

    }

    else if (
      button.label.includes("Share This Cause")
    ) {

      window.open(
        "https://preventwildfire.world/",
        "_blank"
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
`🌎 Share CWPC Wildfire Prevention Initiatives

Website:
https://preventwildfire.world/

Instagram:
https://www.instagram.com/preventwildfire.world/

LinkedIn:
https://www.linkedin.com/company/preventwildfireworld/

Together we can build climate resilience.`
        }
      ]);

    }

    else if (
      button.label.includes("Meet Innovators")
    ) {

      window.open(
        "https://preventwildfire.world/",
        "_blank"
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Redirecting you to meet CWPC innovators, climate-tech researchers, wildfire resilience engineers, and AI teams."
        }
      ]);

    }

    else if (
      button.label.includes("Support Another Project")
    ) {

      setShowMap(true);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Opening additional wildfire resilience innovation projects."
        }
      ]);

    }

    else if (
      button.label.includes("Donate to This Cause")
    ) {

      setShowPaymentForm(true);

    }

  };

  const completeDonation = () => {

    setShowPaymentForm(false);

    const donationReply = {

      sender: "bot",

      text:
        `Thank you for donating ${selectedAmount} toward wildfire resilience innovation.`,

      buttons: [

        {
          label: "View Receipt"
        },

        {
          label: "Track Donation Impact"
        },

        {
          label: "Share This Cause"
        },

        {
          label: "Meet Innovators"
        },

        {
          label: "Support Another Project"
        },

        {
          label: "Explore Innovator Map"
        }

      ]

    };

    setMessages((prev) => [
      ...prev,
      donationReply
    ]);

  };

  return (

    <>

      <div
        style={
          isMinimized
            ? styles.minimizedChat
            : styles.chatContainer
        }
      >

        <div style={styles.header}>

          <span>
            CWPC Guide
          </span>

          <button
            style={styles.minimizeButton}
            onClick={() =>
              setIsMinimized(!isMinimized)
            }
          >

            {isMinimized ? "⬜" : "—"}

          </button>

        </div>

        {!isMinimized && (

          <>

            <div style={styles.messagesContainer}>

              {messages.map((msg, index) => (

                <div
                  key={index}
                  style={
                    msg.sender === "user"
                      ? styles.userMessage
                      : styles.botMessage
                  }
                >

                  <p
                    style={{
                      whiteSpace: "pre-line"
                    }}
                  >
                    {msg.text}
                  </p>

                  {msg.buttons && (

                    <div style={styles.buttonGroup}>

                      {msg.buttons.map(
                        (button, idx) => (

                          <button
                            key={idx}
                            style={styles.actionButton}
                            onClick={() =>
                              handleButtonClick(
                                button
                              )
                            }
                          >

                            {button.label}

                          </button>

                        )
                      )}

                    </div>

                  )}

                </div>

              ))}

            </div>

            <div style={styles.inputArea}>

              <input
                type="text"
                placeholder="Ask something..."
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                style={styles.input}
              />

              <button
                onClick={sendMessage}
                style={styles.sendButton}
              >
                Send
              </button>

            </div>

          </>

        )}

      </div>

      {showMap && (

        <div style={styles.mapOverlay}>

          <div style={styles.mapModal}>

            <button
              style={styles.closeButton}
              onClick={() =>
                setShowMap(false)
              }
            >
              Close
            </button>

            <InnovatorMap />

          </div>

        </div>

      )}

      {showPaymentForm && (

        <div style={styles.paymentOverlay}>

          <div style={styles.paymentModal}>

            <h2>
              Complete Donation
            </h2>

            <p>
              Amount: {selectedAmount}
            </p>

            <input
              type="text"
              placeholder="Cardholder Name"
              style={styles.paymentInput}
            />

            <input
              type="text"
              placeholder="Card Number"
              style={styles.paymentInput}
            />

            <div style={styles.cardRow}>

              <input
                type="text"
                placeholder="MM/YY"
                style={styles.smallInput}
              />

              <input
                type="text"
                placeholder="CVV"
                style={styles.smallInput}
              />

            </div>

            <button
              style={styles.payButton}
              onClick={completeDonation}
            >
              Donate Securely
            </button>

            <button
              style={styles.cancelButton}
              onClick={() =>
                setShowPaymentForm(false)
              }
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </>

  );
}

const styles = {

  chatContainer: {
    width: "420px",
    height: "650px",
    backgroundColor: "#f3f4f6",
    borderRadius: "18px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    bottom: "20px",
    right: "20px",
    boxShadow: "0 0 20px rgba(0,0,0,0.25)",
    zIndex: 1000
  },

  minimizedChat: {
    width: "320px",
    height: "70px",
    backgroundColor: "#111827",
    borderRadius: "16px",
    position: "fixed",
    bottom: "20px",
    right: "20px",
    overflow: "hidden",
    zIndex: 1000
  },

  header: {
    backgroundColor: "#111827",
    color: "white",
    padding: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "20px"
  },

  minimizeButton: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "20px",
    cursor: "pointer"
  },

  messagesContainer: {
    flex: 1,
    padding: "16px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#2563eb",
    color: "white",
    padding: "12px",
    borderRadius: "12px",
    maxWidth: "80%"
  },

  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "white",
    padding: "12px",
    borderRadius: "12px",
    maxWidth: "85%"
  },

  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "12px"
  },

  actionButton: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#111827",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },

  inputArea: {
    display: "flex",
    padding: "14px",
    gap: "10px",
    backgroundColor: "white"
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db"
  },

  sendButton: {
    padding: "12px 18px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },

  mapOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },

  mapModal: {
    width: "94%",
    height: "92%",
    backgroundColor: "white",
    borderRadius: "18px",
    overflow: "hidden",
    position: "relative"
  },

  closeButton: {
    position: "absolute",
    top: "14px",
    right: "14px",
    zIndex: 9999,
    padding: "10px 16px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  paymentOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000
  },

  paymentModal: {
    width: "420px",
    backgroundColor: "white",
    borderRadius: "18px",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  paymentInput: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db"
  },

  cardRow: {
    display: "flex",
    gap: "10px"
  },

  smallInput: {
    flex: 1,
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db"
  },

  payButton: {
    padding: "14px",
    backgroundColor: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  cancelButton: {
    padding: "12px",
    backgroundColor: "#e5e7eb",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  }

};

export default ChatWidget;