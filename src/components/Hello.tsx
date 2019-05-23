import * as React from "react";
import {Button} from 'antd';
import "./hello.scss"


export class Hello extends React.Component {
    render() {
        return <h1 className="Hello">
            <p>Hello react!</p>
            <Button type="primary">Button</Button>
        </h1>;
    }
}
