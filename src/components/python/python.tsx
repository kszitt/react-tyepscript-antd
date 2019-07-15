import * as React from "react";
import { Component, ReactNode, ChangeEvent } from 'react'
import {message, Button, Input, Table, Modal} from "antd"
import {RouteProps} from "@public/interface";
import {Http} from "@http/index";
import {PostUser, GetUser} from "@http/python"




interface UserItem {
  id?: number;
  key?: any;
  name: string;
  age: number;
  desc: string;
}
// class NewTable extends Table<UserItem> {}
interface State {
  dataSource: UserItem[],
  addModal: boolean;
  addUser: UserItem | null;
}


class Python extends Component<RouteProps, State> {
  state = {
    dataSource: [],
    columns: [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age"
      },
      {
        title: "简介",
        dataIndex: "desc",
        key: "desc"
      },
    ],
    addModal: false,
    addUser: null
  };

  componentWillMount(): void {
    this.postUser = this.postUser.bind(this);
    this.isModal = this.isModal.bind(this);
  }

  async getUser(){
    interface Result extends Http {
      result: UserItem[]
    }
    let data = await GetUser<Result>(),
      dataSource = data.result || [];

    dataSource.forEach(item => {
      item.key = item.id;
    });

    this.setState({
      dataSource
    })
  }

  async postUser(){
    let params: UserItem = {
        name: "韩晓雨22",
        age: 18,
        desc: "简介"
      },
      data = await PostUser<Http>(params);
    message.success(data.message);
  }

  isModal(addModal=false): void {
    this.setState({
      addModal,
      addUser: null
    })
  }

  go(): void {
    this.props.history.push({
      pathname: '/',
    })
  }

  render(): ReactNode {
    let {dataSource, columns, addModal, addUser} = this.state;

    return (
      <div id="Python">
        <h1>Python组件</h1>
        <Button onClick={() => {this.getUser()}}>
          获取数据
        </Button>

        <Button onClick={() => {this.postUser()}}>
          添加数据
        </Button>

        <Table dataSource={dataSource} columns={columns}/>

        <Modal
          title="Basic Modal"
          visible={addModal}
          onOk={this.postUser}
          onCancel={() => {this.isModal()}}
        >
          <p>姓名：<Input placeholder="请输入姓名" onChange={(e: ChangeEvent<HTMLInputElement>) => {addUser.name = e.target.value}}/></p>
          <p>年龄：<Input placeholder="请输入年龄" onChange={(e: ChangeEvent<HTMLInputElement>) => {addUser.age = e.target.value}}/></p>
          <p>简介：<Input placeholder="请输入简介" onChange={(e: ChangeEvent<HTMLInputElement>) => {addUser.desc = e.target.value}}/></p>
        </Modal>
      </div>
    );
  }
}

export default Python;
