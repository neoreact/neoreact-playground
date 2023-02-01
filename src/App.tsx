import React from "react";
import "./App.css";

interface Props {
  className?: string;
  hello: string;
  children?: any;
}

const PassThrough: React.FC<Props> = ({ className, children, ...props }) => (
  <div className={className}>
    {React.Children.map(children, child => {
      console.log(child, props);
      return (
        React.cloneElement(child, props)
      )
    })}
  </div>
);

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <PassThrough className="service1" hello="world"></PassThrough>
        <PassThrough className="service2" hello="nani"></PassThrough>
      </header>
    </div>
  );
};
