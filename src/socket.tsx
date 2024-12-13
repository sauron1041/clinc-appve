import { io } from 'socket.io-client';

const socket = io('https://de-smba.onrender.com', {
    autoConnect: false,
});


export default socket;


// import { io } from 'socket.io-client';

// // Kết nối với server Socket.IO, sử dụng default endpoint /socket.io/
// const socket = io('http://localhost:8080/api/v1', {
//   autoConnect: false,  // Nếu bạn không muốn tự động kết nối ngay khi khởi tạo
//   transports: ['websocket', 'polling'] // Có thể cấu hình transport theo yêu cầu
// });

// export default socket;
