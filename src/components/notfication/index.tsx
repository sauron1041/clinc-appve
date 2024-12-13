import React from "react";
import {  Card, Tag } from "antd";

const NotificationList: React.FC<{ notifications: any[] | undefined }> = ({
  notifications,
}) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const notificationColors: { [key: number]: string } = {
    1: "red",
    2: "blue",
    3: "green",
    4: "yellow",
    5: "purple",
    6: "orange",
    7: "cyan",
    8: "lime",
    9: "pink",
    10: "gray",
  };

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* <Badge count={notifications?.length}>
        <Button
          icon={<BellOutlined />}
          type="text"
          className="text-white"
          onClick={openModal}
        />
      </Badge> */}
      <div className="space-y-4">
        {notifications?.map((notification: any) => (
          <Card
            key={notification.id}
            className="shadow-md"
            title={notification.messageObj?.title}
            extra={
              <Tag color={notificationColors[notification.notificationTypeId]}>
                {/* Loại {notification.notificationTypeId} */}
                Loại {notification?.notificationType.name}
              </Tag>
            }
          >
            <p>{notification?.messageObj?.body}</p>
            {notification.messageObj?.discounts && notification.messageObj?.discounts.length > 0 && (
              <div>
                <strong>Danh sách mã giảm giá:</strong>
                <ul className="list-disc ml-6">
                  {notification.messageObj?.discounts.map((discount: any) => (
                    <li key={discount.id}>
                      {discount.name} - <code>{discount.code}</code>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;