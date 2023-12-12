import React from 'react';

const ReusableSelect = ({ value, arrOptions, onChange }) => (
  <select
    value={value}
    onChange={onChange}
    className="border rounded p-1 ml-4 focus:outline-none focus:border-blue-500 text-sm cursor-pointer"
  >
    {arrOptions.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
);

export default ReusableSelect;
