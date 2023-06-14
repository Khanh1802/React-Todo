import React, { useEffect, useState } from "react";
import 'antd/dist/reset.css';
import ITypeToDo from "./ITypeToDo";
import { Popconfirm, Table, message } from "antd";
import axios from 'axios';
import { ColumnsType } from "antd/es/table";


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
            render: (_, record: { id: React.Key }) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ]

    const [dataSource, setDataSource] = useState<ITypeToDo[]>([])
    const [newData, setNewData] = useState<ITypeToDo>();
    const [getApi, setGetApi] = useState(false);
    const handleDelete = (key: React.Key) => {
        setNewData(dataSource.filter((item: ITypeToDo) => item.id === key).shift());
        // setDataSource(newData);
    };


    useEffect(() => {
        async function callApi() {
            if (!getApi) {
                try {
                    const response = await axios.get('https://6483e935ee799e32162627a5.mockapi.io/ToDos');
                    setDataSource(response.data)
                    console.log("take data")
                    setGetApi(true);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        callApi()
    }, [getApi]);

    //delete api
    useEffect(() => {
        async function deleteApi() {
            if (newData && Object.keys(newData).length !== 0) {
                try {
                    await axios.delete(`https://6483e935ee799e32162627a5.mockapi.io/ToDos/${newData.id}`);
                    console.log(newData)
                    setNewData({} as ITypeToDo)
                    message.success('deleted success!');
                    setGetApi(false);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        deleteApi()
    }, [newData]);


    return (
        <div className="App">
            <>
                <Table
                    rowKey="id"
                    dataSource={dataSource}
                    columns={columns}
                />
            </>
        </div>
    );
}
export default ToDo;