function formatRouterTree(data) {
  console.log("data", data);

  // 获取父元素和子元素
  let parent = data.filter((item) => item.pid === 0);
  let children = data.filter((item) => item.pid !== 0);

  dataToTree(parent, children);
  //   遍历父元素和子元素，把子元素添加到父元素中
  function dataToTree(parent, children) {
    parent.map((p) => {
      children.map((c, i) => {
        if (c.pid === p.id) {
          let _c = JSON.parse(JSON.stringify(children));
          // 从子元素列表中删除匹配的子元素
          _c.splice(i, 1);
          // 递归 查看当前匹配的子元素有没有子元素
          dataToTree([c], _c);

          if (p.children) {
            p.children.push(c);
          } else {
            p.children = [c];
          }
        }
      });
    });
  }
  return parent;
}

// 把路由转成vue路由能识别的结构
function generateRouter(userRouters) {
  let newRouters = userRouters.map((r) => {
    let routes = {
      path: r.path,
      name: r.name,
      component: () => import(`@/views/${r.name}`),
    };
    if (r.children) {
      routes.children = generateRouter(r.children);
    }
    // 把遍历好的这一项返回出去
    return routes;
  });
  return newRouters;
}

export { formatRouterTree, generateRouter };
