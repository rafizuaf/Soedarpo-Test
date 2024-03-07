"use client"

import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import type { TableColumnType, TableProps } from "antd";

const { Search } = Input;

export interface TransformedUser {
    name: string;
    location: string;
    email: string;
    age: number;
    phone: string;
    cell: string;
    picture: string[];
}

const columns: TableColumnType<TransformedUser>[] = [
    {
        title: 'Name',
        dataIndex: 'name',
        filterMode: 'tree',
        filterSearch: true,
        width: '20%',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        width: '40%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
    },
    {
        title: 'Cell',
        dataIndex: 'cell',
    },
    {
        title: 'Picture',
        dataIndex: 'picture',
        render: (value: string[]) => <img src={value[0]} alt="profile" width={100} height={100} />,
    }
];

async function getData({ params, searchValue }: { params: { result: string; page: string }; searchValue: string }) {
    const response = await fetch(
        `http://localhost:3001/fetch-data/${params.result}/${params.page}?search=${searchValue}`,
        { cache: 'no-store' }
    );
    const data = await response.json();
    return data;
}

const UserData: React.FC<{ params: { result: string; page: string } }> = ({ params }) => {
    const [data, setData] = useState<TransformedUser[]>([]);
    const [filteredData, setFilteredData] = useState<TransformedUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState<string>("");

    const fetchData = async (searchValue: string = "") => {
        setLoading(true);
        const { data } = await getData({ params, searchValue });
        setData(data);
        setFilteredData(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [params]);

    useEffect(() => {
        const filtered = data.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()));
        setFilteredData(filtered);
    }, [searchValue, data]);

    const onChange: TableProps<TransformedUser>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const handleSearch = () => {
        fetchData(searchValue);
    };

    return (
        <div className="container mx-auto py-10">
            <Search
                placeholder="Search"
                allowClear
                onSearch={handleSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
                style={{ marginBottom: 16 }}
            />

            <Table
                key={filteredData.length} 
                columns={columns}
                dataSource={filteredData} 
                onChange={onChange}
                rowKey={(record) => record.email}
                loading={loading}
            />
        </div>
    );
};


export default UserData;
