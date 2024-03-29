import React, { useEffect, useState } from 'react';
import { Button, Form, FormInstance, Input, Space, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ITypeToDo from './ITypeToDo';
import axios from 'axios';

const AddToDo = () => {
    const formRef = React.useRef<FormInstance>(null);
    const [data, setData] = useState({});
    const onFinish = (values: ITypeToDo) => {
        setData(values)
        message.success('Submit success!');
        console.log(values); // Access the form values here
    };

    const onReset = () => {
        formRef.current?.resetFields();
    };

    useEffect(() => {

        async function postApi() {
            if (Object.keys(data).length !== 0) {
                try {
                    const post = await axios.post<ITypeToDo>(
                        'https://6483e935ee799e32162627a5.mockapi.io/ToDos', data
                    );
                    console.log(post);
                    setData({});
                    onReset();
                } catch (error) {
                    console.error(error);
                }
            }
        }
        postApi()
    }, [data])

    return (
        <div>
            <>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"

                    ref={formRef}
                >

                    <Form.Item
                        label="name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder='name'
                            allowClear
                        />
                    </Form.Item>

                    <Form.Item
                        label="job"
                        name="job"
                        rules={[{ required: true, message: 'Please input your job!' }]}
                    >
                        <Input
                            placeholder='job'
                            allowClear
                        />
                    </Form.Item>

                    <Form.Item
                        name="avatar"
                        label="avatar"
                        rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
                    >
                        <Input
                            placeholder="URL"
                            allowClear
                        />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" >
                                Submit
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </>
        </div>
    )
}
export default AddToDo;