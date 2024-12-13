import React from 'react';

const Footer: React.FC = () => {
  // const height = window.innerHeight;
  return (
    <div
      className={`flex w-full flex-col justify-around items-center bg-[#0ea5e9] py-4`}
      // style={{background: 'linear-gradient(to right, #312e81, #4c1d95, #312e81, #4c1d95)'}}
      // style={{ background: 'bg-[#0284c7]' }}
    >
      <div className="flex px-10 py-2 w-full h-full">
        <div className="w-1/3">
          <p className="text-center text-white">
            LOGO <br />
            <br />
            <b>LIÊN HỆ</b>
            <br />
            <b>Hotline:</b> 090 123 456
            <br />
            <b>Email:</b> example@gmail.com
            <br />
            <b>Địa chỉ:</b> 51A Nguyễn Gia Trí, Phường 25, Quận Bình Thạnh, TP.HCM
            <br />
          </p>
        </div>
        <div className="w-1/3">hiii</div>
        <div className="w-1/3">hiii</div>
      </div>
      <div className="flex px-10 w-full h-full">
        <div className="w-full">
          <p className="text-center text-white">
            *Lưu ý: Kết quả phụ thuộc vào cơ địa mỗi người <br /> *Các thông tin trên website benhvienthammygangwhoo.vn
            chỉ dành cho mục đích tham khảo, tra cứu, khuyến nghị Quý khách hàng không tự ý áp dụng. Bệnh viện thẩm mỹ
            không chịu trách nhiệm về những trường hợp tự ý áp dụng mà không có chỉ định của bác sĩ. <br />
            <br />
            CÔNG TY CỔ PHẦN BỆNH VIỆN THẨM MỸ <br />
            <br /> Giấy chứng nhận đăng ký doanh nghiệp số: do Phòng Đăng ký kinh doanh – Sở Kế hoạch và Đầu tư TP. Hồ
            Chí Minh cấp ngày 01/08/2019. <br /> Giấy phép hoạt động khám bệnh, chữa bệnh số: 290/BYT – GPHĐ do Bộ Y tế
            cấp ngày 30/11/2020.
            <br /> Phạm vi hoạt động chuyên môn: Thực hiện kỹ thuật chuyên môn được Bộ trưởng Bộ Y Tế phê duyệt ban hành
            kèm theo giấy phép hoạt động. <br />
            <br /> Copyright 2024 © Bệnh Viện Thẩm Mỹ
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
