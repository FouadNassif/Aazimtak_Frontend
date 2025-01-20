import React, { useEffect, useState } from "react";

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Function to calculate time left
  const calculateTimeLeft = () => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  // Update the countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div style={styles.container}>
      {/* Days */}
      <span style={styles.timeBox}>
        <span style={styles.value}>{timeLeft.days}</span>
        <span style={styles.label}>days</span>
      </span>
      <p style={styles.separator}>:</p>

      {/* Hours */}
      <span style={styles.timeBox}>
        <span style={styles.value}>{timeLeft.hours}</span>
        <span style={styles.label}>hours</span>
      </span>
      <p style={styles.separator}>:</p>

      {/* Minutes */}
      <span style={styles.timeBox}>
        <span style={styles.value}>{timeLeft.minutes}</span>
        <span style={styles.label}>minutes</span>
      </span>
      <p style={styles.separator}>:</p>

      {/* Seconds */}
      <span style={styles.timeBox}>
        <span style={styles.value}>{timeLeft.seconds}</span>
        <span style={styles.label}>seconds</span>
      </span>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
  timeBox: {
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px",
    margin: "0 12px",
  },
  value: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  label: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  separator: {
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default Countdown;
