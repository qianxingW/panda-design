import React, { useEffect, useMemo, useState } from 'react';

import type { SelectProps } from 'antd';
import { Checkbox, Divider, Select } from 'antd';

export interface ProSelectProps extends SelectProps {
  /**
   * @description 是否开启全选
   * @default false
   */
  selectAll?: boolean;
}

function ProSelect(props: ProSelectProps) {
  const {
    value,
    defaultValue,
    options = [],
    mode,
    onChange,
    selectAll,
    searchValue,
    onSearch,
    children,
    optionFilterProp = 'value',
    ...prop
  } = props;

  // 选中的值
  const [selectedValues, setSelectedValues] = useState(
    value || defaultValue || [],
  );
  // 搜索的值
  const [schValue, setSchValue] = useState<string | undefined>();

  useEffect(() => {
    setSelectedValues(value || defaultValue || []);
  }, [value, defaultValue]);

  useEffect(() => {
    setSchValue(searchValue || '');
  }, [searchValue]);

  const searchChange = (value: string) => {
    setSchValue(value);
    onSearch?.(value);
  };

  const onCheckAllChange = (e: { target: { checked: any } }) => {
    let arr = options.filter(
      (item: any) => item[optionFilterProp].indexOf(schValue || '') !== -1,
    );
    let currentArr: any = [];
    if (e.target.checked) {
      currentArr = Array.from(
        new Set([...arr?.map((item: any) => item.value), ...selectedValues]),
      );
    } else {
      currentArr = (selectedValues || []).filter(
        (item: any) => !arr.find((el: any) => el.value === item),
      );
    }

    setSelectedValues(currentArr);
    onChange?.(currentArr, arr);
  };

  const [indeterminate, checked, disabled] = useMemo(() => {
    if (mode !== 'multiple') return [false, false];
    // 搜索之后的option
    let searchOption = options.filter(
      (item: any) => item[optionFilterProp].indexOf(schValue) !== -1,
    );
    // 搜索后的option与选中的option对比
    let checkOptions = searchOption.filter((item: any) =>
      selectedValues.find((el: any) => el === item.value),
    );
    // 是否全选
    let isChecked =
      checkOptions.length >= searchOption.length && searchOption.length !== 0;
    return [
      checkOptions.length !== 0 && !isChecked,
      isChecked,
      searchOption.length === 0,
    ];
  }, [options, schValue, selectedValues]);

  return (
    <Select
      mode={mode}
      value={selectedValues}
      onChange={(value, option) => {
        setSelectedValues(value);
        onChange?.(value, option);
      }}
      searchValue={schValue}
      dropdownRender={(originNode) => {
        return mode === 'multiple' && selectAll ? (
          <>
            <div style={{ padding: '4px 8px 8px 8px' }}>
              <Checkbox
                indeterminate={indeterminate}
                checked={checked}
                disabled={disabled}
                onChange={onCheckAllChange}
              >
                全选
              </Checkbox>
              <span
                style={{
                  float: 'right',
                  fontSize: '12px',
                  color: '#bfbfbf',
                  lineHeight: '22px',
                }}
              >
                单击可多选
              </span>
            </div>
            <Divider style={{ margin: '0' }} />
            {originNode}
          </>
        ) : (
          <>{originNode}</>
        );
      }}
      onSearch={searchChange}
      options={options}
      optionFilterProp={optionFilterProp}
      {...prop}
    >
      {children}
    </Select>
  );
}

export default ProSelect;
