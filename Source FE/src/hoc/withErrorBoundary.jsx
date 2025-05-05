import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from 'flowbite-react';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
    <div className='ct-container'>
        <div className="text-center py-6 bg-red-100 rounded-lg">
            <h2 className="text-xl font-bold text-red-600">Đã có lỗi xảy ra!</h2>
            <p className="text-red-500">{error.message}</p>
            <Button color="failure" onClick={resetErrorBoundary} className="mt-6 mx-auto">
                Thử lại
            </Button>
        </div>
    </div>

);

const withErrorBoundary = (WrappedComponent) => {
    return (props) => (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );
};

export default withErrorBoundary;
