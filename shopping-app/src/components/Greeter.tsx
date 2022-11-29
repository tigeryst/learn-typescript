import React from "react";

interface GreeterProps {
  person: String
}

function Greeter({person}: GreeterProps) {
  return <h1>Hello, {person}!</h1>;
}

export default Greeter;
