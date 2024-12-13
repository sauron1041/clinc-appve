import React, { useEffect, useState } from "react";
import {  Card, Tag } from "antd";
import { notificationGetAll } from "../../api/notification";

const NotificationPage: React.FC<{}> = ({

}) => {
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

    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            notificationGetAll({}).then((res) => {
                if (res?.statusCode == 200) {
                    setNotifications(res?.data)
                }
            })
        };
        fetchNotifications();
    }, []);

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
            <div className="space-y-4 w-full p-4">
                {notifications?.map((notification: any) => (
                    < Card

                        key={notification.id}
                        className="shadow-md relative "
                        title={notification.messageObj?.title}
                        extra={
                            <div>
                                {/* <div className="absolute right-5 top-5 text-xs"> */}
                                <div>
                                    < Tag color={notificationColors[notification.notificationTypeId]}
                                        className="text-white bg-blue-500 text-xs z-1"
                                    >
                                        {notification?.notificationType.name}
                                    </Tag>
                                </div>
                                {/* <div className="absolute -right-3 -top-2 text-xs"> */}
                                <div className="absolute -right-3 -top-2 text-xs">
                                    < Tag

                                        className="text-white "
                                        color={notification?.isRead ? "green" : "red"}
                                    >
                                        {notification?.isRead ? "Đã đọc" : "Chưa xem"}
                                    </Tag>
                                </div>
                            </div>
                        }
                    >
                        <p >{notification?.messageObj?.body}</p>
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
                    // </> :
                    // <div></div>

                    // <Card
                    //     key={notification.id}
                    //     className="shadow-md"
                    //     title={notification.messageObj?.title}
                    //     extra={
                    //         <Tag color={notificationColors[notification.notificationTypeId]}
                    //             className="text-white bg-blue-500 text-xs"
                    //         >
                    //             {/* Loại {notification.notificationTypeId} */}
                    //             {notification?.notificationType.name}
                    //         </Tag>
                    //     }
                    // >
                    //     <p>{notification?.messageObj?.body}</p>
                    //     {notification.messageObj?.discounts && notification.messageObj?.discounts.length > 0 && (
                    //         <div>
                    //             <strong>Danh sách mã giảm giá:</strong>
                    //             <ul className="list-disc ml-6">
                    //                 {notification.messageObj?.discounts.map((discount: any) => (
                    //                     <li key={discount.id}>
                    //                         {discount.name} - <code>{discount.code}</code>
                    //                     </li>
                    //                 ))}
                    //             </ul>
                    //         </div>
                    //     )}
                    // </Card>
                ))
                }
            </div >
        </div >
    );
};

export default NotificationPage