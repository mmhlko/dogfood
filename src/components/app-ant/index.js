import { Col, Layout, Row, Slider} from 'antd';
import s from './styles.module.css';
import { Table } from '../table';
import { useState } from 'react';
const { Header, Content, Footer} = Layout;

export const AppAnt = () => {
    
    const [rows, setRows] = useState(10)
    
    return (       

        <Layout>
            <Header className={s.header}>Header</Header>
            <Content>
                <Row>
                    <Col xs={24} md={{span: 16, offset: 4}}>
                        <Slider min={1} max={100} /* step={10} */ defaultValue={rows} onChange={setRows}/>
                        <Table rows={rows}/>
                    </Col>
                </Row>
            </Content>
            <Footer>Footer</Footer>
        </Layout>

    )
}