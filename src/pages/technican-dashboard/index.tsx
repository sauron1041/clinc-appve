import React, { useState } from 'react';
import { Card, Button, Modal, List, message, Row, Col } from 'antd';
import { CameraOutlined, CalendarOutlined, ScheduleOutlined, CheckSquareOutlined, PullRequestOutlined, HistoryOutlined, WechatWorkFilled, SwitcherOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const TechnicianDashboard: React.FC = () => {


  return (
    <>
      <div>
        {/* <h1>Technician Dashboard</h1> */}
        <Row className='text-center' justify={'center'}>
          <Col className='flex justify-center mb-2' span={12} >
            <Card className='bg-[#0284c7] w-[97%] flex justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl border-2 border-[#d1d5db] rounded-lg gap-5' style={{ aspectRatio: '1/1' }}
            >
              <div className='flex flex-col justify-center items-center gap-5' style={{ color: "white" }}>
                <CheckSquareOutlined style={{ fontSize: "36px" }} />
                <p style={{ fontSize: "18px" }} >Check-In</p>
              </div>
            </Card>
          </Col>
          <Col className='flex justify-center mb-2' span={12} >
            <Link to="/service-request-being-served" className='w-full flex justify-center'>
              <Card className='bg-[#6e32b2] w-[97%] flex justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl border-2 border-[#d1d5db] rounded-lg gap-5' style={{ aspectRatio: '1/1' }}
              >
                <div className='flex flex-col justify-center items-center gap-5' style={{ color: "white" }}
                >
                  <SwitcherOutlined style={{ fontSize: "36px" }} />
                  <p style={{ fontSize: "18px" }} >Dịch vụ yêu cầu</p>
                </div>
              </Card>
            </Link>
          </Col>
          <Col className='flex justify-center mb-2' span={12} >
            <Card className='bg-[#facc15] w-[97%] flex justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl border-2 border-[#d1d5db] rounded-lg gap-5' style={{ aspectRatio: '1/1' }}
            >
              <div className='flex flex-col justify-center items-center gap-5' style={{ color: "white" }}>
                <CameraOutlined style={{ fontSize: "36px" }} />
                <p style={{ fontSize: "18px" }} >Chụp ảnh khách hàng</p>
              </div>
            </Card>
          </Col>
          <Col className='flex justify-center mb-2' span={12} >
            <Card className='bg-[#db2777] w-[97%] flex justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl border-2 border-[#d1d5db] rounded-lg gap-5' style={{ aspectRatio: '1/1' }}
            >
              <div className='flex flex-col justify-center items-center gap-5' style={{ color: "white" }}>
                <HistoryOutlined style={{ fontSize: "36px" }} />
                <p style={{ fontSize: "18px" }} >Xem Ca Làm</p>
              </div>
            </Card>
          </Col>
          <Col className='flex justify-center mb-2' span={12} >
            <Card className='bg-[#34d399] w-[97%] flex justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl border-2 border-[#d1d5db] rounded-lg gap-5' style={{ aspectRatio: '1/1' }}
            >
              <div className='flex flex-col justify-center items-center gap-5' style={{ color: "white" }}>
                <CalendarOutlined style={{ fontSize: "36px" }} />
                <p style={{ fontSize: "18px" }} >Xem Lịch Làm Việc</p>
              </div>
            </Card>
          </Col>
          <Col className='flex justify-center mb-2' span={12} >
            <Card className='bg-[#34b3d3] w-[97%] flex justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl border-2 border-[#d1d5db] rounded-lg gap-5' style={{ aspectRatio: '1/1' }}
            >
              <div className='flex flex-col justify-center items-center gap-5' style={{ color: "white" }}>
                <CalendarOutlined style={{ fontSize: "36px" }} />
                <p style={{ fontSize: "18px" }} >Demo</p>
              </div>
            </Card>
          </Col>
          <Col className='flex justify-center mb-2' span={12} >
            <Card className='bg-[#a634d3] w-[97%] flex justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl border-2 border-[#d1d5db] rounded-lg gap-5' style={{ aspectRatio: '1/1' }}
            >
              <div className='flex flex-col justify-center items-center gap-5' style={{ color: "white" }}>
                <CalendarOutlined style={{ fontSize: "36px" }} />
                <p style={{ fontSize: "18px" }} >Demo</p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default TechnicianDashboard;