import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Space, message } from 'antd';
import ITypeToDo from './ITypeToDo';
import axios from 'axios';

const AddToDo = () => {
    const [data, setData] = useState({});
    const [success, setSuccess] = useState(false);
    const onFinish = (values: ITypeToDo) => {
        setSuccess(true);
        setData(values)
        message.success('Submit success!');
        console.log(values); // Access the form values here
    };

    const onFinishFailed = () => {
        setSuccess(false);
    };

    useEffect(() => {

        async function callApi() {
            try {
                if (success) {
                    const post = await axios.post<ITypeToDo>(
                        'https://6483e935ee799e32162627a5.mockapi.io/ToDos',
                        data
                    );
                    console.log(data);
                    console.log(post);
                }
            } catch (error) {
                console.error(error);
            }
        }
        callApi()
    }, [success])

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
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        label="name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="job"
                        name="job"
                        rules={[{ required: true, message: 'Please input your job!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="avatar"
                        label="avatar"
                        rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
                    >
                        <Input placeholder="input placeholder" />
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