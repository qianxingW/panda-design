---
group:
  title: 组件
---

# ProSelect 组件

```jsx
/**
 * title:
 * description: 在select增加全选功能
 */

import { ProSelect } from 'panda-design-pro';

export default () => {
  const options = [
    { value: '01', label: 'demo1' },
    { value: '02', label: 'demo2' },
    { value: '03', label: 'demo3' },
    { value: '04', label: 'demo4' },
  ];

  return (
    <ProSelect
      mode="multiple"
      placeholder="请选择"
      options={options}
      style={{ width: '200px' }}
      selectAll
      maxTagCount="responsive"
      allowClear
      optionFilterProp="label"
      onChange={(val, all) => {
        console.log(val, all);
      }}
    />
  );
};
```

<!-- <API id="Foo"></API> -->

## API

| 参数      | 说明         | 类型    | 默认值 |
| --------- | ------------ | ------- | ------ |
| selectAll | 是否支持全选 | boolean | fasle  |
