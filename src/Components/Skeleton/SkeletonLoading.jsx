import React, { memo } from 'react'
import { Skeleton, Space } from 'antd';
export default memo(
    function SkeletonLoading() {
        return <>
            <div className='card-todo'>
                <br /> <br /> <br />
                <Skeleton.Input active size={"large"} block={true} />
                <br />
                <Skeleton active paragraph={{ rows: 1, width: "100%" }} title={false} />
                <br />
                <Skeleton.Input active size={"large"} block={true} />
                <Skeleton active paragraph={{ rows: 4, width: "100%" }} title={false} />
                <Space style={{ margin: '0 auto' }}>
                    <Skeleton.Button active size={"small"} block={true} />
                    <Skeleton.Button active size={"small"} block={true} />
                </Space>
            </div>
        </>
    }
)
