import { Refine } from "@pankod/refine-core";
import { notificationProvider, Layout, ReadyPage, ErrorComponent } from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/styles.min.css";
import routerProvider from "@pankod/refine-react-router-v6";
// import dataProvider from "@pankod/refine-simple-rest";
import dataProvider from "./dataProvider";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

import { PostList2 } from "pages/reviewer";

function App() {
  return (
    <Refine
      notificationProvider={notificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={{
        ...routerProvider,
      }}
      dataProvider={dataProvider("http://localhost:3001/v1")}
      resources={[
        {
          name: "Posts",
        },
        {
          name: "posts",
          parentName: "Posts",
          list: PostList,
          create: PostCreate,
          edit: PostEdit,
          show: PostShow,
        },
        {
          name: "Review",
          parentName: "Posts",
          list: PostList2,
        },
      ]}
    />
  );
}

export default App;
