import React from 'react';
import Components from '../../components';
import { Card, Col, Row, Select } from 'antd';

export const TgtVsAct = () => {
  return (
    <div style={{ margin: 15 }}>
      <Components.Card
        hoverable
        title='Insights - Target VS Achievement'
        style={{
          height: 360,
        }}
        extra={
          <div style={{ margin: 10 }}>
            <Select
              defaultValue='category'
              style={{ width: 150, marginRight: 5 }}
              onChange={() => {}}
              options={[
                { value: 'category', label: 'All Category' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
            />
            <Select
              defaultValue='users'
              style={{ width: 150 }}
              onChange={() => {}}
              options={[
                { value: 'users', label: 'Users' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
            />
          </div>
        }>
        <Row gutter={16}>
          <Col span={5}>
            <Card
              title='Landing'
              bordered={false}>
              0
            </Card>
          </Col>
          <Col span={5}>
            <Card
              title='FTD Achieved'
              bordered={false}>
              0
            </Card>
          </Col>
          <Col span={5}>
            <Card
              title='MTD Achieved'
              bordered={false}>
              0
            </Card>
          </Col>
          <Col span={5}>
            <Card
              title='% Achieved'
              bordered={false}>
              0
            </Card>
          </Col>
          <Col span={4}>
            <Card
              title='LMTD Achieved'
              bordered={false}>
              0
            </Card>
          </Col>
        </Row>
        <Row
          gutter={16}
          style={{ marginTop: 15 }}>
          <Col span={5}>
            <Card
              title='% Growth over LMTD'
              bordered={false}>
              0
            </Card>
          </Col>
          <Col span={5}>
            <Card
              title='Target'
              bordered={false}>
              0
            </Card>
          </Col>
          <Col span={5}>
            <Card
              title='Balance To Do'
              bordered={false}>
              0
            </Card>
          </Col>
          <Col span={5}>
            <Card
              title='LYMTD Achived'
              bordered={false}>
              0
            </Card>
          </Col>
          <Col span={4}>
            <Card
              title='% Growth over LYMTD'
              bordered={false}>
              0
            </Card>
          </Col>
        </Row>
      </Components.Card>
    </div>
  );
};
