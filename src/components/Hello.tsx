import * as React from "react";
// import Button from 'antd/lib/button';
// import { Button } from 'antd';
// import 'antd/lib/button/style';
import "./hello.scss"

// export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type. <Button type="primary">Button</Button>
export class Hello extends React.Component {
    render() {
        return <h1 className="Hello">
            <p>Hello react!</p>

        </h1>;
    }
}
