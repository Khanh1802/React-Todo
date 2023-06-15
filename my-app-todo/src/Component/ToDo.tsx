import React, { useEffect, useState } from "react";
import 'antd/dist/reset.css';
import ITypeToDo from "./ITypeToDo";
import { Input, Modal, Popconfirm, Table, message } from "antd";
import axios from 'axios';
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";


const ToDo = () => {

    const columns: ColumnsType<ITypeToDo> = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'avatar',
            dataIndex: 'avatar',
            key: 'avatar',
        },
        {
            title: 'job',
            dataIndex: 'job',
            key: 'job',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                return (
                    <>
                        <EditOutlined onClick={() => handleEdit(record)} />
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => setDeleteByID(parseInt(record.id.toString()))}
                        >
                            <a> <DeleteOutlined style={{ color: "red", marginLeft: 20 }} /></a>
                        </Popconfirm>
                    </>
                )
            }
        },
    ]

    const [dataSource, setDataSource] = useState<ITypeToDo[]>([])
    const [deleteByID, setDeleteByID] = useState<number>(-1);
    const [editRecord, setEditRecord] = useState<ITypeToDo | null>(null);
    const [getApi, setGetApi] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        async function getDataApi() {
            if (!getApi) {
                try {
                    const response = await axios.get('https://6483e935ee799e32162627a5.mockapi.io/ToDos');
                    setDataSource(response.data)
                    console.log("get data")
                    setGetApi(true);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        getDataApi()
    }, [getApi]);

    //delete api
    useEffect(() => {
        async function deleteApi() {
            if (deleteByID > -1) {
                try {
                    await axios.delete(`https://6483e935ee799e32162627a5.mockapi.io/ToDos/${deleteByID}`);
                    message.success('deleted success!');
                    setDeleteByID(-1);
                    setGetApi(false);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        deleteApi()
    }, [deleteByID]);

    //update api
    useEffect(() => {
        async function putApi() {
            if (isEdit) {
                try {
                    await axios.put(`https://6483e935ee799e32162627a5.mockapi.io/ToDos/${editRecord?.id}`, editRecord);
                    console.log("edit", editRecord)
                    message.success('edit success!');
                    setGetApi(false);
                    resetEdit();
                } catch (error) {
                    console.error(error);
                }
            }
        }
        putApi()
    }, [isEdit]);

    const handleEdit = (record: ITypeToDo) => {
        setEditRecord(record)
    }

    const resetEdit = () => {
        setIsEdit(false)
        setEditRecord(null)
        console.log(editRecord)
    }

    return (
        <div className="App">
            <>
                <Table
                    rowKey="id"
                    dataSource={dataSource}
                    columns={columns}
                />
                <Modal
                    title="Edit"
                    okText="Save"
                    open={editRecord !== null}
                    onCancel={() => setEditRecord(null)}
                    onOk={() => {
                        setIsEdit(true)
                    }}
                >
                    <Input
                        value={editRecord?.name}
                        onChange={(e) =>
                            setEditRecord((prevEditRecord) => ({
                                ...prevEditRecord as ITypeToDo,
                                name: e.target.value,
                            }))
                        }
                    />
                    <Input
                        value={editRecord?.job}
                        onChange={(e) =>
                            setEditRecord((prevEditRecord) => ({
                                ...prevEditRecord as ITypeToDo,
                                job: e.target.value,
                            }))
                        }
                    />
                    <Input
                        value={editRecord?.avatar}
                        onChange={(e) =>
                            setEditRecord((prevEditRecord) => ({
                                ...prevEditRecord as ITypeToDo,
                                avatar: e.target.value,
                            }))
                        }
                    />
                </Modal>
            </>
        </div>
    );
}
export default ToDo;