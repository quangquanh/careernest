import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Result } from "antd";

const Access = ({ permission, hideChildren = false, children = <> </> }) => {
    const [allow, setAllow] = useState(true);
    const permissions = useSelector(state => state?.user?.info?.role?.permissions);

    useEffect(() => {
        if (permissions?.length > 0) {
            const check = permissions.find(item =>
                item.apiPath === permission.apiPath
                && item.method === permission.method
                && item.module === permission.module
            )
            if (check) {
                setAllow(true)
            } else
                setAllow(false);
        }
    }, [permissions])

    return (
        <>
            {allow === true || import.meta.env.VITE_ACL_ENABLE === 'false' ?
                <>{children}</>
                :
                <>
                    {hideChildren === false ?
                        <Result
                            status="403"
                            title="Truy cập bị từ chối"
                            subTitle="Xin lỗi, bạn không có quyền hạn (permission) truy cập thông tin này"
                        />
                        :
                        <>
                            {/* render nothing */}
                        </>
                    }
                </>
            }
        </>

    )
};

export default Access;