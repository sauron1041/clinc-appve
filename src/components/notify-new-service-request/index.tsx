import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, Animated } from "react-native";

const NotificationScreen: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(5); // Thời gian đếm ngược
  const fadeAnim = new Animated.Value(1); // Hiệu ứng mờ dần

  // Giả lập nhận yêu cầu mới (thay vì socket)
  useEffect(() => {
    // Giả lập việc nhận thông báo yêu cầu mới sau 2 giây
    const timeout = setTimeout(() => {
      setMessage("Có yêu cầu mới!");
      setIsModalVisible(true);
      setTimer(5); // Đặt lại thời gian đếm ngược
      startTimer(); // Bắt đầu đếm ngược
    }, 2000); // Sau 2 giây sẽ có thông báo mới

    return () => clearTimeout(timeout); // Hủy timer khi component bị unmount
  }, []);

  // Hàm đếm ngược
  const startTimer = () => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown); // Dừng đếm ngược
          setIsModalVisible(false); // Đóng modal sau 5s
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Xử lý đóng modal
  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.message}>{message}</Text>
            <Animated.View style={[styles.timerCircle, { opacity: fadeAnim }]}>
              <Text style={styles.timerText}>{timer}s</Text>
            </Animated.View>
            <TouchableOpacity style={styles.okButton} onPress={handleClose}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  timerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  timerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
  },
  okButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  okButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NotificationScreen;