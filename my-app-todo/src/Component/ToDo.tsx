import React, { useEffect, useState } from "react";
import 'antd/dist/reset.css';
import ITypeToDo from "./ITypeToDo";
import { Empty, Input, Modal, Popconfirm, Table, message } from "antd";
import axios from 'axios';
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined, FileSearchOutlined } from "@ant-design/icons";


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
                        <EditOutlined onClick={() => handleEdit(record)} style={{ fontSize: 20, marginRight: 25 }} />
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => setDeleteByID(parseInt(record.id.toString()))}
                        >
                            <a> <DeleteOutlined style={{ fontSize: 20, color: "red", marginLeft: 5 }} /></a>
                        </Popconfirm>
                    </>
                )
            }
        },
    ]

    const [dataSource, setDataSource] = useState<ITypeToDo[]>([])
    const [deleteByID, setDeleteByID] = useState<number>(-1);
    const [editRecord, setEditRecord] = useState<ITypeToDo | null>(null);
    const [search, setSearch] = useState<string | null>(null);
    const [getApi, setGetApi] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getDataApi() {
            if (!getApi) {
                console.log(search, "callgetapi")
                try {
                    const response = await axios.get('https://6483e935ee799e32162627a5.mockapi.io/ToDos');
                    if (search) {
                        setIsLoading(true);
                        const results: ITypeToDo[] = response.data.filter((resp: ITypeToDo) =>
                            resp.name.toLowerCase().includes(search.toLowerCase())
                            ||
                            resp.job.toLowerCase().includes(search.toLowerCase())
                        );
                        setDataSource(results);
                        setSearch(null)
                        setIsLoading(false);
                    } else {
                        setDataSource(response.data)
                    }
                    console.log("get data")
                    setGetApi(true);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        getDataApi()
    }, [getApi, search]);

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

    const handleClickSearch = (value: string) => {
        if (value) {
            setSearch(value);
            console.log("empty?", value)
        }
        setGetApi(false);
    }

    return (
        <div className="App">
            <>
                <Input.Search
                    placeholder="Search here..."
                    size="large"
                    style={{ marginBottom: 8, width: 600 }}
                    prefix={<FileSearchOutlined />}
                    loading={isLoading}
                    allowClear
                    enterButton="Search"
                    onSearch={handleClickSearch}
                />
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