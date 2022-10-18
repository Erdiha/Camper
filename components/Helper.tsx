import React from 'react';

export function helperMapping(arr: [], tagType: string, filling: any) {
  arr.map((item: any) => {
    return <div>{item}</div>;
  });
}
