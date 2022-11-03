import { LoadingRoot } from './Loading.styles';

const Loading = () => {
   return (
      <LoadingRoot>
         <div className='lds-ellipsis'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
         </div>
      </LoadingRoot>
   );
};

export default Loading;
