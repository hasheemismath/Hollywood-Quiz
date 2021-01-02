import React from 'react';

interface LoadingProps {
    isWorking: boolean
}

const Loading = (props: LoadingProps) => {
    if (!props.isWorking) {
        return <></>;
    }
    return (
        <div className="loading">
            <div className="spinner-border"><span className="sr-only">Loading...</span></div>
        </div>
    )
}
export default Loading;