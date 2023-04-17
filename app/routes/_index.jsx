import { defer } from "@remix-run/cloudflare";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { Form, Input, Button, Checkbox } from "@arco-design/web-react";

const sleep = async () => {
  return new Promise((resolve) => setTimeout(resolve, 3000));
};

export const loader = async () => {
  return defer({
    data: fetch("https://jsonplaceholder.typicode.com/todos").then(
      async (res) => {
        await sleep();
        return res.json();
      }
    ),
  });
};

export default function Index() {
  const { data } = useLoaderData();
  return (
    <section>
      <h1>Hello world</h1>
      <App />
      <Suspense fallback={<h1>Loading..</h1>}>
        <Await resolve={data}>{(data) => <p>{JSON.stringify(data)}</p>}</Await>
      </Suspense>
    </section>
  );
}

const FormItem = Form.Item;

const App = () => {
  return (
    <Form style={{ width: 600 }} autoComplete="off">
      <FormItem label="Username">
        <Input placeholder="please enter your username..." />
      </FormItem>
      <FormItem label="Post">
        <Input placeholder="please enter your post..." />
      </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
        <Checkbox>I have read the manual</Checkbox>
      </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
        <Button type="primary">Submit</Button>
      </FormItem>
    </Form>
  );
};
