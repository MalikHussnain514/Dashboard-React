import Loader from 'ui-component/Loader';

const LoadingWrapper = ({ children, loading }) => {
    return <>{loading ? <Loader /> : children}</>;
};

export default LoadingWrapper;
