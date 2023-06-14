import React, { useEffect, useState } from "react";
import 'antd/dist/reset.css';
import ITypeToDo from "./ITypeToDo";
import { Table } from "antd";
import axios from 'axios';
import { ColumnsType } from "antd/es/table";
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
    }
]

const ToDo = () => {

    const [dataSource, setDataSource] = useState<ITypeToDo[]>([])
    useEffect(() => {
        async function callApi() {
            try {
                const response = await axios.get('https://6483e935ee799e32162627a5.mockapi.io/ToDos');
                setDataSource(response.data)
                console.log("take data")
            } catch (error) {
                console.error(error);
            }
        }
        callApi()
    }, []);

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